"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
import {
  calculateTextToSpeechTime,
  calculateTimeToWordCount,
  getSpeechTimeExplanationSteps,
  TextToTimeResult,
  TimeToWordsResult,
  WPM_PRESETS,
} from "@/lib/calculators/speechTimeCalculator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";
import ShareResultButton from "@/components/ShareResultButton";
import ShareResultModal from "@/components/ShareResultModal";
import { useCalculatorUrlState } from "@/hooks/useCalculatorUrlState";
import { Mic, Clock, Type, Copy, Check, FileText, ArrowRight, Sparkles } from "lucide-react";

export default function SpeechTimeWidget() {
  const [mode, setMode] = useState<"textToTime" | "timeToWords">("textToTime");
  const [text, setText] = useState<string>("");
  const [targetMinutes, setTargetMinutes] = useState<string>("5");
  const [targetSeconds, setTargetSeconds] = useState<string>("0");
  const [selectedPace, setSelectedPace] = useState<"slow" | "average" | "fast" | "custom">("average");
  const [customWpmInput, setCustomWpmInput] = useState<string>("130");

  const [textResult, setTextResult] = useState<TextToTimeResult | null>(null);
  const [timeResult, setTimeResult] = useState<TimeToWordsResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const userOverrodePace = useRef(false);

  // Active WPM number
  const activeWpm = useMemo(() => {
    if (selectedPace === "slow") return WPM_PRESETS.slow;
    if (selectedPace === "fast") return WPM_PRESETS.fast;
    if (selectedPace === "average") return WPM_PRESETS.average;
    const customVal = parseInt(customWpmInput, 10);
    return !isNaN(customVal) && customVal > 0 ? customVal : 140;
  }, [selectedPace, customWpmInput]);

  // Hydrate inputs from URL query parameters if present
  const onHydrate = useCallback((sp: URLSearchParams) => {
    const txt = sp.get("txt");
    const m = sp.get("m");
    const tm = sp.get("tm");
    const ts = sp.get("ts");
    const wpm = sp.get("wpm");

    if (m === "textToTime" || m === "timeToWords") setMode(m as "textToTime" | "timeToWords");
    if (txt) setText(txt);
    if (tm) setTargetMinutes(tm);
    if (ts) setTargetSeconds(ts);
    if (wpm) {
      userOverrodePace.current = true;
      const wpmNum = parseInt(wpm, 10);
      if (wpmNum === WPM_PRESETS.slow) setSelectedPace("slow");
      else if (wpmNum === WPM_PRESETS.average) setSelectedPace("average");
      else if (wpmNum === WPM_PRESETS.fast) setSelectedPace("fast");
      else {
        setSelectedPace("custom");
        setCustomWpmInput(wpm);
      }
    }
  }, []);

  useCalculatorUrlState(
    {
      m: mode,
      txt: mode === "textToTime" ? text : undefined,
      tm: mode === "timeToWords" ? targetMinutes : undefined,
      ts: mode === "timeToWords" ? targetSeconds : undefined,
      wpm: String(activeWpm),
    },
    onHydrate
  );

  // Real-time calculation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mode === "textToTime") {
        const res = calculateTextToSpeechTime(text, activeWpm);
        setTextResult(res);
        setTimeResult(null);
      } else {
        const mins = parseFloat(targetMinutes) || 0;
        const secs = parseFloat(targetSeconds) || 0;
        const res = calculateTimeToWordCount(mins, secs, activeWpm);
        setTimeResult(res);
        setTextResult(null);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [mode, text, targetMinutes, targetSeconds, activeWpm]);

  const handleDownloadPdf = () => {
    if (mode === "textToTime" && textResult) {
      generatePdf({
        toolName: "Words-to-Minutes / Speech Time Calculator",
        toolSlug: "speech-time-calculator",
        inputs: [
          { label: "Total Word Count", value: `${textResult.stats.words} words` },
          { label: "Selected Pace", value: `${textResult.selectedPaceWpm} WPM` },
        ],
        results: [
          { label: "Estimated Speech Duration", value: textResult.selectedPaceTime.formattedTime, isHighlight: true },
          { label: "Slow Pace (110 WPM)", value: textResult.paceBreakdown.slow.formattedTime },
          { label: "Average Pace (140 WPM)", value: textResult.paceBreakdown.average.formattedTime },
          { label: "Fast Pace (170 WPM)", value: textResult.paceBreakdown.fast.formattedTime },
        ],
        summaryNote: `Speech time estimation for ${textResult.stats.words} words across slow, average, and fast speaking paces.`,
        filename: `Speech-Time-Report-${textResult.stats.words}-words.pdf`,
      });
    } else if (mode === "timeToWords" && timeResult) {
      generatePdf({
        toolName: "Speech Length to Word Count Target",
        toolSlug: "speech-time-calculator",
        inputs: [
          { label: "Target Presentation Duration", value: timeResult.formattedDuration },
          { label: "Selected Pace", value: `${timeResult.selectedPaceWpm} WPM` },
        ],
        results: [
          { label: "Target Word Count", value: `${timeResult.selectedTargetWords} words`, isHighlight: true },
          { label: "Slow Target (110 WPM)", value: `${timeResult.paceBreakdown.slow.targetWords} words` },
          { label: "Average Target (140 WPM)", value: `${timeResult.paceBreakdown.average.targetWords} words` },
          { label: "Fast Target (170 WPM)", value: `${timeResult.paceBreakdown.fast.targetWords} words` },
        ],
        summaryNote: `Target word count breakdown for a ${timeResult.formattedDuration} presentation across multiple speaking speeds.`,
        filename: `Speech-Target-Word-Count.pdf`,
      });
    }
  };

  const handleCopy = async () => {
    let summary = "";
    if (mode === "textToTime" && textResult) {
      summary = `Speech Time Estimate (${textResult.stats.words} words):\n- ${textResult.selectedPaceTime.label}: ${textResult.selectedPaceTime.formattedTime}\n- Slow (110 WPM): ${textResult.paceBreakdown.slow.formattedTime}\n- Average (140 WPM): ${textResult.paceBreakdown.average.formattedTime}\n- Fast (170 WPM): ${textResult.paceBreakdown.fast.formattedTime}\nCalculated free at QuickCalc.cloud`;
    } else if (mode === "timeToWords" && timeResult) {
      summary = `Target Speech Word Count (${timeResult.formattedDuration}):\n- ${timeResult.selectedTargetWords} words (${timeResult.selectedPaceWpm} WPM)\n- Slow (110 WPM): ${timeResult.paceBreakdown.slow.targetWords} words\n- Average (140 WPM): ${timeResult.paceBreakdown.average.targetWords} words\n- Fast (170 WPM): ${timeResult.paceBreakdown.fast.targetWords} words\nCalculated free at QuickCalc.cloud`;
    }

    if (!summary) return;

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleExportTxt = () => {
    let textContent = "";
    if (mode === "textToTime" && textResult) {
      textContent = `QUICKCALC SPEECH TIME REPORT
-------------------------------
Input Words: ${textResult.stats.words}
Sentences: ${textResult.stats.sentences} | Paragraphs: ${textResult.stats.paragraphs}
Characters: ${textResult.stats.charsWithSpaces} (with spaces) / ${textResult.stats.charsNoSpaces} (no spaces)

ESTIMATED SPEAKING DURATION:
Selected Pace (${textResult.selectedPaceWpm} WPM): ${textResult.selectedPaceTime.formattedTime}

SPEAKING PACE BREAKDOWN:
- Slow Pace (110 WPM - Keynotes / Solemn): ${textResult.paceBreakdown.slow.formattedTime}
- Average Pace (140 WPM - Presentations / Lectures): ${textResult.paceBreakdown.average.formattedTime}
- Fast Pace (170 WPM - Podcasts / Briefings): ${textResult.paceBreakdown.fast.formattedTime}

Calculated 100% free at QuickCalc (https://quickcalc.cloud/tools/speech-time-calculator)`;
    } else if (mode === "timeToWords" && timeResult) {
      textContent = `QUICKCALC TARGET SPEECH WORD COUNT REPORT
----------------------------------------------
Target Presentation Duration: ${timeResult.formattedDuration}
Selected Speaking Pace: ${timeResult.selectedPaceWpm} WPM

TARGET WORD COUNT RECOMMENDATIONS:
- Selected Pace Target: ${timeResult.selectedTargetWords} words
- Slow Pace (110 WPM Target): ${timeResult.paceBreakdown.slow.targetWords} words
- Average Pace (140 WPM Target): ${timeResult.paceBreakdown.average.targetWords} words
- Fast Pace (170 WPM Target): ${timeResult.paceBreakdown.fast.targetWords} words

Calculated 100% free at QuickCalc (https://quickcalc.cloud/tools/speech-time-calculator)`;
    }

    if (!textContent) return;

    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `QuickCalc-Speech-Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const explanationSteps = useMemo(() => {
    return getSpeechTimeExplanationSteps(mode, textResult, timeResult);
  }, [mode, textResult, timeResult]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-700 p-6 text-white text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-2">
          <Mic size={14} className="text-teal-200" />
          <span>Speech Duration & Pacing Tool</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
          Words-to-Minutes / Speech Time Calculator
        </h3>
        <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-md mx-auto">
          Estimate presentation length from script text or calculate target word counts for time-capped speeches.
        </p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-950 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setMode("textToTime")}
            className={`py-2.5 px-3 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2 ${
              mode === "textToTime"
                ? "bg-white dark:bg-zinc-900 text-teal-600 dark:text-teal-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <Type size={16} />
            <span>(A) Text → Speech Time</span>
          </button>

          <button
            type="button"
            onClick={() => setMode("timeToWords")}
            className={`py-2.5 px-3 rounded-lg font-bold text-xs transition-all flex items-center justify-center gap-2 ${
              mode === "timeToWords"
                ? "bg-white dark:bg-zinc-900 text-teal-600 dark:text-teal-400 shadow-sm"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <Clock size={16} />
            <span>(B) Target Time → Word Count</span>
          </button>
        </div>

        {/* Speaking Pace Presets Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              Speaking Pace / Speed Preset
            </label>
            <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
              {activeWpm} WPM
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => {
                userOverrodePace.current = true;
                setSelectedPace("slow");
              }}
              className={`p-2.5 rounded-xl text-center border transition-all text-xs ${
                selectedPace === "slow"
                  ? "bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-950 dark:text-teal-200 font-bold shadow-2xs"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <span className="block font-bold">Slow</span>
              <span className="text-[10px] text-zinc-400 font-mono">110 WPM</span>
            </button>

            <button
              type="button"
              onClick={() => {
                userOverrodePace.current = true;
                setSelectedPace("average");
              }}
              className={`p-2.5 rounded-xl text-center border transition-all text-xs ${
                selectedPace === "average"
                  ? "bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-950 dark:text-teal-200 font-bold shadow-2xs"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <span className="block font-bold">Average</span>
              <span className="text-[10px] text-zinc-400 font-mono">140 WPM</span>
            </button>

            <button
              type="button"
              onClick={() => {
                userOverrodePace.current = true;
                setSelectedPace("fast");
              }}
              className={`p-2.5 rounded-xl text-center border transition-all text-xs ${
                selectedPace === "fast"
                  ? "bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-950 dark:text-teal-200 font-bold shadow-2xs"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <span className="block font-bold">Fast</span>
              <span className="text-[10px] text-zinc-400 font-mono">170 WPM</span>
            </button>

            <button
              type="button"
              onClick={() => {
                userOverrodePace.current = true;
                setSelectedPace("custom");
              }}
              className={`p-2.5 rounded-xl text-center border transition-all text-xs ${
                selectedPace === "custom"
                  ? "bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-950 dark:text-teal-200 font-bold shadow-2xs"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <span className="block font-bold">Custom</span>
              <span className="text-[10px] text-zinc-400 font-mono">{customWpmInput} WPM</span>
            </button>
          </div>

          {selectedPace === "custom" && (
            <div className="pt-2 flex items-center gap-3">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 shrink-0">
                Custom WPM Speed:
              </label>
              <input
                type="number"
                value={customWpmInput}
                onChange={(e) => setCustomWpmInput(e.target.value)}
                className="w-28 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-zinc-900 dark:text-white font-mono text-xs font-bold focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                min="30"
                max="500"
              />
              <span className="text-xs text-zinc-400">words per minute</span>
            </div>
          )}
        </div>

        {/* Inputs depending on active mode */}
        {mode === "textToTime" ? (
          /* Mode A: Text Input */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                Paste or Type Presentation Script / Speech Text
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
              rows={6}
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 text-zinc-900 dark:text-white text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 leading-relaxed font-sans"
              placeholder="Paste your speech, keynote address, presentation slides, or essay here to estimate speaking duration..."
            />

            {/* Live Text Stats Bar */}
            {textResult && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 text-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Words</span>
                  <span className="text-sm font-extrabold font-mono text-zinc-900 dark:text-white">
                    {textResult.stats.words.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Characters</span>
                  <span className="text-sm font-extrabold font-mono text-zinc-900 dark:text-white">
                    {textResult.stats.charsWithSpaces.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Sentences</span>
                  <span className="text-sm font-extrabold font-mono text-zinc-900 dark:text-white">
                    {textResult.stats.sentences.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Paragraphs</span>
                  <span className="text-sm font-extrabold font-mono text-zinc-900 dark:text-white">
                    {textResult.stats.paragraphs.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Mode B: Reverse Target Duration Input */
          <div className="bg-zinc-50/80 dark:bg-zinc-950/60 p-4 sm:p-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 space-y-3">
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Target Presentation / Speech Length
            </label>
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              <div className="space-y-1">
                <label className="block text-[11px] text-zinc-500">Minutes</label>
                <input
                  type="number"
                  value={targetMinutes}
                  onChange={(e) => setTargetMinutes(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-900 dark:text-white font-mono text-base font-bold focus:border-teal-500 focus:outline-none"
                  placeholder="5"
                  min="0"
                  max="300"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[11px] text-zinc-500">Seconds</label>
                <input
                  type="number"
                  value={targetSeconds}
                  onChange={(e) => setTargetSeconds(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-zinc-900 dark:text-white font-mono text-base font-bold focus:border-teal-500 focus:outline-none"
                  placeholder="0"
                  min="0"
                  max="59"
                />
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {mode === "textToTime" && textResult ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Primary Result Display */}
            <div className="text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
              <span className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">
                Estimated Speech Duration ({activeWpm} WPM)
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-teal-600 dark:text-teal-400 tracking-tight">
                {textResult.selectedPaceTime.formattedTime}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Calculated for {textResult.stats.words.toLocaleString()} words at {activeWpm} words per minute.
              </p>
            </div>

            {/* Side-by-Side Range Breakdown Cards (Slow vs Average vs Fast) */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-bold block">
                ⏱️ Speaking Speed Range Breakdown
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  className={`p-4 rounded-xl border text-center transition-all ${
                    selectedPace === "slow"
                      ? "bg-teal-50/80 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/20"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Slow (110 WPM)
                  </span>
                  <span className="text-xl font-extrabold font-mono text-zinc-900 dark:text-white block">
                    {textResult.paceBreakdown.slow.formattedTime}
                  </span>
                  <span className="text-[11px] text-zinc-500 block mt-1">
                    Formal Keynotes / Solemn
                  </span>
                </div>

                <div
                  className={`p-4 rounded-xl border text-center transition-all ${
                    selectedPace === "average"
                      ? "bg-teal-50/80 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/20"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Average (140 WPM)
                  </span>
                  <span className="text-xl font-extrabold font-mono text-teal-600 dark:text-teal-400 block">
                    {textResult.paceBreakdown.average.formattedTime}
                  </span>
                  <span className="text-[11px] text-zinc-500 block mt-1">
                    Business Presentations
                  </span>
                </div>

                <div
                  className={`p-4 rounded-xl border text-center transition-all ${
                    selectedPace === "fast"
                      ? "bg-teal-50/80 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/20"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Fast (170 WPM)
                  </span>
                  <span className="text-xl font-extrabold font-mono text-zinc-900 dark:text-white block">
                    {textResult.paceBreakdown.fast.formattedTime}
                  </span>
                  <span className="text-[11px] text-zinc-500 block mt-1">
                    Conversational / Podcasts
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : mode === "timeToWords" && timeResult ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Primary Result Display */}
            <div className="text-center p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2">
              <span className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-bold">
                Target Script Word Count ({activeWpm} WPM)
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold font-mono text-teal-600 dark:text-teal-400 tracking-tight">
                ~{timeResult.selectedTargetWords.toLocaleString()} words
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Recommended target word count for a {timeResult.formattedDuration} speech at {activeWpm} WPM.
              </p>
            </div>

            {/* Side-by-Side Target Word Count Range Breakdown Cards */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 font-bold block">
                🎯 Target Word Count Range by Pace
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div
                  className={`p-4 rounded-xl border text-center transition-all ${
                    selectedPace === "slow"
                      ? "bg-teal-50/80 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/20"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Slow Pace (110 WPM)
                  </span>
                  <span className="text-xl font-extrabold font-mono text-zinc-900 dark:text-white block">
                    ~{timeResult.paceBreakdown.slow.targetWords.toLocaleString()} words
                  </span>
                  <span className="text-[11px] text-zinc-500 block mt-1">
                    Formal Keynotes / Solemn
                  </span>
                </div>

                <div
                  className={`p-4 rounded-xl border text-center transition-all ${
                    selectedPace === "average"
                      ? "bg-teal-50/80 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/20"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Average Pace (140 WPM)
                  </span>
                  <span className="text-xl font-extrabold font-mono text-teal-600 dark:text-teal-400 block">
                    ~{timeResult.paceBreakdown.average.targetWords.toLocaleString()} words
                  </span>
                  <span className="text-[11px] text-zinc-500 block mt-1">
                    Business Presentations
                  </span>
                </div>

                <div
                  className={`p-4 rounded-xl border text-center transition-all ${
                    selectedPace === "fast"
                      ? "bg-teal-50/80 dark:bg-teal-950/40 border-teal-500 ring-2 ring-teal-500/20"
                      : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                    Fast Pace (170 WPM)
                  </span>
                  <span className="text-xl font-extrabold font-mono text-zinc-900 dark:text-white block">
                    ~{timeResult.paceBreakdown.fast.targetWords.toLocaleString()} words
                  </span>
                  <span className="text-[11px] text-zinc-500 block mt-1">
                    Conversational / Podcasts
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
              Need to check character limits, reading time, or keyword density for your text?
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

      {/* Share Modal */}
      {(textResult || timeResult) && (
        <ShareResultModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          data={{
            toolName: "Words-to-Minutes / Speech Time Calculator",
            toolSlug: "speech-time-calculator",
            category: "Utilities & Text Tools",
            resultValue:
              mode === "textToTime" && textResult
                ? textResult.selectedPaceTime.formattedTime
                : timeResult
                ? `~${timeResult.selectedTargetWords} words`
                : "0",
            resultLabel:
              mode === "textToTime" && textResult
                ? `Speech time for ${textResult.stats.words} words (${textResult.selectedPaceWpm} WPM)`
                : timeResult
                ? `Target word count for ${timeResult.formattedDuration} (${timeResult.selectedPaceWpm} WPM)`
                : "",
            inputsSummary: [
              {
                label: "Mode",
                value: mode === "textToTime" ? "Text to Speech Time" : "Target Duration to Words",
              },
              { label: "Speaking Pace", value: `${activeWpm} WPM` },
            ],
            queryParams:
              mode === "textToTime"
                ? { m: mode, txt: text, wpm: String(activeWpm) }
                : { m: mode, tm: targetMinutes, ts: targetSeconds, wpm: String(activeWpm) },
          }}
        />
      )}
    </div>
  );
}
