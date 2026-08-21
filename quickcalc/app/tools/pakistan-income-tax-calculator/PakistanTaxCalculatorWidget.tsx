"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  calculatePakistanTax,
  getPakistanTaxExplanationSteps,
  formatPKR,
  PAKISTAN_TAX_PRESETS,
  PakistanTaxInputs,
  PakistanTaxResult,
  TaxpayerType,
  IncomeFrequency,
} from "@/lib/calculators/pakistanTaxCalculator";
import { generatePdfAsync } from "@/lib/utils/downloadPdf";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import {
  RotateCcw,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  UserCheck,
  Sliders,
  ChevronDown,
  Building2,
  Receipt,
} from "lucide-react";

export default function PakistanTaxCalculatorWidget() {
  // Inputs state
  const [taxpayerType, setTaxpayerType] = useState<TaxpayerType>("salaried");
  const [frequency, setFrequency] = useState<IncomeFrequency>("monthly");
  const [grossIncome, setGrossIncome] = useState<string>("150000");

  // Deductions state
  const [zakatDeduction, setZakatDeduction] = useState<string>("0");
  const [advanceTaxPaid, setAdvanceTaxPaid] = useState<string>("0");
  const [pensionContribution, setPensionContribution] = useState<string>("0");
  const [showAdvancedDeductions, setShowAdvancedDeductions] = useState<boolean>(false);

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"summary" | "slabs">("summary");

  // Read URL query params on initial mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const qType = params.get("type") as TaxpayerType | null;
      const qFreq = params.get("freq") as IncomeFrequency | null;
      const qIncome = params.get("income");
      const qZakat = params.get("zakat");
      const qAdv = params.get("wht");
      const qPension = params.get("vps");

      if (qType && ["salaried", "business"].includes(qType)) setTaxpayerType(qType);
      if (qFreq && ["monthly", "annual"].includes(qFreq)) setFrequency(qFreq);
      if (qIncome) setGrossIncome(qIncome);
      if (qZakat) {
        setZakatDeduction(qZakat);
        setShowAdvancedDeductions(true);
      }
      if (qAdv) {
        setAdvanceTaxPaid(qAdv);
        setShowAdvancedDeductions(true);
      }
      if (qPension) {
        setPensionContribution(qPension);
        setShowAdvancedDeductions(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Compute live calculations
  const inputs: PakistanTaxInputs = useMemo(() => ({
    taxpayerType,
    frequency,
    grossIncome: parseFloat(grossIncome) || 0,
    zakatDeduction: parseFloat(zakatDeduction) || 0,
    advanceTaxPaid: parseFloat(advanceTaxPaid) || 0,
    pensionContribution: parseFloat(pensionContribution) || 0,
  }), [
    taxpayerType,
    frequency,
    grossIncome,
    zakatDeduction,
    advanceTaxPaid,
    pensionContribution,
  ]);

  const result: PakistanTaxResult = useMemo(() => calculatePakistanTax(inputs), [inputs]);

  const explanationSteps = useMemo(
    () => getPakistanTaxExplanationSteps(inputs, result),
    [inputs, result]
  );

  // Preset loader
  const loadPreset = (preset: typeof PAKISTAN_TAX_PRESETS[0]) => {
    if (preset.inputs.taxpayerType) setTaxpayerType(preset.inputs.taxpayerType);
    if (preset.inputs.frequency) setFrequency(preset.inputs.frequency);
    if (preset.inputs.grossIncome !== undefined) setGrossIncome(preset.inputs.grossIncome.toString());
    if (preset.inputs.zakatDeduction !== undefined) setZakatDeduction(preset.inputs.zakatDeduction.toString());
    if (preset.inputs.advanceTaxPaid !== undefined) setAdvanceTaxPaid(preset.inputs.advanceTaxPaid.toString());
    if (preset.inputs.pensionContribution !== undefined) setPensionContribution(preset.inputs.pensionContribution.toString());
    if ((preset.inputs.zakatDeduction || 0) > 0 || (preset.inputs.advanceTaxPaid || 0) > 0) {
      setShowAdvancedDeductions(true);
    }
  };

  // Reset to default
  const handleReset = () => {
    setTaxpayerType("salaried");
    setFrequency("monthly");
    setGrossIncome("150000");
    setZakatDeduction("0");
    setAdvanceTaxPaid("0");
    setPensionContribution("0");
    setShowAdvancedDeductions(false);
  };

  // Copy Summary to clipboard
  const handleCopySummary = async () => {
    const summaryText = `
=== QuickCalc: Pakistan FBR Income Tax Summary FY 2026-2027 ===
Category: ${taxpayerType === "salaried" ? "Salaried Individual" : "Non-Salaried / Business"}
Gross Monthly Income: ${formatPKR(result.grossMonthlyIncome)}
Gross Annual Income: ${formatPKR(result.grossAnnualIncome)}
Taxable Income: ${formatPKR(result.taxableIncome)}
Active Tax Slab: ${result.activeSlab.description}

-- Tax & Deductions --
Gross Annual Income Tax: ${formatPKR(result.grossAnnualTax)}
Advance Tax (WHT) Credits: ${formatPKR(result.advanceTaxCredit)}
Net Annual Tax Payable: ${formatPKR(result.netAnnualTaxPayable)}
Monthly Salary Tax Deduction: ${formatPKR(result.monthlyTaxDeduction)}
Effective Tax Rate: ${result.effectiveTaxRatePercent.toFixed(1)}%

-- Net Take-Home Salary --
Net Monthly Take-Home Pay: ${formatPKR(result.netMonthlyTakeHome)}
Net Annual Take-Home Pay: ${formatPKR(result.netAnnualTakeHome)}

Calculated at: https://quickcalc.cloud/tools/pakistan-income-tax-calculator
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
    const url = new URL(window.location.origin + "/tools/pakistan-income-tax-calculator");
    url.searchParams.set("type", taxpayerType);
    url.searchParams.set("freq", frequency);
    url.searchParams.set("income", grossIncome);
    if (parseFloat(zakatDeduction) > 0) url.searchParams.set("zakat", zakatDeduction);
    if (parseFloat(advanceTaxPaid) > 0) url.searchParams.set("wht", advanceTaxPaid);
    if (parseFloat(pensionContribution) > 0) url.searchParams.set("vps", pensionContribution);

    try {
      await navigator.clipboard.writeText(url.toString());
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Download PDF Tax Salary Slip
  const handleDownloadPdf = async () => {
    setIsPdfGenerating(true);
    try {
      await generatePdfAsync({
        toolName: "Pakistan Salary Tax Slip (FY 2026-2027)",
        toolSlug: "pakistan-income-tax-calculator",
        inputs: [
          { label: "Taxpayer Category", value: taxpayerType === "salaried" ? "Salaried Individual" : "Business / Freelancer" },
          { label: "Gross Monthly Salary", value: formatPKR(result.grossMonthlyIncome) },
          { label: "Gross Annual Income", value: formatPKR(result.grossAnnualIncome) },
          { label: "Allowable Deductions (Zakat/VPS)", value: formatPKR(result.totalDeductions) },
          { label: "Net Taxable Income", value: formatPKR(result.taxableIncome) },
          { label: "Advance Tax / WHT Adjustments", value: formatPKR(result.advanceTaxCredit) },
          { label: "FBR Tax Bracket", value: `${result.marginalTaxRatePercent}% Marginal Rate` },
        ],
        results: [
          { label: "Net Monthly Take-Home", value: formatPKR(result.netMonthlyTakeHome), isHighlight: true },
          { label: "Monthly Tax Deduction", value: formatPKR(result.monthlyTaxDeduction), isHighlight: true },
          { label: "Total Annual Tax Due", value: formatPKR(result.netAnnualTaxPayable) },
          { label: "Effective Tax Rate", value: `${result.effectiveTaxRatePercent.toFixed(1)}%` },
          { label: "Net Annual Take-Home", value: formatPKR(result.netAnnualTakeHome) },
          { label: "Marginal Slab", value: result.activeSlab.description },
        ],
        summaryNote: `Based on the official FBR Finance Act 2026 tax schedule for ${taxpayerType === "salaried" ? "salaried employees" : "business individuals"}, a gross salary of ${formatPKR(result.grossMonthlyIncome)}/month (${formatPKR(result.grossAnnualIncome)}/yr) incurs a monthly tax deduction of ${formatPKR(result.monthlyTaxDeduction)} (${formatPKR(result.netAnnualTaxPayable)} annually), leaving a clean net take-home pay of ${formatPKR(result.netMonthlyTakeHome)} per month (effective tax rate: ${result.effectiveTaxRatePercent.toFixed(1)}%).`,
        table: {
          title: "Complete FBR Tax Slabs Breakdown (FY 2026-2027)",
          headers: ["Tax Bracket / Slabs", "Tax Rate (%)", "Base Fixed Tax", "Status"],
          rows: result.allSlabs.map((slab, idx) => [
            slab.description,
            `${slab.ratePercent}%`,
            formatPKR(slab.baseTax),
            idx === result.activeSlabIndex ? "★ ACTIVE BRACKET" : "—",
          ]),
        },
      });
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Preset Scenarios Selector Bar */}
      <div className="bg-zinc-100/80 dark:bg-zinc-900/60 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>FBR Salary Presets:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {PAKISTAN_TAX_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => loadPreset(preset)}
                className="px-2.5 py-1.5 text-xs font-medium bg-white dark:bg-zinc-800/90 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-zinc-700 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-zinc-200 dark:border-zinc-700/80 hover:border-emerald-400 dark:hover:border-emerald-500/50 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
                title={preset.description}
              >
                <span>{preset.name}</span>
              </button>
            ))}
            <button
              onClick={handleReset}
              className="p-1.5 text-xs font-medium bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-lg transition-colors ml-auto sm:ml-0"
              title="Reset all fields to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Input Control Cards (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Card 1: Income Details */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    1. Taxpayer & Income Details
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Salaried vs business status & salary amount
                  </p>
                </div>
              </div>
            </div>

            {/* Taxpayer Category Pills (Salaried vs Business) */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Taxpayer Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setTaxpayerType("salaried")}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    taxpayerType === "salaried"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Salaried Individual</span>
                  {taxpayerType === "salaried" && <Check className="w-3.5 h-3.5 text-emerald-500 ml-auto" />}
                </button>

                <button
                  type="button"
                  onClick={() => setTaxpayerType("business")}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    taxpayerType === "business"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Business / Freelancer</span>
                  {taxpayerType === "business" && <Check className="w-3.5 h-3.5 text-emerald-500 ml-auto" />}
                </button>
              </div>
            </div>

            {/* Income Frequency Toggle */}
            <div className="flex items-center justify-between pt-1">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Income Frequency
              </label>
              <div className="bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setFrequency("monthly")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    frequency === "monthly"
                      ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Monthly Salary
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("annual")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                    frequency === "annual"
                      ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  Annual Income
                </button>
              </div>
            </div>

            {/* Gross Income Input */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                <span>Gross {frequency === "monthly" ? "Monthly Salary" : "Annual Income"} (PKR)</span>
                <span className="text-[10px] text-zinc-400 font-normal">Before taxes</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">
                  ₨
                </span>
                <input
                  type="number"
                  step="5000"
                  min="0"
                  value={grossIncome}
                  onChange={(e) => setGrossIncome(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="150000"
                />
              </div>
            </div>

            {/* Quick Salary Chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
              <span className="text-[10px] text-zinc-400 font-semibold mr-1">Quick Pay:</span>
              {[50000, 100000, 150000, 250000, 400000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setFrequency("monthly");
                    setGrossIncome(amt.toString());
                  }}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-colors ${
                    frequency === "monthly" && parseFloat(grossIncome) === amt
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                  }`}
                >
                  ₨ {amt / 1000}k
                </button>
              ))}
            </div>
          </div>

          {/* Card 2: Deductions & WHT Adjustments */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    2. Deductions & Advance Tax (WHT)
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Zakat u/s 60, VPS pensions, and mobile/vehicle WHT
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAdvancedDeductions(!showAdvancedDeductions)}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>{showAdvancedDeductions ? "Collapse" : "Add Credits"}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvancedDeductions ? "rotate-180" : ""}`} />
              </button>
            </div>

            {showAdvancedDeductions ? (
              <div className="space-y-4 animate-fadeIn">
                {/* Advance Tax Paid (WHT Credit) */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center justify-between">
                    <span>Advance Tax / WHT Paid (Annual PKR)</span>
                    <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">Tax Credit</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">
                      ₨
                    </span>
                    <input
                      type="number"
                      step="1000"
                      min="0"
                      value={advanceTaxPaid}
                      onChange={(e) => setAdvanceTaxPaid(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="0"
                    />
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                    Withholding tax deducted on mobile load (15%), vehicle tokens, electricity bills, or property transactions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Zakat Deduction */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Zakat Deducted (u/s 60)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">
                        ₨
                      </span>
                      <input
                        type="number"
                        step="1000"
                        min="0"
                        value={zakatDeduction}
                        onChange={(e) => setZakatDeduction(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Pension Contribution */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      VPS Pension (u/s 63)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">
                        ₨
                      </span>
                      <input
                        type="number"
                        step="1000"
                        min="0"
                        value={pensionContribution}
                        onChange={(e) => setPensionContribution(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950/60 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-center">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 block">
                  Have advance tax from mobile bills or Zakat deductions?
                </span>
                <button
                  type="button"
                  onClick={() => setShowAdvancedDeductions(true)}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline mt-1"
                >
                  + Click to claim Advance WHT & Zakat deductions
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Calculated Results, Monthly Slip & Active Slab (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Primary 3-Metric Highlight Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Monthly Take-Home (Green / Emerald) */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-teal-500/10 border-emerald-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Monthly Take-Home
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  In Hand
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
                {formatPKR(result.netMonthlyTakeHome)}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Annual: {formatPKR(result.netAnnualTakeHome)}
              </div>
            </div>

            {/* Monthly Tax (Red / Rose) */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-rose-500/15 via-rose-500/5 to-red-500/10 border-rose-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                  Monthly Tax
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-800 dark:text-rose-300">
                  FBR Cut
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-rose-600 dark:text-rose-400">
                {formatPKR(result.monthlyTaxDeduction)}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Annual: {formatPKR(result.netAnnualTaxPayable)}
              </div>
            </div>

            {/* Effective Tax Rate (Blue / Indigo) */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-indigo-500/15 via-indigo-500/5 to-blue-500/10 border-indigo-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                  Effective Rate
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-800 dark:text-indigo-300">
                  Rate %
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                {result.effectiveTaxRatePercent.toFixed(1)}%
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Marginal: {result.marginalTaxRatePercent}%
              </div>
            </div>
          </div>

          {/* Tab Navigation: Monthly Salary Slip vs Full Slabs Table */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("summary")}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === "summary"
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  Monthly Pay Slip Breakdown
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("slabs")}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === "slabs"
                      ? "bg-emerald-500 text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  FBR 2026-2027 Slabs
                </button>
              </div>

              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Slab {result.activeSlabIndex + 1} of {result.allSlabs.length}
              </span>
            </div>

            {activeTab === "summary" ? (
              <div className="space-y-3 text-xs">
                
                {/* Active Bracket Pill */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-800 dark:text-emerald-300 block">
                      Active Tax Bracket:
                    </span>
                    <span className="font-extrabold text-zinc-900 dark:text-white">
                      {result.activeSlab.description}
                    </span>
                  </div>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                    {result.marginalTaxRatePercent}%
                  </span>
                </div>

                {/* Salary Slip Rows */}
                <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-medium">
                  
                  <div className="py-2 flex items-center justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Gross Monthly Salary</span>
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {formatPKR(result.grossMonthlyIncome)}
                    </span>
                  </div>

                  <div className="py-2 flex items-center justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Gross Annual Income (12 months)</span>
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {formatPKR(result.grossAnnualIncome)}
                    </span>
                  </div>

                  {result.totalDeductions > 0 && (
                    <div className="py-2 flex items-center justify-between">
                      <span className="text-teal-600 dark:text-teal-400">Allowable Deductions (Zakat/VPS)</span>
                      <span className="font-bold text-teal-600 dark:text-teal-400">
                        -{formatPKR(result.totalDeductions)}
                      </span>
                    </div>
                  )}

                  <div className="py-2 flex items-center justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Annual Net Taxable Income</span>
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {formatPKR(result.taxableIncome)}
                    </span>
                  </div>

                  <div className="py-2 flex items-center justify-between">
                    <span className="text-zinc-600 dark:text-zinc-400">Gross Annual Income Tax Due</span>
                    <span className="font-bold text-zinc-900 dark:text-white">
                      {formatPKR(result.grossAnnualTax)}
                    </span>
                  </div>

                  {result.advanceTaxCredit > 0 && (
                    <div className="py-2 flex items-center justify-between">
                      <span className="text-emerald-600 dark:text-emerald-400">Advance Tax (WHT) Credit Adjusted</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        -{formatPKR(result.advanceTaxCredit)}
                      </span>
                    </div>
                  )}

                  <div className="py-2 flex items-center justify-between font-bold text-rose-600 dark:text-rose-400 bg-rose-50/40 dark:bg-rose-950/20 px-2 rounded-lg mt-1">
                    <span>Monthly Tax Deduction</span>
                    <span>{formatPKR(result.monthlyTaxDeduction)}</span>
                  </div>

                  <div className="py-2.5 flex items-center justify-between font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30 px-2 rounded-lg mt-1 text-sm">
                    <span>Net Monthly Take-Home Pay</span>
                    <span>{formatPKR(result.netMonthlyTakeHome)}</span>
                  </div>
                </div>

              </div>
            ) : (
              /* Complete Slabs Table */
              <div className="space-y-2 text-xs">
                <div className="max-h-60 overflow-y-auto pr-1">
                  <table className="w-full text-left">
                    <thead className="sticky top-0 bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">
                      <tr>
                        <th className="p-1.5 rounded-l-lg">Slab / Range</th>
                        <th className="p-1.5">Rate</th>
                        <th className="p-1.5">Fixed Base</th>
                        <th className="p-1.5 text-right rounded-r-lg">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-medium">
                      {result.allSlabs.map((slab, idx) => {
                        const isActive = idx === result.activeSlabIndex;
                        return (
                          <tr
                            key={idx}
                            className={`transition-colors ${
                              isActive
                                ? "bg-emerald-500/10 font-bold text-emerald-950 dark:text-emerald-200"
                                : "hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300"
                            }`}
                          >
                            <td className="p-1.5 text-[11px]">{slab.description}</td>
                            <td className="p-1.5 font-bold">{slab.ratePercent}%</td>
                            <td className="p-1.5">{formatPKR(slab.baseTax)}</td>
                            <td className="p-1.5 text-right">
                              {isActive ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded-md">
                                  ACTIVE
                                </span>
                              ) : (
                                "—"
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Copy Summary, Download PDF, Share Scenario */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            
            {/* Copy Tax Breakdown */}
            <button
              type="button"
              onClick={handleCopySummary}
              className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied Slip!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-500" />
                  <span>Copy Pay Slip</span>
                </>
              )}
            </button>

            {/* Download PDF Salary Slip */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isPdfGenerating}
              className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
            >
              <Download className={`w-4 h-4 text-zinc-500 ${isPdfGenerating ? "animate-bounce" : ""}`} />
              <span>{isPdfGenerating ? "Generating..." : "Download Tax Slip"}</span>
            </button>

            {/* Share Calculation Link */}
            <button
              type="button"
              onClick={handleShareScenario}
              className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              {shareCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Share Pay Slip</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Step-by-Step Explanation */}
      <ExplainResultAccordion steps={explanationSteps} />
    </div>
  );
}
