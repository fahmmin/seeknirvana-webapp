import type { DashboardProfile } from "@/lib/dashboard/types";

export type ProfileRow = {
  wallet_address: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  onboarding_completed_at: string | null;
  member_hub_email_sent_at: string | null;
  timezone: string | null;
  date_of_birth: string | null;
  bio: string | null;
  google_fit_connected_at?: string | null;
  google_fit_last_sync_at?: string | null;
  google_health_connected_at: string | null;
  instagram_connected_at: string | null;
  avatar_url: string | null;
};

export const PROFILE_SELECT =
  "wallet_address,email,full_name,phone,role,onboarding_completed_at,member_hub_email_sent_at,timezone,date_of_birth,bio,google_health_connected_at,instagram_connected_at,avatar_url";

/** Columns from the original `profiles` table only — used when extended migrations are not applied yet. */
export const MINIMAL_PROFILE_SELECT =
  "wallet_address,email,full_name,onboarding_completed_at,member_hub_email_sent_at";

export type MinimalProfileRow = {
  wallet_address: string;
  email: string;
  full_name: string | null;
  onboarding_completed_at: string | null;
  member_hub_email_sent_at: string | null;
};

/** True when PostgREST failed because a column in PROFILE_SELECT does not exist yet. */
export function isMissingColumnError(err: { message?: string; code?: string } | null): boolean {
  if (!err?.message) {
    return false;
  }
  const m = err.message.toLowerCase();
  if (m.includes("column") && m.includes("does not exist")) {
    return true;
  }
  if (err.code === "42703") {
    return true;
  }
  if (m.includes("could not find") && m.includes("column")) {
    return true;
  }
  return false;
}

export function mapMinimalRowToProfile(row: MinimalProfileRow): DashboardProfile {
  return {
    wallet_address: row.wallet_address,
    email: row.email,
    full_name: row.full_name,
    phone: null,
    role: "member",
    onboarding_completed_at: row.onboarding_completed_at,
    timezone: null,
    date_of_birth: null,
    bio: null,
    google_fit_connected_at: null,
    google_fit_last_sync_at: null,
    google_health_connected_at: null,
    instagram_connected_at: null,
    avatar_url: null,
  };
}

export function mapProfile(row: ProfileRow): DashboardProfile {
  return {
    wallet_address: row.wallet_address,
    email: row.email,
    full_name: row.full_name,
    phone: row.phone,
    role: row.role === "admin" ? "admin" : "member",
    onboarding_completed_at: row.onboarding_completed_at,
    timezone: row.timezone,
    date_of_birth: row.date_of_birth,
    bio: row.bio,
    google_fit_connected_at: row.google_fit_connected_at ?? null,
    google_fit_last_sync_at: row.google_fit_last_sync_at ?? null,
    google_health_connected_at: row.google_health_connected_at,
    instagram_connected_at: row.instagram_connected_at,
    avatar_url: row.avatar_url,
  };
}
