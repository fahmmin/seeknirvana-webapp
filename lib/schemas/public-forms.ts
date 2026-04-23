import { z } from "zod";

export const signupWelcomeSchema = z.object({
  name: z.string().trim().max(100).optional(),
  email: z.string().trim().email().max(320),
  website: z.string().max(0).optional(),
});

const cohortField = z.string().trim().max(8000);

export const cohortApplicationSchema = z.object({
  walletAddress: z.string().trim().max(100).optional(),
  fullName: cohortField.min(1).max(200),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(80),
  ageRange: cohortField.min(1).max(40),
  location: cohortField.min(1).max(200),
  timezone: cohortField.min(1).max(120),
  personalityType: cohortField.min(1).max(80),
  occupation: z.string().trim().max(200),
  dreamExperience: cohortField.min(1).max(200),
  wearableExperience: cohortField.min(1).max(200),
  preferredSessionWindow: cohortField.min(1).max(120),
  sleepGoal: cohortField.min(1).max(4000),
  currentChallenge: cohortField.min(1).max(4000),
  intentions: cohortField.min(1).max(4000),
  notes: z.string().trim().max(4000),
  acceptProgramTerms: z.boolean().refine((v) => v === true, "Required"),
  website: z.string().max(0).optional(),
});
