"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  RotateCcw,
  Sparkles,
  Download,
  Copy,
  Check,
  PiggyBank,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Zap,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  calculateRothIra,
  DEFAULT_ROTH_INPUTS,
  RothIraInputs,
  CONTRIBUTION_PRESETS,
  RETURN_PRESETS,
  formatCurrency,
  formatPercent,
  generateRothIraCsv,
} from "@/lib/rothIraCalculator";

export default function RothIraCalculatorWidget() {
  const [inputs, setInputs] = useState<RothIraInputs>(DEFAULT_ROTH_INPUTS);
  const [copied, setCopied] = useState(false);
  const [showTaxDetails, setShowTaxDetails] = useState(false);
  const [scheduleView, setScheduleView] = useState<"milestones" | "all">("milestones");
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const result = useMemo(() => {
    return calculateRothIra(inputs);
  }, [inputs]);

  const updateNumericInput = (key: keyof RothIraInputs, value: number) => {
    setInputs((prev) => {
      const next = { ...prev, [key]: isNaN(value) ? 0 : Math.max(0, value) };
      // Ensure retirement age is strictly greater than current age
      if (key === "currentAge" && next.retirementAge <= next.currentAge) {
        next.retirementAge = next.currentAge + 1;
      }
      return next;
    });
  };

  const handleReset = () => {
    setInputs(DEFAULT_ROTH_INPUTS);
    setHoveredPointIndex(null);
  };

  const handleCopySummary = async () => {
    const text = `Roth IRA Retirement Growth Summary (QuickCalc.cloud):
• Current Age: ${inputs.currentAge} | Retirement Age: ${inputs.retirementAge} (${result.horizonYears} Years Horizon)
• Starting Balance: ${formatCurrency(inputs.currentBalance)}
• Monthly Contribution: ${formatCurrency(inputs.monthlyContribution)}/mo (${formatCurrency(inputs.monthlyContribution * 12)}/yr)
• Expected Annual Return: ${formatPercent(inputs.annualReturn)}

KEY PROJECTIONS:
• Total Projected Roth Nest Egg: ${formatCurrency(result.rothEndingBalance)} (100% Tax-Free)
• Total Principal Invested: ${formatCurrency(result.totalPrincipal)}
• Tax-Free Growth Earned: ${formatCurrency(result.rothTotalGrowth)} (${result.growthMultiple}x return on principal)
• Taxable Brokerage Equivalent: ${formatCurrency(result.taxableEndingBalance)} (After-Tax)
• The Roth Tax Advantage: ${formatCurrency(result.lifetimeTaxesSaved)} in Taxes Avoided!

Calculate yours at: https://quickcalc.cloud/calculators/roth-ira-calculator`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadCsv = () => {
    const csvData = generateRothIraCsv(result, inputs);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `roth_ira_growth_schedule_${inputs.currentAge}_to_${inputs.retirementAge}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filter milestone rows
  const displayedMilestones = useMemo(() => {
    if (scheduleView === "all") {
      return result.milestones;
    }
    // Milestones: Every 5 years, plus the very first year and final year
    return result.milestones.filter(
      (m, idx) => m.year % 5 === 0 || idx === 0 || idx === result.milestones.length - 1
    );
  }, [result.milestones, scheduleView]);

  // Chart coordinate calculations
  const chartPoints = result.chartPoints;
  const maxVal = Math.max(1000, ...chartPoints.map((p) => Math.max(p.rothBalance, p.taxableBalance, p.totalPrincipal)));
  const svgWidth = 600;
  const svgHeight = 240;
  const paddingX = 40;
  const paddingY = 24;
  const innerW = svgWidth - paddingX * 2;
  const innerH = svgHeight - paddingY * 2;

  const getX = (idx: number) => {
    if (chartPoints.length <= 1) return paddingX + innerW / 2;
    return paddingX + (idx / (chartPoints.length - 1)) * innerW;
  };

  const getY = (val: number) => {
    return paddingY + innerH - (val / maxVal) * innerH;
  };

  // SVG Area Paths
  const rothPointsStr = chartPoints.map((p, i) => `${getX(i)},${getY(p.rothBalance)}`).join(" ");
  const rothAreaPath = `${rothPointsStr} L ${getX(chartPoints.length - 1)},${paddingY + innerH} L ${getX(0)},${paddingY + innerH} Z`;

  const taxableLineStr = chartPoints.map((p, i) => `${getX(i)},${getY(p.taxableBalance)}`).join(" ");
  const principalLineStr = chartPoints.map((p, i) => `${getX(i)},${getY(p.totalPrincipal)}`).join(" ");

  const activePoint = hoveredPointIndex !== null ? chartPoints[hoveredPointIndex] : chartPoints[chartPoints.length - 1];

  const annualContribution = inputs.monthlyContribution * 12;
  const isOverIrsLimit = annualContribution > result.irsAnnualLimit;

  return (
    <div className="w-full space-y-8 font-sans">
      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Controls & Sliders (5 cols) */}
        <div className="lg:col-span-5 space-y-6 bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <PiggyBank size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">Roth IRA Parameters</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Customize your savings & timeline</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors py-1 px-2.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
              title="Reset to default baseline"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          </div>

          {/* Age & Horizon Block */}
          <div className="grid grid-cols-2 gap-4">
            {/* Current Age */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Current Age
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={16}
                  max={75}
                  value={inputs.currentAge || ""}
                  onChange={(e) => updateNumericInput("currentAge", parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute right-3 top-2.5 text-xs text-zinc-400">Yrs</span>
              </div>
              <input
                type="range"
                min={18}
                max={70}
                value={inputs.currentAge}
                onChange={(e) => updateNumericInput("currentAge", parseInt(e.target.value))}
                className="w-full accent-emerald-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Retirement Age */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Target Retirement
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={inputs.currentAge + 1}
                  max={85}
                  value={inputs.retirementAge || ""}
                  onChange={(e) => updateNumericInput("retirementAge", parseInt(e.target.value) || 0)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute right-3 top-2.5 text-xs text-zinc-400">Yrs</span>
              </div>
              <input
                type="range"
                min={Math.max(35, inputs.currentAge + 1)}
                max={85}
                value={inputs.retirementAge}
                onChange={(e) => updateNumericInput("retirementAge", parseInt(e.target.value))}
                className="w-full accent-emerald-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Timeline pill */}
          <div className="flex items-center justify-between text-xs px-3.5 py-2 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-800 dark:text-emerald-300">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar size={13} className="text-emerald-600 dark:text-emerald-400" />
              Investment Horizon:
            </span>
            <span className="font-bold">{result.horizonYears} Years ({result.horizonYears * 12} Months)</span>
          </div>

          {/* Current Starting Balance */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                Current Starting Balance
              </label>
              <span className="font-bold text-zinc-900 dark:text-white font-mono">
                {formatCurrency(inputs.currentBalance)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-sm font-bold text-zinc-400">$</span>
              <input
                type="number"
                min={0}
                max={1000000}
                step={1000}
                value={inputs.currentBalance || ""}
                onChange={(e) => updateNumericInput("currentBalance", parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <input
              type="range"
              min={0}
              max={250000}
              step={1000}
              value={inputs.currentBalance}
              onChange={(e) => updateNumericInput("currentBalance", parseFloat(e.target.value))}
              className="w-full accent-emerald-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Monthly Contribution */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                Monthly Contribution
              </label>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-zinc-900 dark:text-white font-mono">
                  {formatCurrency(inputs.monthlyContribution)}/mo
                </span>
                <span className="text-[11px] text-zinc-500">
                  ({formatCurrency(annualContribution)}/yr)
                </span>
              </div>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-sm font-bold text-zinc-400">$</span>
              <input
                type="number"
                min={0}
                max={3000}
                step={25}
                value={inputs.monthlyContribution || ""}
                onChange={(e) => updateNumericInput("monthlyContribution", parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <input
              type="range"
              min={0}
              max={1500}
              step={25}
              value={inputs.monthlyContribution}
              onChange={(e) => updateNumericInput("monthlyContribution", parseFloat(e.target.value))}
              className="w-full accent-emerald-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
            />

            {/* Contribution Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
              {CONTRIBUTION_PRESETS.map((preset) => {
                const isSelected = inputs.monthlyContribution === preset.value;
                return (
                  <button
                    key={preset.label}
                    onClick={() => updateNumericInput("monthlyContribution", preset.value)}
                    type="button"
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all border ${
                      isSelected
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                        : "bg-zinc-50 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-emerald-500/50"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* IRS Limit Badge & Catch-up Note */}
            <div className="pt-1">
              {isOverIrsLimit ? (
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>
                    <strong>Exceeds standard IRS limit:</strong> Annualized to {formatCurrency(annualContribution)}, which is above the current statutory Roth IRA limit of {formatCurrency(result.irsAnnualLimit)}/yr. Excess could be directed to a standard brokerage or Backdoor Roth.
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/60 text-[11px] text-zinc-600 dark:text-zinc-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={13} className="text-emerald-500" />
                    IRS Annual Max ({result.isCatchUpEligible ? "Age 50+ Catch-Up" : "Under 50"}):
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                    {formatCurrency(result.irsAnnualLimit)}/yr ({formatCurrency(result.irsMonthlyLimit)}/mo)
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Expected Annual Return */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                Expected Annual Return (%)
              </label>
              <span className="font-bold text-zinc-900 dark:text-white font-mono">
                {formatPercent(inputs.annualReturn)}
              </span>
            </div>
            <div className="relative">
              <input
                type="number"
                min={1}
                max={20}
                step={0.1}
                value={inputs.annualReturn || ""}
                onChange={(e) => updateNumericInput("annualReturn", parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="absolute right-3.5 top-2.5 text-sm font-bold text-zinc-400">%</span>
            </div>
            <input
              type="range"
              min={2}
              max={14}
              step={0.1}
              value={inputs.annualReturn}
              onChange={(e) => updateNumericInput("annualReturn", parseFloat(e.target.value))}
              className="w-full accent-emerald-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
            />

            {/* Return Presets */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {RETURN_PRESETS.map((preset) => {
                const isSelected = inputs.annualReturn === preset.value;
                return (
                  <button
                    key={preset.label}
                    onClick={() => updateNumericInput("annualReturn", preset.value)}
                    type="button"
                    className={`py-1.5 px-2 rounded-lg text-left text-[11px] transition-all border ${
                      isSelected
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold"
                        : "bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                    }`}
                  >
                    <div className="font-semibold text-zinc-800 dark:text-zinc-200">{preset.label}</div>
                    <div className="text-[10px] text-zinc-400 truncate">{preset.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Taxable Comparison Parameters Accordion */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowTaxDetails(!showTaxDetails)}
              type="button"
              className="w-full flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-800/40 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                <Info size={14} className="text-teal-600 dark:text-teal-400" />
                <span>Brokerage Tax Benchmark Settings</span>
              </div>
              {showTaxDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showTaxDetails && (
              <div className="p-4 space-y-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-[11px]">
                  Standard taxable brokerage accounts suffer from annual dividend tax drag and capital gains taxes at retirement. Adjust your estimated bracket:
                </p>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Federal &amp; State Tax Bracket
                    </label>
                    <span className="font-bold text-zinc-900 dark:text-white font-mono">
                      {inputs.taxRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={42}
                    step={1}
                    value={inputs.taxRate}
                    onChange={(e) => updateNumericInput("taxRate", parseInt(e.target.value))}
                    className="w-full accent-teal-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400">
                    <span>12% (Lower)</span>
                    <span>24% (Standard)</span>
                    <span>37%+ (High Earner)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Results & Visuals (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* HERO PROJECTED NEST EGG CARD */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white p-6 sm:p-8 shadow-xl">
            {/* Background glowing flare */}
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/20">
                  <Sparkles size={13} className="text-amber-300" />
                  <span>Tax-Free Retirement Projection</span>
                </div>
                <div className="text-xs text-white/80 font-medium">
                  At Age {inputs.retirementAge} ({result.horizonYears} Years Out)
                </div>
              </div>

              <div>
                <div className="text-xs sm:text-sm text-white/80 font-medium uppercase tracking-wider mb-1">
                  Total Projected Roth Nest Egg (100% Tax-Free)
                </div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading">
                  {formatCurrency(result.rothEndingBalance)}
                </div>
              </div>

              {/* Breakdown Grid inside Hero */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-white/15">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <div className="text-[11px] text-white/70">Total Principal Invested</div>
                  <div className="text-base sm:text-lg font-bold font-mono">
                    {formatCurrency(result.totalPrincipal)}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <div className="text-[11px] text-white/70">Tax-Free Compound Growth</div>
                  <div className="text-base sm:text-lg font-bold text-emerald-200 font-mono">
                    +{formatCurrency(result.rothTotalGrowth)}
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <div className="text-[11px] text-white/70">Wealth Multiplier</div>
                  <div className="text-base sm:text-lg font-bold text-amber-200 font-mono">
                    {result.growthMultiple}x Return
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* THE "ROTH ADVANTAGE" TAX SAVINGS BOX */}
          <div className="bg-white dark:bg-zinc-900 border-2 border-emerald-500/30 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                    The &ldquo;Roth Advantage&rdquo; vs. Standard Brokerage
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Taxes legally avoided through Roth tax-free status
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Lifetime Taxes Saved</div>
                <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                  +{formatCurrency(result.lifetimeTaxesSaved)}
                </div>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Roth Card */}
              <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">
                    Roth IRA (Tax-Free)
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                    0% Future Tax
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-zinc-900 dark:text-white font-mono">
                  {formatCurrency(result.rothEndingBalance)}
                </div>
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                  Withdraw 100% of balance without paying a single dime in federal or state capital gains taxes.
                </p>
              </div>

              {/* Taxable Brokerage Card */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    Taxable Brokerage
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                    Taxes Drag Balance
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-zinc-700 dark:text-zinc-300 font-mono">
                  {formatCurrency(result.taxableEndingBalance)}
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Annual dividend taxes and capital gains liquidation leaves you with {formatCurrency(result.lifetimeTaxesSaved)} less net spendable cash.
                </p>
              </div>
            </div>
          </div>

          {/* VISUAL GROWTH CHART */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Portfolio Accumulation Trajectory
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Roth IRA (Tax-Free) vs. Taxable Brokerage vs. Total Principal
                </p>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center gap-3 text-[11px] text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Roth IRA</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span>Taxable</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
                  <span>Principal</span>
                </span>
              </div>
            </div>

            {/* SVG Area Chart */}
            <div className="relative w-full pt-1">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-52 sm:h-64 overflow-visible"
              >
                <defs>
                  <linearGradient id="rothGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                  const y = paddingY + innerH - pct * innerH;
                  const val = maxVal * pct;
                  return (
                    <g key={i}>
                      <line
                        x1={paddingX}
                        y1={y}
                        x2={svgWidth - paddingX}
                        y2={y}
                        stroke="currentColor"
                        className="text-zinc-200 dark:text-zinc-800"
                        strokeDasharray="3 3"
                        strokeWidth="1"
                      />
                      <text
                        x={paddingX - 6}
                        y={y + 3}
                        textAnchor="end"
                        className="text-[9px] fill-zinc-400 font-mono"
                      >
                        {val >= 1000000
                          ? `$${(val / 1000000).toFixed(1)}M`
                          : `$${Math.round(val / 1000)}k`}
                      </text>
                    </g>
                  );
                })}

                {/* Roth Area Fill */}
                <polygon points={rothAreaPath} fill="url(#rothGradient)" />

                {/* Principal Line */}
                <polyline
                  points={principalLineStr}
                  fill="none"
                  stroke="#a1a1aa"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Taxable Line */}
                <polyline
                  points={taxableLineStr}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                />

                {/* Roth IRA Line */}
                <polyline
                  points={rothPointsStr}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                />

                {/* Interactive cursor line & markers */}
                {hoveredPointIndex !== null && (
                  <g>
                    <line
                      x1={getX(hoveredPointIndex)}
                      y1={paddingY}
                      x2={getX(hoveredPointIndex)}
                      y2={paddingY + innerH}
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                    <circle
                      cx={getX(hoveredPointIndex)}
                      cy={getY(chartPoints[hoveredPointIndex].rothBalance)}
                      r="5"
                      fill="#10b981"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <circle
                      cx={getX(hoveredPointIndex)}
                      cy={getY(chartPoints[hoveredPointIndex].taxableBalance)}
                      r="4"
                      fill="#6366f1"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {/* Transparent hover target slices */}
                {chartPoints.map((_, idx) => {
                  const sliceW = innerW / chartPoints.length;
                  const x = getX(idx) - sliceW / 2;
                  return (
                    <rect
                      key={idx}
                      x={Math.max(paddingX, x)}
                      y={paddingY}
                      width={sliceW}
                      height={innerH}
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPointIndex(idx)}
                      onTouchStart={() => setHoveredPointIndex(idx)}
                    />
                  );
                })}
              </svg>

              {/* Active Hover Inspection Badge */}
              <div className="mt-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-900 dark:text-white font-heading">
                    {activePoint.label} (Year {activePoint.year})
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 font-mono text-[11px]">
                  <div>
                    <span className="text-zinc-400 mr-1">Principal:</span>
                    <span className="font-bold text-zinc-700 dark:text-zinc-300">
                      {formatCurrency(activePoint.totalPrincipal)}
                    </span>
                  </div>
                  <div>
                    <span className="text-indigo-400 mr-1">Taxable:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(activePoint.taxableBalance)}
                    </span>
                  </div>
                  <div>
                    <span className="text-emerald-500 mr-1">Roth:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(activePoint.rothBalance)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AMORTIZATION & MILESTONES TABLE */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Growth &amp; Tax-Exemption Milestones
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Year-by-year accumulation and compound tax advantage
                </p>
              </div>

              {/* View Toggle */}
              <div className="inline-flex rounded-xl bg-zinc-100 dark:bg-zinc-800 p-1 text-xs">
                <button
                  onClick={() => setScheduleView("milestones")}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    scheduleView === "milestones"
                      ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  Milestones (5 Yr)
                </button>
                <button
                  onClick={() => setScheduleView("all")}
                  className={`px-3 py-1 rounded-lg font-medium transition-all ${
                    scheduleView === "all"
                      ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  All Years ({result.milestones.length})
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="sticky top-0 bg-zinc-50 dark:bg-zinc-800/90 text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700 text-[11px] font-sans">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Age</th>
                    <th className="py-2.5 px-3 font-semibold">Year</th>
                    <th className="py-2.5 px-3 font-semibold">Principal</th>
                    <th className="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400">
                      Roth Balance
                    </th>
                    <th className="py-2.5 px-3 font-semibold text-indigo-600 dark:text-indigo-400">
                      Taxable Balance
                    </th>
                    <th className="py-2.5 px-3 font-semibold text-right text-emerald-600 dark:text-emerald-400">
                      Tax Advantage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px]">
                  {displayedMilestones.map((m) => {
                    const totalPrincipal = inputs.currentBalance + m.totalContributions;
                    return (
                      <tr
                        key={m.year}
                        className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors"
                      >
                        <td className="py-2.5 px-3 font-bold font-sans text-zinc-900 dark:text-white">
                          {m.age}
                        </td>
                        <td className="py-2.5 px-3 text-zinc-500">Yr {m.year}</td>
                        <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-300">
                          {formatCurrency(totalPrincipal)}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">
                          {formatCurrency(m.rothEndingBalance)}
                        </td>
                        <td className="py-2.5 px-3 text-indigo-600 dark:text-indigo-400">
                          {formatCurrency(m.taxableEndingBalance)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
                          +{formatCurrency(m.taxSavings)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Export Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <div className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Standard IRS Compounding Simulation</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySummary}
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Summary</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadCsv}
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                >
                  <Download size={14} />
                  <span>Download CSV</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
