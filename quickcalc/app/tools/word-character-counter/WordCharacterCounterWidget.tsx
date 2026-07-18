"use client";

import React, { useState, useEffect } from "react";

export default function WordCharacterCounterWidget() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // Live calculated state
  const [counts, setCounts] = useState({
    words: 0,
    charsWithSpaces: 0,
    charsNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: "0 minutes",
    readability: "Easy"
  });

  useEffect(() => {
    if (!text.trim()) {
      setCounts({
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: "0 minutes",
        readability: "N/A"
      });
      return;
    }

    const trimmed = text.trim();

    // Word Count: split by whitespace (filtering out empty elements)
    const wordsArr = trimmed.split(/\s+/).filter(Boolean);
    const wordCount = wordsArr.length;

    // Character Counts
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;

    // Sentences: split by standard ending punctuations (. ! ?)
    const sentencesArr = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const sentenceCount = sentencesArr.length || 1; // fall back to 1 if we have typing but no period yet

    // Paragraphs: split by newline characters
    const paragraphsArr = text.split(/\n+/).filter((p) => p.trim().length > 0);
    const paragraphCount = paragraphsArr.length;

    // Reading time (200-238 words per minute)
    let readingTime = "0 minutes";
    if (wordCount > 0) {
      const minTime = wordCount / 238;
      const maxTime = wordCount / 200;
      if (maxTime < 1) {
        readingTime = "less than 1 minute";
      } else {
        const ceilMin = Math.ceil(minTime);
        const ceilMax = Math.ceil(maxTime);
        if (ceilMin === ceilMax) {
          readingTime = `about ${ceilMax} minute${ceilMax > 1 ? "s" : ""}`;
        } else {
          readingTime = `about ${ceilMin} to ${ceilMax} minutes`;
        }
      }
    }

    // Automated Readability Index (ARI)
    // ARI = 4.71 * (characters/words) + 0.5 * (words/sentences) - 21.43
    const score = 4.71 * (charsNoSpaces / Math.max(1, wordCount)) + 0.5 * (wordCount / Math.max(1, sentenceCount)) - 21.43;
    let readability = "Easy";
    if (score <= 4) {
      readability = "Elementary School Level (Easy)";
    } else if (score <= 8) {
      readability = "Middle School Level (Fairly Easy)";
    } else if (score <= 12) {
      readability = "High School Level (Standard)";
    } else if (score <= 14) {
      readability = "College Level (Difficult)";
    } else {
      readability = "Graduate Level (Very Difficult)";
    }

    setCounts({
      words: wordCount,
      charsWithSpaces,
      charsNoSpaces,
      sentences: sentenceCount,
      paragraphs: paragraphCount,
      readingTime,
      readability
    });
  }, [text]);

  const handleClear = () => {
    setText("");
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Limit indicator helper
  const getLimitStatus = (current: number, limit: number) => {
    const ratio = current / limit;
    if (ratio <= 0.7) {
      return {
        color: "text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30",
        barColor: "bg-emerald-500",
        label: "Safe"
      };
    } else if (ratio <= 1.0) {
      return {
        color: "text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30",
        barColor: "bg-amber-500",
        label: "Approaching Limit"
      };
    } else {
      return {
        color: "text-rose-600 bg-rose-50 dark:text-rose-400 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/30",
        barColor: "bg-rose-500",
        label: "Over Limit"
      };
    }
  };

  const platforms = [
    { name: "X / Twitter Post", limit: 280 },
    { name: "SMS Message", limit: 160 },
    { name: "SEO Meta Description", limit: 160 }
  ];

  return (
    <div className="space-y-8">
      {/* Input Text Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
            Enter or Paste Your Text
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              disabled={!text}
              className="px-3 py-1.5 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-lg bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {copied ? "Copied! ✓" : "Copy Text"}
            </button>
            <button
              onClick={handleClear}
              disabled={!text}
              className="px-3 py-1.5 text-xs font-semibold border border-zinc-200 dark:border-zinc-700 hover:border-rose-500 dark:hover:border-rose-500 rounded-lg bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your content here... Counts will update instantly."
          rows={8}
          className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent resize-y shadow-sm transition"
        />
      </div>

      {/* Main Multi-Metric Counts Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 text-center shadow-sm">
          <p className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            {counts.words}
          </p>
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">
            Words
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 text-center shadow-sm">
          <p className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            {counts.charsWithSpaces}
          </p>
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">
            Chars <span className="text-[10px] text-zinc-400">(with spaces)</span>
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 text-center shadow-sm">
          <p className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            {counts.charsNoSpaces}
          </p>
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">
            Chars <span className="text-[10px] text-zinc-400">(no spaces)</span>
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 text-center shadow-sm">
          <p className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            {counts.sentences}
          </p>
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">
            Sentences
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 text-center shadow-sm">
          <p className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            {counts.paragraphs}
          </p>
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">
            Paragraphs
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 text-center shadow-sm col-span-2 sm:col-span-1">
          <p className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white truncate">
            {counts.readingTime}
          </p>
          <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">
            Reading Time
          </p>
        </div>
      </div>

      {/* Dynamic Indicators: Platform Character Limits and Plain Readability score */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Readability & Details */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            Readability & Comprehension Estimate
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Calculated utilizing the Automated Readability Index (ARI) based on characters, words, and sentences ratios.
          </p>

          <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/20 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                Current Level
              </p>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200 mt-1">
                {counts.readability}
              </p>
            </div>
            <span className="text-3xl">📖</span>
          </div>

          <div className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed space-y-2">
            <p>
              <strong>Elementary Level:</strong> Easy reading for standard comprehension.
            </p>
            <p>
              <strong>Middle/High School Level:</strong> Standard general copy style. Perfect for news, blogs, and average content.
            </p>
            <p>
              <strong>College/Graduate Level:</strong> Denser prose with technical concepts or complex structures.
            </p>
          </div>
        </div>

        {/* Platform Limits Warnings */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Social Media & Platform Limits
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Live validation of character limits for popular platform posts.
            </p>
          </div>

          <div className="space-y-4">
            {platforms.map((p) => {
              const status = getLimitStatus(counts.charsWithSpaces, p.limit);
              const progressWidth = Math.min(100, (counts.charsWithSpaces / p.limit) * 100);

              return (
                <div key={p.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200">
                        {p.name}
                      </span>
                      <span className="text-xs text-zinc-400 dark:text-zinc-500 ml-2">
                        (Limit: {p.limit})
                      </span>
                    </div>

                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${status.color}`}>
                      {counts.charsWithSpaces}/{p.limit} - {status.label}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${status.barColor}`}
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
