"use client";

import { useState, useEffect } from "react";
import {
  calculatePregnancyWeightGain,
  PregnancyCalculatorResult,
} from "../../../lib/calculators/pregnancyWeightCalculator";

export default function PregnancyWeightGainCalculatorWidget() {
  // Unit toggle state: "metric" (cm, kg) or "imperial" (ft/in, lb)
  const [unitMode, setUnitMode] = useState<"metric" | "imperial">("imperial");

  // Inputs
  const [prePregnancyWeight, setPrePregnancyWeight] = useState<string>("135");
  const [currentWeight, setCurrentWeight] = useState<string>("142");
  const [heightCm, setHeightCm] = useState<string>("165");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("5");
  const [currentWeek, setCurrentWeek] = useState<number>(20);
  const [pregnancyType, setPregnancyType] = useState<"single" | "twin">("single");

  const [result, setResult] = useState<PregnancyCalculatorResult | null>(null);

  // Sync weights when switching unit systems to provide helpful defaults
  useEffect(() => {
    if (unitMode === "metric") {
      setPrePregnancyWeight("60");
      setCurrentWeight("63");
    } else {
      setPrePregnancyWeight("135");
      setCurrentWeight("142");
    }
  }, [unitMode]);

  useEffect(() => {
    const weightVal = parseFloat(prePregnancyWeight);
    const currWeightVal = parseFloat(currentWeight);
    const cmVal = parseFloat(heightCm);
    const ftVal = parseFloat(heightFt);
    const inVal = parseFloat(heightIn);

    if (
      isNaN(weightVal) ||
      weightVal <= 0 ||
      isNaN(currWeightVal) ||
      currWeightVal <= 0 ||
      (unitMode === "metric" && (isNaN(cmVal) || cmVal <= 0)) ||
      (unitMode === "imperial" && isNaN(ftVal) && isNaN(inVal)) ||
      (unitMode === "imperial" && ftVal <= 0 && inVal <= 0)
    ) {
      setResult(null);
      return;
    }

    const calcResult = calculatePregnancyWeightGain({
      prePregnancyWeight: weightVal,
      currentWeight: currWeightVal,
      weightUnit: unitMode === "imperial" ? "lb" : "kg",
      heightUnit: unitMode === "imperial" ? "ft" : "cm",
      heightCm: cmVal,
      heightFt: ftVal,
      heightIn: inVal,
      currentWeek,
      pregnancyType,
    });

    setResult(calcResult);
  }, [
    prePregnancyWeight,
    currentWeight,
    unitMode,
    heightCm,
    heightFt,
    heightIn,
    currentWeek,
    pregnancyType,
  ]);

  // Handle visual progress calculation
  // We want to map current weight gain, expected min, expected max, and total limits on a relative visual bar
  const getVisualPercentages = () => {
    if (!result) return { current: 0, min: 0, max: 0 };

    const isImperial = unitMode === "imperial";
    const currentGain = isImperial ? result.totalGainedLb : result.totalGainedKg;
    const expMin = isImperial ? result.expectedMinLb : result.expectedMinKg;
    const expMax = isImperial ? result.expectedMaxLb : result.expectedMaxKg;
    const maxLimit = isImperial ? result.totalRecommendedMaxLb : result.totalRecommendedMaxKg;

    // Use a scale from -5 (or -10 lbs) up to maxLimit + 10 units for buffering
    const minScale = isImperial ? -10 : -5;
    const maxScale = maxLimit + (isImperial ? 15 : 7);
    const totalSpan = maxScale - minScale;

    const getPercent = (val: number) => {
      const pct = ((val - minScale) / totalSpan) * 100;
      return Math.min(100, Math.max(0, pct));
    };

    return {
      current: getPercent(currentGain),
      min: getPercent(expMin),
      max: getPercent(expMax),
      minVal: expMin,
      maxVal: expMax,
      currentVal: currentGain,
      minScale,
      maxScale,
    };
  };

  const visualData = getVisualPercentages();

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 p-6 text-white text-center">
        <h3 className="text-xl sm:text-2xl font-bold">Personalized Pregnancy Weight Tracker</h3>
        <p className="text-xs sm:text-sm text-teal-50/90 mt-1.5 max-w-lg mx-auto">
          Providing warm, supportive guidelines tailored to your pre-pregnancy body mass index and gestational week.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Toggle units at the top */}
        <div className="grid grid-cols-2 gap-4 bg-zinc-50 dark:bg-zinc-950 p-1.5 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
          <button
            type="button"
            onClick={() => setUnitMode("metric")}
            className={`py-2 px-3 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
              unitMode === "metric"
                ? "bg-white dark:bg-zinc-800 text-teal-600 dark:text-teal-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            📏 Metric Units (cm, kg)
          </button>
          <button
            type="button"
            onClick={() => setUnitMode("imperial")}
            className={`py-2 px-3 rounded-lg font-medium text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 ${
              unitMode === "imperial"
                ? "bg-white dark:bg-zinc-800 text-teal-600 dark:text-teal-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            📐 Imperial Units (ft/in, lb)
          </button>
        </div>

        {/* Inputs Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Pregnancy Type */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Pregnancy Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPregnancyType("single")}
                  className={`py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
                    pregnancyType === "single"
                      ? "border-teal-500 bg-teal-50/50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400"
                      : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  👶 Single Pregnancy
                </button>
                <button
                  type="button"
                  onClick={() => setPregnancyType("twin")}
                  className={`py-2 px-4 rounded-lg border text-sm font-medium transition-all ${
                    pregnancyType === "twin"
                      ? "border-teal-500 bg-teal-50/50 dark:bg-teal-950/20 text-teal-600 dark:text-teal-400"
                      : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  👶👶 Twin Pregnancy
                </button>
              </div>
            </div>

            {/* Heights */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Pre-pregnancy Height
              </label>
              {unitMode === "metric" ? (
                <div className="flex rounded-lg shadow-sm">
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="block w-full rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-zinc-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="e.g. 165"
                    min="100"
                    max="250"
                  />
                  <span className="flex items-center px-4 bg-zinc-50 dark:bg-zinc-800 border-y border-r border-zinc-300 dark:border-zinc-700 rounded-r-lg text-zinc-500 text-sm">
                    cm
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex rounded-lg shadow-sm">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="block w-full rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2.5 text-zinc-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      placeholder="ft"
                      min="1"
                      max="8"
                    />
                    <span className="flex items-center px-3 bg-zinc-50 dark:bg-zinc-800 border-y border-r border-zinc-300 dark:border-zinc-700 rounded-r-lg text-zinc-500 text-sm">
                      ft
                    </span>
                  </div>
                  <div className="flex rounded-lg shadow-sm">
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="block w-full rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2.5 text-zinc-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                      placeholder="in"
                      min="0"
                      max="11"
                    />
                    <span className="flex items-center px-3 bg-zinc-50 dark:bg-zinc-800 border-y border-r border-zinc-300 dark:border-zinc-700 rounded-r-lg text-zinc-500 text-sm">
                      in
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Pre-Pregnancy Weight */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Pre-pregnancy Weight
              </label>
              <div className="flex rounded-lg shadow-sm">
                <input
                  type="number"
                  value={prePregnancyWeight}
                  onChange={(e) => setPrePregnancyWeight(e.target.value)}
                  className="block w-full rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-zinc-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder={unitMode === "imperial" ? "e.g. 135" : "e.g. 60"}
                  min="30"
                  max="500"
                />
                <span className="flex items-center px-4 bg-zinc-50 dark:bg-zinc-800 border-y border-r border-zinc-300 dark:border-zinc-700 rounded-r-lg text-zinc-500 text-sm">
                  {unitMode === "imperial" ? "lbs" : "kg"}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Week of Pregnancy */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Current Week of Pregnancy
                </label>
                <span className="text-sm font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded-md">
                  Week {currentWeek}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="42"
                value={currentWeek}
                onChange={(e) => setCurrentWeek(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-600 dark:accent-teal-400 mt-2"
              />
              <div className="flex justify-between text-[11px] text-zinc-400 mt-1 px-1">
                <span>Week 1 (Conception)</span>
                <span>Week 12 (Trimester 2)</span>
                <span>Week 28 (Trimester 3)</span>
                <span>Week 42</span>
              </div>
            </div>

            {/* Current Weight */}
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Current Weight
              </label>
              <div className="flex rounded-lg shadow-sm">
                <input
                  type="number"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  className="block w-full rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2.5 text-zinc-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder={unitMode === "imperial" ? "e.g. 142" : "e.g. 63"}
                  min="30"
                  max="500"
                />
                <span className="flex items-center px-4 bg-zinc-50 dark:bg-zinc-800 border-y border-r border-zinc-300 dark:border-zinc-700 rounded-r-lg text-zinc-500 text-sm">
                  {unitMode === "imperial" ? "lbs" : "kg"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Display */}
        {result ? (
          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-6">
            {/* Quick stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/80 text-center">
                <span className="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Starting BMI
                </span>
                <span className="block text-xl font-extrabold text-zinc-800 dark:text-zinc-100 mt-1">
                  {result.bmi}
                </span>
                <span className="inline-block text-[11px] font-medium text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800/50 px-2 py-0.5 rounded mt-1.5">
                  {result.bmiCategory}
                </span>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/80 text-center">
                <span className="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Gained So Far
                </span>
                <span className={`block text-xl font-extrabold mt-1 ${result.totalGainedKg < 0 ? "text-amber-600 dark:text-amber-400" : "text-teal-600 dark:text-teal-400"}`}>
                  {unitMode === "imperial"
                    ? `${result.totalGainedLb >= 0 ? "+" : ""}${result.totalGainedLb.toFixed(1)} lbs`
                    : `${result.totalGainedKg >= 0 ? "+" : ""}${result.totalGainedKg.toFixed(1)} kg`}
                </span>
                <span className="inline-block text-[11px] font-medium text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800/50 px-2 py-0.5 rounded mt-1.5">
                  Week {currentWeek}
                </span>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/80 text-center">
                <span className="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Expected At Week {currentWeek}
                </span>
                <span className="block text-lg font-extrabold text-zinc-800 dark:text-zinc-100 mt-1">
                  {unitMode === "imperial"
                    ? `${Math.max(0, result.expectedMinLb).toFixed(1)}–${result.expectedMaxLb.toFixed(1)} lbs`
                    : `${Math.max(0, result.expectedMinKg).toFixed(1)}–${result.expectedMaxKg.toFixed(1)} kg`}
                </span>
                <span className="inline-block text-[11px] font-medium text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800/50 px-2 py-0.5 rounded mt-1.5">
                  Trimester {currentWeek <= 12 ? "1" : currentWeek <= 27 ? "2" : "3"}
                </span>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/80 text-center col-span-2 md:col-span-1">
                <span className="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Full-Term Target
                </span>
                <span className="block text-lg font-extrabold text-zinc-800 dark:text-zinc-100 mt-1">
                  {unitMode === "imperial"
                    ? `${result.totalRecommendedMinLb.toFixed(0)}–${result.totalRecommendedMaxLb.toFixed(0)} lbs`
                    : `${result.totalRecommendedMinKg.toFixed(1)}–${result.totalRecommendedMaxKg.toFixed(1)} kg`}
                </span>
                <span className="inline-block text-[11px] font-medium text-zinc-500 bg-zinc-200/50 dark:bg-zinc-800/50 px-2 py-0.5 rounded mt-1.5">
                  Total Term Range
                </span>
              </div>
            </div>

            {/* Supportive feedback banner - avoid red/alarming colors entirely */}
            <div className={`p-5 rounded-2xl border ${
              result.status === "within"
                ? "bg-teal-50/50 dark:bg-teal-950/10 border-teal-100 dark:border-teal-900/30 text-teal-800 dark:text-teal-300"
                : "bg-amber-50/40 dark:bg-amber-950/10 border-amber-100/70 dark:border-amber-900/20 text-amber-800 dark:text-amber-300"
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5" role="img" aria-label="info">
                  {result.status === "within" ? "✨" : "🌿"}
                </span>
                <div>
                  <h4 className="font-bold text-sm sm:text-base mb-1">
                    {result.status === "within" && "Within recommended guide range"}
                    {result.status === "below" && "Below standard guide range"}
                    {result.status === "above" && "Above standard guide range"}
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {result.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Week-by-Week Visual Progress Tracker */}
            <div className="space-y-3 bg-zinc-50 dark:bg-zinc-950/40 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800/60">
              <div className="flex justify-between items-center text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                <span>Visual Progress (Week {currentWeek})</span>
                <span>
                  Target:{" "}
                  {unitMode === "imperial"
                    ? `${result.totalRecommendedMinLb.toFixed(0)} to ${result.totalRecommendedMaxLb.toFixed(0)} lbs`
                    : `${result.totalRecommendedMinKg.toFixed(1)} to ${result.totalRecommendedMaxKg.toFixed(1)} kg`}
                </span>
              </div>

              {/* Graphical Scale Track */}
              <div className="relative pt-6 pb-2">
                {/* Scale background track */}
                <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full relative">
                  {/* Expected range highlight */}
                  <div
                    className="absolute h-full bg-emerald-500/30 dark:bg-emerald-400/20 rounded-sm border-x border-emerald-500/40"
                    style={{
                      left: `${visualData.min}%`,
                      width: `${Math.max(2, visualData.max - visualData.min)}%`,
                    }}
                  >
                    {/* Tiny labels for expected min/max */}
                    <span className="absolute -top-5 left-0 -translate-x-1/2 text-[9px] font-medium text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                      Min ({(unitMode === "imperial" ? result.expectedMinLb : result.expectedMinKg).toFixed(1)})
                    </span>
                    <span className="absolute -top-5 right-0 translate-x-1/2 text-[9px] font-medium text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                      Max ({(unitMode === "imperial" ? result.expectedMaxLb : result.expectedMaxKg).toFixed(1)})
                    </span>
                  </div>

                  {/* Current weight gain marker */}
                  <div
                    className="absolute -top-1 w-5 h-5 rounded-full bg-teal-600 dark:bg-teal-400 shadow-md border-2 border-white dark:border-zinc-900 flex items-center justify-center -translate-x-1/2 transition-all duration-300"
                    style={{ left: `${visualData.current}%` }}
                  >
                    <div className="w-1.5 h-1.5 bg-white dark:bg-zinc-900 rounded-full" />
                  </div>
                </div>

                {/* Legend and current marker tooltip label */}
                <div className="relative h-6 mt-1.5">
                  <div
                    className="absolute text-center -translate-x-1/2 transition-all duration-300 whitespace-nowrap"
                    style={{ left: `${visualData.current}%` }}
                  >
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-1.5 py-0.5 rounded border border-teal-100 dark:border-teal-900/30">
                      Your Gain:{" "}
                      {unitMode === "imperial"
                        ? `${result.totalGainedLb.toFixed(1)} lbs`
                        : `${result.totalGainedKg.toFixed(1)} kg`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Tracker Note */}
              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-relaxed text-center mt-1">
                The shaded area indicates the healthy guidelines range for week {currentWeek}. Weight gain typically proceeds slowly in the first trimester (weeks 1–12) before progressing at a steady rate in trimesters 2 and 3.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-zinc-100 dark:border-zinc-800">
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              Please fill in your pre-pregnancy weight, height, and current weight to see your personalized gestational weight gain guide.
            </p>
          </div>
        )}

        {/* Calm and reassuring footer disclaimer */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800 rounded-xl">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed text-center">
            🌿 <strong className="font-semibold text-zinc-700 dark:text-zinc-300">Important Note:</strong> These are general guidelines based on the Institute of Medicine (IOM) weight models. Every pregnancy is completely different — always follow your doctor or midwife’s personalized guidance over any online calculator.
          </p>
        </div>
      </div>
    </div>
  );
}
