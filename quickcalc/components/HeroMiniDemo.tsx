"use client";

import React, { useState } from "react";
import { Percent, Scale, Sparkles } from "lucide-react";
import AnimatedNumber from "@/components/AnimatedNumber";

export default function HeroMiniDemo() {
  const [activeTab, setActiveTab] = useState<"tip" | "bmi">("tip");

  // Tip State
  const [billAmount, setBillAmount] = useState<number>(100);
  const [tipPercent, setTipPercent] = useState<number>(15);

  // BMI State
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);

  // Tip Calculations
  const tipAmount = (billAmount * tipPercent) / 100;
  const totalAmount = billAmount + tipAmount;

  // BMI Calculations
  const heightMeters = heightCm / 100;
  const bmiNumber = heightMeters > 0 ? weightKg / (heightMeters * heightMeters) : 0;

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20" };
    if (bmi < 25) return { label: "Normal Weight", color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
    if (bmi < 30) return { label: "Overweight", color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20" };
    return { label: "Obese", color: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20" };
  };

  const bmiCategory = getBmiCategory(bmiNumber);

  return (
    <div className="w-full bg-base-card border border-surface-border rounded-2xl p-4 sm:p-5 shadow-lg shadow-black/5 motion-reduce:transition-none transition-all duration-200">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-surface-border">
        <div className="flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
          <Sparkles size={14} className="animate-pulse motion-reduce:animate-none" />
          <span>Try Mini Tool</span>
        </div>
        <div className="flex bg-surface-muted p-1 rounded-xl gap-1">
          <button
            onClick={() => setActiveTab("tip")}
            className={`min-h-[36px] px-3 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 active:scale-95 ${
              activeTab === "tip"
                ? "bg-base-card text-ink shadow-sm"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            <Percent size={13} />
            <span>Tip & %</span>
          </button>
          <button
            onClick={() => setActiveTab("bmi")}
            className={`min-h-[36px] px-3 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 active:scale-95 ${
              activeTab === "bmi"
                ? "bg-base-card text-ink shadow-sm"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            <Scale size={13} />
            <span>Quick BMI</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Tip & Percentage Mini Calc */}
      {activeTab === "tip" && (
        <div className="space-y-3.5">
          <div>
            <div className="flex justify-between items-center text-xs mb-1.5">
              <label htmlFor="bill-amount-input" className="text-ink-muted font-medium">Bill Amount ($)</label>
              <span className="font-numeric font-bold text-ink">${billAmount}</span>
            </div>
            <div className="flex gap-2">
              {[50, 100, 200, 350].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setBillAmount(preset)}
                  className={`flex-1 min-h-[40px] py-1.5 text-xs font-semibold rounded-lg border transition-all active:scale-95 ${
                    billAmount === preset
                      ? "bg-teal-500/10 border-teal-500/30 text-teal-600 dark:text-teal-400"
                      : "bg-surface-muted/50 border-surface-border text-ink-muted hover:text-ink"
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <label htmlFor="tip-percent-slider" className="text-ink-muted font-medium">Tip Percentage</label>
              <span className="font-numeric font-bold text-teal-600 dark:text-teal-400">{tipPercent}%</span>
            </div>
            <input
              id="tip-percent-slider"
              type="range"
              min="5"
              max="35"
              step="1"
              value={tipPercent}
              onChange={(e) => setTipPercent(Number(e.target.value))}
              aria-label="Tip Percentage"
              className="w-full h-2 bg-surface-muted rounded-lg appearance-none cursor-pointer accent-teal-600 dark:accent-teal-400 min-h-[44px]"
            />
          </div>

          {/* Live Result Display with Animated Numbers */}
          <div className="p-3 bg-surface-muted/70 rounded-xl border border-surface-border flex items-center justify-between">
            <div>
              <span className="text-[11px] text-ink-muted font-medium block">Total with Tip</span>
              <span className="font-numeric text-xl sm:text-2xl font-bold text-ink leading-tight">
                $<AnimatedNumber value={totalAmount} format={(n) => n.toFixed(2)} />
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-ink-muted font-medium block">Tip Amount</span>
              <span className="font-numeric text-base sm:text-lg font-bold text-teal-600 dark:text-teal-400">
                +$<AnimatedNumber value={tipAmount} format={(n) => n.toFixed(2)} />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Quick BMI Screener */}
      {activeTab === "bmi" && (
        <div className="space-y-3.5">
          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <label htmlFor="height-cm-slider" className="text-ink-muted font-medium">Height (cm)</label>
              <span className="font-numeric font-bold text-ink">{heightCm} cm</span>
            </div>
            <input
              id="height-cm-slider"
              type="range"
              min="130"
              max="210"
              value={heightCm}
              onChange={(e) => setHeightCm(Number(e.target.value))}
              aria-label="Height in centimeters"
              className="w-full h-2 bg-surface-muted rounded-lg appearance-none cursor-pointer accent-teal-600 dark:accent-teal-400 min-h-[44px]"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs mb-1">
              <label htmlFor="weight-kg-slider" className="text-ink-muted font-medium">Weight (kg)</label>
              <span className="font-numeric font-bold text-ink">{weightKg} kg</span>
            </div>
            <input
              id="weight-kg-slider"
              type="range"
              min="40"
              max="140"
              value={weightKg}
              onChange={(e) => setWeightKg(Number(e.target.value))}
              aria-label="Weight in kilograms"
              className="w-full h-2 bg-surface-muted rounded-lg appearance-none cursor-pointer accent-teal-600 dark:accent-teal-400 min-h-[44px]"
            />
          </div>

          {/* Live Result Display with Animated Numbers */}
          <div className="p-3 bg-surface-muted/70 rounded-xl border border-surface-border flex items-center justify-between">
            <div>
              <span className="text-[11px] text-ink-muted font-medium block">Calculated BMI</span>
              <span className="font-numeric text-xl sm:text-2xl font-bold text-ink leading-tight">
                <AnimatedNumber value={bmiNumber} format={(n) => n.toFixed(1)} />
              </span>
            </div>
            <div className="text-right">
              <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-lg border ${bmiCategory.color}`}>
                {bmiCategory.label}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
