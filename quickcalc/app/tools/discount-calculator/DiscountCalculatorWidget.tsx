"use client";

import { useState, useMemo } from "react";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import { getDiscountExplanationSteps } from "@/lib/calculators/discountCalculator";

type ActiveMode = "sale" | "original";

interface DiscountStep {
  label: string;
  before: number;
  percent: number;
  after: number;
  saved: number;
}

interface SaleSuccess {
  isValid: true;
  originalPrice: number;
  steps: DiscountStep[];
  finalPrice: number;
  totalSaved: number;
  effectiveDiscountPercent: number;
  simpleSumPercent: number;
  breakdownText: string;
}

interface SaleError {
  isValid: false;
  message: string;
}

type SaleResult = SaleSuccess | SaleError;

interface OriginalSuccess {
  isValid: true;
  salePrice: number;
  discPercent: number;
  originalPrice: number;
  amountSaved: number;
}

interface OriginalError {
  isValid: false;
  message: string;
}

type OriginalResult = OriginalSuccess | OriginalError;

export default function DiscountCalculatorWidget() {
  const [activeMode, setActiveMode] = useState<ActiveMode>("sale");
  const [copied, setCopied] = useState<boolean>(false);

  // States for "Find Sale Price" mode
  const [originalPriceStr, setOriginalPriceStr] = useState<string>("100");
  const [discounts, setDiscounts] = useState<string[]>(["20", "10"]);

  // States for "Find Original Price" mode
  const [salePriceStr, setSalePriceStr] = useState<string>("72");
  const [reverseDiscountStr, setReverseDiscountStr] = useState<string>("28");

  // Reset function
  const handleReset = () => {
    setCopied(false);
    if (activeMode === "sale") {
      setOriginalPriceStr("");
      setDiscounts([""]);
    } else {
      setSalePriceStr("");
      setReverseDiscountStr("");
    }
  };

  // Switch modes safely
  const handleModeChange = (mode: ActiveMode) => {
    setActiveMode(mode);
    setCopied(false);
  };

  // Helper to format numbers cleanly
  const formatNumber = (num: number): string => {
    if (Number.isInteger(num)) {
      return num.toString();
    }
    const fixed = num.toFixed(2);
    if (fixed.endsWith(".00")) {
      return num.toFixed(0);
    }
    return parseFloat(fixed).toString(); // strips trailing zeros e.g. 72.50 -> 72.5
  };

  // "Find Sale Price" Calculations & Errors
  const salePriceResult: SaleResult = useMemo(() => {
    const originalPrice = parseFloat(originalPriceStr);

    // Initial validation
    if (originalPriceStr.trim() === "") {
      return { isValid: false, message: "Please enter an original price to get started." };
    }
    if (isNaN(originalPrice)) {
      return { isValid: false, message: "Please enter a valid numeric original price." };
    }
    if (originalPrice < 0) {
      return { isValid: false, message: "Original price cannot be negative. Please enter a positive number." };
    }
    if (originalPrice === 0) {
      return { isValid: false, message: "Original price cannot be zero." };
    }

    // Check discount inputs
    if (discounts.length === 0) {
      return { isValid: false, message: "Please add at least one discount percentage." };
    }

    const steps: DiscountStep[] = [];
    let currentPrice = originalPrice;
    let totalSaved = 0;

    for (let i = 0; i < discounts.length; i++) {
      const discStr = discounts[i];
      if (discStr.trim() === "") {
        return { isValid: false, message: "Discount percentages cannot be blank." };
      }
      const discVal = parseFloat(discStr);
      if (isNaN(discVal)) {
        return { isValid: false, message: "Please enter a valid number for all discount percentages." };
      }
      if (discVal < 0) {
        return { isValid: false, message: "Discount percentage cannot be negative." };
      }
      if (discVal >= 100) {
        return {
          isValid: false,
          message: "A discount of 100% or more results in a free or negative price. Please enter a percentage below 100%.",
        };
      }

      const before = currentPrice;
      const saved = before * (discVal / 100);
      const after = before - saved;

      steps.push({
        label: i === 0 ? "Initial Discount" : `Stacked Discount #${i + 1}`,
        before,
        percent: discVal,
        after,
        saved,
      });

      totalSaved += saved;
      currentPrice = after;
    }

    const finalPrice = currentPrice;
    const effectiveDiscountPercent = (totalSaved / originalPrice) * 100;
    const simpleSumPercent = discounts.reduce((sum, d) => sum + (parseFloat(d) || 0), 0);

    // Step-by-step math breakdown string
    let breakdownText = formatNumber(originalPrice);
    steps.forEach((step) => {
      breakdownText += ` → ${step.percent}% off → ${formatNumber(step.after)}`;
    });

    return {
      isValid: true,
      originalPrice,
      steps,
      finalPrice,
      totalSaved,
      effectiveDiscountPercent,
      simpleSumPercent,
      breakdownText,
    };
  }, [originalPriceStr, discounts]);

  // "Find Original Price" Calculations & Errors
  const originalPriceResult: OriginalResult = useMemo(() => {
    const salePrice = parseFloat(salePriceStr);
    const discPercent = parseFloat(reverseDiscountStr);

    if (salePriceStr.trim() === "" || reverseDiscountStr.trim() === "") {
      return { isValid: false, message: "Please fill out both the sale price and discount percentage." };
    }
    if (isNaN(salePrice) || isNaN(discPercent)) {
      return { isValid: false, message: "Please enter valid numeric values." };
    }
    if (salePrice < 0 || discPercent < 0) {
      return { isValid: false, message: "Negative numbers are not allowed. Please enter positive numbers." };
    }
    if (salePrice === 0) {
      return { isValid: false, message: "Sale price must be greater than zero." };
    }
    if (discPercent >= 100) {
      return {
        isValid: false,
        message: "A discount percentage of 100% or more means the original price cannot be calculated from a positive sale price. Please enter a discount below 100%.",
      };
    }

    const originalPrice = salePrice / (1 - discPercent / 100);
    const amountSaved = originalPrice - salePrice;

    return {
      isValid: true,
      salePrice,
      discPercent,
      originalPrice,
      amountSaved,
    };
  }, [salePriceStr, reverseDiscountStr]);

  const explanationSteps = useMemo(() => {
    if (!salePriceResult.isValid) return [];
    const orig = salePriceResult.originalPrice;
    const d1 = parseFloat(discounts[0]) || 0;
    const d2 = discounts.length > 1 ? parseFloat(discounts[1]) || 0 : 0;
    return getDiscountExplanationSteps(
      { originalPrice: orig, discount1: d1, discount2: d2, taxRate: 0 },
      {
        finalPrice: salePriceResult.finalPrice,
        totalSaved: salePriceResult.totalSaved,
        effectiveDiscountPercent: salePriceResult.effectiveDiscountPercent,
      }
    );
  }, [salePriceResult, discounts]);

  // Handle adding stacked discount
  const addDiscount = () => {
    setDiscounts([...discounts, ""]);
    setCopied(false);
  };

  // Handle removing stacked discount
  const removeDiscount = (index: number) => {
    if (discounts.length > 1) {
      const updated = discounts.filter((_, idx) => idx !== index);
      setDiscounts(updated);
      setCopied(false);
    }
  };

  // Handle stacked discount change
  const handleDiscountChange = (index: number, val: string) => {
    const updated = [...discounts];
    updated[index] = val;
    setDiscounts(updated);
    setCopied(false);
  };

  // Copy results to clipboard
  const handleCopyToClipboard = () => {
    let copyText = "";
    if (activeMode === "sale") {
      if (salePriceResult.isValid) {
        const { originalPrice, finalPrice, totalSaved, effectiveDiscountPercent, breakdownText, simpleSumPercent } = salePriceResult;
        copyText = `Discount Calculation Breakdown (Find Sale Price)
---------------------------------------------
Original Price: ${formatNumber(originalPrice)}
Discounts Applied: ${discounts.map(d => `${d}%`).join(" then ")}
Step-by-Step: ${breakdownText}
Final Sale Price: ${formatNumber(finalPrice)}
Total Saved: ${formatNumber(totalSaved)}
Effective Discount: ${formatNumber(effectiveDiscountPercent)}%

* Note: Stacked discounts multiply, they do not simply add up. Applying ${discounts.map(d => `${d}%`).join(" and ")} results in an effective total discount of ${formatNumber(effectiveDiscountPercent)}% (not ${formatNumber(simpleSumPercent)}%).`;
      }
    } else {
      if (originalPriceResult.isValid) {
        const { salePrice, discPercent, originalPrice, amountSaved } = originalPriceResult;
        copyText = `Discount Breakdown (Find Original Price)
---------------------------------------------
Sale Price: ${formatNumber(salePrice)}
Discount Percentage: ${formatNumber(discPercent)}%
Calculated Pre-Discount Original Price: ${formatNumber(originalPrice)}
Total Amount Saved: ${formatNumber(amountSaved)}

* Formula: Original Price = Sale Price / (1 - (Discount / 100))
  ${formatNumber(originalPrice)} = ${formatNumber(salePrice)} / (1 - ${discPercent / 100})`;
      }
    }

    if (copyText) {
      navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadPdf = () => {
    if (activeMode === "sale" && salePriceResult.isValid) {
      generatePdf({
        toolName: "Discount Calculator",
        toolSlug: "discount-calculator",
        inputs: [
          { label: "Original Price", value: formatNumber(salePriceResult.originalPrice) },
          { label: "Effective Discount", value: `${formatNumber(salePriceResult.effectiveDiscountPercent)}%` },
        ],
        results: [
          { label: "Final Sale Price", value: formatNumber(salePriceResult.finalPrice), isHighlight: true },
          { label: "Total Amount Saved", value: formatNumber(salePriceResult.totalSaved) },
        ],
        summaryNote: `Discount calculation breakdown: ${salePriceResult.breakdownText}`,
        filename: `Discount-Summary.pdf`,
      });
    } else if (activeMode === "original" && originalPriceResult.isValid) {
      generatePdf({
        toolName: "Discount Calculator (Reverse Mode)",
        toolSlug: "discount-calculator",
        inputs: [
          { label: "Sale Price", value: formatNumber(originalPriceResult.salePrice) },
          { label: "Discount Percentage", value: `${formatNumber(originalPriceResult.discPercent)}%` },
        ],
        results: [
          { label: "Original Pre-Discount Price", value: formatNumber(originalPriceResult.originalPrice), isHighlight: true },
          { label: "Total Amount Saved", value: formatNumber(originalPriceResult.amountSaved) },
        ],
        summaryNote: `Pre-discount original price calculation formula: Sale Price / (1 - Discount/100).`,
        filename: `Original-Price-Summary.pdf`,
      });
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      {/* Mode Switcher */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 p-2 gap-2">
        <button
          onClick={() => handleModeChange("sale")}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
            activeMode === "sale"
              ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          🏷️ Find Sale Price
        </button>
        <button
          onClick={() => handleModeChange("original")}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
            activeMode === "original"
              ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm border border-zinc-200/50 dark:border-zinc-700/50"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
          }`}
        >
          🔍 Find Original Price
        </button>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {activeMode === "sale" ? (
          /* Mode 1: Find Sale Price */
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-1">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Original Price
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <input
                    type="number"
                    value={originalPriceStr}
                    onChange={(e) => {
                      setOriginalPriceStr(e.target.value);
                      setCopied(false);
                    }}
                    placeholder="Enter base price (e.g. 100)"
                    className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent py-3 px-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-lg transition-colors"
                    min="0"
                    step="any"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Discount Percentages (%)
                </label>
                <div className="space-y-3">
                  {discounts.map((disc, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="relative flex-1 rounded-xl shadow-sm">
                        <input
                          type="number"
                          value={disc}
                          onChange={(e) => handleDiscountChange(idx, e.target.value)}
                          placeholder={`Discount #${idx + 1} percentage (e.g. ${idx === 0 ? "20" : "10"})`}
                          className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent py-3 px-4 pr-12 text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors text-base"
                          min="0"
                          max="100"
                          step="any"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                          <span className="text-zinc-500 dark:text-zinc-400 font-medium">%</span>
                        </div>
                      </div>

                      {discounts.length > 1 && (
                        <button
                          onClick={() => removeDiscount(idx)}
                          className="p-3 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors border border-zinc-200 dark:border-zinc-800"
                          title="Remove discount"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addDiscount}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors py-2 px-3 hover:bg-blue-50 dark:hover:bg-blue-950/20 rounded-lg"
                >
                  ➕ Add another discount
                </button>
              </div>
            </div>

            {/* Error or Results Display */}
            {!salePriceResult.isValid ? (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-sm leading-relaxed">
                ⚠️ {salePriceResult.message}
              </div>
            ) : (
              <div className="space-y-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                {/* Result Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50">
                    <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                      Final Sale Price
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                      {formatNumber(salePriceResult.finalPrice)}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50">
                    <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                      Total Amount Saved
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                      {formatNumber(salePriceResult.totalSaved)}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50">
                    <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                      Effective Discount
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {formatNumber(salePriceResult.effectiveDiscountPercent)}%
                    </span>
                  </div>
                </div>

                {/* Step-by-Step Breakdown Visualizer */}
                <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 space-y-4">
                  <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Visual Step-by-Step Calculation
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                    <div className="flex flex-wrap items-center gap-y-2">
                      <span className="px-2.5 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-md font-mono text-xs text-zinc-800 dark:text-zinc-200">
                        Start: {formatNumber(salePriceResult.originalPrice)}
                      </span>
                      {salePriceResult.steps.map((step, idx) => (
                        <div key={idx} className="flex items-center">
                          <span className="mx-2 text-zinc-400">➔</span>
                          <span className="inline-flex flex-col items-center">
                            <span className="text-[10px] text-red-500 dark:text-red-400 font-bold uppercase leading-none mb-1">
                              -{step.percent}%
                            </span>
                            <span className="px-2.5 py-1 bg-zinc-150 dark:bg-zinc-805 border border-zinc-200 dark:border-zinc-700 rounded-md font-mono text-xs text-zinc-800 dark:text-zinc-200">
                              {formatNumber(step.after)}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Misconception Alert / Explainer */}
                  {discounts.length > 1 && (
                    <div className="mt-4 p-3.5 rounded-lg bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                      💡 <strong>Stacked discounts multiply, they don't add.</strong>{" "}
                      Applying {discounts.filter(d => d.trim() !== "").map(d => `${d}%`).join(" + ")} off sequence is a{" "}
                      <strong>{formatNumber(salePriceResult.effectiveDiscountPercent)}%</strong> total discount, not the simple sum of{" "}
                      <strong>{formatNumber(salePriceResult.simpleSumPercent)}%</strong>. This occurs because each additional discount is applied to the already-reduced subtotal, not the original starting price.
                    </div>
                  )}
                </div>

                {/* Step-by-Step Explanation Accordion */}
                <ExplainResultAccordion steps={explanationSteps} />
              </div>
            )}
          </div>
        ) : (
          /* Mode 2: Find Original Price (Reverse Mode) */
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Final Sale Price
                </label>
                <input
                  type="number"
                  value={salePriceStr}
                  onChange={(e) => {
                    setSalePriceStr(e.target.value);
                    setCopied(false);
                  }}
                  placeholder="Enter sale price (e.g. 72)"
                  className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent py-3 px-4 text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-lg transition-colors"
                  min="0"
                  step="any"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Discount Percentage Applied (%)
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <input
                    type="number"
                    value={reverseDiscountStr}
                    onChange={(e) => {
                      setReverseDiscountStr(e.target.value);
                      setCopied(false);
                    }}
                    placeholder="Enter discount % (e.g. 28)"
                    className="block w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent py-3 px-4 pr-12 text-zinc-900 dark:text-white placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-lg transition-colors"
                    min="0"
                    max="100"
                    step="any"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <span className="text-zinc-500 dark:text-zinc-400 font-medium">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Error or Results Display */}
            {!originalPriceResult.isValid ? (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/50 text-amber-800 dark:text-amber-300 text-sm leading-relaxed">
                ⚠️ {originalPriceResult.message}
              </div>
            ) : (
              <div className="space-y-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50">
                    <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                      Calculated Original Price
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                      {formatNumber(originalPriceResult.originalPrice)}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50">
                    <span className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                      Total Amount Saved
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                      {formatNumber(originalPriceResult.amountSaved)}
                    </span>
                  </div>
                </div>

                {/* Math Explanation box */}
                <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 space-y-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                    Reverse Mode Calculation Math
                  </h4>
                  <p>
                    To find the original price from a sale price and discount percentage, you divide the sale price (<code>S</code>) by one minus the discount percentage (<code>D</code>) as a decimal:
                  </p>
                  <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg font-mono text-xs overflow-x-auto text-blue-600 dark:text-blue-400 border border-zinc-200 dark:border-zinc-800">
                    Original Price = Sale Price / (1 - (Discount / 100))
                    <br />
                    Original Price = {formatNumber(originalPriceResult.salePrice)} / (1 - ({originalPriceResult.discPercent} / 100))
                    <br />
                    Original Price = {formatNumber(originalPriceResult.originalPrice)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Global Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={handleReset}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all border border-zinc-200 dark:border-zinc-800 text-center"
          >
            🔄 Reset
          </button>

          {((activeMode === "sale" && salePriceResult.isValid) || (activeMode === "original" && originalPriceResult.isValid)) && (
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleCopyToClipboard}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all shadow-sm shadow-blue-500/10 text-center flex items-center justify-center gap-2"
              >
                {copied ? "✅ Copied Breakdown!" : "📋 Copy Breakdown"}
              </button>
              <DownloadPdfButton onClick={handleDownloadPdf} className="py-2.5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
