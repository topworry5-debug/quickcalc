"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  calculateKDPRoyalty,
  getKDPRoyaltyExplanationSteps,
  KDP_MARKETPLACES,
  KDP_PRESETS,
  KDPCalculatorInputs,
  KDPCalculatorResult,
  BookFormat,
  InteriorType,
  TrimSize,
  DistributionChannel,
} from "@/lib/calculators/kdpRoyaltyCalculator";
import { generatePdfAsync } from "@/lib/utils/downloadPdf";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import {
  RotateCcw,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  BookOpen,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";

export default function KDPRoyaltyCalculatorWidget() {
  // Inputs state
  const [format, setFormat] = useState<BookFormat>("paperback");
  const [interiorType, setInteriorType] = useState<InteriorType>("bw_cream");
  const [trimSize, setTrimSize] = useState<TrimSize>("standard");
  const [pageCount, setPageCount] = useState<string>("300");
  const [marketplaceId, setMarketplaceId] = useState<string>("amazon_com");
  const [listPrice, setListPrice] = useState<string>("14.99");
  const [distribution, setDistribution] = useState<DistributionChannel>("amazon_60");

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  // Sync state from URL params on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const qFormat = params.get("format") as BookFormat | null;
      const qInterior = params.get("interior") as InteriorType | null;
      const qTrim = params.get("trim") as TrimSize | null;
      const qPages = params.get("pages");
      const qMarket = params.get("market");
      const qPrice = params.get("price");
      const qDist = params.get("dist") as DistributionChannel | null;

      if (qFormat && ["paperback", "hardcover"].includes(qFormat)) setFormat(qFormat);
      if (qInterior && ["bw_white", "bw_cream", "std_color", "premium_color"].includes(qInterior)) setInteriorType(qInterior);
      if (qTrim && ["standard", "large"].includes(qTrim)) setTrimSize(qTrim);
      if (qPages) setPageCount(qPages);
      if (qMarket && KDP_MARKETPLACES.some((m) => m.id === qMarket)) setMarketplaceId(qMarket);
      if (qPrice) setListPrice(qPrice);
      if (qDist && ["amazon_60", "expanded_40"].includes(qDist)) setDistribution(qDist);
    } catch {
      // ignore
    }
  }, []);

  // Compute live calculations
  const inputs: KDPCalculatorInputs = useMemo(() => ({
    format,
    interiorType,
    trimSize,
    pageCount: parseInt(pageCount) || 24,
    marketplaceId,
    listPrice: parseFloat(listPrice) || 0,
    distribution,
  }), [
    format,
    interiorType,
    trimSize,
    pageCount,
    marketplaceId,
    listPrice,
    distribution,
  ]);

  const result: KDPCalculatorResult = useMemo(() => calculateKDPRoyalty(inputs), [inputs]);

  const explanationSteps = useMemo(
    () => getKDPRoyaltyExplanationSteps(inputs, result),
    [inputs, result]
  );

  const sym = result.marketplace.symbol;

  const formatMoney = (val: number) => {
    return `${sym}${val.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Preset loader
  const loadPreset = (preset: typeof KDP_PRESETS[0]) => {
    if (preset.inputs.format) setFormat(preset.inputs.format);
    if (preset.inputs.interiorType) setInteriorType(preset.inputs.interiorType);
    if (preset.inputs.trimSize) setTrimSize(preset.inputs.trimSize);
    if (preset.inputs.pageCount !== undefined) setPageCount(preset.inputs.pageCount.toString());
    if (preset.inputs.listPrice !== undefined) setListPrice(preset.inputs.listPrice.toString());
    if (preset.inputs.distribution) setDistribution(preset.inputs.distribution);
    if (preset.inputs.marketplaceId) setMarketplaceId(preset.inputs.marketplaceId);
  };

  // Reset to default
  const handleReset = () => {
    setFormat("paperback");
    setInteriorType("bw_cream");
    setTrimSize("standard");
    setPageCount("300");
    setMarketplaceId("amazon_com");
    setListPrice("14.99");
    setDistribution("amazon_60");
  };

  // Copy Summary
  const handleCopySummary = async () => {
    const summaryText = `
=== QuickCalc: Amazon KDP Royalty & Printing Cost Summary (2026) ===
Marketplace: ${result.marketplace.name}
Book Format: ${format === "paperback" ? "Paperback" : "Hardcover"} (${inputs.pageCount} Pages)
Interior: ${interiorType === "bw_white" ? "Black & White (White Paper)" : interiorType === "bw_cream" ? "Black & White (Cream Paper)" : interiorType === "std_color" ? "Standard Color" : "Premium Color"}
Trim Size: ${trimSize === "standard" ? "Standard (≤ 6.125\" x 9.25\")" : "Large (e.g. 8.5\" x 11\")"}
Distribution: ${distribution === "amazon_60" ? "Amazon Marketplace (60% Royalty)" : "Expanded Distribution (40% Royalty)"}

-- Financial Breakdown --
List Price: ${formatMoney(inputs.listPrice)}
KDP Printing Cost: ${formatMoney(result.printingCost)} ${result.isFlatRateTier ? "(Flat Tier)" : `(${formatMoney(result.fixedCostComponent)} fixed + ${formatMoney(result.perPageCostComponent)} page cost)`}
Gross Royalty: ${formatMoney(result.grossRoyalty)}
Amazon Retail Commission: ${formatMoney(result.amazonCutAmount)} (${100 - result.royaltyRatePercent}%)
Net Author Royalty / Profit: ${formatMoney(result.netRoyalty)} (${result.royaltyMarginPercent.toFixed(1)}% margin)
Minimum Breakeven List Price: ${formatMoney(result.minimumBreakevenPrice)}

-- Projected Volume Earnings --
100 Copies Sold: ${formatMoney(result.earnings100Copies)}
500 Copies Sold: ${formatMoney(result.earnings500Copies)}
1,000 Copies Sold: ${formatMoney(result.earnings1000Copies)}
2,500 Copies Sold: ${formatMoney(result.earnings2500Copies)}

Calculated at: https://quickcalc.cloud/tools/kdp-royalty-calculator
`.trim();

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Share Scenario
  const handleShareScenario = async () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + "/tools/kdp-royalty-calculator");
    url.searchParams.set("format", format);
    url.searchParams.set("interior", interiorType);
    url.searchParams.set("trim", trimSize);
    url.searchParams.set("pages", pageCount);
    url.searchParams.set("market", marketplaceId);
    url.searchParams.set("price", listPrice);
    url.searchParams.set("dist", distribution);

    try {
      await navigator.clipboard.writeText(url.toString());
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Download PDF Report
  const handleDownloadPdf = async () => {
    setIsPdfGenerating(true);
    try {
      await generatePdfAsync({
        toolName: "Amazon KDP Royalty & Printing Cost Rate Sheet",
        toolSlug: "kdp-royalty-calculator",
        inputs: [
          { label: "Marketplace", value: result.marketplace.name },
          { label: "Book Format", value: format === "paperback" ? "Paperback" : "Hardcover" },
          { label: "Interior Ink / Paper", value: interiorType === "bw_white" ? "B&W (White Paper)" : interiorType === "bw_cream" ? "B&W (Cream Paper)" : interiorType === "std_color" ? "Standard Color" : "Premium Color" },
          { label: "Trim Size", value: trimSize === "standard" ? "Standard (≤ 6.125\" x 9.25\")" : "Large (8.5\" x 11\")" },
          { label: "Total Page Count", value: `${inputs.pageCount} pages` },
          { label: "Distribution Channel", value: distribution === "amazon_60" ? "Amazon Marketplace (60%)" : "Expanded Distribution (40%)" },
          { label: "Book List Price", value: formatMoney(inputs.listPrice) },
        ],
        results: [
          { label: "Net Royalty Per Sale", value: formatMoney(result.netRoyalty), isHighlight: true },
          { label: "Author Profit Margin", value: `${result.royaltyMarginPercent.toFixed(1)}%`, isHighlight: true },
          { label: "KDP Printing Cost", value: formatMoney(result.printingCost) },
          { label: "Amazon Retail Cut", value: formatMoney(result.amazonCutAmount) },
          { label: "Minimum Breakeven Price", value: formatMoney(result.minimumBreakevenPrice) },
          { label: "Earnings on 500 Copies", value: formatMoney(result.earnings500Copies), isHighlight: true },
        ],
        summaryNote: `For a ${inputs.pageCount}-page ${format} priced at ${formatMoney(inputs.listPrice)} on ${result.marketplace.name}, the KDP print-on-demand cost is ${formatMoney(result.printingCost)}. Amazon takes ${formatMoney(result.amazonCutAmount)} in retail commission (${100 - result.royaltyRatePercent}%), leaving you with a net profit of ${formatMoney(result.netRoyalty)} per copy sold (${result.royaltyMarginPercent.toFixed(1)}% margin). Your minimum list price floor is ${formatMoney(result.minimumBreakevenPrice)}.`,
        table: {
          title: "Multi-Book Volume Earnings Projections",
          headers: ["Sales Volume", "Gross Book Sales", "Total Print Costs", "Net Author Royalties"],
          rows: [
            ["100 Copies", formatMoney(inputs.listPrice * 100), formatMoney(result.printingCost * 100), formatMoney(result.earnings100Copies)],
            ["250 Copies", formatMoney(inputs.listPrice * 250), formatMoney(result.printingCost * 250), formatMoney(result.netRoyalty * 250)],
            ["500 Copies", formatMoney(inputs.listPrice * 500), formatMoney(result.printingCost * 500), formatMoney(result.earnings500Copies)],
            ["1,000 Copies", formatMoney(inputs.listPrice * 1000), formatMoney(result.printingCost * 1000), formatMoney(result.earnings1000Copies)],
            ["2,500 Copies", formatMoney(inputs.listPrice * 2500), formatMoney(result.printingCost * 2500), formatMoney(result.earnings2500Copies)],
          ],
        },
      });
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Split percentages for visual bar
  const revenueTotal = Math.max(0.01, inputs.listPrice);
  const authorPercent = Math.max(0, (result.netRoyalty / revenueTotal) * 100);
  const amazonPercent = Math.max(0, (result.amazonCutAmount / revenueTotal) * 100);
  const printPercent = Math.max(0, (result.printingCost / revenueTotal) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Preset Scenarios Selector Bar */}
      <div className="bg-zinc-100/80 dark:bg-zinc-900/60 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>KDP Publishing Presets:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {KDP_PRESETS.map((preset) => (
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
              title="Reset all inputs to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: 2 Input Cards (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Card 1: Book Format & Specification */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  1. Book Format & Interior Specs
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Select binding, paper ink type, and page count
                </p>
              </div>
            </div>

            {/* Format Type Pill Buttons (Paperback vs Hardcover) */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Book Binding Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat("paperback")}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    format === "paperback"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
                  }`}
                >
                  <span>Paperback</span>
                  {format === "paperback" && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFormat("hardcover");
                    if (interiorType === "std_color") setInteriorType("premium_color");
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    format === "hardcover"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
                  }`}
                >
                  <span>Hardcover</span>
                  {format === "hardcover" && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                </button>
              </div>
            </div>

            {/* Interior / Ink Type Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Interior & Paper Type
              </label>
              <div className="relative">
                <select
                  value={interiorType}
                  aria-label="Interior & Paper Type"
                  onChange={(e) => setInteriorType(e.target.value as InteriorType)}
                  className="w-full text-sm font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="bw_cream">Black & white interior with cream paper (Novels)</option>
                  <option value="bw_white">Black & white interior with white paper (Non-fiction)</option>
                  {format === "paperback" && (
                    <option value="std_color">Standard color interior with white paper (Budget color)</option>
                  )}
                  <option value="premium_color">Premium color interior with white paper (Photo/Kids books)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Trim Size */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Trim Size
                </label>
                <div className="relative">
                  <select
                    value={trimSize}
                    aria-label="Trim Size"
                    onChange={(e) => setTrimSize(e.target.value as TrimSize)}
                    className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="standard">Standard (≤ 6.125&quot; × 9.25&quot;)</option>
                    <option value="large">Large / Oversized (e.g. 8.5&quot; × 11&quot;)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Page Count */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span>Page Count</span>
                  <span className="text-[10px] text-zinc-400 font-normal">
                    {format === "hardcover" ? "75–550 pgs" : "24–828 pgs"}
                  </span>
                </label>
                <input
                  type="number"
                  min={format === "hardcover" ? 75 : 24}
                  max={format === "hardcover" ? 550 : 828}
                  step="2"
                  value={pageCount}
                  onChange={(e) => setPageCount(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="300"
                />
              </div>
            </div>

            {/* Quick Page Count Step Buttons */}
            <div className="flex items-center gap-1.5 text-xs pt-1">
              <span className="text-[10px] text-zinc-400 font-semibold mr-1">Quick Pages:</span>
              {[32, 120, 200, 300, 400].map((pages) => (
                <button
                  key={pages}
                  type="button"
                  onClick={() => setPageCount(pages.toString())}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-colors ${
                    parseInt(pageCount) === pages
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                  }`}
                >
                  {pages}p
                </button>
              ))}
            </div>
          </div>

          {/* Card 2: Pricing & Marketplace Settings */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  2. Marketplace & Retail Pricing
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Select Amazon country and distribution royalty tier
                </p>
              </div>
            </div>

            {/* Marketplace Selector Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Amazon Marketplace
              </label>
              <div className="relative">
                <select
                  value={marketplaceId}
                  aria-label="Amazon Marketplace"
                  onChange={(e) => setMarketplaceId(e.target.value)}
                  className="w-full text-sm font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  {KDP_MARKETPLACES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.flag} {m.name} — Currency: {m.currencyCode} ({m.symbol})
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Book List Price */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                <span>Book Retail List Price ({sym})</span>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                  Breakeven Floor: {formatMoney(result.minimumBreakevenPrice)}
                </span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-400">
                  {sym}
                </span>
                <input
                  type="number"
                  step="0.50"
                  min="0.99"
                  value={listPrice}
                  onChange={(e) => setListPrice(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="14.99"
                />
              </div>
            </div>

            {/* Quick Pricing Buttons */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[10px] text-zinc-400 font-semibold mr-1">Quick Price:</span>
              {[9.99, 12.99, 14.99, 19.99, 24.99].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setListPrice(p.toString())}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-colors ${
                    parseFloat(listPrice) === p
                      ? "bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300"
                  }`}
                >
                  {sym}{p}
                </button>
              ))}
            </div>

            {/* Distribution Channel Radio Buttons */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Distribution Channel & Royalty Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDistribution("amazon_60")}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    distribution === "amazon_60"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Amazon Direct (60%)</span>
                    {distribution === "amazon_60" && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                  </div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Standard sales on Amazon website
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDistribution("expanded_40")}
                  className={`p-3 rounded-xl border text-left text-xs transition-all ${
                    distribution === "expanded_40"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Expanded Distribution (40%)</span>
                    {distribution === "expanded_40" && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                  </div>
                  <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Libraries, bookshops, & distributors
                  </div>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Calculated Results, Visual Revenue Split & Projections (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Primary 3-Metric Highlight Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Net Royalty Per Sale (Emerald / Green) */}
            <div className={`p-4 rounded-2xl border transition-all ${
              result.netRoyalty > 0
                ? "bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-teal-500/10 border-emerald-500/30 text-zinc-900 dark:text-zinc-100"
                : "bg-gradient-to-br from-rose-500/15 via-rose-500/5 to-red-500/10 border-rose-500/30 text-zinc-900 dark:text-zinc-100"
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Net Royalty
                </span>
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                  result.netRoyalty > 0
                    ? "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300"
                    : "bg-rose-500/20 text-rose-800 dark:text-rose-300"
                }`}>
                  {result.royaltyMarginPercent.toFixed(1)}% Margin
                </span>
              </div>
              <div className={`text-2xl sm:text-3xl font-black tracking-tight ${
                result.netRoyalty > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
              }`}>
                {formatMoney(result.netRoyalty)}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Author take-home per copy
              </div>
            </div>

            {/* Printing Cost (Slate / Rose) */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-zinc-500/10 via-zinc-500/5 to-slate-500/10 border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Printing Cost
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  {result.isFlatRateTier ? "Flat Rate" : "Per-Page"}
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                {formatMoney(result.printingCost)}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                KDP production charge
              </div>
            </div>

            {/* Minimum Breakeven Price (Violet / Indigo) */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-indigo-500/15 via-indigo-500/5 to-purple-500/10 border-indigo-500/30 text-zinc-900 dark:text-zinc-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
                  Min List Price
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-800 dark:text-indigo-300">
                  $0 Profit
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                {formatMoney(result.minimumBreakevenPrice)}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Lowest permitted price
              </div>
            </div>
          </div>

          {/* Visual Revenue Split Bar */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                Retail Revenue Distribution ({formatMoney(inputs.listPrice)})
              </h3>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {result.royaltyMarginPercent.toFixed(1)}% Author Share
              </span>
            </div>

            {/* Segmented Progress Bar */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex p-0.5 gap-0.5 shadow-inner">
                {/* Author Royalty */}
                <div
                  style={{ width: `${authorPercent}%` }}
                  className="h-full bg-emerald-500 rounded-l-full transition-all duration-300"
                  title={`Author Net Royalty: ${formatMoney(result.netRoyalty)} (${authorPercent.toFixed(1)}%)`}
                />
                {/* Amazon Commission */}
                <div
                  style={{ width: `${amazonPercent}%` }}
                  className="h-full bg-indigo-500 transition-all duration-300"
                  title={`Amazon Cut: ${formatMoney(result.amazonCutAmount)} (${amazonPercent.toFixed(1)}%)`}
                />
                {/* Printing Cost */}
                <div
                  style={{ width: `${printPercent}%` }}
                  className="h-full bg-zinc-400 dark:bg-zinc-600 rounded-r-full transition-all duration-300"
                  title={`Printing Cost: ${formatMoney(result.printingCost)} (${printPercent.toFixed(1)}%)`}
                />
              </div>

              {/* Bar Legend */}
              <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <div className="truncate">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">Your Royalty</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{formatMoney(result.netRoyalty)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 flex-shrink-0" />
                  <div className="truncate">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">Amazon Cut</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{formatMoney(result.amazonCutAmount)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-400 dark:bg-zinc-600 flex-shrink-0" />
                  <div className="truncate">
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block">Printing Cost</span>
                    <span className="font-bold text-zinc-900 dark:text-white">{formatMoney(result.printingCost)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Multi-Book Volume Earnings Projections */}
            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2">
              <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 block">
                Projected Volume Author Earnings
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 text-center">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-semibold">100 Copies</span>
                  <span className="font-extrabold text-sm text-zinc-900 dark:text-white">
                    {formatMoney(result.earnings100Copies)}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 text-center">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-semibold">500 Copies</span>
                  <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                    {formatMoney(result.earnings500Copies)}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 text-center">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-semibold">1,000 Copies</span>
                  <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                    {formatMoney(result.earnings1000Copies)}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800/80 text-center">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-semibold">2,500 Copies</span>
                  <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                    {formatMoney(result.earnings2500Copies)}
                  </span>
                </div>
              </div>
            </div>
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
                  <span>Copy Royalty Summary</span>
                </>
              )}
            </button>

            {/* Download PDF Rate Sheet */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isPdfGenerating}
              className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
            >
              <Download className={`w-4 h-4 text-zinc-500 ${isPdfGenerating ? "animate-bounce" : ""}`} />
              <span>{isPdfGenerating ? "Generating..." : "Download PDF Rate Sheet"}</span>
            </button>

            {/* Share Pricing Model */}
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
                  <span>Share Pricing Model</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Step-by-Step Mathematical Derivation Accordion */}
      <ExplainResultAccordion steps={explanationSteps} />
    </div>
  );
}
