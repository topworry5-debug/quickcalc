"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  calculateEtsyFees,
  getEtsyFeeExplanationSteps,
  SUPPORTED_CURRENCIES,
  COUNTRY_PRESETS,
  PRESET_SCENARIOS,
  EtsyFeeInputs,
  EtsyFeeResult,
  OffsiteAdsTier,
} from "@/lib/calculators/etsyFeeCalculator";
import { generatePdfAsync } from "@/lib/utils/downloadPdf";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import {
  RotateCcw,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  ShoppingBag,
  Globe,
  Sliders,
  ChevronDown,
} from "lucide-react";

export default function EtsyFeeCalculatorWidget() {

  // Inputs state
  const [currencyCode, setCurrencyCode] = useState<string>("USD");
  const [itemPrice, setItemPrice] = useState<string>("35.00");
  const [shippingCharged, setShippingCharged] = useState<string>("5.00");
  const [itemCogs, setItemCogs] = useState<string>("8.50");
  const [actualShippingCost, setActualShippingCost] = useState<string>("4.50");
  
  const [countryId, setCountryId] = useState<string>("US");
  const [customProcessingPercent, setCustomProcessingPercent] = useState<string>("3.0");
  const [customProcessingFixed, setCustomProcessingFixed] = useState<string>("0.25");
  const [customRegulatoryPercent, setCustomRegulatoryPercent] = useState<string>("0.0");
  const [showCustomOverrides, setShowCustomOverrides] = useState<boolean>(false);

  const [offsiteAds, setOffsiteAds] = useState<OffsiteAdsTier>("none");
  const [etsyPlus, setEtsyPlus] = useState<boolean>(false);
  const [targetMargin, setTargetMargin] = useState<number>(30);

  // UI status
  const [copied, setCopied] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"breakdown" | "targetMargin">("breakdown");

  // Read URL query params on initial load
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const qPrice = params.get("price");
      const qShip = params.get("ship");
      const qCogs = params.get("cogs");
      const qActShip = params.get("actShip");
      const qCurr = params.get("curr");
      const qCountry = params.get("country");
      const qAds = params.get("ads") as OffsiteAdsTier | null;
      const qPlus = params.get("plus");

      if (qPrice) setItemPrice(qPrice);
      if (qShip) setShippingCharged(qShip);
      if (qCogs) setItemCogs(qCogs);
      if (qActShip) setActualShippingCost(qActShip);
      if (qCurr && SUPPORTED_CURRENCIES.some((c) => c.code === qCurr)) setCurrencyCode(qCurr);
      if (qCountry && COUNTRY_PRESETS.some((c) => c.id === qCountry)) setCountryId(qCountry);
      if (qAds && ["none", "standard_15", "mandatory_12"].includes(qAds)) setOffsiteAds(qAds);
      if (qPlus) setEtsyPlus(qPlus === "true");
    } catch {
      // ignore
    }
  }, []);

  // Update currency when country changes if matching default currency exists
  const handleCountryChange = (newCountryId: string) => {
    setCountryId(newCountryId);
    const country = COUNTRY_PRESETS.find((c) => c.id === newCountryId);
    if (country && country.currency) {
      setCurrencyCode(country.currency);
    }
    if (newCountryId === "CUSTOM") {
      setShowCustomOverrides(true);
    }
  };

  // Compute fee calculation results
  const inputs: EtsyFeeInputs = useMemo(() => ({
    currencyCode,
    itemPrice: parseFloat(itemPrice) || 0,
    shippingCharged: parseFloat(shippingCharged) || 0,
    itemCogs: parseFloat(itemCogs) || 0,
    actualShippingCost: parseFloat(actualShippingCost) || 0,
    countryId,
    customProcessingPercent: parseFloat(customProcessingPercent) || 0,
    customProcessingFixed: parseFloat(customProcessingFixed) || 0,
    customRegulatoryPercent: parseFloat(customRegulatoryPercent) || 0,
    offsiteAds,
    etsyPlus,
    targetMarginPercent: targetMargin,
  }), [
    currencyCode,
    itemPrice,
    shippingCharged,
    itemCogs,
    actualShippingCost,
    countryId,
    customProcessingPercent,
    customProcessingFixed,
    customRegulatoryPercent,
    offsiteAds,
    etsyPlus,
    targetMargin,
  ]);

  const result: EtsyFeeResult = useMemo(() => calculateEtsyFees(inputs), [inputs]);

  const explanationSteps = useMemo(
    () => getEtsyFeeExplanationSteps(inputs, result),
    [inputs, result]
  );

  const sym = result.currency.symbol;

  const formatMoney = (val: number) => {
    return `${sym}${val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Scenario preset loader
  const loadScenario = (scenario: typeof PRESET_SCENARIOS[0]) => {
    if (scenario.inputs.itemPrice !== undefined) setItemPrice(scenario.inputs.itemPrice.toString());
    if (scenario.inputs.shippingCharged !== undefined) setShippingCharged(scenario.inputs.shippingCharged.toString());
    if (scenario.inputs.itemCogs !== undefined) setItemCogs(scenario.inputs.itemCogs.toString());
    if (scenario.inputs.actualShippingCost !== undefined) setActualShippingCost(scenario.inputs.actualShippingCost.toString());
    if (scenario.inputs.countryId) handleCountryChange(scenario.inputs.countryId);
    if (scenario.inputs.offsiteAds) setOffsiteAds(scenario.inputs.offsiteAds);
    if (scenario.inputs.etsyPlus !== undefined) setEtsyPlus(scenario.inputs.etsyPlus);
  };

  // Reset to default
  const handleReset = () => {
    setCurrencyCode("USD");
    setItemPrice("35.00");
    setShippingCharged("5.00");
    setItemCogs("8.50");
    setActualShippingCost("4.50");
    setCountryId("US");
    setOffsiteAds("none");
    setEtsyPlus(false);
    setShowCustomOverrides(false);
    setTargetMargin(30);
  };

  // Copy plain text summary to clipboard
  const handleCopySummary = async () => {
    const summaryText = `
=== QuickCalc: Etsy Fee & Net Profit Breakdown (2026) ===
Order Item Price: ${formatMoney(result.itemPrice)}
Shipping Charged: ${formatMoney(result.shippingCharged)}
Gross Order Total: ${formatMoney(result.orderTotal)}

-- Expenses & Costs --
Item COGS (Materials + Labor): ${formatMoney(result.itemCogs)}
Actual Shipping & Packaging: ${formatMoney(result.actualShippingCost)}
Total Product/Shipping Costs: ${formatMoney(result.totalProductCosts)}

-- Etsy Platform Fees (${result.country.name}) --
Listing Fee: ${formatMoney(result.listingFee)}
Transaction Fee (6.5%): ${formatMoney(result.transactionFee)}
Payment Processing (${result.country.processingPercent}% + ${sym}${result.country.processingFixed}): ${formatMoney(result.paymentProcessingFee)}
Regulatory Operating Fee (${result.country.regulatoryPercent}%): ${formatMoney(result.regulatoryOperatingFee)}
Offsite Ads (${inputs.offsiteAds === "standard_15" ? "15%" : inputs.offsiteAds === "mandatory_12" ? "12%" : "0%"}): ${formatMoney(result.offsiteAdFee)}
Total Etsy Fees: ${formatMoney(result.totalEtsyFees)} (Effective Fee Rate: ${result.effectiveEtsyFeeRate.toFixed(1)}%)

-- Profit & Breakeven Summary --
Total Expenses: ${formatMoney(result.totalExpenses)}
Net Profit: ${formatMoney(result.netProfit)}
Net Profit Margin: ${result.netProfitMargin.toFixed(1)}%
Markup on Cost: ${result.markupOnCost.toFixed(1)}%
Breakeven Item Price: ${formatMoney(result.breakevenPrice)}
Calculated at: https://quickcalc.cloud/tools/etsy-fee-calculator
`.trim();

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Share scenario (generates URL with params)
  const handleShareScenario = async () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + "/tools/etsy-fee-calculator");
    url.searchParams.set("price", itemPrice);
    url.searchParams.set("ship", shippingCharged);
    url.searchParams.set("cogs", itemCogs);
    url.searchParams.set("actShip", actualShippingCost);
    url.searchParams.set("curr", currencyCode);
    url.searchParams.set("country", countryId);
    url.searchParams.set("ads", offsiteAds);
    if (etsyPlus) url.searchParams.set("plus", "true");

    try {
      await navigator.clipboard.writeText(url.toString());
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // PDF Generation handler
  const handleDownloadPdf = async () => {
    setIsPdfGenerating(true);
    try {
      await generatePdfAsync({
        toolName: "Etsy Fee & Net Profit Calculator (2026)",
        toolSlug: "etsy-fee-calculator",
        inputs: [
          { label: "Item Sale Price", value: formatMoney(result.itemPrice) },
          { label: "Shipping Charged", value: formatMoney(result.shippingCharged) },
          { label: "Gross Order Total", value: formatMoney(result.orderTotal) },
          { label: "Item COGS", value: formatMoney(result.itemCogs) },
          { label: "Actual Shipping Cost", value: formatMoney(result.actualShippingCost) },
          { label: "Seller Country", value: result.country.name },
          { label: "Offsite Ads Tier", value: offsiteAds === "standard_15" ? "Standard Store (15%)" : offsiteAds === "mandatory_12" ? "Top Seller (12%)" : "None / Opted Out (0%)" },
          { label: "Currency", value: result.currency.code },
        ],
        results: [
          { label: "Net Profit", value: formatMoney(result.netProfit), isHighlight: true },
          { label: "Net Profit Margin", value: `${result.netProfitMargin.toFixed(1)}%`, isHighlight: true },
          { label: "Total Etsy Fees", value: formatMoney(result.totalEtsyFees) },
          { label: "Effective Etsy Cut", value: `${result.effectiveEtsyFeeRate.toFixed(1)}%` },
          { label: "Total Expenses", value: formatMoney(result.totalExpenses) },
          { label: "Breakeven Item Price", value: formatMoney(result.breakevenPrice) },
        ],
        summaryNote: `Based on Etsy's 2026 fee structures, your gross revenue is ${formatMoney(result.orderTotal)}. Etsy takes ${formatMoney(result.totalEtsyFees)} (${result.effectiveEtsyFeeRate.toFixed(1)}% effective rate), product & shipping costs total ${formatMoney(result.totalProductCosts)}, leaving you with a net profit of ${formatMoney(result.netProfit)} (${result.netProfitMargin.toFixed(1)}% margin). Your breakeven minimum price is ${formatMoney(result.breakevenPrice)}.`,
        table: {
          title: "Detailed Etsy Fee & Cost Itemization",
          headers: ["Fee / Cost Component", "Rate / Slabs", "Amount", "% of Revenue"],
          rows: [
            ["Item COGS (Materials + Labor)", "Direct Cost", formatMoney(result.itemCogs), result.orderTotal > 0 ? `${((result.itemCogs / result.orderTotal) * 100).toFixed(1)}%` : "0%"],
            ["Actual Shipping & Packaging", "Postage Cost", formatMoney(result.actualShippingCost), result.orderTotal > 0 ? `${((result.actualShippingCost / result.orderTotal) * 100).toFixed(1)}%` : "0%"],
            ["Listing Fee", `Fixed per item`, formatMoney(result.listingFee), result.orderTotal > 0 ? `${((result.listingFee / result.orderTotal) * 100).toFixed(1)}%` : "0%"],
            ["Etsy Transaction Fee", "6.5% on (Item + Shipping)", formatMoney(result.transactionFee), result.orderTotal > 0 ? `${((result.transactionFee / result.orderTotal) * 100).toFixed(1)}%` : "0%"],
            ["Payment Processing", `${result.country.processingPercent}% + ${sym}${result.country.processingFixed}`, formatMoney(result.paymentProcessingFee), result.orderTotal > 0 ? `${((result.paymentProcessingFee / result.orderTotal) * 100).toFixed(1)}%` : "0%"],
            ["Regulatory Operating Fee", `${result.country.regulatoryPercent}%`, formatMoney(result.regulatoryOperatingFee), result.orderTotal > 0 ? `${((result.regulatoryOperatingFee / result.orderTotal) * 100).toFixed(1)}%` : "0%"],
            ["Offsite Ads Fee", offsiteAds === "standard_15" ? "15%" : offsiteAds === "mandatory_12" ? "12%" : "0%", formatMoney(result.offsiteAdFee), result.orderTotal > 0 ? `${((result.offsiteAdFee / result.orderTotal) * 100).toFixed(1)}%` : "0%"],
            ["Total Etsy Fees", `${result.effectiveEtsyFeeRate.toFixed(1)}% Effective`, formatMoney(result.totalEtsyFees), result.orderTotal > 0 ? `${result.effectiveEtsyFeeRate.toFixed(1)}%` : "0%"],
            ["Total All Expenses", "Fees + COGS + Shipping", formatMoney(result.totalExpenses), result.orderTotal > 0 ? `${((result.totalExpenses / result.orderTotal) * 100).toFixed(1)}%` : "0%"],
            ["Net Take-Home Profit", `${result.netProfitMargin.toFixed(1)}% Margin`, formatMoney(result.netProfit), result.orderTotal > 0 ? `${result.netProfitMargin.toFixed(1)}%` : "0%"],
          ],
        },
      });
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Pie chart geometry calculations
  const chartSlices = useMemo(() => {
    const profit = Math.max(0, result.netProfit);
    const fees = result.totalEtsyFees;
    const cogs = result.itemCogs;
    const ship = result.actualShippingCost;

    // Normalizing slices relative to max(orderTotal, totalExpenses)
    const sum = profit + fees + cogs + ship;
    if (sum === 0) return [];

    const slices = [
      { name: "Net Profit", value: profit, color: "#10b981", textColor: "text-emerald-500", percent: (profit / sum) * 100 },
      { name: "Etsy Fees", value: fees, color: "#f43f5e", textColor: "text-rose-500", percent: (fees / sum) * 100 },
      { name: "Product COGS", value: cogs, color: "#8b5cf6", textColor: "text-violet-500", percent: (cogs / sum) * 100 },
      { name: "Shipping Cost", value: ship, color: "#38bdf8", textColor: "text-sky-500", percent: (ship / sum) * 100 },
    ].filter((s) => s.value > 0);

    // Compute SVG arc coordinates
    let cumulativeAngle = 0;
    return slices.map((slice) => {
      const angle = (slice.value / sum) * 360;
      const startAngle = cumulativeAngle;
      const endAngle = cumulativeAngle + angle;
      cumulativeAngle += angle;

      const r = 40;
      const cx = 50;
      const cy = 50;

      const startRad = ((startAngle - 90) * Math.PI) / 180;
      const endRad = ((endAngle - 90) * Math.PI) / 180;

      const x1 = cx + r * Math.cos(startRad);
      const y1 = cy + r * Math.sin(startRad);
      const x2 = cx + r * Math.cos(endRad);
      const y2 = cy + r * Math.sin(endRad);

      const largeArc = angle > 180 ? 1 : 0;
      const pathData =
        angle >= 359.99
          ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`
          : `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      return {
        ...slice,
        pathData,
        startAngle,
        endAngle,
      };
    });
  }, [result]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Preset Scenarios Selector Bar */}
      <div className="bg-zinc-100/80 dark:bg-zinc-900/60 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Instant Preset Scenarios:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {PRESET_SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => loadScenario(scenario)}
                className="px-2.5 py-1.5 text-xs font-medium bg-white dark:bg-zinc-800/90 hover:bg-teal-50 dark:hover:bg-teal-950/40 text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 border border-zinc-200 dark:border-zinc-700/80 hover:border-teal-400 dark:hover:border-teal-500/50 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
                title={scenario.description}
              >
                <span>{scenario.name}</span>
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

      {/* Main Two-Column Control Panel & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Input Control Cards (5 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Card 1: Order & Product Details */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    1. Order & Product Pricing
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Enter customer price and your product costs
                  </p>
                </div>
              </div>

              {/* Currency Selector */}
              <div className="relative">
                <select
                  value={currencyCode}
                  aria-label="Currency"
                  onChange={(e) => setCurrencyCode(e.target.value)}
                  className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 pr-6 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  {SUPPORTED_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Item Sale Price */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Item Listing Price ({sym})
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                    {sym}
                  </span>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    placeholder="35.00"
                  />
                </div>
              </div>

              {/* Shipping Charged to Buyer */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>Shipping to Buyer</span>
                  <span className="text-[10px] text-zinc-400 font-normal">($0 if Free Ship)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                    {sym}
                  </span>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={shippingCharged}
                    onChange={(e) => setShippingCharged(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    placeholder="5.00"
                  />
                </div>
              </div>

              {/* Item Cost / COGS */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1">
                  <span>Item Cost / COGS</span>
                  <span className="text-[10px] text-zinc-400 font-normal">(Materials + Labor)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                    {sym}
                  </span>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={itemCogs}
                    onChange={(e) => setItemCogs(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    placeholder="8.50"
                  />
                </div>
              </div>

              {/* Actual Shipping & Packaging Cost */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1">
                  <span>Actual Shipping & Box</span>
                  <span className="text-[10px] text-zinc-400 font-normal">(Out of pocket)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                    {sym}
                  </span>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={actualShippingCost}
                    onChange={(e) => setActualShippingCost(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                    placeholder="4.50"
                  />
                </div>
              </div>
            </div>

            {/* Quick Summary Pill inside Card 1 */}
            <div className="bg-zinc-50 dark:bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 flex items-center justify-between text-xs">
              <span className="text-zinc-500 dark:text-zinc-400">Gross Customer Order Total:</span>
              <span className="font-extrabold text-zinc-900 dark:text-white">
                {formatMoney(result.orderTotal)}
              </span>
            </div>
          </div>

          {/* Card 2: Location & 2026 Fee Slabs */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    2. Location & 2026 Fee Tiers
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Country rates, Offsite Ads & optional credits
                  </p>
                </div>
              </div>
            </div>

            {/* Country Selector Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Seller Country / Fee Preset
              </label>
              <div className="relative">
                <select
                  value={countryId}
                  aria-label="Seller Country / Fee Preset"
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full text-sm font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  {COUNTRY_PRESETS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.flag} {c.name} — Processing: {c.processingPercent}% + {c.currency === "GBP" ? "£" : c.currency === "EUR" ? "€" : "$"}{c.processingFixed.toFixed(2)}
                      {c.regulatoryPercent > 0 ? ` | Reg: ${c.regulatoryPercent}%` : ""}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
                {result.country.note}
              </p>
            </div>

            {/* Offsite Ads Selector (Radio Buttons) */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span>Etsy Offsite Ads Fee</span>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                  {offsiteAds === "none" ? "0% Fee" : offsiteAds === "standard_15" ? "15% Fee per ad sale" : "12% Mandatory Fee"}
                </span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setOffsiteAds("none")}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    offsiteAds === "none"
                      ? "bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-300 font-bold ring-1 ring-teal-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>None (0%)</span>
                    {offsiteAds === "none" && <Check className="w-3.5 h-3.5 text-teal-500" />}
                  </div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Opted Out / Organic
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setOffsiteAds("standard_15")}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    offsiteAds === "standard_15"
                      ? "bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-300 font-bold ring-1 ring-teal-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Store &lt;$10k (15%)</span>
                    {offsiteAds === "standard_15" && <Check className="w-3.5 h-3.5 text-teal-500" />}
                  </div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Optional 15% on ad sales
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setOffsiteAds("mandatory_12")}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    offsiteAds === "mandatory_12"
                      ? "bg-teal-500/10 border-teal-500 text-teal-700 dark:text-teal-300 font-bold ring-1 ring-teal-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Store &gt;$10k (12%)</span>
                    {offsiteAds === "mandatory_12" && <Check className="w-3.5 h-3.5 text-teal-500" />}
                  </div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Mandatory 12% on ad sales
                  </div>
                </button>
              </div>
            </div>

            {/* Etsy Plus Subscription Toggle */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <label className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      Etsy Plus Subscription ($10/mo)
                    </span>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Includes 15 free listing credits ($3) + $5 Etsy Ads monthly credits
                    </p>
                  </div>
                </div>
                <div className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={etsyPlus}
                    onChange={(e) => setEtsyPlus(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500"></div>
                </div>
              </label>
            </div>

            {/* Custom Slabs Overrides (Collapsible) */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowCustomOverrides(!showCustomOverrides)}
                className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{showCustomOverrides ? "Hide Custom Slabs" : "Customize Fee Slabs (Advanced)"}</span>
              </button>

              {showCustomOverrides && (
                <div className="mt-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                      Processing %
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={customProcessingPercent}
                      onChange={(e) => {
                        setCustomProcessingPercent(e.target.value);
                        setCountryId("CUSTOM");
                      }}
                      className="w-full p-1.5 font-bold bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                      Processing Fixed ({sym})
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={customProcessingFixed}
                      onChange={(e) => {
                        setCustomProcessingFixed(e.target.value);
                        setCountryId("CUSTOM");
                      }}
                      className="w-full p-1.5 font-bold bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                      Regulatory %
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={customRegulatoryPercent}
                      onChange={(e) => {
                        setCustomRegulatoryPercent(e.target.value);
                        setCountryId("CUSTOM");
                      }}
                      className="w-full p-1.5 font-bold bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Results & Visual Breakdown (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Primary 3-Metric Highlight Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Card: Net Profit (Green / Emerald) */}
            <div className={`p-4 rounded-2xl border transition-all ${
              result.netProfit >= 0
                ? "bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-teal-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-50"
                : "bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-red-500/10 border-rose-500/30 text-rose-950 dark:text-rose-50"
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Net Profit
                </span>
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                  result.netProfit >= 0
                    ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                    : "bg-rose-500/20 text-rose-700 dark:text-rose-300"
                }`}>
                  {result.netProfitMargin.toFixed(1)}% Margin
                </span>
              </div>
              <div className={`text-2xl font-black tracking-tight ${
                result.netProfit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
              }`}>
                {formatMoney(result.netProfit)}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                {result.markupOnCost.toFixed(0)}% markup on total cost
              </div>
            </div>

            {/* Card: Total Etsy Fees (Red / Rose) */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-orange-500/10 border-rose-500/20 text-zinc-900 dark:text-zinc-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  Total Etsy Fees
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300">
                  {result.effectiveEtsyFeeRate.toFixed(1)}% Cut
                </span>
              </div>
              <div className="text-2xl font-black tracking-tight text-rose-600 dark:text-rose-400">
                {formatMoney(result.totalEtsyFees)}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                6.5% + Processing + Reg
              </div>
            </div>

            {/* Card: Breakeven Price (Blue / Indigo) */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-blue-500/10 border-indigo-500/20 text-zinc-900 dark:text-zinc-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Breakeven Price
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-700 dark:text-indigo-300">
                  $0 Profit Target
                </span>
              </div>
              <div className="text-2xl font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                {formatMoney(result.breakevenPrice)}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Min. price to avoid loss
              </div>
            </div>
          </div>

          {/* Tab Navigation: Expense Breakdown vs Target Margin Pricing */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("breakdown")}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === "breakdown"
                      ? "bg-teal-500 text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  Expense & Profit Breakdown
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("targetMargin")}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === "targetMargin"
                      ? "bg-teal-500 text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  Target Margin Price Finder
                </button>
              </div>
            </div>

            {activeTab === "breakdown" ? (
              <div className="space-y-4">
                
                {/* SVG Visual Donut Chart + Legend */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  
                  {/* Visual Chart */}
                  <div className="sm:col-span-5 flex items-center justify-center relative">
                    <svg
                      viewBox="0 0 100 100"
                      className="w-36 h-36 transform -rotate-90 drop-shadow-sm"
                    >
                      <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e4e4e7" strokeWidth="1" className="dark:stroke-zinc-800" />
                      {chartSlices.map((slice, i) => (
                        <path
                          key={i}
                          d={slice.pathData}
                          fill={slice.color}
                          className="transition-all duration-300 hover:opacity-85"
                        />
                      ))}
                      <circle cx="50" cy="50" r="24" className="fill-white dark:fill-zinc-900" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase">Margin</span>
                      <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                        {result.netProfitMargin.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Segment Legend */}
                  <div className="sm:col-span-7 space-y-2">
                    {chartSlices.map((slice, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: slice.color }}
                          />
                          <span className="font-medium text-zinc-700 dark:text-zinc-300">
                            {slice.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-bold">
                          <span className="text-zinc-900 dark:text-white">
                            {formatMoney(slice.value)}
                          </span>
                          <span className="text-[11px] text-zinc-400 font-normal w-10 text-right">
                            {slice.percent.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Itemized Slabs Table */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                  <h3 className="text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-2">
                    Itemized Etsy Fee Breakdown (2026 Slabs)
                  </h3>
                  <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 text-xs">
                    
                    <div className="py-1.5 flex items-center justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                        <span>Listing Fee</span>
                        <span className="text-[10px] text-zinc-400">(Per 4 months / sale renewal)</span>
                      </span>
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        {formatMoney(result.listingFee)}
                      </span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                        <span>Transaction Fee (6.5%)</span>
                        <span className="text-[10px] text-zinc-400">on {formatMoney(result.orderTotal)}</span>
                      </span>
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        {formatMoney(result.transactionFee)}
                      </span>
                    </div>

                    <div className="py-1.5 flex items-center justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                        <span>Payment Processing Fee</span>
                        <span className="text-[10px] text-zinc-400">
                          ({result.country.processingPercent}% + {sym}{result.country.processingFixed.toFixed(2)})
                        </span>
                      </span>
                      <span className="font-semibold text-zinc-900 dark:text-white">
                        {formatMoney(result.paymentProcessingFee)}
                      </span>
                    </div>

                    {result.regulatoryOperatingFee > 0 && (
                      <div className="py-1.5 flex items-center justify-between">
                        <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                          <span>Regulatory Operating Fee</span>
                          <span className="text-[10px] text-zinc-400">({result.country.regulatoryPercent}%)</span>
                        </span>
                        <span className="font-semibold text-zinc-900 dark:text-white">
                          {formatMoney(result.regulatoryOperatingFee)}
                        </span>
                      </div>
                    )}

                    {result.offsiteAdFee > 0 && (
                      <div className="py-1.5 flex items-center justify-between">
                        <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                          <span>Offsite Ads Fee</span>
                          <span className="text-[10px] text-zinc-400">
                            ({inputs.offsiteAds === "standard_15" ? "15%" : "12%"})
                          </span>
                        </span>
                        <span className="font-semibold text-rose-600 dark:text-rose-400">
                          {formatMoney(result.offsiteAdFee)}
                        </span>
                      </div>
                    )}

                    <div className="py-2 flex items-center justify-between font-bold bg-zinc-50/50 dark:bg-zinc-950/40 px-2 rounded-lg mt-1">
                      <span className="text-rose-600 dark:text-rose-400">
                        Total Etsy Fees ({result.effectiveEtsyFeeRate.toFixed(1)}%)
                      </span>
                      <span className="text-rose-600 dark:text-rose-400 font-extrabold">
                        {formatMoney(result.totalEtsyFees)}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              /* Target Margin Pricing Tab */
              <div className="space-y-4 py-2">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      Target Profit Margin Goal:
                    </label>
                    <span className="text-sm font-black text-teal-600 dark:text-teal-400">
                      {targetMargin}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="75"
                    step="5"
                    value={targetMargin}
                    onChange={(e) => setTargetMargin(parseInt(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-semibold mt-1">
                    <span>5% (Low)</span>
                    <span>25% (Standard)</span>
                    <span>50% (High)</span>
                    <span>75% (Luxury)</span>
                  </div>
                </div>

                {/* Target Calculated Price Result */}
                <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-teal-900 dark:text-teal-200 block">
                      Required Item Listing Price:
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      To take home exactly {targetMargin}% clean profit margin
                    </span>
                  </div>
                  <div className="text-2xl font-black text-teal-600 dark:text-teal-400">
                    {result.targetMarginPrice !== undefined ? formatMoney(result.targetMarginPrice) : "N/A"}
                  </div>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Formula reverse-calculates all variable fees (6.5% transaction + {result.country.processingPercent}% payment processing + regulatory + ad rates) so your pocket profit margin is locked in at {targetMargin}%.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons: Copy Summary, Download PDF, Share Scenario */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            
            {/* Copy Results Summary */}
            <button
              type="button"
              onClick={handleCopySummary}
              className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied Summary!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-500" />
                  <span>Copy Breakdown</span>
                </>
              )}
            </button>

            {/* Download PDF Report */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isPdfGenerating}
              className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
            >
              <Download className={`w-4 h-4 text-zinc-500 ${isPdfGenerating ? "animate-bounce" : ""}`} />
              <span>{isPdfGenerating ? "Creating PDF..." : "Download PDF"}</span>
            </button>

            {/* Share Scenario */}
            <button
              type="button"
              onClick={handleShareScenario}
              className="py-2.5 px-3 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              {shareCopied ? (
                <>
                  <Check className="w-4 h-4 text-teal-500" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Share Scenario</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Step-by-Step Math Methodology Accordion */}
      <ExplainResultAccordion steps={explanationSteps} />
    </div>
  );
}
