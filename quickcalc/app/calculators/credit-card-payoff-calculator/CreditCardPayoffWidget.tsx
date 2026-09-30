"use client";

import React, { useState, useMemo, useRef, useCallback } from "react";
import { useCalculatorUrlState } from "@/hooks/useCalculatorUrlState";
import {
  calculateCreditCardPayoff,
  DEFAULT_CREDIT_CARD_INPUTS,
  CreditCardPayoffResult,
  formatCurrency,
  formatCurrencyExact,
  generatePayoffCSV,
} from "@/lib/calculators/creditCardPayoffCalculator";
import {
  CreditCard,
  DollarSign,
  Percent,
  TrendingDown,
  Sparkles,
  Download,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Zap,
  Clock,
  ShieldAlert,
} from "lucide-react";

export default function CreditCardPayoffWidget() {

  // Primary Input States
  const [balance, setBalance] = useState<number>(DEFAULT_CREDIT_CARD_INPUTS.balance);
  const [apr, setApr] = useState<number>(DEFAULT_CREDIT_CARD_INPUTS.apr);
  const [mode, setMode] = useState<"payment" | "time">(DEFAULT_CREDIT_CARD_INPUTS.mode);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(DEFAULT_CREDIT_CARD_INPUTS.monthlyPayment);
  const [targetMonths, setTargetMonths] = useState<number>(DEFAULT_CREDIT_CARD_INPUTS.targetMonths);
  const [extraPayment, setExtraPayment] = useState<number>(0);

  // UI States
  const [showFullSchedule, setShowFullSchedule] = useState<boolean>(false);
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // SVG Chart ref for coordinate calculation
  const chartSvgRef = useRef<SVGSVGElement | null>(null);

  // Hydrate from URL query parameters
  const onHydrate = useCallback((sp: URLSearchParams) => {
    const b = sp.get("balance");
    if (b) setBalance(Math.max(100, Math.min(250000, Number(b))) || 8500);

    const a = sp.get("apr");
    if (a) setApr(Math.max(0, Math.min(50, Number(a))) || 22.99);

    const m = sp.get("mode");
    if (m === "payment" || m === "time") setMode(m);

    const p = sp.get("payment");
    if (p) setMonthlyPayment(Math.max(10, Math.min(20000, Number(p))) || 300);

    const t = sp.get("targetMonths");
    if (t) setTargetMonths(Math.max(1, Math.min(360, Number(t))) || 24);

    const ep = sp.get("extra");
    if (ep) setExtraPayment(Math.max(0, Math.min(5000, Number(ep))) || 0);
  }, []);

  useCalculatorUrlState(
    {
      balance: balance !== DEFAULT_CREDIT_CARD_INPUTS.balance ? balance.toString() : undefined,
      apr: apr !== DEFAULT_CREDIT_CARD_INPUTS.apr ? apr.toString() : undefined,
      mode: mode !== DEFAULT_CREDIT_CARD_INPUTS.mode ? mode : undefined,
      payment: monthlyPayment !== DEFAULT_CREDIT_CARD_INPUTS.monthlyPayment ? monthlyPayment.toString() : undefined,
      targetMonths: targetMonths !== DEFAULT_CREDIT_CARD_INPUTS.targetMonths ? targetMonths.toString() : undefined,
      extra: extraPayment > 0 ? extraPayment.toString() : undefined,
    },
    onHydrate
  );

  // Calculation Result
  const result: CreditCardPayoffResult = useMemo(() => {
    return calculateCreditCardPayoff({
      balance,
      apr,
      mode,
      monthlyPayment,
      targetMonths,
      extraPayment,
    });
  }, [balance, apr, mode, monthlyPayment, targetMonths, extraPayment]);

  // Handle CSV Download
  const handleDownloadCSV = () => {
    try {
      if (typeof window === "undefined" || !result.schedule.length) return;
      const csvContent = generatePayoffCSV(result.schedule);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `credit-card-payoff-schedule-${balance}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Failed to download CSV:", e);
    }
  };

  // Copy shareable summary
  const handleCopySummary = async () => {
    try {
      if (typeof window === "undefined") return;
      const summaryText = `💳 Credit Card Payoff Plan (${result.debtFreeDate}):
- Current Balance: ${formatCurrency(balance)}
- APR: ${apr}%
- Monthly Payment: ${formatCurrency(result.effectiveMonthlyPayment)}/mo
- Payoff Time: ${result.years > 0 ? `${result.years} yr ` : ""}${result.remainingMonths} mo (${result.totalMonths} total months)
- Total Interest: ${formatCurrency(result.totalInterestPaid)}
- Total Cost: ${formatCurrency(result.totalAmountPaid)}
Calculate yours at: ${window.location.href}`;

      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error("Failed to copy summary:", e);
    }
  };

  // Reset to defaults
  const handleReset = () => {
    setBalance(DEFAULT_CREDIT_CARD_INPUTS.balance);
    setApr(DEFAULT_CREDIT_CARD_INPUTS.apr);
    setMode(DEFAULT_CREDIT_CARD_INPUTS.mode);
    setMonthlyPayment(DEFAULT_CREDIT_CARD_INPUTS.monthlyPayment);
    setTargetMonths(DEFAULT_CREDIT_CARD_INPUTS.targetMonths);
    setExtraPayment(0);
  };

  // Chart Downsampling for visual smoothness
  const chartPoints = useMemo(() => {
    if (!result.schedule || result.schedule.length === 0) return [];
    const total = result.schedule.length;
    if (total <= 60) return result.schedule;
    const step = Math.ceil(total / 50);
    const sampled = result.schedule.filter((_, idx) => idx % step === 0);
    // Ensure final month is included
    if (sampled[sampled.length - 1].month !== result.schedule[total - 1].month) {
      sampled.push(result.schedule[total - 1]);
    }
    return sampled;
  }, [result.schedule]);

  // SVG Chart Geometry
  const svgWidth = 650;
  const svgHeight = 240;
  const padding = { top: 20, right: 25, bottom: 35, left: 55 };
  const innerWidth = svgWidth - padding.left - padding.right;
  const innerHeight = svgHeight - padding.top - padding.bottom;

  const maxVal = useMemo(() => {
    return Math.max(balance, result.totalInterestPaid, 1000) * 1.05;
  }, [balance, result.totalInterestPaid]);

  const maxMonths = useMemo(() => {
    return Math.max(result.totalMonths, 1);
  }, [result.totalMonths]);

  const pointCoordinates = useMemo(() => {
    return chartPoints.map((pt) => {
      const x = padding.left + (pt.month / maxMonths) * innerWidth;
      const yBalance = padding.top + innerHeight - (pt.remainingBalance / maxVal) * innerHeight;
      const yInterest = padding.top + innerHeight - (pt.totalInterestPaidSoFar / maxVal) * innerHeight;
      return { x, yBalance, yInterest, pt };
    });
  }, [chartPoints, maxMonths, maxVal, innerWidth, innerHeight, padding.left, padding.top]);

  const balanceAreaPath = useMemo(() => {
    if (pointCoordinates.length === 0) return "";
    const startX = padding.left;
    const startY = padding.top + innerHeight;
    const pathD = [`M ${startX} ${startY}`];

    // Initial point at month 0
    pathD.push(`L ${startX} ${padding.top + innerHeight - (balance / maxVal) * innerHeight}`);

    pointCoordinates.forEach((p) => {
      pathD.push(`L ${p.x.toFixed(1)} ${p.yBalance.toFixed(1)}`);
    });

    const lastX = pointCoordinates[pointCoordinates.length - 1].x;
    pathD.push(`L ${lastX.toFixed(1)} ${startY}`);
    pathD.push("Z");
    return pathD.join(" ");
  }, [pointCoordinates, balance, maxVal, innerHeight, padding.left, padding.top]);

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 sm:p-7 shadow-xl space-y-8 font-sans transition-colors">
      {/* Top Header & Mode Toggle Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <CreditCard className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Credit Card Payoff Engine
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Simulate your exact debt-free timeline, compound interest savings, and payoff acceleration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Dual Mode Switcher */}
          <div className="inline-flex p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => setMode("payment")}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[40px] ${
                mode === "payment"
                  ? "bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Fixed Monthly Payment
            </button>
            <button
              type="button"
              onClick={() => setMode("time")}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all min-h-[40px] ${
                mode === "time"
                  ? "bg-white dark:bg-zinc-900 text-rose-600 dark:text-rose-400 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Target Payoff Goal
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            title="Reset to default values"
            aria-label="Reset calculator inputs"
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs (Left 5 Cols) vs Results & Charts (Right 7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================
            LEFT COLUMN: INTERACTIVE INPUT CONTROLS
           ======================================================== */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Credit Card Balance */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="card-balance" className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-200 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-rose-500" />
                <span>Credit Card Balance (Total Debt)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">$</span>
                <input
                  id="card-balance"
                  type="number"
                  min="100"
                  max="250000"
                  step="100"
                  value={balance || ""}
                  onChange={(e) => setBalance(Number(e.target.value) || 0)}
                  className="w-32 pl-7 pr-3 py-1.5 rounded-xl text-right font-mono font-bold text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-rose-500 text-zinc-900 dark:text-white"
                />
              </div>
            </div>

            <input
              type="range"
              min="500"
              max="50000"
              step="250"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              aria-label="Credit card balance slider"
              className="w-full accent-rose-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
            />

            {/* Quick Balance Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[2500, 5000, 8500, 15000, 25000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBalance(preset)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                    balance === preset
                      ? "bg-rose-500 text-white"
                      : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-750"
                  }`}
                >
                  ${(preset / 1000).toFixed(preset % 1000 === 0 ? 0 : 1)}k
                </button>
              ))}
            </div>
          </div>

          {/* Card 2: Annual Interest Rate (APR) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="card-apr" className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-200 flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-amber-500" />
                <span>Annual Interest Rate (APR %)</span>
              </label>
              <div className="relative">
                <input
                  id="card-apr"
                  type="number"
                  min="0"
                  max="45"
                  step="0.01"
                  value={apr || ""}
                  onChange={(e) => setApr(Number(e.target.value) || 0)}
                  className="w-24 pr-7 pl-3 py-1.5 rounded-xl text-right font-mono font-bold text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-zinc-900 dark:text-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">%</span>
              </div>
            </div>

            <input
              type="range"
              min="5"
              max="35"
              step="0.25"
              value={apr}
              onChange={(e) => setApr(Number(e.target.value))}
              aria-label="Annual interest rate slider"
              className="w-full accent-amber-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
            />

            {/* Benchmark Rates */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { label: "15.99% (Good)", val: 15.99 },
                { label: "22.99% (Avg)", val: 22.99 },
                { label: "28.99% (Store/Penalty)", val: 28.99 },
              ].map((b) => (
                <button
                  key={b.val}
                  type="button"
                  onClick={() => setApr(b.val)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                    apr === b.val
                      ? "bg-amber-500 text-white"
                      : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Card 3: Dynamic Mode Input (Payment vs Target Time) */}
          {mode === "payment" ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="card-payment" className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-200 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-500" />
                  <span>Monthly Payment Amount</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">$</span>
                  <input
                    id="card-payment"
                    type="number"
                    min="10"
                    max="10000"
                    step="10"
                    value={monthlyPayment || ""}
                    onChange={(e) => setMonthlyPayment(Number(e.target.value) || 0)}
                    className="w-28 pl-7 pr-3 py-1.5 rounded-xl text-right font-mono font-bold text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-900 dark:text-white"
                  />
                </div>
              </div>

              <input
                type="range"
                min="50"
                max="2000"
                step="25"
                value={monthlyPayment}
                onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                aria-label="Monthly payment slider"
                className="w-full accent-emerald-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between items-center text-[11px] text-zinc-400 pt-1">
                <span>Min interest charge: {formatCurrency(result.monthlyInterestCharge)}/mo</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {monthlyPayment > result.monthlyInterestCharge ? "Covers interest + principal" : "Payment too low!"}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="card-target-time" className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-200 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>Target Payoff Horizon (Months)</span>
                </label>
                <div className="relative">
                  <input
                    id="card-target-time"
                    type="number"
                    min="1"
                    max="120"
                    step="1"
                    value={targetMonths || ""}
                    onChange={(e) => setTargetMonths(Number(e.target.value) || 1)}
                    className="w-24 pr-8 pl-3 py-1.5 rounded-xl text-right font-mono font-bold text-sm bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-900 dark:text-white"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 text-xs">mo</span>
                </div>
              </div>

              <input
                type="range"
                min="6"
                max="60"
                step="3"
                value={targetMonths}
                onChange={(e) => setTargetMonths(Number(e.target.value))}
                aria-label="Target payoff months slider"
                className="w-full accent-emerald-500 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
              />

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[12, 18, 24, 36, 48].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setTargetMonths(m)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      targetMonths === m
                        ? "bg-emerald-600 text-white"
                        : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    {m} mo ({m / 12} yr)
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Card 4: Interactive Extra Payment Impact */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-purple-50/40 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-200/80 dark:border-indigo-900/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded-lg bg-indigo-500 text-white">
                  <Zap className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                  Extra Monthly Payment Boost
                </span>
              </div>
              <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                +${extraPayment}/mo
              </span>
            </div>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Adding even a small extra payment goes 100% directly to your principal, collapsing the timeline and interest.
            </p>

            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={extraPayment}
              onChange={(e) => setExtraPayment(Number(e.target.value))}
              aria-label="Extra payment slider"
              className="w-full accent-indigo-600 h-2 bg-indigo-200 dark:bg-indigo-950 rounded-lg cursor-pointer"
            />

            <div className="flex flex-wrap gap-2 pt-1">
              {[0, 25, 50, 100, 200].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setExtraPayment(amt)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    extraPayment === amt
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-white dark:bg-zinc-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100"
                  }`}
                >
                  {amt === 0 ? "No Extra" : `+$${amt}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: RESULTS HERO, AMORTIZATION CHART, TABLE
           ======================================================== */}
        <div className="lg:col-span-7 space-y-6">
          {/* Edge Case Warning: Payment Too Low */}
          {result.isPaymentTooLow ? (
            <div className="p-6 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-500/50 space-y-4">
              <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
                <ShieldAlert className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight">
                    Payment Too Low: Debt Will Grow Indefinitely
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-300 mt-1">
                    Your planned payment of{" "}
                    <strong>{formatCurrency(result.effectiveMonthlyPayment)}</strong> is less than your
                    first month&apos;s interest charge of{" "}
                    <strong>{formatCurrencyExact(result.monthlyInterestCharge)}</strong>.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-rose-200 dark:border-rose-900 text-xs sm:text-sm space-y-2">
                <p className="text-zinc-700 dark:text-zinc-300">
                  Because unpaid interest is added to your balance every 30 days, your debt will increase each month (negative amortization).
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800 font-bold">
                  <span className="text-zinc-600 dark:text-zinc-400">Minimum payment needed to start reducing debt:</span>
                  <span className="text-rose-600 dark:text-rose-400 text-base">{formatCurrency(result.minPaymentRequired)}/mo</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMonthlyPayment(result.minPaymentRequired + 25)}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition"
              >
                Set Payment to {formatCurrency(result.minPaymentRequired + 25)}/mo
              </button>
            </div>
          ) : (
            <>
              {/* Primary Key Metric Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 text-white shadow-2xl relative overflow-hidden border border-zinc-800">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Debt-Free Horizon</span>
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black tracking-tight mt-1 text-white">
                      {result.debtFreeDate}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-zinc-400 block">Total Payoff Time</span>
                    <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-mono">
                      {result.years > 0 ? `${result.years} yr ` : ""}
                      {result.remainingMonths} mo
                    </span>
                    <span className="text-xs text-zinc-500 block">({result.totalMonths} total payments)</span>
                  </div>
                </div>

                {/* 3 Metric Summary Grid */}
                <div className="grid grid-cols-3 gap-3 pt-4 text-center">
                  <div className="p-3 rounded-2xl bg-zinc-800/60 border border-zinc-700/50">
                    <span className="text-[10px] sm:text-xs text-zinc-400 block">Monthly Pay</span>
                    <span className="text-sm sm:text-lg font-bold text-white font-mono mt-0.5 block">
                      {formatCurrency(result.effectiveMonthlyPayment)}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-800/60 border border-zinc-700/50">
                    <span className="text-[10px] sm:text-xs text-zinc-400 block">Total Interest</span>
                    <span className="text-sm sm:text-lg font-bold text-rose-400 font-mono mt-0.5 block">
                      {formatCurrency(result.totalInterestPaid)}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-zinc-800/60 border border-zinc-700/50">
                    <span className="text-[10px] sm:text-xs text-zinc-400 block">Total Cost</span>
                    <span className="text-sm sm:text-lg font-bold text-zinc-200 font-mono mt-0.5 block">
                      {formatCurrency(result.totalAmountPaid)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Extra Payment Impact Acceleration Banner */}
              {extraPayment > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>
                      With <strong>+${extraPayment}/mo</strong> extra, you save{" "}
                      <strong className="underline decoration-emerald-500">
                        {result.extraComparisons.find((c) => c.extraAmount === extraPayment)?.monthsSaved || 0} months
                      </strong>{" "}
                      and{" "}
                      <strong>
                        {formatCurrency(
                          result.extraComparisons.find((c) => c.extraAmount === extraPayment)?.interestSaved || 0
                        )}
                      </strong>{" "}
                      in interest!
                    </span>
                  </div>
                </div>
              )}

              {/* Visual Interactive Amortization Chart */}
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-4 h-4 text-rose-500" />
                    <h4 className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200">
                      Balance Depletion vs. Cumulative Interest
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-semibold">
                    <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                      Balance
                    </span>
                    <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      Interest
                    </span>
                  </div>
                </div>

                {/* Responsive SVG Chart */}
                <div className="relative w-full overflow-hidden">
                  <svg
                    ref={chartSvgRef}
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    onMouseMove={(e) => {
                      if (!chartSvgRef.current || pointCoordinates.length === 0) return;
                      const rect = chartSvgRef.current.getBoundingClientRect();
                      const mouseX = e.clientX - rect.left;
                      const ratio = mouseX / rect.width;
                      const targetX = ratio * svgWidth;
                      let closestIdx = 0;
                      let minDiff = Infinity;
                      pointCoordinates.forEach((p, idx) => {
                        const diff = Math.abs(p.x - targetX);
                        if (diff < minDiff) {
                          minDiff = diff;
                          closestIdx = idx;
                        }
                      });
                      setHoveredPointIndex(closestIdx);
                    }}
                    onMouseLeave={() => setHoveredPointIndex(null)}
                    className="w-full h-48 sm:h-56 select-none cursor-crosshair"
                  >
                    <defs>
                      <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Gridlines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
                      const y = padding.top + innerHeight * (1 - pct);
                      const val = maxVal * pct;
                      return (
                        <g key={pct}>
                          <line
                            x1={padding.left}
                            y1={y}
                            x2={padding.left + innerWidth}
                            y2={y}
                            stroke="currentColor"
                            className="text-zinc-200 dark:text-zinc-800"
                            strokeDasharray="4 4"
                          />
                          <text
                            x={padding.left - 8}
                            y={y + 4}
                            textAnchor="end"
                            className="text-[10px] font-mono fill-zinc-400 select-none"
                          >
                            ${Math.round(val / 1000)}k
                          </text>
                        </g>
                      );
                    })}

                    {/* Area under Remaining Balance curve */}
                    {balanceAreaPath && (
                      <path d={balanceAreaPath} fill="url(#balanceGradient)" />
                    )}

                    {/* Balance Line */}
                    {pointCoordinates.length > 1 && (
                      <path
                        d={pointCoordinates
                          .map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.yBalance.toFixed(1)}`)
                          .join(" ")}
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="2.5"
                      />
                    )}

                    {/* Cumulative Interest Line */}
                    {pointCoordinates.length > 1 && (
                      <path
                        d={pointCoordinates
                          .map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.yInterest.toFixed(1)}`)
                          .join(" ")}
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeDasharray="3 3"
                      />
                    )}

                    {/* Month X-axis markers */}
                    {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
                      const x = padding.left + innerWidth * pct;
                      const m = Math.round(maxMonths * pct);
                      return (
                        <text
                          key={pct}
                          x={x}
                          y={svgHeight - 10}
                          textAnchor="middle"
                          className="text-[10px] font-mono fill-zinc-400 select-none"
                        >
                          Mo {m}
                        </text>
                      );
                    })}

                    {/* Hover tracking indicator */}
                    {hoveredPointIndex !== null && pointCoordinates[hoveredPointIndex] && (
                      <g>
                        <line
                          x1={pointCoordinates[hoveredPointIndex].x}
                          y1={padding.top}
                          x2={pointCoordinates[hoveredPointIndex].x}
                          y2={padding.top + innerHeight}
                          stroke="#71717a"
                          strokeWidth="1.5"
                          strokeDasharray="2 2"
                        />
                        <circle
                          cx={pointCoordinates[hoveredPointIndex].x}
                          cy={pointCoordinates[hoveredPointIndex].yBalance}
                          r="5"
                          fill="#f43f5e"
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                      </g>
                    )}
                  </svg>

                  {/* Tooltip Card overlay on hover */}
                  {hoveredPointIndex !== null && pointCoordinates[hoveredPointIndex] && (
                    <div className="absolute top-2 left-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs shadow-lg pointer-events-none">
                      <div className="font-bold text-zinc-900 dark:text-white">
                        {pointCoordinates[hoveredPointIndex].pt.date} (Month {pointCoordinates[hoveredPointIndex].pt.month})
                      </div>
                      <div className="text-rose-500 font-mono font-semibold">
                        Balance: {formatCurrency(pointCoordinates[hoveredPointIndex].pt.remainingBalance)}
                      </div>
                      <div className="text-amber-500 font-mono">
                        Interest to date: {formatCurrency(pointCoordinates[hoveredPointIndex].pt.totalInterestPaidSoFar)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Toolbar: CSV Export & Copy Plan */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadCSV}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition min-h-[40px]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Schedule (CSV)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition min-h-[40px]"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied to Clipboard!" : "Copy Payoff Summary"}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowFullSchedule(!showFullSchedule)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline min-h-[40px]"
                >
                  <span>{showFullSchedule ? "Hide Schedule Table" : "View Month-by-Month Amortization"}</span>
                  {showFullSchedule ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Month-by-Month Amortization Schedule Table */}
              {showFullSchedule && (
                <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-inner mt-4 animate-fade-in">
                  <div className="overflow-x-auto max-h-96">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-bold sticky top-0 uppercase tracking-wider">
                        <tr>
                          <th className="py-2.5 px-3">Mo</th>
                          <th className="py-2.5 px-3">Date</th>
                          <th className="py-2.5 px-3 text-right">Payment</th>
                          <th className="py-2.5 px-3 text-right">Principal</th>
                          <th className="py-2.5 px-3 text-right">Interest</th>
                          <th className="py-2.5 px-3 text-right">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
                        {result.schedule.map((row) => (
                          <tr key={row.month} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition">
                            <td className="py-2 px-3 font-semibold text-zinc-400">{row.month}</td>
                            <td className="py-2 px-3 font-sans font-medium">{row.date}</td>
                            <td className="py-2 px-3 text-right font-semibold text-zinc-900 dark:text-white">
                              ${row.payment.toFixed(2)}
                            </td>
                            <td className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400">
                              ${row.principalPaid.toFixed(2)}
                            </td>
                            <td className="py-2 px-3 text-right text-rose-500">
                              ${row.interestPaid.toFixed(2)}
                            </td>
                            <td className="py-2 px-3 text-right font-bold text-zinc-900 dark:text-white">
                              ${row.remainingBalance.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
