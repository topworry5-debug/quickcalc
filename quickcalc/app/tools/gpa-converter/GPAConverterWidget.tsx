"use client";

import { useState } from "react";
import { convertToGPA, GradingSystem, GPAConverterResult } from "../../../lib/calculators/gpaConverter";

export default function GPAConverterWidget() {
  const [system, setSystem] = useState<GradingSystem>("us-percentage");
  const [gradeInput, setGradeInput] = useState<string>("85");
  const [result, setResult] = useState<GPAConverterResult | null>({
    gpa: 3.0,
    letterEquivalent: "B",
    percentageEquivalent: "83-86%",
  }); // default calculation for US Percentage 85%

  const handleConvert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gradeInput.trim()) {
      alert("Please enter a grade to convert.");
      return;
    }
    const conv = convertToGPA(system, gradeInput);
    setResult(conv);
  };

  const getPlaceholder = () => {
    switch (system) {
      case "us-letter":
        return "e.g. A, B+, C-";
      case "us-percentage":
        return "e.g. 85, 92.5";
      case "uk-letter":
        return "e.g. 1st, 2:1, 2:2, 3rd, Pass";
      case "pakistan-india-percentage":
        return "e.g. 75, 82";
      case "canada-percentage":
        return "e.g. 78, 88";
      default:
        return "Enter grade";
    }
  };

  const getHelpText = () => {
    switch (system) {
      case "us-letter":
        return "Enter letter grades like A+, A, A-, B+, B, B-, etc.";
      case "us-percentage":
        return "Enter percentage out of 100 (e.g., 90 for 90%).";
      case "uk-letter":
        return "Enter classifications: '1st', '2:1', '2:2', '3rd', or 'Pass'.";
      case "pakistan-india-percentage":
        return "Enter aggregate marks percentage (e.g., 72).";
      case "canada-percentage":
        return "Enter percentage (e.g., 84). Supports the general 4.0 standard.";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8">
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white text-center">
        <h3 className="text-xl font-bold">Universal GPA Converter</h3>
        <p className="text-xs text-emerald-100 mt-1">Convert international grades and percentages to US 4.0 GPA scale</p>
      </div>

      <form onSubmit={handleConvert} className="p-6 space-y-6">
        {/* Select Grading System */}
        <div>
          <label htmlFor="gradingSystem" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Grading System / Country Origin
          </label>
          <select
            id="gradingSystem"
            value={system}
            onChange={(e) => {
              const newSystem = e.target.value as GradingSystem;
              setSystem(newSystem);
              setGradeInput("");
              setResult(null);
            }}
            className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            <option value="us-percentage">United States (Percentage, 0-100%)</option>
            <option value="us-letter">United States (Letter Grade, A-F)</option>
            <option value="uk-letter">United Kingdom (degree classification, 1st - Pass)</option>
            <option value="pakistan-india-percentage">Pakistan / India (Percentage, 0-100%)</option>
            <option value="canada-percentage">Canada (Percentage, 0-100%)</option>
          </select>
        </div>

        {/* Input Grade */}
        <div>
          <label htmlFor="gradeInput" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Enter Your Grade / Marks
          </label>
          <input
            id="gradeInput"
            type="text"
            value={gradeInput}
            onChange={(e) => setGradeInput(e.target.value)}
            className="block w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-3 text-zinc-900 dark:text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder={getPlaceholder()}
            required
          />
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2 italic">
            {getHelpText()}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-semibold py-3.5 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
        >
          Convert Grade to GPA
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-emerald-50/30 dark:bg-emerald-950/10 p-6 text-center animate-fade-in">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium uppercase tracking-wider">
            Converted US GPA (4.0 Scale)
          </p>
          <div className="mt-4 flex flex-col items-center">
            <span className="text-5xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {result.gpa.toFixed(2)}
            </span>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">on a standard 4.00 scale</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 pt-6">
            <div className="flex flex-col items-center">
              <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Letter Grade Equiv.</span>
              <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-1">
                {result.letterEquivalent}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Percentage Band</span>
              <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200 mt-1">
                {result.percentageEquivalent}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-6 italic">
            *This is an approximate equivalence. Academic institutions around the world utilize highly varying and custom grading conversions. Refer to your targeted university admissions page for exact scale conversions.
          </p>
        </div>
      )}
    </div>
  );
}
