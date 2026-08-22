"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  calculatePakistanPropertyTax,
  getPakistanPropertyTaxExplanationSteps,
  formatPkrLakhCrore,
  PROPERTY_PRESETS,
  PROVINCE_NAMES,
  PROPERTY_TYPE_NAMES,
  PropertyTaxInputs,
  PropertyTaxResult,
  PakistanProvince,
  PropertyType,
  FilerStatus,
  HoldingPeriod,
} from "@/lib/calculators/pakistanPropertyTaxCalculator";
import { generatePdfAsync } from "@/lib/utils/downloadPdf";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import {
  RotateCcw,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  Building2,
  Receipt,
  Layers,
} from "lucide-react";

export default function PakistanPropertyTaxWidget() {
  // Main Inputs
  const [province, setProvince] = useState<PakistanProvince>("punjab");
  const [propertyType, setPropertyType] = useState<PropertyType>("residential_plot");
  const [declaredPrice, setDeclaredPrice] = useState<string>("15000000"); // 1.50 Crore default
  const [fbrRate, setFbrRate] = useState<string>("13500000"); // 1.35 Crore default
  const [buyerStatus, setBuyerStatus] = useState<FilerStatus>("filer");
  const [sellerStatus, setSellerStatus] = useState<FilerStatus>("filer");
  const [holdingPeriod, setHoldingPeriod] = useState<HoldingPeriod>("1_to_2_years");

  // UI states
  const [copied, setCopied] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  // Sync state from URL parameters
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const qProv = params.get("prov") as PakistanProvince | null;
      const qType = params.get("type") as PropertyType | null;
      const qPrice = params.get("price");
      const qFbr = params.get("fbr");
      const qBuyer = params.get("buyer") as FilerStatus | null;
      const qSeller = params.get("seller") as FilerStatus | null;
      const qHold = params.get("hold") as HoldingPeriod | null;

      if (qProv && Object.keys(PROVINCE_NAMES).includes(qProv)) setProvince(qProv);
      if (qType && Object.keys(PROPERTY_TYPE_NAMES).includes(qType)) setPropertyType(qType);
      if (qPrice) setDeclaredPrice(qPrice);
      if (qFbr) setFbrRate(qFbr);
      if (qBuyer && ["filer", "late_filer", "non_filer"].includes(qBuyer)) setBuyerStatus(qBuyer);
      if (qSeller && ["filer", "late_filer", "non_filer"].includes(qSeller)) setSellerStatus(qSeller);
      if (qHold) setHoldingPeriod(qHold);
    } catch {
      // ignore
    }
  }, []);

  const parsedDeclaredPrice = useMemo(() => Math.max(100000, parseFloat(declaredPrice) || 100000), [declaredPrice]);
  const parsedFbrRate = useMemo(() => Math.max(0, parseFloat(fbrRate) || 0), [fbrRate]);

  const inputs: PropertyTaxInputs = useMemo(
    () => ({
      province,
      propertyType,
      declaredPrice: parsedDeclaredPrice,
      fbrRate: parsedFbrRate,
      buyerStatus,
      sellerStatus,
      holdingPeriod,
    }),
    [province, propertyType, parsedDeclaredPrice, parsedFbrRate, buyerStatus, sellerStatus, holdingPeriod]
  );

  const result: PropertyTaxResult = useMemo(
    () => calculatePakistanPropertyTax(inputs),
    [inputs]
  );

  const explanationSteps = useMemo(
    () => getPakistanPropertyTaxExplanationSteps(inputs, result),
    [inputs, result]
  );

  // Preset loader
  const loadPreset = (preset: typeof PROPERTY_PRESETS[0]) => {
    if (preset.inputs.province) setProvince(preset.inputs.province);
    if (preset.inputs.propertyType) setPropertyType(preset.inputs.propertyType);
    if (preset.inputs.declaredPrice !== undefined) setDeclaredPrice(preset.inputs.declaredPrice.toString());
    if (preset.inputs.fbrRate !== undefined) setFbrRate(preset.inputs.fbrRate.toString());
    if (preset.inputs.buyerStatus) setBuyerStatus(preset.inputs.buyerStatus);
    if (preset.inputs.sellerStatus) setSellerStatus(preset.inputs.sellerStatus);
    if (preset.inputs.holdingPeriod) setHoldingPeriod(preset.inputs.holdingPeriod);
  };

  // Reset
  const handleReset = () => {
    setProvince("punjab");
    setPropertyType("residential_plot");
    setDeclaredPrice("15000000");
    setFbrRate("13500000");
    setBuyerStatus("filer");
    setSellerStatus("filer");
    setHoldingPeriod("1_to_2_years");
  };

  // Copy Tax Statement
  const handleCopyStatement = async () => {
    const b = result.buyer;
    const s = result.seller;
    const summaryText = `
=== QuickCalc: Pakistan Property Transfer Tax Invoice (FY 2026-2027) ===
Property Type: ${result.propertyTypeName} | Jurisdiction: ${result.provinceName}
Declared Market Price: PKR ${result.declaredPrice.toLocaleString()} (${formatPkrLakhCrore(result.declaredPrice)})
FBR Valuation Rate: PKR ${result.fbrRate.toLocaleString()} (${formatPkrLakhCrore(result.fbrRate)})
Taxable Valuation Base: PKR ${result.taxableBase.toLocaleString()} (${formatPkrLakhCrore(result.taxableBase)})

-- BUYER (TRANSFEREE) EXPENSES [Status: ${buyerStatus.toUpperCase()}] --
• FBR Advance Tax u/s 236K (${b.section236KRate}%): PKR ${b.section236KAmount.toLocaleString()}
• Provincial Stamp Duty (${b.stampDutyRate}%): PKR ${b.stampDutyAmount.toLocaleString()}
• Local Govt / TMA Tax (${b.localGovtTaxRate}%): PKR ${b.localGovtTaxAmount.toLocaleString()}
• Capital Value Tax (CVT ${b.cvtRate}%): PKR ${b.cvtAmount.toLocaleString()}
• Mutation & Registration Fee: PKR ${b.mutationFee.toLocaleString()}
>> TOTAL BUYER TAXES & CHARGES: PKR ${b.totalBuyerTaxes.toLocaleString()} (Effective: ${b.effectiveBuyerRate}%)
>> TOTAL BUYER OUT-OF-POCKET EXPENSE: PKR ${b.totalBuyerCost.toLocaleString()}

-- SELLER (TRANSFEROR) DEDUCTIONS [Status: ${sellerStatus.toUpperCase()}] --
• FBR Advance Gain Tax u/s 236C (${s.section236CRate}%): PKR ${s.section236CAmount.toLocaleString()}
>> NET CASH PROCEEDS RECEIVED BY SELLER: PKR ${s.netSellerProceeds.toLocaleString()}

-- NON-FILER PENALTY SUMMARY --
Non-Filer Surcharge Penalty: ${result.nonFilerPenalty.penaltyInLakhsCrores} (Extra Tax: PKR ${result.nonFilerPenalty.totalPenaltyWasted.toLocaleString()})
Grand Total Government Revenue: PKR ${result.totalGovtRevenue.toLocaleString()}

Calculated at: https://quickcalc.cloud/tools/pakistan-property-tax-calculator
`.trim();

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Share scenario link
  const handleShareScenario = async () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + "/tools/pakistan-property-tax-calculator");
    url.searchParams.set("prov", province);
    url.searchParams.set("type", propertyType);
    url.searchParams.set("price", parsedDeclaredPrice.toString());
    url.searchParams.set("fbr", parsedFbrRate.toString());
    url.searchParams.set("buyer", buyerStatus);
    url.searchParams.set("seller", sellerStatus);
    url.searchParams.set("hold", holdingPeriod);

    try {
      await navigator.clipboard.writeText(url.toString());
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Download PDF Property Transfer Invoice
  const handleDownloadPdf = async () => {
    setIsPdfGenerating(true);
    try {
      const b = result.buyer;
      const s = result.seller;
      const rows = [
        ["Buyer: Section 236K Advance Tax", `${b.section236KRate}%`, `PKR ${b.section236KAmount.toLocaleString()}`],
        ["Buyer: Provincial Stamp Duty", `${b.stampDutyRate}%`, `PKR ${b.stampDutyAmount.toLocaleString()}`],
        ["Buyer: Local Govt / TMA Corporation Fee", `${b.localGovtTaxRate}%`, `PKR ${b.localGovtTaxAmount.toLocaleString()}`],
        ["Buyer: Capital Value Tax (CVT)", `${b.cvtRate}%`, `PKR ${b.cvtAmount.toLocaleString()}`],
        ["Buyer: Mutation / Registry (Intiqal) Fee", "Fixed + 0.5%", `PKR ${b.mutationFee.toLocaleString()}`],
        ["Seller: Section 236C Advance Gain Tax", `${s.section236CRate}%`, `PKR ${s.section236CAmount.toLocaleString()}`],
      ];

      await generatePdfAsync({
        toolName: "Pakistan Property Transfer Tax Invoice (2026-2027)",
        toolSlug: "pakistan-property-tax-calculator",
        inputs: [
          { label: "Jurisdiction / Province", value: result.provinceName },
          { label: "Property Classification", value: result.propertyTypeName },
          { label: "Declared Transaction Price", value: `${formatPkrLakhCrore(result.declaredPrice)} (PKR ${result.declaredPrice.toLocaleString()})` },
          { label: "FBR DC Valuation Rate", value: `${formatPkrLakhCrore(result.fbrRate)} (PKR ${result.fbrRate.toLocaleString()})` },
          { label: "Taxable Valuation Base", value: `${formatPkrLakhCrore(result.taxableBase)} (PKR ${result.taxableBase.toLocaleString()})` },
          { label: "Buyer Tax Status", value: buyerStatus === "filer" ? "Active Filer (3%)" : buyerStatus === "late_filer" ? "Late Filer (6%)" : "Non-Filer (12%-15%)" },
          { label: "Seller Tax Status", value: sellerStatus === "filer" ? "Active Filer (3%)" : sellerStatus === "late_filer" ? "Late Filer (6%)" : "Non-Filer (10%-15%)" },
        ],
        results: [
          { label: "Total Buyer Taxes & Charges", value: `PKR ${b.totalBuyerTaxes.toLocaleString()}`, isHighlight: true },
          { label: "Total Buyer Out-of-Pocket Cost", value: `PKR ${b.totalBuyerCost.toLocaleString()}`, isHighlight: true },
          { label: "Seller Net Proceeds", value: `PKR ${s.netSellerProceeds.toLocaleString()}` },
          { label: "Seller Section 236C Tax", value: `PKR ${s.section236CAmount.toLocaleString()}` },
          { label: "Non-Filer Surcharge Penalty Wasted", value: result.nonFilerPenalty.penaltyInLakhsCrores },
          { label: "Total Government Revenue Generated", value: `PKR ${result.totalGovtRevenue.toLocaleString()}` },
        ],
        summaryNote: `Official Federal Board of Revenue (FBR) and Provincial Board of Revenue real estate transfer calculation. For a ${result.propertyTypeName} valued at ${formatPkrLakhCrore(result.taxableBase)} in ${result.provinceName}, the buyer incurs PKR ${b.totalBuyerTaxes.toLocaleString()} in registration and advance taxes (effective rate ${b.effectiveBuyerRate}%), while the seller is subject to PKR ${s.section236CAmount.toLocaleString()} in Section 236C withholding tax.`,
        table: {
          title: "Itemized Transfer Taxes and Registration Fees",
          headers: ["Tax / Fee Description", "Statutory Rate", "Amount (PKR)"],
          rows,
        },
      });
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  // Compute filer vs non-filer comparative bars
  const filerTotalBuyerTax = Math.round(result.taxableBase * (0.03 + (result.buyer.stampDutyRate / 100) + 0.01 + (result.buyer.cvtRate / 100) + 0.005) + 2000);
  const nonFilerTotalBuyerTax = Math.round(result.taxableBase * ((result.taxableBase > 50000000 ? 0.15 : 0.12) + (result.buyer.stampDutyRate / 100) + 0.01 + (result.buyer.cvtRate / 100) + 0.005) + 2000);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Real Estate Scenario Presets */}
      <div className="bg-zinc-100/80 dark:bg-zinc-900/60 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Property Valuation Presets:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {PROPERTY_PRESETS.map((preset) => (
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
              title="Reset all fields to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: 2 Input Cards (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Card 1: Location & Property Values */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  1. Property Location & Valuation
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Provincial jurisdiction, plot type & valuation base
                </p>
              </div>
            </div>

            {/* Province Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Province / Jurisdiction
                </label>
                <div className="relative">
                  <select
                    value={province}
                    aria-label="Province / Jurisdiction"
                    onChange={(e) => setProvince(e.target.value as PakistanProvince)}
                    className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {Object.entries(PROVINCE_NAMES).map(([key, name]) => (
                      <option key={key} value={key}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Property Classification
                </label>
                <div className="relative">
                  <select
                    value={propertyType}
                    aria-label="Property Classification"
                    onChange={(e) => setPropertyType(e.target.value as PropertyType)}
                    className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {Object.entries(PROPERTY_TYPE_NAMES).map(([key, name]) => (
                      <option key={key} value={key}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Declared Market Sale Price */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Declared Market Sale Price (PKR)
                </label>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {formatPkrLakhCrore(parsedDeclaredPrice)}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">PKR</span>
                <input
                  type="number"
                  step="100000"
                  min="100000"
                  value={declaredPrice}
                  onChange={(e) => setDeclaredPrice(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="15000000"
                />
              </div>
            </div>

            {/* Official FBR / DC Valuation Rate */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Official FBR Valuation / DC Rate (PKR)
                </label>
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  {formatPkrLakhCrore(parsedFbrRate)}
                </span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">PKR</span>
                <input
                  type="number"
                  step="100000"
                  min="0"
                  value={fbrRate}
                  onChange={(e) => setFbrRate(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="13500000"
                />
              </div>

              {/* Taxable Base Notice */}
              <div className="mt-2 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 flex items-center justify-between">
                <span>Tax Base: <strong>{formatPkrLakhCrore(result.taxableBase)}</strong></span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-bold">
                  {result.isFbrHigher ? "FBR Value Used" : "Market Price Used"}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Buyer & Seller Filer Status */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  2. Buyer & Seller Tax Status
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Active Filer, Late Filer, or Non-Filer status
                </p>
              </div>
            </div>

            {/* Buyer Filer Status Tabs */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Buyer Tax Status (Section 236K)
                </label>
                <span className="text-[10px] text-zinc-400">Transferee</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setBuyerStatus("filer")}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    buyerStatus === "filer"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className="font-bold">Active Filer</div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">3% Tax</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBuyerStatus("late_filer")}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    buyerStatus === "late_filer"
                      ? "bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-200 font-bold ring-1 ring-amber-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className="font-bold">Late Filer</div>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">6% Tax</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBuyerStatus("non_filer")}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    buyerStatus === "non_filer"
                      ? "bg-rose-500/10 border-rose-500 text-rose-900 dark:text-rose-200 font-bold ring-1 ring-rose-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className="font-bold">Non-Filer</div>
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">12% - 15%</span>
                </button>
              </div>
            </div>

            {/* Seller Filer Status Tabs */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Seller Tax Status (Section 236C)
                </label>
                <span className="text-[10px] text-zinc-400">Transferor</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSellerStatus("filer")}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    sellerStatus === "filer"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className="font-bold">Active Filer</div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">3% Tax</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSellerStatus("late_filer")}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    sellerStatus === "late_filer"
                      ? "bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-200 font-bold ring-1 ring-amber-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className="font-bold">Late Filer</div>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">6% Tax</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSellerStatus("non_filer")}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    sellerStatus === "non_filer"
                      ? "bg-rose-500/10 border-rose-500 text-rose-900 dark:text-rose-200 font-bold ring-1 ring-rose-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className="font-bold">Non-Filer</div>
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">10% - 15%</span>
                </button>
              </div>
            </div>

            {/* Seller Holding Period */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Property Holding Period (Seller)
              </label>
              <div className="relative">
                <select
                  value={holdingPeriod}
                  aria-label="Property Holding Period"
                  onChange={(e) => setHoldingPeriod(e.target.value as HoldingPeriod)}
                  className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="under_1_year">Under 1 Year (Standard Rate)</option>
                  <option value="1_to_2_years">1 to 2 Years</option>
                  <option value="2_to_3_years">2 to 3 Years</option>
                  <option value="3_to_6_years">3 to 6 Years</option>
                  <option value="over_6_years">6+ Years (Concessionary 1.5% Filer Rate)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Calculated Statement & Comparison (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Primary 3-Metric Highlight Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Total Buyer Taxes & Charges */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-teal-500/10 border-emerald-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Total Buyer Taxes & Fees
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  {result.buyer.effectiveBuyerRate}% Effective
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
                PKR {result.buyer.totalBuyerTaxes.toLocaleString()}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Total Buyer Out-of-Pocket: <strong>PKR {result.buyer.totalBuyerCost.toLocaleString()}</strong> ({formatPkrLakhCrore(result.buyer.totalBuyerCost)})
              </div>
            </div>

            {/* Seller Net Cash Proceeds */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-indigo-500/15 via-indigo-500/5 to-blue-500/10 border-indigo-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400 block mb-1">
                Seller Net Cash
              </span>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-indigo-600 dark:text-indigo-400">
                {formatPkrLakhCrore(result.seller.netSellerProceeds)}
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                Tax: PKR {result.seller.section236CAmount.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Non-Filer Penalty Alert Box */}
          {result.nonFilerPenalty.totalPenaltyWasted > 0 ? (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-zinc-900 dark:text-zinc-100 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Non-Filer Surcharge Penalty Alert</span>
                </div>
                <span className="text-xs font-black text-rose-600 dark:text-rose-400">
                  +{result.nonFilerPenalty.penaltyInLakhsCrores} Extra
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                By maintaining Non-Filer status, you are paying <strong>PKR {result.nonFilerPenalty.totalPenaltyWasted.toLocaleString()}</strong> in extra punitive government taxes compared to an Active Tax Filer on this single property transaction.
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong>Maximum Tax Savings:</strong> Both Buyer and Seller qualify for lowest 3% Active Filer rates. Zero non-filer surcharge incurred!</span>
            </div>
          )}

          {/* Filer vs Non-Filer Visual Comparison Bar */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-zinc-900 dark:text-white uppercase tracking-wider">
                Buyer Transfer Tax: Filer vs. Non-Filer
              </span>
              <span className="text-zinc-500">Tax Base: {formatPkrLakhCrore(result.taxableBase)}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mb-1">
                  <span>Active Filer Cost (3% WHT + Provincial)</span>
                  <span>PKR {filerTotalBuyerTax.toLocaleString()}</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, Math.round((filerTotalBuyerTax / nonFilerTotalBuyerTax) * 100))}%` }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-rose-700 dark:text-rose-400 mb-1">
                  <span>Non-Filer Cost (12%-15% WHT + Provincial)</span>
                  <span>PKR {nonFilerTotalBuyerTax.toLocaleString()}</span>
                </div>
                <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Transfer Tax Statement */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden text-xs">
            <div className="p-4 bg-zinc-50/80 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>Itemized Tax Invoice Breakdown</span>
              </h3>
              <span className="text-[11px] text-zinc-500 font-medium">FY 2026-2027</span>
            </div>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {/* Buyer 236K */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">Buyer FBR Advance Tax (Section 236K)</span>
                  <span className="text-[10px] text-zinc-400 block">
                    {buyerStatus.toUpperCase()} @ {result.buyer.section236KRate}% of Tax Base
                  </span>
                </div>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  PKR {result.buyer.section236KAmount.toLocaleString()}
                </span>
              </div>

              {/* Stamp Duty */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">Provincial Stamp Duty (e-Stamp)</span>
                  <span className="text-[10px] text-zinc-400 block">
                    {result.provinceName} @ {result.buyer.stampDutyRate}%
                  </span>
                </div>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  PKR {result.buyer.stampDutyAmount.toLocaleString()}
                </span>
              </div>

              {/* Local Govt / TMA Tax */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">Local Govt / TMA Corporation Fee</span>
                  <span className="text-[10px] text-zinc-400 block">Municipal transfer fee (1%)</span>
                </div>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  PKR {result.buyer.localGovtTaxAmount.toLocaleString()}
                </span>
              </div>

              {/* CVT */}
              {result.buyer.cvtAmount > 0 && (
                <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-white">Capital Value Tax (CVT)</span>
                    <span className="text-[10px] text-zinc-400 block">{result.buyer.cvtRate}% on commercial/capital valuation</span>
                  </div>
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">
                    PKR {result.buyer.cvtAmount.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Mutation Fee */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">Mutation / Registration (Intiqal) Fee</span>
                  <span className="text-[10px] text-zinc-400 block">Sub-Registrar / Land Revenue record fee</span>
                </div>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  PKR {result.buyer.mutationFee.toLocaleString()}
                </span>
              </div>

              {/* Seller 236C */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">Seller FBR Advance Gain Tax (Section 236C)</span>
                  <span className="text-[10px] text-zinc-400 block">
                    {sellerStatus.toUpperCase()} @ {result.seller.section236CRate}% (Deducted from Seller Proceeds)
                  </span>
                </div>
                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  -PKR {result.seller.section236CAmount.toLocaleString()}
                </span>
              </div>

              {/* Grand Total Govt Revenue */}
              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-800/80 flex items-center justify-between font-bold text-sm">
                <span className="text-zinc-900 dark:text-white">Total Government Taxes & Fees</span>
                <span className="font-mono text-base font-black text-emerald-600 dark:text-emerald-400">
                  PKR {result.totalGovtRevenue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={handleCopyStatement}
              className="py-2.5 px-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied Invoice!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-500" />
                  <span>Copy Tax Invoice</span>
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
              <span>{isPdfGenerating ? "Generating..." : "Download PDF Invoice"}</span>
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

        </div>
      </div>

      {/* Step-by-Step Mathematical Explanation */}
      <ExplainResultAccordion steps={explanationSteps} />
    </div>
  );
}
