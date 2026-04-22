import { cn } from "@/lib/utils";

export const dashboardPageClass = "space-y-8 pb-2";

export const dashboardHeadingWrapClass = "space-y-3";

export const dashboardEyebrowClass = "text-xs uppercase tracking-[0.32em] text-gold/90";

export const dashboardTitleClass = "text-2xl font-semibold text-white sm:text-3xl";

export const dashboardSubtitleClass = "max-w-3xl text-sm leading-relaxed text-white/62";

export const dashboardCardClass =
  "rounded-3xl border border-white/[0.1] bg-white/[0.05] p-6 shadow-[0_16px_50px_rgba(1,6,24,0.25)] backdrop-blur-xl";

export const dashboardMutedCardClass = "rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl";

export const dashboardBadgeClass =
  "inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/75";

export const dashboardActionBaseClass =
  "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-200";

export function dashboardActionClass(variant: "primary" | "secondary" = "secondary"): string {
  return cn(
    dashboardActionBaseClass,
    variant === "primary"
      ? "border-jade/35 bg-jade text-navy-950 shadow-md shadow-jade/25 hover:-translate-y-0.5 hover:brightness-110"
      : "border-white/15 bg-white/[0.06] text-white/90 hover:border-cyan/35 hover:bg-white/[0.1]",
  );
}
