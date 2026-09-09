"use client";

import React, { useState, useMemo } from "react";
import {
  StateTaxConfig,
  FilingStatus,
  PayFrequency,
  WageType,
  calculateStateSalaryPaycheck,
  FILING_STATUS_LABELS,
} from "@/lib/calculators/stateSalaryConfig";
import {
  DollarSign,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Clock,
  Briefcase,
  PieChart,
  Percent,
} from "lucide-react";

interface StateSalaryCalculatorWidgetProps {
  stateConfig: StateTaxConfig;
}

export default function StateSalaryCalculatorWidget({ stateConfig }: StateSalaryCalculatorWidgetProps) {
  // Input states
  const [wageType, setWageType] = useState<WageType>("annual");
  const [wage, setWage] = useState<number>(60000);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [payFrequency, setPayFrequency] = useState<PayFrequency>("biweekly");

  // Pre-tax deductions (collapsed by default)
  const [showPreTax, setShowPreTax] = useState<boolean>(false);
  const [fourZeroOneKPercent, setFourZeroOneKPercent] = useState<number>(0);
  const [monthlyHealthInsurance, setMonthlyHealthInsurance] = useState<number>(0);

  // Quick salary presets
  const presets = [
    { label: "$40,000", value: 40000 },
    { label: "$60,000", value: 60000 },
    { label: "$80,000", value: 80000 },
    { label: "$100,000", value: 100000 },
    { label: "$150,000", value: 150000 },
  ];

  // Perform calculation
  const result = useMemo(() => {
    return calculateStateSalaryPaycheck(
      {
        wage,
        wageType,
        hoursPerWeek,
        filingStatus,
        payFrequency,
        preTaxDeductions: {
          fourZeroOneKPercent,
          monthlyHealthInsurance,
        },
      },
      stateConfig
    );
  }, [wage, wageType, hoursPerWeek, filingStatus, payFrequency, fourZeroOneKPercent, monthlyHealthInsurance, stateConfig]);

  // Currency formatter
  const fmt = (val: number, decimals = 2) => {
    return (val || 0).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const frequencyLabels: Record<PayFrequency, string> = {
    annual: "Annually",
    monthly: "Monthly",
    semimonthly: "Semi-Monthly",
    biweekly: "Biweekly",
    weekly: "Weekly",
  };

  const unitLabels: Record<PayFrequency, string> = {
    annual: "year",
    monthly: "month",
    semimonthly: "semi-mo",
    biweekly: "paycheck",
    weekly: "week",
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden transition-all">
      {/* Header bar with State and Tax Year */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 p-5 sm:p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Tax Engine
              </span>
              <span className="bg-emerald-400/25 text-emerald-100 text-xs font-medium px-2 py-0.5 rounded-full border border-emerald-300/30">
                {stateConfig.taxYear} Tax Tables
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {stateConfig.stateName} Salary & Paycheck Calculator
            </h2>
          </div>

          <div className="text-right sm:border-l sm:border-white/20 sm:pl-4">
            <div className="text-xs text-teal-100 font-medium">{stateConfig.stateAbbrev} Top Income Rate</div>
            <div className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
              {(stateConfig.topMarginalRate * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-8">
        {/* Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Wage Type, Wage Input & Presets */}
          <div className="space-y-5">
            {/* Wage Type Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Income Mode
              </label>
              <div className="grid grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-800/70 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
                <button
                  type="button"
                  id="btn-annual-toggle"
                  onClick={() => {
                    if (wageType === "hourly") setWage(60000);
                    setWageType("annual");
                  }}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                    wageType === "annual"
                      ? "bg-white dark:bg-zinc-700 text-teal-700 dark:text-teal-300 shadow-sm border border-zinc-200 dark:border-zinc-600"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Annual Salary</span>
                </button>

                <button
                  type="button"
                  id="btn-hourly-toggle"
                  onClick={() => {
                    if (wageType === "annual") setWage(30);
                    setWageType("hourly");
                  }}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                    wageType === "hourly"
                      ? "bg-white dark:bg-zinc-700 text-teal-700 dark:text-teal-300 shadow-sm border border-zinc-200 dark:border-zinc-600"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Hourly Wage</span>
                </button>
              </div>
            </div>

            {/* Wage Input */}
            <div>
              <label htmlFor="input-wage" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                {wageType === "annual" ? "Gross Annual Salary" : "Hourly Pay Rate"}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                  <DollarSign className="w-5 h-5" />
                </div>
                <input
                  id="input-wage"
                  type="number"
                  min="0"
                  step={wageType === "annual" ? "1000" : "0.5"}
                  value={wage || ""}
                  onChange={(e) => setWage(Math.max(0, Number(e.target.value)))}
                  placeholder={wageType === "annual" ? "e.g. 60,000" : "e.g. 30.00"}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 rounded-xl text-zinc-900 dark:text-white text-lg font-bold focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Hours per week if hourly */}
              {wageType === "hourly" && (
                <div className="mt-3 flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700/60">
                  <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    Hours Worked Per Week:
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(Math.max(1, Math.min(100, Number(e.target.value))))}
                      className="w-16 px-2 py-1 bg-white dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm text-center font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <span className="text-xs text-zinc-500">hrs/wk</span>
                  </div>
                </div>
              )}

              {/* Quick Presets for Annual */}
              {wageType === "annual" && (
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium mr-1">
                    Presets:
                  </span>
                  {presets.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setWage(p.value)}
                      className={`text-[11px] px-2 py-0.5 rounded-md font-medium border transition-colors ${
                        wage === p.value
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

            {/* Equivalent Annual / Hourly Helper Banner */}
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl border border-zinc-200 dark:border-zinc-700/60 text-xs text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
              <span>
                {wageType === "annual" ? "Equivalent Hourly (40h/wk):" : "Calculated Annualized Gross:"}
              </span>
              <span className="font-bold text-zinc-900 dark:text-white text-sm">
                {wageType === "annual" ? fmt(result.grossAnnual / 2080) + "/hr" : fmt(result.grossAnnual)}
              </span>
            </div>
          </div>

          {/* Right Column: Filing Status, Pay Frequency, Pre-Tax Deductions */}
          <div className="space-y-5">
            {/* Filing Status */}
            <div>
              <label htmlFor="filing-status-select" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Federal & State Tax Filing Status
              </label>
              <div className="relative">
                <select
                  id="filing-status-select"
                  value={filingStatus}
                  onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
                  className="w-full appearance-none bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm rounded-xl py-2.5 px-3.5 pr-8 font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none cursor-pointer"
                >
                  {(["single", "married_joint", "head_of_household"] as FilingStatus[]).map((status) => (
                    <option key={status} value={status}>
                      {FILING_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Pay Frequency Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                Paycheck Frequency (Results View)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 bg-zinc-100 dark:bg-zinc-800/70 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
                {(
                  [
                    { key: "annual", label: "Annual" },
                    { key: "monthly", label: "Monthly" },
                    { key: "semimonthly", label: "Semi-Mo" },
                    { key: "biweekly", label: "Biweekly" },
                    { key: "weekly", label: "Weekly" },
                  ] as { key: PayFrequency; label: string }[]
                ).map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPayFrequency(key)}
                    className={`py-2 px-1 text-xs font-semibold rounded-lg text-center transition-all ${
                      payFrequency === key
                        ? "bg-white dark:bg-zinc-700 text-teal-700 dark:text-teal-300 shadow-sm border border-zinc-200 dark:border-zinc-600"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Pre-Tax Deductions Drawer */}
            <div className="border border-zinc-200 dark:border-zinc-700/80 rounded-xl overflow-hidden bg-zinc-50/70 dark:bg-zinc-800/30">
              <button
                type="button"
                onClick={() => setShowPreTax(!showPreTax)}
                className="w-full px-3.5 py-2.5 flex items-center justify-between text-left text-xs font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Percent className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>Optional Pre-Tax Deductions (401k & Health)</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400">
                  <span className="text-[11px] font-normal">{showPreTax ? "Collapse" : "Expand"}</span>
                  {showPreTax ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>
              </button>

              {showPreTax && (
                <div className="p-3.5 pt-2 border-t border-zinc-200 dark:border-zinc-700/60 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="input-401k" className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                        401(k) Contribution (%)
                      </label>
                      <div className="relative">
                        <input
                          id="input-401k"
                          type="number"
                          min="0"
                          max="60"
                          value={fourZeroOneKPercent || ""}
                          onChange={(e) => setFourZeroOneKPercent(Math.max(0, Math.min(60, Number(e.target.value))))}
                          placeholder="e.g. 5"
                          className="w-full px-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">%</span>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="input-health" className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                        Health Insurance ($/month)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">$</span>
                        <input
                          id="input-health"
                          type="number"
                          min="0"
                          value={monthlyHealthInsurance || ""}
                          onChange={(e) => setMonthlyHealthInsurance(Math.max(0, Number(e.target.value)))}
                          placeholder="e.g. 200"
                          className="w-full pl-7 pr-3 py-1.5 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg text-sm font-semibold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Pre-tax 401(k) contributions reduce taxable federal & state income, while qualifying Section 125 health insurance premiums also lower FICA wages.
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
                  Estimated Take-Home Pay ({stateConfig.stateName})
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  {result.takeHomePercentage.toFixed(1)}% Retained
                </span>
              </div>

              {/* Prominent Dollar Amount Display */}
              <div className="mt-2 flex items-baseline gap-2">
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white">
                  {fmt(result.selectedPeriod.netPay)}
                </div>
                <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                  / {unitLabels[payFrequency]}
                </span>
              </div>
            </div>

            {/* Annual Net & Gross Snapshot */}
            <div className="bg-white dark:bg-zinc-800/90 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700 text-left sm:text-right">
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
                Annual Take-Home Total
              </div>
              <div className="text-2xl font-black text-teal-600 dark:text-teal-400 mt-0.5">
                {fmt(result.annualNetPay)}
              </div>
              <div className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                From {fmt(result.grossAnnual)} Gross Salary
              </div>
            </div>
          </div>

          {/* Tax Rates Summary Bar */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-white/70 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
              <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase">Effective Total Tax</div>
              <div className="text-base font-extrabold text-zinc-900 dark:text-white mt-0.5">
                {result.effectiveTotalTaxRate.toFixed(1)}%
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/70 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
              <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase">Federal Income</div>
              <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">
                {result.effectiveFederalRate.toFixed(1)}%
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/70 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
              <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase">{stateConfig.stateAbbrev} State Tax</div>
              <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {result.effectiveStateRate.toFixed(1)}%
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-white/70 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
              <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase">FICA (SS & Med)</div>
              <div className="text-base font-extrabold text-teal-600 dark:text-teal-400 mt-0.5">
                {result.effectiveFicaRate.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* ITEMIZED DEDUCTIONS BREAKDOWN */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-3 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Itemized Deductions ({frequencyLabels[payFrequency]})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {result.deductionsList.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
                    {item.name}
                  </div>
                  <div className="text-lg font-extrabold text-zinc-900 dark:text-white mt-1">
                    {fmt(item.amountSelected)}
                  </div>
                </div>
                <div className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-2 flex justify-between">
                  <span>{item.percentOfGross.toFixed(1)}% of gross</span>
                  <span>Annual: {fmt(item.amountAnnual, 0)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ALL-FREQUENCIES MULTI-SCHEDULE BREAKDOWN TABLE */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          <div className="bg-zinc-100 dark:bg-zinc-800/80 px-4 py-3 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Complete Paycheck Schedule Comparison
            </span>
            <span className="text-[11px] text-zinc-500">All 5 Standard Pay Frequencies</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400">
                  <th className="py-2.5 px-3.5 font-bold">Frequency</th>
                  <th className="py-2.5 px-3.5 font-bold">Gross Pay</th>
                  <th className="py-2.5 px-3.5 font-bold">Federal Tax</th>
                  <th className="py-2.5 px-3.5 font-bold">{stateConfig.stateAbbrev} State</th>
                  <th className="py-2.5 px-3.5 font-bold">FICA</th>
                  <th className="py-2.5 px-3.5 font-bold text-teal-700 dark:text-teal-300">Take-Home Pay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {(["annual", "monthly", "semimonthly", "biweekly", "weekly"] as PayFrequency[]).map((freq) => {
                  const b = result.allFrequencies[freq];
                  const isCurrent = freq === payFrequency;
                  return (
                    <tr
                      key={freq}
                      className={isCurrent ? "bg-teal-50/50 dark:bg-teal-950/30 font-semibold" : "hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30"}
                    >
                      <td className="py-2.5 px-3.5 font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>}
                        {frequencyLabels[freq]}
                      </td>
                      <td className="py-2.5 px-3.5 text-zinc-700 dark:text-zinc-300">{fmt(b.gross)}</td>
                      <td className="py-2.5 px-3.5 text-zinc-600 dark:text-zinc-400">{fmt(b.federalTax)}</td>
                      <td className="py-2.5 px-3.5 text-zinc-600 dark:text-zinc-400">{fmt(b.stateTax)}</td>
                      <td className="py-2.5 px-3.5 text-zinc-600 dark:text-zinc-400">{fmt(b.socialSecurity + b.medicare)}</td>
                      <td className="py-2.5 px-3.5 font-bold text-teal-700 dark:text-teal-300">{fmt(b.netPay)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Verification footer */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>
              Rates verified for Tax Year {stateConfig.taxYear} | {stateConfig.stateName} Top Rate: {(stateConfig.topMarginalRate * 100).toFixed(1)}% | 0% Local Taxes
            </span>
          </div>
          <div>
            <span>100% Client-Side Private • No Data Transmitted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
