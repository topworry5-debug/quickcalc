"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  calculateReadability,
  getReadabilityExplanationSteps,
  ReadabilityAnalysisResult,
} from "@/lib/calculators/readabilityCalculator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import ShareResultButton from "@/components/ShareResultButton";
import ShareResultModal from "@/components/ShareResultModal";
import { useCalculatorUrlState } from "@/hooks/useCalculatorUrlState";
import { BookOpen, Copy, Check, FileText, ArrowRight, Sparkles } from "lucide-react";

export default function ReadabilityWidget() {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<ReadabilityAnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Hydrate from URL query parameter
  const onHydrate = useCallback((sp: URLSearchParams) => {
    const txt = sp.get("txt");
    if (txt) setText(txt);
  }, []);

  useCalculatorUrlState(
    {
      txt: text || undefined,
    },
    onHydrate
  );

  // Real-time calculation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const res = calculateReadability(text);
      setResult(res);
    }, 150);

    return () => clearTimeout(timer);
  }, [text]);

  const handleDownloadPdf = () => {
    if (!result) return;
    const { stats, scores } = result;

    generatePdf({
      toolName: "Readability Score & Text Metrics Report",
      toolSlug: "readability-score-calculator",
      inputs: [
        { label: "Total Word Count", value: `${stats.words} words` },
        { label: "Sentence Count", value: `${stats.sentences} sentences` },
        { label: "Avg Words per Sentence", value: `${stats.wordsPerSentence}` },
      ],
      results: [
        { label: "Flesch Reading Ease", value: `${scores.fleschEase} (${scores.fleschEaseLabel})`, isHighlight: true },
        { label: "Flesch-Kincaid Grade Level", value: `${scores.fleschKincaidGrade} (${scores.fleschKincaidLabel})` },
        { label: "Gunning Fog Index", value: `${scores.gunningFogIndex} (${scores.gunningFogLabel})` },
        { label: "Complex Words", value: `${stats.complexWords} (${stats.complexWordPercentage}%)` },
      ],
      summaryNote: `Readability analysis for ${stats.words} words across Flesch Reading Ease, Flesch-Kincaid Grade Level, and Gunning Fog Index.`,
      filename: `Readability-Report-${scores.fleschEase}-Ease.pdf`,
    });
  };

  const handleCopy = async () => {
    if (!result) return;
    const { stats, scores } = result;

    const summary = `Readability Score Analysis (${stats.words} words):\n- Flesch Reading Ease: ${scores.fleschEase} (${scores.fleschEaseLabel})\n- Flesch-Kincaid Grade Level: ${scores.fleschKincaidGrade} (${scores.fleschKincaidLabel})\n- Gunning Fog Index: ${scores.gunningFogIndex} (${scores.gunningFogLabel})\nCalculated free at QuickCalc.cloud`;

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
    const { stats, scores } = result;

    const textContent = `QUICKCALC READABILITY SCORE REPORT
-----------------------------------
INPUT TEXT METRICS:
Words: ${stats.words} | Sentences: ${stats.sentences} | Paragraphs: ${stats.paragraphs}
Characters: ${stats.charactersWithSpaces} (with spaces) / ${stats.charactersNoSpaces} (no spaces)
Syllables: ${stats.syllables} | Complex Words: ${stats.complexWords} (${stats.complexWordPercentage}%)
Avg Words/Sentence: ${stats.wordsPerSentence} | Avg Syllables/Word: ${stats.syllablesPerWord}

READABILITY FORMULA RESULTS:
- Flesch Reading Ease: ${scores.fleschEase} / 100 (${scores.fleschEaseLabel})
  Interpretation: ${scores.fleschEaseDescription}

- Flesch-Kincaid Grade Level: ${scores.fleschKincaidGrade} (${scores.fleschKincaidLabel})
  Interpretation: ${scores.fleschKincaidDescription}

- Gunning Fog Index: ${scores.gunningFogIndex} (${scores.gunningFogLabel})
  Interpretation: ${scores.gunningFogDescription}

Calculated 100% free at QuickCalc (https://quickcalc.cloud/tools/readability-score-calculator)`;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `QuickCalc-Readability-Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const explanationSteps = useMemo(() => {
    if (!result) return [];
    return getReadabilityExplanationSteps(result);
  }, [result]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 p-6 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
          <BookOpen size={14} className="text-emerald-200" />
          <span>Real-Time Lexical & Grade Auditor</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Readability Score Calculator
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-md mx-auto">
          Audit text readability live with Flesch Reading Ease, Flesch-Kincaid Grade Level, and Gunning Fog Index.
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Textarea Input Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Paste or Type Your Text Content
            </label>
            {text && (
              <button
                type="button"
                onClick={() => setText("")}
                className="text-[11px] font-medium text-rose-600 dark:text-rose-400 hover:underline"
              >
                Clear Text
              </button>
            )}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={7}
            className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 text-zinc-900 dark:text-white text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed font-sans"
            placeholder="Paste your blog article, web copy, academic draft, or marketing text here to evaluate live readability scores..."
          />
        </div>

        {/* Results Section */}
        {result && result.stats.words > 0 ? (
          <div className="space-y-6 animate-in fade-in duration-200 pt-2">
            {/* Multi-Segment Flesch Reading Ease Visual Gauge Bar */}
            <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                  Flesch Reading Ease Scale (0 - 100)
                </span>
                <span className={`text-sm font-extrabold font-mono ${result.scores.fleschEaseColor}`}>
                  {result.scores.fleschEase} / 100
                </span>
              </div>

              {/* Multi-Segment Color Bar */}
              <div className="relative w-full h-4 rounded-full overflow-hidden flex">
                <div className="h-full bg-rose-500 w-[30%]" title="0-30: Very Difficult" />
                <div className="h-full bg-amber-500 w-[20%]" title="30-50: Difficult" />
                <div className="h-full bg-yellow-500 w-[10%]" title="50-60: Fairly Difficult" />
                <div className="h-full bg-emerald-400 w-[10%]" title="60-70: Standard" />
                <div className="h-full bg-teal-400 w-[10%]" title="70-80: Fairly Easy" />
                <div className="h-full bg-emerald-500 w-[10%]" title="80-90: Easy" />
                <div className="h-full bg-emerald-600 w-[10%]" title="90-100: Very Easy" />

                {/* Indicator Needle */}
                <div
                  className="absolute top-0 bottom-0 w-1.5 bg-zinc-950 dark:bg-white shadow-md transform -translate-x-1/2 transition-all duration-500"
                  style={{ left: `${Math.max(0, Math.min(100, result.scores.fleschEase))}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                <span>0 (Very Hard)</span>
                <span>50 (Fairly Difficult)</span>
                <span>70 (Web Target)</span>
                <span>100 (Very Easy)</span>
              </div>
            </div>

            {/* Primary Readability Metric Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Flesch Reading Ease */}
              <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Flesch Reading Ease
                </span>
                <div className={`text-4xl font-extrabold font-mono ${result.scores.fleschEaseColor}`}>
                  {result.scores.fleschEase}
                </div>
                <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                  {result.scores.fleschEaseLabel}
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                  {result.scores.fleschEaseDescription}
                </p>
              </div>

              {/* Card 2: Flesch-Kincaid Grade Level */}
              <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Flesch-Kincaid Grade
                </span>
                <div className="text-4xl font-extrabold font-mono text-teal-600 dark:text-teal-400">
                  {result.scores.fleschKincaidGrade}
                </div>
                <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                  {result.scores.fleschKincaidLabel}
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                  {result.scores.fleschKincaidDescription}
                </p>
              </div>

              {/* Card 3: Gunning Fog Index */}
              <div className="p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                  Gunning Fog Index
                </span>
                <div className="text-4xl font-extrabold font-mono text-cyan-600 dark:text-cyan-400">
                  {result.scores.gunningFogIndex}
                </div>
                <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                  {result.scores.gunningFogLabel}
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                  {result.scores.gunningFogDescription}
                </p>
              </div>
            </div>

            {/* Supporting Stats Grid */}
            <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block">
                📊 Detailed Lexical & Syllable Statistics
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total Words</span>
                  <span className="text-base font-extrabold font-mono text-zinc-900 dark:text-white">
                    {result.stats.words.toLocaleString()}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Sentences</span>
                  <span className="text-base font-extrabold font-mono text-zinc-900 dark:text-white">
                    {result.stats.sentences.toLocaleString()}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Avg Words/Sentence</span>
                  <span className="text-base font-extrabold font-mono text-teal-600 dark:text-teal-400">
                    {result.stats.wordsPerSentence}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Avg Syllables/Word</span>
                  <span className="text-base font-extrabold font-mono text-teal-600 dark:text-teal-400">
                    {result.stats.syllablesPerWord}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total Syllables</span>
                  <span className="text-base font-extrabold font-mono text-zinc-900 dark:text-white">
                    {result.stats.syllables.toLocaleString()}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Complex Words (3+ Syl)</span>
                  <span className="text-base font-extrabold font-mono text-amber-600 dark:text-amber-400">
                    {result.stats.complexWords.toLocaleString()}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Complex Word %</span>
                  <span className="text-base font-extrabold font-mono text-amber-600 dark:text-amber-400">
                    {result.stats.complexWordPercentage}%
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Paragraphs</span>
                  <span className="text-base font-extrabold font-mono text-zinc-900 dark:text-white">
                    {result.stats.paragraphs.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Reciprocal Internal Link Banner to Word & Character Counter */}
        <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-950 dark:text-teal-200 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <Sparkles size={18} className="text-teal-600 dark:text-teal-400 shrink-0" />
            <span>
              Need to check exact character limits, keyword frequencies, or X (Twitter) post limits?
            </span>
          </div>
          <Link
            href="/tools/word-character-counter"
            className="inline-flex items-center gap-1 font-bold text-teal-600 dark:text-teal-400 hover:underline shrink-0"
          >
            <span>Word Counter</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* Actions Bar */}
        {result && result.stats.words > 0 && (
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

        {/* Step-by-Step Mathematical Explanation Accordion */}
        {result && result.stats.words > 0 && (
          <ExplainResultAccordion steps={explanationSteps} />
        )}
      </div>

      {/* Share Modal */}
      {result && result.stats.words > 0 && (
        <ShareResultModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          data={{
            toolName: "Readability Score Calculator",
            toolSlug: "readability-score-calculator",
            category: "Utilities & Text Tools",
            resultValue: `${result.scores.fleschEase} / 100`,
            resultLabel: `Flesch Reading Ease (${result.scores.fleschEaseLabel})`,
            inputsSummary: [
              { label: "Total Word Count", value: `${result.stats.words} words` },
              { label: "Grade Level", value: result.scores.fleschKincaidLabel },
            ],
            queryParams: {
              txt: text,
            },
          }}
        />
      )}
    </div>
  );
}
