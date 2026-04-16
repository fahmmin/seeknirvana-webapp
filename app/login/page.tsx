"use client";

import { useAppKit } from "@reown/appkit/react";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import { projectId } from "@/config/reown-wagmi";

export default function LoginPage() {
  const router = useRouter();
  const { open } = useAppKit();
  const { isConnected, status } = useAccount();
  const reownReady = projectId.length > 0;

  useEffect(() => {
    if (isConnected && status === "connected") {
      router.replace("/dashboard");
    }
  }, [isConnected, status, router]);

  const busy = status === "connecting" || status === "reconnecting";

  return (
    <div className="relative min-h-screen overflow-hidden bg-nirvana-dark">
      <div className="absolute inset-0 mandala-pattern opacity-30" />
      <div className="absolute left-1/2 top-20 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-nirvana-cyan/10 blur-3xl" />

      <header className="relative z-10 border-b border-white/5 px-4 py-4 sm:px-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image src="/images/SeekNirvana_Logo.png" alt="Seek Nirvana" width={40} height={40} className="object-cover" />
          </div>
          <span className="font-semibold text-white">Seek Nirvana</span>
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-lg flex-col justify-center px-4 pb-24 pt-8 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-nirvana-cyan/30 bg-nirvana-cyan/10">
              <Sparkles className="h-7 w-7 text-nirvana-cyan" aria-hidden />
            </div>
            <h1 className="mt-6 text-center text-2xl font-bold text-white sm:text-3xl">Sign in to your member hub</h1>
            <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-white/60">
              Free member hub, program updates, and cohort access after you connect. Use email, a social account, or your
              wallet.
            </p>

            {!reownReady ? (
              <p className="mt-8 text-center text-sm text-nirvana-gold/90">
                Set <span className="font-mono text-nirvana-cyan">NEXT_PUBLIC_REOWN_PROJECT_ID</span> to enable sign-in.
              </p>
            ) : (
              <button
                type="button"
                onClick={() => void open()}
                disabled={busy}
                className="mt-10 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-nirvana-jade to-nirvana-jade-dark py-4 text-base font-medium text-white shadow-lg shadow-nirvana-jade/20 transition hover:opacity-95 disabled:opacity-60"
              >
                {busy ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden />
                    Connecting…
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            )}

            <p className="mt-8 text-center text-xs text-white/40">
              By continuing you agree to our{" "}
              <Link href="/terms" className="text-nirvana-cyan/90 underline-offset-2 hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-nirvana-cyan/90 underline-offset-2 hover:underline">
                Privacy
              </Link>
              .
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
