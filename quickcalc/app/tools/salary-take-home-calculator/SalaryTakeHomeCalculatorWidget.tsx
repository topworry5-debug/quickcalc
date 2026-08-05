"use client";

import { useState, useEffect, useMemo } from "react";
import { calculateSalary, getSalaryExplanationSteps, SalaryCalculatorResult, CANADA_TAX_CONFIG } from "../../../lib/calculators/salaryCalculator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";

type CountryType = "US" | "Canada" | "Pakistan";
type SalaryType = "annual" | "monthly";
type PayFrequency = "annually" | "monthly" | "biweekly" | "weekly";

export default function SalaryTakeHomeCalculatorWidget() {
  const [country, setCountry] = useState<CountryType>("US");
  const [grossSalary, setGrossSalary] = useState<string>("75000");
  const [salaryType, setSalaryType] = useState<SalaryType>("annual");
  const [payFrequency, setPayFrequency] = useState<PayFrequency>("monthly");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<SalaryCalculatorResult | null>(null);

  useEffect(() => {
    const salaryVal = parseFloat(grossSalary);
    if (isNaN(salaryVal) || salaryVal <= 0) {
      setResult(null);
      return;
    }

    const calculated = calculateSalary(
      {
        grossSalary: salaryVal,
        salaryType,
        payFrequency,
      },
      country
    );
    setResult(calculated);
  }, [country, grossSalary, salaryType, payFrequency]);

  const getCurrencySymbol = (cntry: CountryType) => {
    switch (cntry) {
      case "US":
        return "$";
      case "Canada":
        return "C$";
      case "Pakistan":
        return "₨";
    }
  };

  const explanationSteps = useMemo(() => {
    if (!result) return [];
    const salaryVal = parseFloat(grossSalary) || 0;
    return getSalaryExplanationSteps(
      country,
      { grossSalary: salaryVal, salaryType, payFrequency },
      result
    );
  }, [result, country, grossSalary, salaryType, payFrequency]);

  const getCurrencyCode = (cntry: CountryType) => {
    switch (cntry) {
      case "US":
        return "USD";
      case "Canada":
        return "CAD";
      case "Pakistan":
        return "PKR";
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: getCurrencyCode(country),
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCopy = () => {
    if (!result) return;

    let text = `Salary Take-Home Pay Breakdown (${country})\n`;
    text += `====================================\n`;
    text += `Gross Salary (${payFrequency}): ${formatCurrency(result.grossSalarySelected)}\n`;
    text += `Net Take-Home Pay (${payFrequency}): ${formatCurrency(result.netPaySelected)}\n`;
    text += `Total Deductions (${payFrequency}): ${formatCurrency(result.totalDeductionsSelected)}\n\n`;
    text += `Deduction Breakdown:\n`;

    result.deductionsBreakdownSelected.forEach((d) => {
      text += `- ${d.name}: ${formatCurrency(d.amount)}\n`;
    });

    text += `\nPercentages:\n`;
    text += `- Take-home: ${result.takeHomePercentage.toFixed(1)}%\n`;
    text += `- Taxes & Levies: ${(result.taxPercentage + result.deductionsPercentage).toFixed(1)}%\n`;
    text += `====================================\n`;
    text += `Calculated on QuickCalc`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPdf = () => {
    if (!result) return;

    generatePdf({
      toolName: `Salary Take-Home Calculator (${country})`,
      toolSlug: "salary-take-home-calculator",
      inputs: [
        { label: "Country", value: country },
        { label: "Gross Salary (Annual)", value: formatCurrency(result.grossSalaryAnnual) },
        { label: "Pay Frequency", value: payFrequency },
      ],
      results: [
        { label: `Net Take-Home (${payFrequency})`, value: formatCurrency(result.netPaySelected), isHighlight: true },
        { label: "Take-Home Percentage", value: `${result.takeHomePercentage.toFixed(1)}%` },
        { label: "Tax Percentage", value: `${result.taxPercentage.toFixed(1)}%` },
        { label: "Annual Net Take-Home", value: formatCurrency(result.netPayAnnual) },
      ],
      summaryNote: `Tax & payroll breakdown calculated according to current ${country} tax tables.`,
      table: {
        title: `Deductions & Taxes Breakdown (${payFrequency})`,
        headers: ["Deduction / Tax Item", "Amount"],
        rows: [
          ["Gross Pay", formatCurrency(result.grossSalarySelected)],
          ...result.deductionsBreakdownSelected.map((d) => [d.name, `-${formatCurrency(d.amount)}`]),
          ["Net Take-Home Pay", formatCurrency(result.netPaySelected)],
        ],
      },
      filename: `Salary-Take-Home-Report.pdf`,
    });
  };

  const inputNumber = parseFloat(grossSalary);
  const isInputInvalid = isNaN(inputNumber) || inputNumber <= 0;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6 text-white text-center">
        <h3 className="text-xl font-bold">Multi-Country Salary Take-Home Calculator</h3>
        <p className="text-xs text-teal-100 mt-1">
          Compare salary deductions and accurate take-home pay side-by-side
        </p>
      </div>

      {/* Main Interactive Container */}
      <div className="p-6 space-y-6">
        {/* Country Toggle */}
        <div>
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
            Select Country
          </label>
          <div className="grid grid-cols-3 gap-2 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl">
            {(["US", "Canada", "Pakistan"] as CountryType[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCountry(c)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  country === c
                    ? "bg-white dark:bg-zinc-700 text-teal-600 dark:text-teal-400 shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {c === "US" ? "🇺🇸 United States" : c === "Canada" ? "🇨🇦 Canada" : "🇵🇰 Pakistan"}
              </button>
            ))}
          </div>
        </div>

        {/* Salary Input and Toggle Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="grossSalary" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Gross Salary
            </label>
            <div className="relative rounded-lg shadow-sm">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500 font-medium">
                {getCurrencySymbol(country)}
              </span>
              <input
                id="grossSalary"
                type="number"
                value={grossSalary}
                onChange={(e) => setGrossSalary(e.target.value)}
                className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent pl-12 pr-4 py-3 text-zinc-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none font-medium"
                placeholder="e.g. 75000"
                min="0"
                step="any"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Salary Term
            </label>
            <div className="grid grid-cols-2 gap-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setSalaryType("annual")}
                className={`py-2 px-2 text-xs font-semibold rounded-md transition-all ${
                  salaryType === "annual"
                    ? "bg-white dark:bg-zinc-700 text-teal-600 dark:text-teal-400 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-800"
                }`}
              >
                Annually
              </button>
              <button
                type="button"
                onClick={() => setSalaryType("monthly")}
                className={`py-2 px-2 text-xs font-semibold rounded-md transition-all ${
                  salaryType === "monthly"
                    ? "bg-white dark:bg-zinc-700 text-teal-600 dark:text-teal-400 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-800"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        {/* Pay Frequency Display Selector */}
        <div>
          <label htmlFor="payFrequency" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Display Results By
          </label>
          <select
            id="payFrequency"
            value={payFrequency}
            onChange={(e) => setPayFrequency(e.target.value as PayFrequency)}
            className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 text-sm text-zinc-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="annually">Annually</option>
            <option value="monthly">Monthly</option>
            <option value="biweekly">Bi-weekly (26 pay periods)</option>
            <option value="weekly">Weekly (52 pay periods)</option>
          </select>
        </div>

        {/* Disclaimer linked under input */}
        <div className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 p-3.5 rounded-lg border border-zinc-150 dark:border-zinc-850">
          <span className="font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider text-[10px] block mb-1">Disclaimer Estimate</span>
          This calculator provides a simplified estimate using national tax brackets and does not account for state/provincial taxes, deductions, credits, or your specific filing situation.
          {country === "US" && (
            <span> This is a <strong>federal-only</strong> tax estimate. State income taxes are completely excluded but vary significantly. For exact figures, consult a tax professional or official government resources.</span>
          )}
          {country === "Canada" && (
            <span> Provincial tax calculations use a simplified average rate of {CANADA_TAX_CONFIG.PROVINCIAL_AVG_RATE * 100}%. Actual provincial taxes will vary by province/territory.</span>
          )}
          {country === "Pakistan" && (
            <span> Estimates are based on the latest Federal Board of Revenue (FBR) income tax slabs for salaried individuals.</span>
          )}
        </div>

        {/* Dynamic Live Results */}
        {isInputInvalid ? (
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4 rounded-xl text-center">
            <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
              Please enter a valid, positive gross salary to calculate your take-home pay.
            </p>
          </div>
        ) : (
          result && (
            <div className="space-y-6 border-t border-zinc-100 dark:border-zinc-800 pt-6">
              {/* Take-Home Pay Spotlight */}
              <div className="bg-teal-50/50 dark:bg-teal-950/20 rounded-2xl p-5 border border-teal-100 dark:border-teal-900/50 text-center">
                <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
                  Estimated Take-Home Pay ({payFrequency})
                </span>
                <div className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white mt-1.5">
                  {formatCurrency(result.netPaySelected)}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  Approximately <strong className="text-teal-600 dark:text-teal-400">{result.takeHomePercentage.toFixed(1)}%</strong> of your gross pay goes directly to you.
                </p>
              </div>

              {/* Stacked Percentage Bar */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                  Visual Breakdown
                </label>
                <div className="h-6 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex shadow-xs">
                  {/* Take Home Pay */}
                  <div
                    style={{ width: `${result.takeHomePercentage}%` }}
                    className="bg-teal-500 hover:opacity-90 transition-opacity h-full flex items-center justify-center text-[10px] font-bold text-white"
                    title={`Take-Home Pay: ${result.takeHomePercentage.toFixed(1)}%`}
                  >
                    {result.takeHomePercentage > 15 ? `${result.takeHomePercentage.toFixed(0)}%` : ""}
                  </div>
                  {/* Income Taxes */}
                  <div
                    style={{ width: `${result.taxPercentage}%` }}
                    className="bg-amber-500 hover:opacity-90 transition-opacity h-full flex items-center justify-center text-[10px] font-bold text-white"
                    title={`Income Taxes: ${result.taxPercentage.toFixed(1)}%`}
                  >
                    {result.taxPercentage > 15 ? `${result.taxPercentage.toFixed(0)}%` : ""}
                  </div>
                  {/* Other Deductions */}
                  <div
                    style={{ width: `${result.deductionsPercentage}%` }}
                    className="bg-rose-500 hover:opacity-90 transition-opacity h-full flex items-center justify-center text-[10px] font-bold text-white"
                    title={`Payroll & Social Contributions: ${result.deductionsPercentage.toFixed(1)}%`}
                  >
                    {result.deductionsPercentage > 15 ? `${result.deductionsPercentage.toFixed(0)}%` : ""}
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-xs justify-center sm:justify-start">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-teal-500 block"></span>
                    <span className="text-zinc-600 dark:text-zinc-400">Take-Home ({result.takeHomePercentage.toFixed(1)}%)</span>
                  </div>
                  {(result.taxPercentage > 0 || country === "Pakistan") && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-amber-500 block"></span>
                      <span className="text-zinc-600 dark:text-zinc-400">Income Tax ({result.taxPercentage.toFixed(1)}%)</span>
                    </div>
                  )}
                  {result.deductionsPercentage > 0 && (
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500 block"></span>
                      <span className="text-zinc-600 dark:text-zinc-400">Payroll Taxes ({result.deductionsPercentage.toFixed(1)}%)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed Numbers Table */}
              <div className="bg-zinc-50 dark:bg-zinc-950/40 rounded-xl p-4 border border-zinc-150 dark:border-zinc-850">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-3">
                  Detailed Breakdown ({payFrequency})
                </h4>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                    <span>Gross Income</span>
                    <span className="font-semibold text-zinc-900 dark:text-white">{formatCurrency(result.grossSalarySelected)}</span>
                  </div>
                  
                  {result.deductionsBreakdownSelected.map((d, index) => (
                    <div key={index} className="flex justify-between text-rose-600 dark:text-rose-400">
                      <span>{d.name}</span>
                      <span>-{formatCurrency(d.amount)}</span>
                    </div>
                  ))}

                  <div className="border-t border-zinc-200 dark:border-zinc-800 pt-2.5 flex justify-between font-bold text-zinc-900 dark:text-white">
                    <span>Total Deductions</span>
                    <span className="text-rose-600 dark:text-rose-400">-{formatCurrency(result.totalDeductionsSelected)}</span>
                  </div>

                  <div className="border-t border-zinc-200 dark:border-zinc-800 pt-2.5 flex justify-between font-extrabold text-zinc-900 dark:text-white text-base">
                    <span>Net Take-Home Pay</span>
                    <span className="text-teal-600 dark:text-teal-400">{formatCurrency(result.netPaySelected)}</span>
                  </div>
                </div>
              </div>

              {/* Copy & Share actions */}
              <div className="flex flex-col sm:flex-row gap-2 justify-end">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
                >
                  {copied ? "✓ Copied!" : "📋 Copy Breakdown"}
                </button>
                <DownloadPdfButton onClick={handleDownloadPdf} className="py-2.5" />
              </div>

              {/* Step-by-Step Explanation Accordion */}
              <ExplainResultAccordion steps={explanationSteps} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
