"use client";

import React from "react";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import ToolIcon from "@/components/ToolIcon";
import FavoriteButton from "@/components/FavoriteButton";
import { usePersonalization } from "@/hooks/usePersonalization";

export default function RecentlyUsedBar() {
  const { isMounted, recentTools } = usePersonalization();

  if (!isMounted || recentTools.length === 0) {
    return null; // Hide completely for first-time visitors or empty history
  }

  return (
    <section className="mb-8 bg-base-card border border-surface-border rounded-2xl p-4 sm:p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-heading font-extrabold uppercase tracking-wider text-ink">
          <Clock size={16} className="text-teal-600 dark:text-teal-400 animate-pulse" />
          <span>Recently Used</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
            {recentTools.length}
          </span>
        </div>
        <span className="text-[11px] text-ink-muted">Saved locally</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {recentTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group relative flex items-center justify-between p-3 rounded-xl bg-surface-muted/60 hover:bg-surface-muted border border-surface-border/60 hover:border-teal-500/30 transition-all duration-150 min-h-[44px] active:scale-[0.98]"
          >
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <ToolIcon icon={tool.icon} category={tool.category} size="sm" />
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-ink truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {tool.title}
                </h4>
                <p className="text-[10px] font-medium text-ink-muted truncate">
                  {tool.category}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              <FavoriteButton toolHref={tool.href} size="sm" />
              <ArrowRight size={14} className="text-ink-muted group-hover:translate-x-0.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-all" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
