import { z } from "zod";

const rangeEnum = z.enum(["7d", "30d"]);

export const googleFitWalletSchema = z.object({
  wallet_address: z.string().trim().min(1).max(100),
});

export const googleFitSyncSchema = googleFitWalletSchema.extend({
  range: rangeEnum.optional(),
});

export const googleFitSummaryQuerySchema = z.object({
  address: z.string().trim().min(1).max(100),
  range: rangeEnum.optional(),
});
