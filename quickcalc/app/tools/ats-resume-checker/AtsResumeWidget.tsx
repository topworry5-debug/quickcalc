"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  analyzeAtsResumeMatch,
  getAtsExplanationSteps,
  AtsAnalysisResult,
} from "@/lib/calculators/atsResumeCalculator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import ShareResultButton from "@/components/ShareResultButton";
import ShareResultModal from "@/components/ShareResultModal";
import { useCalculatorUrlState } from "@/hooks/useCalculatorUrlState";
import { ShieldCheck, FileCheck, Target, CheckCircle2, XCircle, AlertCircle, Copy, Check, FileText, Sparkles } from "lucide-react";

export default function AtsResumeWidget() {
  const [resumeText, setResumeText] = useState<string>("");
  const [jdText, setJdText] = useState<string>("");

  const [result, setResult] = useState<AtsAnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Hydrate from URL query parameters if present
  const onHydrate = useCallback((sp: URLSearchParams) => {
    const r = sp.get("r");
    const j = sp.get("j");
    if (r) setResumeText(r);
    if (j) setJdText(j);
  }, []);

  useCalculatorUrlState(
    {
      r: resumeText || undefined,
      j: jdText || undefined,
    },
    onHydrate
  );

  // Real-time calculation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const res = analyzeAtsResumeMatch(resumeText, jdText);
      setResult(res);
    }, 200);

    return () => clearTimeout(timer);
  }, [resumeText, jdText]);

  const handleDownloadPdf = () => {
    if (!result) return;

    generatePdf({
      toolName: "ATS Resume Score & Keyword Match Report",
      toolSlug: "ats-resume-checker",
      inputs: [
        { label: "Resume Word Count", value: `${result.resumeWordCount} words` },
        { label: "Job Description Word Count", value: `${result.jdWordCount} words` },
      ],
      results: [
        { label: "ATS Match Score", value: `${result.matchScore}%`, isHighlight: true },
        { label: "Match Tier", value: result.scoreLabel },
        { label: "Keywords Matched", value: `${result.totalMatchedKeywords} of ${result.totalJdKeywords}` },
        { label: "Missing Target Keywords", value: `${result.totalMissingKeywords} terms` },
      ],
      summaryNote: `ATS Resume Score: ${result.matchScore}%. Matched ${result.totalMatchedKeywords} out of ${result.totalJdKeywords} target keywords. 100% processed locally in browser.`,
      filename: `ATS-Resume-Score-${result.matchScore}-percent.pdf`,
    });
  };

  const handleCopy = async () => {
    if (!result) return;

    const summary = `ATS Resume Match Score: ${result.matchScore}% (${result.scoreLabel})\n- Matched Keywords (${result.totalMatchedKeywords}): ${result.matchedKeywords.map((k) => k.keyword).join(", ")}\n- Missing Target Keywords (${result.totalMissingKeywords}): ${result.missingKeywords.map((k) => k.keyword).join(", ")}\nCalculated free & 100% privately at QuickCalc.cloud`;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleExportTxt = () => {
    if (!result) return;

    const textContent = `QUICKCALC ATS RESUME CHECKER REPORT
--------------------------------------
ATS Match Score: ${result.matchScore}%
Score Tier: ${result.scoreLabel}
Resume Length: ${result.resumeWordCount} words | Job Description Length: ${result.jdWordCount} words

MATCHED KEYWORDS (${result.totalMatchedKeywords}/${result.totalJdKeywords}):
${result.matchedKeywords.map((k) => `✓ ${k.keyword} (Frequency in JD: ${k.frequencyInJd})`).join("\n") || "None"}

MISSING TARGET KEYWORDS (${result.totalMissingKeywords}):
${result.missingKeywords.map((k) => `✗ ${k.keyword} (Frequency in JD: ${k.frequencyInJd})`).join("\n") || "None"}

ATS STRUCTURE & FORMATTING CHECKLIST:
${result.structureChecks.map((c) => `${c.passed ? "✓ PASS" : "✗ MISSING"}: ${c.label} - ${c.description}`).join("\n")}

Calculated 100% free & privately at QuickCalc (https://quickcalc.cloud/tools/ats-resume-checker)`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `QuickCalc-ATS-Resume-Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const explanationSteps = useMemo(() => {
    if (!result) return [];
    return getAtsExplanationSteps(result);
  }, [result]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-6 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
          <FileCheck size={14} className="text-emerald-200" />
          <span>Instant ATS Match Auditor</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          ATS Resume Score Checker
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-md mx-auto">
          Compare your resume against job postings to find missing keywords and boost ATS scan pass rates.
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Prominent Privacy Banner */}
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-3">
          <ShieldCheck size={22} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-emerald-950 dark:text-emerald-200 uppercase tracking-wider">
              100% Client-Side Privacy Guaranteed
            </h4>
            <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5 leading-relaxed">
              Your resume text and job description <strong>never leave your browser memory</strong>. Unlike paid tools (e.g. Jobscan), zero text is uploaded to any server, database, or third party. No account or email needed.
            </p>
          </div>
        </div>

        {/* Dual Input Text Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Resume Input Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <FileCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
                <span>1. Paste Your Resume Text</span>
              </label>
              <span className="text-[11px] font-mono text-zinc-400">
                {resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0} words
              </span>
            </div>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={8}
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3.5 text-zinc-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed font-sans"
              placeholder="Paste your plain-text resume content here (Work Experience, Education, Skills)..."
            />
          </div>

          {/* Job Description Input Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <Target size={14} className="text-teal-600 dark:text-teal-400" />
                <span>2. Paste Job Description</span>
              </label>
              <span className="text-[11px] font-mono text-zinc-400">
                {jdText.trim() ? jdText.trim().split(/\s+/).length : 0} words
              </span>
            </div>
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              rows={8}
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3.5 text-zinc-900 dark:text-white text-xs focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed font-sans"
              placeholder="Paste target job posting requirements, responsibilities, and qualifications..."
            />
          </div>
        </div>

        {/* Results Dashboard */}
        {result && (resumeText.trim() || jdText.trim()) ? (
          <div className="space-y-6 animate-in fade-in duration-200 pt-2">
            {/* Primary Score Banner */}
            <div className="text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
              <span className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">
                Overall ATS Resume Match Score
              </span>
              <div className={`text-5xl sm:text-6xl font-extrabold font-mono tracking-tight ${result.scoreColor}`}>
                {result.matchScore}%
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                {result.scoreLabel}
              </div>

              {/* Progress Gauge Bar */}
              <div className="w-full max-w-md mx-auto h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mt-2">
                <div
                  className={`h-full transition-all duration-500 ${
                    result.matchScore >= 75
                      ? "bg-emerald-500"
                      : result.matchScore >= 50
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${result.matchScore}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 max-w-md mx-auto text-center pt-2">
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/60">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase block">Matched</span>
                  <span className="text-base font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                    {result.totalMatchedKeywords}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/60">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase block">Missing</span>
                  <span className="text-base font-extrabold font-mono text-amber-600 dark:text-amber-400">
                    {result.totalMissingKeywords}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase block">Total Target</span>
                  <span className="text-base font-extrabold font-mono text-zinc-900 dark:text-white">
                    {result.totalJdKeywords}
                  </span>
                </div>
              </div>
            </div>

            {/* Keyword Match Pills Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matched Keywords */}
              <div className="space-y-3 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 size={16} />
                    <span>Matched Keywords ({result.totalMatchedKeywords})</span>
                  </h4>
                  <span className="text-[11px] text-zinc-400 font-mono">Stem-matched</span>
                </div>

                {result.matchedKeywords.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {result.matchedKeywords.map((k) => (
                      <span
                        key={k.keyword}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80"
                      >
                        <Check size={12} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{k.keyword}</span>
                        <span className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70 font-mono">
                          ×{k.frequencyInJd}
                        </span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-400 italic py-2">
                    No keywords matched yet. Ensure resume and job description texts are pasted above.
                  </p>
                )}
              </div>

              {/* Actionable Missing Keywords */}
              <div className="space-y-3 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <AlertCircle size={16} />
                    <span>Missing Target Terms ({result.totalMissingKeywords})</span>
                  </h4>
                  <span className="text-[11px] text-amber-600/80 dark:text-amber-400/80 font-semibold">
                    Consider Adding
                  </span>
                </div>

                {result.missingKeywords.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {result.missingKeywords.map((k) => (
                      <span
                        key={k.keyword}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800/80"
                      >
                        <span className="font-bold text-amber-600 dark:text-amber-400">+</span>
                        <span>{k.keyword}</span>
                        <span className="text-[10px] text-amber-600/70 dark:text-amber-400/70 font-mono">
                          ×{k.frequencyInJd}
                        </span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold py-2 flex items-center gap-1">
                    <Sparkles size={14} />
                    <span>Fantastic job! All key target terms were matched in your resume.</span>
                  </p>
                )}
              </div>
            </div>

            {/* ATS Structural & Formatting Audit */}
            <div className="space-y-3 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                <FileText size={16} className="text-teal-600 dark:text-teal-400" />
                <span>ATS Structure & Formatting Audit</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {result.structureChecks.map((check) => (
                  <div
                    key={check.id}
                    className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-2.5"
                  >
                    {check.passed ? (
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                        {check.label}
                      </span>
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 block mt-0.5 leading-snug">
                        {check.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Actions Bar */}
        {result && (resumeText.trim() || jdText.trim()) && (
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
        )}

        {/* Step-by-Step Explanation Accordion */}
        {result && <ExplainResultAccordion steps={explanationSteps} />}
      </div>

      {/* Share Modal */}
      {result && (
        <ShareResultModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          data={{
            toolName: "ATS Resume Score Checker",
            toolSlug: "ats-resume-checker",
            category: "Utilities & Resume Tools",
            resultValue: `${result.matchScore}%`,
            resultLabel: `ATS Resume Match Score (${result.scoreLabel})`,
            inputsSummary: [
              { label: "Resume Length", value: `${result.resumeWordCount} words` },
              { label: "Matched Keywords", value: `${result.totalMatchedKeywords}/${result.totalJdKeywords}` },
            ],
            queryParams: {
              r: resumeText || "",
              j: jdText || "",
            },
          }}
        />
      )}
    </div>
  );
}
