"use client";

import { useState, useEffect } from "react";
import { calculateDueDate, DueDateResult } from "../../../lib/calculators/dueDateCalculator";

export default function DueDateCalculatorWidget() {
  const [method, setMethod] = useState<"lmp" | "conception">("lmp");
  const [dateString, setDateString] = useState<string>("");
  const [result, setResult] = useState<DueDateResult | string | null>(null);
  const [copied, setCopied] = useState(false);

  // Initialize with a past date (e.g., 2 months ago) to have a nice default state
  useEffect(() => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 60); // 60 days ago
    const year = defaultDate.getFullYear();
    const month = String(defaultDate.getMonth() + 1).padStart(2, "0");
    const day = String(defaultDate.getDate()).padStart(2, "0");
    setDateString(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    if (!dateString) {
      setResult("Enter your date to see your estimated due date");
      return;
    }
    const res = calculateDueDate({ method, dateString });
    setResult(res);
  }, [method, dateString]);

  const handleCopy = async () => {
    if (!result || typeof result === "string") return;
    const summary = `Estimated Due Date: ${result.dueDate} (Current: ${result.weeks} weeks, ${result.days} days — ${result.trimester}). Calculated 100% free on QuickCalc.cloud`;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-6 text-white text-center">
        <h3 className="text-xl font-bold">Compassionate Due Date Calculator</h3>
        <p className="text-xs text-rose-100 mt-1">
          Calculate your pregnancy timeline, current trimester, and gestational milestones instantly.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Toggle Calculation Method */}
        <div className="grid grid-cols-2 gap-4 bg-zinc-50 dark:bg-zinc-950 p-1.5 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
          <button
            type="button"
            onClick={() => setMethod("lmp")}
            className={`py-2 px-3 rounded-lg font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${
              method === "lmp"
                ? "bg-white dark:bg-zinc-800 text-rose-600 dark:text-rose-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            🗓️ Last Period (LMP)
          </button>
          <button
            type="button"
            onClick={() => setMethod("conception")}
            className={`py-2 px-3 rounded-lg font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${
              method === "conception"
                ? "bg-white dark:bg-zinc-800 text-rose-600 dark:text-rose-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            ✨ Conception Date
          </button>
        </div>

        {/* Date Input Section */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {method === "lmp"
              ? "First Day of Last Menstrual Period (LMP)"
              : "Estimated Date of Conception"}
          </label>
          <input
            type="date"
            value={dateString}
            onChange={(e) => setDateString(e.target.value)}
            className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>

        {/* Result Area */}
        {result && typeof result !== "string" ? (
          <div className="border-t border-zinc-200 dark:border-zinc-800 bg-rose-50/20 dark:bg-zinc-950/40 p-6 rounded-xl space-y-6 transition-all">
            {/* Visual Results Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-5 text-center sm:text-left space-y-1">
                <span className="text-zinc-400 dark:text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
                  Estimated Due Date
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white block tracking-tight leading-snug">
                  {result.dueDate}
                </span>
                <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300">
                  {result.trimester}
                </span>
              </div>

              {/* Progress Summary Card */}
              <div className="sm:col-span-7 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center sm:text-left">
                <span className="text-zinc-400 dark:text-zinc-500 text-xs font-semibold uppercase tracking-wider block mb-1">
                  Current Gestational Age
                </span>
                <p className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                  {result.weeks} Weeks, {result.days} Days
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  You are approximately <strong className="text-rose-500">{result.progressPercent}%</strong> of the way through your 40-week pregnancy journey.
                </p>
              </div>
            </div>

            {/* Trimester Timeline Indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-2xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-1">
                <span className={result.trimester === "1st Trimester" ? "text-rose-500 font-bold" : ""}>First Trimester</span>
                <span className={result.trimester === "2nd Trimester" ? "text-rose-500 font-bold" : ""}>Second Trimester</span>
                <span className={result.trimester === "3rd Trimester" ? "text-rose-500 font-bold" : ""}>Third Trimester</span>
              </div>
              <div className="relative h-6 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex shadow-inner">
                {/* 1st Trimester: up to 13 weeks (approx 32.5% of 40 weeks) */}
                <div className={`w-[32.5%] border-r border-white/20 h-full opacity-85 transition-all ${result.trimester === "1st Trimester" ? "bg-rose-400" : "bg-rose-200 dark:bg-rose-950/20"}`}></div>
                {/* 2nd Trimester: up to 28 weeks (approx 37.5% of 40 weeks) */}
                <div className={`w-[37.5%] border-r border-white/20 h-full opacity-85 transition-all ${result.trimester === "2nd Trimester" ? "bg-rose-500" : "bg-rose-300/60 dark:bg-rose-950/10"}`}></div>
                {/* 3rd Trimester: 28 weeks to 40+ (approx 30.0%) */}
                <div className={`w-[30%] h-full opacity-85 transition-all ${result.trimester === "3rd Trimester" ? "bg-rose-600" : "bg-rose-400/40 dark:bg-rose-950/5"}`}></div>

                {/* Sliding Pregnancy Progress Marker */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-zinc-950 dark:bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-all duration-300 flex items-center justify-center"
                  style={{ left: `${result.progressPercent}%` }}
                >
                  <div className="absolute -top-1 -bottom-1 w-3 rounded-full bg-rose-600 dark:bg-rose-400 border border-zinc-100 dark:border-zinc-800"></div>
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400 font-medium px-1">
                <span>Week 1</span>
                <span>Week 13</span>
                <span>Week 28</span>
                <span>Week 40</span>
              </div>
            </div>

            {/* Sharing & Clipboard action */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 rounded-lg hover:shadow-sm focus:ring-1 focus:ring-rose-500 focus:outline-none"
              >
                {copied ? "✅ Copied Summary!" : "📋 Copy Due Date Summary"}
              </button>

              <span className="text-2xs text-zinc-400 dark:text-zinc-500 italic">
                Only ~5% of babies arrive precisely on their due date.
              </span>
            </div>
          </div>
        ) : (
          <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/10 p-8 rounded-xl text-center space-y-2">
            <span className="text-3xl">👶</span>
            <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
              {result && typeof result === "string" ? result : "Enter a valid date to see your estimated due date"}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
              Real-time calculations map your pregnancy progress immediately. No email capture, no hidden paywalls, and no forced account creation.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
