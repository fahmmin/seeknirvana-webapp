"use client";

import { Bell, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import { FadeIn } from "@/src/components/FadeIn";
import {
  dashboardCardClass,
  dashboardEyebrowClass,
  dashboardHeadingWrapClass,
  dashboardPageClass,
  dashboardSubtitleClass,
  dashboardTitleClass,
} from "@/components/dashboard/ui";
import type { ProductUpdate } from "@/lib/dashboard/types";

export default function DashboardUpdatesList() {
  const [updates, setUpdates] = useState<ProductUpdate[]>([]);
  const [updatesLoading, setUpdatesLoading] = useState(false);
  const [updatesError, setUpdatesError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setUpdatesLoading(true);
    setUpdatesError(false);
    void (async () => {
      try {
        const res = await fetch("/api/dashboard/updates");
        const json = (await res.json()) as { updates?: ProductUpdate[] };
        if (cancelled) return;
        if (res.ok && json.updates) {
          setUpdates(json.updates);
        } else {
          setUpdatesError(true);
        }
      } catch {
        if (!cancelled) setUpdatesError(true);
      } finally {
        if (!cancelled) {
          setUpdatesLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={dashboardPageClass}>
      <FadeIn>
        <div className={dashboardHeadingWrapClass}>
          <p className={dashboardEyebrowClass}>News</p>
          <h1 className={dashboardTitleClass}>
            <span className="text-gradient-jade">Product updates</span>
          </h1>
          <p className={dashboardSubtitleClass}>Notes from our team as we ship your Nirvana experience.</p>
        </div>
      </FadeIn>

      <div className={`${dashboardCardClass} sm:p-8`}>
        <div className="flex items-center gap-2 text-white">
          <Bell className="h-5 w-5 text-cyan" aria-hidden />
          <h2 className="text-lg font-semibold">All updates</h2>
        </div>

        {updatesLoading ? (
          <div className="mt-8 flex items-center gap-2 text-sm text-white/50">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Loading updates...
          </div>
        ) : updatesError ? (
          <p className="mt-8 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-6 text-sm text-white/55">
            Could not load updates. Try refreshing the page.
          </p>
        ) : updates.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-6 text-sm text-white/55">
            No updates posted yet. Check back soon—we will share production and shipping news here.
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {updates.map((u) => (
              <li key={u.id} className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-4 py-5">
                <p className="text-xs uppercase tracking-wide text-gold/80">
                  {new Date(u.published_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h3 className="mt-2 text-base font-semibold text-white">{u.title}</h3>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-white/70">{u.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
