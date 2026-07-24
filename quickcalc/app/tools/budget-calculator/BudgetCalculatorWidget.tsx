"use client";

import { useState } from "react";

interface BudgetSplit {
  needsPct: number;
  wantsPct: number;
  savingsPct: number;
  name: string;
}

const PRESETS: BudgetSplit[] = [
  { name: "50/30/20 (Standard)", needsPct: 50, wantsPct: 30, savingsPct: 20 },
  { name: "60/20/20 (High Cost of Living)", needsPct: 60, wantsPct: 20, savingsPct: 20 },
  { name: "70/20/10 (Tight Budget)", needsPct: 70, wantsPct: 20, savingsPct: 10 },
  { name: "50/15/35 (Aggressive Debt/Savings)", needsPct: 50, wantsPct: 15, savingsPct: 35 },
];

export default function BudgetCalculatorWidget() {
  const [income, setIncome] = useState<number | "">(3000);
  const [selectedPreset, setSelectedPreset] = useState<BudgetSplit>(PRESETS[0]);
  const [copied, setCopied] = useState(false);

  // Reality Check State
  const [showRealityCheck, setShowRealityCheck] = useState(false);
  const [actualNeeds, setActualNeeds] = useState<number | "">("");
  const [actualWants, setActualWants] = useState<number | "">("");
  const [actualSavings, setActualSavings] = useState<number | "">("");

  // Input Validation
  const handleIncomeChange = (val: string) => {
    if (val === "") {
      setIncome("");
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) {
      setIncome(num);
    }
  };

  const handleActualChange = (category: "needs" | "wants" | "savings", val: string) => {
    if (val === "") {
      if (category === "needs") setActualNeeds("");
      if (category === "wants") setActualWants("");
      if (category === "savings") setActualSavings("");
      return;
    }
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0) {
      if (category === "needs") setActualNeeds(num);
      if (category === "wants") setActualWants(num);
      if (category === "savings") setActualSavings(num);
    }
  };

  const handleReset = () => {
    setIncome(3000);
    setSelectedPreset(PRESETS[0]);
    setShowRealityCheck(false);
    setActualNeeds("");
    setActualWants("");
    setActualSavings("");
  };

  const currentIncome = income === "" ? 0 : income;

  // Real-time calculated ideal split
  const idealNeeds = (currentIncome * selectedPreset.needsPct) / 100;
  const idealWants = (currentIncome * selectedPreset.wantsPct) / 100;
  const idealSavings = (currentIncome * selectedPreset.savingsPct) / 100;

  // Comparison logic for Reality Check
  const realNeedsVal = actualNeeds === "" ? 0 : actualNeeds;
  const realWantsVal = actualWants === "" ? 0 : actualWants;
  const realSavingsVal = actualSavings === "" ? 0 : actualSavings;

  const diffNeeds = realNeedsVal - idealNeeds;
  const diffWants = realWantsVal - idealWants;
  const diffSavings = realSavingsVal - idealSavings;

  const handleCopy = async () => {
    const ruleStr = `${selectedPreset.needsPct}/${selectedPreset.wantsPct}/${selectedPreset.savingsPct} rule`;
    const shareText = `My monthly budget: $${currentIncome.toLocaleString()} income -> $${idealNeeds.toLocaleString()} Needs, $${idealWants.toLocaleString()} Wants, $${idealSavings.toLocaleString()} Savings (${ruleStr}) - planned at quickcalc.cloud/tools/budget-calculator`;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  // Helper to style diff badges
  const renderDiffBadge = (diff: number, isSavingsCategory = false) => {
    if (diff === 0) return <span className="text-xs font-semibold text-zinc-500">Perfectly on target!</span>;
    
    // For savings, over is good (positive), under is bad (negative)
    // For needs/wants, under is good (negative), over is bad (positive)
    const isOver = diff > 0;
    const absDiff = Math.abs(diff).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    if (isSavingsCategory) {
      if (isOver) {
        return <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">+${absDiff} over target (Great job!)</span>;
      } else {
        return <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">-${absDiff} under target (Save more if possible)</span>;
      }
    } else {
      if (isOver) {
        return <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">+${absDiff} over budget (Try to reduce)</span>;
      } else {
        return <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">-${absDiff} under budget (Excellent!)</span>;
      }
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-all">
      {/* Premium Header Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 p-6 text-white text-center">
        <h3 className="text-2xl font-bold">📊 Premium 50/30/20 Budget Planner</h3>
        <p className="text-xs text-blue-50 mt-1.5 max-w-lg mx-auto">
          Instantly structure your income, map out essential vs lifestyle expenses, set savings goals, and cross-examine actual spending.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Input & Preset Buttons */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2 w-full">
              <label htmlFor="income" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Monthly Take-Home Income ($)
              </label>
              <input
                id="income"
                type="number"
                min="0"
                placeholder="Enter after-tax income"
                value={income}
                onChange={(e) => handleIncomeChange(e.target.value)}
                className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium rounded-xl text-sm transition-colors shadow-sm self-stretch flex items-center justify-center"
            >
              Reset
            </button>
          </div>

          <div className="space-y-2">
            <span className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Budget Rules & Percentages Target
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESETS.map((preset) => {
                const isActive = selectedPreset.name === preset.name;
                return (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setSelectedPreset(preset)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border text-center ${
                      isActive
                        ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/10"
                        : "bg-white hover:bg-zinc-50 dark:bg-zinc-900 dark:hover:bg-zinc-850 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {preset.name.split(" ")[0]}
                    <span className="block text-[10px] opacity-75 font-normal mt-0.5">
                      {preset.name.includes("Standard")
                        ? "Standard"
                        : preset.name.includes("High Cost")
                        ? "HCOL"
                        : preset.name.includes("Tight")
                        ? "Tight"
                        : "Aggressive"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Visual Allocation Bar */}
        <div className="space-y-2 bg-zinc-50/50 dark:bg-zinc-950/20 p-4 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl">
          <div className="flex justify-between items-center text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">
            <span>Visual Split Mapping</span>
            <span>Total: 100%</span>
          </div>

          <div className="h-6 w-full rounded-xl overflow-hidden flex shadow-inner">
            {selectedPreset.needsPct > 0 && (
              <div
                style={{ width: `${selectedPreset.needsPct}%` }}
                className="bg-blue-500 transition-all duration-300 flex items-center justify-center text-white text-[10px] font-bold"
                title={`Needs: ${selectedPreset.needsPct}%`}
              >
                {selectedPreset.needsPct}%
              </div>
            )}
            {selectedPreset.wantsPct > 0 && (
              <div
                style={{ width: `${selectedPreset.wantsPct}%` }}
                className="bg-indigo-500 transition-all duration-300 flex items-center justify-center text-white text-[10px] font-bold"
                title={`Wants: ${selectedPreset.wantsPct}%`}
              >
                {selectedPreset.wantsPct}%
              </div>
            )}
            {selectedPreset.savingsPct > 0 && (
              <div
                style={{ width: `${selectedPreset.savingsPct}%` }}
                className="bg-emerald-500 transition-all duration-300 flex items-center justify-center text-white text-[10px] font-bold"
                title={`Savings: ${selectedPreset.savingsPct}%`}
              >
                {selectedPreset.savingsPct}%
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-xs mt-2 justify-center">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-blue-500"></span>
              <span className="text-zinc-600 dark:text-zinc-400 font-medium">Needs ({selectedPreset.needsPct}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-indigo-500"></span>
              <span className="text-zinc-600 dark:text-zinc-400 font-medium">Wants ({selectedPreset.wantsPct}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500"></span>
              <span className="text-zinc-600 dark:text-zinc-400 font-medium">Savings ({selectedPreset.savingsPct}%)</span>
            </div>
          </div>
        </div>

        {/* Three Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Needs Category */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  🏠 Needs ({selectedPreset.needsPct}%)
                </span>
              </div>
              <div className="text-2xl font-black text-zinc-900 dark:text-white">
                ${idealNeeds.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider block">
                  Example Expenses:
                </span>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1 pl-4 list-disc">
                  <li>Rent / Mortgage</li>
                  <li>Groceries & Food</li>
                  <li>Basic Utilities</li>
                  <li>Insurance & Min Debts</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Wants Category */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  🍕 Wants ({selectedPreset.wantsPct}%)
                </span>
              </div>
              <div className="text-2xl font-black text-zinc-900 dark:text-white">
                ${idealWants.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider block">
                  Example Expenses:
                </span>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1 pl-4 list-disc">
                  <li>Dining Out</li>
                  <li>Entertainment</li>
                  <li>Subscriptions (Netflix, etc)</li>
                  <li>Hobbies & Gym</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Savings Category */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  🐷 Savings ({selectedPreset.savingsPct}%)
                </span>
              </div>
              <div className="text-2xl font-black text-zinc-900 dark:text-white">
                ${idealSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider block">
                  Example Expenses:
                </span>
                <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1 pl-4 list-disc">
                  <li>Emergency Fund</li>
                  <li>Investments / IRA</li>
                  <li>Extra Debt Repayments</li>
                  <li>Long-term Savings</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Copy My Budget Plan */}
        <div className="border border-indigo-100 dark:border-indigo-950/30 rounded-2xl bg-indigo-50/20 dark:bg-indigo-950/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <span className="text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-widest block">
              💡 Export Your Budget Strategy
            </span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md">
              Copy a perfectly-formatted text summary of your custom budget mapping to save in notes or share with family!
            </p>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all w-full sm:w-auto ${
              copied
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10 scale-102"
                : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10 active:scale-98"
            }`}
          >
            {copied ? (
              <>
                <span>✔️ Copied Strategy!</span>
              </>
            ) : (
              <>
                <span>🔗 Copy My Budget Plan</span>
              </>
            )}
          </button>
        </div>

        {/* Optional Reality Check Toggle Button */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setShowRealityCheck(!showRealityCheck)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            {showRealityCheck ? "🙈 Hide Actual Spending Comparison" : "🔍 Run a Spending Reality Check"}
          </button>
        </div>

        {/* Reality Check Section */}
        {showRealityCheck && (
          <div className="bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 space-y-6 animate-fadeIn">
            <div>
              <h4 className="text-md font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 uppercase tracking-wide">
                ⚖️ Actual vs. Planned Budget Reality Check
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Enter your exact or estimated monthly spending in each category to compare your actual layout with the recommended distribution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="actualNeeds" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Actual Needs Spent ($)
                </label>
                <input
                  id="actualNeeds"
                  type="number"
                  min="0"
                  placeholder="e.g. 1600"
                  value={actualNeeds}
                  onChange={(e) => handleActualChange("needs", e.target.value)}
                  className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="actualWants" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Actual Wants Spent ($)
                </label>
                <input
                  id="actualWants"
                  type="number"
                  min="0"
                  placeholder="e.g. 800"
                  value={actualWants}
                  onChange={(e) => handleActualChange("wants", e.target.value)}
                  className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="actualSavings" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Actual Savings/Debt Repay ($)
                </label>
                <input
                  id="actualSavings"
                  type="number"
                  min="0"
                  placeholder="e.g. 600"
                  value={actualSavings}
                  onChange={(e) => handleActualChange("savings", e.target.value)}
                  className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Reality Check Analysis Results */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-xl p-4 space-y-4">
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">
                Analysis Breakdown
              </span>

              <div className="space-y-3 text-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <div>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">Needs Analysis</span>
                    <span className="text-xs text-zinc-500">Planned: ${idealNeeds.toLocaleString()} vs. Actual: ${realNeedsVal.toLocaleString()}</span>
                  </div>
                  <div>
                    {renderDiffBadge(diffNeeds, false)}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <div>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">Wants Analysis</span>
                    <span className="text-xs text-zinc-500">Planned: ${idealWants.toLocaleString()} vs. Actual: ${realWantsVal.toLocaleString()}</span>
                  </div>
                  <div>
                    {renderDiffBadge(diffWants, false)}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                  <div>
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200 block">Savings Analysis</span>
                    <span className="text-xs text-zinc-500">Planned: ${idealSavings.toLocaleString()} vs. Actual: ${realSavingsVal.toLocaleString()}</span>
                  </div>
                  <div>
                    {renderDiffBadge(diffSavings, true)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}