"use client";

import React, { useState, useMemo } from "react";
import {
  calculateRamseyInvestment,
  DEFAULT_RAMSEY_INPUTS,
  RamseyResult,
} from "@/lib/calculators/ramseyCalculator";
import { formatCurrency } from "@/lib/calculators/creditCardPayoffCalculator";
import {
  TrendingUp,
  PieChart,
  Sparkles,
  RotateCcw,
} from "lucide-react";

export default function RamseyCalculatorWidget() {
  const [currentAge, setCurrentAge] = useState<number>(DEFAULT_RAMSEY_INPUTS.currentAge);
  const [retirementAge, setRetirementAge] = useState<number>(DEFAULT_RAMSEY_INPUTS.retirementAge);
  const [startingBalance, setStartingBalance] = useState<number>(DEFAULT_RAMSEY_INPUTS.startingBalance);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(DEFAULT_RAMSEY_INPUTS.monthlyContribution);
  const [annualReturn, setAnnualReturn] = useState<number>(DEFAULT_RAMSEY_INPUTS.annualReturn);

  const result: RamseyResult = useMemo(() => {
    return calculateRamseyInvestment({
      currentAge,
      retirementAge,
      startingBalance,
      monthlyContribution,
      annualReturn,
    });
  }, [currentAge, retirementAge, startingBalance, monthlyContribution, annualReturn]);

  const handleReset = () => {
    setCurrentAge(DEFAULT_RAMSEY_INPUTS.currentAge);
    setRetirementAge(DEFAULT_RAMSEY_INPUTS.retirementAge);
    setStartingBalance(DEFAULT_RAMSEY_INPUTS.startingBalance);
    setMonthlyContribution(DEFAULT_RAMSEY_INPUTS.monthlyContribution);
    setAnnualReturn(DEFAULT_RAMSEY_INPUTS.annualReturn);
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-8 font-sans transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Dave Ramsey Investment Calculator
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Simulate your wealth growth using Dave Ramsey&apos;s 15% rule and recommended 4-fund portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition min-h-[40px] min-w-[40px] flex items-center justify-center self-start sm:self-auto"
          aria-label="Reset to default values"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-5 space-y-5">
          {/* Ages */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-300 block mb-1">
                  Current Age
                </label>
                <input
                  type="number"
                  min="18"
                  max="79"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value) || 18)}
                  className="w-full px-3 py-1.5 rounded-xl text-center font-mono font-bold text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-zinc-600 dark:text-zinc-300 block mb-1">
                  Retirement Age
                </label>
                <input
                  type="number"
                  min={currentAge + 1}
                  max="90"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(Number(e.target.value) || currentAge + 1)}
                  className="w-full px-3 py-1.5 rounded-xl text-center font-mono font-bold text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>
            </div>
            <div className="text-[11px] text-zinc-400 text-center font-semibold">
              Time horizon: {result.yearsToInvest} years of compounding growth
            </div>
          </div>

          {/* Starting Balance */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-200">
                Starting Investment
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  max="1000000"
                  step="1000"
                  value={startingBalance}
                  onChange={(e) => setStartingBalance(Number(e.target.value) || 0)}
                  className="w-28 pl-7 pr-3 py-1.5 rounded-xl text-right font-mono font-bold text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              step="1000"
              value={startingBalance}
              onChange={(e) => setStartingBalance(Number(e.target.value))}
              className="w-full accent-emerald-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
            />
          </div>

          {/* Monthly Contribution */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-200">
                Monthly Contribution
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  step="50"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
                  className="w-28 pl-7 pr-3 py-1.5 rounded-xl text-right font-mono font-bold text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
              </div>
            </div>
            <input
              type="range"
              min="100"
              max="3000"
              step="50"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full accent-emerald-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[250, 500, 750, 1000, 1500].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setMonthlyContribution(amt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                    monthlyContribution === amt
                      ? "bg-emerald-600 text-white"
                      : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                  }`}
                >
                  ${amt}/mo
                </button>
              ))}
            </div>
          </div>

          {/* Expected Return Rate */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-200">
                Annual Return Rate (%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="4"
                  max="16"
                  step="0.5"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value) || 0)}
                  className="w-24 pr-7 pl-3 py-1.5 rounded-xl text-right font-mono font-bold text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">%</span>
              </div>
            </div>
            <input
              type="range"
              min="6"
              max="14"
              step="0.5"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              className="w-full accent-emerald-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
            />
            <div className="flex gap-2">
              {[
                { label: "8% (Conservative)", val: 8 },
                { label: "10% (S&P 500 Avg)", val: 10 },
                { label: "12% (Ramsey Classic)", val: 12 },
              ].map((rate) => (
                <button
                  key={rate.val}
                  type="button"
                  onClick={() => setAnnualReturn(rate.val)}
                  className={`flex-1 py-1 rounded-lg text-[11px] font-semibold transition text-center ${
                    annualReturn === rate.val
                      ? "bg-emerald-600 text-white"
                      : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                  }`}
                >
                  {rate.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Results */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Hero Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 text-white shadow-2xl relative overflow-hidden border border-zinc-800">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Projected Nest Egg at Age {retirementAge}</span>
            </span>
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              {formatCurrency(result.futureValue)}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 text-center">
              <div className="p-3 rounded-2xl bg-zinc-800/60 border border-zinc-700/50">
                <span className="text-[10px] sm:text-xs text-zinc-400 block">Total Invested</span>
                <span className="text-sm sm:text-lg font-bold text-white font-mono mt-0.5 block">
                  {formatCurrency(result.totalInvested)}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-800/60 border border-zinc-700/50">
                <span className="text-[10px] sm:text-xs text-zinc-400 block">Compound Growth</span>
                <span className="text-sm sm:text-lg font-bold text-emerald-400 font-mono mt-0.5 block">
                  {formatCurrency(result.totalGrowth)}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-800/60 border border-zinc-700/50 col-span-2 sm:col-span-1">
                <span className="text-[10px] sm:text-xs text-zinc-400 block">Monthly Income (4%)</span>
                <span className="text-sm sm:text-lg font-bold text-teal-300 font-mono mt-0.5 block">
                  {formatCurrency(result.monthlyRetirementIncome)}/mo
                </span>
              </div>
            </div>
          </div>

          {/* Dave Ramsey 4-Fund Allocation Breakdown */}
          <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-4">
            <div className="flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                Dave Ramsey&apos;s Recommended 4-Fund Allocation (25% Each)
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="font-bold text-emerald-600 dark:text-emerald-400">Growth (Large Cap)</div>
                <div className="text-base font-extrabold text-zinc-900 dark:text-white font-mono mt-1">
                  {formatCurrency(result.fundAllocation.growth)}
                </div>
                <div className="text-[10px] text-zinc-400">S&amp;P 500 index or blue chip funds</div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="font-bold text-teal-600 dark:text-teal-400">Growth &amp; Income</div>
                <div className="text-base font-extrabold text-zinc-900 dark:text-white font-mono mt-1">
                  {formatCurrency(result.fundAllocation.growthAndIncome)}
                </div>
                <div className="text-[10px] text-zinc-400">Dividend-paying large value funds</div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="font-bold text-indigo-600 dark:text-indigo-400">Aggressive Growth</div>
                <div className="text-base font-extrabold text-zinc-900 dark:text-white font-mono mt-1">
                  {formatCurrency(result.fundAllocation.aggressiveGrowth)}
                </div>
                <div className="text-[10px] text-zinc-400">Mid-cap &amp; small-cap growth funds</div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="font-bold text-purple-600 dark:text-purple-400">International</div>
                <div className="text-base font-extrabold text-zinc-900 dark:text-white font-mono mt-1">
                  {formatCurrency(result.fundAllocation.international)}
                </div>
                <div className="text-[10px] text-zinc-400">Global developed &amp; emerging markets</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
