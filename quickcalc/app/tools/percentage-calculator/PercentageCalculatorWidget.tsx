"use client";

import { useState, useMemo } from "react";
import {
  calculateXPercentOfY,
  calculatePercentageChange,
  calculateDiscount,
  calculateReversePercentage,
} from "../../../lib/calculators/percentageCalculator";

type ActiveMode = "of" | "change" | "discount" | "reverse";

export default function PercentageCalculatorWidget() {
  const [activeMode, setActiveMode] = useState<ActiveMode>("of");
  const [copied, setCopied] = useState<boolean>(false);

  // States for Mode A (X% of Y)
  const [modeAPercent, setModeAPercent] = useState<string>("");
  const [modeATotal, setModeATotal] = useState<string>("");

  // States for Mode B (Increase/Decrease)
  const [modeBOld, setModeBOld] = useState<string>("");
  const [modeBNew, setModeBNew] = useState<string>("");

  // States for Mode C (Discount)
  const [modeCOriginal, setModeCOriginal] = useState<string>("");
  const [modeCPercent, setModeCPercent] = useState<string>("");

  // States for Mode D (Reverse)
  const [modeDFinal, setModeDFinal] = useState<string>("");
  const [modeDPercent, setModeDPercent] = useState<string>("");

  // Validation errors
  const [error, setError] = useState<string>("");

  // Function to validate non-negative values
  const validateNonNegative = (valStr: string, fieldName: string): number | null => {
    if (valStr === "") return null;
    const num = parseFloat(valStr);
    if (isNaN(num)) {
      setError(`Please enter a valid number for ${fieldName}.`);
      return null;
    }
    if (num < 0) {
      setError(`${fieldName} cannot be negative.`);
      return null;
    }
    return num;
  };

  // Reset function
  const handleReset = () => {
    setError("");
    setCopied(false);
    if (activeMode === "of") {
      setModeAPercent("");
      setModeATotal("");
    } else if (activeMode === "change") {
      setModeBOld("");
      setModeBNew("");
    } else if (activeMode === "discount") {
      setModeCOriginal("");
      setModeCPercent("");
    } else if (activeMode === "reverse") {
      setModeDFinal("");
      setModeDPercent("");
    }
  };

  // Calculate results based on mode
  const calculatedData = useMemo(() => {
    setError(""); // Clear error first
    setCopied(false);

    if (activeMode === "of") {
      const pct = validateNonNegative(modeAPercent, "Percentage");
      const tot = validateNonNegative(modeATotal, "Total Amount");

      if (pct === null || tot === null) return null;
      return {
        type: "of" as const,
        ...calculateXPercentOfY(pct, tot),
        pct,
        tot,
      };
    }

    if (activeMode === "change") {
      const oldVal = validateNonNegative(modeBOld, "Old Value");
      const newVal = validateNonNegative(modeBNew, "New Value");

      if (oldVal === null || newVal === null) return null;
      if (oldVal === 0) {
        setError("Old Value cannot be zero for percentage change calculation.");
        return null;
      }
      return {
        type: "change" as const,
        ...calculatePercentageChange(oldVal, newVal),
        oldVal,
        newVal,
      };
    }

    if (activeMode === "discount") {
      const orig = validateNonNegative(modeCOriginal, "Original Price");
      const disc = validateNonNegative(modeCPercent, "Discount Percentage");

      if (orig === null || disc === null) return null;
      if (disc > 100) {
        setError("Discount percentage cannot exceed 100%.");
        return null;
      }
      return {
        type: "discount" as const,
        ...calculateDiscount(orig, disc),
        orig,
        disc,
      };
    }

    if (activeMode === "reverse") {
      const final = validateNonNegative(modeDFinal, "Final Value");
      const pct = validateNonNegative(modeDPercent, "Percentage");

      if (final === null || pct === null) return null;
      if (pct === 0) {
        setError("Percentage cannot be zero for reverse percentage calculation.");
        return null;
      }
      return {
        type: "reverse" as const,
        ...calculateReversePercentage(final, pct),
        final,
        pct,
      };
    }

    return null;
  }, [
    activeMode,
    modeAPercent,
    modeATotal,
    modeBOld,
    modeBNew,
    modeCOriginal,
    modeCPercent,
    modeDFinal,
    modeDPercent,
  ]);

  const handleCopyResult = async () => {
    if (!calculatedData) return;
    let summaryText = "";

    if (calculatedData.type === "of") {
      summaryText = [
        `--- Percentage Calculator (X% of Y) ---`,
        `Percentage: ${calculatedData.pct}%`,
        `Total Value: ${calculatedData.tot}`,
        `Result: ${calculatedData.result}`,
        `Formula Used: ${calculatedData.formula}`,
        `----------------------------------------`,
        `Generated via QuickCalc`,
      ].join("\n");
    } else if (calculatedData.type === "change") {
      summaryText = [
        `--- Percentage Change Calculator ---`,
        `Old Value: ${calculatedData.oldVal}`,
        `New Value: ${calculatedData.newVal}`,
        `Percentage Change: ${calculatedData.percentChange.toFixed(4)}% (${calculatedData.direction})`,
        `Difference: ${calculatedData.difference}`,
        `Formula Used: ${calculatedData.formula}`,
        `------------------------------------`,
        `Generated via QuickCalc`,
      ].join("\n");
    } else if (calculatedData.type === "discount") {
      summaryText = [
        `--- Discount Calculator ---`,
        `Original Price: ${calculatedData.orig}`,
        `Discount Percent: ${calculatedData.disc}%`,
        `Final Price: ${calculatedData.finalPrice}`,
        `Amount Saved: ${calculatedData.amountSaved}`,
        `Formula Used: ${calculatedData.formula}`,
        `---------------------------`,
        `Generated via QuickCalc`,
      ].join("\n");
    } else if (calculatedData.type === "reverse") {
      summaryText = [
        `--- Reverse Percentage Calculator ---`,
        `Final Value: ${calculatedData.final}`,
        `Is ${calculatedData.pct}% of Original`,
        `Original Value: ${calculatedData.originalValue}`,
        `Formula Used: ${calculatedData.formula}`,
        `-------------------------------------`,
        `Generated via QuickCalc`,
      ].join("\n");
    }

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy breakdown", err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold flex items-center justify-center gap-2">
          <span>📊 Real-Time Percentage Calculator</span>
        </h3>
        <p className="text-xs text-blue-100 mt-1">
          Perform fractions, discount, percentage difference and reverse percentage calculations instantly as you type.
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-2 flex flex-wrap gap-1">
        {[
          { id: "of" as const, label: "X% of Y", icon: "✖️" },
          { id: "change" as const, label: "% Increase/Decrease", icon: "📈" },
          { id: "discount" as const, label: "Discount", icon: "🏷️" },
          { id: "reverse" as const, label: "Reverse %", icon: "🔄" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveMode(tab.id);
              setError("");
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl transition-all focus:outline-none ${
              activeMode === tab.id
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="p-6 space-y-6">
        {/* Error message */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 rounded-xl text-sm font-semibold">
            ⚠️ {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Input Fields */}
          <div className="space-y-5">
            {activeMode === "of" && (
              <>
                <div className="space-y-2">
                  <label htmlFor="modeA-percent" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    What is (Percentage %)
                  </label>
                  <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 transition-colors">
                    <input
                      id="modeA-percent"
                      type="number"
                      min="0"
                      step="any"
                      value={modeAPercent}
                      onChange={(e) => setModeAPercent(e.target.value)}
                      placeholder="e.g. 20"
                      className="w-full bg-transparent border-none outline-none focus:ring-0 text-base font-medium text-zinc-900 dark:text-white"
                    />
                    <span className="text-sm font-extrabold text-zinc-400 dark:text-zinc-600 font-mono">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="modeA-total" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    of (Total Value)
                  </label>
                  <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 transition-colors">
                    <input
                      id="modeA-total"
                      type="number"
                      min="0"
                      step="any"
                      value={modeATotal}
                      onChange={(e) => setModeATotal(e.target.value)}
                      placeholder="e.g. 1500"
                      className="w-full bg-transparent border-none outline-none focus:ring-0 text-base font-medium text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>
              </>
            )}

            {activeMode === "change" && (
              <>
                <div className="space-y-2">
                  <label htmlFor="modeB-old" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    From (Old Value)
                  </label>
                  <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 transition-colors">
                    <input
                      id="modeB-old"
                      type="number"
                      min="0"
                      step="any"
                      value={modeBOld}
                      onChange={(e) => setModeBOld(e.target.value)}
                      placeholder="e.g. 100"
                      className="w-full bg-transparent border-none outline-none focus:ring-0 text-base font-medium text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="modeB-new" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    To (New Value)
                  </label>
                  <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 transition-colors">
                    <input
                      id="modeB-new"
                      type="number"
                      min="0"
                      step="any"
                      value={modeBNew}
                      onChange={(e) => setModeBNew(e.target.value)}
                      placeholder="e.g. 150"
                      className="w-full bg-transparent border-none outline-none focus:ring-0 text-base font-medium text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>
              </>
            )}

            {activeMode === "discount" && (
              <>
                <div className="space-y-2">
                  <label htmlFor="modeC-original" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    Original Price
                  </label>
                  <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 transition-colors">
                    <input
                      id="modeC-original"
                      type="number"
                      min="0"
                      step="any"
                      value={modeCOriginal}
                      onChange={(e) => setModeCOriginal(e.target.value)}
                      placeholder="e.g. 80.00"
                      className="w-full bg-transparent border-none outline-none focus:ring-0 text-base font-medium text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="modeC-percent" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    Discount Percentage
                  </label>
                  <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 transition-colors">
                    <input
                      id="modeC-percent"
                      type="number"
                      min="0"
                      max="100"
                      step="any"
                      value={modeCPercent}
                      onChange={(e) => setModeCPercent(e.target.value)}
                      placeholder="e.g. 15"
                      className="w-full bg-transparent border-none outline-none focus:ring-0 text-base font-medium text-zinc-900 dark:text-white"
                    />
                    <span className="text-sm font-extrabold text-zinc-400 dark:text-zinc-600 font-mono">%</span>
                  </div>
                </div>
              </>
            )}

            {activeMode === "reverse" && (
              <>
                <div className="space-y-2">
                  <label htmlFor="modeD-final" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    Final Value
                  </label>
                  <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 transition-colors">
                    <input
                      id="modeD-final"
                      type="number"
                      min="0"
                      step="any"
                      value={modeDFinal}
                      onChange={(e) => setModeDFinal(e.target.value)}
                      placeholder="e.g. 60"
                      className="w-full bg-transparent border-none outline-none focus:ring-0 text-base font-medium text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="modeD-percent" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                    Is what percentage (%) of original
                  </label>
                  <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 transition-colors">
                    <input
                      id="modeD-percent"
                      type="number"
                      min="0"
                      step="any"
                      value={modeDPercent}
                      onChange={(e) => setModeDPercent(e.target.value)}
                      placeholder="e.g. 30"
                      className="w-full bg-transparent border-none outline-none focus:ring-0 text-base font-medium text-zinc-900 dark:text-white"
                    />
                    <span className="text-sm font-extrabold text-zinc-400 dark:text-zinc-600 font-mono">%</span>
                  </div>
                </div>
              </>
            )}

            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 border border-zinc-200 dark:border-zinc-800 hover:border-red-200 dark:hover:border-red-950/40 rounded-xl transition-all focus:outline-none"
              >
                Reset Inputs
              </button>
            </div>
          </div>

          {/* Right Column: Calculations & Formula */}
          <div className="flex flex-col justify-between bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            {!calculatedData ? (
              <div className="flex flex-col items-center justify-center text-center h-full py-8 space-y-2">
                <span className="text-4xl">🔢</span>
                <h4 className="font-bold text-zinc-700 dark:text-zinc-300 text-sm">Enter values to compute</h4>
                <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                  Provide correct non-negative values in the fields to view detailed results and exact formulas instantly.
                </p>
              </div>
            ) : (
              <div className="space-y-5 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Calculation Results
                  </h4>

                  {/* Mode A results */}
                  {calculatedData.type === "of" && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/30 dark:border-blue-900/30">
                        <span className="text-2xs font-extrabold text-blue-700 dark:text-blue-300 block">
                          Result ({calculatedData.pct}% of {calculatedData.tot})
                        </span>
                        <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono mt-1 block">
                          {calculatedData.result % 1 === 0 ? calculatedData.result : calculatedData.result.toFixed(4)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Mode B results */}
                  {calculatedData.type === "change" && (
                    <div className="space-y-3">
                      <div className={`p-4 rounded-xl border ${
                        calculatedData.direction === "increase"
                          ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100/30 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                          : calculatedData.direction === "decrease"
                          ? "bg-rose-50/50 dark:bg-rose-950/20 border-rose-100/30 dark:border-rose-900/30 text-rose-700 dark:text-rose-400"
                          : "bg-zinc-100/50 dark:bg-zinc-900/20 border-zinc-200/30 dark:border-zinc-800/30 text-zinc-700 dark:text-zinc-400"
                      }`}>
                        <span className="text-2xs font-extrabold uppercase tracking-wider block">
                          Percentage {calculatedData.direction}
                        </span>
                        <span className="text-3xl font-extrabold font-mono mt-1 block">
                          {calculatedData.direction === "increase" ? "+" : ""}
                          {calculatedData.percentChange.toFixed(4)}%
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                        <div className="bg-zinc-100/50 dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50">
                          <span className="text-zinc-400 dark:text-zinc-500 block">Difference</span>
                          <span className="font-bold font-mono text-zinc-900 dark:text-white mt-0.5 block">
                            {calculatedData.difference >= 0 ? "+" : ""}
                            {calculatedData.difference}
                          </span>
                        </div>
                        <div className="bg-zinc-100/50 dark:bg-zinc-950 p-2.5 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50">
                          <span className="text-zinc-400 dark:text-zinc-500 block">Ratio</span>
                          <span className="font-bold font-mono text-zinc-900 dark:text-white mt-0.5 block">
                            {(calculatedData.newVal / calculatedData.oldVal).toFixed(6)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mode C results */}
                  {calculatedData.type === "discount" && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100/30 dark:border-emerald-900/30">
                        <span className="text-2xs font-extrabold text-emerald-700 dark:text-emerald-300 block">
                          Final Price (After {calculatedData.disc}% Discount)
                        </span>
                        <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1 block">
                          {calculatedData.finalPrice % 1 === 0 ? calculatedData.finalPrice : calculatedData.finalPrice.toFixed(4)}
                        </span>
                      </div>

                      <div className="bg-zinc-100/50 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50 text-xs">
                        <span className="text-zinc-400 dark:text-zinc-500 block font-bold">Amount Saved</span>
                        <span className="font-bold font-mono text-zinc-900 dark:text-white mt-1 block text-base">
                          {calculatedData.amountSaved % 1 === 0 ? calculatedData.amountSaved : calculatedData.amountSaved.toFixed(4)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Mode D results */}
                  {calculatedData.type === "reverse" && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/30 dark:border-indigo-900/30">
                        <span className="text-2xs font-extrabold text-indigo-700 dark:text-indigo-300 block">
                          Original Value (where {calculatedData.final} is {calculatedData.pct}%)
                        </span>
                        <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono mt-1 block">
                          {calculatedData.originalValue % 1 === 0 ? calculatedData.originalValue : calculatedData.originalValue.toFixed(4)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Formula display */}
                  <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-lg border border-zinc-200/50 dark:border-zinc-800/50">
                    <span className="text-3xs font-extrabold uppercase text-zinc-400 dark:text-zinc-500 tracking-widest block mb-1">
                      Formula Used
                    </span>
                    <pre className="text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed select-all">
                      {calculatedData.formula}
                    </pre>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                  <button
                    type="button"
                    onClick={handleCopyResult}
                    className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition font-semibold text-xs px-5 py-3 rounded-lg shadow-sm focus:outline-none"
                  >
                    {copied ? "✅ Result Copied!" : "📋 Copy Calculation Summary"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
