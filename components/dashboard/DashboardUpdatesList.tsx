"use client";

import { Bell, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import FadeIn from "@/components/animations/FadeIn";
import type { ProductUpdate } from "@/lib/dashboard/types";

export default function DashboardUpdatesList() {
  const [updates, setUpdates] = useState<ProductUpdate[]>([]);
  const [updatesLoading, setUpdatesLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setUpdatesLoading(true);
    void (async () => {
      try {
        const res = await fetch("/api/dashboard/updates");
        const json = (await res.json()) as { updates?: ProductUpdate[] };
        if (!cancelled && res.ok && json.updates) {
          setUpdates(json.updates);
        }
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
    <div className="space-y-6">
      <FadeIn>
        <p className="text-xs uppercase tracking-[0.35em] text-nirvana-gold">News</p>
        <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
          <span className="gradient-text">Product updates</span>
        </h1>
        <p className="mt-2 text-sm text-white/60">Notes from our team as we ship your Nirvana experience.</p>
      </FadeIn>

      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center gap-2 text-white">
          <Bell className="h-5 w-5 text-nirvana-cyan" aria-hidden />
          <h2 className="text-lg font-semibold">All updates</h2>
        </div>

        {updatesLoading ? (
          <div className="mt-8 flex items-center gap-2 text-sm text-white/50">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            Loading updates...
          </div>
        ) : updates.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-white/10 bg-nirvana-dark/40 px-4 py-6 text-sm text-white/55">
            No updates posted yet. Check back soon—we will share production and shipping news here.
          </p>
        ) : (
          <ul className="mt-8 space-y-4">
            {updates.map((u) => (
              <li key={u.id} className="rounded-2xl border border-white/10 bg-nirvana-dark/40 px-4 py-5">
                <p className="text-xs uppercase tracking-wide text-nirvana-gold/80">
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
