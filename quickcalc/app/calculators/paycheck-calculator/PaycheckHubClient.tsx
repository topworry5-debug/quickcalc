"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  StateTaxData,
  calculatePaycheck,
} from "@/lib/taxData";
import { formatCurrency } from "@/lib/calculators/creditCardPayoffCalculator";
import {
  Search,
  Sparkles,
  ArrowRight,
  Sliders,
} from "lucide-react";

interface PaycheckHubClientProps {
  states: StateTaxData[];
}

type FilterCategory = "all" | "no-tax" | "flat" | "progressive" | "popular";

export default function PaycheckHubClient({ states }: PaycheckHubClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>("all");
  const [benchmarkSalary, setBenchmarkSalary] = useState<number>(75000);

  // Precompute calculations for the selected benchmark salary
  const stateCards = useMemo(() => {
    return states.map((state) => {
      const calc = calculatePaycheck(
        {
          wage: benchmarkSalary,
          wageType: "annual",
          hoursPerWeek: 40,
          payFrequency: "biweekly",
          filingStatus: "single",
        },
        state
      );

      return {
        ...state,
        annualNet: calc.annualNetPay,
        biweeklyNet: calc.selectedPeriod.netPay,
        annualStateTax: calc.annualStateTax,
        takeHomePct: calc.takeHomePercentage,
      };
    });
  }, [states, benchmarkSalary]);

  // Filtered states based on search & category
  const filteredStates = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return stateCards.filter((s) => {
      const matchesSearch =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.abbrev.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (selectedFilter === "all") return true;
      if (selectedFilter === "no-tax") return !s.hasIncomeTax;
      if (selectedFilter === "flat") return s.hasIncomeTax && s.taxType === "flat";
      if (selectedFilter === "progressive") return s.hasIncomeTax && s.taxType === "graduated";
      if (selectedFilter === "popular") return s.popular;

      return true;
    });
  }, [stateCards, searchTerm, selectedFilter]);

  // Top popular states for hero carousel / highlights
  const popularStates = useMemo(() => {
    return stateCards.filter((s) => s.popular);
  }, [stateCards]);

  // Benchmark salary presets
  const salaryPresets = [50000, 75000, 100000, 150000];

  return (
    <div className="space-y-10">
      {/* Top Benchmark Salary Selector */}
      <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>Interactive Salary Benchmark</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white mt-1">
              Compare State Take-Home on {formatCurrency(benchmarkSalary)} / Year
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Select a benchmark gross salary to see estimated net take-home across all 50 states for a Single filer.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {salaryPresets.map((sal) => (
              <button
                key={sal}
                type="button"
                onClick={() => setBenchmarkSalary(sal)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  benchmarkSalary === sal
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {formatCurrency(sal)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popular States Quick Links */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Most Popular US State Calculators</span>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            High-traffic states
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {popularStates.map((st) => (
            <Link
              key={st.slug}
              href={`/calculators/paycheck-calculator/${st.slug}`}
              className="group p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-emerald-500/50 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="w-8 h-8 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-extrabold text-xs flex items-center justify-center font-mono group-hover:bg-emerald-100 group-hover:text-emerald-700 dark:group-hover:bg-emerald-950 dark:group-hover:text-emerald-300 transition-colors">
                  {st.abbrev}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    !st.hasIncomeTax
                      ? "bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300"
                      : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  }`}
                >
                  {st.topRateText}
                </span>
              </div>

              <div className="font-bold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {st.name}
              </div>

              <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                Take-Home: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(st.annualNet)}</span>/yr
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by state name or code (e.g. Texas, TX, California)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setSelectedFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedFilter === "all"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              All States ({states.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("no-tax")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedFilter === "no-tax"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-white dark:bg-zinc-900 text-teal-700 dark:text-teal-400 border border-zinc-200 dark:border-zinc-800 hover:bg-teal-50 dark:hover:bg-teal-950/40"
              }`}
            >
              0% No Income Tax (9)
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("flat")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedFilter === "flat"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-white dark:bg-zinc-900 text-blue-700 dark:text-blue-400 border border-zinc-200 dark:border-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950/40"
              }`}
            >
              Flat Tax
            </button>
            <button
              type="button"
              onClick={() => setSelectedFilter("progressive")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedFilter === "progressive"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white dark:bg-zinc-900 text-indigo-700 dark:text-indigo-400 border border-zinc-200 dark:border-zinc-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
              }`}
            >
              Progressive Tax
            </button>
          </div>
        </div>

        {/* Results Counter */}
        <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
          <span>
            Showing <strong className="text-zinc-900 dark:text-white font-semibold">{filteredStates.length}</strong> US states
          </span>
          {searchTerm && (
            <span>Filtering by query: &ldquo;{searchTerm}&rdquo;</span>
          )}
        </div>
      </div>

      {/* Grid of All Filtered States */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStates.map((st) => (
          <Link
            key={st.slug}
            href={`/calculators/paycheck-calculator/${st.slug}`}
            className="group block p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-emerald-500/50 hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-mono font-bold text-sm flex items-center justify-center group-hover:bg-emerald-100 group-hover:text-emerald-700 dark:group-hover:bg-emerald-950 dark:group-hover:text-emerald-300 transition-colors">
                  {st.abbrev}
                </span>
                <div>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                    <span>{st.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0" />
                  </h3>
                  <div className="text-xs text-zinc-500 dark:text-zinc-400">
                    {!st.hasIncomeTax
                      ? "No State Income Tax"
                      : st.taxType === "flat"
                      ? `Flat Rate: ${st.topRateText}`
                      : `Graduated Up to ${st.topRateText}`}
                  </div>
                </div>
              </div>

              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                  !st.hasIncomeTax
                    ? "bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-950/50 dark:text-teal-300 dark:border-teal-900"
                    : st.taxType === "flat"
                    ? "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-900"
                    : "bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-900"
                }`}
              >
                {st.topRateText}
              </span>
            </div>

            {/* Estimated Take-Home on Benchmark Salary */}
            <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Est. Net Take-Home:
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatCurrency(st.annualNet)}
                  <span className="text-[10px] text-zinc-500 font-normal">/yr</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">
                  Bi-Weekly Paycheck:
                </span>
                <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
                  {formatCurrency(st.biweeklyNet)}
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-zinc-200/50 dark:border-zinc-700/50">
                <span className="text-zinc-400">
                  State Withholding:
                </span>
                <span className="font-mono font-medium text-zinc-600 dark:text-zinc-300">
                  {formatCurrency(st.annualStateTax)}/yr
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredStates.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            No US states matched your search query &ldquo;<strong>{searchTerm}</strong>&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedFilter("all");
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
