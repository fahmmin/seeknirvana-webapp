import { Buffer } from "node:buffer";

import { NextRequest, NextResponse } from "next/server";

import { getClientIp } from "@/lib/api/client-ip";
import { mapProfile, PROFILE_SELECT, type ProfileRow } from "@/lib/dashboard/map-profile";
import { rateLimitSync } from "@/lib/rate-limit";
import { isAllowedImageMime, mimeToExt, sniffImageMime } from "@/lib/server/image-sniff";
import { publicUrlToAvatarPath } from "@/lib/storage/supabase-avatar";
import { createServiceClient } from "@/lib/supabase/server";
import { normalizeWalletAddress } from "@/lib/web3/address";

const MAX_BYTES = 2 * 1024 * 1024;
const BUCKET = "avatars";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = rateLimitSync(`dashboard-profile-avatar-post:${ip}`, 20, 10 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfterMs: limited.retryAfterMs },
      { status: 429 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "invalid_form" }, { status: 400 });
  }

  const file = formData.get("file");
  const rawWallet = typeof formData.get("wallet_address") === "string" ? (formData.get("wallet_address") as string).trim() : "";

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "missing_file" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "file_too_large" }, { status: 400 });
  }

  const wallet_address = normalizeWalletAddress(rawWallet);
  if (!wallet_address) {
    return NextResponse.json({ error: "invalid_address" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "database_not_configured" }, { status: 503 });
  }

  const { data: hasProfile, error: profErr } = await supabase
    .from("profiles")
    .select("wallet_address")
    .eq("wallet_address", wallet_address)
    .maybeSingle();

  if (profErr || !hasProfile) {
    return NextResponse.json({ error: "profile_required" }, { status: 400 });
  }

  const url = process.env.SUPABASE_URL?.trim();
  if (!url) {
    return NextResponse.json({ error: "storage_not_configured" }, { status: 503 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const sniffed = sniffImageMime(buf);
  if (!sniffed || !isAllowedImageMime(sniffed)) {
    return NextResponse.json({ error: "invalid_image_content" }, { status: 400 });
  }

  const ext = mimeToExt(sniffed);
  const objectPath = `${wallet_address}/avatar.${ext}`;

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(objectPath, buf, {
    contentType: sniffed,
    upsert: true,
  });

  if (uploadError) {
    console.error("[dashboard/profile/avatar POST] upload", uploadError);
    return NextResponse.json({ error: "upload_failed", detail: uploadError.message }, { status: 502 });
  }

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);
  const publicUrl = pub.publicUrl;

  const { data: existing } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("wallet_address", wallet_address)
    .maybeSingle();

  const prevUrl = (existing as { avatar_url: string | null } | null)?.avatar_url;
  if (prevUrl && prevUrl !== publicUrl) {
    const oldPath = publicUrlToAvatarPath(prevUrl, url);
    if (oldPath) {
      await supabase.storage.from(BUCKET).remove([oldPath]);
    }
  }

  const now = new Date().toISOString();
  const { data: updated, error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl, updated_at: now })
    .eq("wallet_address", wallet_address)
    .select(PROFILE_SELECT)
    .single();

  if (updateError || !updated) {
    console.error("[dashboard/profile/avatar POST] profile update", updateError);
    return NextResponse.json({ error: "save_failed" }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    profile: mapProfile(updated as ProfileRow),
  });
}

export async function DELETE(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = rateLimitSync(`dashboard-profile-avatar-del:${ip}`, 30, 10 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfterMs: limited.retryAfterMs },
      { status: 429 },
    );
  }

  const raw = request.nextUrl.searchParams.get("address")?.trim() ?? "";
  const wallet_address = normalizeWalletAddress(raw);
  if (!wallet_address) {
    return NextResponse.json({ error: "invalid_address" }, { status: 400 });
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "database_not_configured" }, { status: 503 });
  }

  const baseUrl = process.env.SUPABASE_URL?.trim();
  if (!baseUrl) {
    return NextResponse.json({ error: "storage_not_configured" }, { status: 503 });
  }

  const { data: existing, error: fetchError } = await supabase
    .from("profiles")
    .select("avatar_url")
    .eq("wallet_address", wallet_address)
    .maybeSingle();

  if (fetchError) {
    console.error("[dashboard/profile/avatar DELETE] fetch", fetchError);
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }

  if (!existing) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const prevUrl = (existing as { avatar_url?: string | null }).avatar_url;
  if (prevUrl) {
    const oldPath = publicUrlToAvatarPath(prevUrl, baseUrl);
    if (oldPath) {
      await supabase.storage.from(BUCKET).remove([oldPath]);
    }
  }

  const now = new Date().toISOString();
  const { data: updated, error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: null, updated_at: now })
    .eq("wallet_address", wallet_address)
    .select(PROFILE_SELECT)
    .single();

  if (updateError || !updated) {
    console.error("[dashboard/profile/avatar DELETE] update", updateError);
    return NextResponse.json({ error: "save_failed" }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    profile: mapProfile(updated as ProfileRow),
  });
}
