"use client";

import { useState, useEffect } from "react";
import {
  getPaperSizeResult,
  convertFabricLength,
  PAPER_SIZES,
  FabricUnit,
  FabricConversionResult,
  PaperSizeResult,
} from "../../../lib/calculators/paperFabricCalculator";

export default function PaperFabricConverterWidget() {
  const [mode, setMode] = useState<"paper" | "fabric">("paper");

  // Paper Mode States
  const [paperKey, setPaperKey] = useState<string>("a4");
  const [paperResult, setPaperResult] = useState<PaperSizeResult | null>(null);

  // Fabric Mode States
  const [fabricValue, setFabricValue] = useState<string>("10");
  const [fabricUnit, setFabricUnit] = useState<FabricUnit>("yards");
  const [fabricResult, setFabricResult] = useState<FabricConversionResult | string | null>(null);

  const [copied, setCopied] = useState(false);

  // Run Paper conversions
  useEffect(() => {
    const res = getPaperSizeResult(paperKey);
    setPaperResult(res);
  }, [paperKey]);

  // Run Fabric conversions
  useEffect(() => {
    const val = parseFloat(fabricValue);
    const res = convertFabricLength(val, fabricUnit);
    setFabricResult(res);
  }, [fabricValue, fabricUnit]);

  const handleCopy = async () => {
    let summary = "";
    if (mode === "paper" && paperResult) {
      summary = `Paper Size: ${paperResult.name}\n- Millimeters: ${paperResult.mm.width} x ${paperResult.mm.height} mm\n- Centimeters: ${paperResult.cm.width} x ${paperResult.cm.height} cm\n- Inches: ${paperResult.inches.width} x ${paperResult.inches.height} in\nCalculated 100% free on QuickCalc.cloud`;
    } else if (mode === "fabric" && fabricResult && typeof fabricResult !== "string") {
      summary = `Fabric Measurement (${fabricValue} ${fabricUnit}):\n- Meters: ${fabricResult.meters} m\n- Yards: ${fabricResult.yards} yd\n- Inches: ${fabricResult.inches} in\n- Centimeters: ${fabricResult.cm} cm\nCalculated 100% free on QuickCalc.cloud`;
    } else {
      return;
    }

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
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white text-center">
        <h3 className="text-xl font-bold">Paper & Fabric Size Converter</h3>
        <p className="text-xs text-emerald-100 mt-1">
          Convert standard print paper dimensions and fabric length measurements in real time.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Main Mode Toggle */}
        <div className="grid grid-cols-2 gap-4 bg-zinc-50 dark:bg-zinc-950 p-1.5 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
          <button
            type="button"
            onClick={() => setMode("paper")}
            className={`py-2 px-3 rounded-lg font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${
              mode === "paper"
                ? "bg-white dark:bg-zinc-800 text-teal-600 dark:text-teal-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            📄 Paper Sizes (A0-A10, US)
          </button>
          <button
            type="button"
            onClick={() => setMode("fabric")}
            className={`py-2 px-3 rounded-lg font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${
              mode === "fabric"
                ? "bg-white dark:bg-zinc-800 text-teal-600 dark:text-teal-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
            }`}
          >
            🧵 Fabric Measurements
          </button>
        </div>

        {/* Paper Sizing Mode */}
        {mode === "paper" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Select Standard Paper Size
              </label>
              <select
                value={paperKey}
                onChange={(e) => setPaperKey(e.target.value)}
                className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-zinc-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {Object.entries(PAPER_SIZES).map(([key, item]) => (
                  <option key={key} value={key}>
                    {item.name} Sizing Dimensions
                  </option>
                ))}
              </select>
            </div>

            {paperResult ? (
              <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 p-6 rounded-xl space-y-4 transition-all">
                <span className="text-zinc-400 dark:text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
                  Simultaneous Dimensions for {paperResult.name}:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center shadow-sm">
                    <span className="text-zinc-400 text-3xs font-bold uppercase block tracking-widest mb-1">Millimeters</span>
                    <span className="text-2xl font-extrabold text-teal-600 dark:text-teal-400 block">
                      {paperResult.mm.width} x {paperResult.mm.height}
                    </span>
                    <span className="text-3xs text-zinc-400 font-semibold block mt-1">mm</span>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center shadow-sm">
                    <span className="text-zinc-400 text-3xs font-bold uppercase block tracking-widest mb-1">Centimeters</span>
                    <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 block">
                      {paperResult.cm.width} x {paperResult.cm.height}
                    </span>
                    <span className="text-3xs text-zinc-400 font-semibold block mt-1">cm</span>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center shadow-sm">
                    <span className="text-zinc-400 text-3xs font-bold uppercase block tracking-widest mb-1">Inches</span>
                    <span className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 block">
                      {paperResult.inches.width} x {paperResult.inches.height}
                    </span>
                    <span className="text-3xs text-zinc-400 font-semibold block mt-1">in</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-center text-zinc-500">Please choose a valid size</p>
            )}
          </div>
        )}

        {/* Fabric Measurements Mode */}
        {mode === "fabric" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Length Value
                </label>
                <input
                  type="number"
                  value={fabricValue}
                  onChange={(e) => setFabricValue(e.target.value)}
                  placeholder="e.g. 10"
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Length Unit
                </label>
                <select
                  value={fabricUnit}
                  onChange={(e) => setFabricUnit(e.target.value as FabricUnit)}
                  className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-zinc-900 dark:text-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option value="yards">Yards (yd)</option>
                  <option value="meters">Meters (m)</option>
                  <option value="inches">Inches (in)</option>
                  <option value="cm">Centimeters (cm)</option>
                </select>
              </div>
            </div>

            {fabricResult && typeof fabricResult !== "string" ? (
              <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/40 p-6 rounded-xl space-y-6 transition-all">
                <div className="space-y-3">
                  <span className="text-zinc-400 dark:text-zinc-500 text-xs font-semibold uppercase tracking-wider block">
                    Converted Length Equivalents:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center shadow-sm relative">
                      <span className="text-zinc-400 text-3xs font-bold uppercase block tracking-widest mb-1">Meters</span>
                      <span className="text-xl font-extrabold text-teal-600 dark:text-teal-400 block">{fabricResult.meters}</span>
                      <span className="text-3xs text-zinc-400 font-semibold block mt-1">m</span>
                      {fabricUnit === "meters" && (
                        <span className="absolute top-0 right-0 bg-teal-500 text-[8px] text-white px-1 py-0.5 rounded-bl font-semibold uppercase">Source</span>
                      )}
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center shadow-sm relative">
                      <span className="text-zinc-400 text-3xs font-bold uppercase block tracking-widest mb-1">Yards</span>
                      <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 block">{fabricResult.yards}</span>
                      <span className="text-3xs text-zinc-400 font-semibold block mt-1">yd</span>
                      {fabricUnit === "yards" && (
                        <span className="absolute top-0 right-0 bg-teal-500 text-[8px] text-white px-1 py-0.5 rounded-bl font-semibold uppercase">Source</span>
                      )}
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center shadow-sm relative">
                      <span className="text-zinc-400 text-3xs font-bold uppercase block tracking-widest mb-1">Inches</span>
                      <span className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400 block">{fabricResult.inches}</span>
                      <span className="text-3xs text-zinc-400 font-semibold block mt-1">in</span>
                      {fabricUnit === "inches" && (
                        <span className="absolute top-0 right-0 bg-teal-500 text-[8px] text-white px-1 py-0.5 rounded-bl font-semibold uppercase">Source</span>
                      )}
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-xl text-center shadow-sm relative">
                      <span className="text-zinc-400 text-3xs font-bold uppercase block tracking-widest mb-1">Centimeters</span>
                      <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 block">{fabricResult.cm}</span>
                      <span className="text-3xs text-zinc-400 font-semibold block mt-1">cm</span>
                      {fabricUnit === "cm" && (
                        <span className="absolute top-0 right-0 bg-teal-500 text-[8px] text-white px-1 py-0.5 rounded-bl font-semibold uppercase">Source</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Live Quantity Helper Card */}
                <div className="bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200/50 dark:border-teal-900/40 rounded-xl p-4 text-xs text-teal-800 dark:text-teal-300 leading-relaxed shadow-sm">
                  <strong className="block mb-1">🧶 Supplier Quantity Helper:</strong>
                  Your entered quantity of <strong className="text-teal-600">{fabricValue} {fabricUnit}</strong> is equivalent to:
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>
                      <strong>{fabricResult.meters} meters</strong> of fabric (Standard metric supplier measurement).
                    </li>
                    <li>
                      <strong>{fabricResult.yards} yards</strong> of fabric (Standard imperial supplier measurement).
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/10 p-8 rounded-xl text-center space-y-2">
                <span className="text-3xl">📐</span>
                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  {typeof fabricResult === "string" ? fabricResult : "Enter a length to run conversions"}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Copy Actions Footer */}
        {((mode === "paper" && paperResult) || (mode === "fabric" && fabricResult && typeof fabricResult !== "string")) && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 rounded-lg hover:shadow-sm focus:ring-1 focus:ring-teal-500 focus:outline-none"
            >
              {copied ? "✅ Copied Conversion Table!" : "📋 Copy Results"}
            </button>

            <span className="text-2xs text-zinc-400 dark:text-zinc-500 italic">
              Live simultaneous print & textile conversion
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
