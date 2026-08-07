"use client";

import React, { useState } from "react";
import { Share2, Loader2 } from "lucide-react";

interface ShareResultButtonProps {
  onClick: () => void;
  className?: string;
}

export default function ShareResultButton({ onClick, className = "" }: ShareResultButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);

    // Deferred execution yields to main thread for instant (<16ms) button UI response before heavy operations
    requestAnimationFrame(() => {
      onClick();
      setTimeout(() => setLoading(false), 400);
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Share Result Card"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/20 text-xs font-bold transition active:scale-95 min-h-[44px] ${className}`}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin text-teal-600 dark:text-teal-400" />
      ) : (
        <Share2 size={16} />
      )}
      <span>Share Result Card</span>
    </button>
  );
}
