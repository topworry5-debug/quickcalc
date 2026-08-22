"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  calculatePakistanElectricityBill,
  getPakistanElectricityExplanationSteps,
  ELECTRICITY_PRESETS,
  DISCO_INFO,
  PakistanElectricityInputs,
  PakistanElectricityResult,
  DiscoCompany,
  ConsumerCategory,
} from "@/lib/calculators/pakistanElectricityCalculator";
import { generatePdfAsync } from "@/lib/utils/downloadPdf";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import {
  RotateCcw,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  Building2,
  Receipt,
  Layers,
} from "lucide-react";

export default function PakistanElectricityCalculatorWidget() {
  // Main Inputs
  const [disco, setDisco] = useState<DiscoCompany>("LESCO");
  const [category, setCategory] = useState<ConsumerCategory>("protected");
  const [units, setUnits] = useState<string>("185");
  const [fpaRate, setFpaRate] = useState<string>("2.50");
  const [includeTvFee, setIncludeTvFee] = useState<boolean>(true);
  const [useCustomFixed, setUseCustomFixed] = useState<boolean>(false);
  const [customFixedCharges, setCustomFixedCharges] = useState<string>("0");

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  // Sync state from URL parameters on initial mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const qDisco = params.get("disco") as DiscoCompany | null;
      const qCat = params.get("cat") as ConsumerCategory | null;
      const qUnits = params.get("units");
      const qFpa = params.get("fpa");
      const qTv = params.get("tv");

      if (qDisco && Object.keys(DISCO_INFO).includes(qDisco)) setDisco(qDisco);
      if (qCat && ["protected", "unprotected"].includes(qCat)) setCategory(qCat);
      if (qUnits) setUnits(qUnits);
      if (qFpa) setFpaRate(qFpa);
      if (qTv !== null) setIncludeTvFee(qTv === "1");
    } catch {
      // ignore
    }
  }, []);

  const parsedUnits = useMemo(() => Math.max(1, Math.min(5000, parseInt(units) || 1)), [units]);
  const parsedFpaRate = useMemo(() => Math.max(0, parseFloat(fpaRate) || 0), [fpaRate]);
  const parsedCustomFixed = useMemo(() => (useCustomFixed ? parseFloat(customFixedCharges) || 0 : null), [useCustomFixed, customFixedCharges]);

  const inputs: PakistanElectricityInputs = useMemo(
    () => ({
      disco,
      category,
      units: parsedUnits,
      fpaRate: parsedFpaRate,
      includeTvFee,
      customFixedCharges: parsedCustomFixed,
    }),
    [disco, category, parsedUnits, parsedFpaRate, includeTvFee, parsedCustomFixed]
  );

  const result: PakistanElectricityResult = useMemo(
    () => calculatePakistanElectricityBill(inputs),
    [inputs]
  );

  const explanationSteps = useMemo(
    () => getPakistanElectricityExplanationSteps(inputs, result),
    [inputs, result]
  );

  // Preset loader
  const loadPreset = (preset: typeof ELECTRICITY_PRESETS[0]) => {
    if (preset.inputs.disco) setDisco(preset.inputs.disco);
    if (preset.inputs.category) setCategory(preset.inputs.category);
    if (preset.inputs.units !== undefined) setUnits(preset.inputs.units.toString());
    if (preset.inputs.fpaRate !== undefined) setFpaRate(preset.inputs.fpaRate.toString());
    if (preset.inputs.includeTvFee !== undefined) setIncludeTvFee(preset.inputs.includeTvFee);
    setUseCustomFixed(false);
  };

  // Reset
  const handleReset = () => {
    setDisco("LESCO");
    setCategory("protected");
    setUnits("185");
    setFpaRate("2.50");
    setIncludeTvFee(true);
    setUseCustomFixed(false);
    setCustomFixedCharges("0");
  };

  // Copy Bill Breakdown
  const handleCopySummary = async () => {
    const t = result.taxes;
    const summaryText = `
=== QuickCalc: Pakistan Electricity Bill Estimate (2026-2027) ===
DISCO: ${result.discoName} (${result.discoFullName})
Consumer Status: ${result.category === "protected" ? "Protected Domestic (≤200 Units Subsidized)" : "Unprotected Domestic"}
Total Units Consumed: ${result.units} kWh

-- FINANCIAL BREAKDOWN --
Base Energy Slab Cost: PKR ${result.baseCost.toLocaleString()}
Fixed Charges: PKR ${result.fixedCharges.toLocaleString()}
Fuel Price Adjustment (FPA @ Rs. ${inputs.fpaRate}/u): PKR ${t.fpaAmount.toLocaleString()}
Electricity Duty (ED 1.5%): PKR ${t.electricityDuty.toLocaleString()}
Financing Cost (FC Surcharge @ Rs. 3.23/u): PKR ${t.fcSurcharge.toLocaleString()}
General Sales Tax (GST 18%): PKR ${t.gstAmount.toLocaleString()}
PTV License Fee: PKR ${t.tvFee.toLocaleString()}

TOTAL PAYABLE BILL: PKR ${result.totalBill.toLocaleString()}
Effective Cost Per Unit: PKR ${result.effectiveRatePerUnit} / kWh

Calculated at: https://quickcalc.cloud/tools/pakistan-electricity-bill-calculator
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
    const url = new URL(window.location.origin + "/tools/pakistan-electricity-bill-calculator");
    url.searchParams.set("disco", disco);
    url.searchParams.set("cat", category);
    url.searchParams.set("units", parsedUnits.toString());
    url.searchParams.set("fpa", parsedFpaRate.toString());
    url.searchParams.set("tv", includeTvFee ? "1" : "0");

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
      const t = result.taxes;
      const rows = result.slabBreakdown.map((s) => [
        s.slabName,
        `${s.unitsInSlab} kWh`,
        `Rs. ${s.ratePerUnit.toFixed(2)}`,
        `PKR ${s.cost.toLocaleString()}`,
      ]);

      await generatePdfAsync({
        toolName: "Pakistan Electricity Bill Estimate (2026-2027)",
        toolSlug: "pakistan-electricity-bill-calculator",
        inputs: [
          { label: "Distribution Company (DISCO)", value: `${result.discoName} - ${result.discoFullName}` },
          { label: "Consumer Status", value: result.category === "protected" ? "Protected (≤200 Units Subsidized)" : "Unprotected Domestic" },
          { label: "Units Consumed", value: `${result.units} kWh` },
          { label: "Fuel Price Adjustment (FPA)", value: `Rs. ${inputs.fpaRate} / unit` },
          { label: "PTV License Fee", value: inputs.includeTvFee ? "PKR 35" : "Excluded" },
        ],
        results: [
          { label: "Total Estimated Payable Bill", value: `PKR ${result.totalBill.toLocaleString()}`, isHighlight: true },
          { label: "Effective Rate per Unit", value: `PKR ${result.effectiveRatePerUnit} / kWh`, isHighlight: true },
          { label: "Base Energy Slab Cost", value: `PKR ${result.baseCost.toLocaleString()}` },
          { label: "Fixed Charges", value: `PKR ${result.fixedCharges.toLocaleString()}` },
          { label: "General Sales Tax (GST 18%)", value: `PKR ${t.gstAmount.toLocaleString()}` },
          { label: "FPA Amount", value: `PKR ${t.fpaAmount.toLocaleString()}` },
          { label: "Financing Cost Surcharge", value: `PKR ${t.fcSurcharge.toLocaleString()}` },
          { label: "Electricity Duty (1.5%)", value: `PKR ${t.electricityDuty.toLocaleString()}` },
        ],
        summaryNote: `Official NEPRA domestic electricity tariff computation for ${result.units} units consumed under ${result.discoName}. For a ${result.category === "protected" ? "Protected" : "Unprotected"} domestic consumer, the base energy cost is PKR ${result.baseCost.toLocaleString()}, accompanied by PKR ${t.totalTaxesAndSurcharges.toLocaleString()} in government taxes (GST 18%, ED 1.5%), Fuel Price Adjustment (FPA), and Financing Cost surcharges, arriving at an estimated payable bill of PKR ${result.totalBill.toLocaleString()}.`,
        table: {
          title: "NEPRA Slab-wise Tariff Calculation",
          headers: ["Tariff Slab", "Units in Slab", "Rate / Unit", "Subtotal Cost"],
          rows,
        },
      });
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Compute percentage shares for visual breakdown bar
  const baseCostPercent = useMemo(() => Math.round((result.baseCost / result.totalBill) * 100) || 60, [result]);
  const taxesPercent = useMemo(
    () => Math.round(((result.taxes.gstAmount + result.taxes.electricityDuty) / result.totalBill) * 100) || 20,
    [result]
  );
  const surchargesPercent = useMemo(
    () => Math.max(0, 100 - baseCostPercent - taxesPercent),
    [baseCostPercent, taxesPercent]
  );

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Preset Scenarios Selector */}
      <div className="bg-zinc-100/80 dark:bg-zinc-900/60 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Load / Consumption Presets:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {ELECTRICITY_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => loadPreset(preset)}
                className="px-2.5 py-1.5 text-xs font-medium bg-white dark:bg-zinc-800/90 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-zinc-200 dark:border-zinc-700/80 hover:border-emerald-400 dark:hover:border-emerald-500/50 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
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
        
        {/* Left Column: 2 Input Control Cards (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Card 1: DISCO & Consumption Details */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  1. Electricity Company & Units
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Select your regional DISCO & meter units
                </p>
              </div>
            </div>

            {/* DISCO Selector */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Electricity Distribution Company (DISCO)
              </label>
              <div className="relative">
                <select
                  value={disco}
                  aria-label="Electricity Distribution Company"
                  onChange={(e) => setDisco(e.target.value as DiscoCompany)}
                  className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {Object.entries(DISCO_INFO).map(([key, info]) => (
                    <option key={key} value={key}>
                      {key} — {info.name} ({info.city})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Consumer Category: Protected vs Unprotected */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Consumer Status (NEPRA Category)
                </label>
                <span className="text-[10px] text-zinc-400">≤200 units for 6 months</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCategory("protected")}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    category === "protected"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Protected</span>
                    {category === "protected" && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Subsidized (Rs. 13.75 - Rs. 16.80)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory("unprotected")}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    category === "unprotected"
                      ? "bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-200 font-bold ring-1 ring-amber-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Unprotected</span>
                    {category === "unprotected" && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </div>
                  <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Standard (Rs. 24.50 - Rs. 51.50)
                  </p>
                </button>
              </div>

              {result.isCategoryForcedUnprotected && (
                <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>NEPRA Rule Notice:</strong> Consumption exceeds 200 units ({parsedUnits} units). The bill is automatically calculated using <strong>Unprotected slabs</strong>.
                  </span>
                </div>
              )}
            </div>

            {/* Total Units Consumed (Number & Slider) */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Total Monthly Units Consumed (kWh)
                </label>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="1"
                    max="3000"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                    className="w-20 px-2 py-1 text-right text-sm font-black bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg text-emerald-600 dark:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <span className="text-xs font-bold text-zinc-500">kWh</span>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="1000"
                step="5"
                value={parsedUnits}
                onChange={(e) => setUnits(e.target.value)}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div className="flex justify-between text-[10px] text-zinc-400 font-medium">
                <span>1 Unit</span>
                <span>200 Units (Protected Cap)</span>
                <span>500 Units</span>
                <span>1000+ Units</span>
              </div>
            </div>
          </div>

          {/* Card 2: Taxes, FPA & Surcharges Settings */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  2. Surcharges & Taxes Parameters
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Fuel adjustment, fixed charges & TV fee
                </p>
              </div>
            </div>

            {/* Fuel Price Adjustment (FPA) */}
            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-0.5">
                  FPA Rate (Rs./Unit)
                </label>
                <span className="text-[10px] text-zinc-400">Monthly fuel adjustment</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">Rs.</span>
                <input
                  type="number"
                  step="0.10"
                  min="0"
                  max="15"
                  value={fpaRate}
                  onChange={(e) => setFpaRate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-right"
                  placeholder="2.50"
                />
              </div>
            </div>

            {/* PTV Fee Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <div>
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">
                  PTV License Fee (Rs. 35)
                </span>
                <span className="text-[10px] text-zinc-400">Standard domestic TV surcharge</span>
              </div>
              <button
                type="button"
                onClick={() => setIncludeTvFee(!includeTvFee)}
                className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                  includeTvFee ? "bg-emerald-600" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform transform absolute top-1 ${
                    includeTvFee ? "right-1" : "left-1"
                  }`}
                />
              </button>
            </div>

            {/* Fixed Charges Override */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  Fixed Meter Charges
                </span>
                <button
                  type="button"
                  onClick={() => setUseCustomFixed(!useCustomFixed)}
                  className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  {useCustomFixed ? "Use Auto NEPRA Tier" : "+ Custom Amount"}
                </button>
              </div>

              {useCustomFixed ? (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">PKR</span>
                  <input
                    type="number"
                    value={customFixedCharges}
                    onChange={(e) => setCustomFixedCharges(e.target.value)}
                    className="w-full pl-11 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="200"
                  />
                </div>
              ) : (
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Auto-calculated based on slab: <strong>PKR {result.fixedCharges}</strong> ({result.units <= 300 ? "Rs. 0 for ≤300 units" : result.units <= 400 ? "Rs. 200 for 301–400" : result.units <= 500 ? "Rs. 400 for 401–500" : "Rs. 600 for 500+"}).
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Calculated Bill & Itemized Table (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Primary 3-Metric Highlight Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Total Estimated Bill */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-rose-500/15 via-rose-500/5 to-orange-500/10 border-rose-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                  Total Payable Bill
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-800 dark:text-rose-300">
                  {result.discoName}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-rose-600 dark:text-rose-400">
                PKR {result.totalBill.toLocaleString()}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium flex items-center gap-1.5">
                <span>Base Cost: PKR {result.baseCost.toLocaleString()}</span>
                <span>•</span>
                <span>Taxes: PKR {result.taxes.totalTaxesAndSurcharges.toLocaleString()}</span>
              </div>
            </div>

            {/* Effective Rate per Unit */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-teal-500/10 border-emerald-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Effective Rate
                </span>
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    result.category === "protected"
                      ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300"
                      : "bg-amber-500/20 text-amber-800 dark:text-amber-300"
                  }`}
                >
                  {result.category === "protected" ? "Protected" : "Unprotected"}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
                Rs. {result.effectiveRatePerUnit}
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Per kWh total load
              </div>
            </div>
          </div>

          {/* Visual Bill Breakdown Segment Bar */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-zinc-900 dark:text-white uppercase tracking-wider">
                Bill Component Allocation
              </span>
              <span className="text-zinc-500">{result.units} Units Total</span>
            </div>

            <div className="h-3.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex p-0.5 gap-0.5 shadow-inner">
              <div
                style={{ width: `${baseCostPercent}%` }}
                className="h-full bg-indigo-500 rounded-l-full transition-all duration-300"
                title={`Base Electricity Cost: PKR ${result.baseCost.toLocaleString()} (${baseCostPercent}%)`}
              />
              <div
                style={{ width: `${taxesPercent}%` }}
                className="h-full bg-amber-500 transition-all duration-300"
                title={`Govt Taxes (GST/ED): PKR ${(result.taxes.gstAmount + result.taxes.electricityDuty).toLocaleString()} (${taxesPercent}%)`}
              />
              <div
                style={{ width: `${surchargesPercent}%` }}
                className="h-full bg-rose-500 rounded-r-full transition-all duration-300"
                title={`Surcharges (FPA/FC/TV): PKR ${(result.taxes.fpaAmount + result.taxes.fcSurcharge + result.taxes.tvFee + result.fixedCharges).toLocaleString()} (${surchargesPercent}%)`}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
              <div className="flex items-center gap-1.5 text-indigo-700 dark:text-indigo-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                <span>Base: {baseCostPercent}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                <span>Taxes: {taxesPercent}%</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                <span>Surcharges: {surchargesPercent}%</span>
              </div>
            </div>
          </div>

          {/* Itemized NEPRA Slab & Tax Receipt Table */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden text-xs">
            <div className="p-4 bg-zinc-50/80 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>Itemized Bill Receipt Breakdown</span>
              </h3>
              <span className="text-[11px] text-zinc-500 font-medium">{result.discoName} 2026</span>
            </div>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {/* Slab details */}
              {result.slabBreakdown.map((slab, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-white">{slab.slabName}</span>
                    <span className="text-[10px] text-zinc-400 block">
                      {slab.unitsInSlab} units @ Rs. {slab.ratePerUnit.toFixed(2)}/unit
                    </span>
                  </div>
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">
                    PKR {slab.cost.toLocaleString()}
                  </span>
                </div>
              ))}

              {/* Fixed Charges */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <span className="font-semibold text-zinc-900 dark:text-white">Fixed Meter Charges</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  PKR {result.fixedCharges.toLocaleString()}
                </span>
              </div>

              {/* FPA */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">Fuel Price Adjustment (FPA)</span>
                  <span className="text-[10px] text-zinc-400 block">
                    {result.units} units @ Rs. {inputs.fpaRate}/unit
                  </span>
                </div>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  PKR {result.taxes.fpaAmount.toLocaleString()}
                </span>
              </div>

              {/* Financing Cost Surcharge */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">Financing Cost (FC) Surcharge</span>
                  <span className="text-[10px] text-zinc-400 block">
                    {result.units} units @ Rs. 3.23/unit
                  </span>
                </div>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  PKR {result.taxes.fcSurcharge.toLocaleString()}
                </span>
              </div>

              {/* Electricity Duty */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <span className="font-semibold text-zinc-900 dark:text-white">Electricity Duty (ED 1.5%)</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  PKR {result.taxes.electricityDuty.toLocaleString()}
                </span>
              </div>

              {/* GST 18% */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <span className="font-semibold text-zinc-900 dark:text-white">General Sales Tax (GST 18%)</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  PKR {result.taxes.gstAmount.toLocaleString()}
                </span>
              </div>

              {/* PTV Fee */}
              {inputs.includeTvFee && (
                <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-white">PTV License Fee</span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">PKR 35</span>
                </div>
              )}

              {/* Total Row */}
              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/80 flex items-center justify-between font-bold text-sm">
                <span className="text-zinc-900 dark:text-white">Estimated Payable Total</span>
                <span className="font-mono text-base font-black text-rose-600 dark:text-rose-400">
                  PKR {result.totalBill.toLocaleString()}
                </span>
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
                  <span className="text-emerald-600 dark:text-emerald-400">Copied Breakdown!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-500" />
                  <span>Copy Breakdown</span>
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
              <span>{isPdfGenerating ? "Generating..." : "Download PDF Bill"}</span>
            </button>

            <button
              type="button"
              onClick={handleShareScenario}
              className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              {shareCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Share Estimate</span>
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
