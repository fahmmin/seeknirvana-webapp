import { z } from "zod";

const isoDateOptional = z.preprocess(
  (val) => (val === "" || val === undefined || val === null ? undefined : val),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
);

/** Complete onboarding (creates or updates profile; sets onboarding_completed_at). */
export const dashboardOnboardingPostSchema = z.object({
  wallet_address: z.string().trim().min(1).max(100),
  full_name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().min(1).max(40),
  timezone: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : val),
    z.string().trim().max(120).optional(),
  ),
  date_of_birth: isoDateOptional,
  bio: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : val),
    z.string().trim().max(2000).optional(),
  ),
  website: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : val),
    z.string().trim().url().max(500).optional(),
  ),
});

/** Partial profile / settings / connector toggles (existing profile row required). */
export const dashboardProfilePatchSchema = z.object({
  wallet_address: z.string().trim().min(1).max(100),
  full_name: z.string().trim().min(1).max(200).optional(),
  email: z.string().trim().email().max(320).optional(),
  phone: z.string().trim().max(40).optional(),
  timezone: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : val),
    z.string().trim().max(120).optional(),
  ),
  date_of_birth: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.literal(""), z.null()]).optional(),
  bio: z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : val),
    z.string().trim().max(2000).optional(),
  ),
  google_health_connected: z.boolean().optional(),
  instagram_connected: z.boolean().optional(),
});

export const dashboardProfilePostSchema = dashboardOnboardingPostSchema;
