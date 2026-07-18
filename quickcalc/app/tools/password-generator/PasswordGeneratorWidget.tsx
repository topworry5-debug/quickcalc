"use client";

import { useState, useEffect, useMemo } from "react";
import { generatePassword } from "../../../lib/calculators/passwordCalculator";

export default function PasswordGeneratorWidget() {
  const [length, setLength] = useState<number>(16);
  const [useUpper, setUseUpper] = useState<boolean>(true);
  const [useLower, setUseLower] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);
  const [mode, setMode] = useState<"random" | "pronounceable">("random");
  
  const [password, setPassword] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [triggerCount, setTriggerCount] = useState<number>(0);

  // Memoize password result computation
  const result = useMemo(() => {
    return generatePassword({
      length,
      useUpper,
      useLower,
      useNumbers,
      useSymbols,
      mode,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, useUpper, useLower, useNumbers, useSymbols, mode, triggerCount]);

  // Set initial password on mount or when config changes
  useEffect(() => {
    if (result.password) {
      setPassword(result.password);
    } else {
      setPassword("");
    }
  }, [result]);

  const handleGenerate = () => {
    setTriggerCount(prev => prev + 1);
  };

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy password", err);
    }
  };

  // Helper for entropy bar color
  const getStrengthStyles = (label: string) => {
    switch (label) {
      case "Very strong":
        return {
          barColor: "bg-emerald-500",
          textColor: "text-emerald-600 dark:text-emerald-400",
          bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
          borderColor: "border-emerald-200 dark:border-emerald-900/40",
        };
      case "Strong":
        return {
          barColor: "bg-blue-500",
          textColor: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-50 dark:bg-blue-950/20",
          borderColor: "border-blue-200 dark:border-blue-900/40",
        };
      case "Moderate":
        return {
          barColor: "bg-amber-500",
          textColor: "text-amber-600 dark:text-amber-400",
          bgColor: "bg-amber-50 dark:bg-amber-950/20",
          borderColor: "border-amber-200 dark:border-amber-900/40",
        };
      default:
        return {
          barColor: "bg-rose-500",
          textColor: "text-rose-600 dark:text-rose-400",
          bgColor: "bg-rose-50 dark:bg-rose-950/20",
          borderColor: "border-rose-200 dark:border-rose-900/40",
        };
    }
  };

  const styles = getStrengthStyles(result.strengthLabel);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold flex items-center justify-center gap-2">
          <span>🛡️ Secure Password Generator</span>
        </h3>
        <p className="text-xs text-blue-100 mt-1">
          Generate highly secure, cryptographically random passwords locally in your browser.
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Output Screen */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
            Generated Password
          </label>
          <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 relative">
            <input
              type="text"
              readOnly
              value={password}
              placeholder="Select config options to generate..."
              className="flex-grow font-mono text-base sm:text-lg bg-transparent border-none outline-none focus:ring-0 text-zinc-900 dark:text-white pr-10 overflow-x-auto"
            />
            <button
              type="button"
              onClick={handleCopy}
              disabled={!password}
              className={`font-semibold text-xs px-4 py-2.5 rounded-lg transition focus:outline-none shrink-0 ${
                password
                  ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
              }`}
            >
              {copied ? "✅ Copied!" : "📋 Copy"}
            </button>
          </div>
        </div>

        {/* Strength Dashboard */}
        <div className={`border rounded-xl p-4 transition duration-200 ${styles.bgColor} ${styles.borderColor}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-2xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
                Estimated Password Strength
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className={`text-xl font-extrabold ${styles.textColor}`}>
                  {result.strengthLabel}
                </span>
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  ({result.entropy} bits of entropy)
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                {result.strengthLabelExplanation}
              </p>
            </div>
            
            {/* Simple Visual Entropy Bar */}
            <div className="w-full sm:w-48 bg-zinc-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden self-stretch sm:self-center shrink-0">
              <div 
                className={`h-full transition-all duration-300 ${styles.barColor}`}
                style={{ width: `${Math.min(100, (result.entropy / 120) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Custom Configuration Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Left Column: Mode & Length */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Generation Mode
              </label>
              <div className="flex bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
                <button
                  type="button"
                  onClick={() => setMode("random")}
                  className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition-all focus:outline-none ${
                    mode === "random"
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  🎲 Full Random
                </button>
                <button
                  type="button"
                  onClick={() => setMode("pronounceable")}
                  className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition-all focus:outline-none ${
                    mode === "pronounceable"
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                  }`}
                >
                  🗣️ Pronounceable / Memorable
                </button>
              </div>
              {mode === "pronounceable" && (
                <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium leading-relaxed bg-amber-50 dark:bg-amber-950/20 p-2.5 rounded-lg border border-amber-200/40 dark:border-amber-900/40">
                  ⚠️ <strong>Memorable Mode:</strong> Syllable alternating patterns are easier to pronounce and commit to memory, but provide slightly lower mathematical security (entropy) than full-random settings at equal lengths.
                </p>
              )}
            </div>

            {/* Password Length Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="length-slider" className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                  Password Length
                </label>
                <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md border border-blue-200/30 dark:border-blue-800/30 font-mono">
                  {length} chars
                </span>
              </div>
              <input
                id="length-slider"
                type="range"
                min="6"
                max="64"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:accent-blue-400"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-bold px-1">
                <span>6 (Minimum)</span>
                <span>32 (Highly Safe)</span>
                <span>64 (Ultra Safe)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Character Pool Choices */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
              Character Options {mode === "pronounceable" && <span className="text-zinc-400 dark:text-zinc-500 font-normal">(Inactive in pronounceable mode)</span>}
            </label>
            
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 ${
              mode === "pronounceable" ? "bg-zinc-50/50 dark:bg-zinc-950/10 opacity-60 cursor-not-allowed" : "bg-zinc-50/50 dark:bg-zinc-950/25"
            }`}>
              <label className={`flex items-center gap-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300 ${mode === "pronounceable" ? "pointer-events-none" : "cursor-pointer"}`}>
                <input
                  type="checkbox"
                  disabled={mode === "pronounceable"}
                  checked={useUpper}
                  onChange={(e) => setUseUpper(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-blue-500 focus:ring-blue-500 disabled:opacity-50"
                />
                <span>Uppercase (A-Z)</span>
              </label>

              <label className={`flex items-center gap-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300 ${mode === "pronounceable" ? "pointer-events-none" : "cursor-pointer"}`}>
                <input
                  type="checkbox"
                  disabled={mode === "pronounceable"}
                  checked={useLower}
                  onChange={(e) => setUseLower(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-blue-500 focus:ring-blue-500 disabled:opacity-50"
                />
                <span>Lowercase (a-z)</span>
              </label>

              <label className={`flex items-center gap-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300 ${mode === "pronounceable" ? "pointer-events-none" : "cursor-pointer"}`}>
                <input
                  type="checkbox"
                  disabled={mode === "pronounceable"}
                  checked={useNumbers}
                  onChange={(e) => setUseNumbers(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-blue-500 focus:ring-blue-500 disabled:opacity-50"
                />
                <span>Numbers (0-9)</span>
              </label>

              <label className={`flex items-center gap-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300 ${mode === "pronounceable" ? "pointer-events-none" : "cursor-pointer"}`}>
                <input
                  type="checkbox"
                  disabled={mode === "pronounceable"}
                  checked={useSymbols}
                  onChange={(e) => setUseSymbols(e.target.checked)}
                  className="rounded border-zinc-300 dark:border-zinc-700 text-blue-500 focus:ring-blue-500 disabled:opacity-50"
                />
                <span>Symbols (!@#$...)</span>
              </label>
            </div>

            {/* Action buttons */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={mode === "random" && !useUpper && !useLower && !useNumbers && !useSymbols}
                className="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-md transition-all focus:outline-none disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 disabled:cursor-not-allowed"
              >
                🔄 Generate New Password
              </button>
            </div>
          </div>
        </div>

        {/* Inline Error Message */}
        {result.error && (
          <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-xl p-4 text-xs text-rose-600 dark:text-rose-400 font-semibold leading-relaxed animate-fade-in">
            ⚠️ {result.error}
          </div>
        )}
      </div>
    </div>
  );
}
