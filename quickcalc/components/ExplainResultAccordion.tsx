"use client";

import { useState } from "react";

interface ExplainResultAccordionProps {
  steps: string[];
  title?: string;
}

export default function ExplainResultAccordion({
  steps,
  title = "Explain This Result",
}: ExplainResultAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-4 border border-indigo-100 dark:border-indigo-900/50 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/20 overflow-hidden transition-all shadow-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm text-indigo-950 dark:text-indigo-200 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span className="text-base" role="img" aria-label="lightbulb">💡</span>
          <span>{title}</span>
        </span>
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/60 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs">
          <span>{isOpen ? "Hide Explanation" : "Step-by-Step Breakdown"}</span>
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className="p-4 pt-3 border-t border-indigo-100 dark:border-indigo-900/40 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 animate-fadeIn">
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2.5">
            How your calculation was computed step-by-step:
          </p>
          <ol className="space-y-2.5 list-decimal list-inside font-medium leading-relaxed">
            {steps.map((step, idx) => (
              <li key={idx} className="pl-1 text-zinc-800 dark:text-zinc-200">
                <span className="text-zinc-700 dark:text-zinc-300">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
