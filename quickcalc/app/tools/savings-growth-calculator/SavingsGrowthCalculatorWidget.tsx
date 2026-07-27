"use client";

import { useState, useEffect } from "react";
import { calculateSavingsGrowth, SavingsCalculationResult } from "@/lib/calculators/savingsGrowthCalculator";

export default function SavingsGrowthCalculatorWidget() {
  const [initialDeposit, setInitialDeposit] = useState<number>(5000);
  const [regularAmount, setRegularAmount] = useState<number>(200);
  const [frequency, setFrequency] = useState<"monthly" | "yearly">("monthly");
  const [annualRate, setAnnualRate] = useState<number>(6);
  const [compoundingFrequency, setCompoundingFrequency] = useState<"annually" | "monthly" | "daily">("monthly");
  const [years, setYears] = useState<number>(10);

  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<SavingsCalculationResult | null>(null);

  useEffect(() => {
    // Perform calculation on inputs
    const calcResult = calculateSavingsGrowth(
      initialDeposit || 0,
      regularAmount || 0,
      frequency,
      annualRate || 0,
      compoundingFrequency,
      years || 0
    );
    setResult(calcResult);
  }, [initialDeposit, regularAmount, frequency, annualRate, compoundingFrequency, years]);

  const handleCopy = () => {
    if (!result) return;
    const text = `Savings Growth Summary:
- Initial Deposit: $${(initialDeposit || 0).toLocaleString()}
- Regular Contribution: $${(regularAmount || 0).toLocaleString()} (${frequency})
- Annual Interest Rate: ${annualRate || 0}%
- Compounding: ${compoundingFrequency}
- Time Period: ${years || 0} years

Results:
- Total Contributed: $${result.totalContributed.toLocaleString()}
- Total Interest Earned: $${result.totalInterest.toLocaleString()}
- Final Balance: $${result.finalBalance.toLocaleString()}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Check if years is 0 or empty for placeholder state
  const isPlaceholderState = !years || years <= 0;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden transition-colors">
      <div className="p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Inputs Section */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3">
              Configure Your Plan
            </h2>

            {/* Initial Deposit */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Initial Deposit (Lump Sum)
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">$</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={initialDeposit === 0 ? "" : initialDeposit}
                  onChange={(e) => {
                    const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                    setInitialDeposit(isNaN(val) ? 0 : val);
                  }}
                  className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 py-3 pl-9 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-teal-500 focus:ring-teal-500 text-sm transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Regular Contribution */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Regular Contribution
                </label>
                <div className="flex bg-zinc-100 dark:bg-zinc-850 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700 text-xs">
                  <button
                    type="button"
                    onClick={() => setFrequency("monthly")}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      frequency === "monthly"
                        ? "bg-white dark:bg-zinc-700 text-teal-600 dark:text-teal-400 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency("yearly")}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      frequency === "yearly"
                        ? "bg-white dark:bg-zinc-700 text-teal-600 dark:text-teal-400 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>
              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <span className="text-zinc-500 dark:text-zinc-400 font-medium">$</span>
                </div>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={regularAmount === 0 ? "" : regularAmount}
                  onChange={(e) => {
                    const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                    setRegularAmount(isNaN(val) ? 0 : val);
                  }}
                  className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 py-3 pl-9 pr-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-teal-500 focus:ring-teal-500 text-sm transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Interest Rate & Compounding Frequency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Annual Rate (%)
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={annualRate === 0 ? "" : annualRate}
                    onChange={(e) => {
                      const val = e.target.value === "" ? 0 : parseFloat(e.target.value);
                      setAnnualRate(isNaN(val) ? 0 : val);
                    }}
                    className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 py-3 px-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-teal-500 focus:ring-teal-500 text-sm transition-colors"
                    placeholder="0.00"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-zinc-500 dark:text-zinc-400 font-medium">%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Compounding
                </label>
                <select
                  value={compoundingFrequency}
                  onChange={(e) => setCompoundingFrequency(e.target.value as "annually" | "monthly" | "daily")}
                  className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 py-3 px-4 text-zinc-900 dark:text-white focus:border-teal-500 focus:ring-teal-500 text-sm transition-colors"
                >
                  <option value="annually">Annually</option>
                  <option value="monthly">Monthly</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
            </div>

            {/* Time Period (Years) */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Time Period (Years)
              </label>
              <input
                type="number"
                min="0"
                step="1"
                value={years === 0 ? "" : years}
                onChange={(e) => {
                  const val = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
                  setYears(isNaN(val) ? 0 : val);
                }}
                className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 py-3 px-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-teal-500 focus:ring-teal-500 text-sm transition-colors"
                placeholder="0"
              />
            </div>
          </div>

          {/* Results/Output Section */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {isPlaceholderState || !result ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-900">
                <span className="text-4xl mb-3">📈</span>
                <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
                  Let's Calculate Your Growth!
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mt-1">
                  Adjust the initial deposit, regular savings, interest rate, and select a duration above 0 years to see your money compile.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                    Growth Projections
                  </h2>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-700 dark:text-zinc-300 transition-colors"
                  >
                    {copied ? "✅ Copied!" : "📋 Copy Results"}
                  </button>
                </div>

                {/* Key Numbers Side-by-Side */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-900 text-center sm:text-left transition-colors">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                      Total Contributed
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-teal-600 dark:text-teal-400 block mt-1">
                      ${result.totalContributed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-900 text-center sm:text-left transition-colors">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider block">
                      Interest Earned
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-indigo-600 dark:text-indigo-400 block mt-1">
                      ${result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="bg-teal-50 dark:bg-teal-950/20 p-4 rounded-2xl border border-teal-100 dark:border-teal-900/30 text-center sm:text-left transition-colors">
                    <span className="text-xs font-medium text-teal-700 dark:text-teal-400 uppercase tracking-wider block">
                      Final Total Balance
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-teal-700 dark:text-teal-300 block mt-1">
                      ${result.finalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* Contribution-vs-Interest Visual Split */}
                <div className="space-y-2 mt-6">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-teal-500 rounded-full inline-block"></span>
                      Your Contributions: {((result.totalContributed / result.finalBalance) * 100).toFixed(1)}%
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full inline-block"></span>
                      Interest Earned: {result.finalBalance > 0 ? ((result.totalInterest / result.finalBalance) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  {/* Two-color progress split bar */}
                  <div className="w-full h-5 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex border border-zinc-200 dark:border-zinc-700">
                    <div
                      className="bg-teal-500 dark:bg-teal-600 transition-all duration-500"
                      style={{ width: `${(result.totalContributed / result.finalBalance) * 100}%` }}
                    />
                    <div
                      className="bg-indigo-500 dark:bg-indigo-600 transition-all duration-500 flex-1"
                    />
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 italic text-center mt-1">
                    See how a simple investment compiles over time — the visual split helps you clearly distinguish your principal contributions from the compounding interest.
                  </p>
                </div>

                {/* Prompt visual of what compounding does */}
                <div className="text-xs bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-900 text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4">
                  {result.totalInterest > 0 ? (
                    <span>
                      💡 Thanks to compound interest, you earned an extra <strong>${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> purely from growth, magnifying your savings by <strong>{((result.finalBalance / result.totalContributed) * 100 - 100).toFixed(0)}%</strong> over your contributions!
                    </span>
                  ) : (
                    <span>
                      💡 With 0% interest rate, your balance grows strictly based on contributions. Explore custom rates above to see how compound interest accelerates wealth creation!
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Year-by-Year Growth Table */}
        {!isPlaceholderState && result && result.yearlyData.length > 0 && (
          <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-850">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
              <span>📅</span> Year-by-Year Compound Breakdown
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
              Track the trajectory of your growth. Notice how the annual interest earned increases exponentially in later years as the compounding effect multiplies.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-350 text-[11px] uppercase tracking-wider font-bold">
                    <th className="py-4 px-4 sm:px-6">Year</th>
                    <th className="py-4 px-4 sm:px-6">Contributions (Yearly)</th>
                    <th className="py-4 px-4 sm:px-6">Interest Earned (Yearly)</th>
                    <th className="py-4 px-4 sm:px-6">Total Contributions</th>
                    <th className="py-4 px-4 sm:px-6">Total Interest</th>
                    <th className="py-4 px-4 sm:px-6 text-right">Ending Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50 text-zinc-800 dark:text-zinc-200">
                  {result.yearlyData.map((row) => (
                    <tr key={row.year} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20 transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-semibold text-zinc-900 dark:text-white">
                        Yr {row.year}
                      </td>
                      <td className="py-4 px-4 sm:px-6">
                        ${row.contributionsThisYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 sm:px-6 font-medium text-indigo-600 dark:text-indigo-400">
                        +${row.interestThisYear.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-zinc-500 dark:text-zinc-400">
                        ${row.cumulativeContributions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-zinc-500 dark:text-zinc-400">
                        ${row.cumulativeInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 sm:px-6 text-right font-bold text-teal-700 dark:text-teal-400">
                        ${row.endBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
