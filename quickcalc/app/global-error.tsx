"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Layout Error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center p-4 bg-zinc-950 text-white font-sans">
        <div className="max-w-xl w-full bg-zinc-900 border border-rose-500/50 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-2xl font-bold">
            ⚠️
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Root Layout Error
            </h1>
            <p className="text-sm text-zinc-400">
              An exception occurred in the root layout or application template:
            </p>
          </div>

          <div className="text-left space-y-2">
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-xs font-mono text-rose-300 font-bold break-words">
              {error?.name || "Error"}: {error?.message || "Unknown error"}
            </div>
            {error?.stack && (
              <pre className="p-4 rounded-xl bg-black text-zinc-300 text-[11px] font-mono overflow-auto max-h-60 leading-relaxed whitespace-pre-wrap break-all">
                {error.stack}
              </pre>
            )}
            {error?.digest && (
              <div className="text-[10px] font-mono text-zinc-500 text-right">
                Digest: {error.digest}
              </div>
            )}
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => reset()}
              type="button"
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/";
                }
              }}
              type="button"
              className="px-6 py-2.5 rounded-xl border border-zinc-700 hover:bg-zinc-800 text-zinc-300 font-bold text-sm transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
