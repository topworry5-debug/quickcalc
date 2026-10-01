"use client";

import React, { useState, useMemo } from "react";
import {
  DollarSign,
  Percent,
  Calendar,
  Layers,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  TrendingUp,
} from "lucide-react";
import {
  calculateCdGrowth,
  DEFAULT_CD_INPUTS,
  CdCalculatorInputs,
  CompoundFrequency,
  CD_TERM_PRESETS,
  TAX_BRACKET_OPTIONS,
  formatCurrency,
  formatPercent,
  generateCdCsv,
} from "@/lib/cdCalculator";

export default function CdCalculatorWidget() {
  const [inputs, setInputs] = useState<CdCalculatorInputs>(DEFAULT_CD_INPUTS);
  const [copied, setCopied] = useState(false);
  const [showPenaltyAccordion, setShowPenaltyAccordion] = useState(false);
  const [scheduleView, setScheduleView] = useState<"monthly" | "milestone">("milestone");
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const result = useMemo(() => {
    return calculateCdGrowth(inputs);
  }, [inputs]);

  const updateNumericInput = (key: keyof CdCalculatorInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [key]: isNaN(value) ? 0 : Math.max(0, value),
    }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_CD_INPUTS);
    setHoveredPointIndex(null);
  };

  const handleCopySummary = async () => {
    const text = `Certificate of Deposit (CD) Calculation (QuickCalc.cloud):
Initial Deposit: ${formatCurrency(result.initialDeposit)}
Annual Rate (APY): ${formatPercent(result.annualRate)}
Term: ${result.termMonths} Months (${result.termYears} Years)
Compounding: ${result.compoundFrequencyName}
Tax Bracket: ${inputs.taxBracket}%

Gross Maturity Balance: ${formatCurrency(result.grossMaturityBalance)}
Gross Interest Earned: ${formatCurrency(result.grossInterestEarned)}
Taxes Estimated: ${formatCurrency(result.taxAmount)}
Net Post-Tax Interest: ${formatCurrency(result.netInterestEarned)}
Net Maturity Value: ${formatCurrency(result.netMaturityBalance)}
Effective APY: ${formatPercent(result.effectiveApy, 3)}
Daily Earnings: ${formatCurrency(result.dailyEarnings)}/day`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadCsv = () => {
    const csvContent = generateCdCsv(result);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `QuickCalc_CD_Growth_${inputs.initialDeposit}_${inputs.annualPercentageYield}pct_${inputs.cdTermMonths}mo.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // SVG Chart Geometry
  const chartPoints = result.chartPoints;
  const chartWidth = 560;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 25;
  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingY * 2;

  const maxVal = Math.max(...chartPoints.map((p) => p.totalBalance), result.initialDeposit * 1.05);
  const minVal = result.initialDeposit * 0.98;
  const valRange = maxVal - minVal || 1;

  const points = chartPoints.map((pt, index) => {
    const x = paddingX + (index / (chartPoints.length - 1 || 1)) * innerWidth;
    const yTotal = paddingY + innerHeight - ((pt.totalBalance - minVal) / valRange) * innerHeight;
    const yPrincipal = paddingY + innerHeight - ((pt.principal - minVal) / valRange) * innerHeight;
    return { ...pt, x, yTotal, yPrincipal };
  });

  const totalLinePath = points.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.yTotal.toFixed(1)}`,
    ""
  );

  const baselineY = paddingY + innerHeight;
  const totalAreaPath = `${totalLinePath} L ${points[points.length - 1].x.toFixed(1)} ${baselineY} L ${points[0].x.toFixed(1)} ${baselineY} Z`;

  const principalLinePath = points.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.yPrincipal.toFixed(1)}`,
    ""
  );

  // Active hover point
  const activePt = hoveredPointIndex !== null ? points[hoveredPointIndex] : points[points.length - 1];

  // Schedule filtering (Milestone: start, quarters/years, end vs All months)
  const displayedSchedule = useMemo(() => {
    if (scheduleView === "monthly" || result.termMonths <= 12) {
      return result.schedule;
    }
    // Milestone filter: 3, 6, 12, 18, 24, 36, 48, 60 or every 6 months
    return result.schedule.filter(
      (s) =>
        s.month === 1 ||
        s.month === 3 ||
        s.month === 6 ||
        s.month % 12 === 0 ||
        s.month === result.termMonths
    );
  }, [result.schedule, scheduleView, result.termMonths]);

  return (
    <div className="w-full bg-base-card border border-surface-border rounded-3xl p-4 sm:p-8 shadow-xl">
      {/* Widget Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 mb-2">
            <Sparkles size={13} className="text-teal-600 dark:text-teal-400" />
            <span>2026 FDIC Yield &amp; Compound Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink">
            Certificate of Deposit (CD) Calculator
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            Simulate guaranteed compound CD returns, daily/monthly interest accrual, post-tax net income, and premature penalty costs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-surface-muted hover:bg-surface-border text-ink border border-surface-border transition-colors min-h-[40px]"
            title="Copy CD calculation summary"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            <span>{copied ? "Copied!" : "Copy Summary"}</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-surface-muted hover:bg-surface-border text-ink border border-surface-border transition-colors min-h-[40px]"
            title="Download full monthly growth schedule as CSV"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-surface-muted hover:bg-surface-border text-ink-muted hover:text-ink border border-surface-border transition-colors min-h-[40px]"
            title="Reset to defaults ($10,000, 4.5% APY, 1 Year)"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column SaaS Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Column: Control Center (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Deposit Amount Slider + Box */}
          <div className="bg-surface-muted/50 p-4 sm:p-5 rounded-2xl border border-surface-border space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="depositInput" className="text-sm font-bold text-ink flex items-center gap-2">
                <DollarSign size={16} className="text-teal-600 dark:text-teal-400" />
                <span>Initial Deposit</span>
              </label>
              <div className="relative w-36">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted font-bold text-sm">$</span>
                <input
                  id="depositInput"
                  type="number"
                  min="100"
                  max="2000000"
                  step="500"
                  value={inputs.initialDeposit || ""}
                  onChange={(e) => updateNumericInput("initialDeposit", parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-1.5 text-right font-mono font-bold text-sm bg-base-card border border-surface-border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="500"
              max="250000"
              step="500"
              value={Math.min(250000, inputs.initialDeposit)}
              onChange={(e) => updateNumericInput("initialDeposit", parseFloat(e.target.value))}
              aria-label="Initial deposit range slider"
              className="w-full accent-teal-600 h-2 bg-surface-border rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-ink-muted font-mono font-semibold">
              <span>$500</span>
              <span>$100k</span>
              <span>$250k (FDIC Max)</span>
            </div>
          </div>

          {/* APY / Interest Rate Slider + Box */}
          <div className="bg-surface-muted/50 p-4 sm:p-5 rounded-2xl border border-surface-border space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="apyInput" className="text-sm font-bold text-ink flex items-center gap-2">
                <Percent size={16} className="text-teal-600 dark:text-teal-400" />
                <span>Annual Percentage Yield (APY)</span>
              </label>
              <div className="relative w-28">
                <input
                  id="apyInput"
                  type="number"
                  min="0.1"
                  max="15"
                  step="0.05"
                  value={inputs.annualPercentageYield || ""}
                  onChange={(e) => updateNumericInput("annualPercentageYield", parseFloat(e.target.value))}
                  className="w-full pl-3 pr-7 py-1.5 text-right font-mono font-bold text-sm bg-base-card border border-surface-border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted font-bold text-xs">%</span>
              </div>
            </div>
            <input
              type="range"
              min="0.5"
              max="10.0"
              step="0.05"
              value={inputs.annualPercentageYield}
              onChange={(e) => updateNumericInput("annualPercentageYield", parseFloat(e.target.value))}
              aria-label="APY percentage slider"
              className="w-full accent-teal-600 h-2 bg-surface-border rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-ink-muted font-mono font-semibold">
              <span>1.0%</span>
              <span>4.5% (High Yield)</span>
              <span>8.0%+</span>
            </div>
          </div>

          {/* CD Term Selection with Quick-Pills */}
          <div className="bg-surface-muted/50 p-4 sm:p-5 rounded-2xl border border-surface-border space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-ink flex items-center gap-2">
                <Calendar size={16} className="text-teal-600 dark:text-teal-400" />
                <span>CD Term Duration</span>
              </label>
              <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-lg border border-teal-500/20">
                {inputs.cdTermMonths} Months ({(inputs.cdTermMonths / 12).toFixed(inputs.cdTermMonths % 12 === 0 ? 0 : 1)} Yr)
              </span>
            </div>

            {/* Term Preset Buttons */}
            <div className="grid grid-cols-5 gap-1.5">
              {CD_TERM_PRESETS.map((preset) => {
                const isActive = inputs.cdTermMonths === preset.months;
                return (
                  <button
                    key={preset.months}
                    type="button"
                    onClick={() => updateNumericInput("cdTermMonths", preset.months)}
                    className={`py-1.5 px-1 rounded-xl text-xs font-bold transition-all text-center min-h-[36px] ${
                      isActive
                        ? "bg-teal-600 text-white shadow-sm shadow-teal-500/20 scale-[1.03]"
                        : "bg-base-card hover:bg-surface-border text-ink border border-surface-border"
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Months Input */}
            <div className="pt-1 flex items-center justify-between gap-3 text-xs text-ink-muted">
              <span>Custom Months:</span>
              <input
                type="number"
                min="1"
                max="120"
                value={inputs.cdTermMonths}
                onChange={(e) => updateNumericInput("cdTermMonths", parseInt(e.target.value) || 1)}
                className="w-24 px-2 py-1 text-right font-mono font-bold text-xs bg-base-card border border-surface-border rounded-lg text-ink focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Compounding Frequency & Tax Bracket Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Compound Frequency Selector */}
            <div className="bg-surface-muted/50 p-4 rounded-2xl border border-surface-border space-y-2">
              <label htmlFor="frequencySelect" className="text-xs font-bold text-ink flex items-center gap-1.5">
                <Layers size={14} className="text-teal-600 dark:text-teal-400" />
                <span>Compounding</span>
              </label>
              <select
                id="frequencySelect"
                value={inputs.compoundFrequency}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    compoundFrequency: e.target.value as CompoundFrequency,
                  }))
                }
                className="w-full px-3 py-2 text-xs font-bold bg-base-card border border-surface-border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                <option value="daily">Daily (365 times/yr)</option>
                <option value="monthly">Monthly (12 times/yr)</option>
                <option value="quarterly">Quarterly (4 times/yr)</option>
                <option value="annually">Annually (1 time/yr)</option>
              </select>
              <span className="text-[10px] text-ink-muted block leading-tight">
                Most top banks compound monthly or daily.
              </span>
            </div>

            {/* Tax Bracket Selector */}
            <div className="bg-surface-muted/50 p-4 rounded-2xl border border-surface-border space-y-2">
              <label htmlFor="taxSelect" className="text-xs font-bold text-ink flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-indigo-600 dark:text-indigo-400" />
                <span>Tax Bracket</span>
              </label>
              <select
                id="taxSelect"
                value={inputs.taxBracket}
                onChange={(e) => updateNumericInput("taxBracket", parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-bold bg-base-card border border-surface-border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              >
                {TAX_BRACKET_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className="text-[10px] text-ink-muted block leading-tight">
                IRS taxes CD interest as ordinary income.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Metrics & Visuals (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Hero Maturity Card */}
          <div className="bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-cyan-500/10 border-2 border-teal-500/30 rounded-3xl p-6 sm:p-7 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                  Total Maturity Balance (Gross)
                </span>
                <div className="text-3xl sm:text-5xl font-mono font-extrabold text-ink tracking-tight mt-1">
                  {formatCurrency(result.grossMaturityBalance)}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs font-semibold text-ink-muted block">
                  Net Post-Tax Return ({inputs.taxBracket}% tax)
                </span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-teal-700 dark:text-teal-300">
                  {formatCurrency(result.netMaturityBalance)}
                </span>
              </div>
            </div>

            {/* Interest Breakdown Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-teal-500/20">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-muted block">
                  Gross Interest
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                  +{formatCurrency(result.grossInterestEarned)}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-muted block">
                  Estimated Taxes
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-rose-600 dark:text-rose-400 mt-0.5 block">
                  -{formatCurrency(result.taxAmount)}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-muted block">
                  Net Interest
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-teal-700 dark:text-teal-300 mt-0.5 block">
                  +{formatCurrency(result.netInterestEarned)}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-muted block">
                  Effective APY
                </span>
                <span className="text-sm sm:text-base font-mono font-bold text-ink mt-0.5 block">
                  {formatPercent(result.effectiveApy, 3)}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive SVG Growth Chart */}
          <div className="bg-base-card border border-surface-border rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-teal-600 dark:text-teal-400" />
                <h3 className="text-xs sm:text-sm font-bold text-ink uppercase tracking-wider">
                  Compounding Growth Curve (Principal vs Interest)
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-ink-muted">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600 inline-block" />
                  <span>Principal</span>
                </span>
                <span className="flex items-center gap-1.5 text-teal-700 dark:text-teal-300 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" />
                  <span>Total Value</span>
                </span>
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="relative w-full overflow-hidden pt-2">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-48 sm:h-56 select-none"
              >
                <defs>
                  <linearGradient id="cdGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.03" />
                  </linearGradient>
                </defs>

                {/* Horizontal Baseline Guidelines */}
                <line
                  x1={paddingX}
                  y1={baselineY}
                  x2={chartWidth - paddingX}
                  y2={baselineY}
                  stroke="currentColor"
                  strokeOpacity="0.15"
                  strokeDasharray="4 4"
                />

                {/* Shaded Area of Growth */}
                <path d={totalAreaPath} fill="url(#cdGrowthGradient)" />

                {/* Principal Line */}
                <path
                  d={principalLinePath}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                />

                {/* Total Balance Curve */}
                <path
                  d={totalLinePath}
                  fill="none"
                  stroke="#0d9488"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Interactive Points */}
                {points.map((pt, idx) => {
                  const isHovered = hoveredPointIndex === idx;
                  return (
                    <g
                      key={pt.month}
                      onMouseEnter={() => setHoveredPointIndex(idx)}
                      onMouseLeave={() => setHoveredPointIndex(null)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={pt.x}
                        cy={pt.yTotal}
                        r={isHovered ? 6 : 4}
                        fill={isHovered ? "#0d9488" : "#ffffff"}
                        stroke="#0d9488"
                        strokeWidth={isHovered ? 3 : 2}
                        className="transition-all duration-150"
                      />
                      {/* X-axis labels */}
                      <text
                        x={pt.x}
                        y={chartHeight - 4}
                        textAnchor="middle"
                        fontSize="10"
                        fill="currentColor"
                        opacity={isHovered ? 0.9 : 0.45}
                        className="font-mono select-none"
                      >
                        {pt.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Dynamic Hover Inspector Tooltip */}
              <div className="mt-2 p-3 rounded-xl bg-surface-muted/90 border border-surface-border text-xs flex flex-wrap items-center justify-between gap-3 font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink">{activePt.label}:</span>
                  <span className="text-ink font-semibold">
                    Balance: <strong className="text-teal-700 dark:text-teal-300">{formatCurrency(activePt.totalBalance)}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-4 text-ink-muted">
                  <span>
                    Accrued Interest:{" "}
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      +{formatCurrency(activePt.accumulatedInterest)}
                    </strong>
                  </span>
                  <span>
                    Post-Tax:{" "}
                    <strong className="text-ink">
                      {formatCurrency(activePt.netBalance)}
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Early Withdrawal Penalty Simulator (Accordion) */}
          <div className="border border-surface-border rounded-2xl bg-base-card overflow-hidden">
            <button
              type="button"
              onClick={() => setShowPenaltyAccordion((prev) => !prev)}
              className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-surface-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-ink flex items-center gap-2">
                    <span>Early Withdrawal Penalty Simulator</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
                      Premature Exit
                    </span>
                  </h3>
                  <p className="text-[11px] text-ink-muted mt-0.5">
                    What happens if you break this CD before maturity?
                  </p>
                </div>
              </div>
              <div className="p-1 rounded-lg bg-surface-muted text-ink-muted">
                {showPenaltyAccordion ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>

            {showPenaltyAccordion && (
              <div className="p-4 sm:p-5 pt-0 border-t border-surface-border space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {/* Exit Month Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold text-ink">
                      <span>Break CD at Month:</span>
                      <span className="text-amber-600 dark:text-amber-400 font-mono">
                        Month {result.penaltySimulation.withdrawalMonth}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max={Math.max(1, inputs.cdTermMonths - 1)}
                      step="1"
                      value={result.penaltySimulation.withdrawalMonth}
                      onChange={(e) => updateNumericInput("earlyWithdrawalMonth", parseInt(e.target.value))}
                      className="w-full accent-amber-600 h-2 bg-surface-border rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-ink-muted font-mono">
                      <span>Month 1</span>
                      <span>Month {Math.max(1, inputs.cdTermMonths - 1)}</span>
                    </div>
                  </div>

                  {/* Penalty Terms Preset (Days forfeited) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-ink block">
                      Bank Penalty Rule (Days of Interest):
                    </label>
                    <select
                      value={result.penaltySimulation.penaltyDays}
                      onChange={(e) =>
                        updateNumericInput("earlyWithdrawalPenaltyDays", parseInt(e.target.value))
                      }
                      className="w-full px-3 py-1.5 text-xs font-bold bg-surface-muted border border-surface-border rounded-xl text-ink"
                    >
                      <option value="30">30 Days (Minor Penalty)</option>
                      <option value="60">60 Days (Short-Term CD)</option>
                      <option value="90">90 Days (Standard 1-Year CD)</option>
                      <option value="180">180 Days (Standard 2-3 Year CD)</option>
                      <option value="270">270 Days (Long-Term CD)</option>
                      <option value="365">365 Days (1 Full Year Penalty)</option>
                    </select>
                  </div>
                </div>

                {/* Simulation Outcome Cards */}
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-ink-muted block">
                      Accrued Interest (Mo {result.penaltySimulation.withdrawalMonth})
                    </span>
                    <span className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1 block">
                      {formatCurrency(result.penaltySimulation.accruedInterestAtWithdrawal)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-ink-muted block">
                      Penalty ({result.penaltySimulation.penaltyDays} Days)
                    </span>
                    <span className="text-sm font-mono font-bold text-rose-600 dark:text-rose-400 mt-1 block">
                      -{formatCurrency(result.penaltySimulation.penaltyAmount)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-ink-muted block">
                      Net Early Payout
                    </span>
                    <span className="text-sm font-mono font-bold text-ink mt-1 block">
                      {formatCurrency(result.penaltySimulation.earlyCashOutValue)}
                    </span>
                  </div>
                </div>

                {result.penaltySimulation.principalErosion > 0 ? (
                  <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5">
                    <AlertTriangle size={14} />
                    <span>
                      Warning: The penalty exceeds accrued interest by{" "}
                      {formatCurrency(result.penaltySimulation.principalErosion)}, eroding your original principal.
                    </span>
                  </p>
                ) : (
                  <p className="text-xs text-ink-muted">
                    Your principal is preserved. You walk away with{" "}
                    <strong className="text-ink">
                      {formatCurrency(result.penaltySimulation.netInterestRetained)}
                    </strong>{" "}
                    in net retained interest instead of the full{" "}
                    <strong>{formatCurrency(result.grossInterestEarned)}</strong> maturity yield.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Schedule Trajectory Table */}
      <div className="mt-8 pt-6 border-t border-surface-border space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-heading font-bold text-ink flex items-center gap-2">
              <Calendar size={18} className="text-teal-600 dark:text-teal-400" />
              <span>Certificate of Deposit Growth Schedule</span>
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Month-by-month compounding timeline showing interest accumulated and estimated tax.
            </p>
          </div>

          {result.termMonths > 12 && (
            <div className="inline-flex p-1 bg-surface-muted rounded-xl border border-surface-border text-xs self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setScheduleView("milestone")}
                className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                  scheduleView === "milestone"
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Key Milestones
              </button>
              <button
                type="button"
                onClick={() => setScheduleView("monthly")}
                className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                  scheduleView === "monthly"
                    ? "bg-teal-600 text-white shadow-xs"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                All {result.termMonths} Months
              </button>
            </div>
          )}
        </div>

        <div className="border border-surface-border rounded-2xl overflow-hidden bg-base-card shadow-sm">
          <div className="overflow-x-auto max-h-80 scrollbar-thin">
            <table className="w-full text-left text-xs font-sans">
              <thead className="sticky top-0 bg-surface-muted border-b border-surface-border text-ink-muted">
                <tr>
                  <th className="py-2.5 px-4 font-bold">Timeline</th>
                  <th className="py-2.5 px-4 font-bold text-right">Starting Principal</th>
                  <th className="py-2.5 px-4 font-bold text-right text-emerald-600 dark:text-emerald-400">
                    Interest Added
                  </th>
                  <th className="py-2.5 px-4 font-bold text-right">Total Accrued</th>
                  <th className="py-2.5 px-4 font-bold text-right text-rose-600 dark:text-rose-400">
                    Est. Tax ({inputs.taxBracket}%)
                  </th>
                  <th className="py-2.5 px-4 font-bold text-right text-teal-600 dark:text-teal-400">
                    Ending Balance
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60 font-mono">
                {displayedSchedule.map((row) => (
                  <tr key={row.month} className="hover:bg-surface-muted/40 transition-colors">
                    <td className="py-2.5 px-4 font-sans font-medium text-ink">
                      {row.label}
                    </td>
                    <td className="py-2.5 px-4 text-right text-ink-muted">
                      {formatCurrency(row.startBalance)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      +{formatCurrency(row.interestEarned)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-medium text-ink">
                      {formatCurrency(row.accumulatedInterest)}
                    </td>
                    <td className="py-2.5 px-4 text-right text-rose-600 dark:text-rose-400">
                      -{formatCurrency(row.accumulatedTax)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-ink">
                      {formatCurrency(row.endBalance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
