"use client";

import React from "react";

interface DownloadPdfButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export default function DownloadPdfButton({
  onClick,
  disabled = false,
  label = "📄 Download PDF",
  className = "",
}: DownloadPdfButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 transition-all duration-200 hover:scale-[1.02] bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-3.5 py-2 rounded-lg hover:shadow-sm focus:ring-1 focus:ring-emerald-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      title="Download clean PDF summary"
    >
      {label}
    </button>
  );
}
