import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { STATE_CALCULATORS, StateCalculatorItem } from "@/lib/stateCalculatorsData";

export type USStateEntry = StateCalculatorItem;
export const US_STATES = STATE_CALCULATORS;

interface StateClusterLinksProps {
  currentStateSlug: string;
}

export default function StateClusterLinks({ currentStateSlug }: StateClusterLinksProps) {
  return (
    <section className="my-10 bg-zinc-100/70 dark:bg-zinc-900/60 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>US 50-State Salary & Paycheck Calculators</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Compare take-home pay and state income tax withholding across all 50 states:
          </p>
        </div>

        <Link
          href="/paycheck-calculators"
          className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline self-start sm:self-auto"
        >
          <span>State Directory Hub</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-xs">
        {STATE_CALCULATORS.map((state) => {
          const isCurrent = state.slug === currentStateSlug;
          const isLive = state.isLive;
          const href = state.href;

          if (isCurrent) {
            return (
              <div
                key={state.slug}
                className="p-2 rounded-lg bg-teal-500 text-white font-bold flex items-center justify-between shadow-xs"
              >
                <span>{state.name} ({state.abbrev})</span>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>
              </div>
            );
          }

          if (isLive) {
            return (
              <Link
                key={state.slug}
                href={href}
                className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-teal-500/60 hover:border-teal-500 shadow-xs transition-all flex items-center justify-between group"
              >
                <span className="font-semibold text-teal-700 dark:text-teal-300 group-hover:underline">
                  {state.name}
                </span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold font-mono">
                  Live
                </span>
              </Link>
            );
          }

          return (
            <div
              key={state.slug}
              title={`${state.name} Paycheck Calculator — In Development`}
              className="p-2 rounded-lg bg-white/60 dark:bg-zinc-800/40 border border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-between opacity-65 cursor-default select-none"
            >
              <span className="text-zinc-600 dark:text-zinc-400">
                {state.name}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                {state.topRateText}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
