"use client";

import React, { useState, useMemo } from "react";
import {
  StateTaxData,
  FilingStatus,
  PayFrequency,
  WageType,
  calculatePaycheck,
  PaycheckResult,
} from "@/lib/taxData";
import { formatCurrency } from "@/lib/calculators/creditCardPayoffCalculator";
import {
  DollarSign,
  Briefcase,
  PieChart,
  RotateCcw,
  Sparkles,
  Clock,
} from "lucide-react";

interface PaycheckWidgetProps {
  stateData: StateTaxData;
}

export default function PaycheckWidget({ stateData }: PaycheckWidgetProps) {
  // Inputs
  const [wage, setWage] = useState<number>(75000);
  const [wageType, setWageType] = useState<WageType>("annual");
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [payFrequency, setPayFrequency] = useState<PayFrequency>("biweekly");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [k401Percent, setK401Percent] = useState<number>(0);
  const [monthlyHealth, setMonthlyHealth] = useState<number>(0);
  const [showPreTax, setShowPreTax] = useState<boolean>(false);

  // Calculation
  const result: PaycheckResult = useMemo(() => {
    return calculatePaycheck(
      {
        wage,
        wageType,
        hoursPerWeek,
        payFrequency,
        filingStatus,
        k401Percent,
        monthlyHealthInsurance: monthlyHealth,
      },
      stateData
    );
  }, [wage, wageType, hoursPerWeek, payFrequency, filingStatus, k401Percent, monthlyHealth, stateData]);

  const handleReset = () => {
    setWage(75000);
    setWageType("annual");
    setHoursPerWeek(40);
    setPayFrequency("biweekly");
    setFilingStatus("single");
    setK401Percent(0);
    setMonthlyHealth(0);
  };

  const periodLabels: Record<PayFrequency, string> = {
    annual: "Yearly",
    monthly: "Monthly",
    semimonthly: "Semi-Monthly (24x)",
    biweekly: "Bi-Weekly (Every 2 Wks)",
    weekly: "Weekly",
    hourly: "Hourly",
  };

  const formatPeriodMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-xl space-y-8 font-sans transition-colors">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Briefcase className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              {stateData.name} Paycheck Calculator (2026)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Calculate your exact take-home pay with 2026 federal brackets, FICA limits, and {stateData.name} state tax rules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Filing Status Pill Switcher */}
          <div className="inline-flex p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => setFilingStatus("single")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filingStatus === "single"
                  ? "bg-white dark:bg-zinc-900 text-teal-600 dark:text-teal-400 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              Single
            </button>
            <button
              type="button"
              onClick={() => setFilingStatus("married_joint")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                filingStatus === "married_joint"
                  ? "bg-white dark:bg-zinc-900 text-teal-600 dark:text-teal-400 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              Married
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            title="Reset to defaults"
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Reset calculator inputs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Inputs (Left 5 Cols) vs Results (Right 7 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ================= LEFT: INPUTS ================= */}
        <div className="lg:col-span-5 space-y-5">
          {/* Gross Wage Input */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="gross-wage-input" className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-200 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-teal-500" />
                <span>Gross {wageType === "annual" ? "Salary" : "Hourly Rate"}</span>
              </label>
              <div className="inline-flex p-0.5 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => {
                    setWageType("annual");
                    if (wage < 1000) setWage(75000);
                  }}
                  className={`px-2 py-1 rounded-md transition ${
                    wageType === "annual" ? "bg-white dark:bg-zinc-900 text-teal-600 dark:text-teal-400 shadow-xs" : "text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  Salary
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWageType("hourly");
                    if (wage > 500) setWage(35);
                  }}
                  className={`px-2 py-1 rounded-md transition ${
                    wageType === "hourly" ? "bg-white dark:bg-zinc-900 text-teal-600 dark:text-teal-400 shadow-xs" : "text-zinc-600 dark:text-zinc-300"
                  }`}
                >
                  Hourly
                </button>
              </div>
            </div>

            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
              <input
                id="gross-wage-input"
                type="number"
                min="0"
                max={wageType === "annual" ? 2000000 : 1000}
                step={wageType === "annual" ? 1000 : 0.5}
                value={wage || ""}
                onChange={(e) => setWage(Number(e.target.value) || 0)}
                className="w-full pl-8 pr-4 py-2 rounded-xl text-lg font-mono font-bold bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-zinc-900 dark:text-white"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 font-semibold">
                {wageType === "annual" ? "/ year" : "/ hour"}
              </span>
            </div>

            {wageType === "hourly" ? (
              <div className="pt-2 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-300">
                <span className="font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  Hours per week:
                </span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value) || 40)}
                  className="w-16 px-2 py-1 rounded-lg text-right font-mono font-bold bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700"
                />
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[45000, 60000, 75000, 100000, 150000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setWage(preset)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      wage === preset
                        ? "bg-teal-600 text-white"
                        : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    ${preset / 1000}k
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pay Frequency */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
            <label htmlFor="pay-frequency-select" className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-200 block">
              Pay Frequency (For Net Pay Hero Card)
            </label>
            <select
              id="pay-frequency-select"
              value={payFrequency}
              onChange={(e) => setPayFrequency(e.target.value as PayFrequency)}
              className="w-full px-3 py-2 rounded-xl text-sm font-semibold bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="biweekly">Bi-Weekly (Every 2 Weeks - 26 Paychecks/Year)</option>
              <option value="semimonthly">Semi-Monthly (Twice per Month - 24 Paychecks/Year)</option>
              <option value="monthly">Monthly (12 Paychecks/Year)</option>
              <option value="weekly">Weekly (52 Paychecks/Year)</option>
              <option value="annual">Annually (Total Year Net)</option>
              <option value="hourly">Hourly (Effective Net Hourly Rate)</option>
            </select>
          </div>

          {/* Filing Status Full Dropdown */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
            <label htmlFor="filing-status-select" className="text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-200 block">
              Tax Filing Status
            </label>
            <select
              id="filing-status-select"
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value as FilingStatus)}
              className="w-full px-3 py-2 rounded-xl text-sm font-semibold bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="single">Single (Standard Deduction $15,000)</option>
              <option value="married_joint">Married Filing Jointly (Standard Deduction $30,000)</option>
              <option value="head_of_household">Head of Household (Standard Deduction $22,500)</option>
            </select>
          </div>

          {/* Optional Pre-Tax Deductions Accordion */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
            <button
              type="button"
              onClick={() => setShowPreTax(!showPreTax)}
              className="w-full flex items-center justify-between text-xs font-bold text-teal-700 dark:text-teal-400"
            >
              <span>+ Pre-Tax Deductions (401k &amp; Health Insurance)</span>
              <span>{showPreTax ? "▲ Hide" : "▼ Show"}</span>
            </button>

            {showPreTax && (
              <div className="space-y-4 pt-2 border-t border-zinc-200 dark:border-zinc-800 animate-fade-in">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-zinc-600 dark:text-zinc-300">Traditional 401(k) Contribution</span>
                    <span className="font-mono text-teal-600 dark:text-teal-400">{k401Percent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="1"
                    value={k401Percent}
                    onChange={(e) => setK401Percent(Number(e.target.value))}
                    aria-label="401k contribution percentage slider"
                    className="w-full accent-teal-600 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-zinc-600 dark:text-zinc-300">Monthly Health Insurance Premium</span>
                    <span className="font-mono text-teal-600 dark:text-teal-400">${monthlyHealth}/mo</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="25"
                    value={monthlyHealth}
                    onChange={(e) => setMonthlyHealth(Number(e.target.value))}
                    aria-label="Monthly health insurance premium slider"
                    className="w-full accent-teal-600 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT: RESULTS & BREAKDOWN ================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* Hero Net Pay Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 text-white shadow-2xl relative overflow-hidden border border-zinc-800">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Take-Home Pay ({periodLabels[payFrequency]})</span>
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-1 text-emerald-400 font-mono">
                  {formatPeriodMoney(result.selectedPeriod.netPay)}
                </h3>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-zinc-400 block">Take-Home Rate</span>
                <span className="text-xl sm:text-2xl font-extrabold text-white font-mono">
                  {result.takeHomePercentage.toFixed(1)}%
                </span>
                <span className="text-[11px] text-zinc-500 block">of gross earnings</span>
              </div>
            </div>

            {/* Quick 3-Period Overview Strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 text-center">
              <div className="p-3 rounded-2xl bg-zinc-800/60 border border-zinc-700/50">
                <span className="text-[10px] sm:text-xs text-zinc-400 block">Bi-Weekly Pay</span>
                <span className="text-sm sm:text-base font-bold text-white font-mono mt-0.5 block">
                  {formatCurrency(result.periods.biweekly.netPay)}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-800/60 border border-zinc-700/50">
                <span className="text-[10px] sm:text-xs text-zinc-400 block">Monthly Pay</span>
                <span className="text-sm sm:text-base font-bold text-white font-mono mt-0.5 block">
                  {formatCurrency(result.periods.monthly.netPay)}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-800/60 border border-zinc-700/50">
                <span className="text-[10px] sm:text-xs text-zinc-400 block">Annual Net</span>
                <span className="text-sm sm:text-base font-bold text-white font-mono mt-0.5 block">
                  {formatCurrency(result.annualNetPay)}
                </span>
              </div>
            </div>
          </div>

          {/* Visual Percentage Breakdown Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-800 dark:text-zinc-200">
                <PieChart className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>Earnings Distribution Breakdown</span>
              </div>
              <span className="text-xs text-zinc-400 font-mono">
                Total Tax: {result.effectiveTotalTaxRate.toFixed(1)}%
              </span>
            </div>

            {/* Stacked Progress Bar */}
            <div className="w-full h-4 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden flex shadow-inner">
              <div
                style={{ width: `${Math.max(2, result.takeHomePercentage)}%` }}
                className="bg-emerald-500 transition-all duration-300"
                title={`Take-Home Pay: ${result.takeHomePercentage.toFixed(1)}%`}
              />
              <div
                style={{ width: `${result.effectiveFederalRate}%` }}
                className="bg-blue-500 transition-all duration-300"
                title={`Federal Tax: ${result.effectiveFederalRate.toFixed(1)}%`}
              />
              {stateData.hasIncomeTax && (
                <div
                  style={{ width: `${result.effectiveStateRate}%` }}
                  className="bg-purple-500 transition-all duration-300"
                  title={`${stateData.name} State Tax: ${result.effectiveStateRate.toFixed(1)}%`}
                />
              )}
              <div
                style={{ width: `${result.effectiveFicaRate}%` }}
                className="bg-amber-500 transition-all duration-300"
                title={`FICA (SS + Medicare): ${result.effectiveFicaRate.toFixed(1)}%`}
              />
            </div>

            {/* Color Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-semibold">
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Net ({result.takeHomePercentage.toFixed(1)}%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Fed ({result.effectiveFederalRate.toFixed(1)}%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>{stateData.abbrev} ({stateData.hasIncomeTax ? `${result.effectiveStateRate.toFixed(1)}%` : "0.0%"})</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>FICA ({result.effectiveFicaRate.toFixed(1)}%)</span>
              </div>
            </div>
          </div>

          {/* Detailed Itemized Pay Stub Table */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm bg-white dark:bg-zinc-900">
            <div className="p-3.5 bg-zinc-100 dark:bg-zinc-850 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-200">
                Itemized Paycheck Deductions
              </span>
              <span className="text-[11px] text-zinc-500">
                Annual vs. {periodLabels[payFrequency]}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 dark:bg-zinc-800/60 text-zinc-500 dark:text-zinc-400 font-semibold border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="py-2.5 px-3">Tax / Deduction</th>
                    <th className="py-2.5 px-3 text-right">Annual</th>
                    <th className="py-2.5 px-3 text-right">{periodLabels[payFrequency]}</th>
                    <th className="py-2.5 px-3 text-right">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono">
                  <tr>
                    <td className="py-2 px-3 font-sans font-bold text-zinc-900 dark:text-white">Gross Wages</td>
                    <td className="py-2 px-3 text-right font-bold text-zinc-900 dark:text-white">{formatCurrency(result.grossAnnual)}</td>
                    <td className="py-2 px-3 text-right font-bold text-zinc-900 dark:text-white">{formatPeriodMoney(result.selectedPeriod.gross)}</td>
                    <td className="py-2 px-3 text-right text-zinc-400 font-sans">100%</td>
                  </tr>

                  {result.annualPreTaxDeductions > 0 && (
                    <tr className="text-teal-600 dark:text-teal-400 bg-teal-50/40 dark:bg-teal-950/20">
                      <td className="py-2 px-3 font-sans">Pre-Tax Deductions (401k/Health)</td>
                      <td className="py-2 px-3 text-right">-{formatCurrency(result.annualPreTaxDeductions)}</td>
                      <td className="py-2 px-3 text-right">-{formatPeriodMoney(result.selectedPeriod.preTaxDeductions)}</td>
                      <td className="py-2 px-3 text-right font-sans">-</td>
                    </tr>
                  )}

                  <tr>
                    <td className="py-2 px-3 font-sans">Federal Income Tax</td>
                    <td className="py-2 px-3 text-right text-rose-600 dark:text-rose-400">-{formatCurrency(result.annualFederalTax)}</td>
                    <td className="py-2 px-3 text-right text-rose-600 dark:text-rose-400">-{formatPeriodMoney(result.selectedPeriod.federalTax)}</td>
                    <td className="py-2 px-3 text-right text-zinc-400 font-sans">{result.effectiveFederalRate.toFixed(1)}%</td>
                  </tr>

                  <tr>
                    <td className="py-2 px-3 font-sans flex items-center gap-1.5">
                      <span>{stateData.name} State Income Tax</span>
                      {!stateData.hasIncomeTax && (
                        <span className="text-[10px] font-sans font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                          0% State
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-right text-purple-600 dark:text-purple-400">
                      {stateData.hasIncomeTax ? `-${formatCurrency(result.annualStateTax)}` : "$0"}
                    </td>
                    <td className="py-2 px-3 text-right text-purple-600 dark:text-purple-400">
                      {stateData.hasIncomeTax ? `-${formatPeriodMoney(result.selectedPeriod.stateTax)}` : "$0.00"}
                    </td>
                    <td className="py-2 px-3 text-right text-zinc-400 font-sans">
                      {stateData.hasIncomeTax ? `${result.effectiveStateRate.toFixed(1)}%` : "0.0%"}
                    </td>
                  </tr>

                  <tr>
                    <td className="py-2 px-3 font-sans">Social Security (6.2%)</td>
                    <td className="py-2 px-3 text-right text-amber-600 dark:text-amber-400">-{formatCurrency(result.annualSocialSecurity)}</td>
                    <td className="py-2 px-3 text-right text-amber-600 dark:text-amber-400">-{formatPeriodMoney(result.selectedPeriod.socialSecurity)}</td>
                    <td className="py-2 px-3 text-right text-zinc-400 font-sans">6.2%</td>
                  </tr>

                  <tr>
                    <td className="py-2 px-3 font-sans">Medicare (1.45%)</td>
                    <td className="py-2 px-3 text-right text-amber-600 dark:text-amber-400">-{formatCurrency(result.annualMedicare)}</td>
                    <td className="py-2 px-3 text-right text-amber-600 dark:text-amber-400">-{formatPeriodMoney(result.selectedPeriod.medicare)}</td>
                    <td className="py-2 px-3 text-right text-zinc-400 font-sans">1.45%</td>
                  </tr>

                  <tr className="bg-emerald-50/60 dark:bg-emerald-950/30 font-bold border-t-2 border-emerald-500/30">
                    <td className="py-2.5 px-3 font-sans text-emerald-800 dark:text-emerald-300">
                      Net Take-Home Pay
                    </td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 dark:text-emerald-300">
                      {formatCurrency(result.annualNetPay)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 dark:text-emerald-300">
                      {formatPeriodMoney(result.selectedPeriod.netPay)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-emerald-700 dark:text-emerald-300 font-sans">
                      {result.takeHomePercentage.toFixed(1)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
