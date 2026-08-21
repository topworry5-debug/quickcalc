"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  calculateCreatineAndMacros,
  getCreatineExplanationSteps,
  CREATINE_PRESETS,
  CreatineCalculatorInputs,
  CreatineMacroResult,
  UnitSystem,
  Gender,
  ActivityLevel,
  FitnessGoal,
  CreatineProtocol,
} from "@/lib/calculators/creatineMacroCalculator";
import { generatePdfAsync } from "@/lib/utils/downloadPdf";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import {
  RotateCcw,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  Zap,
  Droplets,
  Flame,
  ChevronDown,
  Activity,
} from "lucide-react";

export default function CreatineMacroCalculatorWidget() {
  // Unit & Body Metrics
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState<string>("26");

  // Metric inputs
  const [weightKg, setWeightKg] = useState<string>("80");
  const [heightCm, setHeightCm] = useState<string>("180");

  // Imperial inputs
  const [weightLbs, setWeightLbs] = useState<string>("176");
  const [heightFeet, setHeightFeet] = useState<string>("5");
  const [heightInches, setHeightInches] = useState<string>("11");

  // Optional body fat
  const [bodyFatPercent, setBodyFatPercent] = useState<string>("14");
  const [showBodyFatInput, setShowBodyFatInput] = useState<boolean>(false);

  // Activity & Goals
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>("moderate");
  const [goal, setGoal] = useState<FitnessGoal>("bulk_lean");
  const [protocol, setProtocol] = useState<CreatineProtocol>("loading_maintenance");

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  // Sync state from URL parameters on initial mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const qUnit = params.get("unit") as UnitSystem | null;
      const qGender = params.get("gender") as Gender | null;
      const qAge = params.get("age");
      const qWeight = params.get("weight");
      const qHeight = params.get("height");
      const qBf = params.get("bf");
      const qActivity = params.get("act") as ActivityLevel | null;
      const qGoal = params.get("goal") as FitnessGoal | null;
      const qProto = params.get("proto") as CreatineProtocol | null;

      if (qUnit && ["metric", "imperial"].includes(qUnit)) setUnitSystem(qUnit);
      if (qGender && ["male", "female"].includes(qGender)) setGender(qGender);
      if (qAge) setAge(qAge);
      if (qWeight) setWeightKg(qWeight);
      if (qHeight) setHeightCm(qHeight);
      if (qBf) {
        setBodyFatPercent(qBf);
        setShowBodyFatInput(true);
      }
      if (qActivity) setActivityLevel(qActivity);
      if (qGoal) setGoal(qGoal);
      if (qProto) setProtocol(qProto);
    } catch {
      // ignore
    }
  }, []);

  // Compute canonical weight in kg and height in cm
  const canonicalWeightKg = useMemo(() => {
    if (unitSystem === "metric") {
      return parseFloat(weightKg) || 70;
    } else {
      const lbs = parseFloat(weightLbs) || 154;
      return lbs / 2.20462;
    }
  }, [unitSystem, weightKg, weightLbs]);

  const canonicalHeightCm = useMemo(() => {
    if (unitSystem === "metric") {
      return parseFloat(heightCm) || 175;
    } else {
      const feet = parseFloat(heightFeet) || 5;
      const inches = parseFloat(heightInches) || 9;
      return (feet * 12 + inches) * 2.54;
    }
  }, [unitSystem, heightCm, heightFeet, heightInches]);

  // Compile inputs
  const inputs: CreatineCalculatorInputs = useMemo(() => ({
    unitSystem,
    gender,
    age: parseInt(age) || 25,
    weightKg: canonicalWeightKg,
    heightCm: canonicalHeightCm,
    bodyFatPercent: showBodyFatInput ? parseFloat(bodyFatPercent) || null : null,
    activityLevel,
    goal,
    protocol,
  }), [
    unitSystem,
    gender,
    age,
    canonicalWeightKg,
    canonicalHeightCm,
    bodyFatPercent,
    showBodyFatInput,
    activityLevel,
    goal,
    protocol,
  ]);

  const result: CreatineMacroResult = useMemo(() => calculateCreatineAndMacros(inputs), [inputs]);

  const explanationSteps = useMemo(
    () => getCreatineExplanationSteps(inputs, result),
    [inputs, result]
  );

  // Preset loader
  const loadPreset = (preset: typeof CREATINE_PRESETS[0]) => {
    if (preset.inputs.unitSystem) setUnitSystem(preset.inputs.unitSystem);
    if (preset.inputs.gender) setGender(preset.inputs.gender);
    if (preset.inputs.age !== undefined) setAge(preset.inputs.age.toString());
    if (preset.inputs.weightKg !== undefined) {
      setWeightKg(preset.inputs.weightKg.toString());
      setWeightLbs(Math.round(preset.inputs.weightKg * 2.20462).toString());
    }
    if (preset.inputs.heightCm !== undefined) {
      setHeightCm(preset.inputs.heightCm.toString());
      const totalInches = Math.round(preset.inputs.heightCm / 2.54);
      setHeightFeet(Math.floor(totalInches / 12).toString());
      setHeightInches((totalInches % 12).toString());
    }
    if (preset.inputs.bodyFatPercent !== undefined && preset.inputs.bodyFatPercent !== null) {
      setBodyFatPercent(preset.inputs.bodyFatPercent.toString());
      setShowBodyFatInput(true);
    } else {
      setShowBodyFatInput(false);
    }
    if (preset.inputs.activityLevel) setActivityLevel(preset.inputs.activityLevel);
    if (preset.inputs.goal) setGoal(preset.inputs.goal);
    if (preset.inputs.protocol) setProtocol(preset.inputs.protocol);
  };

  // Reset
  const handleReset = () => {
    setUnitSystem("metric");
    setGender("male");
    setAge("26");
    setWeightKg("80");
    setHeightCm("180");
    setWeightLbs("176");
    setHeightFeet("5");
    setHeightInches("11");
    setBodyFatPercent("14");
    setShowBodyFatInput(false);
    setActivityLevel("moderate");
    setGoal("bulk_lean");
    setProtocol("loading_maintenance");
  };

  // Copy Plan to clipboard
  const handleCopySummary = async () => {
    const c = result.creatine;
    const m = result.macros;
    const summaryText = `
=== QuickCalc: Creatine & Fitness Nutrition Plan (2026) ===
Profile: ${gender === "male" ? "Male" : "Female"}, ${inputs.age} yrs | Weight: ${result.weightInKg}kg (${result.weightInLbs}lbs)
Fitness Goal: ${goal.replace("_", " ").toUpperCase()}
BMR: ${result.bmr} kcal/day | TDEE: ${result.tdee} kcal/day
Target Daily Calories: ${result.targetCalories} kcal/day (${result.calorieDeficitOrSurplus >= 0 ? `+${result.calorieDeficitOrSurplus}` : result.calorieDeficitOrSurplus} kcal)

-- CREATINE DOSING PROTOCOL (ISSN Guidelines) --
Strategy: ${c.protocol === "loading_maintenance" ? "Fast Saturation Loading Phase" : "Maintenance Only"}
Loading Phase (Days 1–7): ${c.protocol === "loading_maintenance" ? `${c.loadingDailyGrams}g/day (Take ${c.loadingServingsPerDay} doses of ${c.loadingDosePerServing}g spread throughout the day)` : "Skipped"}
Daily Maintenance Dose (Day 8+): ${c.maintenanceDailyGrams}g/day (Take daily, post-workout with carbs/protein)
Full Muscle Saturation Time: ~${c.daysToFullSaturation} days
Extra Daily Water Needed: +${c.suggestedWaterExtraMl} ml (+${c.suggestedWaterExtraOz} oz) to support cellular hydration

-- DAILY MACRONUTRIENT SPLIT --
Protein: ${m.proteinGrams}g (${m.proteinPercent}% / ${m.proteinCalories} kcal)
Carbohydrates: ${m.carbsGrams}g (${m.carbsPercent}% / ${m.carbsCalories} kcal)
Healthy Fats: ${m.fatsGrams}g (${m.fatsPercent}% / ${m.fatsCalories} kcal)

Calculated at: https://quickcalc.cloud/tools/creatine-calculator
`.trim();

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Share link
  const handleShareScenario = async () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + "/tools/creatine-calculator");
    url.searchParams.set("unit", unitSystem);
    url.searchParams.set("gender", gender);
    url.searchParams.set("age", age);
    url.searchParams.set("weight", canonicalWeightKg.toString());
    url.searchParams.set("height", canonicalHeightCm.toString());
    if (showBodyFatInput && bodyFatPercent) url.searchParams.set("bf", bodyFatPercent);
    url.searchParams.set("act", activityLevel);
    url.searchParams.set("goal", goal);
    url.searchParams.set("proto", protocol);

    try {
      await navigator.clipboard.writeText(url.toString());
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Download PDF Nutrition Sheet
  const handleDownloadPdf = async () => {
    setIsPdfGenerating(true);
    try {
      const c = result.creatine;
      const m = result.macros;
      await generatePdfAsync({
        toolName: "Creatine Dosage & Fitness Nutrition Sheet",
        toolSlug: "creatine-calculator",
        inputs: [
          { label: "Gender & Age", value: `${gender === "male" ? "Male" : "Female"}, ${inputs.age} years old` },
          { label: "Body Weight", value: `${result.weightInKg} kg (${result.weightInLbs} lbs)` },
          { label: "Activity Level", value: activityLevel.charAt(0).toUpperCase() + activityLevel.slice(1) },
          { label: "Primary Goal", value: goal.replace("_", " ").toUpperCase() },
          { label: "Creatine Strategy", value: protocol === "loading_maintenance" ? "Loading Phase + Maintenance" : "Maintenance Only" },
        ],
        results: [
          { label: "Daily Creatine Maintenance", value: `${c.maintenanceDailyGrams}g / day`, isHighlight: true },
          { label: "Target Daily Calories", value: `${result.targetCalories} kcal / day`, isHighlight: true },
          { label: "Daily Protein Target", value: `${m.proteinGrams}g (${m.proteinPercent}%)`, isHighlight: true },
          { label: "Daily Carbs Target", value: `${m.carbsGrams}g (${m.carbsPercent}%)` },
          { label: "Daily Fat Target", value: `${m.fatsGrams}g (${m.fatsPercent}%)` },
          { label: "Extra Daily Hydration", value: `+${c.suggestedWaterExtraMl} ml (+${c.suggestedWaterExtraOz} oz)` },
        ],
        summaryNote: `According to International Society of Sports Nutrition (ISSN) guidelines, your optimal daily creatine monohydrate maintenance dose is ${c.maintenanceDailyGrams}g/day. To maximize intramuscular phosphocreatine synthesis and exercise recovery, consume an additional +${c.suggestedWaterExtraMl}ml of water daily alongside your target ${result.targetCalories} kcal diet (${m.proteinGrams}g protein, ${m.carbsGrams}g carbs, ${m.fatsGrams}g fats).`,
        table: {
          title: "Intramuscular Creatine Saturation Schedule",
          headers: ["Phase", "Days", "Daily Dosage", "Timing / Administration"],
          rows: [
            [
              protocol === "loading_maintenance" ? "Loading Phase" : "Initial Phase",
              protocol === "loading_maintenance" ? "Days 1–7" : "Days 1–7",
              protocol === "loading_maintenance" ? `${c.loadingDailyGrams}g/day (4 × ${c.loadingDosePerServing}g)` : `${c.maintenanceDailyGrams}g/day`,
              protocol === "loading_maintenance" ? "Split evenly: Morning, Lunch, Pre-Workout, Post-Workout" : "Single dose daily with post-workout meal",
            ],
            [
              "Maintenance Phase",
              "Day 8+",
              `${c.maintenanceDailyGrams}g/day`,
              "Single daily dose taken consistently (post-workout with carbs/protein)",
            ],
            [
              "Full Muscle Saturation",
              `~Day ${c.daysToFullSaturation}`,
              "100% Intracellular Phosphocreatine Pool",
              "Increased power output, strength, and cellular recovery",
            ],
          ],
        },
      });
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Preset Scenarios Selector */}
      <div className="bg-zinc-100/80 dark:bg-zinc-900/60 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Fitness Goal Presets:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {CREATINE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => loadPreset(preset)}
                className="px-2.5 py-1.5 text-xs font-medium bg-white dark:bg-zinc-800/90 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-zinc-700 dark:text-zinc-300 hover:text-purple-600 dark:hover:text-purple-400 border border-zinc-200 dark:border-zinc-700/80 hover:border-purple-400 dark:hover:border-purple-500/50 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
                title={preset.description}
              >
                <span>{preset.name}</span>
              </button>
            ))}
            <button
              onClick={handleReset}
              className="p-1.5 text-xs font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg transition-colors ml-auto sm:ml-0"
              title="Reset all fields to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: 3 Input Control Cards (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Card 1: Body Metrics & Units */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    1. Body Metrics
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Gender, weight, height, and age
                  </p>
                </div>
              </div>

              {/* Unit Toggle */}
              <div className="bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setUnitSystem("metric")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    unitSystem === "metric"
                      ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Metric (kg)
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem("imperial")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    unitSystem === "imperial"
                      ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Imperial (lbs)
                </button>
              </div>
            </div>

            {/* Gender Toggle & Age */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Biological Gender
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      gender === "male"
                        ? "bg-purple-500/10 border-purple-500 text-purple-700 dark:text-purple-300 ring-1 ring-purple-500"
                        : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      gender === "female"
                        ? "bg-purple-500/10 border-purple-500 text-purple-700 dark:text-purple-300 ring-1 ring-purple-500"
                        : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Age (Years)
                </label>
                <input
                  type="number"
                  min="15"
                  max="90"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="26"
                />
              </div>
            </div>

            {/* Weight & Height Inputs */}
            {unitSystem === "metric" ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="80"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="180"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Weight (lbs)
                  </label>
                  <input
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="176"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Height (ft & in)
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="number"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      className="w-full px-2 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
                      placeholder="5 ft"
                    />
                    <input
                      type="number"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      className="w-full px-2 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
                      placeholder="11 in"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Optional Body Fat Toggle */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <span>Body Fat % (Katch-McArdle)</span>
                  <span className="text-[10px] text-zinc-400 font-normal">Optional</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowBodyFatInput(!showBodyFatInput)}
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  {showBodyFatInput ? "Disable" : "+ Add Body Fat %"}
                </button>
              </div>

              {showBodyFatInput && (
                <div className="mt-2 animate-fadeIn">
                  <div className="relative">
                    <input
                      type="number"
                      min="4"
                      max="55"
                      value={bodyFatPercent}
                      onChange={(e) => setBodyFatPercent(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="14"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Activity & Fitness Goals */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  2. Activity & Energy Goals
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Weekly training frequency & caloric objective
                </p>
              </div>
            </div>

            {/* Activity Level Selector */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Activity Level
              </label>
              <div className="relative">
                <select
                  value={activityLevel}
                  aria-label="Activity Level"
                  onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                  className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="sedentary">Sedentary (Office desk job, little/no exercise) [1.2x]</option>
                  <option value="light">Lightly Active (1–3 days/week exercise) [1.375x]</option>
                  <option value="moderate">Moderately Active (3–5 days/week training) [1.55x]</option>
                  <option value="heavy">Very Active (6–7 days/week intense training) [1.725x]</option>
                  <option value="athlete">Extra Active (Physical job + daily training) [1.9x]</option>
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Primary Fitness Goal */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Primary Goal
              </label>
              <div className="relative">
                <select
                  value={goal}
                  aria-label="Primary Goal"
                  onChange={(e) => setGoal(e.target.value as FitnessGoal)}
                  className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="cut_aggressive">Aggressive Fat Loss (-25% Calorie Deficit)</option>
                  <option value="cut_moderate">Moderate Weight Loss (-15% Calorie Deficit)</option>
                  <option value="maintenance">Weight Maintenance (0% Energy Balance)</option>
                  <option value="bulk_lean">Lean Muscle Bulk (+10% Clean Surplus)</option>
                  <option value="bulk_aggressive">Aggressive Muscle Building (+20% Surplus)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Card 3: Creatine Protocol Strategy */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  3. Creatine Saturation Protocol
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Select between fast loading vs gradual saturation
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setProtocol("loading_maintenance")}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  protocol === "loading_maintenance"
                    ? "bg-purple-500/10 border-purple-500 text-purple-900 dark:text-purple-200 font-bold ring-1 ring-purple-500"
                    : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>Fast Loading (7 Days)</span>
                  {protocol === "loading_maintenance" && <Check className="w-3.5 h-3.5 text-purple-600" />}
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                  ~20g/day in 4 doses for 7 days, then 5g/day maintenance. Max saturation in 1 week.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setProtocol("maintenance_only")}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  protocol === "maintenance_only"
                    ? "bg-purple-500/10 border-purple-500 text-purple-900 dark:text-purple-200 font-bold ring-1 ring-purple-500"
                    : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
                }`}
              >
                <div className="font-bold flex items-center justify-between">
                  <span>Maintenance Only (28 Days)</span>
                  {protocol === "maintenance_only" && <Check className="w-3.5 h-3.5 text-purple-600" />}
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                  3–5g/day from Day 1. Gentler on stomach, reaches full saturation in ~4 weeks.
                </p>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Calculated Nutrition & Creatine Results (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Primary 3-Metric Highlight Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Daily Creatine Dose (Purple / Indigo) */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-purple-500/15 via-purple-500/5 to-indigo-500/10 border-purple-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
                  Daily Creatine
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-800 dark:text-purple-300">
                  ~{result.creatine.daysToFullSaturation}d Saturation
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-purple-600 dark:text-purple-400">
                {result.creatine.maintenanceDailyGrams}g<span className="text-xs font-semibold text-zinc-500">/day</span>
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                {protocol === "loading_maintenance" ? `Loading: ${result.creatine.loadingDailyGrams}g/d` : "Steady intake"}
              </div>
            </div>

            {/* Target Daily Calories (Emerald / Cyan) */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-teal-500/10 border-emerald-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Target Energy
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  {result.calorieDeficitOrSurplus >= 0 ? `+${result.calorieDeficitOrSurplus}` : result.calorieDeficitOrSurplus} kcal
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
                {result.targetCalories.toLocaleString()}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                TDEE: {result.tdee.toLocaleString()} kcal
              </div>
            </div>

            {/* Additional Water Requirement (Cyan / Droplet) */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-sky-500/15 via-sky-500/5 to-cyan-500/10 border-sky-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
                  Extra Water
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-sky-500/20 text-sky-800 dark:text-sky-300">
                  Hydration
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-sky-600 dark:text-sky-400">
                +{result.creatine.suggestedWaterExtraMl}<span className="text-xs font-semibold text-zinc-500">ml</span>
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                ~{result.creatine.suggestedWaterExtraOz} oz extra daily
              </div>
            </div>
          </div>

          {/* Creatine Dosing Protocol Schedule Card */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-purple-200 dark:border-purple-900/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-purple-500" />
                <span>ISSN Protocol Dosing Schedule</span>
              </h3>
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                Full Saturation: ~{result.creatine.daysToFullSaturation} Days
              </span>
            </div>

            {protocol === "loading_maintenance" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 space-y-1.5">
                  <span className="font-extrabold text-purple-700 dark:text-purple-300 block">
                    Phase 1: Loading (Days 1–7)
                  </span>
                  <div className="text-lg font-black text-zinc-900 dark:text-white">
                    {result.creatine.loadingDailyGrams}g Total Daily
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Take <strong>4 doses of {result.creatine.loadingDosePerServing}g</strong> spread across the day (Breakfast, Lunch, Workout, Dinner) with water.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 space-y-1.5">
                  <span className="font-extrabold text-indigo-700 dark:text-indigo-300 block">
                    Phase 2: Maintenance (Day 8+)
                  </span>
                  <div className="text-lg font-black text-zinc-900 dark:text-white">
                    {result.creatine.maintenanceDailyGrams}g Single Daily Dose
                  </div>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    Take 1 single scoop ({result.creatine.maintenanceDailyGrams}g) daily at the same time, ideally post-workout with carbs/protein.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-purple-700 dark:text-purple-300">
                    Gradual Daily Protocol (Days 1–28)
                  </span>
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                    Gentle on Digestion
                  </span>
                </div>
                <div className="text-xl font-black text-zinc-900 dark:text-white">
                  {result.creatine.maintenanceDailyGrams}g Every Single Day
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Take a consistent dose of {result.creatine.maintenanceDailyGrams}g daily. While gradual, this method completely saturates muscle phosphocreatine stores by Day 28 with zero stomach discomfort.
                </p>
              </div>
            )}

            <div className="p-3 rounded-xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-800/40 text-[11px] text-sky-800 dark:text-sky-300 flex items-center gap-2 font-medium">
              <Droplets className="w-4 h-4 text-sky-500 flex-shrink-0" />
              <span>
                Drink an extra <strong>+{result.creatine.suggestedWaterExtraMl}ml (+{result.creatine.suggestedWaterExtraOz} oz)</strong> of water daily to draw fluid into muscle cells and prevent cramping.
              </span>
            </div>
          </div>

          {/* Daily Macronutrient Distribution Card */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                Daily Macronutrient Targets ({result.targetCalories} kcal)
              </h3>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {result.macros.proteinGrams}g Protein
              </span>
            </div>

            {/* Segmented Macro Bar */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex p-0.5 gap-0.5 shadow-inner">
                {/* Protein */}
                <div
                  style={{ width: `${result.macros.proteinPercent}%` }}
                  className="h-full bg-rose-500 rounded-l-full transition-all duration-300"
                  title={`Protein: ${result.macros.proteinGrams}g (${result.macros.proteinPercent}%)`}
                />
                {/* Carbs */}
                <div
                  style={{ width: `${result.macros.carbsPercent}%` }}
                  className="h-full bg-amber-500 transition-all duration-300"
                  title={`Carbs: ${result.macros.carbsGrams}g (${result.macros.carbsPercent}%)`}
                />
                {/* Fats */}
                <div
                  style={{ width: `${result.macros.fatsPercent}%` }}
                  className="h-full bg-indigo-500 rounded-r-full transition-all duration-300"
                  title={`Fats: ${result.macros.fatsGrams}g (${result.macros.fatsPercent}%)`}
                />
              </div>

              {/* Macro 3-Col Stats */}
              <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-800/40">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400">Protein</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
                    {result.macros.proteinGrams}g
                  </div>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                    {result.macros.proteinPercent}% ({result.macros.proteinCalories} kcal)
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">Carbs</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
                    {result.macros.carbsGrams}g
                  </div>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                    {result.macros.carbsPercent}% ({result.macros.carbsCalories} kcal)
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-800/40">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400">Fats</span>
                  </div>
                  <div className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
                    {result.macros.fatsGrams}g
                  </div>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block mt-0.5">
                    {result.macros.fatsPercent}% ({result.macros.fatsCalories} kcal)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={handleCopySummary}
              className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied Plan!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-500" />
                  <span>Copy Fitness Plan</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isPdfGenerating}
              className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
            >
              <Download className={`w-4 h-4 text-zinc-500 ${isPdfGenerating ? "animate-bounce" : ""}`} />
              <span>{isPdfGenerating ? "Generating..." : "Download PDF Plan"}</span>
            </button>

            <button
              type="button"
              onClick={handleShareScenario}
              className="py-2.5 px-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              {shareCopied ? (
                <>
                  <Check className="w-4 h-4 text-purple-500" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span>Share Plan Link</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Step-by-Step Mathematical Explanation */}
      <ExplainResultAccordion steps={explanationSteps} />
    </div>
  );
}
