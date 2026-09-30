"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, RotateCcw } from "lucide-react";

export default function CreditCardCalculatorErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Credit Card Payoff Calculator error boundary caught an exception:", error);
  }, [error]);

  return (
    <div className="min-h-[500px] flex items-center justify-center p-4 sm:p-6 bg-zinc-50 dark:bg-zinc-950 font-sans">
      <div className="max-w-2xl w-full bg-white dark:bg-zinc-900 border-2 border-rose-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto shadow-inner">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Calculator Runtime Error
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The credit card payoff engine encountered an exception during execution. Diagnostic details:
          </p>
        </div>

        {/* Detailed Error Diagnostic Box */}
        <div className="text-left space-y-2">
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs font-mono text-rose-800 dark:text-rose-300 font-bold break-words">
            {error?.name || "Error"}: {error?.message || "Unknown error"}
          </div>

          {error?.stack && (
            <pre className="p-4 rounded-xl bg-zinc-900 text-zinc-200 text-[11px] font-mono overflow-auto max-h-60 leading-relaxed border border-zinc-800 whitespace-pre-wrap break-all">
              {error.stack}
            </pre>
          )}

          {error?.digest && (
            <div className="text-[10px] font-mono text-zinc-400 text-right">
              Digest: {error.digest}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-md transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = "/calculators/credit-card-payoff-calculator";
              }
            }}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold text-sm transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset to Defaults</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 text-sm font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
