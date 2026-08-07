"use client";

import React from "react";
import { Star } from "lucide-react";
import { usePersonalization } from "@/hooks/usePersonalization";

interface FavoriteButtonProps {
  toolHref: string;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function FavoriteButton({
  toolHref,
  className = "",
  showLabel = false,
  size = "md",
}: FavoriteButtonProps) {
  const { isMounted, isFavorite, toggleFavorite } = usePersonalization();

  if (!isMounted) return null; // Prevent SSR hydration mismatch

  const favorited = isFavorite(toolHref);

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(toolHref);
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      title={favorited ? "Remove from favorites" : "Add to favorites"}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      className={`inline-flex items-center gap-1.5 rounded-xl transition-all active:scale-90 focus:outline-none min-h-[36px] min-w-[36px] justify-center ${
        showLabel
          ? `px-3 py-1.5 text-xs font-bold ${
              favorited
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-sm"
                : "bg-base-card hover:bg-surface-muted text-ink-muted hover:text-amber-500 border border-surface-border"
            }`
          : `p-1.5 ${
              favorited
                ? "text-amber-400 hover:text-amber-500"
                : "text-ink-muted/50 hover:text-amber-400 hover:bg-surface-muted"
            }`
      } ${className}`}
    >
      <Star
        size={iconSizes[size]}
        className={`transition-all duration-200 ${
          favorited
            ? "fill-amber-400 text-amber-400 scale-110"
            : "fill-transparent"
        }`}
      />
      {showLabel && (
        <span>{favorited ? "Favorited" : "Favorite"}</span>
      )}
    </button>
  );
}
