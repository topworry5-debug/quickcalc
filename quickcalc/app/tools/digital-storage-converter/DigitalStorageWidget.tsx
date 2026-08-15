"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  convertDigitalStorage,
  getDigitalStorageExplanationSteps,
  StorageUnitKey,
  StorageMode,
  DigitalStorageResult,
  STORAGE_UNITS,
} from "@/lib/calculators/digitalStorageCalculator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import ShareResultButton from "@/components/ShareResultButton";
import ShareResultModal from "@/components/ShareResultModal";
import { useCalculatorUrlState } from "@/hooks/useCalculatorUrlState";
import { HardDrive, Info, Copy, Check, FileText, Cpu } from "lucide-react";

export default function DigitalStorageWidget() {
  const [value, setValue] = useState<string>("1");
  const [unit, setUnit] = useState<StorageUnitKey>("tb");
  const [mode, setMode] = useState<StorageMode>("decimal");

  const [result, setResult] = useState<DigitalStorageResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const userOverrodeUnits = useRef(false);

  // Hydrate inputs from URL query parameters if present
  const onHydrate = useCallback((sp: URLSearchParams) => {
    const v = sp.get("v");
    const u = sp.get("u");
    const m = sp.get("m");

    if (v) setValue(v);
    if (
      u === "bits" ||
      u === "bytes" ||
      u === "kb" ||
      u === "mb" ||
      u === "gb" ||
      u === "tb" ||
      u === "pb"
    ) {
      userOverrodeUnits.current = true;
      setUnit(u as StorageUnitKey);
    }
    if (m === "decimal" || m === "binary") {
      setMode(m as StorageMode);
    }
  }, []);

  useCalculatorUrlState(
    {
      v: value,
      u: unit,
      m: mode,
    },
    onHydrate
  );

  // Real-time calculation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const valNum = parseFloat(value);

      if (isNaN(valNum) || valNum < 0) {
        setResult(null);
        return;
      }

      const calcResult = convertDigitalStorage(valNum, unit, mode);
      setResult(calcResult);
    }, 150);

    return () => clearTimeout(timer);
  }, [value, unit, mode]);

  const handleDownloadPdf = () => {
    if (!result) return;
    const sourceConfig = STORAGE_UNITS.find((u) => u.key === unit);
    const unitSymbol = mode === "binary" ? sourceConfig?.binarySymbol : sourceConfig?.decimalSymbol;

    const pdfResults = result.convertedUnits.map((item) => ({
      label: `${item.label} (${item.symbol})`,
      value: `${item.formattedValue} ${item.symbol}`,
      isHighlight: item.key === unit,
    }));

    generatePdf({
      toolName: "Digital Storage Converter",
      toolSlug: "digital-storage-converter",
      inputs: [
        { label: "Input Value", value: `${value} ${unitSymbol}` },
        { label: "Calculation Standard", value: mode === "binary" ? "Binary (1024-based, IEC)" : "Decimal (1000-based, SI)" },
      ],
      results: pdfResults,
      summaryNote: `Simultaneous digital storage conversion for ${value} ${unitSymbol} using ${
        mode === "binary" ? "1024-based binary (IEC)" : "1000-based decimal (SI)"
      } standard.`,
      filename: `Digital-Storage-Conversion-${value}${unitSymbol}.pdf`,
    });
  };

  const handleCopy = async () => {
    if (!result) return;
    const sourceConfig = STORAGE_UNITS.find((u) => u.key === unit);
    const unitSymbol = mode === "binary" ? sourceConfig?.binarySymbol : sourceConfig?.decimalSymbol;

    const lines = result.convertedUnits.map((u) => `- ${u.label}: ${u.formattedValue} ${u.symbol}`);
    const text = `Digital Storage Conversion (${value} ${unitSymbol} - ${mode === "binary" ? "Binary 1024" : "Decimal 1000"}):\n${lines.join("\n")}\nCalculated free at QuickCalc.cloud`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleExportTxt = () => {
    if (!result) return;
    const sourceConfig = STORAGE_UNITS.find((u) => u.key === unit);
    const unitSymbol = mode === "binary" ? sourceConfig?.binarySymbol : sourceConfig?.decimalSymbol;

    const lines = result.convertedUnits.map((u) => `${u.label} (${u.symbol}): ${u.formattedValue}`);

    const textContent = `QUICKCALC DIGITAL STORAGE CONVERSION REPORT
----------------------------------------------
Input Quantity: ${value} ${unitSymbol}
Standard Mode: ${mode === "binary" ? "Binary / IEC (1024-based)" : "Decimal / SI (1000-based)"}

SIMULTANEOUS CONVERTED EQUIVALENTS:
${lines.join("\n")}

${
  result.osDiskComparison
    ? `OS DRIVE CAPACITY REALITY CHECK:
A drive advertised as ${value} ${unitSymbol} (${result.osDiskComparison.decimalGb} GB) provides approximately ${result.osDiskComparison.binaryGib} GiB usable capacity in Windows or Linux due to the 1000 vs 1024 calculation difference (~${result.osDiskComparison.percentageDifference}% reporting difference).`
    : ""
}

Calculated 100% free with zero sign-ins at QuickCalc (https://quickcalc.cloud/tools/digital-storage-converter)`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `QuickCalc-Storage-${value}${unitSymbol}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const explanationSteps = useMemo(() => {
    if (!result) return [];
    const valNum = parseFloat(value) || 0;
    return getDigitalStorageExplanationSteps(valNum, unit, mode, result);
  }, [result, value, unit, mode]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-700 p-6 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
          <HardDrive size={14} className="text-sky-200" />
          <span>Simultaneous Multi-Unit Storage Engine</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Digital Storage Converter
        </h3>
        <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-md mx-auto">
          Convert bits, Bytes, KB/KiB, MB/MiB, GB/GiB, TB/TiB, and PB/PiB instantly with binary vs decimal precision.
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Mode Selector Toggle (Decimal 1000 vs Binary 1024) */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Calculation Mode & Unit System
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-zinc-50 dark:bg-zinc-950 p-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80">
            <button
              type="button"
              onClick={() => setMode("decimal")}
              className={`p-3 rounded-lg text-left transition-all flex items-start gap-3 border ${
                mode === "decimal"
                  ? "bg-white dark:bg-zinc-900 border-indigo-500 text-indigo-950 dark:text-indigo-200 shadow-sm"
                  : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              <Cpu size={18} className={`shrink-0 mt-0.5 ${mode === "decimal" ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} />
              <div className="space-y-0.5">
                <span className="text-xs font-bold block">
                  Decimal SI (1000-based)
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block leading-tight">
                  KB, MB, GB, TB (Used by storage drive manufacturers & cloud providers)
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMode("binary")}
              className={`p-3 rounded-lg text-left transition-all flex items-start gap-3 border ${
                mode === "binary"
                  ? "bg-white dark:bg-zinc-900 border-indigo-500 text-indigo-950 dark:text-indigo-200 shadow-sm"
                  : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              <HardDrive size={18} className={`shrink-0 mt-0.5 ${mode === "binary" ? "text-indigo-600 dark:text-indigo-400" : "text-zinc-400"}`} />
              <div className="space-y-0.5">
                <span className="text-xs font-bold block">
                  Binary IEC (1024-based)
                </span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block leading-tight">
                  KiB, MiB, GiB, TiB (Used by Windows, Linux & RAM hardware)
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Input Value & Unit Selector */}
        <div className="bg-zinc-50/80 dark:bg-zinc-950/60 p-4 sm:p-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Storage Value Input */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Storage Quantity / Value
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-zinc-900 dark:text-white font-mono text-base font-bold focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. 1"
                min="0"
                step="any"
              />
            </div>

            {/* Unit Dropdown Selector */}
            <div className="sm:col-span-1 space-y-1.5">
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Source Unit
              </label>
              <select
                value={unit}
                onChange={(e) => {
                  userOverrodeUnits.current = true;
                  setUnit(e.target.value as StorageUnitKey);
                }}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2.5 text-zinc-900 dark:text-white font-semibold text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {STORAGE_UNITS.map((u) => {
                  const label = mode === "binary" ? u.binaryLabel : u.decimalLabel;
                  const symbol = mode === "binary" ? u.binarySymbol : u.decimalSymbol;
                  return (
                    <option key={u.key} value={u.key}>
                      {symbol} ({label})
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        {/* Operating System Storage Reality Callout Banner */}
        {result?.osDiskComparison && (
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-950 dark:text-indigo-200 flex gap-3 text-xs leading-relaxed">
            <Info size={20} className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-indigo-900 dark:text-indigo-100 uppercase tracking-wider text-[11px]">
                💡 OS vs Drive Manufacturer Storage Clarification
              </h4>
              <p>
                When you buy a <strong>{value} {STORAGE_UNITS.find((u) => u.key === unit)?.decimalSymbol}</strong> drive, manufacturers measure in 1,000-based decimal notation ({result.osDiskComparison.decimalGb} GB). However, Windows reports disk capacity in 1,024-based binary notation, displaying it as approximately <strong>{result.osDiskComparison.binaryGib} GiB</strong> (a ~{result.osDiskComparison.percentageDifference}% difference of {result.osDiskComparison.differenceGb} GB).
              </p>
            </div>
          </div>
        )}

        {/* Results: Simultaneous Multi-Unit Display Grid */}
        {result ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">
                  Simultaneous Converted Equivalents ({mode === "binary" ? "Binary 1024" : "Decimal 1000"})
                </span>
                <span className="text-3xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-full">
                  Instant Live Update
                </span>
              </div>

              {/* 7 Unit Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {result.convertedUnits.map((item) => {
                  const isSource = item.key === unit;
                  return (
                    <div
                      key={item.key}
                      className={`p-3.5 rounded-xl border text-center relative transition-all shadow-2xs ${
                        isSource
                          ? "bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 ring-2 ring-indigo-500/20"
                          : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                      }`}
                    >
                      {isSource && (
                        <span className="absolute top-1.5 right-1.5 bg-indigo-600 text-white text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wide">
                          Source
                        </span>
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block mb-1">
                        {item.label}
                      </span>
                      <span className="text-lg sm:text-xl font-extrabold font-mono text-zinc-900 dark:text-white block truncate">
                        {item.formattedValue}
                      </span>
                      <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 block mt-0.5">
                        {item.symbol}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Practical Quick-Reference Benchmark Table */}
            <div className="space-y-3 pt-2">
              <span className="text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-bold block">
                📊 Practical Reference Benchmarks (What fits in common storage?)
              </span>
              <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-bold border-b border-zinc-200 dark:border-zinc-800">
                      <th className="p-3">Digital Media Type</th>
                      <th className="p-3">Average Size</th>
                      <th className="p-3">Capacity Equivalent Benchmark</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-950">
                    <tr>
                      <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-200">📷 High-Res JPEG Photo</td>
                      <td className="p-3 font-mono">~4 MB</td>
                      <td className="p-3">~250 photos per 1 GB / ~250,000 photos per 1 TB</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-200">🎵 MP3 Audio Song (3.5 min)</td>
                      <td className="p-3 font-mono">~5 MB</td>
                      <td className="p-3">~200 songs per 1 GB / ~200,000 songs per 1 TB</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-200">🎬 1080p Full HD Movie (2 hr)</td>
                      <td className="p-3 font-mono">~4 GB</td>
                      <td className="p-3">~25 movies per 100 GB / ~250 movies per 1 TB</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-200">🎥 4K Ultra HD Movie (2 hr)</td>
                      <td className="p-3 font-mono">~20 GB</td>
                      <td className="p-3">~5 movies per 100 GB / ~50 movies per 1 TB</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-200">📱 128 GB Smartphone</td>
                      <td className="p-3 font-mono">128 GB</td>
                      <td className="p-3">~32,000 photos OR ~25,000 songs OR ~30 HD movies</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-200">💾 1 TB Solid State Drive (SSD)</td>
                      <td className="p-3 font-mono">1,000 GB</td>
                      <td className="p-3">~931.3 GiB usable Windows storage capacity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <DownloadPdfButton onClick={handleDownloadPdf} />

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy Summary"}</span>
              </button>

              <button
                type="button"
                onClick={handleExportTxt}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors"
              >
                <FileText size={14} />
                <span>Export TXT</span>
              </button>

              <ShareResultButton onClick={() => setIsShareModalOpen(true)} />
            </div>

            {/* Step-by-Step Mathematical Explanation Accordion */}
            <ExplainResultAccordion steps={explanationSteps} />
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-800">
            Please enter a valid non-negative storage quantity to run conversions.
          </div>
        )}
      </div>

      {/* Share Modal */}
      {result && (
        <ShareResultModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          data={{
            toolName: "Digital Storage Converter",
            toolSlug: "digital-storage-converter",
            category: "Converters & Utilities",
            resultValue: `${result.sourceValue} ${
              STORAGE_UNITS.find((u) => u.key === unit)?.decimalSymbol
            }`,
            resultLabel: `Simultaneous Conversion across ${result.convertedUnits.length} storage units`,
            inputsSummary: [
              {
                label: "Quantity",
                value: `${result.sourceValue} ${
                  mode === "binary"
                    ? STORAGE_UNITS.find((u) => u.key === unit)?.binarySymbol
                    : STORAGE_UNITS.find((u) => u.key === unit)?.decimalSymbol
                }`,
              },
              { label: "Standard", value: mode === "binary" ? "Binary (1024)" : "Decimal (1000)" },
            ],
            queryParams: {
              v: value,
              u: unit,
              m: mode,
            },
          }}
        />
      )}
    </div>
  );
}
