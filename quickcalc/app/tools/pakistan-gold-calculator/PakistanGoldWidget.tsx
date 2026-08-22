"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  calculatePakistanGold,
  getPakistanGoldExplanationSteps,
  GOLD_PRESETS,
  KARAT_DETAILS,
  GoldCalculatorInputs,
  GoldCalculatorResult,
  GoldKarat,
  WeightMode,
  MakingChargeType,
  WastageType,
} from "@/lib/calculators/pakistanGoldCalculator";
import { generatePdfAsync } from "@/lib/utils/downloadPdf";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import {
  RotateCcw,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  Coins,
  Receipt,
  Layers,
  ChevronDown,
  Scale,
} from "lucide-react";

export default function PakistanGoldWidget() {
  // Inputs
  const [rate24KPerTola, setRate24KPerTola] = useState<string>("285000");
  const [karat, setKarat] = useState<GoldKarat>(22);
  const [weightMode, setWeightMode] = useState<WeightMode>("traditional");
  const [tola, setTola] = useState<string>("1");
  const [masha, setMasha] = useState<string>("0");
  const [ratti, setRatti] = useState<string>("0");
  const [grams, setGrams] = useState<string>("11.66");
  const [makingChargeType, setMakingChargeType] = useState<MakingChargeType>("per_tola");
  const [makingChargeValue, setMakingChargeValue] = useState<string>("6000");
  const [wastageType, setWastageType] = useState<WastageType>("ratti_per_tola");
  const [wastageValue, setWastageValue] = useState<string>("0");

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  // Sync with URL query params
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const qRate = params.get("rate");
      const qKarat = params.get("k");
      const qMode = params.get("mode") as WeightMode | null;
      const qTola = params.get("t");
      const qMasha = params.get("m");
      const qRatti = params.get("r");
      const qGrams = params.get("g");
      const qMakingType = params.get("mtype") as MakingChargeType | null;
      const qMakingVal = params.get("mval");

      if (qRate) setRate24KPerTola(qRate);
      if (qKarat && [24, 22, 21, 18].includes(parseInt(qKarat))) setKarat(parseInt(qKarat) as GoldKarat);
      if (qMode && ["traditional", "grams"].includes(qMode)) setWeightMode(qMode);
      if (qTola) setTola(qTola);
      if (qMasha) setMasha(qMasha);
      if (qRatti) setRatti(qRatti);
      if (qGrams) setGrams(qGrams);
      if (qMakingType) setMakingChargeType(qMakingType);
      if (qMakingVal) setMakingChargeValue(qMakingVal);
    } catch {
      // ignore
    }
  }, []);

  const parsedRate24K = useMemo(() => Math.max(1000, parseFloat(rate24KPerTola) || 285000), [rate24KPerTola]);
  const parsedTola = useMemo(() => Math.max(0, parseFloat(tola) || 0), [tola]);
  const parsedMasha = useMemo(() => Math.max(0, parseFloat(masha) || 0), [masha]);
  const parsedRatti = useMemo(() => Math.max(0, parseFloat(ratti) || 0), [ratti]);
  const parsedGrams = useMemo(() => Math.max(0, parseFloat(grams) || 0), [grams]);
  const parsedMakingVal = useMemo(() => Math.max(0, parseFloat(makingChargeValue) || 0), [makingChargeValue]);
  const parsedWastageVal = useMemo(() => Math.max(0, parseFloat(wastageValue) || 0), [wastageValue]);

  const inputs: GoldCalculatorInputs = useMemo(
    () => ({
      rate24KPerTola: parsedRate24K,
      karat,
      weightMode,
      tola: parsedTola,
      masha: parsedMasha,
      ratti: parsedRatti,
      grams: parsedGrams,
      makingChargeType,
      makingChargeValue: parsedMakingVal,
      wastageType,
      wastageValue: parsedWastageVal,
    }),
    [parsedRate24K, karat, weightMode, parsedTola, parsedMasha, parsedRatti, parsedGrams, makingChargeType, parsedMakingVal, wastageType, parsedWastageVal]
  );

  const result: GoldCalculatorResult = useMemo(
    () => calculatePakistanGold(inputs),
    [inputs]
  );

  const explanationSteps = useMemo(
    () => getPakistanGoldExplanationSteps(inputs, result),
    [inputs, result]
  );

  // Load Preset
  const loadPreset = (preset: typeof GOLD_PRESETS[0]) => {
    if (preset.inputs.rate24KPerTola !== undefined) setRate24KPerTola(preset.inputs.rate24KPerTola.toString());
    if (preset.inputs.karat) setKarat(preset.inputs.karat);
    if (preset.inputs.weightMode) setWeightMode(preset.inputs.weightMode);
    if (preset.inputs.tola !== undefined) setTola(preset.inputs.tola.toString());
    if (preset.inputs.masha !== undefined) setMasha(preset.inputs.masha.toString());
    if (preset.inputs.ratti !== undefined) setRatti(preset.inputs.ratti.toString());
    if (preset.inputs.grams !== undefined) setGrams(preset.inputs.grams.toString());
    if (preset.inputs.makingChargeType) setMakingChargeType(preset.inputs.makingChargeType);
    if (preset.inputs.makingChargeValue !== undefined) setMakingChargeValue(preset.inputs.makingChargeValue.toString());
    if (preset.inputs.wastageType) setWastageType(preset.inputs.wastageType);
    if (preset.inputs.wastageValue !== undefined) setWastageValue(preset.inputs.wastageValue.toString());
  };

  // Reset
  const handleReset = () => {
    setRate24KPerTola("285000");
    setKarat(22);
    setWeightMode("traditional");
    setTola("1");
    setMasha("0");
    setRatti("0");
    setGrams("11.66");
    setMakingChargeType("per_tola");
    setMakingChargeValue("6000");
    setWastageType("ratti_per_tola");
    setWastageValue("0");
  };

  // Copy Receipt Summary
  const handleCopyReceipt = async () => {
    const w = result.weights;
    const p = result.pricing;
    const summaryText = `
=== QuickCalc: Pakistan Gold Jewelry Quotation (2026) ===
Gold Purity: ${result.karatLabel} (${result.purityPercentage}%)
24K Bullion Rate: PKR ${p.rate24KPerTola.toLocaleString()} / Tola
${result.karat}K Gold Rate: PKR ${p.purityRatePerTola.toLocaleString()} / Tola (PKR ${p.ratePerGram.toLocaleString()} / Gram)

-- WEIGHT BREAKDOWN --
• Total Weight in Tolas: ${w.totalTolas} Tolas
• Traditional Units: ${w.tolaInt} Tola, ${w.mashaInt} Masha, ${w.rattiDecimal} Ratti
• Total Weight in Grams: ${w.totalGrams} g (${w.totalOunces} oz)

-- PRICE BREAKDOWN --
• Raw Pure Gold Cost: PKR ${p.baseGoldCost.toLocaleString()}
• Wastage / Cut (Kass): PKR ${p.wastageCost.toLocaleString()} (${p.wastageTolas} Tola)
• Making Charges (Jorai): PKR ${p.makingChargesTotal.toLocaleString()}
>> NET TOTAL PAYABLE PRICE: PKR ${p.netTotalPrice.toLocaleString()}
>> All-Inclusive Effective Rate: PKR ${p.effectivePricePerTola.toLocaleString()}/Tola | PKR ${p.effectivePricePerGram.toLocaleString()}/Gram

Calculated at: https://quickcalc.cloud/tools/pakistan-gold-calculator
`.trim();

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Share Quotation Link
  const handleShareQuotation = async () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + "/tools/pakistan-gold-calculator");
    url.searchParams.set("rate", parsedRate24K.toString());
    url.searchParams.set("k", karat.toString());
    url.searchParams.set("mode", weightMode);
    if (weightMode === "traditional") {
      url.searchParams.set("t", parsedTola.toString());
      url.searchParams.set("m", parsedMasha.toString());
      url.searchParams.set("r", parsedRatti.toString());
    } else {
      url.searchParams.set("g", parsedGrams.toString());
    }
    url.searchParams.set("mtype", makingChargeType);
    url.searchParams.set("mval", parsedMakingVal.toString());

    try {
      await navigator.clipboard.writeText(url.toString());
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Download PDF Estimate
  const handleDownloadPdf = async () => {
    setIsPdfGenerating(true);
    try {
      const w = result.weights;
      const p = result.pricing;
      const rows = [
        ["24K Bullion Market Rate", "1 Tola (11.6638g)", `PKR ${p.rate24KPerTola.toLocaleString()}`],
        [`${result.karat}K Gold Rate`, `${result.purityPercentage}% Purity`, `PKR ${p.purityRatePerTola.toLocaleString()} / Tola`],
        ["Base Pure Gold Cost", `${w.totalTolas} Tolas (${w.totalGrams}g)`, `PKR ${p.baseGoldCost.toLocaleString()}`],
        ["Wastage / Cut (Kass)", `${p.wastageTolas} Tolas`, `PKR ${p.wastageCost.toLocaleString()}`],
        ["Making Charges (Jorai)", `${makingChargeType === "per_tola" ? `PKR ${parsedMakingVal.toLocaleString()}/Tola` : makingChargeType === "percentage" ? `${parsedMakingVal}%` : "Lump-sum"}`, `PKR ${p.makingChargesTotal.toLocaleString()}`],
      ];

      await generatePdfAsync({
        toolName: "Pakistan Gold Jewelry Quotation (2026)",
        toolSlug: "pakistan-gold-calculator",
        inputs: [
          { label: "Selected Gold Purity", value: result.karatLabel },
          { label: "24K Rate per Tola", value: `PKR ${p.rate24KPerTola.toLocaleString()}` },
          { label: "Weight (Tola / Masha / Ratti)", value: `${w.tolaInt} Tola, ${w.mashaInt} Masha, ${w.rattiDecimal} Ratti` },
          { label: "Weight in Grams", value: `${w.totalGrams} Grams (${w.totalTolas} Tolas)` },
          { label: "Making Charge Type", value: makingChargeType === "per_tola" ? "Per Tola" : makingChargeType === "percentage" ? "Percentage" : "Lump-Sum" },
        ],
        results: [
          { label: "Net Total Payable Price", value: `PKR ${p.netTotalPrice.toLocaleString()}`, isHighlight: true },
          { label: "Base Pure Gold Cost", value: `PKR ${p.baseGoldCost.toLocaleString()}` },
          { label: "Total Making Charges (Jorai)", value: `PKR ${p.makingChargesTotal.toLocaleString()}` },
          { label: "Wastage Cost (Kass)", value: `PKR ${p.wastageCost.toLocaleString()}` },
          { label: "Effective Rate per Gram", value: `PKR ${p.effectivePricePerGram.toLocaleString()}` },
          { label: "Effective Rate per Tola", value: `PKR ${p.effectivePricePerTola.toLocaleString()}` },
        ],
        summaryNote: `Official Sarafa market gold calculation. For a ${result.karatLabel} jewelry item weighing ${w.totalTolas} Tolas (${w.totalGrams} grams), pure gold value is PKR ${p.baseGoldCost.toLocaleString()}, plus PKR ${p.makingChargesTotal.toLocaleString()} in making charges, totaling PKR ${p.netTotalPrice.toLocaleString()}.`,
        table: {
          title: "Itemized Gold Quotation Breakdown",
          headers: ["Item Description", "Unit / Metric", "Amount (PKR)"],
          rows,
        },
      });
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Percentage shares for visual bar
  const totalCost = result.pricing.netTotalPrice || 1;
  const goldPct = Math.round((result.pricing.baseGoldCost / totalCost) * 100);
  const makingPct = Math.round((result.pricing.makingChargesTotal / totalCost) * 100);
  const wastagePct = Math.max(0, 100 - goldPct - makingPct);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Jewelry Scenario Presets */}
      <div className="bg-zinc-100/80 dark:bg-zinc-900/60 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Popular Jewelry Presets:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {GOLD_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => loadPreset(preset)}
                className="px-2.5 py-1.5 text-xs font-medium bg-white dark:bg-zinc-800/90 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-700/80 hover:border-amber-400 dark:hover:border-amber-500/50 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
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

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: 3 Input Cards (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Card 1: Market Rate & Purity Selection */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  1. Sarafa Market Rate & Karat
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Current 24K bullion benchmark & jewelry purity
                </p>
              </div>
            </div>

            {/* 24K Rate per Tola Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Current 24K Gold Rate per Tola (PKR)
                </label>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                  PKR {parsedRate24K.toLocaleString()}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">PKR</span>
                <input
                  type="number"
                  step="500"
                  min="1000"
                  value={rate24KPerTola}
                  onChange={(e) => setRate24KPerTola(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="285000"
                />
              </div>
            </div>

            {/* Purity Karat Tabs */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Select Jewelry Karat / Purity
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {([22, 24, 21, 18] as GoldKarat[]).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKarat(k)}
                    className={`p-2 rounded-xl border text-center text-xs transition-all ${
                      karat === k
                        ? "bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-200 font-bold ring-1 ring-amber-500"
                        : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    <div className="font-bold">{k}K</div>
                    <span className="text-[10px] text-zinc-500 block">{KARAT_DETAILS[k].purityPercent}%</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Karat Rate Notice */}
              <div className="mt-2.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
                <span>{karat}K Purity Rate:</span>
                <span className="font-bold">PKR {result.pricing.purityRatePerTola.toLocaleString()} / Tola (PKR {result.pricing.ratePerGram.toLocaleString()}/g)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Weight Entry Mode */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    2. Gold Weight Entry
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Traditional Tola/Masha/Ratti or Grams
                  </p>
                </div>
              </div>

              {/* Weight Mode Switcher */}
              <div className="flex p-0.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setWeightMode("traditional")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    weightMode === "traditional"
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-bold"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  Tola Mode
                </button>
                <button
                  type="button"
                  onClick={() => setWeightMode("grams")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    weightMode === "grams"
                      ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-bold"
                      : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
                >
                  Grams Mode
                </button>
              </div>
            </div>

            {weightMode === "traditional" ? (
              <div className="grid grid-cols-3 gap-3">
                {/* Tola */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Tola (تولہ)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    step="1"
                    value={tola}
                    onChange={(e) => setTola(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center"
                    placeholder="1"
                  />
                  <span className="text-[10px] text-zinc-400 block text-center mt-0.5">1 Tola = 11.66g</span>
                </div>

                {/* Masha */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Masha (ماشہ)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="11"
                    step="1"
                    value={masha}
                    onChange={(e) => setMasha(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center"
                    placeholder="0"
                  />
                  <span className="text-[10px] text-zinc-400 block text-center mt-0.5">12 M = 1 Tola</span>
                </div>

                {/* Ratti */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Ratti (رتی)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="7.9"
                    step="0.5"
                    value={ratti}
                    onChange={(e) => setRatti(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-center"
                    placeholder="0"
                  />
                  <span className="text-[10px] text-zinc-400 block text-center mt-0.5">8 R = 1 Masha</span>
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Total Weight in Grams (g)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={grams}
                    onChange={(e) => setGrams(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="11.66"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">Grams</span>
                </div>
              </div>
            )}

            {/* Live Simultaneous Weight Matrix */}
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 grid grid-cols-3 text-center gap-2 text-xs">
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Total Tolas</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">{result.weights.totalTolas} T</span>
              </div>
              <div className="border-x border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] text-zinc-400 block uppercase">Total Grams</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{result.weights.totalGrams} g</span>
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Troy Ounces</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">{result.weights.totalOunces} oz</span>
              </div>
            </div>
          </div>

          {/* Card 3: Making Charges (Jorai) & Wastage (Kass) */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  3. Making Charges (Jorai) & Wastage (Kass)
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Goldsmith labor and melting loss adjustments
                </p>
              </div>
            </div>

            {/* Making Charges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Making Charges Type (جڑائی)
                </label>
                <div className="relative">
                  <select
                    value={makingChargeType}
                    aria-label="Making Charges Type"
                    onChange={(e) => setMakingChargeType(e.target.value as MakingChargeType)}
                    className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
                  >
                    <option value="per_tola">Fixed PKR per Tola</option>
                    <option value="percentage">% of Gold Value</option>
                    <option value="lump_sum">Lump-Sum Total (PKR)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  {makingChargeType === "per_tola" ? "Rate per Tola (PKR)" : makingChargeType === "percentage" ? "Making Percentage (%)" : "Lump Sum Amount (PKR)"}
                </label>
                <input
                  type="number"
                  min="0"
                  step={makingChargeType === "percentage" ? "0.5" : "500"}
                  value={makingChargeValue}
                  onChange={(e) => setMakingChargeValue(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="6000"
                />
              </div>
            </div>

            {/* Wastage / Cut (Kass) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Wastage / Cut Type (کاس)
                </label>
                <div className="relative">
                  <select
                    value={wastageType}
                    aria-label="Wastage Type"
                    onChange={(e) => setWastageType(e.target.value as WastageType)}
                    className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer"
                  >
                    <option value="ratti_per_tola">Ratti per Tola (0 - 4 R)</option>
                    <option value="percentage">% Wastage Added</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  {wastageType === "ratti_per_tola" ? "Ratti per Tola" : "Wastage %"}
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={wastageValue}
                  onChange={(e) => setWastageValue(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Results & Itemized Receipt (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Primary 3-Metric Highlight Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Net Total Price */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-yellow-500/10 border-amber-500/40 text-zinc-900 dark:text-zinc-100 shadow-xs sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Net Total Jewelry Price
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-900 dark:text-amber-300">
                  {result.karat}K Gold
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-amber-600 dark:text-amber-400">
                PKR {result.pricing.netTotalPrice.toLocaleString()}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Effective: <strong>PKR {result.pricing.effectivePricePerGram.toLocaleString()} / g</strong> (PKR {result.pricing.effectivePricePerTola.toLocaleString()}/Tola)
              </div>
            </div>

            {/* Total Making Charges */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-violet-500/15 via-violet-500/5 to-purple-500/10 border-violet-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-violet-700 dark:text-violet-400 block mb-1">
                Making Charges (جڑائی)
              </span>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-violet-600 dark:text-violet-400">
                PKR {result.pricing.makingChargesTotal.toLocaleString()}
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Pure Gold: PKR {result.pricing.baseGoldCost.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Visual Component Bar */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-zinc-900 dark:text-white uppercase tracking-wider">
                Price Breakdown Allocation
              </span>
              <span className="text-zinc-500">Weight: {result.weights.totalGrams}g</span>
            </div>

            <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${goldPct}%` }}
                className="h-full bg-amber-500 transition-all"
                title={`Raw Gold: ${goldPct}%`}
              />
              <div
                style={{ width: `${makingPct}%` }}
                className="h-full bg-violet-500 transition-all"
                title={`Making Charges: ${makingPct}%`}
              />
              <div
                style={{ width: `${wastagePct}%` }}
                className="h-full bg-rose-500 transition-all"
                title={`Wastage / Cut: ${wastagePct}%`}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Pure Gold ({goldPct}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
                <span>Making ({makingPct}%)</span>
              </div>
              {result.pricing.wastageCost > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Wastage ({wastagePct}%)</span>
                </div>
              )}
            </div>
          </div>

          {/* Itemized Sarafa Quotation Receipt Table */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden text-xs">
            <div className="p-4 bg-zinc-50/80 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Sarafa Market Quotation Receipt</span>
              </h3>
              <span className="text-[11px] text-zinc-500 font-medium">Standard Standard</span>
            </div>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {/* 24K Rate Benchmark */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">24K Bullion Market Benchmark</span>
                  <span className="text-[10px] text-zinc-400 block">Fine pure gold rate per tola</span>
                </div>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  PKR {result.pricing.rate24KPerTola.toLocaleString()}
                </span>
              </div>

              {/* Karat Rate */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">{result.karat}K Gold Rate ({result.purityPercentage}%)</span>
                  <span className="text-[10px] text-zinc-400 block">PKR {result.pricing.ratePerGram.toLocaleString()} / Gram</span>
                </div>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                  PKR {result.pricing.purityRatePerTola.toLocaleString()} / Tola
                </span>
              </div>

              {/* Total Net Weight */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">Total Item Weight</span>
                  <span className="text-[10px] text-zinc-400 block">
                    {result.weights.tolaInt} Tola, {result.weights.mashaInt} Masha, {result.weights.rattiDecimal} Ratti
                  </span>
                </div>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {result.weights.totalGrams} g ({result.weights.totalTolas} Tola)
                </span>
              </div>

              {/* Raw Pure Gold Cost */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">Base Pure Gold Cost</span>
                  <span className="text-[10px] text-zinc-400 block">{result.weights.totalTolas} Tola × PKR {result.pricing.purityRatePerTola.toLocaleString()}</span>
                </div>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  PKR {result.pricing.baseGoldCost.toLocaleString()}
                </span>
              </div>

              {/* Wastage / Cut (Kass) */}
              {result.pricing.wastageCost > 0 && (
                <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-white">Wastage / Cut (Kass کاس)</span>
                    <span className="text-[10px] text-zinc-400 block">+{result.pricing.wastageTolas} Tolas</span>
                  </div>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    +PKR {result.pricing.wastageCost.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Making Charges */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">Making Charges (Jorai جڑائی)</span>
                  <span className="text-[10px] text-zinc-400 block">
                    {makingChargeType === "per_tola" ? `PKR ${parsedMakingVal.toLocaleString()}/Tola` : makingChargeType === "percentage" ? `${parsedMakingVal}% of gold value` : "Lump sum"}
                  </span>
                </div>
                <span className="font-mono font-bold text-violet-600 dark:text-violet-400">
                  +PKR {result.pricing.makingChargesTotal.toLocaleString()}
                </span>
              </div>

              {/* Grand Total */}
              <div className="p-3.5 bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-between font-bold text-sm">
                <span className="text-zinc-900 dark:text-white">Net Final Price</span>
                <span className="font-mono text-base font-black text-amber-600 dark:text-amber-400">
                  PKR {result.pricing.netTotalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={handleCopyReceipt}
              className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied Receipt!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-500" />
                  <span>Copy Receipt</span>
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
              <span>{isPdfGenerating ? "Generating..." : "Download PDF Quote"}</span>
            </button>

            <button
              type="button"
              onClick={handleShareQuotation}
              className="py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              {shareCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Share Quotation</span>
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
