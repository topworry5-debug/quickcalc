"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  calculatePakistanFuelMileage,
  getPakistanFuelExplanationSteps,
  FUEL_PRESETS,
  FuelMileageInputs,
  FuelMileageBreakdown,
  DistanceMode,
  FuelType,
} from "@/lib/calculators/pakistanFuelMileageCalculator";
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
  Fuel,
  Sun,
  TrendingDown,
  Clock,
  Layers,
} from "lucide-react";

export default function PakistanFuelCostWidget() {
  // Inputs
  const [distanceMode, setDistanceMode] = useState<DistanceMode>("daily");
  const [distanceKm, setDistanceKm] = useState<string>("35");
  const [petrolPrice, setPetrolPrice] = useState<string>("275");
  const [dieselPrice, setDieselPrice] = useState<string>("280");
  const [gridElectricityRate, setGridElectricityRate] = useState<string>("45");
  const [hasSolarCharging, setHasSolarCharging] = useState<boolean>(false);
  const [primaryFuelType, setPrimaryFuelType] = useState<FuelType>("petrol");

  // Vehicle Specifications
  const [petrolMileageKml, setPetrolMileageKml] = useState<string>("12");
  const [hybridMileageKml, setHybridMileageKml] = useState<string>("22");
  const [evEfficiencyKmKwh, setEvEfficiencyKmKwh] = useState<string>("6.5");

  // Optional Purchase Prices for Payback
  const [petrolCarPriceLacs, setPetrolCarPriceLacs] = useState<string>("65");
  const [hybridCarPriceLacs, setHybridCarPriceLacs] = useState<string>("85");
  const [evCarPriceLacs, setEvCarPriceLacs] = useState<string>("95");

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  // Sync with URL params
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const qMode = params.get("mode") as DistanceMode | null;
      const qDist = params.get("dist");
      const qPetrol = params.get("petrol");
      const qGrid = params.get("grid");
      const qSolar = params.get("solar");
      const qPm = params.get("pm");
      const qHm = params.get("hm");
      const qEv = params.get("ev");
      const qPPrice = params.get("pprice");
      const qHPrice = params.get("hprice");
      const qEPrice = params.get("eprice");

      if (qMode && ["daily", "monthly", "trip"].includes(qMode)) setDistanceMode(qMode);
      if (qDist) setDistanceKm(qDist);
      if (qPetrol) setPetrolPrice(qPetrol);
      if (qGrid) setGridElectricityRate(qGrid);
      if (qSolar !== null) setHasSolarCharging(qSolar === "true");
      if (qPm) setPetrolMileageKml(qPm);
      if (qHm) setHybridMileageKml(qHm);
      if (qEv) setEvEfficiencyKmKwh(qEv);
      if (qPPrice) setPetrolCarPriceLacs(qPPrice);
      if (qHPrice) setHybridCarPriceLacs(qHPrice);
      if (qEPrice) setEvCarPriceLacs(qEPrice);
    } catch {
      // ignore
    }
  }, []);

  const parsedDist = useMemo(() => Math.max(1, parseFloat(distanceKm) || 35), [distanceKm]);
  const parsedPetrol = useMemo(() => Math.max(50, parseFloat(petrolPrice) || 275), [petrolPrice]);
  const parsedDiesel = useMemo(() => Math.max(50, parseFloat(dieselPrice) || 280), [dieselPrice]);
  const parsedGrid = useMemo(() => Math.max(0, parseFloat(gridElectricityRate) || 45), [gridElectricityRate]);
  const parsedPm = useMemo(() => Math.max(2, parseFloat(petrolMileageKml) || 12), [petrolMileageKml]);
  const parsedHm = useMemo(() => Math.max(2, parseFloat(hybridMileageKml) || 22), [hybridMileageKml]);
  const parsedEv = useMemo(() => Math.max(1, parseFloat(evEfficiencyKmKwh) || 6.5), [evEfficiencyKmKwh]);

  const parsedPPrice = useMemo(() => (petrolCarPriceLacs ? parseFloat(petrolCarPriceLacs) : undefined), [petrolCarPriceLacs]);
  const parsedHPrice = useMemo(() => (hybridCarPriceLacs ? parseFloat(hybridCarPriceLacs) : undefined), [hybridCarPriceLacs]);
  const parsedEPrice = useMemo(() => (evCarPriceLacs ? parseFloat(evCarPriceLacs) : undefined), [evCarPriceLacs]);

  const inputs: FuelMileageInputs = useMemo(
    () => ({
      distanceMode,
      distanceKm: parsedDist,
      petrolPrice: parsedPetrol,
      dieselPrice: parsedDiesel,
      gridElectricityRate: parsedGrid,
      hasSolarCharging,
      primaryFuelType,
      petrolMileageKml: parsedPm,
      hybridMileageKml: parsedHm,
      evEfficiencyKmKwh: parsedEv,
      petrolCarPriceLacs: parsedPPrice,
      hybridCarPriceLacs: parsedHPrice,
      evCarPriceLacs: parsedEPrice,
    }),
    [
      distanceMode,
      parsedDist,
      parsedPetrol,
      parsedDiesel,
      parsedGrid,
      hasSolarCharging,
      primaryFuelType,
      parsedPm,
      parsedHm,
      parsedEv,
      parsedPPrice,
      parsedHPrice,
      parsedEPrice,
    ]
  );

  const result: FuelMileageBreakdown = useMemo(
    () => calculatePakistanFuelMileage(inputs),
    [inputs]
  );

  const explanationSteps = useMemo(
    () => getPakistanFuelExplanationSteps(inputs, result),
    [inputs, result]
  );

  // Preset loader
  const loadPreset = (preset: typeof FUEL_PRESETS[0]) => {
    if (preset.inputs.distanceMode) setDistanceMode(preset.inputs.distanceMode);
    if (preset.inputs.distanceKm !== undefined) setDistanceKm(preset.inputs.distanceKm.toString());
    if (preset.inputs.petrolPrice !== undefined) setPetrolPrice(preset.inputs.petrolPrice.toString());
    if (preset.inputs.gridElectricityRate !== undefined) setGridElectricityRate(preset.inputs.gridElectricityRate.toString());
    if (preset.inputs.hasSolarCharging !== undefined) setHasSolarCharging(preset.inputs.hasSolarCharging);
    if (preset.inputs.primaryFuelType) setPrimaryFuelType(preset.inputs.primaryFuelType);
    if (preset.inputs.petrolMileageKml !== undefined) setPetrolMileageKml(preset.inputs.petrolMileageKml.toString());
    if (preset.inputs.hybridMileageKml !== undefined) setHybridMileageKml(preset.inputs.hybridMileageKml.toString());
    if (preset.inputs.evEfficiencyKmKwh !== undefined) setEvEfficiencyKmKwh(preset.inputs.evEfficiencyKmKwh.toString());
    if (preset.inputs.petrolCarPriceLacs !== undefined) setPetrolCarPriceLacs(preset.inputs.petrolCarPriceLacs.toString());
    if (preset.inputs.hybridCarPriceLacs !== undefined) setHybridCarPriceLacs(preset.inputs.hybridCarPriceLacs.toString());
    if (preset.inputs.evCarPriceLacs !== undefined) setEvCarPriceLacs(preset.inputs.evCarPriceLacs.toString());
  };

  // Reset
  const handleReset = () => {
    setDistanceMode("daily");
    setDistanceKm("35");
    setPetrolPrice("275");
    setDieselPrice("280");
    setGridElectricityRate("45");
    setHasSolarCharging(false);
    setPrimaryFuelType("petrol");
    setPetrolMileageKml("12");
    setHybridMileageKml("22");
    setEvEfficiencyKmKwh("6.5");
    setPetrolCarPriceLacs("65");
    setHybridCarPriceLacs("85");
    setEvCarPriceLacs("95");
  };

  // Copy Breakdown
  const handleCopyBreakdown = async () => {
    const summaryText = `
=== QuickCalc: Pakistan Fuel Cost Comparison (Petrol vs Hybrid vs EV) ===
Driving Distance: ${parsedDist} km (${distanceMode.toUpperCase()}) | Monthly: ${result.monthlyDistanceKm.toLocaleString()} km
Petrol Price: PKR ${parsedPetrol}/L | Grid Electricity: PKR ${parsedGrid}/kWh ${hasSolarCharging ? "(Solar Enabled)" : ""}

-- RUNNING COST PER KILOMETER --
• Petrol / Diesel Car (${parsedPm} km/L): PKR ${result.petrolCostPerKm.toFixed(2)} / km
• Hybrid HEV Car (${parsedHm} km/L): PKR ${result.hybridCostPerKm.toFixed(2)} / km (-${result.hybridPercentSavings}%)
• Electric Car EV (${parsedEv} km/kWh): PKR ${result.evCostPerKm.toFixed(2)} / km (-${result.evPercentSavings}%)

-- MONTHLY & ANNUAL RUNNING BILLS --
• Petrol Car Monthly: PKR ${result.petrolCostMonthly.toLocaleString()} | Annual: PKR ${result.petrolCostAnnual.toLocaleString()}
• Hybrid Car Monthly: PKR ${result.hybridCostMonthly.toLocaleString()} | Annual: PKR ${result.hybridCostAnnual.toLocaleString()} (Saves PKR ${result.hybridAnnualSavings.toLocaleString()}/yr)
• EV Car Monthly: PKR ${result.evCostMonthly.toLocaleString()} | Annual: PKR ${result.evCostAnnual.toLocaleString()} (Saves PKR ${result.evAnnualSavings.toLocaleString()}/yr)

${result.evPaybackYears ? `>> EV Payback Duration: ~${result.evPaybackYears} Years (${result.evPaybackMonths} Months)\n` : ""}
Calculated at: https://quickcalc.cloud/tools/pakistan-fuel-cost-calculator
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
    const url = new URL(window.location.origin + "/tools/pakistan-fuel-cost-calculator");
    url.searchParams.set("mode", distanceMode);
    url.searchParams.set("dist", parsedDist.toString());
    url.searchParams.set("petrol", parsedPetrol.toString());
    url.searchParams.set("grid", parsedGrid.toString());
    url.searchParams.set("solar", hasSolarCharging.toString());
    url.searchParams.set("pm", parsedPm.toString());
    url.searchParams.set("hm", parsedHm.toString());
    url.searchParams.set("ev", parsedEv.toString());
    if (petrolCarPriceLacs) url.searchParams.set("pprice", petrolCarPriceLacs);
    if (hybridCarPriceLacs) url.searchParams.set("hprice", hybridCarPriceLacs);
    if (evCarPriceLacs) url.searchParams.set("eprice", evCarPriceLacs);

    try {
      await navigator.clipboard.writeText(url.toString());
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Download PDF Report
  const handleDownloadPdf = async () => {
    setIsPdfGenerating(true);
    try {
      const rows = [
        ["Petrol Car", `${parsedPm} km/L`, `PKR ${result.petrolCostPerKm.toFixed(2)}`, `PKR ${result.petrolCostMonthly.toLocaleString()}`, `PKR ${result.petrolCostAnnual.toLocaleString()}`],
        ["Hybrid HEV", `${parsedHm} km/L`, `PKR ${result.hybridCostPerKm.toFixed(2)}`, `PKR ${result.hybridCostMonthly.toLocaleString()}`, `PKR ${result.hybridCostAnnual.toLocaleString()}`],
        ["Electric EV", `${parsedEv} km/kWh`, `PKR ${result.evCostPerKm.toFixed(2)}`, `PKR ${result.evCostMonthly.toLocaleString()}`, `PKR ${result.evCostAnnual.toLocaleString()}`],
      ];

      await generatePdfAsync({
        toolName: "Pakistan Fuel & Mileage Cost Report (2026)",
        toolSlug: "pakistan-fuel-cost-calculator",
        inputs: [
          { label: "Driving Distance", value: `${parsedDist} km (${distanceMode.toUpperCase()})` },
          { label: "Monthly Distance", value: `${result.monthlyDistanceKm.toLocaleString()} km` },
          { label: "Petrol Price", value: `PKR ${parsedPetrol} / Liter` },
          { label: "Grid Electricity", value: `PKR ${parsedGrid} / kWh` },
          { label: "Solar Charging", value: hasSolarCharging ? "Active (PKR 0/kWh)" : "Grid Powered" },
        ],
        results: [
          { label: "EV Running Cost", value: `PKR ${result.evCostPerKm.toFixed(2)} / km`, isHighlight: true },
          { label: "Hybrid Running Cost", value: `PKR ${result.hybridCostPerKm.toFixed(2)} / km` },
          { label: "Petrol Running Cost", value: `PKR ${result.petrolCostPerKm.toFixed(2)} / km` },
          { label: "Annual EV Fuel Savings", value: `PKR ${result.evAnnualSavings.toLocaleString()} / year` },
          { label: "Annual Hybrid Fuel Savings", value: `PKR ${result.hybridAnnualSavings.toLocaleString()} / year` },
        ],
        summaryNote: `Based on driving ${result.monthlyDistanceKm.toLocaleString()} km monthly, switching to a Hybrid saves PKR ${result.hybridAnnualSavings.toLocaleString()} per year, while an EV saves PKR ${result.evAnnualSavings.toLocaleString()} annually in fuel expenses.${result.evPaybackYears ? ` The EV price premium is paid back in ~${result.evPaybackYears} years.` : ""}`,
        table: {
          title: "Side-by-Side Powertrain Cost Comparison",
          headers: ["Vehicle Powertrain", "Efficiency", "Cost / KM", "Monthly Expense", "Annual Expense"],
          rows,
        },
      });
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Max for visual comparison bar
  const maxMonthly = Math.max(1, result.petrolCostMonthly, result.hybridCostMonthly, result.evCostMonthly);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Automotive Presets */}
      <div className="bg-zinc-100/80 dark:bg-zinc-900/60 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Popular Driving Scenarios:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {FUEL_PRESETS.map((preset) => (
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

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Inputs (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Card 1: Driving Distance & Energy Rates */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Fuel className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  1. Driving Distance & Energy Rates
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Commute mileage, petrol price & electricity tariff
                </p>
              </div>
            </div>

            {/* Commute Distance Mode Tabs */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Distance Frequency Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDistanceMode("daily");
                    if (parsedDist > 200) setDistanceKm("35");
                  }}
                  className={`p-2 rounded-xl border text-center text-xs transition-all ${
                    distanceMode === "daily"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Daily (km/day)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDistanceMode("monthly");
                    if (parsedDist < 200) setDistanceKm("1050");
                  }}
                  className={`p-2 rounded-xl border text-center text-xs transition-all ${
                    distanceMode === "monthly"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Monthly (km/mo)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDistanceMode("trip");
                    if (parsedDist < 50) setDistanceKm("380");
                  }}
                  className={`p-2 rounded-xl border text-center text-xs transition-all ${
                    distanceMode === "trip"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Single Trip (km)
                </button>
              </div>
            </div>

            {/* Distance Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  {distanceMode === "daily" ? "Daily Commute Distance (km)" : distanceMode === "monthly" ? "Total Monthly Distance (km)" : "Single Trip Distance (km)"}
                </label>
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  {parsedDist.toLocaleString()} km
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="50000"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="35"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">km</span>
              </div>
            </div>

            {/* Fuel Prices & Electricity Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Petrol Price (PKR / Liter)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">PKR</span>
                  <input
                    type="number"
                    min="100"
                    max="600"
                    value={petrolPrice}
                    onChange={(e) => setPetrolPrice(e.target.value)}
                    className="w-full pl-12 pr-3 py-2.5 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="275"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Electricity Rate (PKR / kWh)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">PKR</span>
                  <input
                    type="number"
                    min="0"
                    max="150"
                    disabled={hasSolarCharging}
                    value={hasSolarCharging ? "0" : gridElectricityRate}
                    onChange={(e) => setGridElectricityRate(e.target.value)}
                    className="w-full pl-12 pr-3 py-2.5 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60"
                    placeholder="45"
                  />
                </div>
              </div>
            </div>

            {/* Home Solar Charging Toggle */}
            <label className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 cursor-pointer">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <div>
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-200 block">
                    Home Rooftop Solar Charging
                  </span>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400">
                    Sets EV electricity cost to PKR 0 / unit (100% Free Charging)
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={hasSolarCharging}
                onChange={(e) => setHasSolarCharging(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
              />
            </label>
          </div>

          {/* Card 2: Vehicle Fuel Efficiencies */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  2. Vehicle Mileage & Efficiencies
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Petrol vs. Hybrid (HEV) vs. Electric Vehicle (EV)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Petrol Mileage */}
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Petrol Car
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="3"
                    max="35"
                    step="0.5"
                    value={petrolMileageKml}
                    onChange={(e) => setPetrolMileageKml(e.target.value)}
                    className="w-full px-2.5 py-2 text-sm font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="12"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-400">km/L</span>
                </div>
                <span className="text-[10px] text-zinc-500 mt-1 block">City: 10–14 km/L</span>
              </div>

              {/* Hybrid Mileage */}
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <label className="block text-xs font-bold text-cyan-700 dark:text-cyan-400 mb-1">
                  Hybrid (HEV)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="5"
                    max="45"
                    step="0.5"
                    value={hybridMileageKml}
                    onChange={(e) => setHybridMileageKml(e.target.value)}
                    className="w-full px-2.5 py-2 text-sm font-bold bg-white dark:bg-zinc-900 border border-cyan-300 dark:border-cyan-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="22"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-400">km/L</span>
                </div>
                <span className="text-[10px] text-zinc-500 mt-1 block">City: 20–25 km/L</span>
              </div>

              {/* EV Efficiency */}
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <label className="block text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                  Electric (EV)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="15"
                    step="0.1"
                    value={evEfficiencyKmKwh}
                    onChange={(e) => setEvEfficiencyKmKwh(e.target.value)}
                    className="w-full px-2.5 py-2 text-sm font-bold bg-white dark:bg-zinc-900 border border-emerald-300 dark:border-emerald-700 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="6.5"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-400">km/u</span>
                </div>
                <span className="text-[10px] text-zinc-500 mt-1 block">City: 6–8 km/kWh</span>
              </div>
            </div>
          </div>

          {/* Card 3: Optional Purchase Price Comparison (Payback Period) */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    3. Vehicle Purchase Prices (Payback)
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Optional: Calculate ROI payback duration in years
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Petrol Car Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={petrolCarPriceLacs}
                    onChange={(e) => setPetrolCarPriceLacs(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="65"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-400">Lacs</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Hybrid Car Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={hybridCarPriceLacs}
                    onChange={(e) => setHybridCarPriceLacs(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="85"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-400">Lacs</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  EV Car Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="10"
                    max="1000"
                    value={evCarPriceLacs}
                    onChange={(e) => setEvCarPriceLacs(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="95"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-zinc-400">Lacs</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Comparative Results & Charts (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Primary 3-Metric Highlight Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* EV Running Cost */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-teal-500/10 border-emerald-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Electric (EV)
                </span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  Lowest Cost
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
                PKR {result.evCostPerKm.toFixed(2)}
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 font-semibold">
                per km ({result.evPercentSavings}% cheaper)
              </div>
            </div>

            {/* Hybrid Running Cost */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-cyan-500/15 via-cyan-500/5 to-blue-500/10 border-cyan-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 block mb-1">
                Hybrid (HEV)
              </span>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-cyan-600 dark:text-cyan-400">
                PKR {result.hybridCostPerKm.toFixed(2)}
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 font-semibold">
                per km ({result.hybridPercentSavings}% cheaper)
              </div>
            </div>

            {/* Petrol Running Cost */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-rose-500/10 border-amber-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block mb-1">
                Petrol / ICE
              </span>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-amber-600 dark:text-amber-400">
                PKR {result.petrolCostPerKm.toFixed(2)}
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 font-semibold">
                per km (Standard)
              </div>
            </div>
          </div>

          {/* Visual Side-by-Side Monthly Expense Comparison Bar */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                <TrendingDown className="w-4 h-4 text-emerald-500" />
                <span>Monthly Fuel Bill Comparison ({result.monthlyDistanceKm.toLocaleString()} km)</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Petrol Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">Petrol Car (12 km/L)</span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">PKR {result.petrolCostMonthly.toLocaleString()} / mo</span>
                </div>
                <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500"
                    style={{ width: `${(result.petrolCostMonthly / maxMonthly) * 100}%` }}
                  />
                </div>
              </div>

              {/* Hybrid Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">Hybrid HEV (22 km/L)</span>
                  <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    PKR {result.hybridCostMonthly.toLocaleString()} / mo <span className="text-[10px] text-emerald-500 font-normal">(-PKR {result.hybridMonthlySavings.toLocaleString()})</span>
                  </span>
                </div>
                <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${(result.hybridCostMonthly / maxMonthly) * 100}%` }}
                  />
                </div>
              </div>

              {/* EV Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">Electric Vehicle EV (6.5 km/kWh)</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    PKR {result.evCostMonthly.toLocaleString()} / mo <span className="text-[10px] text-emerald-500 font-normal">(-PKR {result.evMonthlySavings.toLocaleString()})</span>
                  </span>
                </div>
                <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(4, (result.evCostMonthly / maxMonthly) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Comparison Table */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden text-xs">
            <div className="p-4 bg-zinc-50/80 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>Powertrain Financial Projections</span>
              </h3>
              <span className="text-[11px] text-zinc-500 font-medium">Annual: {result.annualDistanceKm.toLocaleString()} km</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-100/60 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 text-[11px] font-semibold border-b border-zinc-200 dark:border-zinc-800">
                    <th className="p-3">Powertrain</th>
                    <th className="p-3">Cost / KM</th>
                    <th className="p-3">Monthly Bill</th>
                    <th className="p-3">Annual Expense</th>
                    <th className="p-3">Annual Savings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80 text-zinc-700 dark:text-zinc-300">
                  <tr>
                    <td className="p-3 font-bold text-zinc-900 dark:text-white">Petrol Car</td>
                    <td className="p-3 font-mono">PKR {result.petrolCostPerKm.toFixed(2)}</td>
                    <td className="p-3 font-mono">PKR {result.petrolCostMonthly.toLocaleString()}</td>
                    <td className="p-3 font-mono">PKR {result.petrolCostAnnual.toLocaleString()}</td>
                    <td className="p-3 font-mono text-zinc-400">—</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-600 dark:text-cyan-400">Hybrid (HEV)</td>
                    <td className="p-3 font-mono">PKR {result.hybridCostPerKm.toFixed(2)}</td>
                    <td className="p-3 font-mono">PKR {result.hybridCostMonthly.toLocaleString()}</td>
                    <td className="p-3 font-mono">PKR {result.hybridCostAnnual.toLocaleString()}</td>
                    <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      +PKR {result.hybridAnnualSavings.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-emerald-50/40 dark:bg-emerald-950/20">
                    <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">Electric (EV)</td>
                    <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      PKR {result.evCostPerKm.toFixed(2)}
                    </td>
                    <td className="p-3 font-mono">PKR {result.evCostMonthly.toLocaleString()}</td>
                    <td className="p-3 font-mono">PKR {result.evCostAnnual.toLocaleString()}</td>
                    <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      +PKR {result.evAnnualSavings.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payback Banner */}
            {(result.evPaybackYears !== null || result.hybridPaybackYears !== null) && (
              <div className="p-3.5 bg-indigo-50/50 dark:bg-indigo-950/20 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-700 dark:text-zinc-300 space-y-1">
                {result.evPaybackYears !== null && (
                  <p>
                    ⚡ <strong>EV Payback Duration:</strong> The initial price difference pays for itself in approximately{" "}
                    <strong>{result.evPaybackYears} years</strong> ({result.evPaybackMonths} months).
                  </p>
                )}
                {result.hybridPaybackYears !== null && (
                  <p>
                    🔋 <strong>Hybrid Payback Duration:</strong> The initial price difference pays for itself in approximately{" "}
                    <strong>{result.hybridPaybackYears} years</strong> ({result.hybridPaybackMonths} months).
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={handleCopyBreakdown}
              className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied Summary!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-500" />
                  <span>Copy Trip Breakdown</span>
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
              <span>{isPdfGenerating ? "Generating..." : "Download PDF Report"}</span>
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
                  <span>Share Comparison</span>
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
