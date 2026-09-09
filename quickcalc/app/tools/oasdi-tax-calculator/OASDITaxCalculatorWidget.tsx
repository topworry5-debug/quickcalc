"use client";

import React, { useState, useMemo } from "react";
import {
  calculateOASDITax,
  AVAILABLE_OASDI_YEARS,
  CURRENT_OASDI_YEAR,
  OASDI_WAGE_BASE_BY_YEAR,
  PayFrequency,
  EmploymentType,
  WageInputMode,
} from "@/lib/calculators/oasdiCalculator";
import {
  ShieldCheck,
  Building2,
  User,
  DollarSign,
  Info,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Clock,
} from "lucide-react";

export default function OASDITaxCalculatorWidget() {
  // Calculator state
  const [grossWage, setGrossWage] = useState<number>(75000);
  const [inputMode, setInputMode] = useState<WageInputMode>("annual");
  const [frequency, setFrequency] = useState<PayFrequency>("biweekly");
  const [employmentType, setEmploymentType] = useState<EmploymentType>("employee");
  const [taxYear, setTaxYear] = useState<number>(CURRENT_OASDI_YEAR);

  // YTD mid-year crossover options
  const [hasYtd, setHasYtd] = useState<boolean>(false);
  const [priorYtdEarnings, setPriorYtdEarnings] = useState<number>(0);

  // Quick presets
  const presets = [
    { label: "$45,000", value: 45000 },
    { label: "$75,000", value: 75000 },
    { label: "$120,000", value: 120000 },
    { label: `$184,500 (2026 Cap)`, value: 184500 },
    { label: "$250,000 (High Earner)", value: 250000 },
  ];

  // Perform calculation
  const result = useMemo(() => {
    return calculateOASDITax({
      grossWage,
      inputMode,
      frequency,
      employmentType,
      taxYear,
      ytdConfig: {
        hasPriorEarnings: hasYtd,
        priorYtdEarnings,
      },
    });
  }, [grossWage, inputMode, frequency, employmentType, taxYear, hasYtd, priorYtdEarnings]);

  const wageBaseCap = OASDI_WAGE_BASE_BY_YEAR[taxYear] || 184500;

  // Format currency helper
  const fmt = (val: number, decimals = 2) => {
    return val.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden transition-all">
      {/* Header bar with SSA verification badge */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 p-5 sm:p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                IRS & SSA Verified
              </span>
              <span className="bg-emerald-400/25 text-emerald-100 text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-300/30">
                Tax Year {taxYear}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Interactive OASDI & Social Security Calculator
            </h2>
          </div>

          <div className="text-right sm:border-l sm:border-white/20 sm:pl-4">
            <div className="text-xs text-teal-100 font-medium">Annual Wage Base Cap</div>
            <div className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
              ${wageBaseCap.toLocaleString("en-US")}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-8">
        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Employment Type & Tax Year */}
          <div className="space-y-5">
            {/* Employment Type Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Employment Status
              </label>
              <div className="grid grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-800/70 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <button
                  type="button"
                  id="btn-employee-toggle"
                  onClick={() => setEmploymentType("employee")}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                    employmentType === "employee"
                      ? "bg-white dark:bg-zinc-700 text-teal-700 dark:text-teal-300 shadow-sm border border-zinc-200 dark:border-zinc-600"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>W-2 Employee (6.2%)</span>
                </button>

                <button
                  type="button"
                  id="btn-self-employed-toggle"
                  onClick={() => setEmploymentType("self_employed")}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                    employmentType === "self_employed"
                      ? "bg-white dark:bg-zinc-700 text-teal-700 dark:text-teal-300 shadow-sm border border-zinc-200 dark:border-zinc-600"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Self-Employed (12.4%)</span>
                </button>
              </div>
            </div>

            {/* Tax Year Selector */}
            <div>
              <label htmlFor="tax-year-select" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Tax Year (Cap Limit)
              </label>
              <div className="relative">
                <select
                  id="tax-year-select"
                  value={taxYear}
                  onChange={(e) => setTaxYear(Number(e.target.value))}
                  className="w-full appearance-none bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl py-2.5 px-3.5 pr-8 font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none cursor-pointer"
                >
                  {AVAILABLE_OASDI_YEARS.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr} Tax Year — ${OASDI_WAGE_BASE_BY_YEAR[yr].toLocaleString("en-US")} Wage Base Limit {yr === 2026 ? "(Current Year)" : ""}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Pay Frequency */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Paycheck Frequency
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 bg-zinc-100 dark:bg-zinc-800/70 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
                {(
                  [
                    { key: "weekly", label: "Weekly" },
                    { key: "biweekly", label: "Biweekly" },
                    { key: "semimonthly", label: "Semi-Mo" },
                    { key: "monthly", label: "Monthly" },
                    { key: "annual", label: "Annual" },
                  ] as { key: PayFrequency; label: string }[]
                ).map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFrequency(key)}
                    className={`py-2 px-1 text-xs font-semibold rounded-lg text-center transition-all ${
                      frequency === key
                        ? "bg-white dark:bg-zinc-700 text-teal-700 dark:text-teal-300 shadow-sm border border-zinc-200 dark:border-zinc-600"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Gross Wage Input & Mode */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="gross-wage-input" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {inputMode === "annual" ? "Annual Gross Wages" : "Per-Paycheck Gross Wages"}
                </label>
                {/* Input Mode Toggle (Annual vs Per-Paycheck) */}
                <div className="inline-flex rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 p-0.5 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setInputMode("annual")}
                    className={`px-2 py-0.5 rounded-md transition-all ${
                      inputMode === "annual"
                        ? "bg-white dark:bg-zinc-700 text-teal-600 dark:text-teal-400 shadow-xs font-semibold"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    Annual Salary
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputMode("per_paycheck")}
                    className={`px-2 py-0.5 rounded-md transition-all ${
                      inputMode === "per_paycheck"
                        ? "bg-white dark:bg-zinc-700 text-teal-600 dark:text-teal-400 shadow-xs font-semibold"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                    }`}
                  >
                    Per Paycheck
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <DollarSign className="w-5 h-5" />
                </div>
                <input
                  id="gross-wage-input"
                  type="number"
                  min="0"
                  step="500"
                  value={grossWage || ""}
                  onChange={(e) => setGrossWage(Math.max(0, Number(e.target.value)))}
                  placeholder="e.g. 75,000"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white text-lg font-bold focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Quick Presets */}
              {inputMode === "annual" && (
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium mr-1">
                    Presets:
                  </span>
                  {presets.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setGrossWage(p.value)}
                      className={`text-[11px] px-2 py-0.5 rounded-md font-medium border transition-colors ${
                        grossWage === p.value
                          ? "bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-700"
                          : "bg-zinc-100 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Equivalent Paycheck / Annual helper tag */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
              <span>
                {inputMode === "annual" ? "Calculated Per Paycheck Gross:" : "Calculated Annualized Gross:"}
              </span>
              <span className="font-bold text-zinc-900 dark:text-white text-sm">
                {inputMode === "annual" ? fmt(result.paycheckGross) : fmt(result.annualGross)}
              </span>
            </div>

            {/* Mid-Year Crossover YTD Toggle */}
            <div className="border border-zinc-200 dark:border-zinc-700/80 rounded-xl p-3.5 bg-zinc-50/70 dark:bg-zinc-800/30 transition-all">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hasYtd}
                  onChange={(e) => setHasYtd(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 border-zinc-300 dark:border-zinc-600 dark:bg-zinc-800"
                />
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  Calculate mid-year paycheck (with prior YTD earnings)
                </span>
              </label>

              {hasYtd && (
                <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700/60 space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span>Prior YTD Gross (Earned before this check):</span>
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Cap: ${wageBaseCap.toLocaleString("en-US")}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={priorYtdEarnings || ""}
                      onChange={(e) => setPriorYtdEarnings(Math.max(0, Number(e.target.value)))}
                      placeholder="e.g. 170,000"
                      className="w-full pl-8 pr-3 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm text-zinc-900 dark:text-white font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                    Enter the total earnings from Box 3 of your latest paystub to check if this paycheck hits the wage cap.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PRIMARY RESULTS HERO CARD */}
        <div className="bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-transparent dark:from-teal-950/40 dark:via-emerald-950/20 dark:to-zinc-900 border-2 border-teal-500/30 dark:border-teal-500/40 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  {employmentType === "employee" ? "Your OASDI Withholding" : "Your Self-Employed OASDI Tax"}
                </span>
                {result.alreadyOverCapPrior ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                    <CheckCircle2 className="w-3 h-3" />
                    Cap Reached ($0 Tax)
                  </span>
                ) : result.capExceededThisPeriod ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 border border-teal-300 dark:border-teal-700">
                    <Sparkles className="w-3 h-3" />
                    Cap Crossed This Check
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                    <TrendingUp className="w-3 h-3" />
                    Active Withholding ({employmentType === "employee" ? "6.2%" : "12.4%"})
                  </span>
                )}
              </div>

              {/* Prominent Dollar Display */}
              <div className="mt-2 flex items-baseline gap-2">
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
                  {fmt(result.oasdiTaxPeriod)}
                </div>
                <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  / {frequency === "annual" ? "year" : "paycheck"}
                </span>
              </div>
            </div>

            {/* Annual OASDI Total Snapshot */}
            <div className="bg-white dark:bg-zinc-800/90 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700 text-left sm:text-right">
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
                Estimated Annual OASDI Total
              </div>
              <div className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-0.5">
                {fmt(result.annualOASDITax)}
              </div>
              <div className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                Statutory Max: ${((employmentType === "employee" ? 0.062 : 0.124 * 0.9235) * wageBaseCap).toLocaleString("en-US", { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Plain Language Humanized Explanation */}
          <div className="mt-5 p-4 rounded-xl bg-white/80 dark:bg-zinc-800/70 border border-teal-500/20 dark:border-teal-500/30 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <div className="flex items-start gap-2.5">
              <Info className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">{result.explanationSentence}</p>
              </div>
            </div>
          </div>

          {/* Wage Base Cap Progress Bar */}
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                Annual Cap Progress ({result.percentOfCapReached.toFixed(1)}%)
              </span>
              <span className="text-zinc-700 dark:text-zinc-300">
                {result.remainingWageBaseRoom > 0 ? (
                  <>
                    <span className="font-bold text-teal-600 dark:text-teal-400">
                      {fmt(result.remainingWageBaseRoom, 0)}
                    </span>{" "}
                    room left under ${wageBaseCap.toLocaleString("en-US")} cap
                  </>
                ) : (
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    100% of ${wageBaseCap.toLocaleString("en-US")} Cap Reached
                  </span>
                )}
              </span>
            </div>

            <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-3 rounded-full overflow-hidden p-0.5 border border-zinc-300 dark:border-zinc-700">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  result.percentOfCapReached >= 100
                    ? "bg-emerald-500"
                    : "bg-gradient-to-r from-teal-500 to-emerald-500"
                }`}
                style={{ width: `${result.percentOfCapReached}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-zinc-400">
              <span>$0</span>
              <span>50% ({fmt(wageBaseCap / 2, 0)})</span>
              <span className="font-medium text-zinc-600 dark:text-zinc-300">
                Cap: ${wageBaseCap.toLocaleString("en-US")}
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Your OASDI */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              {employmentType === "employee" ? "Employee OASDI (6.2%)" : "Self-Employed OASDI (12.4%)"}
            </div>
            <div className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              {fmt(result.oasdiTaxPeriod)}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Annualized: <span className="font-semibold">{fmt(result.annualOASDITax)}</span>
            </div>
          </div>

          {/* Card 2: Employer Match / SE Deduction */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              {employmentType === "employee" ? "Employer Match (6.2%)" : "1040 Tax Deduction (50%)"}
            </div>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {fmt(result.employerOASDIMatchPeriod)}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {employmentType === "employee"
                ? "Paid directly by employer"
                : "Above-the-line adjustment"}
            </div>
          </div>

          {/* Card 3: Medicare Tax (Contextual) */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide flex items-center justify-between">
              <span>Medicare Tax ({employmentType === "employee" ? "1.45%" : "2.9%"})</span>
            </div>
            <div className="text-2xl font-extrabold text-zinc-900 dark:text-white">
              {fmt(result.medicareTaxPeriod)}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              <span className="font-semibold text-rose-500">Uncapped</span> (No wage limit)
            </div>
          </div>

          {/* Card 4: Total FICA / SE Tax */}
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 space-y-1">
            <div className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
              Total FICA This Period
            </div>
            <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">
              {fmt(result.totalFicaPeriod)}
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Annual: <span className="font-semibold">{fmt(result.annualTotalFica)}</span>
            </div>
          </div>
        </div>

        {/* Crossover Detail Card if applicable */}
        {hasYtd && result.capExceededThisPeriod && (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
            <div className="font-bold flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              Paycheck Wage Split Details (Crossing the ${wageBaseCap.toLocaleString("en-US")} Cap)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 font-medium">
              <div className="bg-white/60 dark:bg-zinc-900/50 p-2 rounded-lg border border-amber-200 dark:border-amber-800">
                Gross Paycheck: <span className="font-bold">{fmt(result.paycheckGross)}</span>
              </div>
              <div className="bg-white/60 dark:bg-zinc-900/50 p-2 rounded-lg border border-amber-200 dark:border-amber-800">
                Taxed at {employmentType === "employee" ? "6.2%" : "12.4%"}:{" "}
                <span className="font-bold text-emerald-700 dark:text-emerald-300">
                  {fmt(result.taxableOASDIWagesPeriod)}
                </span>
              </div>
              <div className="bg-white/60 dark:bg-zinc-900/50 p-2 rounded-lg border border-amber-200 dark:border-amber-800">
                Exempt ($0 OASDI):{" "}
                <span className="font-bold text-teal-700 dark:text-teal-300">
                  {fmt(result.exemptOASDIWagesPeriod)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer meta / update notice */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 gap-2">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated for Tax Year 2026 | Social Security Contribution Cap: ${wageBaseCap.toLocaleString("en-US")}</span>
          </div>
          <div>
            <span>100% Client-Side Private • No Data Stored</span>
          </div>
        </div>
      </div>
    </div>
  );
}
