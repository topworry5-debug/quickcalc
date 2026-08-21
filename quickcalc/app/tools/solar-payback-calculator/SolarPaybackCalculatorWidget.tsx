"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  calculateSolarRoi,
  getSolarPaybackExplanationSteps,
  SOLAR_CURRENCIES,
  SOLAR_PRESETS,
  SolarCalculatorInputs,
  SolarCalculatorResult,
} from "@/lib/calculators/solarPaybackCalculator";
import { generatePdfAsync } from "@/lib/utils/downloadPdf";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import {
  RotateCcw,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  Sun,
  Zap,
  BatteryCharging,
  Leaf,
  ChevronDown,
} from "lucide-react";

export default function SolarPaybackCalculatorWidget() {
  // Currency
  const [currencyCode, setCurrencyCode] = useState<string>("USD");

  // Card 1: System & Investment Details
  const [systemCost, setSystemCost] = useState<string>("18000");
  const [systemCapacityKw, setSystemCapacityKw] = useState<string>("6.5");
  const [hasBattery, setHasBattery] = useState<boolean>(false);
  const [batteryCost, setBatteryCost] = useState<string>("8500");

  // Card 2: Energy & Financial Parameters
  const [monthlyBill, setMonthlyBill] = useState<string>("180");
  const [tariffPerKwh, setTariffPerKwh] = useState<string>("0.18");
  const [annualInflationPercent, setAnnualInflationPercent] = useState<string>("5.0");
  const [taxCreditPercent, setTaxCreditPercent] = useState<string>("30");
  const [netMeteringRate, setNetMeteringRate] = useState<string>("0.12");

  // Card 3: Performance & Climate
  const [peakSunHoursPerDay, setPeakSunHoursPerDay] = useState<number>(4.8);
  const [degradationPercent, setDegradationPercent] = useState<string>("0.5");

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart");

  // Sync state from URL search params on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const qCost = params.get("cost");
      const qKw = params.get("kw");
      const qBat = params.get("bat");
      const qBatCost = params.get("batCost");
      const qBill = params.get("bill");
      const qTariff = params.get("tariff");
      const qInf = params.get("inf");
      const qTax = params.get("tax");
      const qNet = params.get("net");
      const qSun = params.get("sun");
      const qDeg = params.get("deg");
      const qCurr = params.get("curr");

      if (qCost) setSystemCost(qCost);
      if (qKw) setSystemCapacityKw(qKw);
      if (qBat) setHasBattery(qBat === "true");
      if (qBatCost) setBatteryCost(qBatCost);
      if (qBill) setMonthlyBill(qBill);
      if (qTariff) setTariffPerKwh(qTariff);
      if (qInf) setAnnualInflationPercent(qInf);
      if (qTax) setTaxCreditPercent(qTax);
      if (qNet) setNetMeteringRate(qNet);
      if (qSun) setPeakSunHoursPerDay(parseFloat(qSun) || 4.8);
      if (qDeg) setDegradationPercent(qDeg);
      if (qCurr && SOLAR_CURRENCIES.some((c) => c.code === qCurr)) setCurrencyCode(qCurr);
    } catch {
      // ignore
    }
  }, []);

  // Compute live calculations
  const inputs: SolarCalculatorInputs = useMemo(() => ({
    currencyCode,
    systemCost: parseFloat(systemCost) || 0,
    systemCapacityKw: parseFloat(systemCapacityKw) || 0,
    hasBattery,
    batteryCost: parseFloat(batteryCost) || 0,
    monthlyBill: parseFloat(monthlyBill) || 0,
    tariffPerKwh: parseFloat(tariffPerKwh) || 0,
    annualInflationPercent: parseFloat(annualInflationPercent) || 0,
    taxCreditPercent: parseFloat(taxCreditPercent) || 0,
    netMeteringRate: parseFloat(netMeteringRate) || 0,
    peakSunHoursPerDay,
    degradationPercent: parseFloat(degradationPercent) || 0,
  }), [
    currencyCode,
    systemCost,
    systemCapacityKw,
    hasBattery,
    batteryCost,
    monthlyBill,
    tariffPerKwh,
    annualInflationPercent,
    taxCreditPercent,
    netMeteringRate,
    peakSunHoursPerDay,
    degradationPercent,
  ]);

  const result: SolarCalculatorResult = useMemo(() => calculateSolarRoi(inputs), [inputs]);

  const explanationSteps = useMemo(
    () => getSolarPaybackExplanationSteps(inputs, result),
    [inputs, result]
  );

  const sym = result.currency.symbol;

  const formatMoney = (val: number, decimals: number = 0) => {
    return `${sym}${val.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  };

  // Preset Scenario loader
  const loadPreset = (preset: typeof SOLAR_PRESETS[0]) => {
    if (preset.inputs.currencyCode) setCurrencyCode(preset.inputs.currencyCode);
    if (preset.inputs.systemCost !== undefined) setSystemCost(preset.inputs.systemCost.toString());
    if (preset.inputs.systemCapacityKw !== undefined) setSystemCapacityKw(preset.inputs.systemCapacityKw.toString());
    if (preset.inputs.hasBattery !== undefined) setHasBattery(preset.inputs.hasBattery);
    if (preset.inputs.batteryCost !== undefined) setBatteryCost(preset.inputs.batteryCost.toString());
    if (preset.inputs.monthlyBill !== undefined) setMonthlyBill(preset.inputs.monthlyBill.toString());
    if (preset.inputs.tariffPerKwh !== undefined) setTariffPerKwh(preset.inputs.tariffPerKwh.toString());
    if (preset.inputs.annualInflationPercent !== undefined) setAnnualInflationPercent(preset.inputs.annualInflationPercent.toString());
    if (preset.inputs.taxCreditPercent !== undefined) setTaxCreditPercent(preset.inputs.taxCreditPercent.toString());
    if (preset.inputs.netMeteringRate !== undefined) setNetMeteringRate(preset.inputs.netMeteringRate.toString());
    if (preset.inputs.peakSunHoursPerDay !== undefined) setPeakSunHoursPerDay(preset.inputs.peakSunHoursPerDay);
    if (preset.inputs.degradationPercent !== undefined) setDegradationPercent(preset.inputs.degradationPercent.toString());
  };

  // Reset to default
  const handleReset = () => {
    setCurrencyCode("USD");
    setSystemCost("18000");
    setSystemCapacityKw("6.5");
    setHasBattery(false);
    setBatteryCost("8500");
    setMonthlyBill("180");
    setTariffPerKwh("0.18");
    setAnnualInflationPercent("5.0");
    setTaxCreditPercent("30");
    setNetMeteringRate("0.12");
    setPeakSunHoursPerDay(4.8);
    setDegradationPercent("0.5");
  };

  // Copy results summary
  const handleCopySummary = async () => {
    const summaryText = `
=== QuickCalc: Solar Panel ROI & Payback Summary (2026) ===
System Capacity: ${inputs.systemCapacityKw} kW (${inputs.peakSunHoursPerDay} sun hrs/day)
Gross System Investment: ${formatMoney(result.grossInvestment)}
Federal / Local Tax Credit: ${formatMoney(result.taxCreditAmount)} (${inputs.taxCreditPercent}%)
Net System Investment: ${formatMoney(result.netInvestment)}

-- Production & Savings --
Year 1 Solar Generation: ${Math.round(result.year1GenerationKwh).toLocaleString()} kWh/yr (${result.dailyGenerationKwh.toFixed(1)} kWh/day)
Year 1 Electricity Bill Savings: ${formatMoney(result.year1Savings)} (${formatMoney(result.monthlySavingsAvg)}/mo)
Levelized Cost of Solar (LCOE): ${sym}${result.lcoePerKwh.toFixed(3)}/kWh (vs Grid: ${sym}${inputs.tariffPerKwh}/kWh)

-- 25-Year Investment Returns --
Payback Period: ${result.isPaybackAchievedIn25Years ? `${result.paybackPeriodYears} Years` : "Over 25 Years"}
25-Year Cumulative Gross Savings: ${formatMoney(result.total25YearGrossSavings)}
25-Year Net Lifetime Profit: ${formatMoney(result.total25YearNetSavings)}
25-Year Return on Investment (ROI): ${result.roiPercent.toFixed(0)}%

-- Carbon & Environmental Impact --
Annual CO2 Offset: ${result.annualCo2OffsetTons.toFixed(2)} Metric Tons/year
25-Year Total CO2 Offset: ${result.total25YearCo2Tons.toFixed(1)} Metric Tons
Equivalent Mature Trees Planted: ~${result.equivalentTreesPlanted.toLocaleString()} Trees/year

Calculated at: https://quickcalc.cloud/tools/solar-payback-calculator
`.trim();

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Share scenario link
  const handleShareScenario = async () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + "/tools/solar-payback-calculator");
    url.searchParams.set("cost", systemCost);
    url.searchParams.set("kw", systemCapacityKw);
    if (hasBattery) {
      url.searchParams.set("bat", "true");
      url.searchParams.set("batCost", batteryCost);
    }
    url.searchParams.set("bill", monthlyBill);
    url.searchParams.set("tariff", tariffPerKwh);
    url.searchParams.set("inf", annualInflationPercent);
    url.searchParams.set("tax", taxCreditPercent);
    url.searchParams.set("net", netMeteringRate);
    url.searchParams.set("sun", peakSunHoursPerDay.toString());
    url.searchParams.set("deg", degradationPercent);
    url.searchParams.set("curr", currencyCode);

    try {
      await navigator.clipboard.writeText(url.toString());
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // PDF Download report
  const handleDownloadPdf = async () => {
    setIsPdfGenerating(true);
    try {
      await generatePdfAsync({
        toolName: "Solar Panel ROI & Payback Investment Report",
        toolSlug: "solar-payback-calculator",
        inputs: [
          { label: "Solar System Capacity", value: `${inputs.systemCapacityKw} kW` },
          { label: "Gross Turnkey Cost", value: formatMoney(result.grossInvestment) },
          { label: "Tax Credit / Subsidy", value: `${inputs.taxCreditPercent}% (${formatMoney(result.taxCreditAmount)})` },
          { label: "Net Out-of-Pocket Cost", value: formatMoney(result.netInvestment) },
          { label: "Current Monthly Power Bill", value: formatMoney(inputs.monthlyBill) },
          { label: "Grid Tariff Rate", value: `${sym}${inputs.tariffPerKwh}/kWh` },
          { label: "Peak Sun Hours / Day", value: `${inputs.peakSunHoursPerDay} hrs` },
          { label: "Annual Rate Inflation", value: `${inputs.annualInflationPercent}%` },
        ],
        results: [
          { label: "Payback Period", value: `${result.paybackPeriodYears} Years`, isHighlight: true },
          { label: "25-Yr Net Profit", value: formatMoney(result.total25YearNetSavings), isHighlight: true },
          { label: "25-Yr ROI", value: `${result.roiPercent.toFixed(0)}%`, isHighlight: true },
          { label: "Year 1 Savings", value: formatMoney(result.year1Savings) },
          { label: "Solar Energy Cost (LCOE)", value: `${sym}${result.lcoePerKwh.toFixed(3)}/kWh` },
          { label: "Annual CO2 Offset", value: `${result.annualCo2OffsetTons} Tons/yr` },
        ],
        summaryNote: `A ${inputs.systemCapacityKw} kW solar installation with a net investment of ${formatMoney(result.netInvestment)} breaks even in ${result.paybackPeriodYears} years. Over its 25-year warranted lifecycle, it generates ${Math.round(result.total25YearGenerationKwh).toLocaleString()} kWh of clean energy, yielding ${formatMoney(result.total25YearNetSavings)} in net energy savings (${result.roiPercent.toFixed(0)}% ROI) and cutting ${result.total25YearCo2Tons} metric tons of CO2.`,
        table: {
          title: "25-Year Cumulative Solar Cash Flow Timeline",
          headers: ["Year", "Annual Gen (kWh)", "Utility Tariff", "Annual Savings", "Cumulative Cash Flow"],
          rows: result.cashFlowSeries.filter((_, idx) => idx % 2 === 0 || idx === result.cashFlowSeries.length - 1).map((cf) => [
            `Year ${cf.year}`,
            `${Math.round(cf.annualGenerationKwh).toLocaleString()} kWh`,
            `${sym}${cf.tariffRate.toFixed(3)}/kWh`,
            formatMoney(cf.annualSavings),
            cf.cumulativeCashFlow >= 0 ? `+${formatMoney(cf.cumulativeCashFlow)}` : `-${formatMoney(Math.abs(cf.cumulativeCashFlow))}`,
          ]),
        },
      });
    } catch (e) {
      console.error("PDF generation error", e);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // SVG Chart Dimensions & Data
  const chartHeight = 160;
  const chartWidth = 480;
  const maxPositive = Math.max(1, ...result.cashFlowSeries.map((c) => Math.max(0, c.cumulativeCashFlow)));
  const maxNegative = Math.max(1, ...result.cashFlowSeries.map((c) => Math.max(0, -c.cumulativeCashFlow)));
  const totalRange = maxPositive + maxNegative;
  const zeroY = (maxPositive / totalRange) * chartHeight;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Preset Scenarios Selector Bar */}
      <div className="bg-zinc-100/80 dark:bg-zinc-900/60 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Solar Scenarios & Presets:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {SOLAR_PRESETS.map((preset) => (
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
              title="Reset all inputs to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: 3 Input Cards (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Card 1: System & Investment Details */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    1. Solar System & Cost
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Capacity, turnkey price and battery storage
                  </p>
                </div>
              </div>

              {/* Currency Selector */}
              <div className="relative">
                <select
                  value={currencyCode}
                  aria-label="Currency"
                  onChange={(e) => setCurrencyCode(e.target.value)}
                  className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 pr-6 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  {SOLAR_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Total Solar System Cost */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Gross System Price ({sym})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                    {sym}
                  </span>
                  <input
                    type="number"
                    step="500"
                    min="0"
                    value={systemCost}
                    onChange={(e) => setSystemCost(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="18000"
                  />
                </div>
              </div>

              {/* System Capacity in kW */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>System Capacity</span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">kW (DC)</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={systemCapacityKw}
                    onChange={(e) => setSystemCapacityKw(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="6.5"
                  />
                </div>
              </div>
            </div>

            {/* Capacity Quick Step Buttons */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[10px] text-zinc-400 font-semibold mr-1">Quick Size:</span>
              {[3, 5, 6.5, 8, 10, 15].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSystemCapacityKw(size.toString())}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-colors ${
                    parseFloat(systemCapacityKw) === size
                      ? "bg-amber-500/10 border-amber-500 text-amber-600 dark:text-amber-400"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                  }`}
                >
                  {size} kW
                </button>
              ))}
            </div>

            {/* Battery Storage Toggle */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <BatteryCharging className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      Add Battery Storage (e.g. 10 kWh)
                    </span>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Stores surplus daytime solar for nighttime power
                    </p>
                  </div>
                </div>
                <div className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={hasBattery}
                    onChange={(e) => setHasBattery(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500"></div>
                </div>
              </label>

              {hasBattery && (
                <div className="mt-3 p-3 bg-teal-50/50 dark:bg-teal-950/30 rounded-xl border border-teal-500/20 animate-fadeIn">
                  <label className="block text-xs font-semibold text-teal-900 dark:text-teal-200 mb-1">
                    Battery Add-on Price ({sym})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                      {sym}
                    </span>
                    <input
                      type="number"
                      step="500"
                      min="0"
                      value={batteryCost}
                      onChange={(e) => setBatteryCost(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 text-sm font-bold bg-white dark:bg-zinc-900 border border-teal-500/30 rounded-lg text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="8500"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Energy & Financial Parameters */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  2. Utility Bills & Incentives
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Tariff rates, tax credits, and inflation
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Monthly Electricity Bill */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Monthly Electric Bill ({sym})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                    {sym}
                  </span>
                  <input
                    type="number"
                    step="10"
                    min="0"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="180"
                  />
                </div>
              </div>

              {/* Utility Tariff Rate per kWh */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Tariff Rate ({sym}/kWh)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                    {sym}
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={tariffPerKwh}
                    onChange={(e) => setTariffPerKwh(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="0.18"
                  />
                </div>
              </div>

              {/* Federal / Local Tax Credit (%) */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>Tax Credit / Subsidy (%)</span>
                  <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold">30% US ITC</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="5"
                    min="0"
                    max="100"
                    value={taxCreditPercent}
                    onChange={(e) => setTaxCreditPercent(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="30"
                  />
                </div>
              </div>

              {/* Annual Electricity Price Inflation (%) */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>Annual Rate Inflation (%)</span>
                  <span className="text-[10px] text-zinc-400 font-normal">Hist. avg: 4–6%</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="20"
                    value={annualInflationPercent}
                    onChange={(e) => setAnnualInflationPercent(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="5.0"
                  />
                </div>
              </div>
            </div>

            {/* Net Metering Buyback Rate */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                <span>Net Metering Buyback Rate ({sym}/kWh)</span>
                <span className="text-[10px] text-zinc-400 font-normal">Tariff paid for exported grid energy</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                  {sym}
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={netMeteringRate}
                  onChange={(e) => setNetMeteringRate(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="0.12"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Performance & Climate (Sun Hours Slider) */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  3. Sun Hours & Efficiency
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Solar irradiance and panel degradation
                </p>
              </div>
            </div>

            {/* Peak Sun Hours Slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  Average Peak Sun Hours per Day:
                </label>
                <span className="text-sm font-black text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                  {peakSunHoursPerDay} hrs/day
                </span>
              </div>
              <input
                type="range"
                min="3.0"
                max="6.5"
                step="0.1"
                value={peakSunHoursPerDay}
                onChange={(e) => setPeakSunHoursPerDay(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-semibold mt-1">
                <span>3.2h (Cloudy / North)</span>
                <span>4.8h (Moderate / Mid-US)</span>
                <span>6.2h (Sunny Sunbelt)</span>
              </div>
            </div>

            {/* Degradation Rate */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="text-zinc-600 dark:text-zinc-400 font-medium">
                Annual Panel Degradation (%/year):
              </span>
              <div className="w-24">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="2.0"
                  value={degradationPercent}
                  onChange={(e) => setDegradationPercent(e.target.value)}
                  className="w-full px-2 py-1 text-xs font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-right text-zinc-900 dark:text-white"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Calculated Results, ROI & 25-Year Graph (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Primary 3-Metric Highlight Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Payback Period (Amber / Yellow) */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-orange-500/10 border-amber-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Payback Period
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300">
                  Breakeven
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-amber-600 dark:text-amber-400">
                {result.isPaybackAchievedIn25Years ? `${result.paybackPeriodYears} Yrs` : "> 25 Yrs"}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                {result.isPaybackAchievedIn25Years ? "Full capital recovery" : "System cost exceeds savings"}
              </div>
            </div>

            {/* 25-Year Net Lifetime Profit (Green / Emerald) */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-teal-500/10 border-emerald-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  25-Yr Net Profit
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  {result.roiPercent.toFixed(0)}% ROI
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
                {formatMoney(result.total25YearNetSavings)}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Net lifetime energy gain
              </div>
            </div>

            {/* Year 1 Solar Output (Blue / Sky) */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-sky-500/15 via-sky-500/5 to-indigo-500/10 border-sky-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400">
                  Year 1 Solar Gen
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-sky-500/20 text-sky-800 dark:text-sky-300">
                  Annual
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-sky-600 dark:text-sky-400">
                {Math.round(result.year1GenerationKwh).toLocaleString()}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                kWh ({result.dailyGenerationKwh.toFixed(1)} kWh/day)
              </div>
            </div>
          </div>

          {/* Tab Navigation: 25-Year Cumulative Cash Flow Graph vs Detailed Table */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("chart")}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === "chart"
                      ? "bg-amber-500 text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  25-Year Cash Flow Graph
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("table")}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === "table"
                      ? "bg-amber-500 text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  Annual Breakdown Table
                </button>
              </div>

              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span>LCOE: {sym}{result.lcoePerKwh.toFixed(3)}/kWh</span>
              </span>
            </div>

            {activeTab === "chart" ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
                  <span>Net Investment: -{formatMoney(result.netInvestment)}</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    25-Yr Value: +{formatMoney(result.total25YearNetSavings)}
                  </span>
                </div>

                {/* SVG Cumulative Cash Flow Chart */}
                <div className="w-full bg-zinc-50 dark:bg-zinc-950/80 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 relative overflow-hidden">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full h-40 overflow-visible"
                  >
                    {/* Zero line */}
                    <line
                      x1="0"
                      y1={zeroY}
                      x2={chartWidth}
                      y2={zeroY}
                      stroke="#71717a"
                      strokeDasharray="4 4"
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                    <text
                      x={chartWidth - 5}
                      y={zeroY - 4}
                      textAnchor="end"
                      fill="#71717a"
                      fontSize="9"
                      fontWeight="bold"
                    >
                      $0 Breakeven
                    </text>

                    {/* Bars for each of 25 years */}
                    {result.cashFlowSeries.map((item, i) => {
                      const barWidth = (chartWidth / 25) - 3;
                      const x = i * (chartWidth / 25) + 1.5;
                      const isPositive = item.cumulativeCashFlow >= 0;
                      
                      let barHeight = 0;
                      let y = zeroY;

                      if (isPositive) {
                        barHeight = (item.cumulativeCashFlow / totalRange) * chartHeight;
                        y = zeroY - barHeight;
                      } else {
                        barHeight = (Math.abs(item.cumulativeCashFlow) / totalRange) * chartHeight;
                        y = zeroY;
                      }

                      const isBreakevenYear =
                        result.isPaybackAchievedIn25Years &&
                        Math.ceil(result.paybackPeriodYears) === item.year;

                      return (
                        <g key={item.year} className="group cursor-pointer">
                          <rect
                            x={x}
                            y={y}
                            width={barWidth}
                            height={Math.max(2, barHeight)}
                            rx="1.5"
                            fill={isPositive ? "#10b981" : "#f59e0b"}
                            opacity={isBreakevenYear ? "1" : "0.75"}
                            className="transition-all hover:opacity-100"
                          />
                          {isBreakevenYear && (
                            <circle
                              cx={x + barWidth / 2}
                              cy={zeroY}
                              r="3.5"
                              fill="#ef4444"
                              stroke="#ffffff"
                              strokeWidth="1"
                            />
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Graph Footer Legend */}
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                      <span>Investment Payoff Period</span>
                    </span>
                    <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                      <span>★ Payback Year: {result.paybackPeriodYears}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                      <span>Pure Energy Profits</span>
                    </span>
                  </div>
                </div>

                {/* Investment & Savings Quick Summary */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800/70">
                    <span className="text-zinc-500 dark:text-zinc-400 block text-[11px]">Year 1 Bill Savings:</span>
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {formatMoney(result.year1Savings)} ({formatMoney(result.monthlySavingsAvg)}/mo)
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/70 dark:border-zinc-800/70">
                    <span className="text-zinc-500 dark:text-zinc-400 block text-[11px]">Lifetime 25-Yr Gross:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {formatMoney(result.total25YearGrossSavings)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Year-by-Year Table */
              <div className="max-h-56 overflow-y-auto space-y-1 text-xs pr-1">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">
                    <tr>
                      <th className="p-1.5 rounded-l-lg">Year</th>
                      <th className="p-1.5">Solar Output</th>
                      <th className="p-1.5">Tariff Rate</th>
                      <th className="p-1.5">Savings</th>
                      <th className="p-1.5 text-right rounded-r-lg">Net Cash Flow</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-medium">
                    {result.cashFlowSeries.map((row) => (
                      <tr key={row.year} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                        <td className="p-1.5 font-bold">Yr {row.year}</td>
                        <td className="p-1.5 text-zinc-600 dark:text-zinc-400">
                          {Math.round(row.annualGenerationKwh).toLocaleString()} kWh
                        </td>
                        <td className="p-1.5 text-zinc-600 dark:text-zinc-400">
                          {sym}{row.tariffRate.toFixed(3)}
                        </td>
                        <td className="p-1.5 text-zinc-900 dark:text-white">
                          {formatMoney(row.annualSavings)}
                        </td>
                        <td className={`p-1.5 text-right font-bold ${
                          row.cumulativeCashFlow >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
                        }`}>
                          {row.cumulativeCashFlow >= 0 ? `+${formatMoney(row.cumulativeCashFlow)}` : `-${formatMoney(Math.abs(row.cumulativeCashFlow))}`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Environmental Carbon Offset Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-sky-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-zinc-900 dark:text-white block">
                  {result.annualCo2OffsetTons.toFixed(2)} Metric Tons CO2 Offset / Year
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {result.total25YearCo2Tons.toFixed(0)} tons over 25 yrs • Equivalent to ~{result.equivalentTreesPlanted.toLocaleString()} trees planted/year
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                Eco Certified
              </span>
            </div>
          </div>

          {/* Action Buttons: Copy Summary, Download PDF, Share Scenario */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            
            {/* Copy Results Summary */}
            <button
              type="button"
              onClick={handleCopySummary}
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
                  <span>Copy Summary</span>
                </>
              )}
            </button>

            {/* Download PDF Report */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isPdfGenerating}
              className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
            >
              <Download className={`w-4 h-4 text-zinc-500 ${isPdfGenerating ? "animate-bounce" : ""}`} />
              <span>{isPdfGenerating ? "Generating..." : "Download Report"}</span>
            </button>

            {/* Share Scenario */}
            <button
              type="button"
              onClick={handleShareScenario}
              className="py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              {shareCopied ? (
                <>
                  <Check className="w-4 h-4 text-amber-500" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Share Scenario</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Step-by-Step Mathematical Derivation */}
      <ExplainResultAccordion steps={explanationSteps} />
    </div>
  );
}
