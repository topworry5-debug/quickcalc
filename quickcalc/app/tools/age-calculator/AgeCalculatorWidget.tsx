"use client";

import { useState, useEffect } from "react";
import { calculateAge, AgeResult } from "@/lib/calculators/ageCalculator";

export default function AgeCalculatorWidget() {
  const [dateString, setDateString] = useState<string>("");
  const [result, setResult] = useState<AgeResult | string | null>(null);
  const [copied, setCopied] = useState(false);

  // Initialize with a past date (e.g., exactly 25 years and 3 months ago) to have a gorgeous default state
  useEffect(() => {
    const defaultDate = new Date();
    defaultDate.setFullYear(defaultDate.getFullYear() - 28);
    defaultDate.setMonth(defaultDate.getMonth() - 4);
    defaultDate.setDate(defaultDate.getDate() - 3);
    const year = defaultDate.getFullYear();
    const month = String(defaultDate.getMonth() + 1).padStart(2, "0");
    const day = String(defaultDate.getDate()).padStart(2, "0");
    setDateString(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    if (!dateString) {
      setResult("Enter your date of birth to reveal your exact age profile.");
      return;
    }
    const res = calculateAge(dateString);
    setResult(res);
  }, [dateString]);

  const handleReset = () => {
    setDateString("");
  };

  const handleCopy = async () => {
    if (!result || typeof result === "string") return;
    const shareText = `I'm ${result.years} years, ${result.months} months, ${result.days} days old — born on a ${result.dayOfWeekBorn}, I'm a ${result.zodiacSign}, and I've lived through ${result.totalDays.toLocaleString()} days! Check your age at quickcalc.cloud/tools/age-calculator`;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const isError = typeof result === "string";

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-all">
      {/* Premium Header Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 p-6 text-white text-center">
        <h3 className="text-2xl font-bold">🎂 Premium Age & Life Journey Calculator</h3>
        <p className="text-xs text-blue-50 mt-1.5 max-w-lg mx-auto">
          Discover your exact age, detailed time statistics, celestial zodiac profiles, generation, heartbeat counts, and share your beautiful life summary card!
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Input & Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2 w-full">
            <label htmlFor="birthdate" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Select Your Date of Birth
            </label>
            <input
              id="birthdate"
              type="date"
              max={new Date().toISOString().split("T")[0]}
              min="1900-01-01"
              value={dateString}
              onChange={(e) => setDateString(e.target.value)}
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

        {/* Display friendly message or calculation error */}
        {isError && (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl text-amber-800 dark:text-amber-200 text-sm text-center font-medium">
            ⚠️ {result}
          </div>
        )}

        {/* Successful calculation output */}
        {result && !isError && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* 1. Main Block: Exact Age */}
            <div className="bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-950/40 dark:to-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 p-6 sm:p-8 rounded-2xl text-center shadow-inner">
              <span className="text-zinc-400 dark:text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">
                Your Exact Age Today
              </span>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto">
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200/40 dark:border-zinc-800 shadow-sm flex flex-col justify-center">
                  <span className="text-2xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
                    {result.years}
                  </span>
                  <span className="text-2xs sm:text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mt-1">
                    Years
                  </span>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200/40 dark:border-zinc-800 shadow-sm flex flex-col justify-center">
                  <span className="text-2xl sm:text-4xl font-black text-indigo-600 dark:text-indigo-400">
                    {result.months}
                  </span>
                  <span className="text-2xs sm:text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mt-1">
                    Months
                  </span>
                </div>
                <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200/40 dark:border-zinc-800 shadow-sm flex flex-col justify-center">
                  <span className="text-2xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400">
                    {result.days}
                  </span>
                  <span className="text-2xs sm:text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide mt-1">
                    Days
                  </span>
                </div>
              </div>
              <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300 mt-4">
                You were born on a <span className="text-blue-600 dark:text-blue-400 font-bold">{result.dayOfWeekBorn}</span>! 🎉
              </p>
            </div>

            {/* 2. Birthday Countdown */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-12 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-rose-950/20 dark:to-pink-950/20 border border-rose-100 dark:border-rose-900/30 p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
                <div className="space-y-1">
                  <span className="text-rose-600 dark:text-rose-400 text-2xs font-bold uppercase tracking-widest block">
                    Next Birthday Countdown
                  </span>
                  <p className="text-lg font-extrabold text-zinc-800 dark:text-zinc-100">
                    {result.daysUntilNextBirthday === 0 ? (
                      <span className="text-xl text-pink-600 dark:text-pink-400">🎁 Happy Birthday! Today is your special day!</span>
                    ) : (
                      <>
                        <span className="text-rose-600 dark:text-rose-400 text-2xl font-black mr-1">{result.daysUntilNextBirthday}</span> days left
                      </>
                    )}
                  </p>
                  {result.daysUntilNextBirthday !== 0 && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Your next birthday will fall on a <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">{result.dayOfWeekNextBirthday}</strong>.
                    </p>
                  )}
                </div>
                <div className="text-3xl sm:text-4xl">
                  🎂
                </div>
              </div>
            </div>

            {/* 3. Unique Element: Share Your Age Card */}
            <div className="border border-indigo-200 dark:border-indigo-900/50 rounded-2xl bg-gradient-to-br from-indigo-50/40 via-white to-blue-50/20 dark:from-zinc-950 dark:via-zinc-900/60 dark:to-zinc-950 p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 dark:bg-indigo-400/5 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <span>✨</span> Share Your Life Journey Card
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Perfect to screenshot, send to friends, or share on WhatsApp and social media!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all self-start sm:self-center ${
                    copied
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10 scale-102"
                      : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10 active:scale-98"
                  }`}
                >
                  {copied ? (
                    <>
                      <span>✔️ Copied Share Text!</span>
                    </>
                  ) : (
                    <>
                      <span>🔗 Copy Share Text</span>
                    </>
                  )}
                </button>
              </div>

              {/* Preview Box */}
              <div className="border border-zinc-200/60 dark:border-zinc-800 rounded-xl p-5 bg-white/80 dark:bg-zinc-950/80 shadow-sm relative">
                {/* Branding Badge inside card */}
                <span className="absolute top-3 right-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  QuickCalc.cloud
                </span>
                <div className="flex items-center gap-3.5 border-b border-zinc-100 dark:border-zinc-900 pb-3 mb-3.5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl text-white shadow-inner">
                    🧬
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">My Age Profile</h5>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase font-semibold">Active Life metrics</p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                    &ldquo;I'm <span className="text-blue-600 dark:text-blue-400 font-bold">{result.years} years, {result.months} months, and {result.days} days</span> old. Born on a <span className="font-semibold text-zinc-800 dark:text-zinc-200">{result.dayOfWeekBorn}</span>, my zodiac is <span className="font-semibold text-zinc-800 dark:text-zinc-200">{result.zodiacSign}</span>, and I belong to <span className="font-semibold text-zinc-800 dark:text-zinc-200">{result.generation}</span>!&rdquo;
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="bg-zinc-50 dark:bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800">
                      <span className="text-zinc-400 dark:text-zinc-500 text-[9px] font-bold uppercase tracking-wider block">Days Lived</span>
                      <span className="font-bold text-zinc-800 dark:text-zinc-100">{result.totalDays.toLocaleString()} days</span>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-100 dark:border-zinc-800">
                      <span className="text-zinc-400 dark:text-zinc-500 text-[9px] font-bold uppercase tracking-wider block">Heartbeats Lived</span>
                      <span className="font-bold text-zinc-800 dark:text-zinc-100">~{result.heartbeats.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Personality & Celestial Identity Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌟</span>
                  <span className="text-xs font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">Western Zodiac</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-zinc-800 dark:text-zinc-100">{result.zodiacSign}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">{result.zodiacTrait}</p>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🐉</span>
                  <span className="text-xs font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">Chinese Zodiac</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-zinc-800 dark:text-zinc-100">{result.chineseZodiac}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">Based on the traditional lunar calendar cycle of animals.</p>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl shadow-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">👥</span>
                  <span className="text-xs font-bold uppercase text-zinc-400 dark:text-zinc-500 tracking-wider">Generational Era</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-zinc-800 dark:text-zinc-100">{result.generation}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mt-1">Discover the unique cultural and historical era of your birth year.</p>
                </div>
              </div>
            </div>

            {/* 5. Comprehensive Fun Time Stats Grid */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-widest pl-1">
                Your Lifetime Stats & Quantities
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-800/50 p-4 rounded-xl shadow-2xs">
                  <span className="text-zinc-400 dark:text-zinc-500 text-2xs font-bold uppercase tracking-wider block mb-1">Total Days Lived</span>
                  <span className="text-lg font-extrabold text-zinc-800 dark:text-zinc-100 tracking-tight">{result.totalDays.toLocaleString()}</span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">days</span>
                </div>
                <div className="bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-800/50 p-4 rounded-xl shadow-2xs">
                  <span className="text-zinc-400 dark:text-zinc-500 text-2xs font-bold uppercase tracking-wider block mb-1">Total Weeks Lived</span>
                  <span className="text-lg font-extrabold text-zinc-800 dark:text-zinc-100 tracking-tight">{result.totalWeeks.toLocaleString()}</span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">weeks</span>
                </div>
                <div className="bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-800/50 p-4 rounded-xl shadow-2xs">
                  <span className="text-zinc-400 dark:text-zinc-500 text-2xs font-bold uppercase tracking-wider block mb-1">Total Months Lived</span>
                  <span className="text-lg font-extrabold text-zinc-800 dark:text-zinc-100 tracking-tight">{result.totalMonths.toLocaleString()}</span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">months</span>
                </div>
                <div className="bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-800/50 p-4 rounded-xl shadow-2xs">
                  <span className="text-zinc-400 dark:text-zinc-500 text-2xs font-bold uppercase tracking-wider block mb-1">Total Hours Lived</span>
                  <span className="text-lg font-extrabold text-zinc-800 dark:text-zinc-100 tracking-tight">{result.totalHours.toLocaleString()}</span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">hours</span>
                </div>
                <div className="bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-800/50 p-4 rounded-xl shadow-2xs">
                  <span className="text-zinc-400 dark:text-zinc-500 text-2xs font-bold uppercase tracking-wider block mb-1">Total Minutes Lived</span>
                  <span className="text-lg font-extrabold text-zinc-800 dark:text-zinc-100 tracking-tight">{result.totalMinutes.toLocaleString()}</span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block">minutes</span>
                </div>
                <div className="bg-zinc-50/50 dark:bg-zinc-950/20 border border-zinc-200/50 dark:border-zinc-800/50 p-4 rounded-xl shadow-2xs relative overflow-hidden group">
                  <span className="text-pink-500 dark:text-pink-400 text-2xs font-bold uppercase tracking-wider block mb-1">Estimated Heartbeats</span>
                  <span className="text-lg font-extrabold text-pink-600 dark:text-pink-400 tracking-tight transition-transform group-hover:scale-102 inline-block">💖 ~{result.heartbeats.toLocaleString()}</span>
                  <span className="text-[9px] text-zinc-400 dark:text-zinc-500 block leading-tight mt-0.5">approx resting 70bpm</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
