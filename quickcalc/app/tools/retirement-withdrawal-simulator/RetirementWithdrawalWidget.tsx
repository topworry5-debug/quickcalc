"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  SimulationConfig,
  SimulationSummary,
  runRetirementSimulation,
  formatCurrency,
  getSimulationExplanationSteps,
} from "@/lib/calculators/retirementWithdrawalCalculator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import ShareResultButton from "@/components/ShareResultButton";
import ShareResultModal from "@/components/ShareResultModal";
import { useCalculatorUrlState } from "@/hooks/useCalculatorUrlState";
import {
  TrendingUp,
  ShieldAlert,
  Sliders,
  DollarSign,
  Calendar,
  PieChart,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function RetirementWithdrawalWidget() {
  const [initialPortfolio, setInitialPortfolio] = useState<number>(1000000);
  const [useWithdrawalRate, setUseWithdrawalRate] = useState<boolean>(true);
  const [initialWithdrawal, setInitialWithdrawal] = useState<number>(40000);
  const [withdrawalRatePercent, setWithdrawalRatePercent] = useState<number>(4.0);
  const [durationYears, setDurationYears] = useState<number>(30);
  const [stockAllocationPct, setStockAllocationPct] = useState<number>(60);
  const [adjustForInflation, setAdjustForInflation] = useState<boolean>(true);

  const [result, setResult] = useState<SimulationSummary | null>(null);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Hydrate from URL query parameters
  const onHydrate = useCallback((sp: URLSearchParams) => {
    const p = sp.get("p");
    if (p) setInitialPortfolio(parseFloat(p) || 1000000);

    const r = sp.get("r");
    if (r) setWithdrawalRatePercent(parseFloat(r) || 4.0);

    const y = sp.get("y");
    if (y) setDurationYears(parseInt(y, 10) || 30);

    const s = sp.get("s");
    if (s) setStockAllocationPct(parseInt(s, 10) || 60);
  }, []);

  useCalculatorUrlState(
    {
      p: initialPortfolio !== 1000000 ? initialPortfolio.toString() : undefined,
      r: withdrawalRatePercent !== 4.0 ? withdrawalRatePercent.toString() : undefined,
      y: durationYears !== 30 ? durationYears.toString() : undefined,
      s: stockAllocationPct !== 60 ? stockAllocationPct.toString() : undefined,
    },
    onHydrate
  );

  const config: SimulationConfig = useMemo(
    () => ({
      initialPortfolio,
      initialWithdrawal,
      useWithdrawalRate,
      withdrawalRatePercent,
      durationYears,
      stockAllocationPct,
      adjustForInflation,
    }),
    [
      initialPortfolio,
      initialWithdrawal,
      useWithdrawalRate,
      withdrawalRatePercent,
      durationYears,
      stockAllocationPct,
      adjustForInflation,
    ]
  );

  // Synchronous calculation
  useEffect(() => {
    const res = runRetirementSimulation(config);
    setResult(res);
  }, [config]);

  const handleDownloadPdf = () => {
    if (!result) return;
    const actualWd = useWithdrawalRate
      ? (initialPortfolio * withdrawalRatePercent) / 100
      : initialWithdrawal;

    generatePdf({
      toolName: "Retirement Safe Withdrawal Backtest Report",
      toolSlug: "retirement-withdrawal-simulator",
      inputs: [
        { label: "Starting Portfolio", value: formatCurrency(initialPortfolio) },
        { label: "Initial Withdrawal", value: `${formatCurrency(actualWd)} (${((actualWd / initialPortfolio) * 100).toFixed(1)}%)` },
        { label: "Retirement Duration", value: `${durationYears} Years` },
        { label: "Asset Allocation", value: `${stockAllocationPct}% Stocks / ${100 - stockAllocationPct}% Bonds` },
        { label: "Inflation Adjustments", value: adjustForInflation ? "Enabled (CPI)" : "Disabled" },
      ],
      results: [
        { label: "Historical Success Rate", value: `${result.successRatePct.toFixed(1)}%`, isHighlight: true },
        { label: "Surviving Periods", value: `${result.successfulSequences} of ${result.totalSequences} Historical Sequences` },
        { label: "Median Ending Portfolio", value: formatCurrency(result.medianEndingBalance) },
        { label: "Worst Starting Year", value: `${result.worstSequence.startYear} (${formatCurrency(result.worstSequence.endingBalance)})` },
        { label: "Best Starting Year", value: `${result.bestSequence.startYear} (${formatCurrency(result.bestSequence.endingBalance)})` },
      ],
      summaryNote: "Simulated across 96 years of US stock, bond, and CPI historical market data (1928-2023).",
      filename: `Retirement-Withdrawal-Backtest-${durationYears}Yrs.pdf`,
    });
  };

  const handleCopy = async () => {
    if (!result) return;
    const text = `Retirement Withdrawal Backtest Results:\n• Starting Portfolio: ${formatCurrency(initialPortfolio)}\n• Historical Success Rate: ${result.successRatePct.toFixed(1)}% (${result.successfulSequences}/${result.totalSequences} Periods)\n• Median Ending Wealth: ${formatCurrency(result.medianEndingBalance)}\n• Worst Period: ${result.worstSequence.startYear}\n• Best Period: ${result.bestSequence.startYear}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  const explanationSteps = useMemo(
    () => (result ? getSimulationExplanationSteps(config, result) : []),
    [config, result]
  );

  // SVG Chart Trajectory Data Calculation
  const chartData = useMemo(() => {
    if (!result || result.sequences.length === 0) return null;

    let globalMaxBalance = initialPortfolio;
    result.sequences.forEach((seq) => {
      seq.yearlyBalances.forEach((bal) => {
        if (bal > globalMaxBalance) globalMaxBalance = bal;
      });
    });

    const svgWidth = 600;
    const svgHeight = 240;
    const padding = { top: 20, right: 20, bottom: 30, left: 60 };

    const plotW = svgWidth - padding.left - padding.right;
    const plotH = svgHeight - padding.top - padding.bottom;

    const getX = (yearIdx: number) =>
      padding.left + (yearIdx / durationYears) * plotW;
    const getY = (bal: number) =>
      padding.top + plotH - (Math.max(0, bal) / globalMaxBalance) * plotH;

    const paths = result.sequences.map((seq) => {
      const d = seq.yearlyBalances
        .map((bal, idx) => `${idx === 0 ? "M" : "L"} ${getX(idx).toFixed(1)} ${getY(bal).toFixed(1)}`)
        .join(" ");

      let color = "rgba(148, 163, 184, 0.25)"; // Standard gray overlay
      let strokeWidth = 1;
      let zIndex = 1;

      if (seq.startYear === result.worstSequence.startYear) {
        color = "#e11d48"; // Rose red for worst
        strokeWidth = 2.5;
        zIndex = 3;
      } else if (seq.startYear === result.bestSequence.startYear) {
        color = "#10b981"; // Emerald green for best
        strokeWidth = 2.5;
        zIndex = 3;
      } else if (seq.startYear === result.sequences[Math.floor(result.sequences.length / 2)].startYear) {
        color = "#6366f1"; // Indigo for median
        strokeWidth = 2.5;
        zIndex = 2;
      }

      return { d, color, strokeWidth, zIndex, startYear: seq.startYear };
    });

    // Sort paths so highlighted ones draw last
    paths.sort((a, b) => a.zIndex - b.zIndex);

    return { svgWidth, svgHeight, padding, plotW, plotH, paths, globalMaxBalance, getX, getY };
  }, [result, durationYears, initialPortfolio]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-indigo-800 p-6 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
          <TrendingUp size={14} className="text-emerald-300" />
          <span>Historical Backtest Simulator</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Retirement Safe Withdrawal Rate Simulator
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-lg mx-auto">
          Simulate your retirement withdrawal strategy against 96 years of US stock, bond, and CPI inflation market history (1928–2023).
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Input Parameters Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Column 1: Financial Amounts & Horizon */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <DollarSign size={15} className="text-emerald-600" />
              <span>Capital &amp; Withdrawal Inputs</span>
            </h4>

            {/* Starting Portfolio Value */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 flex justify-between">
                <span>Starting Retirement Portfolio ($)</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-extrabold">
                  {formatCurrency(initialPortfolio)}
                </span>
              </label>
              <input
                type="number"
                min={50000}
                max={10000000}
                step={50000}
                value={initialPortfolio}
                onChange={(e) => setInitialPortfolio(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3 text-zinc-900 dark:text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Withdrawal Mode Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  Withdrawal Specification Mode
                </label>
                <div className="flex rounded-lg bg-zinc-100 dark:bg-zinc-800 p-0.5 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setUseWithdrawalRate(true)}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      useWithdrawalRate
                        ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    Rate %
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseWithdrawalRate(false)}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      !useWithdrawalRate
                        ? "bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    Fixed $
                  </button>
                </div>
              </div>

              {useWithdrawalRate ? (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-600 dark:text-zinc-400">Withdrawal Rate (%)</span>
                    <span className="font-mono font-bold text-teal-600 dark:text-teal-400">{withdrawalRatePercent.toFixed(1)}% / yr</span>
                  </div>
                  <input
                    type="range"
                    min={2.0}
                    max={10.0}
                    step={0.1}
                    value={withdrawalRatePercent}
                    onChange={(e) => setWithdrawalRatePercent(parseFloat(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
                  />
                  <span className="text-[11px] font-mono text-zinc-500 block">
                    Initial Year 1 Withdrawal = {formatCurrency((initialPortfolio * withdrawalRatePercent) / 100)}
                  </span>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Annual Dollar Withdrawal ($)</label>
                  <input
                    type="number"
                    min={5000}
                    max={500000}
                    step={2500}
                    value={initialWithdrawal}
                    onChange={(e) => setInitialWithdrawal(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2.5 text-zinc-900 dark:text-white text-xs font-mono focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-[11px] font-mono text-zinc-500 block">
                    Equivalent Withdrawal Rate = {((initialWithdrawal / (initialPortfolio || 1)) * 100).toFixed(2)}%
                  </span>
                </div>
              )}
            </div>

            {/* Retirement Horizon Duration */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                  <Calendar size={14} className="text-indigo-600" />
                  <span>Retirement Duration</span>
                </label>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{durationYears} Years</span>
              </div>
              <input
                type="range"
                min={15}
                max={45}
                step={1}
                value={durationYears}
                onChange={(e) => setDurationYears(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
              />
            </div>
          </div>

          {/* Column 2: Allocation & Inflation Controls */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <Sliders size={15} className="text-teal-600" />
              <span>Asset Allocation &amp; Inflation Rules</span>
            </h4>

            {/* Stock vs Bond Allocation Split Slider */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-700 dark:text-emerald-400">{stockAllocationPct}% Stocks (S&amp;P 500)</span>
                <span className="text-indigo-700 dark:text-indigo-400">{100 - stockAllocationPct}% Bonds (10-Yr Treasury)</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={stockAllocationPct}
                onChange={(e) => setStockAllocationPct(parseInt(e.target.value, 10))}
                className="w-full accent-teal-600 cursor-pointer h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-semibold">
                <span>0% Stocks (100% Bonds)</span>
                <span>60/40 Classic</span>
                <span>100% Stocks</span>
              </div>
            </div>

            {/* Annual Inflation Adjustment Toggle */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">
                  Adjust Annual Withdrawals for CPI Inflation
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">
                  Increases annual payout every year by historical inflation rate.
                </span>
              </div>
              <input
                type="checkbox"
                checked={adjustForInflation}
                onChange={(e) => setAdjustForInflation(e.target.checked)}
                className="w-5 h-5 accent-emerald-600 cursor-pointer rounded"
              />
            </div>

            {/* Disclaimer Callout Box */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-300">
                <ShieldAlert size={14} className="shrink-0" />
                <span>Educational Backtest Disclaimer</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                This simulator uses simplified US historical asset return data (1928–2023) for educational backtesting. It does not account for investment management fees, taxes, or future market shifts. This tool is not personalized financial advice.
              </p>
            </div>
          </div>
        </div>

        {/* Results Overview Cards */}
        {result && (
          <div className="space-y-6 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: Success Rate */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 text-center space-y-1 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                  Historical Success Rate
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span
                    className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${
                      result.successRatePct >= 90
                        ? "text-emerald-600 dark:text-emerald-400"
                        : result.successRatePct >= 75
                        ? "text-amber-600 dark:text-amber-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {result.successRatePct.toFixed(1)}%
                  </span>
                </div>
                <span className="text-[11px] text-zinc-500 font-medium block">
                  {result.successfulSequences} of {result.totalSequences} historical sequences survived
                </span>
              </div>

              {/* Card 2: Median Ending Wealth */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 text-center space-y-1 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                  Median Ending Wealth
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-900 dark:text-white block">
                  {formatCurrency(result.medianEndingBalance)}
                </span>
                <span className="text-[11px] text-zinc-500 font-medium block">
                  50th percentile historical outcome after {durationYears} years
                </span>
              </div>

              {/* Card 3: Worst Starting Period */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 text-center space-y-1 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                  Worst Historical Start
                </span>
                <span className="text-xl sm:text-2xl font-extrabold font-mono text-rose-600 dark:text-rose-400 block">
                  {result.worstSequence.startYear}
                </span>
                <span className="text-[11px] text-zinc-500 font-medium block">
                  {result.worstSequence.isSuccess
                    ? `Lowest ending balance: ${formatCurrency(result.worstSequence.endingBalance)}`
                    : `Depleted in year ${result.worstSequence.failedYear}`}
                </span>
              </div>
            </div>

            {/* Trajectory Overlaid SVG Line Chart */}
            {chartData && (
              <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                    <PieChart size={15} className="text-emerald-600" />
                    <span>Portfolio Trajectory Across All Historical Rolling Windows</span>
                  </span>
                  <div className="flex items-center gap-3 text-[11px] font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                      Best ({result.bestSequence.startYear})
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" />
                      Median
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                      Worst ({result.worstSequence.startYear})
                    </span>
                  </div>
                </div>

                {/* SVG Canvas Container */}
                <div className="w-full overflow-x-auto">
                  <svg
                    viewBox={`0 0 ${chartData.svgWidth} ${chartData.svgHeight}`}
                    className="w-full h-auto min-w-[500px]"
                  >
                    {/* Horizontal Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
                      const y = chartData.padding.top + chartData.plotH * (1 - pct);
                      const val = chartData.globalMaxBalance * pct;
                      return (
                        <g key={idx}>
                          <line
                            x1={chartData.padding.left}
                            y1={y}
                            x2={chartData.svgWidth - chartData.padding.right}
                            y2={y}
                            stroke="currentColor"
                            className="text-zinc-200 dark:text-zinc-800"
                            strokeDasharray="3 3"
                          />
                          <text
                            x={chartData.padding.left - 6}
                            y={y + 3}
                            textAnchor="end"
                            fontSize="9"
                            fill="currentColor"
                            className="text-zinc-400 dark:text-zinc-500 font-mono"
                          >
                            {formatCurrency(val)}
                          </text>
                        </g>
                      );
                    })}

                    {/* X-axis labels (Years) */}
                    {[0, Math.floor(durationYears / 2), durationYears].map((yrIdx, idx) => {
                      const x = chartData.getX(yrIdx);
                      return (
                        <text
                          key={idx}
                          x={x}
                          y={chartData.svgHeight - 8}
                          textAnchor="middle"
                          fontSize="9"
                          fill="currentColor"
                          className="text-zinc-500 font-mono"
                        >
                          Year {yrIdx}
                        </text>
                      );
                    })}

                    {/* Render Paths */}
                    {chartData.paths.map((pathObj, idx) => (
                      <path
                        key={idx}
                        d={pathObj.d}
                        fill="none"
                        stroke={pathObj.color}
                        strokeWidth={pathObj.strokeWidth}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    ))}
                  </svg>
                </div>
              </div>
            )}

            {/* Reciprocal Cross-Linking Banner */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-teal-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <span className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-teal-600" />
                  <span>Planning for Retirement Wealth Accumulation?</span>
                </span>
                <p className="text-zinc-600 dark:text-zinc-400 text-[11px]">
                  Calculate compound investment growth prior to retirement using our free tools.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link
                  href="/tools/savings-growth-calculator"
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Savings Growth Calculator</span>
                  <ArrowRight size={12} />
                </Link>
                <Link
                  href="/tools/retirement-calculator"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Retirement Savings</span>
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <DownloadPdfButton onClick={handleDownloadPdf} />

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? "Copied Results!" : "Copy Backtest Summary"}</span>
          </button>

          <ShareResultButton onClick={() => setIsShareModalOpen(true)} />
        </div>

        {/* Step-by-Step Explanation Accordion */}
        <ExplainResultAccordion steps={explanationSteps} />
      </div>

      {/* Share Modal */}
      <ShareResultModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        data={{
          toolName: "Retirement Safe Withdrawal Rate Simulator",
          toolSlug: "retirement-withdrawal-simulator",
          category: "Finance & Wealth Modeling",
          resultValue: result ? `${result.successRatePct.toFixed(1)}% Success Rate` : "",
          resultLabel: "Historical Survival Rate (96-Yr US Market Dataset)",
          inputsSummary: [
            { label: "Portfolio", value: formatCurrency(initialPortfolio) },
            { label: "Duration", value: `${durationYears} Years` },
            { label: "Allocation", value: `${stockAllocationPct}% Stocks` },
          ],
          queryParams: {
            p: initialPortfolio.toString(),
            r: withdrawalRatePercent.toString(),
            y: durationYears.toString(),
            s: stockAllocationPct.toString(),
          },
        }}
      />
    </div>
  );
}
