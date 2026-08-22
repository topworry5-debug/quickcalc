"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  calculatePakistanVehicleTax,
  getPakistanVehicleTaxExplanationSteps,
  VEHICLE_PRESETS,
  EXCISE_PROVINCE_NAMES,
  VehicleTaxInputs,
  VehicleTaxBreakdown,
  PakistanExciseProvince,
  VehicleTransactionType,
  VehicleCategory,
  VehicleTaxpayerStatus,
  PaymentPeriod,
} from "@/lib/calculators/pakistanVehicleTaxCalculator";
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
  Car,
  Receipt,
  Layers,
} from "lucide-react";

export default function PakistanVehicleTaxWidget() {
  // Inputs
  const [province, setProvince] = useState<PakistanExciseProvince>("punjab");
  const [transactionType, setTransactionType] = useState<VehicleTransactionType>("annual_token");
  const [category, setCategory] = useState<VehicleCategory>("car");
  const [engineCc, setEngineCc] = useState<string>("1329");
  const [modelYear, setModelYear] = useState<string>("2023");
  const [taxpayerStatus, setTaxpayerStatus] = useState<VehicleTaxpayerStatus>("filer");
  const [invoiceValue, setInvoiceValue] = useState<string>("4700000");
  const [paymentPeriod, setPaymentPeriod] = useState<PaymentPeriod>("1_year");

  // UI state
  const [copied, setCopied] = useState<boolean>(false);
  const [shareCopied, setShareCopied] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState<boolean>(false);

  // Sync with URL params
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const qProv = params.get("prov") as PakistanExciseProvince | null;
      const qType = params.get("type") as VehicleTransactionType | null;
      const qCat = params.get("cat") as VehicleCategory | null;
      const qCc = params.get("cc");
      const qYear = params.get("year");
      const qStatus = params.get("status") as VehicleTaxpayerStatus | null;
      const qVal = params.get("val");
      const qPeriod = params.get("period") as PaymentPeriod | null;

      if (qProv && Object.keys(EXCISE_PROVINCE_NAMES).includes(qProv)) setProvince(qProv);
      if (qType && ["annual_token", "new_registration"].includes(qType)) setTransactionType(qType);
      if (qCat && ["car", "commercial", "bike"].includes(qCat)) setCategory(qCat);
      if (qCc) setEngineCc(qCc);
      if (qYear) setModelYear(qYear);
      if (qStatus && ["filer", "late_filer", "non_filer"].includes(qStatus)) setTaxpayerStatus(qStatus);
      if (qVal) setInvoiceValue(qVal);
      if (qPeriod && ["1_year", "lifetime"].includes(qPeriod)) setPaymentPeriod(qPeriod);
    } catch {
      // ignore
    }
  }, []);

  const parsedCc = useMemo(() => Math.max(50, parseFloat(engineCc) || 1300), [engineCc]);
  const parsedYear = useMemo(() => Math.max(1990, parseInt(modelYear) || 2023), [modelYear]);
  const parsedVal = useMemo(() => Math.max(100000, parseFloat(invoiceValue) || 3000000), [invoiceValue]);

  const inputs: VehicleTaxInputs = useMemo(
    () => ({
      province,
      transactionType,
      category,
      engineCc: parsedCc,
      modelYear: parsedYear,
      taxpayerStatus,
      invoiceValue: parsedVal,
      paymentPeriod,
    }),
    [province, transactionType, category, parsedCc, parsedYear, taxpayerStatus, parsedVal, paymentPeriod]
  );

  const result: VehicleTaxBreakdown = useMemo(
    () => calculatePakistanVehicleTax(inputs),
    [inputs]
  );

  const explanationSteps = useMemo(
    () => getPakistanVehicleTaxExplanationSteps(inputs, result),
    [inputs, result]
  );

  // Preset loader
  const loadPreset = (preset: typeof VEHICLE_PRESETS[0]) => {
    if (preset.inputs.province) setProvince(preset.inputs.province);
    if (preset.inputs.transactionType) setTransactionType(preset.inputs.transactionType);
    if (preset.inputs.category) setCategory(preset.inputs.category);
    if (preset.inputs.engineCc !== undefined) setEngineCc(preset.inputs.engineCc.toString());
    if (preset.inputs.modelYear !== undefined) setModelYear(preset.inputs.modelYear.toString());
    if (preset.inputs.taxpayerStatus) setTaxpayerStatus(preset.inputs.taxpayerStatus);
    if (preset.inputs.invoiceValue !== undefined) setInvoiceValue(preset.inputs.invoiceValue.toString());
    if (preset.inputs.paymentPeriod) setPaymentPeriod(preset.inputs.paymentPeriod);
  };

  // Reset
  const handleReset = () => {
    setProvince("punjab");
    setTransactionType("annual_token");
    setCategory("car");
    setEngineCc("1329");
    setModelYear("2023");
    setTaxpayerStatus("filer");
    setInvoiceValue("4700000");
    setPaymentPeriod("1_year");
  };

  // Copy Breakdown
  const handleCopyBreakdown = async () => {
    const summaryText = `
=== QuickCalc: Pakistan Vehicle Tax Invoice (FY 2026-2027) ===
Authority: ${result.provinceName} | Category: ${category.toUpperCase()} | Type: ${transactionType === "annual_token" ? "Annual Token Renewal" : "New Registration"}
Engine Capacity: ${result.engineCc} CC (${result.ccSlabLabel}) | Model: ${modelYear} | Period: ${paymentPeriod === "lifetime" ? "Lifetime Token" : "1 Year"}
Taxpayer Status: ${taxpayerStatus.toUpperCase()} | Invoice Value: PKR ${parsedVal.toLocaleString()}

-- ITEMIZED EXCISE & FBR FEES --
• Base Excise Token Tax: PKR ${result.baseExciseTax.toLocaleString()} ${result.isLifetime ? "(Lifetime Token)" : ""}
• Motor Vehicle Road Tax: PKR ${result.motorVehicleTax.toLocaleString()}
• Professional Tax: PKR ${result.professionalTax.toLocaleString()}
• ${result.fbrSectionCode}: PKR ${result.fbrAdvanceTax.toLocaleString()}
${transactionType === "new_registration" ? `• Registration & Smart Card/Plates: PKR ${(result.registrationFee + result.smartCardPlateFee).toLocaleString()}\n` : ""}
>> TOTAL PAYABLE AMOUNT: PKR ${result.totalPayable.toLocaleString()}
${result.nonFilerPenalty > 0 ? `>> Non-Filer Penalty Wasted: PKR ${result.nonFilerPenalty.toLocaleString()} Extra\n` : ""}

Calculated at: https://quickcalc.cloud/tools/pakistan-vehicle-tax-calculator
`.trim();

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Share link
  const handleShareScenario = async () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.origin + "/tools/pakistan-vehicle-tax-calculator");
    url.searchParams.set("prov", province);
    url.searchParams.set("type", transactionType);
    url.searchParams.set("cat", category);
    url.searchParams.set("cc", parsedCc.toString());
    url.searchParams.set("year", parsedYear.toString());
    url.searchParams.set("status", taxpayerStatus);
    url.searchParams.set("val", parsedVal.toString());
    url.searchParams.set("period", paymentPeriod);

    try {
      await navigator.clipboard.writeText(url.toString());
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  // Download PDF Invoice
  const handleDownloadPdf = async () => {
    setIsPdfGenerating(true);
    try {
      const rows = [
        ["Base Excise Token Tax", result.isLifetime ? "Lifetime Token (<=1000cc)" : result.ccSlabLabel, `PKR ${result.baseExciseTax.toLocaleString()}`],
        ["Motor Vehicle & Professional Tax", "Provincial Excise", `PKR ${(result.motorVehicleTax + result.professionalTax).toLocaleString()}`],
        [result.fbrSectionCode, `${taxpayerStatus.toUpperCase()} Status`, `PKR ${result.fbrAdvanceTax.toLocaleString()}`],
      ];

      if (transactionType === "new_registration") {
        rows.push(["Registration Fee", "Provincial Fee", `PKR ${result.registrationFee.toLocaleString()}`]);
        rows.push(["Smart Card & Number Plate Charges", "Excise Card / Plates", `PKR ${result.smartCardPlateFee.toLocaleString()}`]);
      }

      await generatePdfAsync({
        toolName: "Pakistan Vehicle Tax & Token Invoice (2026-2027)",
        toolSlug: "pakistan-vehicle-tax-calculator",
        inputs: [
          { label: "Excise Authority", value: result.provinceName },
          { label: "Transaction Type", value: transactionType === "annual_token" ? "Annual Token Renewal" : "New Vehicle Registration" },
          { label: "Engine Capacity (CC)", value: `${result.engineCc} CC (${result.ccSlabLabel})` },
          { label: "Vehicle Model Year", value: modelYear },
          { label: "Payment Period", value: paymentPeriod === "lifetime" ? "Lifetime Token" : "1 Year" },
          { label: "Taxpayer Status", value: taxpayerStatus.toUpperCase() },
          { label: "Invoice / Market Value", value: `PKR ${parsedVal.toLocaleString()}` },
        ],
        results: [
          { label: "Total Payable Fee", value: `PKR ${result.totalPayable.toLocaleString()}`, isHighlight: true },
          { label: "Base Excise Token Tax", value: `PKR ${result.baseExciseTax.toLocaleString()}` },
          { label: "FBR Advance WHT", value: `PKR ${result.fbrAdvanceTax.toLocaleString()}` },
          { label: "Non-Filer Surcharge Penalty", value: result.nonFilerPenalty > 0 ? `PKR ${result.nonFilerPenalty.toLocaleString()} Extra` : "Zero Penalty (Active Filer)" },
        ],
        summaryNote: `Official vehicle taxation calculation under ${result.provinceName} schedule and FBR Finance Act. For a ${result.engineCc} CC vehicle (${modelYear} model) owned by a ${taxpayerStatus.toUpperCase()}, the total payable excise and tax liability is PKR ${result.totalPayable.toLocaleString()}.`,
        table: {
          title: "Itemized Excise & Withholding Tax Breakdown",
          headers: ["Fee / Tax Head", "Tax Authority / Rate", "Amount (PKR)"],
          rows,
        },
      });
    } catch (e) {
      console.error("PDF generation failed", e);
    } finally {
      setIsPdfGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Automotive Presets */}
      <div className="bg-zinc-100/80 dark:bg-zinc-900/60 p-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Popular Vehicle Presets:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {VEHICLE_PRESETS.map((preset) => (
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
          
          {/* Card 1: Vehicle & Excise Jurisdiction */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  1. Vehicle & Excise Details
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Provincial authority, category, engine capacity & value
                </p>
              </div>
            </div>

            {/* Category Selector Tabs */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Vehicle Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCategory("car");
                    if (parsedCc < 660) setEngineCc("1329");
                  }}
                  className={`p-2 rounded-xl border text-center text-xs transition-all ${
                    category === "car"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Car / SUV / Jeep
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCategory("bike");
                    setEngineCc("125");
                  }}
                  className={`p-2 rounded-xl border text-center text-xs transition-all ${
                    category === "bike"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Motorbike / Scooter
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCategory("commercial");
                    if (parsedCc < 1500) setEngineCc("2400");
                  }}
                  className={`p-2 rounded-xl border text-center text-xs transition-all ${
                    category === "commercial"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  Commercial
                </button>
              </div>
            </div>

            {/* Province & Transaction Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Excise Authority
                </label>
                <div className="relative">
                  <select
                    value={province}
                    aria-label="Excise Authority"
                    onChange={(e) => setProvince(e.target.value as PakistanExciseProvince)}
                    className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {Object.entries(EXCISE_PROVINCE_NAMES).map(([key, name]) => (
                      <option key={key} value={key}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Calculation Type
                </label>
                <div className="relative">
                  <select
                    value={transactionType}
                    aria-label="Calculation Type"
                    onChange={(e) => setTransactionType(e.target.value as VehicleTransactionType)}
                    className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="annual_token">Annual Token Tax Renewal</option>
                    <option value="new_registration">New Vehicle First Registration</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Engine CC Quick Slabs */}
            {category === "car" && (
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Engine CC Slabs (Quick Select)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {[
                    { label: "Under 1000cc", cc: "660" },
                    { label: "1001-1300cc", cc: "1329" },
                    { label: "1301-1500cc", cc: "1498" },
                    { label: "1501-2000cc", cc: "1798" },
                    { label: "Above 2000cc", cc: "2755" },
                  ].map((slab) => (
                    <button
                      key={slab.label}
                      type="button"
                      onClick={() => setEngineCc(slab.cc)}
                      className={`p-1.5 text-[11px] font-semibold rounded-lg border transition-all ${
                        (slab.label === "Under 1000cc" && parsedCc <= 1000) ||
                        (slab.label === "1001-1300cc" && parsedCc > 1000 && parsedCc <= 1300) ||
                        (slab.label === "1301-1500cc" && parsedCc > 1300 && parsedCc <= 1500) ||
                        (slab.label === "1501-2000cc" && parsedCc > 1500 && parsedCc <= 2000) ||
                        (slab.label === "Above 2000cc" && parsedCc > 2000)
                          ? "bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold"
                          : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {slab.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Exact Engine CC & Invoice Value */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Exact Engine Capacity (CC)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="50"
                    max="8000"
                    step="10"
                    value={engineCc}
                    onChange={(e) => setEngineCc(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="1329"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">CC</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Vehicle Invoice / Price (PKR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">PKR</span>
                  <input
                    type="number"
                    step="50000"
                    min="100000"
                    value={invoiceValue}
                    onChange={(e) => setInvoiceValue(e.target.value)}
                    className="w-full pl-12 pr-3 py-2.5 text-sm font-bold bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="4700000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Tax Filer Status & Vehicle Age */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl p-5 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                  2. Tax Filer Status & Vehicle Age
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  FBR Active Taxpayer status, model year & token payment term
                </p>
              </div>
            </div>

            {/* Taxpayer Status Tabs */}
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Taxpayer Status (Active Taxpayer List)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTaxpayerStatus("filer")}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    taxpayerStatus === "filer"
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className="font-bold">Active Filer</div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Standard Rates</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTaxpayerStatus("late_filer")}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    taxpayerStatus === "late_filer"
                      ? "bg-amber-500/10 border-amber-500 text-amber-900 dark:text-amber-200 font-bold ring-1 ring-amber-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className="font-bold">Late Filer</div>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">2x Surcharge</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTaxpayerStatus("non_filer")}
                  className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                    taxpayerStatus === "non_filer"
                      ? "bg-rose-500/10 border-rose-500 text-rose-900 dark:text-rose-200 font-bold ring-1 ring-rose-500"
                      : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className="font-bold">Non-Filer</div>
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold">3x Surcharge</span>
                </button>
              </div>
            </div>

            {/* Model Year & Payment Period */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Vehicle Model Year
                </label>
                <div className="relative">
                  <select
                    value={modelYear}
                    aria-label="Vehicle Model Year"
                    onChange={(e) => setModelYear(e.target.value)}
                    className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {Array.from({ length: 27 }, (_, i) => 2026 - i).map((yr) => (
                      <option key={yr} value={yr.toString()}>
                        {yr} {yr <= 2016 ? "(10+ Yrs Rebate)" : ""}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Payment Period
                </label>
                <div className="relative">
                  <select
                    value={paymentPeriod}
                    aria-label="Payment Period"
                    onChange={(e) => setPaymentPeriod(e.target.value as PaymentPeriod)}
                    className="w-full text-xs font-semibold bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="1_year">1 Year (Annual Renewal)</option>
                    {parsedCc <= 1000 && (
                      <option value="lifetime">Lifetime Token (≤1000cc Only)</option>
                    )}
                  </select>
                  <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {parsedCc > 1000 && paymentPeriod === "lifetime" && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300">
                Note: Lifetime token tax is statutory only for vehicles up to 1000cc. For 1001cc+ cars, annual token tax applies.
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Calculated Statement (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Primary 3-Metric Highlight Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Grand Total Token Tax Payable */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-teal-500/10 border-emerald-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                  Grand Total Token Tax Payable
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300">
                  {paymentPeriod === "lifetime" ? "Lifetime Token" : "FY 2026-2027"}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-emerald-600 dark:text-emerald-400">
                PKR {result.totalPayable.toLocaleString()}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                {transactionType === "annual_token" ? "All-Inclusive Annual Token & FBR Sec 234" : "New Vehicle Registration & FBR Sec 231B"}
              </div>
            </div>

            {/* Excise Token Base Amount */}
            <div className="p-4 rounded-2xl border bg-gradient-to-br from-blue-500/15 via-blue-500/5 to-indigo-500/10 border-blue-500/30 text-zinc-900 dark:text-zinc-100 shadow-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 block mb-1">
                Base Excise Tax
              </span>
              <div className="text-xl sm:text-2xl font-black tracking-tight text-blue-600 dark:text-blue-400">
                PKR {result.baseExciseTax.toLocaleString()}
              </div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                {result.isLifetime ? "Lifetime Token" : result.ccSlabLabel}
              </div>
            </div>
          </div>

          {/* Non-Filer Penalty Surcharge Alert */}
          {result.nonFilerPenalty > 0 ? (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-zinc-900 dark:text-zinc-100 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Non-Filer Penalty Surcharge</span>
                </div>
                <span className="text-xs font-black text-rose-600 dark:text-rose-400">
                  +PKR {result.nonFilerPenalty.toLocaleString()} Extra Lost
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                You are paying <strong>PKR {result.nonFilerPenalty.toLocaleString()}</strong> in extra punitive FBR withholding taxes because of Non-Filer status on this vehicle. Becoming an active filer saves this entire amount.
              </p>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong>Active Filer Benefit:</strong> You qualify for the lowest statutory withholding tax rates with zero surcharge penalty.</span>
            </div>
          )}

          {/* Interactive Breakdown Table */}
          <div className="bg-white dark:bg-zinc-900/90 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden text-xs">
            <div className="p-4 bg-zinc-50/80 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <h3 className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-emerald-500" />
                <span>Excise Fee & FBR Tax Breakdown</span>
              </h3>
              <span className="text-[11px] text-zinc-500 font-medium">{result.provinceName}</span>
            </div>

            <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {/* Base Token */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">Excise Token Fee (Base Rate)</span>
                  <span className="text-[10px] text-zinc-400 block">{result.isLifetime ? "One-time lifetime token tax" : result.ccSlabLabel}</span>
                </div>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  PKR {result.baseExciseTax.toLocaleString()}
                </span>
              </div>

              {/* Motor Vehicle Tax */}
              {result.motorVehicleTax > 0 && (
                <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                  <div>
                    <span className="font-semibold text-zinc-900 dark:text-white">Motor Vehicle / Road Infrastructure Tax</span>
                    <span className="text-[10px] text-zinc-400 block">Provincial highway maintenance</span>
                  </div>
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">
                    PKR {result.motorVehicleTax.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Professional Tax */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">Professional Tax</span>
                  <span className="text-[10px] text-zinc-400 block">Provincial annual professional levy</span>
                </div>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  PKR {result.professionalTax.toLocaleString()}
                </span>
              </div>

              {/* FBR Income Tax Portion */}
              <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-white">FBR Income Tax Portion</span>
                  <span className="text-[10px] text-zinc-400 block">{result.fbrSectionCode} ({taxpayerStatus.toUpperCase()})</span>
                </div>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                  PKR {result.fbrAdvanceTax.toLocaleString()}
                </span>
              </div>

              {/* Registration & Smart Card fees */}
              {transactionType === "new_registration" && (
                <>
                  <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                    <div>
                      <span className="font-semibold text-zinc-900 dark:text-white">Registration Fee</span>
                      <span className="text-[10px] text-zinc-400 block">Provincial vehicle registration charge</span>
                    </div>
                    <span className="font-mono font-bold text-zinc-900 dark:text-white">
                      PKR {result.registrationFee.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 flex items-center justify-between text-zinc-700 dark:text-zinc-300">
                    <div>
                      <span className="font-semibold text-zinc-900 dark:text-white">Smart Card & Number Plates</span>
                      <span className="text-[10px] text-zinc-400 block">Automated registration card & secure plates</span>
                    </div>
                    <span className="font-mono font-bold text-zinc-900 dark:text-white">
                      PKR {result.smartCardPlateFee.toLocaleString()}
                    </span>
                  </div>
                </>
              )}

              {/* Grand Total */}
              <div className="p-3.5 bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-between font-bold text-sm">
                <span className="text-zinc-900 dark:text-white">Grand Total Payable</span>
                <span className="font-mono text-base font-black text-emerald-600 dark:text-emerald-400">
                  PKR {result.totalPayable.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={handleCopyBreakdown}
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
                  <span>Copy Tax Breakdown</span>
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
                  <span>Share Estimate Link</span>
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
