"use client";

import { useState, useEffect, useMemo } from "react";
import {
  calculateFreelanceRate,
  getFreelanceRateExplanationSteps,
  FreelanceRateResult,
} from "@/lib/calculators/freelanceRateCalculator";
import { SUPPORTED_CURRENCIES } from "@/app/tools/currency-converter/CurrencyConverterWidget";
import { useLocaleDetection } from "@/hooks/useLocaleDetection";
import { generatePdfAsync } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import ShareResultButton from "@/components/ShareResultButton";
import ShareResultModal from "@/components/ShareResultModal";
import { Info, Briefcase, Clock, DollarSign, Calendar, Percent } from "lucide-react";

export default function FreelanceRateCalculatorWidget() {
  const localeDetection = useLocaleDetection();
  const detectedCurrency = localeDetection?.currencyCode;
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState<string>("USD");

  // Sync auto-detected currency once loaded
  useEffect(() => {
    if (detectedCurrency && SUPPORTED_CURRENCIES.some((c) => c.code === detectedCurrency)) {
      setSelectedCurrencyCode(detectedCurrency);
    }
  }, [detectedCurrency]);

  const selectedCurrency = useMemo(() => {
    return (
      SUPPORTED_CURRENCIES.find((c) => c.code === selectedCurrencyCode) ||
      SUPPORTED_CURRENCIES[0]
    );
  }, [selectedCurrencyCode]);

  // Mode: Basic vs Advanced
  const [mode, setMode] = useState<"basic" | "advanced">("basic");

  // Inputs
  const [desiredIncome, setDesiredIncome] = useState<string>("75000");
  const [incomePeriod, setIncomePeriod] = useState<"annual" | "monthly">("annual");

  const [expenses, setExpenses] = useState<string>("15000");
  const [expensesPeriod, setExpensesPeriod] = useState<"annual" | "monthly">("annual");

  const [workWeeksPerYear, setWorkWeeksPerYear] = useState<string>("48");
  const [workHoursPerWeek, setWorkHoursPerWeek] = useState<string>("40");
  const [billablePercentage, setBillablePercentage] = useState<string>("70");

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);

  // Compute results
  const result: FreelanceRateResult = useMemo(() => {
    return calculateFreelanceRate({
      desiredIncome: parseFloat(desiredIncome) || 0,
      incomePeriod,
      mode,
      expenses: parseFloat(expenses) || 0,
      expensesPeriod,
      workWeeksPerYear: parseFloat(workWeeksPerYear) || 48,
      workHoursPerWeek: parseFloat(workHoursPerWeek) || 40,
      billablePercentage: parseFloat(billablePercentage) || 70,
    });
  }, [
    desiredIncome,
    incomePeriod,
    mode,
    expenses,
    expensesPeriod,
    workWeeksPerYear,
    workHoursPerWeek,
    billablePercentage,
  ]);

  const explanationSteps = useMemo(() => {
    return getFreelanceRateExplanationSteps(
      {
        desiredIncome: parseFloat(desiredIncome) || 0,
        incomePeriod,
        mode,
        expenses: parseFloat(expenses) || 0,
        expensesPeriod,
        workWeeksPerYear: parseFloat(workWeeksPerYear) || 48,
        workHoursPerWeek: parseFloat(workHoursPerWeek) || 40,
        billablePercentage: parseFloat(billablePercentage) || 70,
      },
      result,
      selectedCurrency.symbol
    );
  }, [
    desiredIncome,
    incomePeriod,
    mode,
    expenses,
    expensesPeriod,
    workWeeksPerYear,
    workHoursPerWeek,
    billablePercentage,
    result,
    selectedCurrency.symbol,
  ]);

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: selectedCurrency.code,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatMoneyExact = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: selectedCurrency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handleCopy = () => {
    let text = `Freelance Hourly Rate Breakdown (${selectedCurrency.code})\n`;
    text += `====================================\n`;
    text += `Minimum Hourly Rate: ${formatMoneyExact(result.minimumHourlyRate)} / hr\n`;
    text += `Target Daily Rate: ${formatMoneyExact(result.dailyRate)} / day\n`;
    text += `Target Monthly Revenue: ${formatMoney(result.monthlyTarget)} / mo\n`;
    text += `Annual Revenue Goal: ${formatMoney(result.totalAnnualRevenueNeeded)}\n`;
    text += `Work Schedule: ${workWeeksPerYear} weeks/yr, ${workHoursPerWeek} hrs/wk (${billablePercentage}% billable)\n`;
    text += `Billable Hours: ${result.billableHoursPerWeek.toFixed(1)} hrs/wk | Non-Billable: ${result.nonBillableHoursPerWeek.toFixed(1)} hrs/wk\n`;
    text += `====================================\n`;
    text += `Calculated on QuickCalc (https://quickcalc.cloud/tools/freelance-rate-calculator)`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = async () => {
    if (isPdfGenerating) return;
    setIsPdfGenerating(true);

    try {
      await generatePdfAsync({
        toolName: `Freelance Rate Calculator (${selectedCurrency.code})`,
        toolSlug: "freelance-rate-calculator",
        inputs: [
          { label: "Target Income", value: `${formatMoney(result.totalAnnualDesiredIncome)} / year` },
          ...(mode === "advanced"
            ? [{ label: "Annual Business & Living Expenses", value: formatMoney(result.totalAnnualExpenses) }]
            : []),
          { label: "Total Annual Revenue Goal", value: formatMoney(result.totalAnnualRevenueNeeded) },
          { label: "Work Weeks / Year", value: `${workWeeksPerYear} weeks` },
          { label: "Work Hours / Week", value: `${workHoursPerWeek} hours` },
          { label: "Billable Percentage", value: `${billablePercentage}%` },
        ],
        results: [
          { label: "Minimum Hourly Rate", value: `${formatMoneyExact(result.minimumHourlyRate)} / hr`, isHighlight: true },
          { label: "Target Daily Rate (5-day week)", value: `${formatMoneyExact(result.dailyRate)} / day` },
          { label: "Target Monthly Revenue", value: `${formatMoney(result.monthlyTarget)} / month` },
          { label: "Annual Billable Hours", value: `${result.totalBillableHoursPerYear.toFixed(1)} hrs` },
        ],
        summaryNote: `Based on a ${billablePercentage}% billable ratio, ${result.nonBillableHoursPerWeek.toFixed(
          1
        )} hours/week are reserved for non-billable admin, marketing, and client proposals.`,
        filename: `Freelance-Hourly-Rate-Report.pdf`,
      });
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-indigo-600 p-6 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
          <Briefcase size={14} />
          <span>Freelance Pricing Tool</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold">Freelance / Hourly Rate Calculator</h3>
        <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-md mx-auto">
          Calculate your minimum billable rate to hit your target income & cover overhead
        </p>
      </div>

      {/* Main Container */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Mode Toggle & Currency Selector */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center border-b border-zinc-100 dark:border-zinc-800 pb-5">
          {/* Mode Switcher */}
          <div className="flex-1">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Calculation Mode
            </label>
            <div className="grid grid-cols-2 gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setMode("basic")}
                className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  mode === "basic"
                    ? "bg-white dark:bg-zinc-700 text-teal-600 dark:text-teal-400 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                Basic (Income Only)
              </button>
              <button
                type="button"
                onClick={() => setMode("advanced")}
                className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  mode === "advanced"
                    ? "bg-white dark:bg-zinc-700 text-teal-600 dark:text-teal-400 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                Advanced (+ Expenses)
              </button>
            </div>
          </div>

          {/* Currency Selector */}
          <div className="sm:w-48">
            <label htmlFor="currencySelect" className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
              Currency
            </label>
            <select
              id="currencySelect"
              value={selectedCurrencyCode}
              onChange={(e) => setSelectedCurrencyCode(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
            >
              {SUPPORTED_CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="space-y-4">
          {/* Desired Income Row */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="desiredIncome" className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                <DollarSign size={16} className="text-teal-600 dark:text-teal-400" />
                Target Income ({incomePeriod})
              </label>
              {/* Period toggle */}
              <div className="inline-flex rounded-lg bg-zinc-100 dark:bg-zinc-800 p-0.5 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setIncomePeriod("annual")}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    incomePeriod === "annual"
                      ? "bg-teal-600 text-white shadow-xs font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Annual
                </button>
                <button
                  type="button"
                  onClick={() => setIncomePeriod("monthly")}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    incomePeriod === "monthly"
                      ? "bg-teal-600 text-white shadow-xs font-semibold"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="relative rounded-xl shadow-xs">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500 font-semibold text-sm">
                {selectedCurrency.symbol}
              </span>
              <input
                id="desiredIncome"
                type="number"
                value={desiredIncome}
                onChange={(e) => setDesiredIncome(e.target.value)}
                className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 pl-9 pr-4 py-2.5 text-zinc-900 dark:text-white font-semibold focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-base"
                placeholder={incomePeriod === "annual" ? "75000" : "6250"}
                min="0"
              />
            </div>
          </div>

          {/* Business & Living Expenses (Advanced Mode) */}
          {mode === "advanced" && (
            <div className="p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="expenses" className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Business & Operating Expenses ({expensesPeriod})
                </label>
                <div className="inline-flex rounded-lg bg-zinc-200/60 dark:bg-zinc-800 p-0.5 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setExpensesPeriod("annual")}
                    className={`px-2 py-0.5 rounded-md transition-colors ${
                      expensesPeriod === "annual"
                        ? "bg-amber-600 text-white font-semibold"
                        : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Annual
                  </button>
                  <button
                    type="button"
                    onClick={() => setExpensesPeriod("monthly")}
                    className={`px-2 py-0.5 rounded-md transition-colors ${
                      expensesPeriod === "monthly"
                        ? "bg-amber-600 text-white font-semibold"
                        : "text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>
              <div className="relative rounded-xl shadow-xs">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500 font-semibold text-sm">
                  {selectedCurrency.symbol}
                </span>
                <input
                  id="expenses"
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 pl-9 pr-4 py-2 text-zinc-900 dark:text-white font-semibold focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
                  placeholder="15000"
                  min="0"
                />
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Includes software subscriptions, hardware, health insurance, accountant fees, taxes, and software tools.
              </p>
            </div>
          )}

          {/* Work Hours & Schedule Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label htmlFor="workWeeksPerYear" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1">
                <Calendar size={14} className="text-teal-600 dark:text-teal-400" />
                Work Weeks / Year
              </label>
              <input
                id="workWeeksPerYear"
                type="number"
                value={workWeeksPerYear}
                onChange={(e) => setWorkWeeksPerYear(e.target.value)}
                className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 px-3.5 py-2 text-zinc-900 dark:text-white font-semibold text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                min="1"
                max="52"
              />
              <span className="text-[11px] text-zinc-400 mt-1 block">
                Default 48 (leaves 4 weeks for vacation & sick leave)
              </span>
            </div>

            <div>
              <label htmlFor="workHoursPerWeek" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1">
                <Clock size={14} className="text-teal-600 dark:text-teal-400" />
                Total Work Hours / Week
              </label>
              <input
                id="workHoursPerWeek"
                type="number"
                value={workHoursPerWeek}
                onChange={(e) => setWorkHoursPerWeek(e.target.value)}
                className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/60 px-3.5 py-2 text-zinc-900 dark:text-white font-semibold text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                min="1"
                max="168"
              />
              <span className="text-[11px] text-zinc-400 mt-1 block">
                Standard full-time is 40 hours/week
              </span>
            </div>
          </div>

          {/* Billable Ratio Slider & Explanation */}
          <div className="p-4 bg-teal-500/5 dark:bg-teal-500/10 border border-teal-500/20 rounded-xl space-y-3">
            <div className="flex justify-between items-center">
              <label htmlFor="billablePercentage" className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                <Percent size={14} className="text-teal-600 dark:text-teal-400" />
                Billable Hours Ratio ({billablePercentage}%)
              </label>
              <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded-md">
                {result.billableHoursPerWeek.toFixed(1)} hrs/wk billable
              </span>
            </div>

            <input
              id="billablePercentage"
              type="range"
              min="30"
              max="100"
              step="5"
              value={billablePercentage}
              onChange={(e) => setBillablePercentage(e.target.value)}
              className="w-full accent-teal-600 dark:accent-teal-400 cursor-pointer"
            />

            <div className="flex items-start gap-2 text-xs text-teal-900 dark:text-teal-200 leading-relaxed bg-white/60 dark:bg-zinc-900/60 p-2.5 rounded-lg border border-teal-500/10">
              <Info size={16} className="text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-teal-950 dark:text-teal-100">Why Billable % Matters:</strong> Not all working hours bring in revenue. Freelancers spend an average of 30% of their time on unbilled tasks (marketing, lead discovery, client admin, proposals, and invoicing). <strong>70% is standard</strong>.
              </div>
            </div>
          </div>
        </div>

        {/* Hero Output Card */}
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-2xl p-6 shadow-xl border border-zinc-800 space-y-5">
          <div className="text-center space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-teal-400">
              Minimum Required Rate
            </span>
            <div className="text-4xl sm:text-5xl font-black font-[family-name:var(--font-geist-mono)] tracking-tight text-white py-1">
              {formatMoneyExact(result.minimumHourlyRate)}
              <span className="text-lg sm:text-xl font-normal text-zinc-400 ml-1">/ hr</span>
            </div>
            <p className="text-xs text-zinc-400">
              Charge this rate to net {formatMoney(result.totalAnnualDesiredIncome)} / year after non-billable overhead.
            </p>
          </div>

          {/* Breakdown Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-zinc-800">
            <div className="bg-zinc-800/60 p-3 rounded-xl border border-zinc-700/50 text-center">
              <span className="block text-[11px] font-medium text-zinc-400">Daily Target</span>
              <span className="block text-base sm:text-lg font-bold font-[family-name:var(--font-geist-mono)] text-teal-300 mt-0.5">
                {formatMoneyExact(result.dailyRate)}
              </span>
              <span className="block text-[10px] text-zinc-500">5-day work week</span>
            </div>

            <div className="bg-zinc-800/60 p-3 rounded-xl border border-zinc-700/50 text-center">
              <span className="block text-[11px] font-medium text-zinc-400">Monthly Target</span>
              <span className="block text-base sm:text-lg font-bold font-[family-name:var(--font-geist-mono)] text-emerald-300 mt-0.5">
                {formatMoney(result.monthlyTarget)}
              </span>
              <span className="block text-[10px] text-zinc-500">12 billing cycles</span>
            </div>

            <div className="bg-zinc-800/60 p-3 rounded-xl border border-zinc-700/50 text-center">
              <span className="block text-[11px] font-medium text-zinc-400">Annual Revenue Goal</span>
              <span className="block text-base sm:text-lg font-bold font-[family-name:var(--font-geist-mono)] text-indigo-300 mt-0.5">
                {formatMoney(result.totalAnnualRevenueNeeded)}
              </span>
              <span className="block text-[10px] text-zinc-500">Gross total</span>
            </div>

            <div className="bg-zinc-800/60 p-3 rounded-xl border border-zinc-700/50 text-center">
              <span className="block text-[11px] font-medium text-zinc-400">Non-Billable Admin</span>
              <span className="block text-base sm:text-lg font-bold font-[family-name:var(--font-geist-mono)] text-amber-300 mt-0.5">
                {result.nonBillableHoursPerWeek.toFixed(1)} <span className="text-xs font-normal">hrs/wk</span>
              </span>
              <span className="block text-[10px] text-zinc-500">Unbilled overhead</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap gap-2 pt-2 justify-center">
            <button
              type="button"
              onClick={handleCopy}
              className="py-2 px-4 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors inline-flex items-center gap-1.5"
            >
              {copied ? "✓ Copied!" : "📋 Copy Breakdown"}
            </button>

            <DownloadPdfButton
              onClick={handleDownloadPdf}
              isGenerating={isPdfGenerating}
            />

            <ShareResultButton onClick={() => setIsShareModalOpen(true)} />
          </div>
        </div>

        {/* Interactive Explanation Accordion */}
        <ExplainResultAccordion steps={explanationSteps} />
      </div>

      {/* Share Result Modal */}
      <ShareResultModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        data={{
          toolName: "Freelance Rate Calculator",
          toolSlug: "freelance-rate-calculator",
          category: "Finance & Money",
          resultValue: `${formatMoneyExact(result.minimumHourlyRate)} / hr`,
          resultLabel: `Target Annual Revenue: ${formatMoney(result.totalAnnualRevenueNeeded)}`,
          inputsSummary: [
            { label: "Target Income", value: formatMoney(result.totalAnnualDesiredIncome) },
            { label: "Billable Ratio", value: `${billablePercentage}%` },
            { label: "Work Schedule", value: `${workWeeksPerYear} wks/yr, ${workHoursPerWeek} hrs/wk` },
          ],
        }}
      />
    </div>
  );
}
