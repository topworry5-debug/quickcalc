"use client";

import { useState, useMemo, useRef } from "react";

export default function HabitCostCalculatorWidget() {
  const [habitName, setHabitName] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [dailyCost, setDailyCost] = useState<string>("");
  const [currentAge, setCurrentAge] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Parse values safely
  const parsedHours = useMemo(() => {
    const val = parseFloat(hours);
    return isNaN(val) || val < 0 ? 0 : val;
  }, [hours]);

  const parsedMinutes = useMemo(() => {
    const val = parseFloat(minutes);
    return isNaN(val) || val < 0 ? 0 : val;
  }, [minutes]);

  const parsedDailyCost = useMemo(() => {
    const val = parseFloat(dailyCost);
    return isNaN(val) || val < 0 ? 0 : val;
  }, [dailyCost]);

  const parsedAge = useMemo(() => {
    if (!currentAge) return null;
    const val = parseInt(currentAge, 10);
    return isNaN(val) || val < 0 ? null : val;
  }, [currentAge]);

  // Calculations
  const dailyTimeInHours = useMemo(() => {
    return parsedHours + parsedMinutes / 60;
  }, [parsedHours, parsedMinutes]);

  const yearsToRetirement = useMemo(() => {
    if (parsedAge === null) return null;
    const remaining = 65 - parsedAge;
    return remaining <= 0 ? 0 : remaining;
  }, [parsedAge]);

  const calculations = useMemo(() => {
    const timePerDay = dailyTimeInHours;
    const costPerDay = parsedDailyCost;

    const intervals = [
      { key: "1y", label: "1 Year", days: 365 },
      { key: "5y", label: "5 Years", days: 365 * 5 },
      { key: "10y", label: "10 Years", days: 365 * 10 },
    ];

    if (yearsToRetirement !== null && yearsToRetirement > 0) {
      intervals.push({
        key: "retire",
        label: `By Retirement (Age 65, ${yearsToRetirement} yr${yearsToRetirement === 1 ? "" : "s"})`,
        days: 365 * yearsToRetirement,
      });
    }

    return intervals.map((interval) => {
      const totalHours = timePerDay * interval.days;
      const totalMoney = costPerDay * interval.days;

      // Compound interest note comparison (modest 7% annual compounding monthly)
      // Compound formula: A = P * (((1 + r/n)^(nt) - 1) / (r/n)) * (1 + r/n)
      // Where P is the monthly contribution = costPerDay * 30.4375
      const monthlyContribution = costPerDay * 30.4375;
      const r = 0.07;
      const n = 12;
      const t = interval.days / 365;
      let compoundedValue = 0;
      if (monthlyContribution > 0 && t > 0) {
        compoundedValue =
          monthlyContribution *
          (((Math.pow(1 + r / n, n * t) - 1) / (r / n)) * (1 + r / n));
      }

      return {
        ...interval,
        totalHours,
        fullDays: totalHours / 24,
        wakingDays: totalHours / 16, // assumes 16 waking hours/day
        totalMoney,
        compoundedValue,
      };
    });
  }, [dailyTimeInHours, parsedDailyCost, yearsToRetirement]);

  // Relatable comparisons (based on 10-year total or retirement total if available)
  const referenceInterval = useMemo(() => {
    return calculations.find((c) => c.key === "10y") || calculations[0];
  }, [calculations]);

  const comparisons = useMemo(() => {
    const hoursCount = referenceInterval ? referenceInterval.totalHours : 0;
    return {
      movies: Math.floor(hoursCount / 2), // 2 hours
      books: Math.floor(hoursCount / 6), // 6 hours
      language: Math.floor(hoursCount / 150), // 150 hours for conversational fluency
      marathons: Math.floor(hoursCount / 4), // 4 hours
    };
  }, [referenceInterval]);

  const displayHabitName = habitName.trim() || "Your Daily Habit";

  // Share text creation
  const handleCopyShareText = async () => {
    let text = `My daily habit "${displayHabitName}" `;
    const tenYearCalc = calculations.find((c) => c.key === "10y");

    if (dailyTimeInHours > 0 && parsedDailyCost > 0 && tenYearCalc) {
      text += `costs me ${tenYearCalc.fullDays.toFixed(0)} full days of my life and $${Math.round(tenYearCalc.totalMoney).toLocaleString()} over 10 years!`;
    } else if (dailyTimeInHours > 0 && tenYearCalc) {
      text += `costs me ${tenYearCalc.fullDays.toFixed(0)} full days of my life over 10 years!`;
    } else if (parsedDailyCost > 0 && tenYearCalc) {
      text += `costs me $${Math.round(tenYearCalc.totalMoney).toLocaleString()} over 10 years!`;
    } else {
      text += `adds up significantly over time!`;
    }

    text += ` Check your own habit cost on QuickCalc: https://quickcalc.cloud/tools/habit-cost-calculator`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy share text", err);
    }
  };

  // Determine the governing big card metric
  const governingMetric = useMemo(() => {
    const tenYearCalc = calculations.find((c) => c.key === "10y");
    if (!tenYearCalc) return { value: "—", label: "Enter some daily habits to calculate" };

    if (dailyTimeInHours > 0 && parsedDailyCost > 0) {
      return {
        value: `${tenYearCalc.fullDays.toFixed(0)} Days & $${Math.round(tenYearCalc.totalMoney).toLocaleString()}`,
        label: `Compounded cost over 10 years`,
      };
    } else if (dailyTimeInHours > 0) {
      return {
        value: `${tenYearCalc.fullDays.toFixed(0)} Full Days`,
        label: `Of your life spent over 10 years`,
      };
    } else if (parsedDailyCost > 0) {
      return {
        value: `$${Math.round(tenYearCalc.totalMoney).toLocaleString()}`,
        label: `Cash spent out of pocket over 10 years`,
      };
    }
    return {
      value: "—",
      label: "Enter a recurring time or money amount above",
    };
  }, [calculations, dailyTimeInHours, parsedDailyCost]);

  const hasAnyInput = dailyTimeInHours > 0 || parsedDailyCost > 0;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Input controls */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-md transition-colors space-y-6">
        <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <span>⏳</span> Enter Your Habit Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Habit Name */}
            <div className="space-y-2">
              <label htmlFor="habit-name" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                What is the habit?
              </label>
              <input
                id="habit-name"
                type="text"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                placeholder="e.g. Instagram scrolling, Daily coffee, Cigarettes..."
                className="w-full bg-zinc-50 dark:bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-orange-500 text-zinc-900 dark:text-white transition-colors"
              />
            </div>

            {/* Daily Time Spent */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Daily Time Spent (optional)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <input
                    type="number"
                    min="0"
                    max="24"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent border-none outline-none text-zinc-900 dark:text-white text-center font-mono font-bold"
                  />
                  <span className="text-xs font-semibold text-zinc-400">hrs</span>
                </div>
                <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    placeholder="0"
                    className="w-full bg-transparent border-none outline-none text-zinc-900 dark:text-white text-center font-mono font-bold"
                  />
                  <span className="text-xs font-semibold text-zinc-400">mins</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Daily Cost */}
            <div className="space-y-2">
              <label htmlFor="daily-cost" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Daily Financial Cost (optional)
              </label>
              <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-orange-500 transition-colors">
                <span className="text-zinc-400 dark:text-zinc-500 font-bold font-mono">$</span>
                <input
                  id="daily-cost"
                  type="number"
                  step="any"
                  min="0"
                  value={dailyCost}
                  onChange={(e) => setDailyCost(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent border-none outline-none text-zinc-900 dark:text-white font-mono font-semibold"
                />
              </div>
            </div>

            {/* Current Age */}
            <div className="space-y-2">
              <label htmlFor="current-age" className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Your Current Age (optional)
              </label>
              <input
                id="current-age"
                type="number"
                min="1"
                max="120"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                placeholder="e.g. 28 (to project until retirement at 65)"
                className="w-full bg-zinc-50 dark:bg-zinc-950 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-orange-500 text-zinc-900 dark:text-white transition-colors font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {!hasAnyInput ? (
        <div className="text-center p-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            💡 Enter some time and/or cost above to see your customized compounding results!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projections Table / Live updates */}
          <div className="lg:col-span-2 space-y-6">
            {/* Projections */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-md transition-colors space-y-4">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <span>📈</span> Compounding Cost Breakdown
              </h3>

              <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {calculations.map((interval) => (
                  <div key={interval.key} className="py-4 first:pt-0 last:pb-0 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-zinc-950 dark:text-white text-base">
                        {interval.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Time Cost Card */}
                      {dailyTimeInHours > 0 && (
                        <div className="bg-orange-50/50 dark:bg-orange-950/20 p-3 rounded-xl border border-orange-100 dark:border-orange-900/30">
                          <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider block">
                            Time spent
                          </span>
                          <div className="mt-1 font-mono text-zinc-900 dark:text-zinc-100">
                            <span className="text-lg font-extrabold">
                              {Math.round(interval.totalHours).toLocaleString()}
                            </span>{" "}
                            <span className="text-xs font-medium">hours</span>
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            Equivalent to{" "}
                            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
                              {interval.fullDays.toFixed(1)}
                            </strong>{" "}
                            full 24h days, or{" "}
                            <strong className="font-semibold text-zinc-800 dark:text-zinc-200">
                              {interval.wakingDays.toFixed(1)}
                            </strong>{" "}
                            active waking days.
                          </div>
                        </div>
                      )}

                      {/* Money Cost Card */}
                      {parsedDailyCost > 0 && (
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                            Money spent
                          </span>
                          <div className="mt-1 font-mono text-zinc-900 dark:text-zinc-100">
                            <span className="text-lg font-extrabold">
                              ${Math.round(interval.totalMoney).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            If invested at 7% return, it could grow to{" "}
                            <strong className="font-semibold text-emerald-600 dark:text-emerald-400">
                              ${Math.round(interval.compoundedValue).toLocaleString()}
                            </strong>
                            .
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {parsedDailyCost > 0 && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 italic leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-3">
                  * Note: Calculated values do not take inflation into account. Compounded estimates assume monthly investments earning a modest 7% historical average annual return.
                </p>
              )}
            </div>

            {/* Fun Relatable Comparisions */}
            {dailyTimeInHours > 0 && (
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-md transition-colors space-y-4">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <span>💭</span> What You Could Do Instead
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Over {referenceInterval.label === "1 Year" ? "1 year" : "10 years"}, the time spent on{" "}
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                    "{displayHabitName}"
                  </span>{" "}
                  ({Math.round(referenceInterval.totalHours).toLocaleString()} hours) is equivalent to:
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <span className="text-2xl block">🎬</span>
                    <span className="font-mono text-xl font-extrabold text-zinc-900 dark:text-white block mt-2">
                      {comparisons.movies.toLocaleString()}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
                      Feature Movies watched (2h avg)
                    </span>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <span className="text-2xl block">📚</span>
                    <span className="font-mono text-xl font-extrabold text-zinc-900 dark:text-white block mt-2">
                      {comparisons.books.toLocaleString()}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
                      Books read (6h avg)
                    </span>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <span className="text-2xl block">🗣️</span>
                    <span className="font-mono text-xl font-extrabold text-zinc-900 dark:text-white block mt-2">
                      {comparisons.language.toLocaleString()}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
                      Conversational Languages learned (150h avg)
                    </span>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 text-center">
                    <span className="text-2xl block">👟</span>
                    <span className="font-mono text-xl font-extrabold text-zinc-900 dark:text-white block mt-2">
                      {comparisons.marathons.toLocaleString()}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 block">
                      Full Marathons run (4h avg)
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Shareable Card on the right */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-zinc-700 dark:text-zinc-300">
              Your Shareable Result Card
            </h3>

            {/* Rounded beautifully styled Result Card */}
            <div
              ref={cardRef}
              className="relative p-6 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white shadow-lg overflow-hidden flex flex-col justify-between aspect-square"
            >
              {/* Card watermark/logo */}
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold tracking-wider uppercase bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
                  QuickCalc
                </span>
                <span className="text-lg opacity-70">⏳</span>
              </div>

              {/* Habit details */}
              <div className="my-auto space-y-4">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest text-orange-100 block font-semibold">
                    The Cost of My Habit
                  </span>
                  <h4 className="text-2xl font-extrabold tracking-tight truncate">
                    "{displayHabitName}"
                  </h4>
                </div>

                <div className="space-y-1">
                  <span className="text-3xl font-black tracking-tight block drop-shadow-sm leading-none">
                    {governingMetric.value}
                  </span>
                  <span className="text-xs text-orange-50 block font-medium">
                    {governingMetric.label}
                  </span>
                </div>
              </div>

              {/* Card footer details */}
              <div className="border-t border-white/20 pt-4 flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-orange-100">
                  QUICKCALC.CLOUD
                </span>
                <span className="text-[10px] text-white/80">
                  Calculate yours &rarr;
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyShareText}
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-extrabold py-3 px-4 rounded-xl transition shadow-md hover:shadow-lg text-sm"
            >
              <span>{copied ? "✅ Copied!" : "📋 Copy result as text"}</span>
            </button>
            <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 italic">
              Click to copy a beautifully formatted summary to share on social media.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
