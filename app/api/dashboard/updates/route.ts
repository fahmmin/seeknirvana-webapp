import { type NextRequest, NextResponse } from "next/server";

import { getClientIp } from "@/lib/api/client-ip";
import { rateLimitSync } from "@/lib/rate-limit";
import { createServiceClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const ip = getClientIp(request);
  const limited = rateLimitSync(`dashboard-updates-get:${ip}`, 120, 10 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "rate_limited", retryAfterMs: limited.retryAfterMs },
      { status: 429 },
    );
  }

  const supabase = createServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "database_not_configured" }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("product_updates")
    .select("id,title,body,published_at,sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: false })
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[dashboard/updates GET]", error);
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }

  return NextResponse.json({ updates: data ?? [] });
}
