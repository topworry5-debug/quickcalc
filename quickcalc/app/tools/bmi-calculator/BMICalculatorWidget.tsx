"use client";

import { useState, useEffect } from "react";
import { calculateBMI, BMICalculatorResult } from "../../../lib/calculators/bmiCalculator";

export default function BMICalculatorWidget() {
  const [weight, setWeight] = useState<string>("70");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm");
  const [heightCm, setHeightCm] = useState<string>("175");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("9");

  const [result, setResult] = useState<BMICalculatorResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const weightNum = parseFloat(weight);
      const cmNum = parseFloat(heightCm);
      const ftNum = parseFloat(heightFt);
      const inNum = parseFloat(heightIn);

      if (
        isNaN(weightNum) ||
        weightNum <= 0 ||
        (heightUnit === "cm" && (isNaN(cmNum) || cmNum <= 0)) ||
        (heightUnit === "ft" && isNaN(ftNum) && isNaN(inNum)) ||
        (heightUnit === "ft" && ftNum <= 0 && inNum <= 0)
      ) {
        setResult(null);
        return;
      }

      const calcResult = calculateBMI({
        weight: weightNum,
        weightUnit,
        heightUnit,
        heightCm: cmNum,
        heightFt: ftNum,
        heightIn: inNum,
      });

      setResult(calcResult);
    }, 150); // Light debounce of 150ms to prevent jittery visual shifts as typing

    return () => clearTimeout(timer);
  }, [weight, weightUnit, heightUnit, heightCm, heightFt, heightIn]);

  const handleCopy = async () => {
    if (!result) return;
    const label = result.category === "Normal" ? "Normal weight" : result.category;
    const summary = `BMI: ${result.bmi} — ${label}`;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleExportTxt = () => {
    if (!result) return;
    const textContent = `QUICKCALC BMI REPORT
-------------------------
Weight: ${weight} ${weightUnit}
Height: ${heightUnit === "cm" ? `${heightCm} cm` : `${heightFt} ft ${heightIn} in`}
Calculated BMI: ${result.bmi}
Category: ${result.category}

LIMITATION WARNING:
BMI is a screening metric only and does not distinguish muscle mass from fat. It can misclassify athletic individuals, pregnant women, and children.

Calculated 100% free with zero sign-ins at QuickCalc (https://quickcalc.cloud)`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `QuickCalc-BMI-Report-${result.bmi}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white text-center">
        <h3 className="text-xl font-bold">Scientific BMI Calculator</h3>
        <p className="text-xs text-emerald-100 mt-1">
          Calculate BMI, visualize with clinical bands, and explore body mass insights instantly.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Toggle units at the top */}
        <div className="grid grid-cols-2 gap-4 bg-zinc-50 dark:bg-zinc-950 p-1.5 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
          <button
            type="button"
            onClick={() => {
              setHeightUnit("cm");
              setWeightUnit("kg");
            }}
            className={`py-2 px-3 rounded-lg font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${
              heightUnit === "cm"
                ? "bg-white dark:bg-zinc-800 text-teal-600 dark:text-teal-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            📏 Metric Units (cm, kg)
          </button>
          <button
            type="button"
            onClick={() => {
              setHeightUnit("ft");
              setWeightUnit("lb");
            }}
            className={`py-2 px-3 rounded-lg font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${
              heightUnit === "ft"
                ? "bg-white dark:bg-zinc-800 text-teal-600 dark:text-teal-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            📐 Imperial Units (ft/in, lb)
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Height input Section */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Height
            </label>
            {heightUnit === "cm" ? (
              <div className="flex rounded-lg shadow-sm">
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="block w-full rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="e.g. 175"
                  min="30"
                  max="300"
                  step="any"
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
                    className="block w-full rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-3 text-zinc-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="ft"
                    min="1"
                    max="10"
                    step="1"
                  />
                  <span className="flex items-center px-2 bg-zinc-50 dark:bg-zinc-800 border-y border-r border-zinc-300 dark:border-zinc-700 rounded-r-lg text-zinc-500 text-xs">
                    ft
                  </span>
                </div>
                <div className="flex rounded-lg shadow-sm">
                  <input
                    type="number"
                    value={heightIn}
                    onChange={(e) => setHeightIn(e.target.value)}
                    className="block w-full rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-3 text-zinc-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="in"
                    min="0"
                    max="11"
                    step="any"
                  />
                  <span className="flex items-center px-2 bg-zinc-50 dark:bg-zinc-800 border-y border-r border-zinc-300 dark:border-zinc-700 rounded-r-lg text-zinc-500 text-xs">
                    in
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Weight input Section */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Weight
            </label>
            <div className="flex rounded-lg shadow-sm">
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="block w-full rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="e.g. 70"
                min="1"
                max="1000"
                step="any"
              />
              <span className="flex items-center px-4 bg-zinc-50 dark:bg-zinc-800 border-y border-r border-zinc-300 dark:border-zinc-700 rounded-r-lg text-zinc-500 text-sm">
                {weightUnit}
              </span>
            </div>
          </div>
        </div>

        {/* Live Result Area */}
        {result ? (
          <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 p-6 rounded-xl space-y-6 transition-all">
            {/* Visual Header of Results */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-4 text-center sm:text-left">
                <span className="text-zinc-400 dark:text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
                  Your Calculated BMI
                </span>
                <span className="text-5xl font-extrabold text-zinc-900 dark:text-white block mt-1 tracking-tight">
                  {result.bmi}
                </span>
                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs font-bold rounded-full ${
                    result.category === "Underweight"
                      ? "bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300"
                      : result.category === "Normal"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300"
                      : result.category === "Overweight"
                      ? "bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300"
                      : "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-300"
                  }`}
                >
                  {result.category}
                </span>
              </div>

              {/* Dynamic Limitation Context right next to result */}
              <div className="sm:col-span-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed shadow-sm">
                <span className="font-bold text-zinc-800 dark:text-zinc-200 block mb-1">
                  ⚠️ Critical Interpretation Context:
                </span>
                {result.category === "Normal" && (
                  <p>
                    Your score is within the statistical healthy range. However, BMI is a basic ratio of weight to height and cannot differentiate between muscle mass and fat tissue. If you carry high muscle density or are pregnant, this baseline score may not represent your actual body composition accurately.
                  </p>
                )}
                {result.category === "Underweight" && (
                  <p>
                    An underweight rating can indicate nutritional deficiencies, high physical stress, or genetic baseline traits. Do not use BMI as a diagnosis. Lean tissue percentages, overall active metabolic rates, and individual health factors are key parameters this tool cannot evaluate.
                  </p>
                )}
                {result.category === "Overweight" && (
                  <p>
                    An overweight classification {"doesn't"} necessarily equate to high body fat. Athletes and weightlifters with extensive muscle tissue frequently register in this band because muscle is substantially denser than fat. Consider body fat percentage or waist-to-height ratio for a complete picture.
                  </p>
                )}
                {result.category === "Obese" && (
                  <p>
                    The obese category suggests elevated physiological strain risk, but it does not detail body composition or health status. Highly active individuals with large structures may sit in this band safely. Consult a professional physician to measure actual visceral fat and metabolic panels.
                  </p>
                )}
              </div>
            </div>

            {/* Horizontal Gauge Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-2xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-1">
                <span>Underweight</span>
                <span>Normal Range</span>
                <span>Overweight</span>
                <span>Obese</span>
              </div>
              <div className="relative h-6 w-full rounded-lg bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex shadow-inner">
                <div className="w-[25%] bg-sky-500 h-full opacity-85 transition-all"></div>
                <div className="w-[25%] bg-emerald-500 h-full opacity-85 transition-all"></div>
                <div className="w-[25%] bg-amber-500 h-full opacity-85 transition-all"></div>
                <div className="w-[25%] bg-rose-500 h-full opacity-85 transition-all"></div>

                {/* Sliding indicator handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-zinc-950 dark:bg-white shadow-[0_0_8px_rgba(0,0,0,0.5)] transition-all duration-300 flex items-center justify-center"
                  style={{ left: `${result.percent}%` }}
                >
                  <div className="absolute -top-1 -bottom-1 w-3 rounded-full bg-zinc-950 dark:bg-white border border-zinc-200 dark:border-zinc-800"></div>
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400 font-medium px-1">
                <span>{"< 18.5"}</span>
                <span>18.5 – 24.9</span>
                <span>25 – 29.9</span>
                <span>30.0+</span>
              </div>
            </div>

            {/* Actions & Sharing buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 rounded-lg hover:shadow-sm focus:ring-1 focus:ring-teal-500 focus:outline-none"
              >
                {copied ? "✅ Copied Summary!" : "📋 Copy Result Summary"}
              </button>

              <button
                type="button"
                onClick={handleExportTxt}
                className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors bg-teal-50 dark:bg-teal-950/20 px-3.5 py-2 rounded-lg hover:shadow-sm focus:ring-1 focus:ring-teal-500 focus:outline-none"
              >
                📥 Export Report (.txt)
              </button>
            </div>
          </div>
        ) : (
          <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/10 p-8 rounded-xl text-center space-y-2">
            <span className="text-3xl">⚖️</span>
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Enter your height and weight to see your BMI
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
              We update the calculation in real-time as you type. Your private data is never sent to any server.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
