"use client";

import { useState, useEffect } from "react";
import { getBedtimesForWakeUp, getWakeUpTimesForSleepNow, SleepTimeOption } from "../../../lib/calculators/sleepCycle";

export default function SleepCycleCalculatorWidget() {
  const [mode, setMode] = useState<"wake-up" | "sleep-now">("wake-up");
  const [wakeTime, setWakeTime] = useState<string>("07:00");
  const [results, setResults] = useState<SleepTimeOption[]>([]);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (mode === "wake-up") {
      const bedtimes = getBedtimesForWakeUp(wakeTime);
      setResults(bedtimes);
    } else {
      const wakeTimes = getWakeUpTimesForSleepNow();
      setResults(wakeTimes);
    }
  };

  // Re-calculate when mode changes
  useEffect(() => {
    handleCalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8">
      {/* Tab Selector Mode */}
      <div className="grid grid-cols-2 text-center font-semibold text-sm border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setMode("wake-up")}
          className={`py-4 transition-colors ${
            mode === "wake-up"
              ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 border-b-2 border-indigo-500"
              : "bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100"
          }`}
        >
          ⏰ Set Wake-up Time
        </button>
        <button
          onClick={() => setMode("sleep-now")}
          className={`py-4 transition-colors ${
            mode === "sleep-now"
              ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 border-b-2 border-indigo-500"
              : "bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100"
          }`}
        >
          😴 Sleep Now
        </button>
      </div>

      <div className="p-6">
        {mode === "wake-up" ? (
          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label htmlFor="wakeTime" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                What time do you need to wake up?
              </label>
              <input
                id="wakeTime"
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-white font-semibold py-3.5 px-6 rounded-lg transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Calculate Best Bedtimes
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Press the button below to calculate the best times to wake up if you go to sleep right now (including an average of 15 minutes to fall asleep).
            </p>
            <button
              onClick={() => handleCalculate()}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-700 hover:to-purple-600 text-white font-semibold py-3.5 px-6 rounded-lg transition duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Find Wake-up Times
            </button>
          </div>
        )}
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-indigo-50/20 dark:bg-indigo-950/10 p-6">
          <h4 className="text-center text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">
            {mode === "wake-up" ? "Recommended Bedtimes" : "Recommended Wake-up Times"}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {results.map((opt, idx) => {
              // Highlight 5 and 6 cycles (7.5h and 9h) as "optimal"
              const isOptimal = opt.cycles === 5 || opt.cycles === 6;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    isOptimal
                      ? "bg-white dark:bg-zinc-800 border-indigo-500 shadow-md ring-2 ring-indigo-500/10"
                      : "bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 block">
                    {opt.time}
                  </span>
                  <div className="flex justify-center items-center gap-2 mt-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    <span>{opt.hours} hrs of sleep</span>
                    <span>•</span>
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        isOptimal
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800"
                      }`}
                    >
                      {opt.cycles} cycles
                    </span>
                  </div>
                  {isOptimal && (
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase mt-2 block">
                      Recommended
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-4 text-center leading-relaxed">
            A standard sleep cycle is roughly 90 minutes. Waking up at the end of a cycle, rather than in the middle, prevents grogginess (sleep inertia).
          </p>
        </div>
      )}
    </div>
  );
}
