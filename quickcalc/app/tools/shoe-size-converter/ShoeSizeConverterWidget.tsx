"use client";

import { useState, useEffect } from "react";
import { convertShoeSize, SizingSystem, ShoeConversionResult } from "../../../lib/calculators/shoeSizeCalculator";

export default function ShoeSizeConverterWidget() {
  const [gender, setGender] = useState<"mens" | "womens">("mens");
  const [sizeInput, setSizeInput] = useState<string>("9");
  const [system, setSystem] = useState<SizingSystem>("us");
  const [result, setResult] = useState<ShoeConversionResult | string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sizeNum = parseFloat(sizeInput);
    if (isNaN(sizeNum)) {
      setResult("Enter a shoe size to see the conversions");
      return;
    }
    const res = convertShoeSize(gender, sizeNum, system);
    setResult(res);
  }, [gender, sizeInput, system]);

  const handleCopy = async () => {
    if (!result || typeof result === "string") return;
    const genderLabel = gender === "mens" ? "Men's" : "Women's";
    const summary = `Shoe Size Conversion (${genderLabel}, inputting ${sizeInput} ${system.toUpperCase()}):\n- US: ${result.us}\n- UK: ${result.uk}\n- EU: ${result.eu}\n- Japan: ${result.jp} cm\nCalculated 100% free on QuickCalc.cloud`;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white text-center">
        <h3 className="text-xl font-bold">Interactive Shoe Size Converter</h3>
        <p className="text-xs text-blue-100 mt-1">
          Convert between US, UK, EU, and Japan (cm) sizing systems simultaneously in real time.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Gender Toggle */}
        <div className="grid grid-cols-2 gap-4 bg-zinc-50 dark:bg-zinc-950 p-1.5 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
          <button
            type="button"
            onClick={() => setGender("mens")}
            className={`py-2 px-3 rounded-lg font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${
              gender === "mens"
                ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            👞 Men{"'"}s Sizing
          </button>
          <button
            type="button"
            onClick={() => setGender("womens")}
            className={`py-2 px-3 rounded-lg font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${
              gender === "womens"
                ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            👠 Women{"'"}s Sizing
          </button>
        </div>

        {/* Sizing Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Shoe Size
            </label>
            <input
              type="number"
              step="0.5"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              placeholder="e.g. 9"
              className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Input System
            </label>
            <select
              value={system}
              onChange={(e) => setSystem(e.target.value as SizingSystem)}
              className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="us">US (United States / Canada)</option>
              <option value="uk">UK (United Kingdom)</option>
              <option value="eu">EU (Europe)</option>
              <option value="jp">Japan (cm)</option>
            </select>
          </div>
        </div>

        {/* Result Area */}
        {result && typeof result !== "string" ? (
          <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 p-6 rounded-xl space-y-6 transition-all">
            {/* Visual Live Grid Table */}
            <div className="space-y-3">
              <span className="text-zinc-400 dark:text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
                Simultaneous Equivalents:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center shadow-sm relative overflow-hidden">
                  <span className="text-zinc-400 text-3xs font-bold uppercase block tracking-widest mb-1">United States</span>
                  <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 block">{result.us}</span>
                  <span className="text-3xs text-zinc-400 font-semibold block mt-1">US Size</span>
                  {system === "us" && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-[8px] text-white px-1.5 py-0.5 rounded-bl font-semibold uppercase tracking-wider">Input</div>
                  )}
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center shadow-sm relative overflow-hidden">
                  <span className="text-zinc-400 text-3xs font-bold uppercase block tracking-widest mb-1">United Kingdom</span>
                  <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 block">{result.uk}</span>
                  <span className="text-3xs text-zinc-400 font-semibold block mt-1">UK Size</span>
                  {system === "uk" && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-[8px] text-white px-1.5 py-0.5 rounded-bl font-semibold uppercase tracking-wider">Input</div>
                  )}
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center shadow-sm relative overflow-hidden">
                  <span className="text-zinc-400 text-3xs font-bold uppercase block tracking-widest mb-1">Europe</span>
                  <span className="text-3xl font-extrabold text-violet-600 dark:text-violet-400 block">{result.eu}</span>
                  <span className="text-3xs text-zinc-400 font-semibold block mt-1">EU Size</span>
                  {system === "eu" && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-[8px] text-white px-1.5 py-0.5 rounded-bl font-semibold uppercase tracking-wider">Input</div>
                  )}
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center shadow-sm relative overflow-hidden">
                  <span className="text-zinc-400 text-3xs font-bold uppercase block tracking-widest mb-1">Japan (cm)</span>
                  <span className="text-3xl font-extrabold text-pink-600 dark:text-pink-400 block">{result.jp}</span>
                  <span className="text-3xs text-zinc-400 font-semibold block mt-1">Meters/cm</span>
                  {system === "jp" && (
                    <div className="absolute top-0 right-0 bg-blue-500 text-[8px] text-white px-1.5 py-0.5 rounded-bl font-semibold uppercase tracking-wider">Input</div>
                  )}
                </div>
              </div>
            </div>

            {/* Brand Variance Warning Badge */}
            <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/40 rounded-xl p-4 text-xs text-blue-800 dark:text-blue-300 leading-relaxed shadow-sm">
              <strong className="block mb-1">💡 Real-World Fit Variance Note:</strong>
              These results are based on international sizing standards. However, because different brands construct their shoes on distinct anatomical lasts, sizes can easily vary ±0.5 sizes between manufacturers (e.g. Nike vs. Adidas vs. Clarks). Treat this table as a high-probability starting point, not an absolute guarantee.
            </div>

            {/* Sharing & Copy Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 rounded-lg hover:shadow-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                {copied ? "✅ Copied Sizing Table!" : "📋 Copy Size Conversion"}
              </button>

              <span className="text-2xs text-zinc-400 dark:text-zinc-500 italic">
                Simultaneous 4-system cross conversion
              </span>
            </div>
          </div>
        ) : (
          <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/10 p-8 rounded-xl text-center space-y-2">
            <span className="text-3xl">👟</span>
            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {result && typeof result === "string" ? result : "Enter a valid shoe size to see the conversions"}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
              We translate your size across all major charts instantly. Input values must correspond to general standard parameters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
