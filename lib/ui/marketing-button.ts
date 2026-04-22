import { cn } from "@/lib/utils";

type MarketingButtonVariant = "primary" | "secondary";
type MarketingButtonSize = "md" | "lg";

export function marketingButtonClass({
  variant = "secondary",
  size = "md",
  fullWidth = false,
}: {
  variant?: MarketingButtonVariant;
  size?: MarketingButtonSize;
  fullWidth?: boolean;
} = {}): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full border font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/45 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950",
    size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm",
    fullWidth ? "w-full sm:w-auto" : "",
    variant === "primary"
      ? "border-jade/30 bg-jade text-navy-950 shadow-lg shadow-jade/25 hover:-translate-y-0.5 hover:brightness-110"
      : "border-white/15 bg-white/[0.06] text-white/85 hover:border-cyan/35 hover:bg-white/[0.1] hover:text-white",
  );
}
