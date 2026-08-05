"use client";

import { useState, useMemo } from "react";
import {
  calculateZakat,
  getZakatExplanationSteps,
  GOLD_NISAB_GRAMS,
  SILVER_NISAB_GRAMS,
  ZakatConfig,
  ZakatResult
} from "../../../lib/calculators/zakatCalculator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";

export default function ZakatCalculatorWidget() {
  // Input fields
  const [cash, setCash] = useState<string>("");
  const [goldGrams, setGoldGrams] = useState<string>("");
  const [silverGrams, setSilverGrams] = useState<string>("");
  const [businessAssets, setBusinessAssets] = useState<string>("");
  const [investments, setInvestments] = useState<string>("");
  const [moneyOwedToYou, setMoneyOwedToYou] = useState<string>("");
  const [moneyOwedToOthers, setMoneyOwedToOthers] = useState<string>("");

  // Gold/silver prices per gram
  const [goldPrice, setGoldPrice] = useState<string>("75.00");
  const [silverPrice, setSilverPrice] = useState<string>("0.95");

  // Nisab standard choice
  const [nisabStandard, setNisabStandard] = useState<"gold" | "silver">("silver");

  // Copy success status
  const [copied, setCopied] = useState(false);

  // Parse numeric values
  const nCash = parseFloat(cash) || 0;
  const nGoldGrams = parseFloat(goldGrams) || 0;
  const nSilverGrams = parseFloat(silverGrams) || 0;
  const nBusinessAssets = parseFloat(businessAssets) || 0;
  const nInvestments = parseFloat(investments) || 0;
  const nMoneyOwedToYou = parseFloat(moneyOwedToYou) || 0;
  const nMoneyOwedToOthers = parseFloat(moneyOwedToOthers) || 0;

  const nGoldPrice = parseFloat(goldPrice) || 0;
  const nSilverPrice = parseFloat(silverPrice) || 0;

  // Running subtotals for gold & silver
  const goldSubtotal = nGoldGrams * nGoldPrice;
  const silverSubtotal = nSilverGrams * nSilverPrice;

  // Calculate results on the fly
  const config: ZakatConfig = {
    cash: nCash,
    goldGrams: nGoldGrams,
    silverGrams: nSilverGrams,
    businessAssets: nBusinessAssets,
    investments: nInvestments,
    moneyOwedToYou: nMoneyOwedToYou,
    moneyOwedToOthers: nMoneyOwedToOthers,
    goldPricePerGram: nGoldPrice,
    silverPricePerGram: nSilverPrice,
    nisabStandard
  };

  const results: ZakatResult = calculateZakat(config);

  const explanationSteps = useMemo(() => {
    return getZakatExplanationSteps(config, results);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nCash, nGoldGrams, nSilverGrams, nBusinessAssets, nInvestments, nMoneyOwedToYou, nMoneyOwedToOthers, nGoldPrice, nSilverPrice, nisabStandard]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val);
  };

  const handleCopy = () => {
    const goldNisabThreshold = GOLD_NISAB_GRAMS * nGoldPrice;
    const silverNisabThreshold = SILVER_NISAB_GRAMS * nSilverPrice;

    const summaryText = `--- Zakat Calculator Breakdown ---
Nisab Standard chosen: ${nisabStandard === "gold" ? "Gold Standard" : "Silver Standard"}
Gold Price: ${formatCurrency(nGoldPrice)}/g (Nisab 87.48g = ${formatCurrency(goldNisabThreshold)})
Silver Price: ${formatCurrency(nSilverPrice)}/g (Nisab 612.36g = ${formatCurrency(silverNisabThreshold)})

1. Cash & Bank Balances: ${formatCurrency(nCash)}
2. Gold (${nGoldGrams}g): ${formatCurrency(goldSubtotal)}
3. Silver (${nSilverGrams}g): ${formatCurrency(silverSubtotal)}
4. Business Assets: ${formatCurrency(nBusinessAssets)}
5. Investments & Stocks: ${formatCurrency(nInvestments)}
6. Money Owed to You: ${formatCurrency(nMoneyOwedToYou)}
----------------------------------
Total Assets: ${formatCurrency(results.totalAssets)}
(-) Money Owed to Others: ${formatCurrency(nMoneyOwedToOthers)}
----------------------------------
Net Zakat-Eligible Wealth: ${formatCurrency(Math.max(0, results.netWealth))}
Nisab Threshold (${nisabStandard === "gold" ? "Gold" : "Silver"}): ${formatCurrency(results.nisabThreshold)}

Status: ${results.isAboveNisab ? "Above Nisab (Zakat is due)" : "Below Nisab (No Zakat is due)"}
Zakat Due (2.5%): ${formatCurrency(results.zakatDue)}

Calculated via QuickCalc Zakat Tool (https://quickcalc.cloud/tools/zakat-calculator)`;

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadPdf = () => {
    generatePdf({
      toolName: "Zakat Calculator",
      toolSlug: "zakat-calculator",
      inputs: [
        { label: "Nisab Basis", value: nisabStandard.toUpperCase() },
        { label: "Nisab Threshold", value: formatCurrency(results.nisabThreshold) },
        { label: "Gross Assets", value: formatCurrency(results.totalAssets) },
        { label: "Deductible Liabilities", value: formatCurrency(nMoneyOwedToOthers) },
      ],
      results: [
        { label: "Net Eligible Wealth", value: formatCurrency(Math.max(0, results.netWealth)) },
        { label: "Zakat Due (2.5%)", value: formatCurrency(results.zakatDue), isHighlight: true },
        { label: "Nisab Status", value: results.isAboveNisab ? "ABOVE Nisab (Zakat Obligatory)" : "BELOW Nisab (No Zakat Due)" },
      ],
      summaryNote: `Zakat calculation computed using 2.5% rate on net eligible wealth above Nisab (${nisabStandard}).`,
      filename: `Zakat-Calculation-Report.pdf`,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white text-center">
        <h3 className="text-xl sm:text-2xl font-bold">Zakat Calculator</h3>
        <p className="text-xs sm:text-sm text-emerald-100 mt-1.5 max-w-xl mx-auto">
          An intuitive, category-by-category estimator based on traditional calculation models. Enter your assets and liabilities below.
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Scholar Consult Warning */}
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 text-xs sm:text-sm text-amber-800 dark:text-amber-300">
          <p className="font-semibold flex items-center gap-1.5">
            ⚠️ <span>Important Calculation Note</span>
          </p>
          <p className="mt-1 leading-relaxed">
            This calculator is a tool to help estimate your Zakat based on standard calculation methods. For specific rulings on your personal situation, please consult a qualified scholar.
          </p>
        </div>

        {/* Live Gold/Silver Price Inputs */}
        <div className="bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 space-y-4">
          <div>
            <h4 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
              1. Set Today's Precious Metal Rates
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Because metal prices fluctuate, please input today's market rates per gram in your currency.
              {" "}<span className="text-emerald-600 dark:text-emerald-400 font-medium">Check today's rate from your local market or a gold price site</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="goldPrice" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Gold Price per Gram ($)
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 text-sm">$</span>
                <input
                  id="goldPrice"
                  type="number"
                  value={goldPrice}
                  onChange={(e) => setGoldPrice(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent pl-7 pr-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="e.g. 75.00"
                  min="0"
                  step="any"
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">
                Gold Nisab (87.48g): <span className="font-semibold">{formatCurrency(GOLD_NISAB_GRAMS * nGoldPrice)}</span>
              </p>
            </div>

            <div>
              <label htmlFor="silverPrice" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
                Silver Price per Gram ($)
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 text-sm">$</span>
                <input
                  id="silverPrice"
                  type="number"
                  value={silverPrice}
                  onChange={(e) => setSilverPrice(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent pl-7 pr-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="e.g. 0.95"
                  min="0"
                  step="any"
                />
              </div>
              <p className="text-[11px] text-zinc-500 mt-1">
                Silver Nisab (612.36g): <span className="font-semibold">{formatCurrency(SILVER_NISAB_GRAMS * nSilverPrice)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Category Inputs Form */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 pb-2">
            2. Enter Your Eligible Assets
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Cash */}
            <div className="space-y-1.5">
              <label htmlFor="cash" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                Cash & Bank Balances ($)
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 text-sm">$</span>
                <input
                  id="cash"
                  type="number"
                  value={cash}
                  onChange={(e) => setCash(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent pl-7 pr-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="0.00"
                  min="0"
                  step="any"
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-zinc-500 px-0.5">
                <span>All savings, cash on hand & accounts</span>
                <span className="font-semibold">{formatCurrency(nCash)}</span>
              </div>
            </div>

            {/* Gold in Grams */}
            <div className="space-y-1.5">
              <label htmlFor="goldGrams" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                Gold Weight (Grams)
              </label>
              <div className="relative rounded-lg shadow-sm">
                <input
                  id="goldGrams"
                  type="number"
                  value={goldGrams}
                  onChange={(e) => setGoldGrams(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 pr-12 text-sm text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="0"
                  min="0"
                  step="any"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 text-sm pointer-events-none">g</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-zinc-500 px-0.5">
                <span>Nisab: 87.48g gold equivalent</span>
                <span className="font-semibold">{formatCurrency(goldSubtotal)}</span>
              </div>
            </div>

            {/* Silver in Grams */}
            <div className="space-y-1.5">
              <label htmlFor="silverGrams" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                Silver Weight (Grams)
              </label>
              <div className="relative rounded-lg shadow-sm">
                <input
                  id="silverGrams"
                  type="number"
                  value={silverGrams}
                  onChange={(e) => setSilverGrams(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 pr-12 text-sm text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="0"
                  min="0"
                  step="any"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 text-sm pointer-events-none">g</span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-zinc-500 px-0.5">
                <span>Nisab: 612.36g silver equivalent</span>
                <span className="font-semibold">{formatCurrency(silverSubtotal)}</span>
              </div>
            </div>

            {/* Business Assets */}
            <div className="space-y-1.5">
              <label htmlFor="businessAssets" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                Business Assets & Inventory ($)
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 text-sm">$</span>
                <input
                  id="businessAssets"
                  type="number"
                  value={businessAssets}
                  onChange={(e) => setBusinessAssets(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent pl-7 pr-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="0.00"
                  min="0"
                  step="any"
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-zinc-500 px-0.5">
                <span>Cash value of stock, trade goods, etc.</span>
                <span className="font-semibold">{formatCurrency(nBusinessAssets)}</span>
              </div>
            </div>

            {/* Investments */}
            <div className="space-y-1.5">
              <label htmlFor="investments" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                Investments, Stocks & Crypto ($)
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 text-sm">$</span>
                <input
                  id="investments"
                  type="number"
                  value={investments}
                  onChange={(e) => setInvestments(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent pl-7 pr-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="0.00"
                  min="0"
                  step="any"
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-zinc-500 px-0.5">
                <span>Current market value of portfolio</span>
                <span className="font-semibold">{formatCurrency(nInvestments)}</span>
              </div>
            </div>

            {/* Money Owed To You */}
            <div className="space-y-1.5">
              <label htmlFor="moneyOwedToYou" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
                Money Owed To You ($)
              </label>
              <div className="relative rounded-lg shadow-sm">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 text-sm">$</span>
                <input
                  id="moneyOwedToYou"
                  type="number"
                  value={moneyOwedToYou}
                  onChange={(e) => setMoneyOwedToYou(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent pl-7 pr-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="0.00"
                  min="0"
                  step="any"
                />
              </div>
              <div className="flex justify-between items-center text-[11px] text-zinc-500 px-0.5">
                <span>Debts you expect to be repaid</span>
                <span className="font-semibold">{formatCurrency(nMoneyOwedToYou)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Liabilities Section */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800 pb-2">
            3. Deduct Your Liabilities
          </h4>

          <div className="space-y-1.5 max-w-md">
            <label htmlFor="moneyOwedToOthers" className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide">
              Money Owed To Others / Debts ($)
            </label>
            <div className="relative rounded-lg shadow-sm">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 text-sm">$</span>
              <input
                id="moneyOwedToOthers"
                type="number"
                value={moneyOwedToOthers}
                onChange={(e) => setMoneyOwedToOthers(e.target.value)}
                className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent pl-7 pr-3 py-2 text-sm text-zinc-900 dark:text-white focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                placeholder="0.00"
                min="0"
                step="any"
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-zinc-500 px-0.5">
              <span>Immediate dues, bills, loans, etc.</span>
              <span className="font-semibold text-red-600 dark:text-red-400">-{formatCurrency(nMoneyOwedToOthers)}</span>
            </div>
          </div>
        </div>

        {/* Nisab Standard Selector */}
        <div className="border-t border-zinc-100 dark:border-zinc-800 pt-6 space-y-4">
          <div>
            <h4 className="text-sm font-bold text-zinc-950 dark:text-white uppercase tracking-wider">
              4. Choose Your Nisab Standard
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Scholars differ on which threshold to apply for cash or mixed savings.
              The silver standard is significantly lower, causing more households to qualify for paying Zakat, whereas the gold standard is higher.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setNisabStandard("silver")}
              className={`p-4 rounded-xl border text-left transition-all ${
                nisabStandard === "silver"
                  ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 ring-1 ring-emerald-500"
                  : "border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-950/20"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-zinc-900 dark:text-white">Silver-Standard Nisab</span>
                <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${nisabStandard === "silver" ? "border-emerald-600" : "border-zinc-300"}`}>
                  {nisabStandard === "silver" && <span className="h-2 w-2 rounded-full bg-emerald-600" />}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                612.36g of Silver equivalent. Currently: <strong className="text-zinc-900 dark:text-white">{formatCurrency(SILVER_NISAB_GRAMS * nSilverPrice)}</strong>.
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-2">
                * Highly recommended by many modern scholars as it increases charitable distribution.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setNisabStandard("gold")}
              className={`p-4 rounded-xl border text-left transition-all ${
                nisabStandard === "gold"
                  ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 ring-1 ring-emerald-500"
                  : "border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-950/20"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-zinc-900 dark:text-white">Gold-Standard Nisab</span>
                <span className={`h-4 w-4 rounded-full border flex items-center justify-center ${nisabStandard === "gold" ? "border-emerald-600" : "border-zinc-300"}`}>
                  {nisabStandard === "gold" && <span className="h-2 w-2 rounded-full bg-emerald-600" />}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                87.48g of Gold equivalent. Currently: <strong className="text-zinc-900 dark:text-white">{formatCurrency(GOLD_NISAB_GRAMS * nGoldPrice)}</strong>.
              </p>
              <p className="text-[11px] text-zinc-500 mt-2">
                * Traditionally used for wealth stored primarily in gold bullion.
              </p>
            </button>
          </div>
        </div>

        {/* Calculation Result Board */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Total Assets</span>
              <p className="text-lg font-bold text-zinc-900 dark:text-white mt-1">{formatCurrency(results.totalAssets)}</p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Net Eligible Wealth</span>
              <p className="text-lg font-bold text-zinc-900 dark:text-white mt-1">
                {formatCurrency(Math.max(0, results.netWealth))}
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Active Nisab</span>
              <p className="text-lg font-bold text-zinc-900 dark:text-white mt-1">{formatCurrency(results.nisabThreshold)}</p>
            </div>
          </div>

          <div className={`p-6 rounded-2xl border text-center ${
            results.isAboveNisab
              ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50"
              : "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"
          }`}>
            <span className={`text-xs font-bold uppercase tracking-widest ${
              results.isAboveNisab ? "text-emerald-700 dark:text-emerald-400" : "text-zinc-500"
            }`}>
              Zakat Status
            </span>

            <h3 className="text-xl sm:text-2xl font-black mt-1 text-zinc-900 dark:text-white">
              {results.netWealth <= 0
                ? "No Zakat is due"
                : results.isAboveNisab
                  ? "Your wealth is ABOVE Nisab"
                  : "Your wealth is BELOW Nisab"}
            </h3>

            {results.isAboveNisab ? (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-md mx-auto">
                  Your net wealth of <strong className="text-zinc-900 dark:text-white">{formatCurrency(results.netWealth)}</strong> exceeds the active Nisab threshold of <strong>{formatCurrency(results.nisabThreshold)}</strong>.
                </p>
                <div className="inline-block bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl px-8 py-4 shadow-sm mt-2">
                  <span className="text-xs text-zinc-400 block font-semibold uppercase tracking-wider">Zakat Amount Due (2.5%)</span>
                  <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 block mt-1">
                    {formatCurrency(results.zakatDue)}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto mt-2">
                {results.netWealth <= 0
                  ? "Since your liabilities exceed or equal your assets, your net Zakat-eligible wealth is zero. No Zakat is due."
                  : `Your net wealth is currently ${formatCurrency(results.netWealth)}. Since this is below the active Nisab threshold of ${formatCurrency(results.nisabThreshold)}, no Zakat is due at this time.`}
              </p>
            )}

            <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
              >
                {copied ? "✓ Copied Breakdown!" : "📋 Copy Breakdown"}
              </button>
              <DownloadPdfButton onClick={handleDownloadPdf} className="py-2.5" />
            </div>

            {/* Step-by-Step Explanation Accordion */}
            <ExplainResultAccordion steps={explanationSteps} />
          </div>
        </div>
      </div>
    </div>
  );
}
