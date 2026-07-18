"use client";

import { useState } from "react";
import { jsonToCsv, csvToJson } from "../../../lib/calculators/jsonCsvCalculator";

const DEFAULT_JSON = `[
  {
    "id": 1,
    "name": "Alex Carter",
    "email": "alex@example.com",
    "profile": {
      "role": "Developer",
      "city": "Seattle"
    }
  },
  {
    "id": 2,
    "name": "Jordan Vance",
    "email": "jordan@example.com",
    "profile": {
      "role": "Designer",
      "city": "Austin"
    }
  }
]`;

const DEFAULT_CSV = `id,name,email,profile.role,profile.city
1,Alex Carter,alex@example.com,Developer,Seattle
2,Jordan Vance,jordan@example.com,Designer,Austin`;

export default function JSONCSVConverterWidget() {
  const [inputVal, setInputVal] = useState<string>(DEFAULT_JSON);
  const [outputVal, setOutputVal] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleJsonToCsv = () => {
    setErrorMsg("");
    const res = jsonToCsv(inputVal);
    if (res.error) {
      setErrorMsg(`JSON Parse Error: ${res.error}`);
      setOutputVal("");
    } else {
      setOutputVal(res.csv);
    }
  };

  const handleCsvToJson = () => {
    setErrorMsg("");
    const res = csvToJson(inputVal);
    if (res.error) {
      setErrorMsg(`CSV Parse Error: ${res.error}`);
      setOutputVal("");
    } else {
      setOutputVal(res.json);
    }
  };

  const loadSample = (type: "json" | "csv") => {
    setErrorMsg("");
    setOutputVal("");
    if (type === "json") {
      setInputVal(DEFAULT_JSON);
    } else {
      setInputVal(DEFAULT_CSV);
    }
  };

  const handleCopy = async () => {
    if (!outputVal) return;
    try {
      await navigator.clipboard.writeText(outputVal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleClear = () => {
    setInputVal("");
    setOutputVal("");
    setErrorMsg("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-zinc-800 to-zinc-950 p-6 text-white text-center border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold flex items-center justify-center gap-2">
          <span>🛡️ Private JSON & CSV Converter</span>
        </h3>
        <p className="text-xs text-zinc-400 mt-1">
          Perform high-performance translations client-side with absolute data safety.
        </p>
      </div>

      {/* Security Banner */}
      <div className="bg-emerald-50 dark:bg-emerald-950/20 px-6 py-3 border-b border-emerald-200/40 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between">
        <span>🔒 Zero Server Latency: 100% of data is converted locally in your browser. Nothing is ever sent to our servers.</span>
        <span className="hidden sm:inline bg-emerald-100 dark:bg-emerald-900/50 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Local Only</span>
      </div>

      <div className="p-6 space-y-6">
        {/* Sample Loading Buttons */}
        <div className="flex flex-wrap items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Load Sample:</span>
            <button
              type="button"
              onClick={() => loadSample("json")}
              className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            >
              📄 JSON Array
            </button>
            <button
              type="button"
              onClick={() => loadSample("csv")}
              className="text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 px-3 py-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            >
              📊 CSV List
            </button>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 dark:hover:text-rose-400"
          >
            Clear Fields
          </button>
        </div>

        {/* Converter Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-2 flex flex-col">
            <div className="flex justify-between items-center">
              <label htmlFor="input-data" className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Pasted Input Source (JSON or CSV)
              </label>
              <span className="text-[10px] text-zinc-400 font-medium">Editable</span>
            </div>
            <textarea
              id="input-data"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Paste your JSON (object or array) or CSV here..."
              rows={12}
              className="block w-full font-mono text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent p-4 text-zinc-900 dark:text-white focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 resize-none flex-grow"
            />
          </div>

          {/* Output Panel */}
          <div className="space-y-2 flex flex-col">
            <div className="flex justify-between items-center">
              <label htmlFor="output-data" className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                Translated Results
              </label>
              <span className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wider">Output Read-only</span>
            </div>
            <textarea
              id="output-data"
              value={outputVal}
              readOnly
              placeholder="Your translated CSV or JSON output will render here..."
              rows={12}
              className="block w-full font-mono text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-950/20 p-4 text-zinc-900 dark:text-white focus:outline-none resize-none flex-grow"
            />
          </div>
        </div>

        {/* Inline Error Message */}
        {errorMsg && (
          <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/40 rounded-xl p-4 text-xs text-rose-600 dark:text-rose-400 font-semibold tracking-wide leading-relaxed animate-fade-in">
            🚨 {errorMsg}
          </div>
        )}

        {/* Action Button Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleJsonToCsv}
              className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition font-semibold text-xs px-5 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-500"
            >
              🔄 Convert JSON → CSV
            </button>
            <button
              type="button"
              onClick={handleCsvToJson}
              className="bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition font-semibold text-xs px-5 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-500"
            >
              🔄 Convert CSV → JSON
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            disabled={!outputVal}
            className={`flex items-center gap-2 text-xs font-semibold px-4 py-3 rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-zinc-500 ${
              outputVal
                ? "bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:shadow-sm"
                : "bg-zinc-50 dark:bg-zinc-950/20 border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed"
            }`}
          >
            {copied ? "✅ Copied!" : "📋 Copy translated output"}
          </button>
        </div>
      </div>
    </div>
  );
}
