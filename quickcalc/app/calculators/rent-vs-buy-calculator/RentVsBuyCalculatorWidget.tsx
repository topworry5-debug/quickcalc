"use client";

import React, { useState, useMemo } from "react";
import {
  RotateCcw,
  Sparkles,
  Download,
  Copy,
  Check,
  Home,
  Building2,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  calculateRentVsBuy,
  DEFAULT_RENT_VS_BUY_INPUTS,
  RentVsBuyInputs,
  formatCurrency,
  formatPercent,
  generateRentVsBuyCsv,
} from "@/lib/rentVsBuyCalculator";

const HORIZON_PRESETS = [3, 5, 7, 10, 15, 30];

export default function RentVsBuyCalculatorWidget() {
  const [inputs, setInputs] = useState<RentVsBuyInputs>(DEFAULT_RENT_VS_BUY_INPUTS);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [scheduleView, setScheduleView] = useState<"milestones" | "all">("milestones");
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const result = useMemo(() => {
    return calculateRentVsBuy(inputs);
  }, [inputs]);

  const updateNumericInput = (key: keyof RentVsBuyInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [key]: isNaN(value) ? 0 : Math.max(0, value),
    }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_RENT_VS_BUY_INPUTS);
    setHoveredPointIndex(null);
  };

  const handleCopySummary = async () => {
    const text = `Rent vs. Buy Analysis (QuickCalc.cloud):
• Home Price: ${formatCurrency(inputs.homePrice)} (${inputs.downPaymentPercent}% down: ${formatCurrency(result.downPaymentAmount)})
• Mortgage Rate: ${formatPercent(inputs.interestRate)} (${inputs.loanTermYears} Yrs)
• Monthly Rent Benchmark: ${formatCurrency(inputs.monthlyRent)}/mo
• Time Horizon: ${inputs.yearsToStay} Years

VERDICT & KEY OUTCOMES:
• Winner: ${result.winnerText}
• Projected Buyer Net Worth: ${formatCurrency(result.finalBuyerNetWorth)} (Net Home Equity + Investments)
• Projected Renter Net Worth: ${formatCurrency(result.finalRenterNetWorth)} (Invested Capital & Monthly Savings)
• Break-Even Point: ${result.breakEvenText}
• Year 1 Cash Outflow: Buying ${formatCurrency(result.year1MonthlyBuyTotal)}/mo vs Renting ${formatCurrency(result.year1MonthlyRentTotal)}/mo

Simulate your custom numbers at: https://quickcalc.cloud/calculators/rent-vs-buy-calculator`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleDownloadCsv = () => {
    const csvData = generateRentVsBuyCsv(result);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `rent_vs_buy_comparison_${inputs.yearsToStay}yr_horizon.csv`);
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
    return result.milestones.filter(
      (m, idx) => m.year % 5 === 0 || idx === 0 || m.year === inputs.yearsToStay || idx === result.milestones.length - 1
    );
  }, [result.milestones, scheduleView, inputs.yearsToStay]);

  // Chart setup
  const chartPoints = result.chartPoints;
  const maxVal = Math.max(1000, ...chartPoints.map((p) => Math.max(p.buyerNetWorth, p.renterNetWorth)));
  const minVal = Math.min(0, ...chartPoints.map((p) => Math.min(p.buyerNetWorth, p.renterNetWorth)));
  const rangeVal = Math.max(1, maxVal - minVal);

  const svgWidth = 600;
  const svgHeight = 240;
  const paddingX = 45;
  const paddingY = 24;
  const innerW = svgWidth - paddingX * 2;
  const innerH = svgHeight - paddingY * 2;

  const getX = (idx: number) => {
    if (chartPoints.length <= 1) return paddingX + innerW / 2;
    return paddingX + (idx / (chartPoints.length - 1)) * innerW;
  };

  const getY = (val: number) => {
    return paddingY + innerH - ((val - minVal) / rangeVal) * innerH;
  };

  const buyerPointsStr = chartPoints.map((p, i) => `${getX(i)},${getY(p.buyerNetWorth)}`).join(" ");
  const buyerAreaPath = `${buyerPointsStr} L ${getX(chartPoints.length - 1)},${paddingY + innerH} L ${getX(0)},${paddingY + innerH} Z`;

  const renterPointsStr = chartPoints.map((p, i) => `${getX(i)},${getY(p.renterNetWorth)}`).join(" ");

  const activePoint = hoveredPointIndex !== null ? chartPoints[hoveredPointIndex] : chartPoints[chartPoints.length - 1];

  const isBuyWinner = result.winner === "buy";

  return (
    <div className="w-full space-y-8 font-sans">
      {/* 2-Column Responsive SaaS Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Controls & Sliders (5 cols) */}
        <div className="lg:col-span-5 space-y-6 bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-7 shadow-sm">
          <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Home size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">Property &amp; Rent Controls</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Configure purchase vs. rental costs</p>
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

          {/* Home Purchase Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                Home Purchase Price
              </label>
              <span className="font-bold text-zinc-900 dark:text-white font-mono">
                {formatCurrency(inputs.homePrice)}
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-sm font-bold text-zinc-400">$</span>
              <input
                type="number"
                min={50000}
                max={2500000}
                step={5000}
                value={inputs.homePrice || ""}
                onChange={(e) => updateNumericInput("homePrice", parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <input
              type="range"
              min={150000}
              max={1500000}
              step={10000}
              value={inputs.homePrice}
              onChange={(e) => updateNumericInput("homePrice", parseFloat(e.target.value))}
              className="w-full accent-teal-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Monthly Rent Benchmark */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                Comparable Monthly Rent
              </label>
              <span className="font-bold text-zinc-900 dark:text-white font-mono">
                {formatCurrency(inputs.monthlyRent)}/mo
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-sm font-bold text-zinc-400">$</span>
              <input
                type="number"
                min={300}
                max={15000}
                step={50}
                value={inputs.monthlyRent || ""}
                onChange={(e) => updateNumericInput("monthlyRent", parseFloat(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <input
              type="range"
              min={800}
              max={6000}
              step={50}
              value={inputs.monthlyRent}
              onChange={(e) => updateNumericInput("monthlyRent", parseFloat(e.target.value))}
              className="w-full accent-teal-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Down Payment % and Dollar Display */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                Down Payment ({inputs.downPaymentPercent}%)
              </label>
              <span className="font-bold text-zinc-900 dark:text-white font-mono">
                {formatCurrency(result.downPaymentAmount)}
              </span>
            </div>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={100}
                step={1}
                value={inputs.downPaymentPercent || ""}
                onChange={(e) => updateNumericInput("downPaymentPercent", parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <span className="absolute right-3.5 top-2.5 text-sm font-bold text-zinc-400">%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={inputs.downPaymentPercent}
              onChange={(e) => updateNumericInput("downPaymentPercent", parseFloat(e.target.value))}
              className="w-full accent-teal-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Mortgage Interest Rate & Loan Term */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Mortgage Rate (APR)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={2}
                  max={14}
                  step={0.125}
                  value={inputs.interestRate || ""}
                  onChange={(e) => updateNumericInput("interestRate", parseFloat(e.target.value) || 0)}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="absolute right-3 top-2.5 text-xs text-zinc-400">%</span>
              </div>
              <input
                type="range"
                min={3}
                max={10}
                step={0.125}
                value={inputs.interestRate}
                onChange={(e) => updateNumericInput("interestRate", parseFloat(e.target.value))}
                className="w-full accent-teal-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Mortgage Term
              </label>
              <select
                value={inputs.loanTermYears}
                onChange={(e) => updateNumericInput("loanTermYears", parseInt(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value={30}>30 Years Fixed</option>
                <option value={15}>15 Years Fixed</option>
                <option value={20}>20 Years Fixed</option>
              </select>
              <div className="text-[11px] text-zinc-500 pt-1">
                P&amp;I: {formatCurrency(result.monthlyMortgagePayment)}/mo
              </div>
            </div>
          </div>

          {/* Time Horizon (Years to Stay) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Calendar size={13} className="text-teal-600 dark:text-teal-400" />
                <span>Planned Stay Horizon</span>
              </label>
              <span className="font-bold text-zinc-900 dark:text-white font-mono">
                {inputs.yearsToStay} Years
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={inputs.yearsToStay}
              onChange={(e) => updateNumericInput("yearsToStay", parseInt(e.target.value))}
              className="w-full accent-teal-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
            />
            {/* Quick Horizon Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {HORIZON_PRESETS.map((yrs) => (
                <button
                  key={yrs}
                  onClick={() => updateNumericInput("yearsToStay", yrs)}
                  type="button"
                  className={`py-1 px-2.5 rounded-lg text-xs font-semibold transition-all border ${
                    inputs.yearsToStay === yrs
                      ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                      : "bg-zinc-50 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-teal-500/50"
                  }`}
                >
                  {yrs} Yrs
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Assumptions Accordion */}
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              type="button"
              className="w-full flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-800/40 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                <Info size={14} className="text-teal-600 dark:text-teal-400" />
                <span>Market Growth &amp; Homeownership Costs</span>
              </div>
              {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {showAdvanced && (
              <div className="p-4 space-y-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 text-xs">
                {/* Investment Return */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Renter Investment Return Rate (Index Funds)
                    </label>
                    <span className="font-bold text-zinc-900 dark:text-white font-mono">
                      {formatPercent(inputs.investmentReturnRate)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={12}
                    step={0.5}
                    value={inputs.investmentReturnRate}
                    onChange={(e) => updateNumericInput("investmentReturnRate", parseFloat(e.target.value))}
                    className="w-full accent-teal-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Home Appreciation Rate */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Home Value Annual Appreciation
                    </label>
                    <span className="font-bold text-zinc-900 dark:text-white font-mono">
                      {formatPercent(inputs.homeAppreciationRate)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={8}
                    step={0.25}
                    value={inputs.homeAppreciationRate}
                    onChange={(e) => updateNumericInput("homeAppreciationRate", parseFloat(e.target.value))}
                    className="w-full accent-teal-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Rent Inflation Rate */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Annual Rent Inflation
                    </label>
                    <span className="font-bold text-zinc-900 dark:text-white font-mono">
                      {formatPercent(inputs.rentInflationRate)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={7}
                    step={0.25}
                    value={inputs.rentInflationRate}
                    onChange={(e) => updateNumericInput("rentInflationRate", parseFloat(e.target.value))}
                    className="w-full accent-teal-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Property Tax Rate */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Property Tax Rate (% of home value/yr)
                    </label>
                    <span className="font-bold text-zinc-900 dark:text-white font-mono">
                      {formatPercent(inputs.propertyTaxRate)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0.3}
                    max={3.0}
                    step={0.1}
                    value={inputs.propertyTaxRate}
                    onChange={(e) => updateNumericInput("propertyTaxRate", parseFloat(e.target.value))}
                    className="w-full accent-teal-600 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Maintenance & Selling */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                      Maintenance (%/yr)
                    </label>
                    <input
                      type="number"
                      step={0.1}
                      value={inputs.maintenanceRate}
                      onChange={(e) => updateNumericInput("maintenanceRate", parseFloat(e.target.value) || 0)}
                      className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
                      Selling Costs (%)
                    </label>
                    <input
                      type="number"
                      step={0.5}
                      value={inputs.sellingCostRate}
                      onChange={(e) => updateNumericInput("sellingCostRate", parseFloat(e.target.value) || 0)}
                      className="w-full mt-1 p-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Results & Visuals (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* HERO WINNER CARD */}
          <div
            className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white shadow-xl transition-all ${
              isBuyWinner
                ? "bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-700"
                : "bg-gradient-to-br from-indigo-600 via-blue-600 to-slate-700"
            }`}
          >
            {/* Background glow */}
            <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/15 backdrop-blur-md border border-white/20">
                  <Sparkles size={13} className="text-amber-300" />
                  <span>{inputs.yearsToStay}-Year Financial Horizon Verdict</span>
                </div>
                <div className="text-xs text-white/80 font-medium font-mono">
                  Horizon: {inputs.yearsToStay} Years
                </div>
              </div>

              <div>
                <div className="text-xs sm:text-sm text-white/85 font-medium uppercase tracking-wider mb-1">
                  Net Worth Advantage
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading">
                  {isBuyWinner ? "Buying Wins" : "Renting Wins"} by {formatCurrency(result.netWorthAdvantage)}
                </div>
                <p className="text-xs sm:text-sm text-white/80 mt-1.5">
                  {result.winnerText}
                </p>
              </div>

              {/* Side-by-side comparison */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/15">
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 text-xs text-white/75 mb-1">
                    <Home size={14} />
                    <span>Buyer Net Worth</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono">
                    {formatCurrency(result.finalBuyerNetWorth)}
                  </div>
                  <div className="text-[10px] text-white/70 mt-0.5">
                    Net Equity after selling costs
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5 text-xs text-white/75 mb-1">
                    <Building2 size={14} />
                    <span>Renter Net Worth</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono">
                    {formatCurrency(result.finalRenterNetWorth)}
                  </div>
                  <div className="text-[10px] text-white/70 mt-0.5">
                    Invested down payment &amp; savings
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BREAK-EVEN CALLOUT & YEAR 1 MONTHLY CASH FLOW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Break-even box */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-400">
                <TrendingUp size={16} />
                <span>Break-Even Timeline</span>
              </div>
              <div className="text-xl font-extrabold text-zinc-900 dark:text-white font-heading">
                {result.breakEvenYear ? `Year ${result.breakEvenYear}` : "Over 30 Years"}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {result.breakEvenText}
              </p>
            </div>

            {/* Year 1 cash flow comparison */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-700 dark:text-zinc-300">
                  Year 1 Monthly Outflow
                </span>
                <span className="font-semibold text-zinc-500">
                  Diff: {formatCurrency(Math.abs(result.year1MonthlySavings))}/mo
                </span>
              </div>
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase">Buying Total</div>
                  <div className="text-base font-bold text-zinc-900 dark:text-white font-mono">
                    {formatCurrency(result.year1MonthlyBuyTotal)}/mo
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-zinc-400 uppercase">Renting Total</div>
                  <div className="text-base font-bold text-zinc-900 dark:text-white font-mono">
                    {formatCurrency(result.year1MonthlyRentTotal)}/mo
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-1 border-t border-zinc-100 dark:border-zinc-800">
                Includes P&amp;I, taxes, insurance, and maintenance.
              </div>
            </div>
          </div>

          {/* VISUAL NET WORTH COMPARISON CHART */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Net Worth Growth Comparison Trajectory
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Buyer Net Home Equity vs. Renter Invested Portfolio over time
                </p>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center gap-3 text-[11px] text-zinc-600 dark:text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                  <span>Buyer Net Worth</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span>Renter Portfolio</span>
                </span>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="relative w-full pt-1">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-52 sm:h-64 overflow-visible"
              >
                <defs>
                  <linearGradient id="buyerGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Horizontal reference grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                  const y = paddingY + innerH - pct * innerH;
                  const val = minVal + rangeVal * pct;
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

                {/* Buyer Area Fill */}
                <polygon points={buyerAreaPath} fill="url(#buyerGradient)" />

                {/* Renter Line */}
                <polyline
                  points={renterPointsStr}
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />

                {/* Buyer Line */}
                <polyline
                  points={buyerPointsStr}
                  fill="none"
                  stroke="#0d9488"
                  strokeWidth="3.5"
                />

                {/* Hover line & points */}
                {hoveredPointIndex !== null && (
                  <g>
                    <line
                      x1={getX(hoveredPointIndex)}
                      y1={paddingY}
                      x2={getX(hoveredPointIndex)}
                      y2={paddingY + innerH}
                      stroke="#0d9488"
                      strokeWidth="1.5"
                      strokeDasharray="2 2"
                    />
                    <circle
                      cx={getX(hoveredPointIndex)}
                      cy={getY(chartPoints[hoveredPointIndex].buyerNetWorth)}
                      r="5"
                      fill="#0d9488"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <circle
                      cx={getX(hoveredPointIndex)}
                      cy={getY(chartPoints[hoveredPointIndex].renterNetWorth)}
                      r="4.5"
                      fill="#6366f1"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {/* Hover targets */}
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

              {/* Active Hover Inspector */}
              <div className="mt-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="font-bold text-zinc-900 dark:text-white font-heading">
                  {activePoint.label}
                </div>
                <div className="flex flex-wrap items-center gap-4 font-mono text-[11px]">
                  <div>
                    <span className="text-teal-600 dark:text-teal-400 mr-1">Buyer:</span>
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {formatCurrency(activePoint.buyerNetWorth)}
                    </span>
                  </div>
                  <div>
                    <span className="text-indigo-500 mr-1">Renter:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(activePoint.renterNetWorth)}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-400 mr-1">Diff:</span>
                    <span
                      className={`font-bold ${
                        activePoint.buyerNetWorth >= activePoint.renterNetWorth
                          ? "text-teal-600 dark:text-teal-400"
                          : "text-indigo-600 dark:text-indigo-400"
                      }`}
                    >
                      {activePoint.buyerNetWorth >= activePoint.renterNetWorth ? "+" : "-"}
                      {formatCurrency(Math.abs(activePoint.buyerNetWorth - activePoint.renterNetWorth))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MILESTONE SCHEDULE TABLE */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Year-by-Year Net Worth Schedule
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Home equity accumulation vs. renter compounding investments
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
                  Milestones
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

            {/* Table */}
            <div className="overflow-x-auto max-h-80 overflow-y-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="sticky top-0 bg-zinc-50 dark:bg-zinc-800/90 text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700 text-[11px] font-sans">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Year</th>
                    <th className="py-2.5 px-3 font-semibold">Home Value</th>
                    <th className="py-2.5 px-3 font-semibold">Mortgage Bal</th>
                    <th className="py-2.5 px-3 font-semibold text-teal-600 dark:text-teal-400">
                      Buyer Net Worth
                    </th>
                    <th className="py-2.5 px-3 font-semibold text-indigo-600 dark:text-indigo-400">
                      Renter Net Worth
                    </th>
                    <th className="py-2.5 px-3 font-semibold text-right">Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-[11px]">
                  {displayedMilestones.map((m) => {
                    const isBuyerAhead = m.winningOption === "buy";
                    return (
                      <tr
                        key={m.year}
                        className={`hover:bg-zinc-50/80 dark:hover:bg-zinc-800/50 transition-colors ${
                          m.year === inputs.yearsToStay ? "bg-teal-50/40 dark:bg-teal-950/20 font-semibold" : ""
                        }`}
                      >
                        <td className="py-2.5 px-3 font-bold font-sans text-zinc-900 dark:text-white">
                          Yr {m.year}
                          {m.year === inputs.yearsToStay && (
                            <span className="ml-1 text-[10px] text-teal-600 font-normal">(Horizon)</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-300">
                          {formatCurrency(m.homeValue)}
                        </td>
                        <td className="py-2.5 px-3 text-zinc-500">
                          {formatCurrency(m.remainingMortgage)}
                        </td>
                        <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">
                          {formatCurrency(m.buyerTotalNetWorth)}
                        </td>
                        <td className="py-2.5 px-3 text-indigo-600 dark:text-indigo-400">
                          {formatCurrency(m.renterTotalNetWorth)}
                        </td>
                        <td
                          className={`py-2.5 px-3 text-right font-bold ${
                            isBuyerAhead
                              ? "text-teal-600 dark:text-teal-400"
                              : "text-indigo-600 dark:text-indigo-400"
                          }`}
                        >
                          {isBuyerAhead ? "Buy +" : "Rent +"}
                          {formatCurrency(Math.abs(m.netDifference))}
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
                <CheckCircle2 size={14} className="text-teal-500" />
                <span>Simulated with Opportunity Cost &amp; Selling Fees</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySummary}
                  type="button"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-teal-500" />
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
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-sm transition-colors"
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
