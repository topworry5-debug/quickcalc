"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  calculateTimesheet,
  calculateShiftHours,
  getWorkHoursExplanationSteps,
  ShiftEntry,
  TimesheetAnalysisResult,
  DEFAULT_WEEK_SHIFTS,
} from "@/lib/calculators/workHoursCalculator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import ShareResultButton from "@/components/ShareResultButton";
import ShareResultModal from "@/components/ShareResultModal";
import { useCalculatorUrlState } from "@/hooks/useCalculatorUrlState";
import { Clock, Plus, Trash2, Copy, Check, FileText, ArrowRight, DollarSign, Calendar, Sparkles, Moon } from "lucide-react";

export default function WorkHoursWidget() {
  const [shifts, setShifts] = useState<ShiftEntry[]>(DEFAULT_WEEK_SHIFTS);
  const [hourlyRate, setHourlyRate] = useState<number>(25);
  const [overtimeEnabled, setOvertimeEnabled] = useState<boolean>(true);
  const [overtimeThreshold] = useState<number>(40);
  const [use12Hour, setUse12Hour] = useState<boolean>(true);

  const [result, setResult] = useState<TimesheetAnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Hydrate from URL query parameters
  const onHydrate = useCallback((sp: URLSearchParams) => {
    const rate = sp.get("rate");
    if (rate) setHourlyRate(parseFloat(rate) || 0);

    const ot = sp.get("ot");
    if (ot !== null) setOvertimeEnabled(ot === "1");
  }, []);

  useCalculatorUrlState(
    {
      rate: hourlyRate ? hourlyRate.toString() : undefined,
      ot: overtimeEnabled ? "1" : "0",
    },
    onHydrate
  );

  // Real-time calculation effect
  useEffect(() => {
    const res = calculateTimesheet(shifts, hourlyRate, overtimeEnabled, overtimeThreshold, 1.5, use12Hour);
    setResult(res);
  }, [shifts, hourlyRate, overtimeEnabled, overtimeThreshold, use12Hour]);

  const handleUpdateShift = (id: string, field: keyof ShiftEntry, value: string | number | boolean) => {
    setShifts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleAddShift = () => {
    const nextId = (shifts.length + 1).toString();
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const dayName = dayNames[shifts.length % 7] || `Shift ${nextId}`;

    setShifts((prev) => [
      ...prev,
      {
        id: nextId,
        dayName,
        startTime: "09:00",
        endTime: "17:00",
        breakMinutes: 30,
        enabled: true,
      },
    ]);
  };

  const handleRemoveShift = (id: string) => {
    if (shifts.length <= 1) return;
    setShifts((prev) => prev.filter((s) => s.id !== id));
  };

  const handleLoadPreset5Day = () => {
    setShifts(DEFAULT_WEEK_SHIFTS);
  };

  const handleLoadPreset7Day = () => {
    setShifts((prev) =>
      prev.map((s) => ({ ...s, enabled: true }))
    );
  };

  const handleDownloadPdf = () => {
    if (!result) return;

    generatePdf({
      toolName: "Work Hours & Timesheet Calculation Report",
      toolSlug: "work-hours-calculator",
      inputs: [
        { label: "Active Days Worked", value: `${result.totalActiveDays} days` },
        { label: "Hourly Pay Rate", value: `$${result.hourlyRate.toFixed(2)}/hr` },
        { label: "Overtime Threshold", value: `${result.overtimeThresholdHours} hrs/week (1.5x)` },
      ],
      results: [
        { label: "Total Net Hours Worked", value: `${result.totalNetHours} hrs`, isHighlight: true },
        { label: "Total Gross Pay", value: `$${result.totalGrossPay.toFixed(2)}`, isHighlight: true },
        { label: "Regular Hours", value: `${result.regularHours} hrs ($${result.regularPay.toFixed(2)})` },
        { label: "Overtime Hours", value: `${result.overtimeHours} hrs ($${result.overtimePay.toFixed(2)})` },
        { label: "Total Unpaid Break Time", value: `${result.totalBreakMinutes} mins (${result.totalBreakHours} hrs)` },
      ],
      summaryNote: `Timesheet Report: ${result.totalNetHours} net hours worked across ${result.totalActiveDays} shifts. Total Estimated Gross Pay: $${result.totalGrossPay.toFixed(2)}.`,
      filename: `Timesheet-Report-${result.totalNetHours}-hours.pdf`,
    });
  };

  const handleCopy = async () => {
    if (!result) return;

    const summary = `Work Hours Timesheet Summary:\n- Total Net Hours: ${result.totalNetHours} hrs\n- Total Gross Pay: $${result.totalGrossPay.toFixed(2)}\n- Regular Hours: ${result.regularHours} hrs ($${result.regularPay.toFixed(2)})\n- Overtime Hours: ${result.overtimeHours} hrs ($${result.overtimePay.toFixed(2)})\nCalculated free at QuickCalc.cloud`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleExportTxt = () => {
    if (!result) return;

    const shiftRows = result.dayResults
      .filter((d) => d.enabled)
      .map(
        (d) =>
          `${d.dayName.padEnd(10)} | Start: ${d.startTimeFormatted.padEnd(8)} | End: ${d.endTimeFormatted.padEnd(8)} | Break: ${d.breakMinutes}m | Net: ${d.netHours} hrs${
            d.isOvernight ? " (Overnight)" : ""
          }`
      )
      .join("\n");

    const textContent = `QUICKCALC WORK HOURS & TIMESHEET REPORT
-----------------------------------------
Active Days Worked: ${result.totalActiveDays}
Hourly Pay Rate: $${result.hourlyRate.toFixed(2)}/hr
Overtime Threshold: ${result.overtimeThresholdHours} hrs/week (1.5x Multiplier)

WEEKLY TOTALS:
Total Gross Hours: ${result.totalGrossHours} hrs
Total Break Time: ${result.totalBreakMinutes} mins (${result.totalBreakHours} hrs)
Total Net Hours Worked: ${result.totalNetHours} hrs
- Regular Hours: ${result.regularHours} hrs ($${result.regularPay.toFixed(2)})
- Overtime Hours: ${result.overtimeHours} hrs ($${result.overtimePay.toFixed(2)})
TOTAL ESTIMATED GROSS PAY: $${result.totalGrossPay.toFixed(2)}

DAILY BREAKDOWN:
${shiftRows}

Calculated 100% free at QuickCalc (https://quickcalc.cloud/tools/work-hours-calculator)`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `QuickCalc-Timesheet-Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const explanationSteps = useMemo(() => {
    if (!result) return [];
    return getWorkHoursExplanationSteps(result);
  }, [result]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-6 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
          <Clock size={14} className="text-emerald-200" />
          <span>Weekly Shift & Pay Tracker</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Work Hours / Timesheet Calculator
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-md mx-auto">
          Calculate daily shift hours, break deductions, overnight work, and estimated gross pay with overtime rules.
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Settings & Presets Control Panel */}
        <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/60 dark:border-zinc-800/60 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
              <Calendar size={14} className="text-teal-600 dark:text-teal-400" />
              <span>Timesheet Controls &amp; Settings</span>
            </span>

            {/* Quick Presets */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLoadPreset5Day}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold hover:border-emerald-500 transition-colors"
              >
                Mon–Fri (5-Day)
              </button>
              <button
                type="button"
                onClick={handleLoadPreset7Day}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-semibold hover:border-emerald-500 transition-colors"
              >
                Full 7-Day Week
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Hourly Pay Rate */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <DollarSign size={13} className="text-emerald-600" />
                <span>Hourly Pay Rate ($/hr)</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={hourlyRate || ""}
                onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 text-zinc-900 dark:text-white font-mono focus:border-emerald-500 focus:outline-none"
                placeholder="e.g. 25.00"
              />
            </div>

            {/* Overtime Settings */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <span>Overtime Rule (1.5x)</span>
              </label>
              <div className="flex items-center gap-2 pt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={overtimeEnabled}
                    onChange={(e) => setOvertimeEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:after:border-zinc-600 peer-checked:bg-emerald-600" />
                </label>
                <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
                  {overtimeEnabled ? `Over ${overtimeThreshold} hrs/week` : "Disabled"}
                </span>
              </div>
            </div>

            {/* Time Format Option */}
            <div className="space-y-1">
              <label className="font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                <Clock size={13} className="text-teal-600" />
                <span>Time Format</span>
              </label>
              <div className="flex items-center gap-1 pt-0.5">
                <button
                  type="button"
                  onClick={() => setUse12Hour(true)}
                  className={`flex-1 py-1.5 rounded-md text-[11px] font-semibold border ${
                    use12Hour
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
                  }`}
                >
                  12-Hour (AM/PM)
                </button>
                <button
                  type="button"
                  onClick={() => setUse12Hour(false)}
                  className={`flex-1 py-1.5 rounded-md text-[11px] font-semibold border ${
                    !use12Hour
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700"
                  }`}
                >
                  24-Hour
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Shift Input Cards / Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Daily Shift Entries ({shifts.filter((s) => s.enabled).length} active days)
            </h4>
            <button
              type="button"
              onClick={handleAddShift}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
            >
              <Plus size={14} />
              <span>Add Another Day</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {shifts.map((shift) => {
              const { netHours, isOvernight } = calculateShiftHours(
                shift.startTime,
                shift.endTime,
                shift.breakMinutes
              );

              return (
                <div
                  key={shift.id}
                  className={`p-3.5 rounded-xl border transition-colors ${
                    shift.enabled
                      ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                      : "bg-zinc-50/50 dark:bg-zinc-950/40 border-zinc-200/50 dark:border-zinc-800/50 opacity-60"
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center text-xs">
                    {/* Active Checkbox & Day Name */}
                    <div className="sm:col-span-3 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={shift.enabled}
                        onChange={(e) => handleUpdateShift(shift.id, "enabled", e.target.checked)}
                        className="rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={shift.dayName}
                        onChange={(e) => handleUpdateShift(shift.id, "dayName", e.target.value)}
                        className="w-full bg-transparent font-bold text-zinc-900 dark:text-white border-b border-transparent hover:border-zinc-300 focus:border-emerald-500 focus:outline-none text-xs"
                      />
                    </div>

                    {/* Start Time Input */}
                    <div className="sm:col-span-3 space-y-1">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase block sm:hidden">Start Time</span>
                      <input
                        type={use12Hour ? "text" : "time"}
                        value={shift.startTime}
                        onChange={(e) => handleUpdateShift(shift.id, "startTime", e.target.value)}
                        placeholder="09:00 AM"
                        disabled={!shift.enabled}
                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 text-zinc-900 dark:text-white text-xs font-mono focus:border-emerald-500 focus:outline-none disabled:opacity-50"
                      />
                    </div>

                    {/* End Time Input */}
                    <div className="sm:col-span-3 space-y-1">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase block sm:hidden">End Time</span>
                      <input
                        type={use12Hour ? "text" : "time"}
                        value={shift.endTime}
                        onChange={(e) => handleUpdateShift(shift.id, "endTime", e.target.value)}
                        placeholder="05:00 PM"
                        disabled={!shift.enabled}
                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 text-zinc-900 dark:text-white text-xs font-mono focus:border-emerald-500 focus:outline-none disabled:opacity-50"
                      />
                    </div>

                    {/* Break Minutes Input */}
                    <div className="sm:col-span-2 space-y-1">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase block sm:hidden">Break (mins)</span>
                      <input
                        type="number"
                        min="0"
                        step="5"
                        value={shift.breakMinutes}
                        onChange={(e) => handleUpdateShift(shift.id, "breakMinutes", parseInt(e.target.value, 10) || 0)}
                        placeholder="30"
                        disabled={!shift.enabled}
                        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-2 text-zinc-900 dark:text-white text-xs font-mono focus:border-emerald-500 focus:outline-none disabled:opacity-50"
                      />
                    </div>

                    {/* Actions & Calculated Hours */}
                    <div className="sm:col-span-1 flex items-center justify-between sm:justify-end gap-2">
                      {shift.enabled ? (
                        <div className="flex items-center gap-1">
                          {isOvernight && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800" title="Overnight shift crossing midnight">
                              <Moon size={10} />
                            </span>
                          )}
                          <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400 text-xs">
                            {netHours}h
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-zinc-400">Off</span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemoveShift(shift.id)}
                        className="text-zinc-400 hover:text-rose-600 transition-colors p-1"
                        title="Delete shift"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Primary Weekly Summary Dashboard */}
        {result && (
          <div className="space-y-6 animate-in fade-in duration-200 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {/* Card 1: Total Net Hours Worked */}
              <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
                  Total Net Hours Worked
                </span>
                <div className="text-4xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                  {result.totalNetHours} <span className="text-base font-normal">hrs</span>
                </div>
                <span className="text-[11px] text-emerald-700/80 dark:text-emerald-300/80 block">
                  Across {result.totalActiveDays} active working shifts
                </span>
              </div>

              {/* Card 2: Estimated Gross Pay */}
              <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Estimated Gross Pay
                </span>
                <div className="text-4xl font-extrabold font-mono text-teal-600 dark:text-teal-400">
                  ${result.totalGrossPay.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">
                  {result.hourlyRate > 0 ? `@ $${result.hourlyRate.toFixed(2)}/hr base rate` : "Enter hourly rate above"}
                </span>
              </div>

              {/* Card 3: Regular vs Overtime Breakdown */}
              <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Hours &amp; Overtime Breakdown
                </span>
                <div className="text-lg font-bold font-mono text-zinc-900 dark:text-white pt-1">
                  {result.regularHours}h Reg + {result.overtimeHours}h OT
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                  Unpaid Break Time: {result.totalBreakMinutes} mins ({result.totalBreakHours} hrs)
                </p>
              </div>
            </div>

            {/* Day-by-Day Summary Breakdown Table */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block">
                📋 Daily Shift Breakdown Table
              </span>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-zinc-700 dark:text-zinc-300 border-collapse">
                  <thead>
                    <tr className="bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-900 dark:text-white font-bold">
                      <th className="p-2.5 rounded-l-lg">Day</th>
                      <th className="p-2.5">Clock In</th>
                      <th className="p-2.5">Clock Out</th>
                      <th className="p-2.5">Break</th>
                      <th className="p-2.5">Gross</th>
                      <th className="p-2.5 rounded-r-lg text-right">Net Hours</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60">
                    {result.dayResults.map((day) => (
                      <tr key={day.id} className={day.enabled ? "" : "opacity-40"}>
                        <td className="p-2.5 font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                          <span>{day.dayName}</span>
                          {day.isOvernight && (
                            <span className="px-1 py-0.5 rounded text-[9px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                              Overnight
                            </span>
                          )}
                        </td>
                        <td className="p-2.5 font-mono">{day.startTimeFormatted}</td>
                        <td className="p-2.5 font-mono">{day.endTimeFormatted}</td>
                        <td className="p-2.5 font-mono">{day.breakMinutes} m</td>
                        <td className="p-2.5 font-mono">{day.grossHours} h</td>
                        <td className="p-2.5 font-mono font-extrabold text-emerald-600 dark:text-emerald-400 text-right">
                          {day.netHours} h
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Reciprocal Internal Link Banner to Salary Take-Home & Freelance Calculators */}
        <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-950 dark:text-teal-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Sparkles size={18} className="text-teal-600 dark:text-teal-400 shrink-0" />
            <span>
              Want to calculate post-tax paycheck amounts or determine your ideal hourly freelance rate?
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/tools/salary-take-home-calculator"
              className="inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 hover:underline"
            >
              <span>Take-Home Pay</span>
              <ArrowRight size={12} />
            </Link>
            <Link
              href="/tools/freelance-rate-calculator"
              className="inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 hover:underline"
            >
              <span>Freelance Rate</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Actions Bar */}
        {result && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            <DownloadPdfButton onClick={handleDownloadPdf} />

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors"
            >
              {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              <span>{copied ? "Copied!" : "Copy Summary"}</span>
            </button>

            <button
              type="button"
              onClick={handleExportTxt}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors"
            >
              <FileText size={14} />
              <span>Export TXT</span>
            </button>

            <ShareResultButton onClick={() => setIsShareModalOpen(true)} />
          </div>
        )}

        {/* Step-by-Step Mathematical Explanation Accordion */}
        {result && <ExplainResultAccordion steps={explanationSteps} />}
      </div>

      {/* Share Modal */}
      {result && (
        <ShareResultModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          data={{
            toolName: "Work Hours / Timesheet Calculator",
            toolSlug: "work-hours-calculator",
            category: "Finance & Money Tools",
            resultValue: `${result.totalNetHours} hrs`,
            resultLabel: `Weekly Total Net Hours ($${result.totalGrossPay.toFixed(2)} Estimated Pay)`,
            inputsSummary: [
              { label: "Active Days", value: `${result.totalActiveDays} days` },
              { label: "Hourly Rate", value: `$${result.hourlyRate.toFixed(2)}/hr` },
            ],
            queryParams: {
              rate: hourlyRate.toString(),
              ot: overtimeEnabled ? "1" : "0",
            },
          }}
        />
      )}
    </div>
  );
}
