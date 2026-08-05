"use client";

import { useState } from "react";
import { calculateCalories, CalorieResult } from "@/lib/calculators/calorieCalculator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";

export default function CalorieCalculatorWidget() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("30");
  
  // Height inputs
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [heightCm, setHeightCm] = useState<string>("175");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("9");

  // Weight inputs
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [weight, setWeight] = useState<string>("75");

  const [activityLevel, setActivityLevel] = useState<"sedentary" | "light" | "moderate" | "active" | "extreme">("moderate");
  const [copied, setCopied] = useState(false);

  // Derive values and validate
  let resolvedHeightCm = 0;
  if (heightUnit === "cm") {
    resolvedHeightCm = parseFloat(heightCm) || 0;
  } else {
    const ft = parseFloat(heightFt) || 0;
    const inch = parseFloat(heightIn) || 0;
    resolvedHeightCm = (ft * 12 + inch) * 2.54;
  }

  let resolvedWeightKg = 0;
  if (weightUnit === "kg") {
    resolvedWeightKg = parseFloat(weight) || 0;
  } else {
    resolvedWeightKg = (parseFloat(weight) || 0) * 0.45359237;
  }

  const ageNum = parseInt(age, 10) || 0;

  // Validation rules
  const isAgeInvalid = ageNum <= 0 || ageNum >= 120;
  const isHeightInvalid = resolvedHeightCm < 50 || resolvedHeightCm > 300;
  const isWeightInvalid = resolvedWeightKg < 2 || resolvedWeightKg > 600;

  const hasValidationError = isAgeInvalid || isHeightInvalid || isWeightInvalid;

  let calorieResult: CalorieResult | null = null;
  if (!hasValidationError && ageNum > 0 && resolvedHeightCm > 0 && resolvedWeightKg > 0) {
    calorieResult = calculateCalories({
      sex,
      age: ageNum,
      height: resolvedHeightCm,
      weight: resolvedWeightKg,
      activityLevel,
    });
  }

  const handleCopy = () => {
    if (!calorieResult) return;
    const text = `My daily calorie needs: Maintain ${calorieResult.maintainWeight.toLocaleString()} kcal | Lose ${calorieResult.loseWeight.toLocaleString()} kcal | Gain ${calorieResult.gainWeight.toLocaleString()} kcal — via quickcalc.cloud`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    if (!calorieResult || hasValidationError) return;

    generatePdf({
      toolName: "Calorie / TDEE Calculator",
      toolSlug: "calorie-calculator",
      inputs: [
        { label: "Sex", value: sex.toUpperCase() },
        { label: "Age", value: `${age} years` },
        { label: "Height", value: heightUnit === "cm" ? `${heightCm} cm` : `${heightFt} ft ${heightIn} in` },
        { label: "Weight", value: `${weight} ${weightUnit}` },
        { label: "Activity Level", value: activityLevel.toUpperCase() },
      ],
      results: [
        { label: "Daily BMR", value: `${calorieResult.bmr.toLocaleString()} kcal`, isHighlight: false },
        { label: "TDEE (Maintain)", value: `${calorieResult.tdee.toLocaleString()} kcal`, isHighlight: true },
        { label: "Weight Loss (-500 kcal)", value: `${calorieResult.loseWeight.toLocaleString()} kcal` },
        { label: "Weight Gain (+500 kcal)", value: `${calorieResult.gainWeight.toLocaleString()} kcal` },
      ],
      summaryNote: `Your Total Daily Energy Expenditure (TDEE) is estimated at ${calorieResult.tdee.toLocaleString()} kcal/day based on the Mifflin-St Jeor equation.`,
      filename: `Calorie-Report-${calorieResult.tdee}kcal.pdf`,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 my-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left column: Inputs */}
        <div className="md:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-md space-y-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3">
            Your Details
          </h2>

          {/* Sex Selection */}
          <div>
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Biological Sex
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSex("male")}
                className={`py-3 px-4 rounded-xl font-medium border text-sm transition-all flex items-center justify-center gap-2 ${
                  sex === "male"
                    ? "bg-orange-50 border-orange-500 text-orange-700 dark:bg-orange-950/30 dark:border-orange-400 dark:text-orange-400 shadow-sm"
                    : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                <span>♂️</span> Male
              </button>
              <button
                type="button"
                onClick={() => setSex("female")}
                className={`py-3 px-4 rounded-xl font-medium border text-sm transition-all flex items-center justify-center gap-2 ${
                  sex === "female"
                    ? "bg-orange-50 border-orange-500 text-orange-700 dark:bg-orange-950/30 dark:border-orange-400 dark:text-orange-400 shadow-sm"
                    : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                <span>♀️</span> Female
              </button>
            </div>
          </div>

          {/* Age Input */}
          <div>
            <label htmlFor="age" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Age (Years)
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={`block w-full rounded-xl border bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                isAgeInvalid && age !== ""
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-300 dark:border-zinc-700 focus:border-orange-500 focus:ring-orange-500"
              }`}
              placeholder="e.g. 30"
              min="1"
              max="120"
            />
          </div>

          {/* Height Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Height
              </label>
              <div className="inline-flex rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5 bg-zinc-50 dark:bg-zinc-900">
                <button
                  type="button"
                  onClick={() => setHeightUnit("cm")}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    heightUnit === "cm"
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700"
                  }`}
                >
                  cm
                </button>
                <button
                  type="button"
                  onClick={() => setHeightUnit("ft")}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    heightUnit === "ft"
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700"
                  }`}
                >
                  ft + in
                </button>
              </div>
            </div>

            {heightUnit === "cm" ? (
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className={`block w-full rounded-xl border bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  isHeightInvalid && heightCm !== ""
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-zinc-300 dark:border-zinc-700 focus:border-orange-500 focus:ring-orange-500"
                }`}
                placeholder="e.g. 175"
              />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="number"
                    value={heightFt}
                    onChange={(e) => setHeightFt(e.target.value)}
                    className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent pl-4 pr-10 py-3 text-zinc-900 dark:text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="ft"
                  />
                  <span className="absolute right-4 top-3 text-zinc-400 text-sm font-medium">ft</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent pl-4 pr-10 py-3 text-zinc-900 dark:text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="in"
                  />
                  <span className="absolute right-4 top-3 text-zinc-400 text-sm font-medium">in</span>
                </div>
              </div>
            )}
          </div>

          {/* Weight Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Weight
              </label>
              <div className="inline-flex rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5 bg-zinc-50 dark:bg-zinc-900">
                <button
                  type="button"
                  onClick={() => setWeightUnit("kg")}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    weightUnit === "kg"
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700"
                  }`}
                >
                  kg
                </button>
                <button
                  type="button"
                  onClick={() => setWeightUnit("lb")}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    weightUnit === "lb"
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700"
                  }`}
                >
                  lb
                </button>
              </div>
            </div>

            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className={`block w-full rounded-xl border bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                isWeightInvalid && weight !== ""
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-zinc-300 dark:border-zinc-700 focus:border-orange-500 focus:ring-orange-500"
              }`}
              placeholder="e.g. 75"
            />
          </div>

          {/* Activity Level Dropdown */}
          <div>
            <label htmlFor="activityLevel" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
              Activity Level
            </label>
            <select
              id="activityLevel"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as "sedentary" | "light" | "moderate" | "active" | "extreme")}
              className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-zinc-900 dark:text-white focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
            >
              <option value="sedentary">Sedentary: Little to no exercise, desk job</option>
              <option value="light">Lightly active: Light exercise 1-3 days/week</option>
              <option value="moderate">Moderately active: Moderate exercise 3-5 days/week</option>
              <option value="active">Very active: Hard exercise 6-7 days/week</option>
              <option value="extreme">Extremely active: Intense daily sports or physical job</option>
            </select>
          </div>
        </div>

        {/* Right column: Interactive Results */}
        <div className="md:col-span-7 flex flex-col justify-between">
          {hasValidationError ? (
            <div className="h-full flex flex-col items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center space-y-3">
              <span className="text-4xl">⚠️</span>
              <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
                Please check your entries
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
                To calculate correctly, please verify that your age (1-120), height (50-300 cm), and weight (2-600 kg) represent realistic biological values.
              </p>
            </div>
          ) : calorieResult ? (
            <div className="space-y-6">
              
              {/* Top BMR info row */}
              <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Basal Metabolic Rate (BMR)
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    The calories your body burns at complete rest.
                  </p>
                </div>
                <div className="text-2xl font-extrabold text-orange-600 dark:text-orange-400">
                  {calorieResult.bmr.toLocaleString()} <span className="text-sm font-medium text-zinc-500">kcal/day</span>
                </div>
              </div>

              {/* Three goals cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Lose */}
                <div className="bg-white dark:bg-zinc-900 border-2 border-red-100 dark:border-red-950/40 rounded-2xl p-5 shadow-sm text-center relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 inset-x-0 h-1 bg-red-500" />
                  <div>
                    <h4 className="text-sm font-bold text-red-600 dark:text-red-400 mb-1">
                      Lose Weight
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                      ~0.5kg / 1lb per week
                    </p>
                  </div>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                      {calorieResult.loseWeight.toLocaleString()}
                    </span>
                    <span className="block text-xs font-semibold text-zinc-400 mt-1">
                      kcal / day
                    </span>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/20 py-1.5 px-2 rounded-lg text-[10px] font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">
                    Cutting phase
                  </div>
                </div>

                {/* Maintain */}
                <div className="bg-white dark:bg-zinc-900 border-2 border-orange-200 dark:border-orange-950 rounded-2xl p-5 shadow-md text-center relative overflow-hidden flex flex-col justify-between transform scale-105 sm:scale-105 z-10">
                  <div className="absolute top-0 inset-x-0 h-1 bg-orange-500" />
                  <div>
                    <h4 className="text-sm font-bold text-orange-600 dark:text-orange-400 mb-1">
                      Maintain Weight
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                      Exact energy balance
                    </p>
                  </div>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                      {calorieResult.maintainWeight.toLocaleString()}
                    </span>
                    <span className="block text-xs font-semibold text-zinc-400 mt-1">
                      kcal / day
                    </span>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-950/20 py-1.5 px-2 rounded-lg text-[10px] font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider">
                    TDEE maintenance
                  </div>
                </div>

                {/* Gain */}
                <div className="bg-white dark:bg-zinc-900 border-2 border-emerald-100 dark:border-emerald-950/40 rounded-2xl p-5 shadow-sm text-center relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                      Gain Weight
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                      ~0.5kg / 1lb per week
                    </p>
                  </div>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">
                      {calorieResult.gainWeight.toLocaleString()}
                    </span>
                    <span className="block text-xs font-semibold text-zinc-400 mt-1">
                      kcal / day
                    </span>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 py-1.5 px-2 rounded-lg text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                    Bulking phase
                  </div>
                </div>

              </div>

              {/* Shareable Result Card */}
              <div className="mt-8 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 shadow-lg">
                <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 p-6 sm:p-8 text-white relative">
                  
                  {/* Subtle watermark in bottom-right corner */}
                  <div className="absolute bottom-3 right-4 text-[10px] font-bold tracking-widest text-white/40 cursor-default uppercase">
                    ⚡ QUICKCALC
                  </div>

                  <p className="text-xs uppercase tracking-widest text-orange-100 font-extrabold">
                    Mifflin-St Jeor Daily Profile
                  </p>
                  <h3 className="text-xl sm:text-2xl font-black mt-1 tracking-tight">
                    My Daily Energy Blueprint
                  </h3>

                  <div className="grid grid-cols-3 gap-2 mt-6 border-t border-white/20 pt-6">
                    <div>
                      <span className="block text-[10px] font-extrabold uppercase tracking-wide text-orange-100/80">
                        Lose Target
                      </span>
                      <span className="text-2xl sm:text-3xl font-black block mt-0.5 tracking-tight">
                        {calorieResult.loseWeight.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-medium text-orange-50/70 block mt-0.5">
                        kcal / day
                      </span>
                    </div>

                    <div className="border-x border-white/10 px-2 sm:px-4">
                      <span className="block text-[10px] font-extrabold uppercase tracking-wide text-orange-100/80">
                        Maintain
                      </span>
                      <span className="text-2xl sm:text-3xl font-black block mt-0.5 tracking-tight text-white">
                        {calorieResult.maintainWeight.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-medium text-orange-50/70 block mt-0.5">
                        kcal / day
                      </span>
                    </div>

                    <div className="pl-1 sm:pl-2">
                      <span className="block text-[10px] font-extrabold uppercase tracking-wide text-orange-100/80">
                        Gain Target
                      </span>
                      <span className="text-2xl sm:text-3xl font-black block mt-0.5 tracking-tight">
                        {calorieResult.gainWeight.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-medium text-orange-50/70 block mt-0.5">
                        kcal / day
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold text-orange-50 bg-white/10 px-3 py-2 rounded-lg inline-flex">
                    <span>• {sex.charAt(0).toUpperCase() + sex.slice(1)}</span>
                    <span>• {age} yrs</span>
                    <span>• {heightUnit === "cm" ? `${heightCm} cm` : `${heightFt}'${heightIn}"`}</span>
                    <span>• {weight} {weightUnit}</span>
                  </div>
                </div>

                {/* Actions row under shareable card */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Perfect for screenshots! Save this card to track your metrics.
                  </p>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-xs font-bold py-2 px-4 rounded-xl transition duration-150"
                    >
                      <span>{copied ? "✅ Copied!" : "📋 Copy result"}</span>
                    </button>
                    <DownloadPdfButton onClick={handleDownloadPdf} />
                  </div>
                </div>

              </div>

            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
}
