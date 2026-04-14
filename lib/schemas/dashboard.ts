import { z } from "zod";

export const dashboardProfilePostSchema = z.object({
  wallet_address: z.string().trim().min(1).max(100),
  full_name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(320),
  website: z.string().max(0).optional(),
});
