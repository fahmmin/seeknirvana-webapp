"use client";

import { Loader2, Shield } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

type MemberRow = {
  wallet_address: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: string;
  onboarding_completed_at: string | null;
  created_at: string;
  google_health_connected_at: string | null;
  instagram_connected_at: string | null;
  cohort_application: {
    submitted_at: string;
    full_name: string;
    email: string;
    phone: string;
  } | null;
};

export default function AdminDashboardPage() {
  const { address, isConnected, status } = useAccount();
  const [members, setMembers] = useState<MemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!address || status !== "connected") {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/members?address=${encodeURIComponent(address)}`);
      const json = (await res.json()) as { ok?: boolean; members?: MemberRow[]; error?: string };
      if (res.status === 403) {
        setError("You don’t have admin access.");
        setMembers([]);
        return;
      }
      if (!res.ok || !json.members) {
        setError("Could not load members.");
        setMembers([]);
        return;
      }
      setMembers(json.members);
    } finally {
      setLoading(false);
    }
  }, [address, status]);

  useEffect(() => {
    void load();
  }, [load]);

  if (!isConnected || status !== "connected") {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <Shield className="mx-auto h-12 w-12 text-gold/80" />
        <h1 className="mt-6 text-xl font-semibold">Admin dashboard</h1>
        <p className="mt-2 text-sm text-white/55">Connect your wallet to continue.</p>
        <Link href="/login" className="mt-6 inline-block text-cyan hover:underline">
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Admin</p>
          <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Members</h1>
          <p className="mt-1 text-sm text-white/55">Profiles and cohort application status.</p>
        </div>
        <Link
          href="/dashboard"
          className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-center text-sm text-white/90 hover:border-cyan/35"
        >
          Back to member hub
        </Link>
      </div>

      {error ? (
        <p className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200/90" role="alert">
          {error}
        </p>
      ) : null}

      {loading ? (
        <div className="mt-12 flex items-center gap-2 text-white/60">
          <Loader2 className="h-5 w-5 animate-spin text-cyan" />
          Loading…
        </div>
      ) : !error ? (
        <>
          <div className="mt-8 hidden overflow-x-auto rounded-2xl border border-white/[0.1] lg:block">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-white/[0.1] bg-white/[0.04] text-xs uppercase tracking-wide text-white/45">
                <tr>
                  <th className="px-4 py-3">Wallet</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Onboarded</th>
                  <th className="px-4 py-3">Cohort</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr key={m.wallet_address} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="max-w-[10rem] truncate px-4 py-3 font-mono text-xs text-white/80">{m.wallet_address}</td>
                    <td className="px-4 py-3 text-white/85">{m.full_name ?? "—"}</td>
                    <td className="max-w-[12rem] truncate px-4 py-3 text-white/75">{m.email}</td>
                    <td className="px-4 py-3 text-white/75">{m.phone ?? "—"}</td>
                    <td className="px-4 py-3">{m.role}</td>
                    <td className="px-4 py-3 text-white/60">
                      {m.onboarding_completed_at
                        ? new Date(m.onboarding_completed_at).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-white/55">
                      {m.cohort_application
                        ? new Date(m.cohort_application.submitted_at).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="mt-8 space-y-4 lg:hidden">
            {members.map((m) => (
              <li key={m.wallet_address} className="rounded-2xl border border-white/[0.1] bg-white/[0.04] p-4">
                <p className="font-mono text-[11px] text-cyan/90 break-all">{m.wallet_address}</p>
                <p className="mt-2 text-sm font-medium text-white">{m.full_name ?? "—"}</p>
                <p className="text-xs text-white/60">{m.email}</p>
                <p className="mt-2 text-xs text-white/45">
                  {m.phone ? `Phone: ${m.phone}` : "No phone"} · {m.role}
                </p>
              </li>
            ))}
          </ul>

          {members.length === 0 && !loading ? (
            <p className="mt-8 text-sm text-white/50">No member profiles yet.</p>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
