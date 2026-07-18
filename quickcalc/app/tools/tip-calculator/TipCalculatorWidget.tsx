"use client";

import { useState, useMemo } from "react";
import { calculateTip } from "../../../lib/calculators/tipCalculator";

export default function TipCalculatorWidget() {
  const [billInput, setBillInput] = useState<string>("");
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  // Safely parse values
  const billAmount = useMemo(() => {
    const val = parseFloat(billInput);
    return isNaN(val) || val < 0 ? 0 : val;
  }, [billInput]);

  // Compute live breakdown
  const results = useMemo(() => {
    return calculateTip({
      billAmount,
      tipPercentage,
      peopleCount,
    });
  }, [billAmount, tipPercentage, peopleCount]);

  const handleCopyBreakdown = async () => {
    if (billAmount <= 0) return;
    const summary = [
      `--- Tip & Bill Split Summary ---`,
      `Original Bill: ${billAmount.toFixed(2)}`,
      `Tip Selected: ${tipPercentage}%`,
      `Total Tip: ${results.tipAmount.toFixed(2)}`,
      `Total Bill (With Tip): ${results.totalBill.toFixed(2)}`,
      `Number of People: ${peopleCount}`,
      `---------------------------------`,
      `Tip Per Person: ${results.tipPerPerson.toFixed(2)}`,
      `Total Per Person: ${results.totalPerPerson.toFixed(2)}`,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(summary);
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
          <span>🍽️ Live-Updating Tip & Split Calculator</span>
        </h3>
        <p className="text-xs text-blue-100 mt-1">
          Adjust percentages on the fly, split with groups instantly, and copy full breakdowns.
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Inputs */}
          <div className="space-y-5">
            {/* Bill Amount Input */}
            <div className="space-y-2">
              <label htmlFor="bill-amount" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Bill Amount
              </label>
              <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 transition-colors">
                <input
                  id="bill-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={billInput}
                  onChange={(e) => setBillInput(e.target.value)}
                  placeholder="Enter bill total (e.g. 84.50)"
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-base font-medium text-zinc-900 dark:text-white"
                />
              </div>
            </div>

            {/* Tip Percentage Controls */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="tip-slider" className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  Tip Percentage
                </label>
                <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md border border-blue-200/30 dark:border-blue-800/30 font-mono">
                  {tipPercentage}%
                </span>
              </div>

              {/* Slider */}
              <input
                id="tip-slider"
                type="range"
                min="0"
                max="50"
                value={tipPercentage}
                onChange={(e) => setTipPercentage(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400"
              />

              {/* Quick Select Buttons */}
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[10, 15, 18, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setTipPercentage(pct)}
                    className={`py-2 text-xs font-bold rounded-lg transition-all focus:outline-none ${
                      tipPercentage === pct
                        ? "bg-blue-600 dark:bg-blue-500 text-white shadow-sm"
                        : "bg-zinc-100 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>

            {/* Number of People Splitting */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Split Between
              </label>
              <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-950 p-2 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setPeopleCount(prev => Math.max(1, prev - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition font-bold text-zinc-600 dark:text-zinc-400 focus:outline-none select-none text-lg"
                >
                  −
                </button>
                <span className="font-mono text-base font-extrabold text-zinc-900 dark:text-white">
                  {peopleCount} {peopleCount === 1 ? "Person" : "People"}
                </span>
                <button
                  type="button"
                  onClick={() => setPeopleCount(prev => prev + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition font-bold text-zinc-600 dark:text-zinc-400 focus:outline-none select-none text-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Live Output */}
          <div className="flex flex-col justify-between bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            {billAmount <= 0 ? (
              <div className="flex flex-col items-center justify-center text-center h-full py-8 space-y-2">
                <span className="text-4xl">💰</span>
                <h4 className="font-bold text-zinc-700 dark:text-zinc-300 text-sm">Waiting for Bill Amount</h4>
                <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                  Enter a bill amount on the left to see an instant tip split and total cost breakdown.
                </p>
              </div>
            ) : (
              <div className="space-y-5 flex-grow flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                    Breakdown Results
                  </h4>

                  {/* Top line aggregates */}
                  <div className="grid grid-cols-2 gap-4 border-b border-zinc-200/50 dark:border-zinc-800/50 pb-4">
                    <div>
                      <span className="text-3xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                        Total Tip Amount
                      </span>
                      <span className="text-lg font-bold text-zinc-900 dark:text-white">
                        {results.tipAmount.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-3xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                        Total Bill (+ Tip)
                      </span>
                      <span className="text-lg font-bold text-zinc-900 dark:text-white">
                        {results.totalBill.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Individual Split Breakdown */}
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/30 dark:border-blue-900/30">
                      <div>
                        <span className="text-2xs font-extrabold text-blue-700 dark:text-blue-300 block">
                          Tip Per Person
                        </span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 italic block mt-0.5">
                          Individual gratuity share
                        </span>
                      </div>
                      <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                        {results.tipPerPerson.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/30 dark:border-indigo-900/30">
                      <div>
                        <span className="text-2xs font-extrabold text-indigo-700 dark:text-indigo-300 block">
                          Total Per Person
                        </span>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500 italic block mt-0.5">
                          Split portion of bill + tip
                        </span>
                      </div>
                      <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                        {results.totalPerPerson.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sharing Action */}
                <div className="pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                  <button
                    type="button"
                    onClick={handleCopyBreakdown}
                    className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition font-semibold text-xs px-5 py-3 rounded-lg shadow-sm focus:outline-none"
                  >
                    {copied ? "✅ Breakdown Copied!" : "📋 Copy Breakdown Summary"}
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
