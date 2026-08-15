"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  calculateGFR,
  getGFRExplanationSteps,
  GFRCalculatorResult,
} from "@/lib/calculators/gfrCalculator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import ShareResultButton from "@/components/ShareResultButton";
import ShareResultModal from "@/components/ShareResultModal";
import { useCalculatorUrlState } from "@/hooks/useCalculatorUrlState";
import { AlertTriangle, Activity, Copy, Check, FileText } from "lucide-react";

export default function GFRCalculatorWidget() {
  const [creatinine, setCreatinine] = useState<string>("1.0");
  const [creatinineUnit, setCreatinineUnit] = useState<"mg/dL" | "umol/L">("mg/dL");
  const [age, setAge] = useState<string>("50");
  const [sex, setSex] = useState<"female" | "male">("female");

  const [result, setResult] = useState<GFRCalculatorResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const userOverrodeUnits = useRef(false);

  // Hydrate inputs from URL query parameters if available
  const onHydrate = useCallback((sp: URLSearchParams) => {
    const scr = sp.get("scr");
    const u = sp.get("u");
    const a = sp.get("a");
    const s = sp.get("s");

    if (scr) setCreatinine(scr);
    if (u === "mg/dL" || u === "umol/L") {
      userOverrodeUnits.current = true;
      setCreatinineUnit(u as "mg/dL" | "umol/L");
    }
    if (a) setAge(a);
    if (s === "female" || s === "male") setSex(s as "female" | "male");
  }, []);

  useCalculatorUrlState(
    {
      scr: creatinine,
      u: creatinineUnit,
      a: age,
      s: sex,
    },
    onHydrate
  );

  // Real-time calculation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const scrNum = parseFloat(creatinine);
      const ageNum = parseInt(age, 10);

      if (
        isNaN(scrNum) ||
        scrNum <= 0 ||
        isNaN(ageNum) ||
        ageNum <= 0 ||
        ageNum > 120
      ) {
        setResult(null);
        return;
      }

      const calcResult = calculateGFR({
        creatinine: scrNum,
        creatinineUnit,
        age: ageNum,
        sex,
      });

      setResult(calcResult);
    }, 150);

    return () => clearTimeout(timer);
  }, [creatinine, creatinineUnit, age, sex]);

  const handleDownloadPdf = () => {
    if (!result) return;
    generatePdf({
      toolName: "GFR / Kidney Function Calculator",
      toolSlug: "gfr-kidney-function-calculator",
      inputs: [
        { label: "Serum Creatinine", value: `${creatinine} ${creatinineUnit}` },
        { label: "Biological Sex", value: sex === "female" ? "Female" : "Male" },
        { label: "Age", value: `${age} years` },
        { label: "Formula Standard", value: "2021 CKD-EPI Creatinine (Race-Free)" },
      ],
      results: [
        { label: "Estimated GFR (eGFR)", value: `${result.gfrFormatted} mL/min/1.73m²`, isHighlight: true },
        { label: "CKD Stage", value: `${result.stageInfo.stage} (${result.stageInfo.label})` },
        { label: "Standard Range", value: result.stageInfo.rangeText },
      ],
      summaryNote: `Clinical Classification: ${result.stageInfo.stage} - ${result.stageInfo.label}. ${result.stageInfo.description} Disclaimer: This calculation is an estimate for informational purposes only. Results must always be reviewed by a physician.`,
      filename: `GFR-Kidney-Report-${result.gfrFormatted}.pdf`,
    });
  };

  const handleCopy = async () => {
    if (!result) return;
    const text = `eGFR: ${result.gfrFormatted} mL/min/1.73m² (${result.stageInfo.stage} - ${result.stageInfo.label})`;
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
    const textContent = `QUICKCALC GFR & KIDNEY FUNCTION REPORT
----------------------------------------
Serum Creatinine: ${creatinine} ${creatinineUnit}
Biological Sex: ${sex === "female" ? "Female" : "Male"}
Age: ${age} years
Formula: 2021 CKD-EPI Creatinine Equation (Race-Free)

RESULTS:
Estimated GFR (eGFR): ${result.gfrFormatted} mL/min/1.73m²
Clinical Classification: ${result.stageInfo.stage} (${result.stageInfo.label})
Normal Baseline: ≥ 90 mL/min/1.73m²

CLINICAL DESCRIPTION:
${result.stageInfo.description}

IMPORTANT MEDICAL DISCLAIMER:
This calculator estimates kidney function for educational and informational purposes only. It does not constitute medical diagnosis or advice. Always consult a qualified healthcare professional or nephrologist to interpret kidney lab values.

Calculated free at QuickCalc (https://quickcalc.cloud/tools/gfr-kidney-function-calculator)`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `QuickCalc-GFR-Report-${result.gfrFormatted}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const explanationSteps = useMemo(() => {
    if (!result) return [];
    const scrNum = parseFloat(creatinine) || 0;
    const ageNum = parseInt(age, 10) || 0;
    return getGFRExplanationSteps(
      { creatinine: scrNum, creatinineUnit, age: ageNum, sex },
      result
    );
  }, [result, creatinine, creatinineUnit, age, sex]);

  // Stage gauge indicator positioning calculation
  const gaugePercent = useMemo(() => {
    if (!result) return 0;
    const gfrVal = result.gfr;
    // Map eGFR (0 to 120+) to percentage scale 0% -> 100%
    // Stage 5 (<15): 0-15%
    // Stage 4 (15-29): 15-35%
    // Stage 3b (30-44): 35-50%
    // Stage 3a (45-59): 50-65%
    // Stage 2 (60-89): 65-85%
    // Stage 1 (90+): 85-100%
    if (gfrVal >= 120) return 98;
    if (gfrVal >= 90) return 85 + ((gfrVal - 90) / 30) * 13;
    if (gfrVal >= 60) return 65 + ((gfrVal - 60) / 30) * 20;
    if (gfrVal >= 45) return 50 + ((gfrVal - 45) / 15) * 15;
    if (gfrVal >= 30) return 35 + ((gfrVal - 30) / 15) * 15;
    if (gfrVal >= 15) return 15 + ((gfrVal - 15) / 15) * 20;
    return Math.max(2, (gfrVal / 15) * 15);
  }, [result]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-6 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
          <Activity size={14} className="text-emerald-200" />
          <span>2021 CKD-EPI Race-Free Standard</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          GFR & Kidney Function Calculator
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-md mx-auto">
          Calculate estimated Glomerular Filtration Rate (eGFR) and evaluate clinical CKD stages instantly.
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Prominent Medical Disclaimer Box */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex gap-3 text-xs leading-relaxed">
          <AlertTriangle size={20} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950 dark:text-amber-100 uppercase tracking-wider text-[11px]">
              Important Medical & Clinical Notice
            </h4>
            <p>
              This calculator estimates Glomerular Filtration Rate (eGFR) for informational and educational purposes only. It is <strong>not a medical diagnosis or treatment plan</strong>. Serum creatinine levels vary based on muscle mass, hydration, diet, and medications. Results must always be reviewed by a licensed healthcare professional or nephrologist.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-5 bg-zinc-50/80 dark:bg-zinc-950/60 p-4 sm:p-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80">
          {/* Unit Toggle for Creatinine */}
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              Serum Creatinine Unit
            </label>
            <div className="inline-flex rounded-lg bg-zinc-200 dark:bg-zinc-800 p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => {
                  userOverrodeUnits.current = true;
                  if (creatinineUnit === "umol/L") {
                    const scrNum = parseFloat(creatinine);
                    if (!isNaN(scrNum)) {
                      setCreatinine((scrNum / 88.4).toFixed(2));
                    }
                  }
                  setCreatinineUnit("mg/dL");
                }}
                className={`px-3 py-1 rounded-md transition-all ${
                  creatinineUnit === "mg/dL"
                    ? "bg-white dark:bg-zinc-900 text-teal-600 dark:text-teal-400 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                mg/dL (US standard)
              </button>
              <button
                type="button"
                onClick={() => {
                  userOverrodeUnits.current = true;
                  if (creatinineUnit === "mg/dL") {
                    const scrNum = parseFloat(creatinine);
                    if (!isNaN(scrNum)) {
                      setCreatinine((scrNum * 88.4).toFixed(1));
                    }
                  }
                  setCreatinineUnit("umol/L");
                }}
                className={`px-3 py-1 rounded-md transition-all ${
                  creatinineUnit === "umol/L"
                    ? "bg-white dark:bg-zinc-900 text-teal-600 dark:text-teal-400 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                µmol/L (SI standard)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Serum Creatinine Input */}
            <div className="space-y-1.5 sm:col-span-1">
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Serum Creatinine ({creatinineUnit})
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={creatinine}
                  onChange={(e) => setCreatinine(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2.5 text-zinc-900 dark:text-white font-mono font-medium focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm"
                  placeholder={creatinineUnit === "mg/dL" ? "e.g. 1.0" : "e.g. 88.4"}
                  min="0.1"
                  max="30"
                  step="any"
                />
              </div>
            </div>

            {/* Biological Sex */}
            <div className="space-y-1.5 sm:col-span-1">
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Biological Sex
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setSex("female")}
                  className={`py-2 px-2 rounded font-medium transition-all text-center ${
                    sex === "female"
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  Female
                </button>
                <button
                  type="button"
                  onClick={() => setSex("male")}
                  className={`py-2 px-2 rounded font-medium transition-all text-center ${
                    sex === "male"
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  Male
                </button>
              </div>
            </div>

            {/* Age Input */}
            <div className="space-y-1.5 sm:col-span-1">
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Age (years)
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2.5 text-zinc-900 dark:text-white font-mono font-medium focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 text-sm"
                placeholder="e.g. 50"
                min="18"
                max="120"
                step="1"
              />
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Primary Result Display */}
            <div className="text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
              <span className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">
                Estimated Glomerular Filtration Rate (eGFR)
              </span>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono tracking-tight text-zinc-900 dark:text-white">
                  {result.gfrFormatted}
                </span>
                <span className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-medium">
                  mL/min/1.73m²
                </span>
              </div>

              {/* Stage Badge */}
              <div className="pt-1">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${result.stageInfo.badgeBg}`}
                >
                  <span className={`w-2 h-2 rounded-full ${result.stageInfo.colorClass}`} />
                  <span>{result.stageInfo.stage}: {result.stageInfo.label}</span>
                </span>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-md mx-auto pt-1 leading-relaxed">
                {result.stageInfo.description}
              </p>
            </div>

            {/* Visual Color-Coded Multi-Segment Stage Indicator Gauge */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                <span>CKD Stage Indicator</span>
                <span className="text-zinc-500 dark:text-zinc-400 font-mono">
                  {result.stageInfo.rangeText}
                </span>
              </div>

              {/* Multi-segment Gauge Bar */}
              <div className="relative pt-6 pb-2">
                {/* Pointer Marker */}
                <div
                  className="absolute top-0 -ml-2.5 transition-all duration-300 flex flex-col items-center z-10"
                  style={{ left: `${gaugePercent}%` }}
                >
                  <span className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-extrabold font-mono px-1.5 py-0.5 rounded shadow">
                    {result.gfrFormatted}
                  </span>
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-zinc-900 dark:border-t-white" />
                </div>

                {/* Gauge Segments Bar */}
                <div className="h-3.5 w-full rounded-full overflow-hidden flex bg-zinc-200 dark:bg-zinc-800">
                  <div className="w-[15%] bg-purple-600" title="Stage 5 (<15)" />
                  <div className="w-[20%] bg-rose-500" title="Stage 4 (15-29)" />
                  <div className="w-[15%] bg-orange-500" title="Stage 3b (30-44)" />
                  <div className="w-[15%] bg-amber-500" title="Stage 3a (45-59)" />
                  <div className="w-[20%] bg-teal-500" title="Stage 2 (60-89)" />
                  <div className="w-[15%] bg-emerald-500" title="Stage 1 (≥90)" />
                </div>

                {/* Stage Legend Labels */}
                <div className="grid grid-cols-6 text-[10px] text-center font-bold text-zinc-500 dark:text-zinc-400 mt-2">
                  <span className={result.stageInfo.stage === "Stage 5" ? "text-purple-600 font-extrabold" : ""}>St. 5 (&lt;15)</span>
                  <span className={result.stageInfo.stage === "Stage 4" ? "text-rose-600 font-extrabold" : ""}>St. 4 (15-29)</span>
                  <span className={result.stageInfo.stage === "Stage 3b" ? "text-orange-600 font-extrabold" : ""}>St. 3b (30-44)</span>
                  <span className={result.stageInfo.stage === "Stage 3a" ? "text-amber-600 font-extrabold" : ""}>St. 3a (45-59)</span>
                  <span className={result.stageInfo.stage === "Stage 2" ? "text-teal-600 font-extrabold" : ""}>St. 2 (60-89)</span>
                  <span className={result.stageInfo.stage === "Stage 1" ? "text-emerald-600 font-extrabold" : ""}>St. 1 (≥90)</span>
                </div>
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
            Please enter a valid serum creatinine level and age to calculate eGFR.
          </div>
        )}
      </div>

      {/* Share Modal */}
      {result && (
        <ShareResultModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          data={{
            toolName: "GFR & Kidney Function Calculator",
            toolSlug: "gfr-kidney-function-calculator",
            category: "Health & Fitness",
            resultValue: `${result.gfrFormatted} mL/min/1.73m²`,
            resultLabel: `${result.stageInfo.stage}: ${result.stageInfo.label}`,
            inputsSummary: [
              { label: "Serum Creatinine", value: `${creatinine} ${creatinineUnit}` },
              { label: "Biological Sex", value: sex === "female" ? "Female" : "Male" },
              { label: "Age", value: `${age} years` },
              { label: "Formula", value: "2021 CKD-EPI Race-Free" },
            ],
            queryParams: {
              scr: creatinine,
              u: creatinineUnit,
              a: age,
              s: sex,
            },
          }}
        />
      )}
    </div>
  );
}
