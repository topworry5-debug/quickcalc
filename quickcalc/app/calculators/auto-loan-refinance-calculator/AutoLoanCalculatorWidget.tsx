"use client";

import React, { useState, useMemo } from "react";
import {
  Calendar,
  RotateCcw,
  Sparkles,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Car,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";
import {
  calculateAutoLoanRefinance,
  DEFAULT_AUTO_INPUTS,
  AutoLoanInputs,
  AUTO_TERM_PRESETS,
  formatCurrency,
  formatPercent,
  generateAutoLoanCsv,
} from "@/lib/autoLoanCalculator";

export default function AutoLoanCalculatorWidget() {
  const [inputs, setInputs] = useState<AutoLoanInputs>(DEFAULT_AUTO_INPUTS);
  const [copied, setCopied] = useState(false);
  const [showExtraAccordion, setShowExtraAccordion] = useState(false);
  const [scheduleView, setScheduleView] = useState<"milestones" | "all">("milestones");
  const [hoveredMonthIndex, setHoveredMonthIndex] = useState<number | null>(null);

  const result = useMemo(() => {
    return calculateAutoLoanRefinance(inputs);
  }, [inputs]);

  const updateNumericInput = (key: keyof AutoLoanInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [key]: isNaN(value) ? 0 : Math.max(0, value),
    }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_AUTO_INPUTS);
    setHoveredMonthIndex(null);
  };

  const handleCopySummary = async () => {
    const text = `Auto Loan Refinance Analysis (QuickCalc.cloud):
Current Loan: ${formatCurrency(inputs.currentLoanBalance)} at ${formatPercent(inputs.currentInterestRate)} (${inputs.remainingMonths} months left)
• Current Monthly Payment: ${formatCurrency(result.currentLoan.monthlyPayment)}/mo
• Current Remaining Interest: ${formatCurrency(result.currentLoan.totalInterestPaid)}

New Refinance Loan: at ${formatPercent(inputs.newInterestRate)} (${inputs.newLoanTerm} months)
• Refinance Fees: ${formatCurrency(inputs.refinanceFees)} (${inputs.includeFeesInLoan ? "Financed" : "Paid Upfront"})
• New Monthly Payment: ${formatCurrency(result.newLoan.monthlyPayment)}/mo
• New Total Interest: ${formatCurrency(result.newLoan.totalInterestPaid)}

KEY OUTCOMES:
• Monthly Savings: ${formatCurrency(result.monthlyPaymentSavings)}/mo
• Net Lifetime Savings: ${formatCurrency(result.netLifetimeSavings)}
• Break-Even Point: ${result.breakEvenMonths !== null ? `${result.breakEvenMonths} Months` : "N/A"}${
      result.acceleratedPayoff.hasExtraPayment
        ? `\n• Accelerated Payoff (+${formatCurrency(inputs.extraMonthlyPayment)}/mo): Saves ${result.acceleratedPayoff.monthsSaved} months & ${formatCurrency(result.acceleratedPayoff.interestSavedWithExtraPayment)} additional interest!`
        : ""
    }`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadCsv = () => {
    const csvContent = generateAutoLoanCsv(result);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `QuickCalc_Auto_Refinance_${inputs.currentLoanBalance}_${inputs.currentInterestRate}pct_to_${inputs.newInterestRate}pct.csv`
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

  const maxBalance = Math.max(result.currentLoan.balance, result.newLoan.balance) || 1;
  const baselineY = paddingY + innerHeight;

  const svgCoords = chartPoints.map((pt, index) => {
    const x = paddingX + (index / (chartPoints.length - 1 || 1)) * innerWidth;
    const yCurr = paddingY + innerHeight - (pt.currentBalance / maxBalance) * innerHeight;
    const yNew = paddingY + innerHeight - (pt.newBalance / maxBalance) * innerHeight;
    const yAcc = paddingY + innerHeight - (pt.acceleratedBalance / maxBalance) * innerHeight;
    return { ...pt, x, yCurr, yNew, yAcc };
  });

  const lineCurrPath = svgCoords.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.yCurr.toFixed(1)}`,
    ""
  );

  const lineNewPath = svgCoords.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.yNew.toFixed(1)}`,
    ""
  );

  const lineAccPath = svgCoords.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.yAcc.toFixed(1)}`,
    ""
  );

  const areaNewPath = `${lineNewPath} L ${svgCoords[svgCoords.length - 1].x.toFixed(1)} ${baselineY} L ${svgCoords[0].x.toFixed(1)} ${baselineY} Z`;

  const activePoint =
    hoveredMonthIndex !== null && hoveredMonthIndex < svgCoords.length
      ? svgCoords[hoveredMonthIndex]
      : svgCoords[Math.floor(svgCoords.length / 2)] || svgCoords[0];

  // Schedule filtering (Milestones vs All Months)
  const displayedSchedule = useMemo(() => {
    if (scheduleView === "all") {
      return result.schedule;
    }
    return result.schedule.filter(
      (s) =>
        s.month === 1 ||
        s.month === 6 ||
        s.month === 12 ||
        s.month === 24 ||
        s.month === 36 ||
        s.month === 48 ||
        s.month === 60 ||
        s.month === 72 ||
        s.month === result.schedule.length
    );
  }, [result.schedule, scheduleView]);

  return (
    <div className="w-full bg-base-card border border-surface-border rounded-3xl p-4 sm:p-8 shadow-xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 mb-2">
            <Sparkles size={13} className="text-teal-600 dark:text-teal-400" />
            <span>2026 Auto Refinance &amp; Payoff Suite</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink">
            Auto Loan Refinance &amp; Payoff Calculator
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            Compare your existing auto loan with new refinance offers, calculate exact break-even timing, and simulate early payoff.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-surface-muted hover:bg-surface-border text-ink border border-surface-border transition-colors min-h-[40px]"
            title="Copy auto loan refinance summary"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            <span>{copied ? "Copied!" : "Copy Summary"}</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-surface-muted hover:bg-surface-border text-ink border border-surface-border transition-colors min-h-[40px]"
            title="Download full monthly amortization schedule as CSV"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-surface-muted hover:bg-surface-border text-ink-muted hover:text-ink border border-surface-border transition-colors min-h-[40px]"
            title="Reset to defaults"
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
          {/* Current Loan Section Box */}
          <div className="border border-surface-border rounded-2xl bg-surface-muted/40 p-4 sm:p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-2">
              <Car size={16} className="text-blue-600 dark:text-blue-400" />
              <span>Current Auto Loan</span>
            </h3>

            {/* Current Balance */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="currentBalanceInput" className="text-xs font-bold text-ink">
                  Remaining Loan Balance
                </label>
                <div className="relative w-32">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted font-bold text-xs">$</span>
                  <input
                    id="currentBalanceInput"
                    type="number"
                    min="1000"
                    max="100000"
                    step="500"
                    value={inputs.currentLoanBalance || ""}
                    onChange={(e) => updateNumericInput("currentLoanBalance", parseFloat(e.target.value))}
                    className="w-full pl-6 pr-2 py-1 text-right font-mono font-bold text-xs bg-base-card border border-surface-border rounded-lg text-ink"
                  />
                </div>
              </div>
              <input
                type="range"
                min="3000"
                max="60000"
                step="500"
                value={inputs.currentLoanBalance}
                onChange={(e) => updateNumericInput("currentLoanBalance", parseFloat(e.target.value))}
                aria-label="Current loan balance slider"
                className="w-full accent-blue-600 h-1.5 bg-surface-border rounded-lg cursor-pointer"
              />
            </div>

            {/* Current Rate & Remaining Months */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="currentRateInput" className="text-[11px] font-bold text-ink">
                    Current APR
                  </label>
                  <span className="text-[10px] font-mono text-ink-muted">%</span>
                </div>
                <input
                  id="currentRateInput"
                  type="number"
                  min="1"
                  max="25"
                  step="0.25"
                  value={inputs.currentInterestRate || ""}
                  onChange={(e) => updateNumericInput("currentInterestRate", parseFloat(e.target.value))}
                  className="w-full px-2 py-1 text-right font-mono font-bold text-xs bg-base-card border border-surface-border rounded-lg text-ink"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="currentMonthsInput" className="text-[11px] font-bold text-ink">
                    Months Left
                  </label>
                  <span className="text-[10px] font-mono text-ink-muted">Mo</span>
                </div>
                <input
                  id="currentMonthsInput"
                  type="number"
                  min="6"
                  max="84"
                  step="1"
                  value={inputs.remainingMonths || ""}
                  onChange={(e) => updateNumericInput("remainingMonths", parseInt(e.target.value))}
                  className="w-full px-2 py-1 text-right font-mono font-bold text-xs bg-base-card border border-surface-border rounded-lg text-ink"
                />
              </div>
            </div>
          </div>

          {/* New Refinance Loan Section Box */}
          <div className="border-2 border-emerald-500/30 rounded-2xl bg-emerald-500/5 p-4 sm:p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <Sparkles size={16} className="text-emerald-600 dark:text-emerald-400" />
              <span>New Refinance Loan Offer</span>
            </h3>

            {/* New APR */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="newRateInput" className="text-xs font-bold text-ink">
                  New Refinance APR
                </label>
                <div className="relative w-24">
                  <input
                    id="newRateInput"
                    type="number"
                    min="1"
                    max="20"
                    step="0.1"
                    value={inputs.newInterestRate || ""}
                    onChange={(e) => updateNumericInput("newInterestRate", parseFloat(e.target.value))}
                    className="w-full pl-2 pr-5 py-1 text-right font-mono font-bold text-xs bg-base-card border border-surface-border rounded-lg text-ink"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-muted font-bold text-[10px]">%</span>
                </div>
              </div>
              <input
                type="range"
                min="2.0"
                max="15.0"
                step="0.1"
                value={inputs.newInterestRate}
                onChange={(e) => updateNumericInput("newInterestRate", parseFloat(e.target.value))}
                aria-label="New refinance APR slider"
                className="w-full accent-emerald-600 h-1.5 bg-surface-border rounded-lg cursor-pointer"
              />
            </div>

            {/* New Term Presets */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-ink">New Term (Months):</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">
                  {inputs.newLoanTerm} Mo ({(inputs.newLoanTerm / 12).toFixed(inputs.newLoanTerm % 12 === 0 ? 0 : 1)} Yr)
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {AUTO_TERM_PRESETS.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => updateNumericInput("newLoanTerm", term)}
                    className={`py-1 rounded-lg text-xs font-bold transition-all text-center min-h-[32px] ${
                      inputs.newLoanTerm === term
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-base-card hover:bg-surface-border text-ink border border-surface-border"
                    }`}
                  >
                    {term}m
                  </button>
                ))}
              </div>
            </div>

            {/* Refinance Fees & Financing Checkbox */}
            <div className="pt-2 border-t border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="feesInput" className="font-semibold text-ink">
                  Refinance / Title Fees:
                </label>
                <div className="relative w-24">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-ink-muted text-xs">$</span>
                  <input
                    id="feesInput"
                    type="number"
                    min="0"
                    step="25"
                    value={inputs.refinanceFees}
                    onChange={(e) => updateNumericInput("refinanceFees", parseFloat(e.target.value))}
                    className="w-full pl-5 pr-2 py-1 text-right font-mono text-xs bg-base-card border border-surface-border rounded-lg text-ink"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs text-ink-muted">
                <input
                  type="checkbox"
                  checked={inputs.includeFeesInLoan}
                  onChange={(e) =>
                    setInputs((prev) => ({
                      ...prev,
                      includeFeesInLoan: e.target.checked,
                    }))
                  }
                  className="rounded border-surface-border accent-emerald-600"
                />
                <span>Roll fees into new loan balance</span>
              </label>
            </div>
          </div>

          {/* Collapsible Accordion: Extra Monthly Payoff Strategy */}
          <div className="border border-surface-border rounded-2xl bg-base-card overflow-hidden">
            <button
              type="button"
              onClick={() => setShowExtraAccordion((prev) => !prev)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Zap size={16} className="text-amber-500" />
                <span className="text-xs sm:text-sm font-bold text-ink">
                  Extra Monthly Payoff Strategy (Accelerate Debt Freedom)
                </span>
              </div>
              <div className="p-1 rounded-lg bg-surface-muted text-ink-muted">
                {showExtraAccordion ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </div>
            </button>

            {showExtraAccordion && (
              <div className="p-4 pt-0 border-t border-surface-border space-y-3 animate-fade-in text-xs">
                <div className="space-y-2 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-ink">Extra Cash Toward Principal / Month:</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                      +{formatCurrency(inputs.extraMonthlyPayment)}/mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="25"
                    value={inputs.extraMonthlyPayment}
                    onChange={(e) => updateNumericInput("extraMonthlyPayment", parseFloat(e.target.value))}
                    aria-label="Extra monthly payment slider"
                    className="w-full accent-amber-500 h-1.5 bg-surface-border rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-ink-muted font-mono">
                    <span>$0 (Regular)</span>
                    <span>$100</span>
                    <span>$250</span>
                    <span>$500</span>
                  </div>
                </div>

                {inputs.extraMonthlyPayment > 0 && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                    <p className="font-bold text-amber-800 dark:text-amber-300">
                      Accelerated Outcome:
                    </p>
                    <p className="text-ink-muted">
                      Your car is paid off in{" "}
                      <strong className="text-ink">
                        {result.acceleratedPayoff.monthsToPayoff} months
                      </strong>{" "}
                      ({result.acceleratedPayoff.monthsSaved} months sooner), saving an additional{" "}
                      <strong className="text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(result.acceleratedPayoff.interestSavedWithExtraPayment)}
                      </strong>{" "}
                      in interest!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Hero Results & Visuals (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Hero Savings Card */}
          <div
            className={`p-6 sm:p-7 rounded-3xl border-2 relative overflow-hidden transition-all ${
              result.isRefinanceWorthwhile
                ? "bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border-emerald-500/30"
                : "bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-zinc-500/10 border-amber-500/30"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                  {result.isRefinanceWorthwhile ? (
                    <>
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span>Net Lifetime Refinance Savings</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle size={14} className="text-amber-500" />
                      <span>Refinance Trade-off Notice</span>
                    </>
                  )}
                </span>
                <div className="text-3xl sm:text-5xl font-mono font-extrabold text-ink tracking-tight mt-1">
                  {formatCurrency(result.netLifetimeSavings)}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs font-semibold text-ink-muted block">
                  Monthly Cash Flow Difference
                </span>
                <span
                  className={`text-xl sm:text-2xl font-mono font-bold ${
                    result.monthlyPaymentSavings >= 0
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {result.monthlyPaymentSavings >= 0 ? "+" : ""}
                  {formatCurrency(result.monthlyPaymentSavings)}
                  <span className="text-xs font-normal text-ink-muted"> /mo</span>
                </span>
              </div>
            </div>

            {/* Break-Even Verdict Callout */}
            <div className="mt-5 pt-4 border-t border-surface-border/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-teal-600 dark:text-teal-400 shrink-0" />
                <span>
                  <strong>Break-Even Period:</strong>{" "}
                  {result.breakEvenMonths !== null && result.breakEvenMonths > 0 ? (
                    <span className="text-teal-700 dark:text-teal-300 font-bold font-mono">
                      {result.breakEvenMonths} Months
                    </span>
                  ) : result.breakEvenMonths === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      Immediate (Zero fees)
                    </span>
                  ) : (
                    <span className="text-ink-muted">Does not break even with higher monthly payment</span>
                  )}
                </span>
              </div>

              <span className="text-[11px] text-ink-muted">
                {result.isRefinanceWorthwhile
                  ? "Recover fees quickly and retain long-term interest savings."
                  : "Consider shorter terms to avoid paying more overall."}
              </span>
            </div>
          </div>

          {/* Side-by-Side Current vs Refinance Loan Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Current Loan Card */}
            <div className="bg-base-card border-2 border-surface-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-surface-border pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-muted">
                    Current Terms
                  </span>
                  <h4 className="text-base font-bold text-ink">Original Auto Loan</h4>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-surface-muted text-ink border border-surface-border">
                  {formatPercent(inputs.currentInterestRate)}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-ink-muted block">
                  Current Monthly Payment
                </span>
                <span className="text-2xl font-mono font-extrabold text-ink mt-0.5 block">
                  {formatCurrency(result.currentLoan.monthlyPayment)}
                  <span className="text-xs font-normal text-ink-muted"> /mo</span>
                </span>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-surface-border/60 text-xs">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Remaining Interest:</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    {formatCurrency(result.currentLoan.totalInterestPaid)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Total Remaining Cost:</span>
                  <span className="font-mono font-bold text-ink">
                    {formatCurrency(result.currentLoan.totalCostOfLoan)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Remaining Term:</span>
                  <span className="font-mono text-ink-muted">
                    {inputs.remainingMonths} Months
                  </span>
                </div>
              </div>
            </div>

            {/* New Refinanced Loan Card */}
            <div className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-2 border-emerald-500/40 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    New Offer
                  </span>
                  <h4 className="text-base font-bold text-ink">Refinanced Loan</h4>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  {formatPercent(inputs.newInterestRate)}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-ink-muted block">
                  New Monthly Payment
                </span>
                <span className="text-2xl font-mono font-extrabold text-emerald-700 dark:text-emerald-300 mt-0.5 block">
                  {formatCurrency(result.newLoan.monthlyPayment)}
                  <span className="text-xs font-normal text-ink-muted"> /mo</span>
                </span>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-emerald-500/20 text-xs">
                <div className="flex justify-between">
                  <span className="text-ink-muted">New Total Interest:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(result.newLoan.totalInterestPaid)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">New Total Cost:</span>
                  <span className="font-mono font-bold text-ink">
                    {formatCurrency(result.newLoan.totalCostOfLoan)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">New Term:</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-300">
                    {inputs.newLoanTerm} Months
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive SVG Loan Balance Curve Chart */}
          <div className="bg-base-card border border-surface-border rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-teal-600 dark:text-teal-400" />
                <h4 className="text-xs sm:text-sm font-bold text-ink uppercase tracking-wider">
                  Remaining Auto Loan Balance Trajectory
                </h4>
              </div>
              <div className="flex items-center gap-3 text-xs flex-wrap">
                <span className="flex items-center gap-1.5 text-ink-muted">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                  <span>Current Loan</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span>Refinanced</span>
                </span>
                {inputs.extraMonthlyPayment > 0 && (
                  <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    <span>Accelerated</span>
                  </span>
                )}
              </div>
            </div>

            {/* SVG Visual Canvas */}
            <div className="relative w-full overflow-hidden pt-2">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-48 sm:h-56 select-none"
              >
                <defs>
                  <linearGradient id="autoRefinanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Baseline Guidelines */}
                <line
                  x1={paddingX}
                  y1={baselineY}
                  x2={chartWidth - paddingX}
                  y2={baselineY}
                  stroke="currentColor"
                  strokeOpacity="0.15"
                  strokeDasharray="4 4"
                />

                {/* Shaded Area under New Curve */}
                <path d={areaNewPath} fill="url(#autoRefinanceGradient)" />

                {/* Current Loan Curve (Blue) */}
                <path
                  d={lineCurrPath}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />

                {/* New Loan Curve (Emerald) */}
                <path
                  d={lineNewPath}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Accelerated Loan Curve (Amber) */}
                {inputs.extraMonthlyPayment > 0 && (
                  <path
                    d={lineAccPath}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )}

                {/* Interactive Points */}
                {svgCoords.map((pt, idx) => {
                  const isHovered = hoveredMonthIndex === idx;
                  return (
                    <g
                      key={pt.month}
                      onMouseEnter={() => setHoveredMonthIndex(idx)}
                      onMouseLeave={() => setHoveredMonthIndex(null)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx={pt.x}
                        cy={pt.yNew}
                        r={isHovered ? 5 : 3}
                        fill={isHovered ? "#10b981" : "#ffffff"}
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                      <text
                        x={pt.x}
                        y={chartHeight - 4}
                        textAnchor="middle"
                        fontSize="9"
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

              {/* Dynamic Hover Inspector */}
              <div className="mt-2 p-3 rounded-xl bg-surface-muted/90 border border-surface-border text-xs flex flex-wrap items-center justify-between gap-3 font-mono">
                <span className="font-bold text-ink">At Month {activePoint.month}:</span>
                <span className="text-blue-600 dark:text-blue-400">
                  Current: <strong>{formatCurrency(activePoint.currentBalance)}</strong>
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  Refinanced: <strong>{formatCurrency(activePoint.newBalance)}</strong>
                </span>
                {inputs.extraMonthlyPayment > 0 && (
                  <span className="text-amber-600 dark:text-amber-400">
                    Accelerated: <strong>{formatCurrency(activePoint.acceleratedBalance)}</strong>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amortization Schedule Table */}
      <div className="mt-8 pt-6 border-t border-surface-border space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-heading font-bold text-ink flex items-center gap-2">
              <Calendar size={18} className="text-teal-600 dark:text-teal-400" />
              <span>Auto Loan Comparison Schedule</span>
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Side-by-side monthly loan balance reduction and interest expense tracking.
            </p>
          </div>

          <div className="inline-flex p-1 bg-surface-muted rounded-xl border border-surface-border text-xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setScheduleView("milestones")}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                scheduleView === "milestones"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              Key Milestones
            </button>
            <button
              type="button"
              onClick={() => setScheduleView("all")}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                scheduleView === "all"
                  ? "bg-teal-600 text-white shadow-xs"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              All {result.schedule.length} Months
            </button>
          </div>
        </div>

        <div className="border border-surface-border rounded-2xl overflow-hidden bg-base-card shadow-sm">
          <div className="overflow-x-auto max-h-80 scrollbar-thin">
            <table className="w-full text-left text-xs font-sans">
              <thead className="sticky top-0 bg-surface-muted border-b border-surface-border text-ink-muted">
                <tr>
                  <th className="py-2.5 px-4 font-bold">Month</th>
                  <th className="py-2.5 px-4 font-bold text-right text-blue-600 dark:text-blue-400">
                    Current Balance
                  </th>
                  <th className="py-2.5 px-4 font-bold text-right text-blue-600 dark:text-blue-400">
                    Current Int. Paid
                  </th>
                  <th className="py-2.5 px-4 font-bold text-right text-emerald-600 dark:text-emerald-400">
                    Refinanced Balance
                  </th>
                  <th className="py-2.5 px-4 font-bold text-right text-emerald-600 dark:text-emerald-400">
                    Refinanced Int. Paid
                  </th>
                  {inputs.extraMonthlyPayment > 0 && (
                    <th className="py-2.5 px-4 font-bold text-right text-amber-600 dark:text-amber-400">
                      Accelerated Balance
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60 font-mono">
                {displayedSchedule.map((row) => (
                  <tr key={row.month} className="hover:bg-surface-muted/40 transition-colors">
                    <td className="py-2.5 px-4 font-sans font-medium text-ink">
                      Month {row.month}
                    </td>
                    <td className="py-2.5 px-4 text-right text-ink">
                      {formatCurrency(row.currentBalance)}
                    </td>
                    <td className="py-2.5 px-4 text-right text-rose-600 dark:text-rose-400">
                      {formatCurrency(row.currentInterestPaid)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-emerald-700 dark:text-emerald-300">
                      {formatCurrency(row.newBalance)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-medium text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(row.newInterestPaid)}
                    </td>
                    {inputs.extraMonthlyPayment > 0 && (
                      <td className="py-2.5 px-4 text-right font-bold text-amber-600 dark:text-amber-400">
                        {formatCurrency(row.acceleratedBalance)}
                      </td>
                    )}
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
