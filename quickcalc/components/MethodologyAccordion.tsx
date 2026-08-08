"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, BookOpen, ShieldCheck, ExternalLink } from "lucide-react";
import { getToolMethodology } from "@/lib/methodologyData";

interface MethodologyAccordionProps {
  slug: string;
}

export default function MethodologyAccordion({ slug }: MethodologyAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const methodology = getToolMethodology(slug);

  if (!methodology) return null;

  return (
    <div className="w-full max-w-4xl mx-auto my-6 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/30 overflow-hidden transition-colors">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <BookOpen size={15} />
          </div>
          <div>
            <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
              How this is calculated (Methodology & Standards)
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block font-normal">
              {methodology.standardName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-[11px] font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded border border-teal-200/40 dark:border-teal-800/40">
            Formula Verified
          </span>
          <ChevronDown
            size={18}
            className={`text-zinc-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 space-y-4 animate-fade-in text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {/* Formula box if available */}
          {methodology.formulaText && (
            <div className="bg-white dark:bg-zinc-900 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 font-mono text-[11px] text-emerald-700 dark:text-emerald-400 overflow-x-auto shadow-sm">
              <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-zinc-400 dark:text-zinc-500 block mb-1">
                Mathematical Model / Equation
              </span>
              {methodology.formulaText}
            </div>
          )}

          <p>{methodology.detailedParagraph}</p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-zinc-200/40 dark:border-zinc-800/40 text-[11px]">
            <div className="inline-flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-medium">
              <ShieldCheck size={14} className="text-teal-600 dark:text-teal-400 shrink-0" />
              <span>100% Client-Side — Calculations execute locally in your browser.</span>
            </div>

            <Link
              href={`/methodology#${slug}`}
              className="inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 hover:underline shrink-0"
            >
              <span>View full methodology & sources</span>
              <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
