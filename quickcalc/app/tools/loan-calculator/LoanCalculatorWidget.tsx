"use client";

import { useState, useMemo } from "react";
import { calculateLoan, getLoanExplanationSteps, LoanResult } from "../../../lib/calculators/loanCalculator";
import { generatePdf } from "@/lib/utils/downloadPdf";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import ExplainResultAccordion from "@/components/ExplainResultAccordion";

export default function LoanCalculatorWidget() {
  const [principal, setPrincipal] = useState<string>("100000");
  const [annualRate, setAnnualRate] = useState<string>("7.5");
  const [tenure, setTenure] = useState<string>("5");
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");
  const [copied, setCopied] = useState<boolean>(false);

  const [result, setResult] = useState<LoanResult | null>({
    monthlyEMI: 2003.79,
    totalInterestPayable: 20227.4,
    totalPayment: 120227.4,
    amortizationTable: [
      { yearNumber: 1, startingBalance: 100000, principalPaid: 17144.91, interestPaid: 7293.12, totalPaid: 24438.03, endingBalance: 82855.09 },
      { yearNumber: 2, startingBalance: 82855.09, principalPaid: 18475.29, interestPaid: 5962.74, totalPaid: 24438.03, endingBalance: 64379.80 },
      { yearNumber: 3, startingBalance: 64379.80, principalPaid: 19909.11, interestPaid: 4528.92, totalPaid: 24438.03, endingBalance: 44470.69 },
      { yearNumber: 4, startingBalance: 44470.69, principalPaid: 21453.60, interestPaid: 2984.43, totalPaid: 24438.03, endingBalance: 23017.09 },
      { yearNumber: 5, startingBalance: 23017.09, principalPaid: 23017.09, interestPaid: 1326.69, totalPaid: 24343.78, endingBalance: 0 }
    ]
  });

  const handleCopy = async () => {
    if (!result) return;
    const amountStr = parseFloat(principal).toLocaleString();
    const summaryText = `QuickCalc Loan / EMI Summary:
- Loan Principal: $${amountStr}
- Annual Interest Rate: ${annualRate}%
- Tenure: ${tenure} ${tenureUnit}
- Monthly Payment (EMI): $${result.monthlyEMI.toFixed(2)}
- Total Interest Payable: $${result.totalInterestPayable.toFixed(2)}
- Total Payment: $${result.totalPayment.toFixed(2)}
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
    if (!result) return;
    const numAmount = parseFloat(principal) || 0;
    const numRate = parseFloat(annualRate) || 0;
    const numTenure = parseFloat(tenure) || 0;

    const emiStr = result.monthlyEMI.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const interestStr = result.totalInterestPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const totalStr = result.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    generatePdf({
      toolName: "Loan / EMI Calculator",
      toolSlug: "loan-calculator",
      inputs: [
        { label: "Loan Amount", value: `$${numAmount.toLocaleString()}` },
        { label: "Annual Interest Rate", value: `${numRate}%` },
        { label: "Loan Tenure", value: `${numTenure} ${tenureUnit}` },
      ],
      results: [
        { label: "Monthly EMI", value: `$${emiStr}`, isHighlight: true },
        { label: "Total Interest", value: `$${interestStr}` },
        { label: "Total Payment", value: `$${totalStr}` },
      ],
      summaryNote: `Loan breakdown for $${numAmount.toLocaleString()} borrowed at ${numRate}% annual interest over ${numTenure} ${tenureUnit}.`,
      table: {
        title: "Year-by-Year Amortization Schedule",
        headers: ["Year", "Starting Balance", "Principal Paid", "Interest Paid", "Ending Balance"],
        rows: result.amortizationTable.map((row) => [
          `Year ${row.yearNumber}`,
          `$${row.startingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          `$${row.principalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          `$${row.interestPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          `$${row.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
        ]),
      },
      filename: `Loan-EMI-Summary-${numAmount}.pdf`,
    });
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const principalNum = parseFloat(principal);
    const rateNum = parseFloat(annualRate);
    const tenureNum = parseFloat(tenure);

    if (isNaN(principalNum) || principalNum <= 0) {
      alert("Please enter a valid loan amount greater than 0.");
      return;
    }
    if (isNaN(rateNum) || rateNum < 0) {
      alert("Please enter a valid interest rate (0% or greater).");
      return;
    }
    if (isNaN(tenureNum) || tenureNum <= 0) {
      alert("Please enter a valid tenure greater than 0.");
      return;
    }

    const calculation = calculateLoan({
      principal: principalNum,
      annualRate: rateNum,
      tenure: tenureNum,
      tenureUnit,
    });
    setResult(calculation);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(val);
  };

  const explanationSteps = useMemo(() => {
    if (!result) return [];
    const pNum = parseFloat(principal) || 0;
    const rNum = parseFloat(annualRate) || 0;
    const tNum = parseFloat(tenure) || 0;
    return getLoanExplanationSteps(
      { principal: pNum, annualRate: rNum, tenure: tNum, tenureUnit },
      result
    );
  }, [result, principal, annualRate, tenure, tenureUnit]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-6 text-white text-center">
        <h3 className="text-xl font-bold">Loan / EMI Calculator</h3>
        <p className="text-xs text-teal-100 mt-1">Calculate monthly payments, total interest, and view amortization schedule</p>
      </div>

      <form onSubmit={handleCalculate} className="p-6 space-y-6">
        {/* Principal Amount */}
        <div>
          <label htmlFor="principal" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Loan Amount (Principal)
          </label>
          <div className="relative rounded-lg shadow-sm">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-zinc-500">$</span>
            <input
              id="principal"
              type="number"
              min="1"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full pl-8 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="e.g. 250000"
            />
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label htmlFor="rate" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Annual Interest Rate (%)
          </label>
          <div className="relative rounded-lg shadow-sm">
            <input
              id="rate"
              type="number"
              step="0.01"
              min="0"
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
              className="w-full pl-4 pr-8 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="e.g. 6.5"
            />
            <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500">%</span>
          </div>
        </div>

        {/* Tenure */}
        <div>
          <label htmlFor="tenure" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Loan Duration (Tenure)
          </label>
          <div className="flex rounded-lg shadow-sm">
            <input
              id="tenure"
              type="number"
              min="1"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full pl-4 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-y border-l border-zinc-300 dark:border-zinc-700 rounded-l-lg text-zinc-900 dark:text-white font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none"
              placeholder="e.g. 30"
            />
            <div className="flex">
              <button
                type="button"
                onClick={() => setTenureUnit("years")}
                className={`px-3 py-3 border-y border-zinc-300 dark:border-zinc-700 font-medium text-xs transition-colors ${
                  tenureUnit === "years"
                    ? "bg-teal-50 border-teal-500 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400"
                    : "bg-zinc-50 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-100"
                }`}
              >
                years
              </button>
              <button
                type="button"
                onClick={() => setTenureUnit("months")}
                className={`px-3 py-3 border-r border-y rounded-r-lg border-zinc-300 dark:border-zinc-700 font-medium text-xs transition-colors ${
                  tenureUnit === "months"
                    ? "bg-teal-50 border-teal-500 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400"
                    : "bg-zinc-50 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-100"
                }`}
              >
                months
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 text-white font-semibold py-3.5 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
        >
          Calculate Loan Payments
        </button>
      </form>

      {/* Result Display */}
      {result && (
        <div className="border-t border-zinc-200 dark:border-zinc-800 bg-teal-50/10 dark:bg-teal-950/5">
          {/* Main figures */}
          <div className="p-6 text-center">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium uppercase tracking-wider">
              Your Estimated Monthly Payment
            </p>
            <div className="mt-4 flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-teal-600 dark:text-teal-400">
                {formatCurrency(result.monthlyEMI)}
              </span>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">Monthly EMI principal + interest</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 border-t border-zinc-200 dark:border-zinc-800 pt-6">
              <div className="flex flex-col items-center">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total Interest Payable</span>
                <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-1">
                  {formatCurrency(result.totalInterestPayable)}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">Total Payment (Principal + Int)</span>
                <span className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mt-1">
                  {formatCurrency(result.totalPayment)}
                </span>
              </div>
            </div>

            {/* Step-by-Step Explanation Accordion */}
            <ExplainResultAccordion steps={explanationSteps} />
          </div>

          {/* Amortization Table */}
          {result.amortizationTable.length > 0 && (
            <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
              <h4 className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-4 uppercase tracking-wider">
                Year-by-Year Amortization Schedule
              </h4>
              <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
                <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-xs text-left">
                  <thead className="bg-zinc-50 dark:bg-zinc-800/40 text-zinc-500 dark:text-zinc-400 font-semibold">
                    <tr>
                      <th className="px-4 py-3">Year</th>
                      <th className="px-4 py-3">Starting Balance</th>
                      <th className="px-4 py-3">Principal Paid</th>
                      <th className="px-4 py-3">Interest Paid</th>
                      <th className="px-4 py-3 font-medium">Ending Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-300">
                    {result.amortizationTable.map((year) => (
                      <tr key={year.yearNumber} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition">
                        <td className="px-4 py-3 font-semibold text-zinc-800 dark:text-zinc-100">Year {year.yearNumber}</td>
                        <td className="px-4 py-3">{formatCurrency(year.startingBalance)}</td>
                        <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400 font-medium">-{formatCurrency(year.principalPaid)}</td>
                        <td className="px-4 py-3 text-amber-600 dark:text-amber-400">-{formatCurrency(year.interestPaid)}</td>
                        <td className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">{formatCurrency(year.endingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-200 hover:scale-[1.02] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 rounded-lg hover:shadow-sm focus:ring-1 focus:ring-teal-500 focus:outline-none"
            >
              {copied ? "✅ Copied Summary!" : "📋 Copy Loan Summary"}
            </button>

            <DownloadPdfButton onClick={handleDownloadPdf} />
          </div>
        </div>
      )}
    </div>
  );
}
