"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  calculateEtsyVsKdp,
  getEtsyVsKdpExplanationSteps,
  ETSY_VS_KDP_PRESETS,
  EtsyVsKdpInputs,
  EtsyVsKdpResult,
} from "@/lib/calculators/etsyVsKdpCalculator";
import { BookFormat, InteriorType, TrimSize } from "@/lib/calculators/kdpRoyaltyCalculator";
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
  BookOpen,
  Award,
  ChevronDown,
} from "lucide-react";

export default function EtsyVsKdpCalculatorWidget() {
  // Universal inputs
  const [retailPrice, setRetailPrice] = useState<string>("14.99");
  const [itemCogs, setItemCogs] = useState<string>("5.50");
  const [monthlyVolume, setMonthlyVolume] = useState<string>("150");

  // Etsy inputs
  const [countryPreset, setCountryPreset] = useState<string>("usa");
  const [countryProcessingRate, setCountryProcessingRate] = useState<number>(0.03);
  const [countryFixedFee, setCountryFixedFee] = useState<number>(0.25);
  const [offsiteAdsRate, setOffsiteAdsRate] = useState<number>(0);
  const [shippingCharged, setShippingCharged] = useState<string>("3.99");
  const [actualShippingCost, setActualShippingCost] = useState<string>("3.99");

  // KDP inputs
  const [format, setFormat] = useState<BookFormat>("paperback");
  const [interiorType, setInteriorType] = useState<InteriorType>("bw_cream");
  const [trimSize, setTrimSize] = useState<TrimSize>("standard");
  const [pageCount, setPageCount] = useState<string>("120");
  const [distribution, setDistribution] = useState<"amazon_60" | "expanded_40">("amazon_60");

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  // Sync state from URL parameters
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const qPrice = params.get("price");
      const qCogs = params.get("cogs");
      const qVol = params.get("vol");
      const qAds = params.get("ads");
      const qPages = params.get("pages");
      const qFormat = params.get("format") as BookFormat | null;
      const qInterior = params.get("interior") as InteriorType | null;

      if (qPrice) setRetailPrice(qPrice);
      if (qCogs) setItemCogs(qCogs);
      if (qVol) setMonthlyVolume(qVol);
      if (qAds) setOffsiteAdsRate(parseFloat(qAds) || 0);
      if (qPages) setPageCount(qPages);
      if (qFormat && ["paperback", "hardcover"].includes(qFormat)) setFormat(qFormat);
      if (qInterior && ["bw_white", "bw_cream", "std_color", "premium_color"].includes(qInterior)) setInteriorType(qInterior);
    } catch {
      // ignore
    }
  }, []);

  // Country preset handler
  const handleCountryPresetChange = (presetId: string) => {
    setCountryPreset(presetId);
    if (presetId === "usa") {
      setCountryProcessingRate(0.03);
      setCountryFixedFee(0.25);
    } else if (presetId === "uk") {
      setCountryProcessingRate(0.04);
      setCountryFixedFee(0.25);
    } else if (presetId === "eu") {
      setCountryProcessingRate(0.04);
      setCountryFixedFee(0.30);
    }
  };

  // Compile calculations
  const inputs: EtsyVsKdpInputs = useMemo(() => ({
    retailPrice: parseFloat(retailPrice) || 0,
    itemCogs: parseFloat(itemCogs) || 0,
    monthlyVolume: parseInt(monthlyVolume) || 1,
    etsy: {
      countryProcessingRate,
      countryFixedFee,
      offsiteAdsRate,
      shippingCharged: parseFloat(shippingCharged) || 0,
      actualShippingCost: parseFloat(actualShippingCost) || 0,
    },
    kdp: {
      format,
      interiorType,
      trimSize,
      pageCount: parseInt(pageCount) || 24,
      distribution,
    },
  }), [
    retailPrice,
    itemCogs,
    monthlyVolume,
    countryProcessingRate,
    countryFixedFee,
    offsiteAdsRate,
    shippingCharged,
    actualShippingCost,
    format,
    interiorType,
    trimSize,
    pageCount,
    distribution,
  ]);

  const result: EtsyVsKdpResult = useMemo(() => calculateEtsyVsKdp(inputs), [inputs]);

  const explanationSteps = useMemo(
    () => getEtsyVsKdpExplanationSteps(inputs, result),
    [inputs, result]
  );

  const formatMoney = (val: number) => `$${val.toFixed(2)}`;

  // Load preset
  const loadPreset = (preset: typeof ETSY_VS_KDP_PRESETS[0]) => {
    if (preset.inputs.retailPrice !== undefined) setRetailPrice(preset.inputs.retailPrice.toString());
    if (preset.inputs.itemCogs !== undefined) setItemCogs(preset.inputs.itemCogs.toString());
    if (preset.inputs.monthlyVolume !== undefined) setMonthlyVolume(preset.inputs.monthlyVolume.toString());
    if (preset.inputs.etsy) {
      if (preset.inputs.etsy.shippingCharged !== undefined) setShippingCharged(preset.inputs.etsy.shippingCharged.toString());
      if (preset.inputs.etsy.actualShippingCost !== undefined) setActualShippingCost(preset.inputs.etsy.actualShippingCost.toString());
      if (preset.inputs.etsy.offsiteAdsRate !== undefined) setOffsiteAdsRate(preset.inputs.etsy.offsiteAdsRate);
    }
    if (preset.inputs.kdp) {
      if (preset.inputs.kdp.format) setFormat(preset.inputs.kdp.format);
      if (preset.inputs.kdp.interiorType) setInteriorType(preset.inputs.kdp.interiorType);
      if (preset.inputs.kdp.trimSize) setTrimSize(preset.inputs.kdp.trimSize);
      if (preset.inputs.kdp.pageCount !== undefined) setPageCount(preset.inputs.kdp.pageCount.toString());
      if (preset.inputs.kdp.distribution) setDistribution(preset.inputs.kdp.distribution);
    }
  };

  // Reset
  const handleReset = () => {
    setRetailPrice("14.99");
    setItemCogs("5.50");
    setMonthlyVolume("150");
    setCountryPreset("usa");
    setCountryProcessingRate(0.03);
    setCountryFixedFee(0.25);
    setOffsiteAdsRate(0);
    setShippingCharged("3.99");
    setActualShippingCost("3.99");
    setFormat("paperback");
    setInteriorType("bw_cream");
    setTrimSize("standard");
    setPageCount("120");
    setDistribution("amazon_60");
  };

  // Copy Summary
  const handleCopySummary = async () => {
    const summaryText = `
=== QuickCalc: Etsy vs Amazon KDP Profit Comparison (2026) ===
Product Retail Price: ${formatMoney(inputs.retailPrice)}
Monthly Sales Volume: ${inputs.monthlyVolume} Units

-- WINNER ANALYSIS --
Platform Winner: ${result.winner === "etsy" ? "Etsy" : result.winner === "kdp" ? "Amazon KDP" : "Tied"}
Profit Advantage: ${result.summaryHeadline}
Monthly Profit Edge: ${formatMoney(result.monthlyProfitDifference)}/month

-- ETSY BREAKDOWN --
Etsy Net Profit Per Unit: ${formatMoney(result.etsy.netProfitPerUnit)} (${result.etsy.profitMarginPercent.toFixed(1)}% margin)
Etsy Total Platform Fees: ${formatMoney(result.etsy.platformFees)}
Etsy Production & Shipping: ${formatMoney(result.etsy.productionOrShippingCost)}
Etsy Total Monthly Profit: ${formatMoney(result.etsy.monthlyTotalProfit)}

-- AMAZON KDP BREAKDOWN --
KDP Net Royalty Per Unit: ${formatMoney(result.kdp.netProfitPerUnit)} (${result.kdp.profitMarginPercent.toFixed(1)}% margin)
Amazon Retail Commission (40%): ${formatMoney(result.kdp.platformFees)}
KDP Printing Cost: ${formatMoney(result.kdp.productionOrShippingCost)}
KDP Total Monthly Profit: ${formatMoney(result.kdp.monthlyTotalProfit)}

Calculated at: https://quickcalc.cloud/tools/etsy-vs-kdp-calculator
`.trim();

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Share scenario
  const handleShareScenario = async () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + "/tools/etsy-vs-kdp-calculator");
    url.searchParams.set("price", retailPrice);
    url.searchParams.set("cogs", itemCogs);
    url.searchParams.set("vol", monthlyVolume);
    url.searchParams.set("ads", offsiteAdsRate.toString());
    url.searchParams.set("pages", pageCount);
    url.searchParams.set("format", format);
    url.searchParams.set("interior", interiorType);

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
        toolName: "Etsy vs Amazon KDP Profit Comparison Report",
        toolSlug: "etsy-vs-kdp-calculator",
        inputs: [
          { label: "Product Retail Price", value: formatMoney(inputs.retailPrice) },
          { label: "Etsy Production / COGS", value: formatMoney(inputs.itemCogs) },
          { label: "KDP Format & Pages", value: `${format === "paperback" ? "Paperback" : "Hardcover"} (${inputs.kdp.pageCount} pgs)` },
          { label: "Estimated Monthly Volume", value: `${inputs.monthlyVolume} units/mo` },
          { label: "Etsy Offsite Ads", value: offsiteAdsRate > 0 ? `${(offsiteAdsRate * 100).toFixed(0)}%` : "0% (Opted Out)" },
          { label: "KDP Distribution", value: distribution === "amazon_60" ? "Amazon Direct (60%)" : "Expanded (40%)" },
        ],
        results: [
          { label: "Platform Winner", value: result.winner === "etsy" ? "Etsy" : result.winner === "kdp" ? "Amazon KDP" : "Tied", isHighlight: true },
          { label: "Profit Edge Per Sale", value: `${formatMoney(result.profitDifferencePerUnit)} (${result.marginDifferencePercent.toFixed(1)}%)`, isHighlight: true },
          { label: "Etsy Net Profit Per Unit", value: `${formatMoney(result.etsy.netProfitPerUnit)} (${result.etsy.profitMarginPercent.toFixed(1)}%)` },
          { label: "KDP Net Royalty Per Unit", value: `${formatMoney(result.kdp.netProfitPerUnit)} (${result.kdp.profitMarginPercent.toFixed(1)}%)` },
          { label: "Etsy Monthly Earnings", value: formatMoney(result.etsy.monthlyTotalProfit) },
          { label: "KDP Monthly Earnings", value: formatMoney(result.kdp.monthlyTotalProfit) },
          { label: "Monthly Income Difference", value: `${formatMoney(result.monthlyProfitDifference)}/month`, isHighlight: true },
        ],
        summaryNote: `For a product priced at ${formatMoney(inputs.retailPrice)} with ${inputs.monthlyVolume} monthly sales, ${result.winner === "etsy" ? "Etsy" : "Amazon KDP"} generates ${formatMoney(result.profitDifferencePerUnit)} more net profit per sale (${result.marginDifferencePercent.toFixed(1)}% higher margin), yielding a total monthly income difference of ${formatMoney(result.monthlyProfitDifference)}.`,
        table: {
          title: "Monthly Volume Earnings Projections (Etsy vs KDP)",
          headers: ["Monthly Units", "Etsy Gross Revenue", "Etsy Net Profit", "KDP Net Royalties", "Difference"],
          rows: [
            ["50 Sales", formatMoney(inputs.retailPrice * 50), formatMoney(result.etsy.netProfitPerUnit * 50), formatMoney(result.kdp.netProfitPerUnit * 50), formatMoney(result.profitDifferencePerUnit * 50)],
            ["150 Sales", formatMoney(inputs.retailPrice * 150), formatMoney(result.etsy.netProfitPerUnit * 150), formatMoney(result.kdp.netProfitPerUnit * 150), formatMoney(result.profitDifferencePerUnit * 150)],
            ["300 Sales", formatMoney(inputs.retailPrice * 300), formatMoney(result.etsy.netProfitPerUnit * 300), formatMoney(result.kdp.netProfitPerUnit * 300), formatMoney(result.profitDifferencePerUnit * 300)],
            ["500 Sales", formatMoney(inputs.retailPrice * 500), formatMoney(result.etsy.netProfitPerUnit * 500), formatMoney(result.kdp.netProfitPerUnit * 500), formatMoney(result.profitDifferencePerUnit * 500)],
            ["1,000 Sales", formatMoney(inputs.retailPrice * 1000), formatMoney(result.etsy.netProfitPerUnit * 1000), formatMoney(result.kdp.netProfitPerUnit * 1000), formatMoney(result.profitDifferencePerUnit * 1000)],
          ],
        },
      });
    } catch (e) {
      console.error("PDF generation error", e);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Bar proportions
  const etsyRev = Math.max(0.01, result.etsy.grossRevenue);
  const etsyProfitPct = Math.max(0, (result.etsy.netProfitPerUnit / etsyRev) * 100);
  const etsyFeePct = Math.max(0, (result.etsy.platformFees / etsyRev) * 100);
  const etsyCostPct = Math.max(0, (result.etsy.productionOrShippingCost / etsyRev) * 100);

  const kdpRev = Math.max(0.01, result.kdp.grossRevenue);
  const kdpProfitPct = Math.max(0, (result.kdp.netProfitPerUnit / kdpRev) * 100);
  const kdpFeePct = Math.max(0, (result.kdp.platformFees / kdpRev) * 100);
  const kdpCostPct = Math.max(0, (result.kdp.productionOrShippingCost / kdpRev) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Preset Scenarios Bar */}
      <div className="bg-zinc-100/80 dark:bg-zinc-900/60 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Comparison Presets:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {ETSY_VS_KDP_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => loadPreset(preset)}
                className="px-2.5 py-1.5 text-xs font-medium bg-white dark:bg-zinc-800/90 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-zinc-700 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 border border-zinc-200 dark:border-zinc-700/80 hover:border-amber-400 dark:hover:border-amber-500/50 rounded-lg transition-all shadow-sm flex items-center gap-1.5"
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

      {/* Center Winner Banner */}
      <div className={`p-4 sm:p-5 rounded-2xl border transition-all shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
        result.winner === "etsy"
          ? "bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-amber-500/5 border-amber-500/40"
          : result.winner === "kdp"
          ? "bg-gradient-to-r from-indigo-500/20 via-purple-500/10 to-indigo-500/5 border-indigo-500/40"
          : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-sm flex-shrink-0 ${
            result.winner === "etsy" ? "bg-amber-500" : result.winner === "kdp" ? "bg-indigo-600" : "bg-zinc-500"
          }`}>
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Platform Profit Winner:
              </span>
              <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                result.winner === "etsy"
                  ? "bg-amber-500/20 text-amber-800 dark:text-amber-300"
                  : result.winner === "kdp"
                  ? "bg-indigo-500/20 text-indigo-800 dark:text-indigo-300"
                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
              }`}>
                {result.winner === "etsy" ? "ETSY WINS" : result.winner === "kdp" ? "AMAZON KDP WINS" : "TIED PROFIT"}
              </span>
            </div>
            <p className="text-sm font-extrabold text-zinc-900 dark:text-white mt-0.5">
              {result.summaryHeadline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <div className="text-right">
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 block font-semibold">Monthly Advantage</span>
            <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
              +{formatMoney(result.monthlyProfitDifference)}/mo
            </span>
          </div>
        </div>
      </div>

      {/* Input Controls: Universal + Etsy vs KDP Settings (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card 1: Universal Product Inputs */}
        <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3.5">
          <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Universal Pricing
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Retail List Price ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">$</span>
              <input
                type="number"
                step="0.50"
                value={retailPrice}
                onChange={(e) => setRetailPrice(e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="14.99"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Etsy Item Base COGS ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">$</span>
              <input
                type="number"
                step="0.50"
                value={itemCogs}
                onChange={(e) => setItemCogs(e.target.value)}
                className="w-full pl-7 pr-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="5.50"
              />
            </div>
            <p className="text-[10px] text-zinc-400 mt-0.5">Printify/Lulu or raw item manufacturing cost</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Monthly Sales Volume
            </label>
            <input
              type="number"
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(e.target.value)}
              className="w-full px-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="150"
            />
          </div>
        </div>

        {/* Card 2: Etsy Specific Parameters */}
        <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 border border-amber-200 dark:border-amber-900/40 shadow-sm space-y-3.5">
          <div className="flex items-center gap-2 border-b border-amber-100 dark:border-amber-900/30 pb-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-amber-900 dark:text-amber-300">
              Etsy Parameters
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Seller Location (Processing Fee)
            </label>
            <div className="relative">
              <select
                value={countryPreset}
                aria-label="Seller Location"
                onChange={(e) => handleCountryPresetChange(e.target.value)}
                className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-2.5 py-2 pr-7 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                <option value="usa">USA (3% + $0.25)</option>
                <option value="uk">UK (4% + £0.20)</option>
                <option value="eu">EU (4% + €0.30)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Etsy Offsite Ads
            </label>
            <div className="relative">
              <select
                value={offsiteAdsRate}
                aria-label="Etsy Offsite Ads"
                onChange={(e) => setOffsiteAdsRate(parseFloat(e.target.value))}
                className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-2.5 py-2 pr-7 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                <option value={0}>Opted Out / Organic (0%)</option>
                <option value={0.15}>Standard Store (15%)</option>
                <option value={0.12}>Top Seller Tier (12%)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                Ship Charged
              </label>
              <input
                type="number"
                step="0.50"
                value={shippingCharged}
                onChange={(e) => setShippingCharged(e.target.value)}
                className="w-full px-2 py-1.5 text-xs font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white"
                placeholder="3.99"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                Actual Ship Cost
              </label>
              <input
                type="number"
                step="0.50"
                value={actualShippingCost}
                onChange={(e) => setActualShippingCost(e.target.value)}
                className="w-full px-2 py-1.5 text-xs font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg text-zinc-900 dark:text-white"
                placeholder="3.99"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Amazon KDP Specific Parameters */}
        <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 border border-indigo-200 dark:border-indigo-900/40 shadow-sm space-y-3.5">
          <div className="flex items-center gap-2 border-b border-indigo-100 dark:border-indigo-900/30 pb-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-300">
              Amazon KDP Specs
            </h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Binding & Royalty Tier
            </label>
            <div className="relative">
              <select
                value={`${format}_${distribution}`}
                aria-label="Binding & Royalty Tier"
                onChange={(e) => {
                  const [fmt, dist] = e.target.value.split("_");
                  setFormat(fmt as BookFormat);
                  setDistribution(dist as "amazon_60" | "expanded_40");
                }}
                className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-2.5 py-2 pr-7 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="paperback_amazon_60">Paperback — Amazon Direct (60%)</option>
                <option value="paperback_expanded_40">Paperback — Expanded Dist (40%)</option>
                <option value="hardcover_amazon_60">Hardcover — Amazon Direct (60%)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Interior Ink / Paper
            </label>
            <div className="relative">
              <select
                value={interiorType}
                aria-label="Interior Ink / Paper"
                onChange={(e) => setInteriorType(e.target.value as InteriorType)}
                className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-2.5 py-2 pr-7 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                <option value="bw_cream">Black & White (Cream Paper)</option>
                <option value="bw_white">Black & White (White Paper)</option>
                <option value="std_color">Standard Color (White Paper)</option>
                <option value="premium_color">Premium Color (White Paper)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1 flex items-center justify-between">
              <span>Page Count</span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
                Print: {formatMoney(result.kdp.productionOrShippingCost)}
              </span>
            </label>
            <input
              type="number"
              value={pageCount}
              onChange={(e) => setPageCount(e.target.value)}
              className="w-full px-3 py-2 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="120"
            />
          </div>
        </div>

      </div>

      {/* Side-by-Side Comparative Results (Twin Column) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Etsy Results */}
        <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-amber-300 dark:border-amber-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-amber-100 dark:border-amber-900/30 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-zinc-900 dark:text-white">
                  Etsy Store
                </h3>
                <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold">
                  6.5% + Listing + Processing
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 block font-semibold">Net Unit Profit</span>
              <span className="text-xl font-black text-amber-600 dark:text-amber-400">
                {formatMoney(result.etsy.netProfitPerUnit)}
              </span>
            </div>
          </div>

          {/* Revenue Split Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-zinc-600 dark:text-zinc-400">Revenue Split</span>
              <span className="text-amber-600 dark:text-amber-400">{result.etsy.profitMarginPercent.toFixed(1)}% Margin</span>
            </div>
            <div className="h-3.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex p-0.5 gap-0.5">
              <div style={{ width: `${etsyProfitPct}%` }} className="h-full bg-amber-500 rounded-l-full" title={`Profit: ${formatMoney(result.etsy.netProfitPerUnit)}`} />
              <div style={{ width: `${etsyFeePct}%` }} className="h-full bg-rose-400" title={`Etsy Fees: ${formatMoney(result.etsy.platformFees)}`} />
              <div style={{ width: `${etsyCostPct}%` }} className="h-full bg-zinc-400 rounded-r-full" title={`COGS/Ship: ${formatMoney(result.etsy.productionOrShippingCost)}`} />
            </div>
          </div>

          {/* Line items */}
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs font-medium space-y-1">
            <div className="pt-1.5 flex justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">Gross Revenue (Price + Ship)</span>
              <span className="font-bold text-zinc-900 dark:text-white">{formatMoney(result.etsy.grossRevenue)}</span>
            </div>
            <div className="pt-1.5 flex justify-between text-rose-600 dark:text-rose-400">
              <span>Total Etsy Platform Fees</span>
              <span className="font-bold">-{formatMoney(result.etsy.platformFees)}</span>
            </div>
            <div className="pt-1.5 flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>Item COGS & Actual Shipping</span>
              <span className="font-bold">-{formatMoney(result.etsy.productionOrShippingCost)}</span>
            </div>
            <div className="pt-2 flex justify-between font-black text-sm text-amber-600 dark:text-amber-400">
              <span>Monthly Total Profit ({inputs.monthlyVolume} units)</span>
              <span>{formatMoney(result.etsy.monthlyTotalProfit)}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Amazon KDP Results */}
        <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-indigo-300 dark:border-indigo-800/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-900/30 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-zinc-900 dark:text-white">
                  Amazon KDP
                </h3>
                <span className="text-xs text-indigo-700 dark:text-indigo-400 font-semibold">
                  60% Royalty - Print Cost
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 block font-semibold">Net Unit Royalty</span>
              <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                {formatMoney(result.kdp.netProfitPerUnit)}
              </span>
            </div>
          </div>

          {/* Revenue Split Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-zinc-600 dark:text-zinc-400">Revenue Split</span>
              <span className="text-indigo-600 dark:text-indigo-400">{result.kdp.profitMarginPercent.toFixed(1)}% Margin</span>
            </div>
            <div className="h-3.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex p-0.5 gap-0.5">
              <div style={{ width: `${kdpProfitPct}%` }} className="h-full bg-indigo-500 rounded-l-full" title={`Royalty: ${formatMoney(result.kdp.netProfitPerUnit)}`} />
              <div style={{ width: `${kdpFeePct}%` }} className="h-full bg-purple-400" title={`Amazon Cut: ${formatMoney(result.kdp.platformFees)}`} />
              <div style={{ width: `${kdpCostPct}%` }} className="h-full bg-zinc-400 rounded-r-full" title={`Print Cost: ${formatMoney(result.kdp.productionOrShippingCost)}`} />
            </div>
          </div>

          {/* Line items */}
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs font-medium space-y-1">
            <div className="pt-1.5 flex justify-between">
              <span className="text-zinc-500 dark:text-zinc-400">Retail List Price</span>
              <span className="font-bold text-zinc-900 dark:text-white">{formatMoney(result.kdp.grossRevenue)}</span>
            </div>
            <div className="pt-1.5 flex justify-between text-purple-600 dark:text-purple-400">
              <span>Amazon Retail Commission ({distribution === "expanded_40" ? "60%" : "40%"})</span>
              <span className="font-bold">-{formatMoney(result.kdp.platformFees)}</span>
            </div>
            <div className="pt-1.5 flex justify-between text-zinc-600 dark:text-zinc-400">
              <span>KDP Print-on-Demand Cost</span>
              <span className="font-bold">-{formatMoney(result.kdp.productionOrShippingCost)}</span>
            </div>
            <div className="pt-2 flex justify-between font-black text-sm text-indigo-600 dark:text-indigo-400">
              <span>Monthly Total Profit ({inputs.monthlyVolume} units)</span>
              <span>{formatMoney(result.kdp.monthlyTotalProfit)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Monthly Sales Volume Projections Table */}
      <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
          Side-by-Side Monthly Volume Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-100 dark:bg-zinc-800 text-[10px] text-zinc-500 dark:text-zinc-400 uppercase">
              <tr>
                <th className="p-2 rounded-l-lg">Monthly Volume</th>
                <th className="p-2 text-amber-700 dark:text-amber-300">Etsy Monthly Profit</th>
                <th className="p-2 text-indigo-700 dark:text-indigo-300">KDP Monthly Royalty</th>
                <th className="p-2 text-right rounded-r-lg">Platform Edge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60 font-medium">
              {[50, 150, 300, 500, 1000].map((vol) => {
                const eProfit = result.etsy.netProfitPerUnit * vol;
                const kProfit = result.kdp.netProfitPerUnit * vol;
                const diff = Math.abs(eProfit - kProfit);
                const win = eProfit > kProfit ? "Etsy" : kProfit > eProfit ? "KDP" : "Tied";
                return (
                  <tr key={vol} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="p-2 font-bold text-zinc-900 dark:text-white">{vol} sales/mo</td>
                    <td className="p-2 font-bold text-amber-600 dark:text-amber-400">{formatMoney(eProfit)}</td>
                    <td className="p-2 font-bold text-indigo-600 dark:text-indigo-400">{formatMoney(kProfit)}</td>
                    <td className="p-2 text-right font-black text-emerald-600 dark:text-emerald-400">
                      +{formatMoney(diff)} ({win})
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          type="button"
          onClick={handleCopySummary}
          className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-600 dark:text-emerald-400">Copied Comparison!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-zinc-500" />
              <span>Copy Comparison Summary</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isPdfGenerating}
          className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
        >
          <Download className={`w-4 h-4 text-zinc-500 ${isPdfGenerating ? "animate-bounce" : ""}`} />
          <span>{isPdfGenerating ? "Generating..." : "Download PDF Report"}</span>
        </button>

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
              <span>Share Scenario</span>
            </>
          )}
        </button>
      </div>

      {/* Mathematical Breakdown Accordion */}
      <ExplainResultAccordion steps={explanationSteps} />
    </div>
  );
}
