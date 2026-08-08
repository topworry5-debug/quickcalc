"use client";

import { useState, useMemo, useCallback } from "react";
import { calculateLoan, LoanResult } from "../../../lib/calculators/loanCalculator";
import { GitCompare, TrendingDown, Minus, ChevronDown } from "lucide-react";

interface ScenarioInputs {
  principal: string;
  annualRate: string;
  tenure: string;
  tenureUnit: "years" | "months";
  label: string;
}

interface ScenarioCardProps {
  scenario: ScenarioInputs;
  result: LoanResult | null;
  onChange: (updated: ScenarioInputs) => void;
  accentColor: "teal" | "indigo";
  id: "a" | "b";
  formatCurrency: (v: number) => string;
}

function ScenarioCard({ scenario, result, onChange, accentColor, id, formatCurrency }: ScenarioCardProps) {
  const accent = accentColor === "teal"
    ? {
        gradient: "from-teal-600 to-cyan-500",
        ring: "focus:ring-teal-500",
        border: "border-teal-500/30 dark:border-teal-500/30",
        badge: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20",
        headerBg: "from-teal-600 to-cyan-600",
        highlight: "text-teal-600 dark:text-teal-400",
      }
    : {
        gradient: "from-indigo-600 to-violet-600",
        ring: "focus:ring-indigo-500",
        border: "border-indigo-500/30 dark:border-indigo-500/30",
        badge: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20",
        headerBg: "from-indigo-600 to-violet-600",
        highlight: "text-indigo-600 dark:text-indigo-400",
      };

  return (
    <div className={`flex-1 min-w-0 rounded-2xl border overflow-hidden shadow-sm ${accent.border} bg-white dark:bg-zinc-900`}>
      {/* Option header */}
      <div className={`bg-gradient-to-r ${accent.headerBg} p-4 text-white flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold bg-white/20 px-2 py-0.5 rounded-full">
            Option {id.toUpperCase()}
          </span>
        </div>
        <input
          value={scenario.label}
          onChange={(e) => onChange({ ...scenario, label: e.target.value })}
          className="text-xs font-semibold bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/40 max-w-[130px] text-right"
          placeholder="Label (e.g. Bank A)"
        />
      </div>

      {/* Inputs */}
      <div className="p-4 space-y-3">
        {/* Principal */}
        <div>
          <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
            Loan Amount
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-zinc-400 text-sm">$</span>
            <input
              type="number"
              min="1"
              value={scenario.principal}
              onChange={(e) => onChange({ ...scenario, principal: e.target.value })}
              className={`w-full pl-7 pr-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 ${accent.ring}`}
            />
          </div>
        </div>

        {/* Rate + Tenure row */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Annual Rate (%)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="0"
                value={scenario.annualRate}
                onChange={(e) => onChange({ ...scenario, annualRate: e.target.value })}
                className={`w-full pl-3 pr-7 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 ${accent.ring}`}
              />
              <span className="absolute inset-y-0 right-2.5 flex items-center text-zinc-400 text-xs">%</span>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
              Tenure
            </label>
            <input
              type="number"
              min="1"
              value={scenario.tenure}
              onChange={(e) => onChange({ ...scenario, tenure: e.target.value })}
              className={`w-full px-3 py-2.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 ${accent.ring}`}
            />
          </div>
        </div>

        {/* Tenure unit */}
        <div className="flex gap-2">
          {(["years", "months"] as const).map((unit) => (
            <button
              key={unit}
              type="button"
              onClick={() => onChange({ ...scenario, tenureUnit: unit })}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                scenario.tenureUnit === unit
                  ? accentColor === "teal"
                    ? "bg-teal-50 dark:bg-teal-950/40 border-teal-400 text-teal-700 dark:text-teal-300"
                    : "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400 text-indigo-700 dark:text-indigo-300"
                  : "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500"
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="border-t border-zinc-100 dark:border-zinc-800 p-4 bg-zinc-50/50 dark:bg-zinc-950/30 space-y-3">
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 mb-1">Monthly EMI</p>
            <span className={`text-2xl font-extrabold ${accent.highlight}`}>
              {formatCurrency(result.monthlyEMI)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div>
              <p className="text-[10px] text-zinc-400 font-medium">Total Interest</p>
              <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200 mt-0.5">
                {formatCurrency(result.totalInterestPayable)}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-medium">Total Payment</p>
              <p className="text-sm font-bold text-zinc-700 dark:text-zinc-200 mt-0.5">
                {formatCurrency(result.totalPayment)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LoanCompareMode() {
  const [scenarioA, setScenarioA] = useState<ScenarioInputs>({
    label: "Option A",
    principal: "250000",
    annualRate: "6.5",
    tenure: "30",
    tenureUnit: "years",
  });

  const [scenarioB, setScenarioB] = useState<ScenarioInputs>({
    label: "Option B",
    principal: "250000",
    annualRate: "7.25",
    tenure: "30",
    tenureUnit: "years",
  });

  const [showAmortization, setShowAmortization] = useState(false);

  const calc = useCallback((s: ScenarioInputs): LoanResult | null => {
    const p = parseFloat(s.principal);
    const r = parseFloat(s.annualRate);
    const t = parseFloat(s.tenure);
    if (!p || p <= 0 || isNaN(r) || r < 0 || !t || t <= 0) return null;
    return calculateLoan({ principal: p, annualRate: r, tenure: t, tenureUnit: s.tenureUnit });
  }, []);

  const resultA = useMemo(() => calc(scenarioA), [calc, scenarioA]);
  const resultB = useMemo(() => calc(scenarioB), [calc, scenarioB]);

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(v);

  const formatCurrencyFull = (v: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);

  // Determine which option is cheaper
  const comparison = useMemo(() => {
    if (!resultA || !resultB) return null;

    const emiDiff = resultA.monthlyEMI - resultB.monthlyEMI;
    const interestDiff = resultA.totalInterestPayable - resultB.totalInterestPayable;
    const totalDiff = resultA.totalPayment - resultB.totalPayment;

    // "Better" = lower total payment
    const aIsBetter = totalDiff < 0;
    const winner = aIsBetter ? scenarioA.label || "Option A" : scenarioB.label || "Option B";
    const loser = aIsBetter ? scenarioB.label || "Option B" : scenarioA.label || "Option A";
    const savingsTotal = Math.abs(totalDiff);
    const savingsInterest = Math.abs(interestDiff);
    const savingsMonthly = Math.abs(emiDiff);

    return {
      aIsBetter,
      winner,
      loser,
      savingsTotal,
      savingsInterest,
      savingsMonthly,
      emiDiff,
      interestDiff,
      totalDiff,
      tie: Math.abs(totalDiff) < 0.01,
    };
  }, [resultA, resultB, scenarioA.label, scenarioB.label]);

  return (
    <div className="space-y-6">
      {/* Intro caption */}
      <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
        <GitCompare size={14} className="shrink-0" />
        Enter two loan scenarios below. Results and savings are calculated automatically as you type.
      </p>

      {/* Side-by-side inputs + results */}
      <div className="flex flex-col sm:flex-row gap-4">
        <ScenarioCard
          id="a"
          scenario={scenarioA}
          result={resultA}
          onChange={setScenarioA}
          accentColor="teal"
          formatCurrency={formatCurrency}
        />
        <ScenarioCard
          id="b"
          scenario={scenarioB}
          result={resultB}
          onChange={setScenarioB}
          accentColor="indigo"
          formatCurrency={formatCurrency}
        />
      </div>

      {/* Comparison Summary Banner */}
      {comparison && !comparison.tie && (
        <div className={`rounded-2xl border p-5 space-y-4 shadow-sm ${
          comparison.aIsBetter
            ? "bg-teal-50/60 dark:bg-teal-950/30 border-teal-200/60 dark:border-teal-800/50"
            : "bg-indigo-50/60 dark:bg-indigo-950/30 border-indigo-200/60 dark:border-indigo-800/50"
        }`}>
          {/* Verdict headline */}
          <div className="flex items-start gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              comparison.aIsBetter
                ? "bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-400"
                : "bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400"
            }`}>
              <TrendingDown size={18} />
            </div>
            <div>
              <p className={`text-sm font-extrabold ${
                comparison.aIsBetter ? "text-teal-700 dark:text-teal-300" : "text-indigo-700 dark:text-indigo-300"
              }`}>
                {comparison.winner} saves you more over the loan term
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Choosing {comparison.winner} over {comparison.loser} means paying{" "}
                <strong>{formatCurrencyFull(comparison.savingsTotal)}</strong> less in total.
              </p>
            </div>
          </div>

          {/* Metric diff grid */}
          <div className="grid grid-cols-3 gap-3">
            {/* Monthly EMI diff */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 text-center space-y-1">
              <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Monthly Saving</p>
              <div className="flex items-center justify-center gap-1">
                {Math.abs(comparison.savingsMonthly) > 0.005 ? (
                  <TrendingDown size={12} className="text-emerald-500" />
                ) : (
                  <Minus size={12} className="text-zinc-400" />
                )}
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  {formatCurrencyFull(comparison.savingsMonthly)}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400">per month</p>
            </div>

            {/* Total interest diff */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 text-center space-y-1">
              <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Interest Saved</p>
              <div className="flex items-center justify-center gap-1">
                <TrendingDown size={12} className="text-emerald-500" />
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(comparison.savingsInterest)}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400">total interest</p>
            </div>

            {/* Total payment diff */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 text-center space-y-1">
              <p className="text-[10px] uppercase tracking-wider font-bold text-zinc-400">Total Saving</p>
              <div className="flex items-center justify-center gap-1">
                <TrendingDown size={12} className="text-emerald-500" />
                <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(comparison.savingsTotal)}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400">over loan term</p>
            </div>
          </div>
        </div>
      )}

      {/* Tie state */}
      {comparison?.tie && (
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900 text-center text-sm text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-2">
          <Minus size={16} />
          <span>Both options result in equal total payments.</span>
        </div>
      )}

      {/* Side-by-side amortization table (expandable) */}
      {resultA && resultB && (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowAmortization((v) => !v)}
            className="w-full flex items-center justify-between px-5 py-3.5 bg-zinc-50 dark:bg-zinc-900 text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          >
            <span>Side-by-Side Amortization Schedule</span>
            <ChevronDown
              size={16}
              className={`text-zinc-400 transition-transform ${showAmortization ? "rotate-180" : ""}`}
            />
          </button>

          {showAmortization && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-xs text-left">
                <thead className="bg-zinc-50 dark:bg-zinc-800/40 text-zinc-500 font-bold">
                  <tr>
                    <th className="px-4 py-3">Year</th>
                    <th className="px-4 py-3 text-teal-600 dark:text-teal-400">A — EMI Balance</th>
                    <th className="px-4 py-3 text-teal-600 dark:text-teal-400">A — Interest</th>
                    <th className="px-4 py-3 text-indigo-600 dark:text-indigo-400">B — EMI Balance</th>
                    <th className="px-4 py-3 text-indigo-600 dark:text-indigo-400">B — Interest</th>
                    <th className="px-4 py-3">Δ Interest (A vs B)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-300">
                  {resultA.amortizationTable.map((rowA, i) => {
                    const rowB = resultB.amortizationTable[i];
                    if (!rowB) return null;
                    const interestDiff = rowA.interestPaid - rowB.interestPaid;
                    return (
                      <tr key={rowA.yearNumber} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition">
                        <td className="px-4 py-2.5 font-semibold text-zinc-800 dark:text-zinc-100">Yr {rowA.yearNumber}</td>
                        <td className="px-4 py-2.5 text-teal-600 dark:text-teal-400 font-medium">{formatCurrency(rowA.endingBalance)}</td>
                        <td className="px-4 py-2.5 text-teal-600 dark:text-teal-400">{formatCurrency(rowA.interestPaid)}</td>
                        <td className="px-4 py-2.5 text-indigo-600 dark:text-indigo-400 font-medium">{formatCurrency(rowB.endingBalance)}</td>
                        <td className="px-4 py-2.5 text-indigo-600 dark:text-indigo-400">{formatCurrency(rowB.interestPaid)}</td>
                        <td className={`px-4 py-2.5 font-bold ${interestDiff < 0 ? "text-emerald-600 dark:text-emerald-400" : interestDiff > 0 ? "text-rose-600 dark:text-rose-400" : "text-zinc-400"}`}>
                          {interestDiff < 0 ? "−" : interestDiff > 0 ? "+" : ""}
                          {formatCurrency(Math.abs(interestDiff))}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
