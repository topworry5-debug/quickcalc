"use client";

import { useState, useMemo } from "react";
import { inflationData, getInflationExplanationSteps } from "@/lib/calculators/inflationData";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";

type Mode = "past-to-present" | "present-to-past";

export default function InflationCalculatorWidget() {
  const [country, setCountry] = useState<"US" | "CA" | "PK">("US");
  const [mode, setMode] = useState<Mode>("past-to-present");
  const [amountStr, setAmountStr] = useState<string>("100");
  const [selectedYear, setSelectedYear] = useState<number>(2010);
  const [copied, setCopied] = useState<boolean>(false);

  const countryInfo = inflationData[country];
  const { currencySymbol, currencyName, cpiHistory } = countryInfo;

  // Present year is the latest year in our data
  const presentYear = useMemo(() => {
    if (!cpiHistory.length) return 2026;
    return cpiHistory[cpiHistory.length - 1].year;
  }, [cpiHistory]);

  // List of available years for selection
  const availableYears = useMemo(() => {
    return cpiHistory.map((record) => record.year).reverse();
  }, [cpiHistory]);

  const amount = useMemo(() => {
    const parsed = parseFloat(amountStr);
    return isNaN(parsed) || parsed < 0 ? 0 : parsed;
  }, [amountStr]);

  const calculation = useMemo(() => {
    if (amount <= 0) {
      return {
        isValid: false,
        message: "Please enter a valid amount greater than 0.",
      };
    }

    const startRecord = cpiHistory.find((r) => r.year === selectedYear);
    const endRecord = cpiHistory.find((r) => r.year === presentYear);

    if (!startRecord || !endRecord) {
      return {
        isValid: false,
        message: "Selected year data is currently unavailable.",
      };
    }

    const startCpi = startRecord.cpi;
    const endCpi = endRecord.cpi;

    if (selectedYear === presentYear) {
      return {
        isValid: true,
        isIdentical: true,
        convertedAmount: amount,
        cumulativeInflationPercent: 0,
        purchasingPowerText: `Since the start and end years are both ${presentYear}, there is no change in inflation or purchasing power. ${currencySymbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} has the exact same value.`,
        rawText: `${currencySymbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in ${presentYear} has the exact same buying power as ${currencySymbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} today.`,
      };
    }

    if (mode === "past-to-present") {
      // Past to Present: Value Today = Value Past * (CPI Today / CPI Past)
      const converted = amount * (endCpi / startCpi);
      const cumulativeInflation = ((endCpi - startCpi) / startCpi) * 100;

      const formattedAmount = amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const formattedConverted = converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const formattedPercent = cumulativeInflation.toFixed(1);

      const purchasingPowerText = `${currencySymbol}${formattedAmount} in ${selectedYear} has the same buying power as approximately ${currencySymbol}${formattedConverted} today — meaning you'd need ${currencySymbol}${formattedConverted} now to buy what ${currencySymbol}${formattedAmount} bought back then.`;

      const rawText = `${currencySymbol}${formattedAmount} in ${selectedYear} is equivalent to ${currencySymbol}${formattedConverted} in ${presentYear} (Cumulative Inflation: ${formattedPercent}%) - calculated on quickcalc.cloud/tools/inflation-calculator`;

      return {
        isValid: true,
        isIdentical: false,
        convertedAmount: converted,
        cumulativeInflationPercent: cumulativeInflation,
        purchasingPowerText,
        rawText,
        startCpi,
        endCpi,
      };
    } else {
      // Present to Past: Value Past = Value Today * (CPI Past / CPI Today)
      const converted = amount * (startCpi / endCpi);
      const cumulativeInflation = ((endCpi - startCpi) / startCpi) * 100;

      const formattedAmount = amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const formattedConverted = converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const formattedPercent = cumulativeInflation.toFixed(1);

      const purchasingPowerText = `${currencySymbol}${formattedAmount} today has the same buying power as approximately ${currencySymbol}${formattedConverted} in ${selectedYear} — meaning a product that costs ${currencySymbol}${formattedAmount} today would have cost only ${currencySymbol}${formattedConverted} in ${selectedYear}.`;

      const rawText = `${currencySymbol}${formattedAmount} in ${presentYear} is equivalent to ${currencySymbol}${formattedConverted} in ${selectedYear} (Cumulative Inflation: ${formattedPercent}%) - calculated on quickcalc.cloud/tools/inflation-calculator`;

      return {
        isValid: true,
        isIdentical: false,
        convertedAmount: converted,
        cumulativeInflationPercent: cumulativeInflation,
        purchasingPowerText,
        rawText,
        startCpi,
        endCpi,
      };
    }
  }, [amount, selectedYear, presentYear, mode, cpiHistory, currencySymbol]);

  const explanationSteps = useMemo(() => {
    if (!calculation.isValid || calculation.isIdentical) return [];
    const amount = parseFloat(amountStr) || 0;
    const startYr = mode === "past-to-present" ? selectedYear : presentYear;
    const endYr = mode === "past-to-present" ? presentYear : selectedYear;
    const startCPI = calculation.startCpi || 100;
    const endCPI = calculation.endCpi || 100;

    return getInflationExplanationSteps({
      amount,
      startYear: startYr,
      endYear: endYr,
      symbol: currencySymbol,
      startCPI,
      endCPI,
      equivalentAmount: calculation.convertedAmount || 0,
      totalPercent: calculation.cumulativeInflationPercent || 0,
    });
  }, [calculation, amountStr, mode, selectedYear, presentYear, currencySymbol]);

  const handleCopy = async () => {
    if (calculation.isValid && calculation.rawText) {
      try {
        await navigator.clipboard.writeText(calculation.rawText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy", err);
      }
    }
  };

  const handleDownloadPdf = () => {
    if (!calculation.isValid || calculation.convertedAmount === undefined) return;

    generatePdf({
      toolName: "Inflation Calculator",
      toolSlug: "inflation-calculator",
      inputs: [
        { label: "Country", value: country === "US" ? "United States (USD)" : country === "CA" ? "Canada (CAD)" : "Pakistan (PKR)" },
        { label: "Base Year", value: `${selectedYear}` },
        { label: "Target Year", value: `${presentYear}` },
        { label: "Original Amount", value: `${currencySymbol}${amount.toLocaleString()}` },
      ],
      results: [
        { label: "Equivalent Value", value: `${currencySymbol}${calculation.convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, isHighlight: true },
        { label: "Cumulative Inflation", value: `${calculation.cumulativeInflationPercent?.toFixed(1)}%` },
      ],
      summaryNote: calculation.purchasingPowerText || "",
      filename: `Inflation-Report-${selectedYear}-vs-${presentYear}.pdf`,
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300">
      <div className="space-y-6">
        {/* Country and Mode Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Select Country
            </label>
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value as "US" | "CA" | "PK");
                setCopied(false);
              }}
              className="w-full px-3 py-3 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent cursor-pointer transition"
            >
              <option value="US">🇺🇸 United States ({currencyName})</option>
              <option value="CA">🇨🇦 Canada ({currencyName})</option>
              <option value="PK">🇵🇰 Pakistan ({currencyName})</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Calculation Mode
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-100 dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => {
                  setMode("past-to-present");
                  setCopied(false);
                }}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition ${
                  mode === "past-to-present"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                Past to Present
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("present-to-past");
                  setCopied(false);
                }}
                className={`py-2 px-3 text-xs font-bold rounded-xl transition ${
                  mode === "present-to-past"
                    ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                Present to Past
              </button>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {mode === "past-to-present" ? "Amount in Past Year" : "Amount Today"}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-400 font-bold pointer-events-none font-mono">
                {currencySymbol}
              </span>
              <input
                id="amount"
                type="number"
                min="0.01"
                step="any"
                value={amountStr}
                onChange={(e) => {
                  setAmountStr(e.target.value);
                  setCopied(false);
                }}
                placeholder="100.00"
                className="w-full pl-9 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Select Comparison Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => {
                setSelectedYear(parseInt(e.target.value, 10));
                setCopied(false);
              }}
              className="w-full px-3 py-3 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent cursor-pointer transition font-mono"
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year} {year === presentYear ? "(Present)" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Results Card */}
        {calculation.isValid ? (
          <div className="p-6 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10 rounded-2xl border border-blue-500/10 dark:border-blue-500/20 space-y-4">
            <div>
              <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-1">
                Equivalent Buying Power
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight font-mono">
                {currencySymbol}
                {calculation.convertedAmount?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                <span className="text-sm font-bold text-zinc-400 dark:text-zinc-500 ml-2">
                  {mode === "past-to-present" ? "today" : `in ${selectedYear}`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-zinc-200/50 dark:border-zinc-800/50 text-sm">
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 text-xs block">
                  Cumulative Inflation Rate
                </span>
                <span className="font-extrabold text-blue-600 dark:text-blue-400 text-lg font-mono">
                  {calculation.cumulativeInflationPercent?.toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 text-xs block">
                  Comparison Period
                </span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 text-sm font-mono">
                  {selectedYear} vs {presentYear} ({presentYear - selectedYear} Years)
                </span>
              </div>
            </div>

            {/* Plain language buying power statement */}
            <div className="bg-white/50 dark:bg-zinc-950/30 border border-zinc-150 dark:border-zinc-800/50 p-4 rounded-xl">
              <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed font-medium">
                📢 {calculation.purchasingPowerText}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-3 px-4 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-sm active:scale-[0.99]"
              >
                <span>
                  {copied ? "✅ Copied!" : "📋 Copy Shareable Result"}
                </span>
              </button>
              <DownloadPdfButton onClick={handleDownloadPdf} className="py-3" />
            </div>

            {/* Step-by-Step Explanation Accordion */}
            <ExplainResultAccordion steps={explanationSteps} />
          </div>
        ) : (
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-2xl text-red-800 dark:text-red-400 text-sm flex items-start gap-3">
            <span className="text-lg">⚠️</span>
            <p className="font-semibold">{calculation.message}</p>
          </div>
        )}

        <div className="text-center text-[11px] text-zinc-400 dark:text-zinc-500 italic">
          {countryInfo.generalSource}
        </div>
      </div>
    </div>
  );
}
