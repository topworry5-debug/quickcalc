"use client";

import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { useCalculatorUrlState } from "@/hooks/useCalculatorUrlState";
import {
  calculateMoneyRunway,
  DEFAULT_RUNWAY_INPUTS,
  MoneyRunwayResult,
  formatCurrency,
  generateScheduleCSV,
} from "@/lib/calculators/moneyRunwayCalculator";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Sparkles,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Flame,
  ArrowRight,
  RotateCcw,
  Sliders,
} from "lucide-react";

export default function MoneyRunwayWidget() {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Input states with defaults
  const [savings, setSavings] = useState<number>(DEFAULT_RUNWAY_INPUTS.currentSavings);
  const [spend, setSpend] = useState<number>(DEFAULT_RUNWAY_INPUTS.monthlyWithdrawal);
  const [returnRate, setReturnRate] = useState<number>(DEFAULT_RUNWAY_INPUTS.annualReturn);
  const [inflationRate, setInflationRate] = useState<number>(DEFAULT_RUNWAY_INPUTS.inflationRate);
  const [adjustInflation, setAdjustInflation] = useState<boolean>(DEFAULT_RUNWAY_INPUTS.adjustForInflation);
  const [currentAge, setCurrentAge] = useState<number>(DEFAULT_RUNWAY_INPUTS.currentAge || 60);

  // UI state
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showFullSchedule, setShowFullSchedule] = useState<boolean>(false);
  const [scheduleExpanded, setScheduleExpanded] = useState<boolean>(false);
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // SVG Chart container ref for responsive coordinate tracking
  const chartSvgRef = useRef<SVGSVGElement | null>(null);

  // Hydrate from URL query parameters
  const onHydrate = useCallback((sp: URLSearchParams) => {
    const p = sp.get("savings");
    if (p) setSavings(Math.max(0, Math.min(5000000, Number(p))) || 350000);

    const w = sp.get("spend");
    if (w) setSpend(Math.max(100, Math.min(50000, Number(w))) || 2500);

    const r = sp.get("return");
    if (r) setReturnRate(Math.max(0, Math.min(15, Number(r))) || 5.0);

    const i = sp.get("inflation");
    if (i) setInflationRate(Math.max(0, Math.min(10, Number(i))) || 2.5);

    const a = sp.get("adjustInflation");
    if (a !== null) setAdjustInflation(a === "true");

    const age = sp.get("age");
    if (age) setCurrentAge(Math.max(20, Math.min(90, Number(age))) || 60);
  }, []);

  useCalculatorUrlState(
    {
      savings: savings !== DEFAULT_RUNWAY_INPUTS.currentSavings ? savings.toString() : undefined,
      spend: spend !== DEFAULT_RUNWAY_INPUTS.monthlyWithdrawal ? spend.toString() : undefined,
      return: returnRate !== DEFAULT_RUNWAY_INPUTS.annualReturn ? returnRate.toString() : undefined,
      inflation: inflationRate !== DEFAULT_RUNWAY_INPUTS.inflationRate ? inflationRate.toString() : undefined,
      adjustInflation: !adjustInflation ? "false" : undefined,
      age: currentAge !== (DEFAULT_RUNWAY_INPUTS.currentAge || 60) ? currentAge.toString() : undefined,
    },
    onHydrate
  );

  // Run calculation
  const result: MoneyRunwayResult = useMemo(() => {
    return calculateMoneyRunway({
      currentSavings: savings,
      monthlyWithdrawal: spend,
      annualReturn: returnRate,
      inflationRate: inflationRate,
      adjustForInflation: adjustInflation,
      currentAge: currentAge,
    });
  }, [savings, spend, returnRate, inflationRate, adjustInflation, currentAge]);

  // Handle CSV export
  const handleDownloadCSV = () => {
    if (!result.yearlySchedule || result.yearlySchedule.length === 0) return;
    const csvContent = generateScheduleCSV(result.yearlySchedule);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `money-runway-schedule-${savings}-savings.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy shareable summary
  const handleCopySummary = () => {
    const text = `💰 Savings & Retirement Runway Summary (QuickCalc):
• Initial Savings: ${formatCurrency(savings)}
• Monthly Spend: ${formatCurrency(spend)}/mo
• Expected Return: ${returnRate}% | Inflation: ${adjustInflation ? `${inflationRate}%` : "Off"}
• Starting Withdrawal Rate: ${result.initialWithdrawalRate.toFixed(1)}% (${result.swrStatusLabel})
👉 Result: ${result.totalYearsAndMonths}
${result.depletionAgeText}
Calculate yours: ${typeof window !== "undefined" ? window.location.href : "https://quickcalc.cloud/calculators/how-long-will-my-money-last"}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Reset to defaults
  const handleReset = () => {
    setSavings(DEFAULT_RUNWAY_INPUTS.currentSavings);
    setSpend(DEFAULT_RUNWAY_INPUTS.monthlyWithdrawal);
    setReturnRate(DEFAULT_RUNWAY_INPUTS.annualReturn);
    setInflationRate(DEFAULT_RUNWAY_INPUTS.inflationRate);
    setAdjustInflation(DEFAULT_RUNWAY_INPUTS.adjustForInflation);
    setCurrentAge(60);
  };

  // SVG Chart Dimensions & Calculations
  const chartPoints = result.chartData;
  const svgWidth = 700;
  const svgHeight = 280;
  const padLeft = 65;
  const padRight = 25;
  const padTop = 30;
  const padBottom = 45;
  const plotWidth = svgWidth - padLeft - padRight;
  const plotHeight = svgHeight - padTop - padBottom;

  const maxBalance = useMemo(() => {
    if (!chartPoints || chartPoints.length === 0) return 100000;
    const highest = Math.max(...chartPoints.map((p) => p.balance), savings);
    return highest > 0 ? highest * 1.1 : 100000;
  }, [chartPoints, savings]);

  // Construct SVG Area & Line Paths
  const { linePath, areaPath, pointCoordinates } = useMemo(() => {
    if (!chartPoints || chartPoints.length === 0) {
      return { linePath: "", areaPath: "", pointCoordinates: [] };
    }

    const totalPts = chartPoints.length;
    const coords = chartPoints.map((pt, idx) => {
      const x = padLeft + (idx / Math.max(1, totalPts - 1)) * plotWidth;
      const y = padTop + plotHeight * (1 - Math.min(1, Math.max(0, pt.balance / maxBalance)));
      return { x, y };
    });

    // Construct line
    let lineD = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`;
    for (let i = 1; i < coords.length; i++) {
      lineD += ` L ${coords[i].x.toFixed(1)} ${coords[i].y.toFixed(1)}`;
    }

    // Construct area
    const baselineY = padTop + plotHeight;
    const firstX = coords[0].x.toFixed(1);
    const lastX = coords[coords.length - 1].x.toFixed(1);
    const areaD = `${lineD} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;

    return { linePath: lineD, areaPath: areaD, pointCoordinates: coords };
  }, [chartPoints, maxBalance, plotWidth, plotHeight, padLeft, padTop]);

  // Handle Chart Pointer Movement for Tooltips
  const handleChartMouseMove = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    if (!chartSvgRef.current || pointCoordinates.length === 0) return;
    const rect = chartSvgRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const relativeX = ((clientX - rect.left) / rect.width) * svgWidth;

    // Find nearest point
    let closestIndex = 0;
    let minDistance = Infinity;

    pointCoordinates.forEach((coord, idx) => {
      const dist = Math.abs(coord.x - relativeX);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    setHoveredPointIndex(closestIndex);
  };

  const handleChartMouseLeave = () => {
    setHoveredPointIndex(null);
  };

  const activePoint =
    hoveredPointIndex !== null && chartPoints[hoveredPointIndex]
      ? {
          data: chartPoints[hoveredPointIndex],
          coord: pointCoordinates[hoveredPointIndex],
        }
      : null;

  // Visible rows for schedule table
  const scheduleRows = showFullSchedule
    ? result.yearlySchedule
    : result.yearlySchedule.slice(0, 10);

  return (
    <div id="money-runway-widget" data-hydrated={isHydrated ? "true" : "false"} className="w-full space-y-8 font-sans">
      {/* Top Header Summary Card */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl transition-all">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* ========================================================
              LEFT COLUMN: INPUT CONTROLS & SLIDERS
             ======================================================== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>Your Financial Runway</span>
              </h2>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center gap-1 transition-colors"
                title="Reset to default values"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Input 1: Current Savings (Initial Balance P) */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <label htmlFor="savings-input" className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Current Savings / Portfolio</span>
                </label>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold text-base">
                  {formatCurrency(savings)}
                </span>
              </div>

              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                  <span className="text-sm font-bold">$</span>
                </div>
                <input
                  id="savings-input"
                  type="number"
                  min={0}
                  max={5000000}
                  step={5000}
                  value={savings}
                  onChange={(e) => setSavings(Math.max(0, Math.min(5000000, Number(e.target.value) || 0)))}
                  className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950 py-2.5 pl-8 pr-4 text-sm font-mono text-zinc-900 dark:text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>

              {/* Slider */}
              <input
                type="range"
                min={0}
                max={2500000}
                step={10000}
                value={Math.min(2500000, savings)}
                onChange={(e) => setSavings(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              {/* Quick Preset Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[100000, 250000, 350000, 500000, 1000000, 2000000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setSavings(preset)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                      savings === preset
                        ? "bg-emerald-600 text-white font-bold shadow-sm"
                        : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    ${preset >= 1000000 ? `${preset / 1000000}M` : `${preset / 1000}k`}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Monthly Withdrawal (W) */}
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="flex justify-between items-center text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <label htmlFor="spend-input" className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Monthly Spend / Withdrawal</span>
                </label>
                <span className="font-mono text-teal-600 dark:text-teal-400 font-bold text-base">
                  {formatCurrency(spend)}/mo
                </span>
              </div>

              <div className="relative rounded-xl shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                  <span className="text-sm font-bold">$</span>
                </div>
                <input
                  id="spend-input"
                  type="number"
                  min={100}
                  max={50000}
                  step={100}
                  value={spend}
                  onChange={(e) => setSpend(Math.max(100, Math.min(50000, Number(e.target.value) || 0)))}
                  className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950 py-2.5 pl-8 pr-4 text-sm font-mono text-zinc-900 dark:text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors"
                />
              </div>

              {/* Slider */}
              <input
                type="range"
                min={500}
                max={15000}
                step={100}
                value={Math.min(15000, spend)}
                onChange={(e) => setSpend(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />

              {/* Quick Spend Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[1500, 2500, 3500, 5000, 7500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setSpend(preset)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                      spend === preset
                        ? "bg-teal-600 text-white font-bold shadow-sm"
                        : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    ${preset.toLocaleString()}/mo
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Expected Annual Return (r) */}
            <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="flex justify-between items-center text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                <label htmlFor="return-input" className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Expected Annual Return</span>
                </label>
                <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold text-base">
                  {returnRate.toFixed(1)}%
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Conservative", rate: 4.0 },
                  { label: "Balanced", rate: 6.0 },
                  { label: "Aggressive", rate: 8.0 },
                ].map((item) => (
                  <button
                    key={item.rate}
                    id={`preset-${item.label.toLowerCase()}-btn`}
                    type="button"
                    onClick={() => setReturnRate(item.rate)}
                    className={`py-2 px-1 text-xs rounded-xl border font-semibold transition-all text-center ${
                      returnRate === item.rate
                        ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 shadow-sm"
                        : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950/50 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                    }`}
                  >
                    <span className="block">{item.label}</span>
                    <span className="text-[11px] font-mono opacity-80 font-normal">({item.rate}%)</span>
                  </button>
                ))}
              </div>

              {/* Slider */}
              <input
                id="return-input"
                type="range"
                min={0}
                max={15}
                step={0.1}
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* Toggle Switch: Inflation Adjustment */}
            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="space-y-0.5 pr-2">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">
                  Adjust withdrawals for inflation ({inflationRate}%)
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block leading-tight">
                  {adjustInflation
                    ? "Purchasing power preserved: withdrawals grow each month."
                    : "Nominal spending: flat dollar amount withdrawn each month."}
                </span>
              </div>
              <button
                id="inflation-toggle-btn"
                type="button"
                role="switch"
                aria-checked={adjustInflation}
                onClick={() => setAdjustInflation(!adjustInflation)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  adjustInflation ? "bg-emerald-600" : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    adjustInflation ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Advanced Settings Accordion */}
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/30">
              <button
                id="advanced-settings-btn"
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full px-4 py-3 text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Advanced Settings (Current Age & Custom Inflation)</span>
                </span>
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showAdvanced && (
                <div className="p-4 pt-1 space-y-4 border-t border-zinc-200 dark:border-zinc-800 text-xs">
                  {/* Current Age */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                      <span>Current Age</span>
                      <span className="font-mono text-zinc-900 dark:text-white font-bold">{currentAge} Years Old</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={90}
                      step={1}
                      value={currentAge}
                      onChange={(e) => setCurrentAge(Number(e.target.value))}
                      className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded cursor-pointer accent-emerald-600"
                    />
                  </div>

                  {/* Custom Inflation Rate */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center font-semibold text-zinc-700 dark:text-zinc-300">
                      <span>Custom Inflation Rate (%)</span>
                      <span className="font-mono text-zinc-900 dark:text-white font-bold">{inflationRate.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      step={0.1}
                      value={inflationRate}
                      onChange={(e) => setInflationRate(Number(e.target.value))}
                      className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded cursor-pointer accent-teal-600"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: RESULTS, SWR GAUGE & RUNWAY CHART
             ======================================================== */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Hero Result Card */}
            <div className={`p-6 sm:p-7 rounded-3xl border transition-all relative overflow-hidden ${
              result.isPerpetual
                ? "bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border-emerald-500/30"
                : result.yearsElapsed >= 25
                ? "bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-blue-500/10 border-teal-500/30"
                : result.yearsElapsed >= 15
                ? "bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-emerald-500/5 border-blue-500/30"
                : "bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-orange-500/10 border-amber-500/30"
            }`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
                  Estimated Portfolio Runway
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-white/80 dark:bg-zinc-800/80 hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 shadow-sm border border-zinc-200 dark:border-zinc-700 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Share"}</span>
                  </button>
                </div>
              </div>

              {/* Big Headline */}
              <div className="mt-1">
                <div id="hero-runway-text" className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  {result.isPerpetual ? (
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-2 flex-wrap">
                      <Flame className="w-8 h-8 text-emerald-500 shrink-0 inline animate-pulse" />
                      <span>Your Money Lasts Indefinitely</span>
                    </span>
                  ) : (
                    <span>
                      Your money will last{" "}
                      <span className="text-emerald-600 dark:text-emerald-400 underline decoration-emerald-500/40 underline-offset-4 font-mono">
                        {result.totalYearsAndMonths}
                      </span>
                    </span>
                  )}
                </div>

                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{result.depletionAgeText}</span>
                </div>
              </div>

              {/* 3 Secondary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-zinc-200/60 dark:border-zinc-800/60">
                <div>
                  <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block uppercase">
                    Total Withdrawn
                  </span>
                  <span className="text-base sm:text-lg font-bold font-mono text-zinc-900 dark:text-white">
                    {formatCurrency(result.totalWithdrawn)}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block uppercase">
                    Growth Earned
                  </span>
                  <span className="text-base sm:text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    +{formatCurrency(result.totalInterestEarned)}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 block uppercase">
                    Initial Withdrawal Rate
                  </span>
                  <span className={`text-base sm:text-lg font-bold font-mono ${
                    result.initialWithdrawalRate <= 4 ? "text-emerald-600 dark:text-emerald-400" :
                    result.initialWithdrawalRate <= 6 ? "text-amber-600 dark:text-amber-400" :
                    "text-rose-600 dark:text-rose-400"
                  }`}>
                    {result.initialWithdrawalRate.toFixed(2)}% / yr
                  </span>
                </div>
              </div>
            </div>

            {/* Safe Withdrawal Rate (SWR) Health Gauge */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Safe Withdrawal Rate (SWR) Risk Meter</span>
                </span>
                
                {/* Visual Status Pill */}
                <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  result.swrRiskLevel === "safe"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800"
                    : result.swrRiskLevel === "moderate"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                    : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800"
                }`}>
                  {result.swrRiskLevel === "safe" && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                  {result.swrRiskLevel === "moderate" && <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                  {result.swrRiskLevel === "high" && <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />}
                  <span>{result.swrStatusLabel}</span>
                </div>
              </div>

              {/* Multi-segment Horizontal Gauge Bar */}
              <div className="space-y-1.5">
                <div className="relative w-full h-3 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex">
                  {/* Safe Segment: 0% to 4% (maps to ~33% width) */}
                  <div className="h-full bg-emerald-500" style={{ width: "33.3%" }} title="Safe: < 4%" />
                  {/* Moderate Segment: 4% to 6% (maps to ~16.7% width) */}
                  <div className="h-full bg-amber-500" style={{ width: "16.7%" }} title="Moderate: 4% - 6%" />
                  {/* High Risk Segment: 6% to 12%+ (maps to ~50% width) */}
                  <div className="h-full bg-rose-500" style={{ width: "50%" }} title="High Risk: > 6%" />
                </div>

                {/* Marker Labels */}
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                  <span>0%</span>
                  <span className="text-emerald-600 font-bold">4.0% (Trinity Rule)</span>
                  <span className="text-amber-600 font-bold">6.0%</span>
                  <span>12%+</span>
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {result.swrRiskLevel === "safe"
                  ? "At under 4.0%, your withdrawal velocity is conservatively matched with long-term capital preservation."
                  : result.swrRiskLevel === "moderate"
                  ? "At 4%–6%, your portfolio is moderately vulnerable to high-inflation periods or early sequence of returns bear markets."
                  : "At over 6.0%, your withdrawals significantly outpace organic capital growth, accelerating principal depletion."}
              </p>
            </div>

            {/* Interactive Runway Chart (Native Responsive SVG) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Portfolio Depletion Runway</span>
                </div>
                <div className="text-[11px] text-zinc-500 font-mono">
                  {activePoint ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      Year {activePoint.data.year} ({activePoint.data.calendarYear}): {formatCurrency(activePoint.data.balance)}
                    </span>
                  ) : (
                    <span>Hover / Touch chart to inspect</span>
                  )}
                </div>
              </div>

              {/* Chart SVG Canvas */}
              <div className="relative w-full overflow-hidden select-none">
                <svg
                  ref={chartSvgRef}
                  viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                  className="w-full h-auto cursor-crosshair touch-none"
                  onMouseMove={handleChartMouseMove}
                  onTouchMove={handleChartMouseMove}
                  onMouseLeave={handleChartMouseLeave}
                  onTouchEnd={handleChartMouseLeave}
                >
                  <defs>
                    <linearGradient id="runwayAreaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                      <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  {[0, 0.25, 0.5, 0.75, 1.0].map((pct, idx) => {
                    const y = padTop + plotHeight * (1 - pct);
                    const val = maxBalance * pct;
                    return (
                      <g key={idx}>
                        <line
                          x1={padLeft}
                          y1={y}
                          x2={svgWidth - padRight}
                          y2={y}
                          stroke="currentColor"
                          className="text-zinc-200 dark:text-zinc-800"
                          strokeDasharray="3 3"
                        />
                        <text
                          x={padLeft - 8}
                          y={y + 3}
                          textAnchor="end"
                          fontSize="9"
                          fill="currentColor"
                          className="text-zinc-400 dark:text-zinc-500 font-mono"
                        >
                          ${val >= 1000000 ? `${(val / 1000000).toFixed(1)}M` : `${Math.round(val / 1000)}k`}
                        </text>
                      </g>
                    );
                  })}

                  {/* X-axis year ticks */}
                  {chartPoints
                    .filter((_, idx) => {
                      if (chartPoints.length <= 15) return true;
                      if (chartPoints.length <= 30) return idx % 5 === 0 || idx === chartPoints.length - 1;
                      return idx % 10 === 0 || idx === chartPoints.length - 1;
                    })
                    .map((pt) => {
                      const coord = pointCoordinates[pt.year];
                      if (!coord) return null;
                      return (
                        <g key={pt.year}>
                          <line
                            x1={coord.x}
                            y1={padTop + plotHeight}
                            x2={coord.x}
                            y2={padTop + plotHeight + 4}
                            stroke="currentColor"
                            className="text-zinc-300 dark:text-zinc-700"
                          />
                          <text
                            x={coord.x}
                            y={svgHeight - 12}
                            textAnchor="middle"
                            fontSize="9"
                            fill="currentColor"
                            className="text-zinc-400 dark:text-zinc-500 font-mono"
                          >
                            Yr {pt.year}
                          </text>
                          <text
                            x={coord.x}
                            y={svgHeight - 2}
                            textAnchor="middle"
                            fontSize="8"
                            fill="currentColor"
                            className="text-zinc-400/80 dark:text-zinc-600 font-mono"
                          >
                            Age {pt.age}
                          </text>
                        </g>
                      );
                    })}

                  {/* Gradient Area Fill */}
                  {areaPath && (
                    <path
                      d={areaPath}
                      fill="url(#runwayAreaGrad)"
                      className="transition-all duration-300"
                    />
                  )}

                  {/* Line Path */}
                  {linePath && (
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-all duration-300"
                    />
                  )}

                  {/* Active Tooltip Hover Guideline & Point Marker */}
                  {activePoint && (
                    <g>
                      {/* Vertical line crosshair */}
                      <line
                        x1={activePoint.coord.x}
                        y1={padTop}
                        x2={activePoint.coord.x}
                        y2={padTop + plotHeight}
                        stroke="#06B6D4"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        className="opacity-80"
                      />
                      {/* Outer pulse circle */}
                      <circle
                        cx={activePoint.coord.x}
                        cy={activePoint.coord.y}
                        r="6"
                        fill="#10B981"
                        fillOpacity="0.3"
                      />
                      {/* Solid inner circle */}
                      <circle
                        cx={activePoint.coord.x}
                        cy={activePoint.coord.y}
                        r="3.5"
                        fill="#10B981"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    </g>
                  )}
                </svg>

                {/* Floating Interactive Tooltip Card */}
                {activePoint && (
                  <div
                    className="absolute pointer-events-none z-10 p-2.5 rounded-xl bg-zinc-900/95 text-white dark:bg-zinc-800/95 text-xs shadow-2xl border border-zinc-700/80 backdrop-blur-md transform -translate-x-1/2 -translate-y-full transition-all duration-75"
                    style={{
                      left: `${(activePoint.coord.x / svgWidth) * 100}%`,
                      top: `${Math.max(10, (activePoint.coord.y / svgHeight) * 100 - 8)}%`,
                    }}
                  >
                    <div className="font-bold text-emerald-400 border-b border-zinc-700/80 pb-1 mb-1 flex items-center justify-between gap-3">
                      <span>Year {activePoint.data.year} ({activePoint.data.calendarYear})</span>
                      <span className="text-zinc-400 font-mono text-[10px]">Age {activePoint.data.age}</span>
                    </div>
                    <div className="space-y-0.5 text-[11px] font-mono">
                      <div className="flex justify-between gap-3">
                        <span className="text-zinc-400">Balance:</span>
                        <span className="font-bold text-white">{formatCurrency(activePoint.data.balance)}</span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-zinc-400">Annual Spend:</span>
                        <span className="text-rose-400">{formatCurrency(activePoint.data.annualSpend)}</span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-zinc-400">Cumulative Growth:</span>
                        <span className="text-teal-400">+{formatCurrency(activePoint.data.growthEarned)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* "What-If" Humanized Dynamic Insights */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-indigo-500/10 border border-emerald-500/20 text-zinc-800 dark:text-zinc-200 space-y-3">
              <div className="flex items-start gap-3">
                <span className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 shadow-sm">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div className="space-y-1 flex-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Smart Runway Optimizer
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    💡 <strong>Smart Tip:</strong> {result.smartTip.message}
                  </p>
                </div>
              </div>

              {!result.isPerpetual && result.smartTip.cutSpendAmount > 0 && (
                <div className="flex justify-end pt-1">
                  <button
                    id="apply-cut-btn"
                    type="button"
                    onClick={() => setSpend(Math.max(100, spend - result.smartTip.cutSpendAmount))}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <span>Apply Cut (-${result.smartTip.cutSpendAmount}/mo)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================
          YEAR-BY-YEAR SCHEDULE (COLLAPSIBLE ACCORDION)
         ======================================================== */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-xl transition-all">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setScheduleExpanded(!scheduleExpanded)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setScheduleExpanded(!scheduleExpanded);
            }
          }}
          className="p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-850/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Year-by-Year Schedule</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              {result.yearlySchedule.length} Years Projected
            </span>
          </div>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              id="download-csv-btn"
              type="button"
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
              title="Download Schedule as CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Schedule CSV</span>
            </button>
            <button
              id="schedule-toggle-btn"
              type="button"
              onClick={() => setScheduleExpanded(!scheduleExpanded)}
              className="p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
              title={scheduleExpanded ? "Collapse Table" : "Expand Table"}
            >
              {scheduleExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Schedule Table Body */}
        {scheduleExpanded && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3 font-semibold">Year</th>
                    <th className="py-2.5 px-3 font-semibold">Age</th>
                    <th className="py-2.5 px-3 font-semibold">Starting Balance</th>
                    <th className="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400">Growth Earned</th>
                    <th className="py-2.5 px-3 font-semibold text-rose-600 dark:text-rose-400">Annual Withdrawals</th>
                    <th className="py-2.5 px-3 font-semibold">End Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                  {scheduleRows.map((row) => (
                    <tr
                      key={row.yearIndex}
                      className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors"
                    >
                      <td className="py-2.5 px-3 font-bold text-zinc-800 dark:text-zinc-200">
                        Year {row.yearIndex} ({row.calendarYear})
                      </td>
                      <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">
                        {row.age}
                      </td>
                      <td className="py-2.5 px-3 text-zinc-700 dark:text-zinc-300">
                        {formatCurrency(row.startBalance)}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400">
                        +{formatCurrency(row.growthEarned)}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-rose-600 dark:text-rose-400">
                        -{formatCurrency(row.annualWithdrawals)}
                      </td>
                      <td className={`py-2.5 px-3 font-bold ${
                        row.endBalance <= 0 ? "text-rose-600 dark:text-rose-400 font-extrabold" : "text-zinc-900 dark:text-white"
                      }`}>
                        {formatCurrency(row.endBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Show more toggle */}
            {result.yearlySchedule.length > 10 && (
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowFullSchedule(!showFullSchedule)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
                >
                  {showFullSchedule
                    ? "Show First 10 Years"
                    : `View All ${result.yearlySchedule.length} Projected Years`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
