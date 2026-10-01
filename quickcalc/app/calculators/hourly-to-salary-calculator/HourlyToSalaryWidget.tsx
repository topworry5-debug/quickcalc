"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  DollarSign,
  Clock,
  Calendar,
  Briefcase,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Building2,
  Copy,
  Check,
} from "lucide-react";
import {
  calculateHourlyToSalary,
  DEFAULT_HOURLY_INPUT,
  HourlySalaryInput,
  formatMoney,
  formatMoneyDetailed,
} from "@/lib/calculators/hourlySalaryCalculator";

export default function HourlyToSalaryWidget() {
  const [inputs, setInputs] = useState<HourlySalaryInput>(DEFAULT_HOURLY_INPUT);
  const [copied, setCopied] = useState(false);

  // Compute results dynamically
  const result = useMemo(() => {
    return calculateHourlyToSalary(inputs);
  }, [inputs]);

  const updateInput = <K extends keyof HourlySalaryInput>(key: K, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [key]: isNaN(value) ? 0 : Math.max(0, value),
    }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_HOURLY_INPUT);
  };

  const handleCopySummary = async () => {
    const text = `Hourly to Salary Calculation (QuickCalc.cloud):
Hourly Rate: $${inputs.hourlyWage}/hr
Annual Salary (Unadjusted 2,080h): ${formatMoney(result.unadjustedAnnual)}
Adjusted Annual Take: ${formatMoney(result.adjustedAnnual)}
Monthly Pay: ${formatMoney(result.adjustedPeriods.monthly)}
Bi-Weekly Pay: ${formatMoney(result.adjustedPeriods.biweekly)}
Weekly Pay: ${formatMoney(result.adjustedPeriods.weekly)}
Hours Worked/Year: ${result.totalAnnualHours} hrs
Effective Rate: $${result.effectiveHourlyRate}/hr`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const PRESETS = [15, 20, 25, 30, 35, 45, 50, 75, 100];

  return (
    <div className="w-full bg-base-card border border-surface-border rounded-3xl p-4 sm:p-8 shadow-xl">
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 mb-2">
            <Sparkles size={13} className="text-teal-600 dark:text-teal-400" />
            <span>2026 Interactive Wage Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-ink">
            Hourly Wage to Annual Salary Calculator
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted mt-1">
            Calculate gross annual salary, monthly, bi-weekly, and weekly pay with overtime &amp; unpaid PTO adjustments.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleCopySummary}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-surface-muted hover:bg-surface-border text-ink border border-surface-border transition-colors min-h-[40px]"
            title="Copy earnings breakdown to clipboard"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            <span>{copied ? "Copied!" : "Copy Summary"}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-surface-muted hover:bg-surface-border text-ink-muted hover:text-ink border border-surface-border transition-colors min-h-[40px]"
            title="Reset calculator inputs to default ($35/hr, 40 hrs/wk)"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Quick Wage Preset Chips */}
      <div className="py-4 border-b border-surface-border">
        <label className="block text-xs font-bold uppercase tracking-wider text-ink-muted mb-2">
          Popular Hourly Rates:
        </label>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {PRESETS.map((wage) => (
            <button
              key={wage}
              type="button"
              onClick={() => updateInput("hourlyWage", wage)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all min-h-[36px] shrink-0 ${
                inputs.hourlyWage === wage
                  ? "bg-teal-600 text-white shadow-sm shadow-teal-500/20 scale-105"
                  : "bg-surface-muted hover:bg-surface-border text-ink border border-surface-border"
              }`}
            >
              ${wage}/hr
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Controls (Left) vs Output & Metrics (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Hourly Wage Control */}
          <div className="bg-surface-muted/50 p-4 sm:p-5 rounded-2xl border border-surface-border space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="hourlyWageInput" className="text-sm font-bold text-ink flex items-center gap-2">
                <DollarSign size={16} className="text-teal-600 dark:text-teal-400" />
                <span>Hourly Wage Rate</span>
              </label>
              <div className="relative w-32">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted font-bold text-sm">$</span>
                <input
                  id="hourlyWageInput"
                  type="number"
                  min="1"
                  max="500"
                  step="0.5"
                  value={inputs.hourlyWage || ""}
                  onChange={(e) => updateInput("hourlyWage", parseFloat(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-1.5 text-right font-mono font-bold text-sm bg-base-card border border-surface-border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="10"
              max="150"
              step="1"
              value={inputs.hourlyWage}
              onChange={(e) => updateInput("hourlyWage", parseFloat(e.target.value))}
              aria-label="Hourly wage slider"
              className="w-full accent-teal-600 h-2 bg-surface-border rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-ink-muted font-mono font-semibold">
              <span>$10/hr</span>
              <span>$75/hr</span>
              <span>$150/hr</span>
            </div>
          </div>

          {/* Hours Per Week Control */}
          <div className="bg-surface-muted/50 p-4 sm:p-5 rounded-2xl border border-surface-border space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="hoursPerWeekInput" className="text-sm font-bold text-ink flex items-center gap-2">
                <Clock size={16} className="text-teal-600 dark:text-teal-400" />
                <span>Hours Worked Per Week</span>
              </label>
              <div className="relative w-28">
                <input
                  id="hoursPerWeekInput"
                  type="number"
                  min="1"
                  max="80"
                  value={inputs.hoursPerWeek || ""}
                  onChange={(e) => updateInput("hoursPerWeek", parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-right font-mono font-bold text-sm bg-base-card border border-surface-border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="1"
              value={inputs.hoursPerWeek}
              onChange={(e) => updateInput("hoursPerWeek", parseInt(e.target.value))}
              aria-label="Hours per week slider"
              className="w-full accent-teal-600 h-2 bg-surface-border rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-ink-muted font-mono font-semibold">
              <span>Part-Time (20h)</span>
              <span>Full-Time (40h)</span>
              <span>Overtime (60h)</span>
            </div>
          </div>

          {/* Days Per Week & Unpaid Time Off */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface-muted/50 p-4 rounded-2xl border border-surface-border space-y-2">
              <label htmlFor="daysPerWeekInput" className="text-xs font-bold text-ink flex items-center gap-1.5">
                <Calendar size={14} className="text-teal-600 dark:text-teal-400" />
                <span>Work Days / Wk</span>
              </label>
              <input
                id="daysPerWeekInput"
                type="number"
                min="1"
                max="7"
                value={inputs.daysPerWeek || ""}
                onChange={(e) => updateInput("daysPerWeek", parseInt(e.target.value) || 0)}
                className="w-full px-3 py-1.5 text-right font-mono font-bold text-sm bg-base-card border border-surface-border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
              <span className="text-[10px] text-ink-muted block">Standard: 5 days</span>
            </div>

            <div className="bg-surface-muted/50 p-4 rounded-2xl border border-surface-border space-y-2">
              <label htmlFor="unpaidWeeksInput" className="text-xs font-bold text-ink flex items-center gap-1.5">
                <Briefcase size={14} className="text-amber-600 dark:text-amber-400" />
                <span>Unpaid Wks / Yr</span>
              </label>
              <input
                id="unpaidWeeksInput"
                type="number"
                min="0"
                max="26"
                value={inputs.unpaidWeeksPerYear}
                onChange={(e) => updateInput("unpaidWeeksPerYear", parseInt(e.target.value) || 0)}
                className="w-full px-3 py-1.5 text-right font-mono font-bold text-sm bg-base-card border border-surface-border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
              <span className="text-[10px] text-ink-muted block">0 = 52 paid weeks</span>
            </div>
          </div>

          {/* Overtime (1.5x) and Annual Bonus */}
          <div className="border border-surface-border rounded-2xl p-4 sm:p-5 bg-base-card space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              <span>Overtime &amp; Additional Income</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="overtimeHoursInput" className="text-xs font-bold text-ink">
                    OT Hours/Wk (1.5x)
                  </label>
                  <span className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400">
                    ${(inputs.hourlyWage * 1.5).toFixed(2)}/hr
                  </span>
                </div>
                <input
                  id="overtimeHoursInput"
                  type="number"
                  min="0"
                  max="40"
                  value={inputs.overtimeHoursPerWeek}
                  onChange={(e) => updateInput("overtimeHoursPerWeek", parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-1.5 text-right font-mono font-bold text-sm bg-surface-muted border border-surface-border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="bonusInput" className="text-xs font-bold text-ink">
                  Annual Bonus ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted font-bold text-xs">$</span>
                  <input
                    id="bonusInput"
                    type="number"
                    min="0"
                    step="500"
                    value={inputs.annualBonus || ""}
                    onChange={(e) => updateInput("annualBonus", parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-1.5 text-right font-mono font-bold text-sm bg-surface-muted border border-surface-border rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Hero Earnings Card */}
          <div className="bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-cyan-500/10 border-2 border-teal-500/30 rounded-3xl p-6 sm:p-7 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                  Equivalent Gross Annual Salary
                </span>
                <div className="text-3xl sm:text-5xl font-mono font-extrabold text-ink tracking-tight mt-1">
                  {formatMoney(result.adjustedAnnual)}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] font-semibold text-ink-muted block">
                  Standard 2,080 Hours (No Adjustments)
                </span>
                <span className="text-lg font-mono font-bold text-ink-muted">
                  {formatMoney(result.unadjustedAnnual)}
                  <span className="text-xs font-normal"> /yr</span>
                </span>
              </div>
            </div>

            {/* Quick Summary Pill Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-teal-500/20 text-xs">
              <span className="px-3 py-1 rounded-full bg-base-card border border-surface-border font-semibold text-ink">
                Working: <strong className="font-mono">{result.workingWeeksPerYear} wks/yr</strong>
              </span>
              <span className="px-3 py-1 rounded-full bg-base-card border border-surface-border font-semibold text-ink">
                Total Hours: <strong className="font-mono">{result.totalAnnualHours.toLocaleString()} hrs</strong>
              </span>
              <span className="px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 font-bold text-teal-800 dark:text-teal-200">
                Effective Rate: <strong className="font-mono">${result.effectiveHourlyRate.toFixed(2)}/hr</strong>
              </span>
            </div>
          </div>

          {/* Key Pay Frequency Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-surface-muted/60 border border-surface-border rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-muted block">
                Monthly Pay
              </span>
              <span className="text-base sm:text-xl font-mono font-bold text-ink mt-1 block">
                {formatMoney(result.adjustedPeriods.monthly)}
              </span>
              <span className="text-[10px] text-ink-muted">12 paychecks/yr</span>
            </div>

            <div className="bg-surface-muted/60 border border-surface-border rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-muted block">
                Semi-Monthly
              </span>
              <span className="text-base sm:text-xl font-mono font-bold text-ink mt-1 block">
                {formatMoney(result.adjustedPeriods.semimonthly)}
              </span>
              <span className="text-[10px] text-ink-muted">24 paychecks/yr</span>
            </div>

            <div className="bg-surface-muted/60 border border-surface-border rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-muted block">
                Bi-Weekly Pay
              </span>
              <span className="text-base sm:text-xl font-mono font-bold text-teal-600 dark:text-teal-400 mt-1 block">
                {formatMoney(result.adjustedPeriods.biweekly)}
              </span>
              <span className="text-[10px] text-ink-muted">26 paychecks/yr</span>
            </div>

            <div className="bg-surface-muted/60 border border-surface-border rounded-2xl p-4 text-center">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink-muted block">
                Weekly Pay
              </span>
              <span className="text-base sm:text-xl font-mono font-bold text-ink mt-1 block">
                {formatMoney(result.adjustedPeriods.weekly)}
              </span>
              <span className="text-[10px] text-ink-muted">52 paychecks/yr</span>
            </div>
          </div>

          {/* Full Pay Period Conversion Table */}
          <div className="bg-base-card border border-surface-border rounded-2xl overflow-hidden shadow-sm">
            <div className="px-5 py-3.5 bg-surface-muted border-b border-surface-border flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-2">
                <Calendar size={14} className="text-teal-600 dark:text-teal-400" />
                <span>Comprehensive Pay Period Conversion</span>
              </h3>
              <span className="text-[10px] font-mono text-ink-muted">Standard vs Adjusted</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-surface-border bg-surface-muted/30 text-ink-muted">
                    <th className="py-2.5 px-4 font-semibold">Pay Frequency</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Standard (2,080h)</th>
                    <th className="py-2.5 px-4 font-semibold text-right text-teal-600 dark:text-teal-400">
                      Your Adjusted Pay
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-border/60 font-mono">
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-ink">Hourly</td>
                    <td className="py-2.5 px-4 text-right text-ink-muted">
                      {formatMoneyDetailed(result.unadjustedPeriods.hourly)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-ink">
                      {formatMoneyDetailed(result.adjustedPeriods.hourly)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-ink">Daily ({inputs.daysPerWeek}d/wk)</td>
                    <td className="py-2.5 px-4 text-right text-ink-muted">
                      {formatMoney(result.unadjustedPeriods.daily)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-ink">
                      {formatMoney(result.adjustedPeriods.daily)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-ink">Weekly</td>
                    <td className="py-2.5 px-4 text-right text-ink-muted">
                      {formatMoney(result.unadjustedPeriods.weekly)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-ink">
                      {formatMoney(result.adjustedPeriods.weekly)}
                    </td>
                  </tr>
                  <tr className="bg-teal-500/5">
                    <td className="py-2.5 px-4 font-sans font-bold text-teal-700 dark:text-teal-300">
                      Bi-Weekly (Every 2 wks)
                    </td>
                    <td className="py-2.5 px-4 text-right text-ink-muted">
                      {formatMoney(result.unadjustedPeriods.biweekly)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-teal-700 dark:text-teal-300">
                      {formatMoney(result.adjustedPeriods.biweekly)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-ink">Semi-Monthly (Twice/mo)</td>
                    <td className="py-2.5 px-4 text-right text-ink-muted">
                      {formatMoney(result.unadjustedPeriods.semimonthly)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-ink">
                      {formatMoney(result.adjustedPeriods.semimonthly)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-medium text-ink">Monthly</td>
                    <td className="py-2.5 px-4 text-right text-ink-muted">
                      {formatMoney(result.unadjustedPeriods.monthly)}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-ink">
                      {formatMoney(result.adjustedPeriods.monthly)}
                    </td>
                  </tr>
                  <tr className="bg-surface-muted/40 font-bold">
                    <td className="py-3 px-4 font-sans text-ink">Annual Gross Salary</td>
                    <td className="py-3 px-4 text-right text-ink-muted">
                      {formatMoney(result.unadjustedAnnual)}
                    </td>
                    <td className="py-3 px-4 text-right text-teal-600 dark:text-teal-400 text-sm">
                      {formatMoney(result.adjustedAnnual)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cross-Link Action Banner: Calculate Take-Home Pay with Taxes */}
          <div className="p-4 sm:p-5 rounded-2xl bg-surface-muted/80 border border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20">
                <Building2 size={20} />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-ink">
                  Want to see your Net Take-Home Pay after 2026 Taxes?
                </h4>
                <p className="text-[11px] text-ink-muted mt-0.5">
                  Check out our state paycheck calculator with federal brackets, FICA, and state tax withholding.
                </p>
              </div>
            </div>

            <Link
              href="/calculators/paycheck-calculator"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shrink-0 shadow-sm"
            >
              <span>State Paycheck Hub</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
