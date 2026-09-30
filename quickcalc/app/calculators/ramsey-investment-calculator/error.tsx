"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function RamseyCalculatorErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Ramsey Investment Calculator error boundary caught an exception:", error);
  }, [error]);

  return (
    <div className="min-h-[500px] flex items-center justify-center p-4 sm:p-6 bg-zinc-50 dark:bg-zinc-950 font-sans">
      <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Calculator Runtime Error
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            An exception occurred while computing investment growth. Details:
          </p>
        </div>

        <div className="text-left space-y-2">
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs font-mono text-emerald-800 dark:text-emerald-300 font-bold break-words">
            {error?.name || "Error"}: {error?.message || "Unknown error"}
          </div>
          {error?.stack && (
            <pre className="p-4 rounded-xl bg-zinc-900 text-zinc-200 text-[11px] font-mono overflow-auto max-h-60 leading-relaxed border border-zinc-800 whitespace-pre-wrap break-all">
              {error.stack}
            </pre>
          )}
        </div>

        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            type="button"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-sm transition-colors inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
