"use client";

import React from "react";
import { Share2 } from "lucide-react";

interface ShareResultButtonProps {
  onClick: () => void;
  className?: string;
}

export default function ShareResultButton({ onClick, className = "" }: ShareResultButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/20 text-xs font-bold transition active:scale-95 min-h-[44px] ${className}`}
    >
      <Share2 size={16} />
      <span>Share Result Card</span>
    </button>
  );
}
