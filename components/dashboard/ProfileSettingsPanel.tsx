"use client";

import { useAppKit } from "@reown/appkit/react";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import FadeIn from "@/components/animations/FadeIn";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import ProfileAvatar from "@/components/dashboard/ProfileAvatar";
import { resizeImageToJpeg } from "@/lib/client/resize-image";

const inputClassName =
  "w-full rounded-2xl border border-white/10 bg-nirvana-dark/60 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/28 focus:border-nirvana-cyan/40";

export default function ProfileSettingsPanel() {
  const { open } = useAppKit();
  const { profile, address, loadProfile } = useDashboard();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timezone, setTimezone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [avatarBusy, setAvatarBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!profile) {
      return;
    }
    setFullName(profile.full_name ?? "");
    setEmail(profile.email ?? "");
    setPhone(profile.phone ?? "");
    setTimezone(profile.timezone ?? "");
    setDateOfBirth(profile.date_of_birth ?? "");
    setBio(profile.bio ?? "");
  }, [profile]);

  async function handleAvatarPick(files: FileList | null) {
    const file = files?.[0];
    if (!file || !address) {
      return;
    }
    setAvatarBusy(true);
    setError(null);
    setMessage(null);
    try {
      const blob = await resizeImageToJpeg(file, 512);
      const fd = new FormData();
      fd.append("file", blob, "avatar.jpg");
      fd.append("wallet_address", address);
      const res = await fetch("/api/dashboard/profile/avatar", { method: "POST", body: fd });
      const json = (await res.json()) as { ok?: boolean; error?: string; detail?: string };
      if (!res.ok) {
        setError(
          json.error === "upload_failed"
            ? "Could not upload image. Check Supabase Storage (bucket avatars)."
            : json.error === "file_too_large"
              ? "Image must be under 2 MB."
              : json.error === "profile_required"
                ? "Finish onboarding first, then add a photo."
                : "Could not update avatar.",
        );
        return;
      }
      setMessage("Photo updated.");
      await loadProfile();
    } catch {
      setError("Could not process image.");
    } finally {
      setAvatarBusy(false);
      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  }

  async function removeAvatar() {
    if (!address) {
      return;
    }
    setAvatarBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/dashboard/profile/avatar?address=${encodeURIComponent(address)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setError("Could not remove photo.");
        return;
      }
      setMessage("Photo removed.");
      await loadProfile();
    } finally {
      setAvatarBusy(false);
    }
  }

  async function saveProfile() {
    if (!address) {
      return;
    }
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/dashboard/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet_address: address,
          full_name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          timezone: timezone.trim(),
          date_of_birth: dateOfBirth.trim() === "" ? "" : dateOfBirth.trim(),
          bio: bio.trim(),
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(json.error === "validation_error" ? "Check your inputs." : "Could not save.");
        return;
      }
      setMessage("Saved.");
      await loadProfile();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <FadeIn>
        <p className="text-xs uppercase tracking-[0.35em] text-nirvana-gold">Account</p>
        <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          <span className="gradient-text">Profile &amp; settings</span>
        </h1>
        <p className="mt-2 text-sm text-white/60">Update your profile details and account information.</p>
      </FadeIn>

      <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:flex-row sm:items-start">
        <div className="flex shrink-0 flex-col items-center gap-3 sm:items-start">
          <ProfileAvatar avatarUrl={profile?.avatar_url} name={profile?.full_name} address={address} size={96} />
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => void handleAvatarPick(e.target.files)}
          />
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            <button
              type="button"
              disabled={avatarBusy}
              onClick={() => fileRef.current?.click()}
              className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/90 hover:border-nirvana-cyan/35 disabled:opacity-50"
            >
              {avatarBusy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : profile?.avatar_url ? (
                "Change photo"
              ) : (
                "Upload photo"
              )}
            </button>
            {profile?.avatar_url ? (
              <button
                type="button"
                disabled={avatarBusy}
                onClick={() => void removeAvatar()}
                className="rounded-full border border-red-400/25 px-4 py-2 text-xs font-medium text-red-200/90 hover:bg-red-500/10 disabled:opacity-50"
              >
                Remove
              </button>
            ) : null}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-white/55">
            Upload a square or portrait image (JPEG, PNG, WebP, or GIF, max 2 MB). We resize it in your browser before
            upload. Without a photo, we show initials from your name.
          </p>
          <button
            type="button"
            onClick={() => void open()}
            className="mt-4 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-medium text-white/90 hover:border-nirvana-cyan/35"
          >
            Wallet &amp; AppKit settings
          </button>
        </div>
      </div>

      <form
        className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl"
        onSubmit={(e) => {
          e.preventDefault();
          void saveProfile();
        }}
      >
        <h2 className="text-lg font-semibold text-white">Personal details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="text-xs font-medium uppercase tracking-wide text-white/50">Full name</span>
            <input
              className={`${inputClassName} mt-2`}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              maxLength={200}
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wide text-white/50">Email</span>
            <input
              type="email"
              className={`${inputClassName} mt-2`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={320}
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wide text-white/50">Phone</span>
            <input
              type="tel"
              className={`${inputClassName} mt-2`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={40}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wide text-white/50">Timezone</span>
            <input
              className={`${inputClassName} mt-2`}
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              placeholder="e.g. America/New_York"
              maxLength={120}
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wide text-white/50">Date of birth</span>
            <input
              type="date"
              className={`${inputClassName} mt-2`}
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs font-medium uppercase tracking-wide text-white/50">Bio</span>
            <textarea className={`${inputClassName} mt-2 min-h-[100px]`} value={bio} onChange={(e) => setBio(e.target.value)} maxLength={2000} />
          </label>
        </div>
        {error ? (
          <p className="text-sm text-red-400/90" role="alert">
            {error}
          </p>
        ) : null}
        {message ? <p className="text-sm text-nirvana-jade-light">{message}</p> : null}
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark px-8 py-3 text-sm font-medium text-white shadow-lg shadow-nirvana-jade/15 disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
              Saving…
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </form>

    </div>
  );
}
