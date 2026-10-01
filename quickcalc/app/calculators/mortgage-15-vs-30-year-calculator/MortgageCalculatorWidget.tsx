"use client";

import React, { useState, useMemo } from "react";
import {
  DollarSign,
  Percent,
  Calendar,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Home,
  PiggyBank,
  CheckCircle2,
} from "lucide-react";
import {
  calculateMortgageComparison,
  DEFAULT_MORTGAGE_INPUTS,
  MortgageInputs,
  formatMoney,
  formatPercent,
  generateMortgageCsv,
} from "@/lib/mortgageCalculator";

export default function MortgageCalculatorWidget() {
  const [inputs, setInputs] = useState<MortgageInputs>(DEFAULT_MORTGAGE_INPUTS);
  const [copied, setCopied] = useState(false);
  const [showEscrowAccordion, setShowEscrowAccordion] = useState(false);
  const [scheduleView, setScheduleView] = useState<"milestones" | "all">("milestones");
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Compute comparison engine results
  const result = useMemo(() => {
    return calculateMortgageComparison(inputs);
  }, [inputs]);

  const updateNumericInput = (key: keyof MortgageInputs, value: number) => {
    setInputs((prev) => {
      const next = { ...prev, [key]: isNaN(value) ? 0 : Math.max(0, value) };
      // Keep down payment and down payment percent synced if price or down payment changes
      if (key === "homePrice") {
        next.downPayment = (next.homePrice * next.downPaymentPercent) / 100;
      } else if (key === "downPayment") {
        next.downPaymentPercent = next.homePrice > 0 ? (next.downPayment / next.homePrice) * 100 : 0;
      }
      return next;
    });
  };

  const setDownPaymentByPercent = (percent: number) => {
    setInputs((prev) => ({
      ...prev,
      downPaymentPercent: percent,
      downPayment: (prev.homePrice * percent) / 100,
    }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_MORTGAGE_INPUTS);
    setHoveredYear(null);
  };

  const handleCopySummary = async () => {
    const text = `15-Year vs. 30-Year Mortgage Comparison (QuickCalc.cloud):
Home Price: ${formatMoney(inputs.homePrice)}
Down Payment: ${formatMoney(inputs.downPayment)} (${inputs.downPaymentPercent.toFixed(1)}%)
Loan Amount: ${formatMoney(result.loanAmount)}

30-Year Fixed (${formatPercent(inputs.interestRate30, 2)} APR):
• Monthly P&I: ${formatMoney(result.loan30.monthlyPrincipalInterest)}/mo
• Total Monthly (with Taxes & Ins): ${formatMoney(result.loan30.totalMonthlyPayment)}/mo
• Total Interest Paid: ${formatMoney(result.loan30.totalInterestPaid)}
• Total Loan Cost: ${formatMoney(result.loan30.totalCostOfLoan)}

15-Year Fixed (${formatPercent(inputs.interestRate15, 3)} APR):
• Monthly P&I: ${formatMoney(result.loan15.monthlyPrincipalInterest)}/mo
• Total Monthly (with Taxes & Ins): ${formatMoney(result.loan15.totalMonthlyPayment)}/mo
• Total Interest Paid: ${formatMoney(result.loan15.totalInterestPaid)}
• Total Loan Cost: ${formatMoney(result.loan15.totalCostOfLoan)}

KEY TAKEAWAYS:
• 15-Year saves ${formatMoney(result.totalInterestSavedBy15)} in lifetime interest!
• 15-Year pays off 15 years sooner!
• 30-Year saves ${formatMoney(result.monthlyPaymentDifference)}/mo in cash flow flexibility.`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadCsv = () => {
    const csvContent = generateMortgageCsv(result);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `QuickCalc_Mortgage_15vs30_${inputs.homePrice}_loan${result.loanAmount}.csv`
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

  const maxBalance = result.loanAmount || 1;
  const baselineY = paddingY + innerHeight;

  const svgCoords = chartPoints.map((pt, index) => {
    const x = paddingX + (index / (chartPoints.length - 1 || 1)) * innerWidth;
    const y30 = paddingY + innerHeight - (pt.balance30 / maxBalance) * innerHeight;
    const y15 = paddingY + innerHeight - (pt.balance15 / maxBalance) * innerHeight;
    return { ...pt, x, y30, y15 };
  });

  const line30Path = svgCoords.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.y30.toFixed(1)}`,
    ""
  );

  const line15Path = svgCoords.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? "M" : "L"} ${pt.x.toFixed(1)} ${pt.y15.toFixed(1)}`,
    ""
  );

  const area15Path = `${line15Path} L ${svgCoords[svgCoords.length - 1].x.toFixed(1)} ${baselineY} L ${svgCoords[0].x.toFixed(1)} ${baselineY} Z`;

  const activePoint = hoveredYear !== null ? svgCoords[hoveredYear] : svgCoords[15];

  // Schedule filtering (Milestones vs All 30 Years)
  const displayedSchedule = useMemo(() => {
    if (scheduleView === "all") {
      return result.schedule;
    }
    return result.schedule.filter(
      (s) =>
        s.year === 1 ||
        s.year === 3 ||
        s.year === 5 ||
        s.year === 7 ||
        s.year === 10 ||
        s.year === 15 ||
        s.year === 20 ||
        s.year === 25 ||
        s.year === 30
    );
  }, [result.schedule, scheduleView]);

  return (
    <div className="w-full bg-base-card border border-surface-border rounded-3xl p-4 sm:p-8 shadow-xl">
      {/* Widget Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 mb-2">
            <Sparkles size={13} className="text-teal-600 dark:text-teal-400" />
            <span>2026 Mortgage Amortization Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink">
            15-Year vs. 30-Year Mortgage Comparison
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            Compare monthly payments, total interest savings, equity buildup velocity, and investing opportunity costs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-surface-muted hover:bg-surface-border text-ink border border-surface-border transition-colors min-h-[40px]"
            title="Copy mortgage comparison summary"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            <span>{copied ? "Copied!" : "Copy Summary"}</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-surface-muted hover:bg-surface-border text-ink border border-surface-border transition-colors min-h-[40px]"
            title="Download full 30-year comparison schedule as CSV"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-surface-muted hover:bg-surface-border text-ink-muted hover:text-ink border border-surface-border transition-colors min-h-[40px]"
            title="Reset to defaults ($400,000, 20% down)"
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
          {/* Home Price Input + Slider */}
          <div className="bg-surface-muted/50 p-4 sm:p-5 rounded-2xl border border-surface-border space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="homePriceInput" className="text-sm font-bold text-ink flex items-center gap-2">
                <Home size={16} className="text-teal-600 dark:text-teal-400" />
                <span>Home Purchase Price</span>
              </label>
              <div className="relative w-36">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted font-bold text-sm">$</span>
                <input
                  id="homePriceInput"
                  type="number"
                  min="50000"
                  max="3000000"
                  step="10000"
                  value={inputs.homePrice || ""}
                  onChange={(e) => updateNumericInput("homePrice", parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-1.5 text-right font-mono font-bold text-sm bg-base-card border border-surface-border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="100000"
              max="1500000"
              step="10000"
              value={inputs.homePrice}
              onChange={(e) => updateNumericInput("homePrice", parseFloat(e.target.value))}
              aria-label="Home price range slider"
              className="w-full accent-teal-600 h-2 bg-surface-border rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-ink-muted font-mono font-semibold">
              <span>$100k</span>
              <span>$400k (US Median)</span>
              <span>$1.5M</span>
            </div>
          </div>

          {/* Down Payment Box + % Quick Presets */}
          <div className="bg-surface-muted/50 p-4 sm:p-5 rounded-2xl border border-surface-border space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="downPaymentInput" className="text-sm font-bold text-ink flex items-center gap-2">
                <DollarSign size={16} className="text-teal-600 dark:text-teal-400" />
                <span>Down Payment</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="relative w-28">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted font-bold text-xs">$</span>
                  <input
                    id="downPaymentInput"
                    type="number"
                    min="0"
                    max={inputs.homePrice}
                    step="5000"
                    value={Math.round(inputs.downPayment) || ""}
                    onChange={(e) => updateNumericInput("downPayment", parseFloat(e.target.value))}
                    className="w-full pl-6 pr-2 py-1.5 text-right font-mono font-bold text-xs bg-base-card border border-surface-border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div className="relative w-16">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={Math.round(inputs.downPaymentPercent) || ""}
                    onChange={(e) => setDownPaymentByPercent(parseFloat(e.target.value) || 0)}
                    aria-label="Down payment percentage"
                    className="w-full pl-2 pr-5 py-1.5 text-right font-mono font-bold text-xs bg-base-card border border-surface-border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-muted font-bold text-xs">%</span>
                </div>
              </div>
            </div>

            {/* Quick Down Payment Percent Buttons */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {[5, 10, 15, 20].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setDownPaymentByPercent(pct)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all text-center min-h-[36px] ${
                    Math.round(inputs.downPaymentPercent) === pct
                      ? "bg-teal-600 text-white shadow-xs scale-[1.02]"
                      : "bg-base-card hover:bg-surface-border text-ink border border-surface-border"
                  }`}
                >
                  {pct}% ({formatMoney((inputs.homePrice * pct) / 100)})
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs font-mono pt-1 text-ink-muted">
              <span>Loan Amount:</span>
              <strong className="text-ink font-bold">{formatMoney(result.loanAmount)}</strong>
            </div>
          </div>

          {/* Interest Rates Side-by-Side (30-Yr vs 15-Yr) */}
          <div className="bg-surface-muted/50 p-4 sm:p-5 rounded-2xl border border-surface-border space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              <Percent size={14} className="text-teal-600 dark:text-teal-400" />
              <span>Mortgage Interest Rates (Fixed APR)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 30-Year Rate */}
              <div className="bg-base-card p-3.5 rounded-xl border border-surface-border space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="rate30Input" className="text-xs font-bold text-ink">
                    30-Year Fixed APR
                  </label>
                  <div className="relative w-20">
                    <input
                      id="rate30Input"
                      type="number"
                      min="2.0"
                      max="15.0"
                      step="0.125"
                      value={inputs.interestRate30 || ""}
                      onChange={(e) => updateNumericInput("interestRate30", parseFloat(e.target.value))}
                      className="w-full pl-2 pr-6 py-1 text-right font-mono font-bold text-xs bg-surface-muted border border-surface-border rounded-lg text-ink focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-muted font-bold text-[10px]">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="10.0"
                  step="0.125"
                  value={inputs.interestRate30}
                  onChange={(e) => updateNumericInput("interestRate30", parseFloat(e.target.value))}
                  aria-label="30-year interest rate slider"
                  className="w-full accent-blue-600 h-1.5 bg-surface-border rounded-lg cursor-pointer"
                />
              </div>

              {/* 15-Year Rate */}
              <div className="bg-base-card p-3.5 rounded-xl border border-surface-border space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="rate15Input" className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                    15-Year Fixed APR
                  </label>
                  <div className="relative w-20">
                    <input
                      id="rate15Input"
                      type="number"
                      min="2.0"
                      max="15.0"
                      step="0.125"
                      value={inputs.interestRate15 || ""}
                      onChange={(e) => updateNumericInput("interestRate15", parseFloat(e.target.value))}
                      className="w-full pl-2 pr-6 py-1 text-right font-mono font-bold text-xs bg-surface-muted border border-surface-border rounded-lg text-ink focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-muted font-bold text-[10px]">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="3.0"
                  max="10.0"
                  step="0.125"
                  value={inputs.interestRate15}
                  onChange={(e) => updateNumericInput("interestRate15", parseFloat(e.target.value))}
                  aria-label="15-year interest rate slider"
                  className="w-full accent-emerald-600 h-1.5 bg-surface-border rounded-lg cursor-pointer"
                />
              </div>
            </div>
            <p className="text-[11px] text-ink-muted">
              15-year mortgages typically offer a <strong>0.50% to 0.75% lower</strong> interest rate than 30-year loans.
            </p>
          </div>

          {/* Optional Taxes, Insurance, and HOA Accordion */}
          <div className="border border-surface-border rounded-2xl bg-base-card overflow-hidden">
            <button
              type="button"
              onClick={() => setShowEscrowAccordion((prev) => !prev)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-surface-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-teal-600 dark:text-teal-400" />
                <span className="text-xs sm:text-sm font-bold text-ink">
                  Property Taxes, Insurance &amp; HOA (Optional)
                </span>
              </div>
              <div className="p-1 rounded-lg bg-surface-muted text-ink-muted">
                {showEscrowAccordion ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </div>
            </button>

            {showEscrowAccordion && (
              <div className="p-4 pt-0 border-t border-surface-border space-y-3 animate-fade-in text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                  <div className="space-y-1">
                    <label htmlFor="propTaxInput" className="text-ink font-semibold block">
                      Annual Property Tax
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted text-xs">$</span>
                      <input
                        id="propTaxInput"
                        type="number"
                        min="0"
                        step="100"
                        value={inputs.propertyTaxAnnual || ""}
                        onChange={(e) => updateNumericInput("propertyTaxAnnual", parseFloat(e.target.value))}
                        className="w-full pl-6 pr-2 py-1.5 text-right font-mono bg-surface-muted border border-surface-border rounded-lg text-ink"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="insInput" className="text-ink font-semibold block">
                      Annual Home Insurance
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted text-xs">$</span>
                      <input
                        id="insInput"
                        type="number"
                        min="0"
                        step="50"
                        value={inputs.homeInsuranceAnnual || ""}
                        onChange={(e) => updateNumericInput("homeInsuranceAnnual", parseFloat(e.target.value))}
                        className="w-full pl-6 pr-2 py-1.5 text-right font-mono bg-surface-muted border border-surface-border rounded-lg text-ink"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="hoaInput" className="text-ink font-semibold block">
                      Monthly HOA Dues
                    </label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted text-xs">$</span>
                      <input
                        id="hoaInput"
                        type="number"
                        min="0"
                        step="25"
                        value={inputs.hoaFeesMonthly || ""}
                        onChange={(e) => updateNumericInput("hoaFeesMonthly", parseFloat(e.target.value))}
                        className="w-full pl-6 pr-2 py-1.5 text-right font-mono bg-surface-muted border border-surface-border rounded-lg text-ink"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Side-by-Side Comparison Hub (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Key Difference Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border-2 border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 mb-1">
                <CheckCircle2 size={13} />
                <span>The 15-Year Advantage</span>
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-extrabold text-ink tracking-tight">
                Save {formatMoney(result.totalInterestSavedBy15)}
              </div>
              <p className="text-xs text-ink-muted mt-0.5">
                Choosing a 15-year term cuts your lifetime interest by{" "}
                <strong className="text-emerald-600 dark:text-emerald-400">
                  {result.percentInterestSaved}%
                </strong>{" "}
                and makes you mortgage-free 15 years faster.
              </p>
            </div>

            <div className="sm:text-right shrink-0 bg-base-card/80 p-3 rounded-xl border border-surface-border">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-muted block">
                Cash Flow Trade-off
              </span>
              <span className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                +{formatMoney(result.monthlyPaymentDifference)}/mo
              </span>
              <span className="text-[10px] text-ink-muted block">
                30-Yr saves this in cash flow
              </span>
            </div>
          </div>

          {/* Dual Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 30-Year Card */}
            <div className="bg-base-card border-2 border-surface-border hover:border-blue-500/40 rounded-2xl p-5 shadow-sm space-y-4 transition-all">
              <div className="flex items-center justify-between border-b border-surface-border pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Lower Payment
                  </span>
                  <h3 className="text-lg font-bold text-ink">30-Year Fixed</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                  {formatPercent(inputs.interestRate30, 2)}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-ink-muted block">
                  Monthly Principal &amp; Interest
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-ink mt-0.5 block">
                  {formatMoney(result.loan30.monthlyPrincipalInterest)}
                  <span className="text-xs font-normal text-ink-muted"> /mo</span>
                </span>
                {result.loan30.monthlyPropertyTax + result.loan30.monthlyHomeInsurance > 0 && (
                  <span className="text-[11px] text-ink-muted block mt-1">
                    Total with escrow: <strong>{formatMoney(result.loan30.totalMonthlyPayment)}/mo</strong>
                  </span>
                )}
              </div>

              <div className="space-y-2 pt-2 border-t border-surface-border/60 text-xs">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Total Interest Paid:</span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    {formatMoney(result.loan30.totalInterestPaid)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Total Principal + Interest:</span>
                  <span className="font-mono font-bold text-ink">
                    {formatMoney(result.loan30.totalPayments)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">50% Home Equity Milestone:</span>
                  <span className="font-mono font-semibold text-ink-muted">
                    Year {result.loan30.halfwayEquityYear}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Loan Payoff Year:</span>
                  <span className="font-mono font-bold text-ink">Year 30</span>
                </div>
              </div>
            </div>

            {/* 15-Year Card (Highlighted) */}
            <div className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border-2 border-emerald-500/40 rounded-2xl p-5 shadow-sm space-y-4 relative">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    Massive Savings
                  </span>
                  <h3 className="text-lg font-bold text-ink">15-Year Fixed</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  {formatPercent(inputs.interestRate15, 3)}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-ink-muted block">
                  Monthly Principal &amp; Interest
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-700 dark:text-emerald-300 mt-0.5 block">
                  {formatMoney(result.loan15.monthlyPrincipalInterest)}
                  <span className="text-xs font-normal text-ink-muted"> /mo</span>
                </span>
                {result.loan15.monthlyPropertyTax + result.loan15.monthlyHomeInsurance > 0 && (
                  <span className="text-[11px] text-ink-muted block mt-1">
                    Total with escrow: <strong>{formatMoney(result.loan15.totalMonthlyPayment)}/mo</strong>
                  </span>
                )}
              </div>

              <div className="space-y-2 pt-2 border-t border-emerald-500/20 text-xs">
                <div className="flex justify-between">
                  <span className="text-ink-muted">Total Interest Paid:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatMoney(result.loan15.totalInterestPaid)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Total Principal + Interest:</span>
                  <span className="font-mono font-bold text-ink">
                    {formatMoney(result.loan15.totalPayments)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">50% Home Equity Milestone:</span>
                  <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-300">
                    Year {result.loan15.halfwayEquityYear} (Fast!)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-muted">Loan Payoff Year:</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">
                    Year 15 (Debt Free!)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive SVG Loan Balance Amortization Chart */}
          <div className="bg-base-card border border-surface-border rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-teal-600 dark:text-teal-400" />
                <h3 className="text-xs sm:text-sm font-bold text-ink uppercase tracking-wider">
                  Remaining Loan Balance Over Time (15 vs 30 Years)
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                  <span>30-Yr Balance</span>
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  <span>15-Yr Balance</span>
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
                  <linearGradient id="mortgage15Gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
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

                {/* Shaded Area under 15-year curve */}
                <path d={area15Path} fill="url(#mortgage15Gradient)" />

                {/* 30-Year Balance Curve (Blue) */}
                <path
                  d={line30Path}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* 15-Year Balance Curve (Emerald) */}
                <path
                  d={line15Path}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Interactive Points */}
                {svgCoords.map((pt) => {
                  const isHovered = hoveredYear === pt.year;
                  const isKeyYear = pt.year === 0 || pt.year === 15 || pt.year === 30;
                  return (
                    <g
                      key={pt.year}
                      onMouseEnter={() => setHoveredYear(pt.year)}
                      onMouseLeave={() => setHoveredYear(null)}
                      className="cursor-pointer"
                    >
                      {/* 30-Yr point */}
                      <circle
                        cx={pt.x}
                        cy={pt.y30}
                        r={isHovered ? 5 : isKeyYear ? 3.5 : 2}
                        fill={isHovered ? "#3b82f6" : "#ffffff"}
                        stroke="#3b82f6"
                        strokeWidth="2"
                      />
                      {/* 15-Yr point */}
                      {pt.year <= 15 && (
                        <circle
                          cx={pt.x}
                          cy={pt.y15}
                          r={isHovered ? 5 : isKeyYear ? 3.5 : 2}
                          fill={isHovered ? "#10b981" : "#ffffff"}
                          stroke="#10b981"
                          strokeWidth="2"
                        />
                      )}
                      {/* X-axis labels at Year 0, 5, 10, 15, 20, 25, 30 */}
                      {pt.year % 5 === 0 && (
                        <text
                          x={pt.x}
                          y={chartHeight - 4}
                          textAnchor="middle"
                          fontSize="10"
                          fill="currentColor"
                          opacity={isHovered ? 0.9 : 0.5}
                          className="font-mono select-none"
                        >
                          {pt.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Dynamic Hover Inspector */}
              <div className="mt-2 p-3 rounded-xl bg-surface-muted/90 border border-surface-border text-xs flex flex-wrap items-center justify-between gap-3 font-mono">
                <span className="font-bold text-ink">At Year {activePoint.year}:</span>
                <span className="text-blue-600 dark:text-blue-400">
                  30-Yr Balance: <strong>{formatMoney(activePoint.balance30)}</strong>
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  15-Yr Balance: <strong>{formatMoney(activePoint.balance15)}</strong>
                </span>
                <span className="text-ink-muted">
                  Equity Difference:{" "}
                  <strong className="text-ink">
                    {formatMoney(Math.abs(activePoint.balance30 - activePoint.balance15))}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* The Smart Opportunity Cost / Investing Alternative Box */}
          <div className="border border-surface-border rounded-2xl bg-base-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
                <PiggyBank size={20} />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-ink flex items-center gap-2">
                  <span>The &ldquo;Invest the Difference&rdquo; Opportunity Cost Model</span>
                </h3>
                <p className="text-xs text-ink-muted mt-0.5">
                  What happens if you take the 30-year loan and invest the {formatMoney(result.monthlyPaymentDifference)}/mo savings?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div className="p-4 rounded-xl bg-surface-muted/70 border border-surface-border space-y-2">
                <span className="font-bold text-blue-600 dark:text-blue-400 block uppercase tracking-wider text-[10px]">
                  Strategy A: 30-Yr + Invest Difference
                </span>
                <p className="text-ink-muted leading-relaxed">
                  Invest <strong className="text-ink">{formatMoney(result.opportunityCost.monthlyDifference)}/mo</strong> into an S&amp;P 500 index fund at an assumed {inputs.investmentReturnRate}% annual return for 30 years:
                </p>
                <div className="pt-1">
                  <span className="text-lg font-mono font-extrabold text-blue-600 dark:text-blue-400 block">
                    {formatMoney(result.opportunityCost.strategy30InvestValue)}
                  </span>
                  <span className="text-[10px] text-ink-muted">
                    Total Contributed: {formatMoney(result.opportunityCost.strategy30TotalContributed)} • Compound Gain: {formatMoney(result.opportunityCost.strategy30CompoundGain)}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface-muted/70 border border-surface-border space-y-2">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block uppercase tracking-wider text-[10px]">
                  Strategy B: 15-Yr + Invest After Payoff
                </span>
                <p className="text-ink-muted leading-relaxed">
                  Pay off your home in 15 years, then invest your entire <strong className="text-ink">{formatMoney(result.loan15.monthlyPrincipalInterest)}/mo</strong> payment from Years 16 to 30 at {inputs.investmentReturnRate}%:
                </p>
                <div className="pt-1">
                  <span className="text-lg font-mono font-extrabold text-emerald-600 dark:text-emerald-400 block">
                    {formatMoney(result.opportunityCost.strategy15InvestValue)}
                  </span>
                  <span className="text-[10px] text-ink-muted">
                    Total Contributed: {formatMoney(result.opportunityCost.strategy15TotalContributed)} • Compound Gain: {formatMoney(result.opportunityCost.strategy15CompoundGain)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-ink-muted flex items-center justify-between border-t border-surface-border/60">
              <span>Assumed Annual Return:</span>
              <div className="flex items-center gap-1.5">
                {[6, 7, 8, 10].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => updateNumericInput("investmentReturnRate", rate)}
                    className={`px-2 py-0.5 rounded-lg font-mono font-bold text-xs transition-colors ${
                      inputs.investmentReturnRate === rate
                        ? "bg-indigo-600 text-white"
                        : "bg-surface-muted text-ink hover:bg-surface-border"
                    }`}
                  >
                    {rate}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Year-by-Year Amortization Schedule Table */}
      <div className="mt-8 pt-6 border-t border-surface-border space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-heading font-bold text-ink flex items-center gap-2">
              <Calendar size={18} className="text-teal-600 dark:text-teal-400" />
              <span>Comparative Amortization Schedule</span>
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Side-by-side annual balance reduction, interest expense, and home equity milestones.
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
              All 30 Years
            </button>
          </div>
        </div>

        <div className="border border-surface-border rounded-2xl overflow-hidden bg-base-card shadow-sm">
          <div className="overflow-x-auto max-h-80 scrollbar-thin">
            <table className="w-full text-left text-xs font-sans">
              <thead className="sticky top-0 bg-surface-muted border-b border-surface-border text-ink-muted">
                <tr>
                  <th className="py-2.5 px-4 font-bold">Year</th>
                  <th className="py-2.5 px-4 font-bold text-right text-blue-600 dark:text-blue-400">
                    30-Yr Balance
                  </th>
                  <th className="py-2.5 px-4 font-bold text-right text-blue-600 dark:text-blue-400">
                    30-Yr Cum. Interest
                  </th>
                  <th className="py-2.5 px-4 font-bold text-right text-emerald-600 dark:text-emerald-400">
                    15-Yr Balance
                  </th>
                  <th className="py-2.5 px-4 font-bold text-right text-emerald-600 dark:text-emerald-400">
                    15-Yr Cum. Interest
                  </th>
                  <th className="py-2.5 px-4 font-bold text-right text-teal-600 dark:text-teal-400">
                    15-Yr Equity Lead
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/60 font-mono">
                {displayedSchedule.map((row) => {
                  const equityLead = Math.max(0, row.balance30 - row.balance15);
                  return (
                    <tr key={row.year} className="hover:bg-surface-muted/40 transition-colors">
                      <td className="py-2.5 px-4 font-sans font-medium text-ink">
                        Year {row.year}
                      </td>
                      <td className="py-2.5 px-4 text-right text-ink">
                        {formatMoney(row.balance30)}
                      </td>
                      <td className="py-2.5 px-4 text-right text-rose-600 dark:text-rose-400">
                        {formatMoney(row.cumulativeInterest30)}
                      </td>
                      <td className="py-2.5 px-4 text-right font-bold text-emerald-700 dark:text-emerald-300">
                        {formatMoney(row.balance15)}
                      </td>
                      <td className="py-2.5 px-4 text-right font-medium text-emerald-600 dark:text-emerald-400">
                        {formatMoney(row.cumulativeInterest15)}
                      </td>
                      <td className="py-2.5 px-4 text-right font-bold text-teal-700 dark:text-teal-300">
                        +{formatMoney(equityLead)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
