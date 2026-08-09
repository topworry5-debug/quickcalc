"use client";

import { useState, useMemo } from "react";
import {
  calculateMacros,
  getMacroExplanationSteps,
  MacroGoal,
  MacroPreset,
  MacroResult,
} from "@/lib/calculators/macroCalculator";
import { generatePdfAsync } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import ShareResultButton from "@/components/ShareResultButton";
import ShareResultModal from "@/components/ShareResultModal";
import Link from "next/link";
import { PieChart, Flame, ArrowRight, AlertTriangle } from "lucide-react";

export default function MacroCalculatorWidget() {
  // Unit selections
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");

  // Basic inputs
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("30");

  // Metric inputs
  const [heightCm, setHeightCm] = useState<string>("175");
  const [weightKg, setWeightKg] = useState<string>("70");

  // Imperial inputs
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("9");
  const [weightLbs, setWeightLbs] = useState<string>("154");

  // Activity & Goal
  const [activityLevel, setActivityLevel] = useState<
    "sedentary" | "light" | "moderate" | "active" | "extreme"
  >("moderate");
  const [goal, setGoal] = useState<MacroGoal>("maintain");

  // Presets & Custom sliders
  const [preset, setPreset] = useState<MacroPreset>("balanced");
  const [customProtein, setCustomProtein] = useState<number>(30);
  const [customCarbs, setCustomCarbs] = useState<number>(40);
  const [customFat, setCustomFat] = useState<number>(30);

  // Per-meal view state
  const [mealsCount, setMealsCount] = useState<3 | 4>(3);

  // Modal & Copy
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  // Convert inputs to metric for engine
  const parsedAge = Math.max(1, Math.min(120, parseFloat(age) || 30));

  let parsedHeightCm = parseFloat(heightCm) || 175;
  if (unitSystem === "imperial") {
    const ft = parseFloat(heightFt) || 0;
    const inch = parseFloat(heightIn) || 0;
    parsedHeightCm = Math.round((ft * 12 + inch) * 2.54);
  }

  let parsedWeightKg = parseFloat(weightKg) || 70;
  if (unitSystem === "imperial") {
    const lbs = parseFloat(weightLbs) || 0;
    parsedWeightKg = Math.round(lbs * 0.45359237);
  }

  const customTotal = customProtein + customCarbs + customFat;
  const isCustomSumValid = preset !== "custom" || customTotal === 100;

  // Calculate results
  const result: MacroResult = useMemo(() => {
    return calculateMacros({
      sex,
      age: parsedAge,
      height: parsedHeightCm,
      weight: parsedWeightKg,
      activityLevel,
      goal,
      preset,
      customProteinPct: customProtein,
      customCarbsPct: customCarbs,
      customFatPct: customFat,
    });
  }, [
    sex,
    parsedAge,
    parsedHeightCm,
    parsedWeightKg,
    activityLevel,
    goal,
    preset,
    customProtein,
    customCarbs,
    customFat,
  ]);

  const explanationSteps = useMemo(() => {
    return getMacroExplanationSteps(
      {
        sex,
        age: parsedAge,
        height: parsedHeightCm,
        weight: parsedWeightKg,
        activityLevel,
        goal,
        preset,
        customProteinPct: customProtein,
        customCarbsPct: customCarbs,
        customFatPct: customFat,
      },
      result
    );
  }, [
    sex,
    parsedAge,
    parsedHeightCm,
    parsedWeightKg,
    activityLevel,
    goal,
    preset,
    customProtein,
    customCarbs,
    customFat,
    result,
  ]);

  const handleCopy = () => {
    let text = `Daily Macro Breakdown — QuickCalc\n`;
    text += `====================================\n`;
    text += `Target Daily Calories: ${result.targetCalories.toLocaleString()} kcal\n`;
    text += `Macro Split (${result.proteinPct}% P / ${result.carbsPct}% C / ${result.fatPct}% F):\n`;
    text += `- Protein: ${result.proteinGrams}g / day (${result.proteinCalories} kcal)\n`;
    text += `- Carbs: ${result.carbsGrams}g / day (${result.carbsCalories} kcal)\n`;
    text += `- Fat: ${result.fatGrams}g / day (${result.fatCalories} kcal)\n`;
    text += `Per Meal Target (3 Meals): ${result.perMeal3.proteinGrams}g P | ${result.perMeal3.carbsGrams}g C | ${result.perMeal3.fatGrams}g F (${result.perMeal3.calories} kcal)\n`;
    text += `====================================\n`;
    text += `Calculated on QuickCalc (https://quickcalc.cloud/tools/macro-calculator)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = async () => {
    if (isPdfGenerating) return;
    setIsPdfGenerating(true);

    try {
      await generatePdfAsync({
        toolName: "Macro Calculator",
        toolSlug: "macro-calculator",
        inputs: [
          { label: "Sex", value: sex === "male" ? "Male" : "Female" },
          { label: "Age", value: `${parsedAge} years` },
          { label: "Weight", value: unitSystem === "metric" ? `${parsedWeightKg} kg` : `${weightLbs} lbs` },
          { label: "Height", value: unitSystem === "metric" ? `${parsedHeightCm} cm` : `${heightFt}'${heightIn}"` },
          { label: "Goal", value: goal === "lose" ? "Weight Loss (-500 kcal)" : goal === "gain" ? "Weight Gain (+500 kcal)" : "Maintain Weight" },
          { label: "Selected Preset", value: preset.toUpperCase() },
        ],
        results: [
          { label: "Daily Calorie Target", value: `${result.targetCalories.toLocaleString()} kcal`, isHighlight: true },
          { label: "Protein (Daily)", value: `${result.proteinGrams}g (${result.proteinCalories} kcal)` },
          { label: "Carbohydrates (Daily)", value: `${result.carbsGrams}g (${result.carbsCalories} kcal)` },
          { label: "Fats (Daily)", value: `${result.fatGrams}g (${result.fatCalories} kcal)` },
        ],
        summaryNote: `Macro targets calculated using ${result.proteinPct}% Protein, ${result.carbsPct}% Carbs, and ${result.fatPct}% Fat distribution.`,
        filename: `Macro-Breakdown-Report.pdf`,
      });
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-600 p-6 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
          <PieChart size={14} />
          <span>Nutrition & Macros</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold">Daily Macro Calculator</h3>
        <p className="text-xs sm:text-sm text-orange-100 mt-1 max-w-md mx-auto">
          Calculate your exact daily protein, carbohydrate, and fat targets in grams
        </p>
      </div>

      {/* Main Container */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Metric vs Imperial Toggle & Sex Selector */}
        <div className="grid grid-cols-2 gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Unit System
            </label>
            <div className="grid grid-cols-2 gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setUnitSystem("metric")}
                className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  unitSystem === "metric"
                    ? "bg-white dark:bg-zinc-700 text-orange-600 dark:text-orange-400 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                Metric (cm/kg)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem("imperial")}
                className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  unitSystem === "imperial"
                    ? "bg-white dark:bg-zinc-700 text-orange-600 dark:text-orange-400 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                Imperial (ft/lbs)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Biological Sex
            </label>
            <div className="grid grid-cols-2 gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setSex("male")}
                className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  sex === "male"
                    ? "bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setSex("female")}
                className={`py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  sex === "female"
                    ? "bg-white dark:bg-zinc-700 text-pink-600 dark:text-pink-400 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                Female
              </button>
            </div>
          </div>
        </div>

        {/* Physical Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label htmlFor="age" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Age (yrs)
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 px-3 py-2 text-zinc-900 dark:text-white font-semibold text-sm focus:border-orange-500 focus:outline-none"
              min="1"
              max="120"
            />
          </div>

          {unitSystem === "metric" ? (
            <>
              <div>
                <label htmlFor="heightCm" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Height (cm)
                </label>
                <input
                  id="heightCm"
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 px-3 py-2 text-zinc-900 dark:text-white font-semibold text-sm focus:border-orange-500 focus:outline-none"
                  min="50"
                  max="250"
                />
              </div>

              <div>
                <label htmlFor="weightKg" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Weight (kg)
                </label>
                <input
                  id="weightKg"
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 px-3 py-2 text-zinc-900 dark:text-white font-semibold text-sm focus:border-orange-500 focus:outline-none"
                  min="20"
                  max="300"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Height (ft / in)
                </label>
                <div className="grid grid-cols-2 gap-1">
                  <input
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    placeholder="ft"
                    className="w-full rounded-l-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 px-2 py-2 text-zinc-900 dark:text-white font-semibold text-xs focus:border-orange-500 focus:outline-none"
                  />
                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    placeholder="in"
                    className="w-full rounded-r-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 px-2 py-2 text-zinc-900 dark:text-white font-semibold text-xs focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="weightLbs" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Weight (lbs)
                </label>
                <input
                  id="weightLbs"
                  type="number"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 px-3 py-2 text-zinc-900 dark:text-white font-semibold text-sm focus:border-orange-500 focus:outline-none"
                  min="40"
                  max="700"
                />
              </div>
            </>
          )}
        </div>

        {/* Activity & Fitness Goal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="activityLevel" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Activity Level
            </label>
            <select
              id="activityLevel"
              value={activityLevel}
              onChange={(e) =>
                setActivityLevel(
                  e.target.value as "sedentary" | "light" | "moderate" | "active" | "extreme"
                )
              }
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-zinc-900 dark:text-white font-semibold text-xs sm:text-sm focus:border-orange-500 focus:outline-none"
            >
              <option value="sedentary">Sedentary (desk job, little exercise)</option>
              <option value="light">Lightly Active (exercise 1-3 days/wk)</option>
              <option value="moderate">Moderately Active (exercise 3-5 days/wk)</option>
              <option value="active">Very Active (intense exercise 6-7 days/wk)</option>
              <option value="extreme">Extremely Active (hard labor & daily training)</option>
            </select>
          </div>

          <div>
            <label htmlFor="goal" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Primary Fitness Goal
            </label>
            <select
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value as MacroGoal)}
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2.5 text-zinc-900 dark:text-white font-semibold text-xs sm:text-sm focus:border-orange-500 focus:outline-none"
            >
              <option value="maintain">Maintain Weight (TDEE Baseline)</option>
              <option value="lose">Weight Loss (-500 kcal deficit)</option>
              <option value="gain">Weight / Muscle Gain (+500 kcal surplus)</option>
            </select>
          </div>
        </div>

        {/* Macro Ratio Presets Bar */}
        <div className="space-y-3 pt-1">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
            Macro Distribution Preset
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
            {(
              [
                { id: "balanced", label: "Balanced (30/40/30)" },
                { id: "high-protein", label: "High Protein (40/40/20)" },
                { id: "low-carb", label: "Low Carb (35/25/40)" },
                { id: "keto", label: "Keto (25/5/70)" },
                { id: "custom", label: "Custom %" },
              ] as const
            ).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPreset(p.id)}
                className={`py-2 px-2 rounded-lg text-xs font-semibold transition-all ${
                  preset === p.id
                    ? "bg-white dark:bg-zinc-700 text-orange-600 dark:text-orange-400 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Custom Ratio Sliders */}
          {preset === "custom" && (
            <div className="p-4 bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/20 rounded-xl space-y-4">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-zinc-800 dark:text-zinc-200">Custom Allocation Sliders</span>
                <span
                  className={`px-2 py-0.5 rounded-md font-mono ${
                    customTotal === 100
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/20 text-rose-600 dark:text-rose-400"
                  }`}
                >
                  Total: {customTotal}% {customTotal !== 100 && "(Must equal 100%)"}
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-cyan-600 dark:text-cyan-400 font-semibold mb-1">
                    <span>Protein ({customProtein}%)</span>
                    <span>{Math.round((result.targetCalories * (customProtein / 100)) / 4)}g</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    step="5"
                    value={customProtein}
                    onChange={(e) => setCustomProtein(parseInt(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold mb-1">
                    <span>Carbs ({customCarbs}%)</span>
                    <span>{Math.round((result.targetCalories * (customCarbs / 100)) / 4)}g</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    step="5"
                    value={customCarbs}
                    onChange={(e) => setCustomCarbs(parseInt(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-amber-600 dark:text-amber-400 font-semibold mb-1">
                    <span>Fat ({customFat}%)</span>
                    <span>{Math.round((result.targetCalories * (customFat / 100)) / 9)}g</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="80"
                    step="5"
                    value={customFat}
                    onChange={(e) => setCustomFat(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              {!isCustomSumValid && (
                <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
                  <AlertTriangle size={16} className="flex-shrink-0" />
                  <span>Custom macro percentages sum to {customTotal}%. Please adjust so they equal exactly 100%.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hero Output Card */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-2xl p-6 shadow-xl border border-zinc-800 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
              Target Daily Energy
            </span>
            <div className="text-4xl sm:text-5xl font-black font-[family-name:var(--font-geist-mono)] tracking-tight text-white py-1">
              {result.targetCalories.toLocaleString()}
              <span className="text-lg sm:text-xl font-normal text-zinc-400 ml-1">kcal / day</span>
            </div>
            <p className="text-xs text-zinc-400">
              {goal === "lose" ? "Caloric deficit for fat loss" : goal === "gain" ? "Caloric surplus for muscle building" : "Maintenance baseline TDEE"}
            </p>
          </div>

          {/* Stacked Proportional Visual Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-[11px] font-semibold text-zinc-400 px-1">
              <span className="text-cyan-400">Protein ({result.proteinPct}%)</span>
              <span className="text-emerald-400">Carbs ({result.carbsPct}%)</span>
              <span className="text-amber-400">Fat ({result.fatPct}%)</span>
            </div>
            <div className="relative h-6 w-full rounded-xl bg-zinc-800 overflow-hidden flex shadow-inner">
              <div
                style={{ width: `${result.proteinPct}%` }}
                className="bg-cyan-500 h-full flex items-center justify-center text-[10px] font-extrabold text-zinc-950 transition-all"
              >
                {result.proteinPct >= 15 && `${result.proteinGrams}g`}
              </div>
              <div
                style={{ width: `${result.carbsPct}%` }}
                className="bg-emerald-500 h-full flex items-center justify-center text-[10px] font-extrabold text-zinc-950 transition-all"
              >
                {result.carbsPct >= 15 && `${result.carbsGrams}g`}
              </div>
              <div
                style={{ width: `${result.fatPct}%` }}
                className="bg-amber-500 h-full flex items-center justify-center text-[10px] font-extrabold text-zinc-950 transition-all"
              >
                {result.fatPct >= 15 && `${result.fatGrams}g`}
              </div>
            </div>
          </div>

          {/* 3 Macro Cards Grid */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            {/* Protein */}
            <div className="bg-cyan-500/10 border border-cyan-500/30 p-3.5 rounded-xl text-center">
              <span className="block text-xs font-semibold text-cyan-300 uppercase tracking-wider">Protein</span>
              <span className="block text-2xl sm:text-3xl font-black font-[family-name:var(--font-geist-mono)] text-cyan-200 mt-1">
                {result.proteinGrams}
                <span className="text-xs font-normal text-cyan-400 ml-0.5">g</span>
              </span>
              <span className="block text-[10px] text-cyan-400/80 mt-1 font-medium">
                {result.proteinCalories} kcal (4 kcal/g)
              </span>
            </div>

            {/* Carbs */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-3.5 rounded-xl text-center">
              <span className="block text-xs font-semibold text-emerald-300 uppercase tracking-wider">Carbs</span>
              <span className="block text-2xl sm:text-3xl font-black font-[family-name:var(--font-geist-mono)] text-emerald-200 mt-1">
                {result.carbsGrams}
                <span className="text-xs font-normal text-emerald-400 ml-0.5">g</span>
              </span>
              <span className="block text-[10px] text-emerald-400/80 mt-1 font-medium">
                {result.carbsCalories} kcal (4 kcal/g)
              </span>
            </div>

            {/* Fat */}
            <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl text-center">
              <span className="block text-xs font-semibold text-amber-300 uppercase tracking-wider">Fat</span>
              <span className="block text-2xl sm:text-3xl font-black font-[family-name:var(--font-geist-mono)] text-amber-200 mt-1">
                {result.fatGrams}
                <span className="text-xs font-normal text-amber-400 ml-0.5">g</span>
              </span>
              <span className="block text-[10px] text-amber-400/80 mt-1 font-medium">
                {result.fatCalories} kcal (9 kcal/g)
              </span>
            </div>
          </div>

          {/* Per Meal Breakdown Row */}
          <div className="p-4 bg-zinc-800/50 border border-zinc-700/50 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Per-Meal Target Allocation
              </span>
              <div className="inline-flex rounded-lg bg-zinc-900 p-0.5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setMealsCount(3)}
                  className={`px-2.5 py-0.5 rounded-md transition-colors ${
                    mealsCount === 3 ? "bg-orange-500 text-white font-semibold" : "text-zinc-400"
                  }`}
                >
                  3 Meals / day
                </button>
                <button
                  type="button"
                  onClick={() => setMealsCount(4)}
                  className={`px-2.5 py-0.5 rounded-md transition-colors ${
                    mealsCount === 4 ? "bg-orange-500 text-white font-semibold" : "text-zinc-400"
                  }`}
                >
                  4 Meals / day
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono pt-1">
              <div className="bg-zinc-900/60 p-2 rounded-lg">
                <span className="block text-[10px] text-zinc-500">Calories</span>
                <span className="font-bold text-white">
                  {mealsCount === 3 ? result.perMeal3.calories : result.perMeal4.calories} kcal
                </span>
              </div>
              <div className="bg-cyan-950/40 p-2 rounded-lg border border-cyan-500/20">
                <span className="block text-[10px] text-cyan-400">Protein</span>
                <span className="font-bold text-cyan-200">
                  {mealsCount === 3 ? result.perMeal3.proteinGrams : result.perMeal4.proteinGrams}g
                </span>
              </div>
              <div className="bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/20">
                <span className="block text-[10px] text-emerald-400">Carbs</span>
                <span className="font-bold text-emerald-200">
                  {mealsCount === 3 ? result.perMeal3.carbsGrams : result.perMeal4.carbsGrams}g
                </span>
              </div>
              <div className="bg-amber-950/40 p-2 rounded-lg border border-amber-500/20">
                <span className="block text-[10px] text-amber-400">Fat</span>
                <span className="font-bold text-amber-200">
                  {mealsCount === 3 ? result.perMeal3.fatGrams : result.perMeal4.fatGrams}g
                </span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap gap-2 pt-1 justify-center">
            <button
              type="button"
              onClick={handleCopy}
              className="py-2 px-4 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors inline-flex items-center gap-1.5"
            >
              {copied ? "✓ Copied!" : "📋 Copy Summary"}
            </button>

            <DownloadPdfButton onClick={handleDownloadPdf} isGenerating={isPdfGenerating} />
            <ShareResultButton onClick={() => setIsShareModalOpen(true)} />
          </div>
        </div>

        {/* Reciprocal CTA Banner */}
        <div className="p-4 bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/20 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white flex items-center justify-center sm:justify-start gap-1.5">
              <Flame size={14} className="text-orange-500" />
              Want your full metabolic & BMR breakdown?
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Calculate your exact maintenance, deficit, and surplus caloric bands.
            </p>
          </div>
          <Link
            href="/tools/calorie-calculator"
            className="py-2 px-3.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold transition-colors flex-shrink-0 inline-flex items-center gap-1 group"
          >
            <span>Try Calorie Calculator</span>
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Step-by-Step Explanation */}
        <ExplainResultAccordion steps={explanationSteps} />
      </div>

      {/* Share Result Modal */}
      <ShareResultModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        data={{
          toolName: "Macro Calculator",
          toolSlug: "macro-calculator",
          category: "Health & Wellness",
          resultValue: `${result.targetCalories.toLocaleString()} kcal / day`,
          resultLabel: `${result.proteinGrams}g Protein | ${result.carbsGrams}g Carbs | ${result.fatGrams}g Fat`,
          inputsSummary: [
            { label: "Goal", value: goal === "lose" ? "Weight Loss" : goal === "gain" ? "Weight Gain" : "Maintain" },
            { label: "Macro Split", value: `${result.proteinPct}% P / ${result.carbsPct}% C / ${result.fatPct}% F` },
          ],
        }}
      />
    </div>
  );
}
