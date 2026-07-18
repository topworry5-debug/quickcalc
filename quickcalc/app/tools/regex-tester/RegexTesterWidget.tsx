"use client";

import { useState, useMemo } from "react";
import { testRegex, explainRegexPattern } from "../../../lib/calculators/regexCalculator";

const COMMON_PATTERNS = [
  {
    name: "✉️ Email Address",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    description: "Matches standard email formats like user@domain.com",
    sample: "Contact us at support@quickcalc.cloud or hello-world@example.org today!",
  },
  {
    name: "🌐 URL / Link",
    pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)",
    description: "Matches standard web protocols http and https.",
    sample: "Visit https://quickcalc.cloud/tools/bmi-calculator or http://example.com for more info.",
  },
  {
    name: "📞 Phone Number",
    pattern: "\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}",
    description: "Matches local and international telephone structures.",
    sample: "Call our customer line at +1 (555) 019-2834 or 123-456-7890.",
  },
  {
    name: "📅 Date (YYYY-MM-DD)",
    pattern: "\\d{4}-\\d{2}-\\d{2}",
    description: "Matches standard ISO formatted dates.",
    sample: "The system was compiled on 2026-07-17 and expires on 2027-12-31.",
  },
  {
    name: "💻 IPv4 Address",
    pattern: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b",
    description: "Matches standard local and external computer IP configurations.",
    sample: "Server is configured at localhost 127.0.0.1 and broadcast address 192.168.1.255.",
  },
];

export default function RegexTesterWidget() {
  const [pattern, setPattern] = useState<string>("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
  const [flags, setFlags] = useState<{ g: boolean; i: boolean; m: boolean }>({ g: true, i: true, m: false });
  const [testString, setTestString] = useState<string>("Contact us at support@quickcalc.cloud or hello-world@example.org today!");

  const [copiedRegex, setCopiedRegex] = useState(false);
  const [copiedMatches, setCopiedMatches] = useState(false);
  const [showPatterns, setShowPatterns] = useState(true);

  // Compute live matches
  const { matches, tokens, error } = useMemo(() => {
    return testRegex(pattern, flags, testString);
  }, [pattern, flags, testString]);

  // Compute live plain-language explanations
  const explanations = useMemo(() => {
    return explainRegexPattern(pattern);
  }, [pattern]);

  const loadPattern = (pat: string, sample: string) => {
    setPattern(pat);
    setTestString(sample);
  };

  const handleCopyRegex = async () => {
    let flagStr = "";
    if (flags.g) flagStr += "g";
    if (flags.i) flagStr += "i";
    if (flags.m) flagStr += "m";
    const fullRegex = `/${pattern}/${flagStr}`;
    try {
      await navigator.clipboard.writeText(fullRegex);
      setCopiedRegex(true);
      setTimeout(() => setCopiedRegex(false), 2000);
    } catch (err) {
      console.error("Failed to copy regex", err);
    }
  };

  const handleCopyMatches = async () => {
    if (matches.length === 0) return;
    const matchLines = matches.map((m, idx) => `Match ${idx + 1}: "${m.text}" (Char Index: ${m.index})`).join("\n");
    try {
      await navigator.clipboard.writeText(matchLines);
      setCopiedMatches(true);
      setTimeout(() => setCopiedMatches(false), 2000);
    } catch (err) {
      console.error("Failed to copy matches", err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white text-center border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold flex items-center justify-center gap-2">
          <span>🔍 Visual Regular Expression Tester</span>
        </h3>
        <p className="text-xs text-blue-100 mt-1">
          Input your pattern, toggle matching flags, and analyze matching structures in real time.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Regex Expression Inputs */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
            Regular Expression Pattern
          </label>
          <div className="flex flex-wrap gap-4 items-center bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
            <span className="text-sm font-mono text-zinc-400 font-semibold select-none">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern (e.g. [a-z]+)"
              className="flex-grow min-w-0 font-mono text-sm bg-transparent border-0 focus:outline-none focus:ring-0 text-zinc-900 dark:text-white"
            />
            <span className="text-sm font-mono text-zinc-400 font-semibold select-none">/</span>

            {/* Flags Checkboxes */}
            <div className="flex items-center gap-4 border-l border-zinc-200 dark:border-zinc-800 pl-4">
              <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer text-zinc-600 dark:text-zinc-400">
                <input
                  type="checkbox"
                  checked={flags.g}
                  onChange={(e) => setFlags({ ...flags, g: e.target.checked })}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-blue-500 focus:ring-blue-500"
                />
                <span title="Global match (g)">g</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer text-zinc-600 dark:text-zinc-400">
                <input
                  type="checkbox"
                  checked={flags.i}
                  onChange={(e) => setFlags({ ...flags, i: e.target.checked })}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-blue-500 focus:ring-blue-500"
                />
                <span title="Case-insensitive (i)">i</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer text-zinc-600 dark:text-zinc-400">
                <input
                  type="checkbox"
                  checked={flags.m}
                  onChange={(e) => setFlags({ ...flags, m: e.target.checked })}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-blue-500 focus:ring-blue-500"
                />
                <span title="Multiline (m)">m</span>
              </label>
            </div>
          </div>
        </div>

        {/* Inline Error Message */}
        {error && (
          <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-xl p-4 text-xs text-rose-600 dark:text-rose-400 font-semibold leading-relaxed animate-fade-in">
            ⚠️ {error}
          </div>
        )}

        {/* Pattern Explanation Side-car */}
        <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/40 rounded-xl p-4 space-y-2">
          <span className="text-xs font-bold text-blue-700 dark:text-blue-300 block">
            💡 Plain-Language Expression Analysis:
          </span>
          <div className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
            {explanations.map((exp, idx) => (
              <p key={idx} className="flex gap-2 items-start">
                <span>•</span>
                <span>{exp}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Test String Input & Highlights Output Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Test String Input Area */}
          <div className="space-y-2 flex flex-col">
            <label htmlFor="test-text" className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
              Pasted Test String
            </label>
            <textarea
              id="test-text"
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Insert string data to test regular expressions..."
              rows={8}
              className="block w-full font-mono text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent p-4 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none flex-grow"
            />
          </div>

          {/* Interactive Colored Matches Visualizer */}
          <div className="space-y-2 flex flex-col">
            <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
              Live Highlighted Match Map
            </label>
            <div className="block w-full font-mono text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/20 p-4 text-zinc-900 dark:text-white overflow-auto h-[164px] flex-grow leading-relaxed break-all whitespace-pre-wrap">
              {tokens.map((tok, idx) => {
                if (tok.isMatch) {
                  return (
                    <mark
                      key={idx}
                      className="bg-yellow-200 dark:bg-yellow-800/80 text-black dark:text-white px-0.5 rounded font-semibold border-b border-yellow-400/50"
                      title={`Match #${(tok.matchIndex ?? 0) + 1}`}
                    >
                      {tok.text}
                    </mark>
                  );
                }
                return <span key={idx}>{tok.text}</span>;
              })}
            </div>
          </div>
        </div>

        {/* Matches & Positional Reports Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
          <div className="text-center md:text-left md:border-r border-zinc-200 dark:border-zinc-800 md:pr-4 py-2">
            <span className="text-zinc-400 text-3xs font-bold uppercase tracking-widest block mb-1">Total Matches</span>
            <span className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{matches.length}</span>
            <span className="text-2xs text-zinc-400 font-semibold block mt-1">Hits found</span>
          </div>

          <div className="col-span-2 py-2">
            <span className="text-zinc-400 text-3xs font-bold uppercase tracking-widest block mb-1.5">Match Indexes & Segments</span>
            <div className="overflow-auto max-h-[70px] space-y-1.5 pr-2">
              {matches.length > 0 ? (
                matches.map((m, idx) => (
                  <p key={idx} className="text-2xs font-mono text-zinc-600 dark:text-zinc-400">
                    <strong className="text-blue-500">#{idx + 1}</strong>: <code className="bg-zinc-200/50 dark:bg-zinc-800 px-1 py-0.5 rounded text-zinc-800 dark:text-zinc-200 font-bold">{"\""}{m.text}{"\""}</code> at char index <code className="font-semibold text-zinc-500">{m.index}</code>
                    {m.groups.length > 0 && (
                      <span className="text-zinc-400 ml-1.5 italic">(Groups: {m.groups.map(g => `"${g}"`).join(", ")})</span>
                    )}
                  </p>
                ))
              ) : (
                <p className="text-2xs text-zinc-400 italic">No active match markers detected along the string.</p>
              )}
            </div>
          </div>
        </div>

        {/* Collapsible Common Patterns */}
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setShowPatterns(!showPatterns)}
            className="w-full bg-zinc-50 dark:bg-zinc-950 px-4 py-3 flex justify-between items-center text-xs font-bold text-zinc-700 dark:text-zinc-300 focus:outline-none"
          >
            <span>✨ Common Pattern Templates Quick-Reference</span>
            <span>{showPatterns ? "▲ Collapse" : "▼ Expand"}</span>
          </button>
          {showPatterns && (
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
              {COMMON_PATTERNS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => loadPattern(p.pattern, p.sample)}
                  className="p-3 text-left border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-400 rounded-xl transition hover:shadow-sm"
                >
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-white mb-0.5">{p.name}</h4>
                  <p className="text-[10px] text-zinc-400 leading-snug mb-1">{p.description}</p>
                  <code className="text-[9px] font-mono block bg-zinc-100 dark:bg-zinc-950 p-1 rounded text-zinc-500 overflow-hidden text-ellipsis whitespace-nowrap">
                    {p.pattern}
                  </code>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sharing Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCopyRegex}
              className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition font-semibold text-xs px-5 py-3 rounded-lg shadow-sm focus:outline-none"
            >
              {copiedRegex ? "✅ Regex Copied!" : "📋 Copy Pattern"}
            </button>
            <button
              type="button"
              onClick={handleCopyMatches}
              disabled={matches.length === 0}
              className={`font-semibold text-xs px-5 py-3 rounded-lg transition-all focus:outline-none ${
                matches.length > 0
                  ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 shadow-sm"
                  : "bg-zinc-50 dark:bg-zinc-950/20 text-zinc-400 dark:text-zinc-600 cursor-not-allowed border border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {copiedMatches ? "✅ Matches Copied!" : "📋 Copy Matches list"}
            </button>
          </div>

          <span className="text-2xs text-zinc-400 dark:text-zinc-500 italic">
            Zero configuration matching
          </span>
        </div>
      </div>
    </div>
  );
}
