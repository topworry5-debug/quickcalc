"use client";

import { useState } from "react";
import { calculateWaterIntake, WaterIntakeResult } from "../../../lib/calculators/waterIntake";

export default function WaterIntakeCalculatorWidget() {
  const [weight, setWeight] = useState<string>("70");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [activityLevel, setActivityLevel] = useState<"sedentary" | "moderate" | "active">("moderate");
  const [climate, setClimate] = useState<"normal" | "hot">("normal");
  const [result, setResult] = useState<WaterIntakeResult | null>({
    liters: 2.95,
    glasses: 11.8,
  }); // Default calculation for 70kg, moderate, normal climate

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      alert("Please enter a valid weight greater than 0.");
      return;
    }
    const calculation = calculateWaterIntake({
      weight: weightNum,
      weightUnit,
      activityLevel,
      climate,
    });
    setResult(calculation);
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8">
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 p-6 text-white text-center">
        <h3 className="text-xl font-bold">Personalized Hydration Calculator</h3>
        <p className="text-xs text-sky-100 mt-1">Get your recommended daily water target in seconds</p>
      </div>

      <form onSubmit={handleCalculate} className="p-6 space-y-6">
        {/* Weight input */}
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Your Body Weight
          </label>
          <div className="flex rounded-lg shadow-sm">
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="block w-full rounded-l-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="e.g. 70"
              required
              min="1"
              max="1000"
              step="any"
            />
            <button
              type="button"
              onClick={() => setWeightUnit("kg")}
              className={`px-4 py-3 border-y border-zinc-300 dark:border-zinc-700 font-medium text-sm transition-colors ${
                weightUnit === "kg"
                  ? "bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                  : "bg-zinc-50 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-100"
              }`}
            >
              kg
            </button>
            <button
              type="button"
              onClick={() => setWeightUnit("lb")}
              className={`px-4 py-3 border-r border-y rounded-r-lg border-zinc-300 dark:border-zinc-700 font-medium text-sm transition-colors ${
                weightUnit === "lb"
                  ? "bg-blue-50 border-blue-500 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                  : "bg-zinc-50 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-100"
              }`}
            >
              lb
            </button>
          </div>
        </div>

        {/* Activity Level and Climate */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="activityLevel" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Daily Activity Level
            </label>
            <select
              id="activityLevel"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as "sedentary" | "moderate" | "active")}
              className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="sedentary">Sedentary (Little to no exercise)</option>
              <option value="moderate">Moderate (Light exercise/sports)</option>
              <option value="active">Active (Heavy workout/physical job)</option>
            </select>
          </div>

          <div>
            <label htmlFor="climate" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Local Climate
            </label>
            <select
              id="climate"
              value={climate}
              onChange={(e) => setClimate(e.target.value as "normal" | "hot")}
              className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="normal">Normal (Cool/Temperate)</option>
              <option value="hot">Hot (Warm/Humid/Summer)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white font-semibold py-3.5 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
        >
          Calculate My Water Intake
        </button>
      </form>

      {/* Result UI */}
      {result && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-sky-50/50 dark:bg-sky-950/10 p-6 text-center animate-fade-in">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium uppercase tracking-wider">
            Your Recommended Daily Intake
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4 divide-x divide-zinc-200 dark:divide-zinc-800">
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400">
                {result.liters}
              </span>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-1">Liters / day</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-sky-500 dark:text-sky-400">
                {result.glasses}
              </span>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-1">Glasses (250ml)</span>
            </div>
          </div>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-4 italic">
            *This estimation is a guideline. Factors like pregnancy, nursing, overall health, and illness can alter your personal requirement.
          </p>
        </div>
      )}
    </div>
  );
}
