"use client";

import { useState, useMemo } from "react";
import { calculateRetirement, getRetirementExplanationSteps } from "@/lib/calculators/retirementCalculator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";

export default function RetirementCalculatorWidget() {
  const [currentAge, setCurrentAge] = useState<string>("30");
  const [retirementAge, setRetirementAge] = useState<string>("65");
  const [currentSavings, setCurrentSavings] = useState<string>("10000");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("500");
  const [annualReturn, setAnnualReturn] = useState<string>("7");
  const [annualSalaryGrowth, setAnnualSalaryGrowth] = useState<string>("0");

  const [copied, setCopied] = useState<boolean>(false);
  const [showTable, setShowTable] = useState<boolean>(false);

  // Parse numeric values
  const numCurrentAge = parseFloat(currentAge) || 0;
  const numRetirementAge = parseFloat(retirementAge) || 0;
  const numCurrentSavings = parseFloat(currentSavings) || 0;
  const numMonthlyContribution = parseFloat(monthlyContribution) || 0;
  const numAnnualReturn = parseFloat(annualReturn) || 0;
  const numAnnualSalaryGrowth = parseFloat(annualSalaryGrowth) || 0;

  const isInvalidAge = numRetirementAge <= numCurrentAge;

  const results = useMemo(() => {
    return calculateRetirement(
      numCurrentAge,
      numRetirementAge,
      numCurrentSavings,
      numMonthlyContribution,
      numAnnualReturn,
      numAnnualSalaryGrowth
    );
  }, [
    numCurrentAge,
    numRetirementAge,
    numCurrentSavings,
    numMonthlyContribution,
    numAnnualReturn,
    numAnnualSalaryGrowth,
  ]);

  const { currentPlan, earlier5Years, later5Years } = results;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const explanationSteps = useMemo(() => {
    if (isInvalidAge) return [];
    return getRetirementExplanationSteps(
      {
        currentAge: numCurrentAge,
        retirementAge: numRetirementAge,
        currentSavings: numCurrentSavings,
        monthlyContribution: numMonthlyContribution,
        annualReturn: numAnnualReturn,
        annualSalaryGrowth: numAnnualSalaryGrowth,
      },
      results
    );
  }, [
    isInvalidAge,
    numCurrentAge,
    numRetirementAge,
    numCurrentSavings,
    numMonthlyContribution,
    numAnnualReturn,
    numAnnualSalaryGrowth,
    results,
  ]);

  const handleCopy = async () => {
    if (isInvalidAge) return;

    const summaryText = `QuickCalc Retirement Projection Summary:
- Current Age: ${numCurrentAge} | Target Retirement Age: ${numRetirementAge}
- Initial Savings: ${formatCurrency(numCurrentSavings)}
- Monthly Contribution: ${formatCurrency(numMonthlyContribution)} (${numAnnualSalaryGrowth}% annual growth)
- Expected Return: ${numAnnualReturn}% per year
--------------------------------------------------
- Total Contributed: ${formatCurrency(currentPlan.totalContributed)} (${currentPlan.contributionPercent}%)
- Total Growth Earned: ${formatCurrency(currentPlan.totalGrowth)} (${currentPlan.growthPercent}%)
- PROJECTED RETIREMENT BALANCE: ${formatCurrency(currentPlan.projectedTotal)}
--------------------------------------------------
Calculated 100% free on QuickCalc.cloud`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy summary", err);
    }
  };

  const handleDownloadPdf = () => {
    if (isInvalidAge || !currentPlan) return;

    generatePdf({
      toolName: "Retirement Calculator",
      toolSlug: "retirement-calculator",
      inputs: [
        { label: "Current Age", value: `${numCurrentAge}` },
        { label: "Target Retirement Age", value: `${numRetirementAge}` },
        { label: "Current Savings", value: formatCurrency(numCurrentSavings) },
        { label: "Monthly Contribution", value: `${formatCurrency(numMonthlyContribution)} (${numAnnualSalaryGrowth}% growth)` },
        { label: "Expected Return Rate", value: `${numAnnualReturn}%` },
      ],
      results: [
        { label: "Projected Nest Egg", value: formatCurrency(currentPlan.projectedTotal), isHighlight: true },
        { label: "Total Contributed", value: `${formatCurrency(currentPlan.totalContributed)} (${currentPlan.contributionPercent}%)` },
        { label: "Total Growth Earned", value: `${formatCurrency(currentPlan.totalGrowth)} (${currentPlan.growthPercent}%)` },
      ],
      summaryNote: `At age ${numRetirementAge}, your projected retirement nest egg is ${formatCurrency(currentPlan.projectedTotal)} after ${currentPlan.yearsCount} compounding years.`,
      table: {
        title: "Year-by-Year Growth Schedule",
        headers: ["Year", "Age", "Monthly Pmt", "Yearly Added", "Yearly Growth", "End Balance"],
        rows: currentPlan.yearlyData.map((row) => [
          `Year ${row.year}`,
          `Age ${row.age}`,
          formatCurrency(row.monthlyContribution),
          formatCurrency(row.contributionsThisYear),
          `+${formatCurrency(row.growthThisYear)}`,
          formatCurrency(row.endBalance),
        ]),
      },
      filename: `Retirement-Projection-Age${numRetirementAge}.pdf`,
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Widget Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white text-center">
        <h2 className="text-xl sm:text-2xl font-extrabold">Retirement Savings Calculator</h2>
        <p className="text-emerald-100 text-sm mt-1">
          Instant compounding wealth projections &bull; Zero sign-up &bull; 100% Private
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Input Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Current Age */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
              Current Age
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl font-semibold text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>

          {/* Target Retirement Age */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
              Target Retirement Age
            </label>
            <input
              type="number"
              min="1"
              max="110"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl font-semibold text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>

          {/* Current Retirement Savings */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
              Current Retirement Savings ($)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-zinc-400 font-bold">$</span>
              <input
                type="number"
                min="0"
                step="500"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                className="w-full pl-8 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl font-semibold text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Monthly Contribution */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
              Monthly Contribution ($)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-zinc-400 font-bold">$</span>
              <input
                type="number"
                min="0"
                step="50"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full pl-8 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl font-semibold text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Expected Annual Return */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
              Expected Annual Return (%)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="25"
                step="0.5"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl font-semibold text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
              <span className="absolute right-4 top-3.5 text-zinc-400 font-bold">%</span>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1">
              Historical stock market average is ~7&ndash;8%. Real returns vary annually.
            </p>
          </div>

          {/* Expected Salary / Contribution Growth */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-2">
              Annual Contribution Increase (%)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="15"
                step="0.5"
                value={annualSalaryGrowth}
                onChange={(e) => setAnnualSalaryGrowth(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl font-semibold text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
              <span className="absolute right-4 top-3.5 text-zinc-400 font-bold">%</span>
            </div>
            <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-1">
              Optional. Increase contributions yearly as your income grows.
            </p>
          </div>
        </div>

        {/* Invalid Age Warning */}
        {isInvalidAge ? (
          <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-center text-amber-800 dark:text-amber-300 text-sm font-medium">
            ⚠️ Target retirement age ({numRetirementAge}) must be greater than your current age ({numCurrentAge}) to calculate future growth projections.
          </div>
        ) : (
          <>
            {/* Primary Three Output Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
              {/* Total Contributed */}
              <div className="bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 p-4 rounded-xl text-center">
                <span className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Total Contributed
                </span>
                <span className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400">
                  {formatCurrency(currentPlan.totalContributed)}
                </span>
                <span className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mt-1">
                  {currentPlan.contributionPercent}% of final balance
                </span>
              </div>

              {/* Total Growth Earned */}
              <div className="bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 p-4 rounded-xl text-center">
                <span className="block text-xs font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">
                  Investment Growth
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(currentPlan.totalGrowth)}
                </span>
                <span className="block text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 mt-1">
                  {currentPlan.growthPercent}% of final balance
                </span>
              </div>

              {/* Projected Total */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-300 dark:border-emerald-800 p-4 rounded-xl text-center">
                <span className="block text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">
                  Projected at Age {numRetirementAge}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-300">
                  {formatCurrency(currentPlan.projectedTotal)}
                </span>
                <span className="block text-[11px] font-semibold text-emerald-700/80 dark:text-emerald-400/80 mt-1">
                  In {currentPlan.yearsCount} compounding years
                </span>
              </div>
            </div>

            {/* Visual Contribution vs Growth Proportion Split */}
            <div className="space-y-2 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-blue-600 dark:text-blue-400">
                  Your Contributions: {currentPlan.contributionPercent}% ({formatCurrency(currentPlan.totalContributed)})
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  Compound Growth: {currentPlan.growthPercent}% ({formatCurrency(currentPlan.totalGrowth)})
                </span>
              </div>
              <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${currentPlan.contributionPercent}%` }}
                  className="h-full bg-blue-500 transition-all duration-500"
                  title={`Contributions: ${currentPlan.contributionPercent}%`}
                />
                <div
                  style={{ width: `${currentPlan.growthPercent}%` }}
                  className="h-full bg-emerald-500 transition-all duration-500"
                  title={`Investment Growth: ${currentPlan.growthPercent}%`}
                />
              </div>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 text-center font-medium">
                {currentPlan.growthPercent > 50
                  ? "🔥 Investment growth makes up the majority of your final nest egg thanks to compounding!"
                  : "💡 Keep contributing regularly—over longer timelines, investment returns will eventually surpass your contributions."}
              </p>
            </div>

            {/* "What If" Comparison: 5 Years Earlier vs 5 Years Later */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  ⚡ What-If Scenario Comparison: Starting 5 Years Earlier vs. Later
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 5 Years Earlier */}
                <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 p-4 rounded-xl text-center space-y-1">
                  <span className="inline-block bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Start 5 Years Earlier (Age {Math.max(18, numCurrentAge - 5)})
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 pt-1">
                    Compounding: <strong>{earlier5Years.yearsCount} years</strong>
                  </p>
                  <p className="text-lg font-black text-emerald-700 dark:text-emerald-300">
                    {formatCurrency(earlier5Years.projectedTotal)}
                  </p>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    + {formatCurrency(earlier5Years.projectedTotal - currentPlan.projectedTotal)} extra!
                  </p>
                </div>

                {/* Current Plan */}
                <div className="bg-white dark:bg-zinc-800 border-2 border-emerald-500 p-4 rounded-xl text-center space-y-1 shadow-md">
                  <span className="inline-block bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Current Plan (Age {numCurrentAge})
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 pt-1">
                    Compounding: <strong>{currentPlan.yearsCount} years</strong>
                  </p>
                  <p className="text-lg font-black text-zinc-900 dark:text-white">
                    {formatCurrency(currentPlan.projectedTotal)}
                  </p>
                  <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                    Baseline Projection
                  </p>
                </div>

                {/* 5 Years Later */}
                <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 p-4 rounded-xl text-center space-y-1">
                  <span className="inline-block bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Start 5 Years Later (Age {numCurrentAge + 5})
                  </span>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 pt-1">
                    Compounding: <strong>{later5Years.yearsCount} years</strong>
                  </p>
                  <p className="text-lg font-black text-amber-700 dark:text-amber-400">
                    {formatCurrency(later5Years.projectedTotal)}
                  </p>
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-400">
                    - {formatCurrency(currentPlan.projectedTotal - later5Years.projectedTotal)} lost
                  </p>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                  {copied ? "✓ Summary Copied!" : "📋 Copy Projection Summary"}
                </button>
                <DownloadPdfButton onClick={handleDownloadPdf} className="py-2.5 px-4 text-sm rounded-xl" />
              </div>

              <button
                onClick={() => setShowTable(!showTable)}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                {showTable ? "Hide Year-by-Year Table ▲" : "View Year-by-Year Growth Table ▼"}
              </button>
            </div>

            {/* Step-by-Step Explanation Accordion */}
            <ExplainResultAccordion steps={explanationSteps} />

            {/* Year-by-Year Growth Table */}
            {showTable && currentPlan.yearlyData.length > 0 && (
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 space-y-3">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  Year-by-Year Compounding Growth Schedule
                </h3>
                <div className="overflow-x-auto max-h-96 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left text-xs text-zinc-700 dark:text-zinc-300 border-collapse">
                    <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold sticky top-0">
                      <tr>
                        <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Year</th>
                        <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Age</th>
                        <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Monthly Pmt</th>
                        <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Yearly Added</th>
                        <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Yearly Growth</th>
                        <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Total Contributed</th>
                        <th className="p-2.5 border-b border-zinc-200 dark:border-zinc-700">Year-End Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                      {currentPlan.yearlyData.map((row) => (
                        <tr key={row.year} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                          <td className="p-2.5 font-medium">{row.year}</td>
                          <td className="p-2.5 font-bold text-zinc-900 dark:text-white">{row.age}</td>
                          <td className="p-2.5">{formatCurrency(row.monthlyContribution)}</td>
                          <td className="p-2.5">{formatCurrency(row.contributionsThisYear)}</td>
                          <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-medium">
                            +{formatCurrency(row.growthThisYear)}
                          </td>
                          <td className="p-2.5 text-blue-600 dark:text-blue-400">
                            {formatCurrency(row.cumulativeContributions)}
                          </td>
                          <td className="p-2.5 font-black text-zinc-900 dark:text-white">
                            {formatCurrency(row.endBalance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
