"use client";

import { addressHue, initialsFromName } from "@/lib/dashboard/avatar";

type ProfileAvatarProps = {
  avatarUrl?: string | null;
  name?: string | null;
  address?: string;
  size?: number;
  className?: string;
};

export default function ProfileAvatar({ avatarUrl, name, address, size = 40, className = "" }: ProfileAvatarProps) {
  const hue = address ? addressHue(address) : 160;
  const initials = initialsFromName(name, address?.slice(2, 4) ?? "?");
  const dim = { width: size, height: size };

  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- user-supplied dynamic URL from Supabase
      <img
        src={avatarUrl}
        alt=""
        {...dim}
        className={`shrink-0 rounded-full object-cover ring-2 ring-white/20 ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ring-2 ring-white/20 ${className}`}
      style={{ ...dim, background: `hsl(${hue} 45% 28%)`, fontSize: Math.max(11, Math.round(size * 0.35)) }}
    >
      {initials}
    </div>
  );
}
