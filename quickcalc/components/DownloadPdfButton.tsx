"use client";

import React from "react";

interface DownloadPdfButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isGenerating?: boolean;
  label?: string;
  className?: string;
}

export default function DownloadPdfButton({
  onClick,
  disabled = false,
  isGenerating = false,
  label = "Download PDF",
  className = "",
}: DownloadPdfButtonProps) {
  const isDisabled = disabled || isGenerating;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      aria-label={isGenerating ? "Generating PDF, please wait" : "Download clean PDF summary"}
      className={`flex items-center gap-2 text-xs font-semibold transition-all duration-200 px-3.5 py-2 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none
        ${isGenerating
          ? "text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 cursor-wait"
          : "text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 hover:scale-[1.02] bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 hover:shadow-sm"
        }
        disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {isGenerating ? (
        <>
          {/* Spinner */}
          <svg
            className="animate-spin h-3.5 w-3.5 text-zinc-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Generating…
        </>
      ) : (
        <>
          {/* Download icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}
