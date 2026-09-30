"use client";

import React, { useState, useMemo } from "react";
import {
  DebtItem,
  DEFAULT_DEBTS,
  calculateDebtComparison,
  formatCurrency,
} from "@/lib/debtCalculator";
import {
  Plus,
  Trash2,
  TrendingDown,
  DollarSign,
  Calendar,
  Trophy,
  Zap,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";

export default function DebtSnowballVsAvalancheWidget() {
  const [debts, setDebts] = useState<DebtItem[]>(DEFAULT_DEBTS);
  const [extraPayment, setExtraPayment] = useState<number>(300);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"comparison" | "snowball" | "avalanche">("comparison");

  // New debt input modal / inline form state
  const [newDebtName, setNewDebtName] = useState("");
  const [newDebtBalance, setNewDebtBalance] = useState("");
  const [newDebtRate, setNewDebtRate] = useState("");
  const [newDebtMin, setNewDebtMin] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Recalculate
  const comparison = useMemo(() => {
    return calculateDebtComparison(debts, extraPayment);
  }, [debts, extraPayment]);

  // Handlers for Debt Management
  const handleAddDebt = (e: React.FormEvent) => {
    e.preventDefault();
    const balance = parseFloat(newDebtBalance);
    const rate = parseFloat(newDebtRate);
    const min = parseFloat(newDebtMin);

    if (!newDebtName.trim() || isNaN(balance) || balance <= 0) return;

    const newDebt: DebtItem = {
      id: `debt-${Date.now()}`,
      name: newDebtName.trim(),
      balance: Math.round(balance),
      interestRate: isNaN(rate) ? 0 : Math.max(0, rate),
      minimumPayment: isNaN(min) || min <= 0 ? Math.max(25, Math.round(balance * 0.02)) : Math.round(min),
    };

    setDebts((prev) => [...prev, newDebt]);
    setNewDebtName("");
    setNewDebtBalance("");
    setNewDebtRate("");
    setNewDebtMin("");
    setShowAddForm(false);
  };

  const handleDeleteDebt = (id: string) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  };

  const handleUpdateDebt = (id: string, field: keyof DebtItem, value: number | string) => {
    setDebts((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          return {
            ...d,
            [field]: typeof value === "number" ? Math.max(0, value) : value,
          };
        }
        return d;
      })
    );
  };

  const handleResetDefaults = () => {
    setDebts(DEFAULT_DEBTS);
    setExtraPayment(300);
    setShowAddForm(false);
  };

  const handleLoadCreditCardPreset = () => {
    setDebts([
      { id: "cc-1", name: "High-APR Card", balance: 3400, interestRate: 28.99, minimumPayment: 110 },
      { id: "cc-2", name: "Balance Transfer Card", balance: 6200, interestRate: 18.24, minimumPayment: 160 },
      { id: "cc-3", name: "Department Store Card", balance: 1100, interestRate: 29.99, minimumPayment: 45 },
    ]);
    setExtraPayment(250);
  };

  const handleLoadMixedPreset = () => {
    setDebts([
      { id: "mix-1", name: "Credit Card", balance: 4500, interestRate: 22.99, minimumPayment: 120 },
      { id: "mix-2", name: "Used Car Loan", balance: 14000, interestRate: 7.25, minimumPayment: 310 },
      { id: "mix-3", name: "Student Loan A", balance: 8000, interestRate: 5.50, minimumPayment: 95 },
      { id: "mix-4", name: "Medical Bill", balance: 750, interestRate: 0.00, minimumPayment: 50 },
    ]);
    setExtraPayment(400);
  };

  const extraPresets = [50, 100, 200, 300, 500];

  return (
    <div className="space-y-8">
      {/* SECTION 1: INTERACTIVE DEBT MANAGER */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Step 1: Your Debt Portfolio</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mt-1">
              Add &amp; Customize Your Debts
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Enter your current credit cards, auto loans, student loans, or medical debts.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleLoadCreditCardPreset}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              Credit Cards Preset
            </button>
            <button
              type="button"
              onClick={handleLoadMixedPreset}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
            >
              Mixed Loans Preset
            </button>
            <button
              type="button"
              onClick={handleResetDefaults}
              title="Reset to default sample debts"
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Warnings Banner if any minimum payment is below monthly interest */}
        {comparison.warnings.length > 0 && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Negative Amortization Warning</span>
            </div>
            {comparison.warnings.map((w, idx) => (
              <p key={idx} className="leading-relaxed">
                {w}
              </p>
            ))}
          </div>
        )}

        {/* Debts Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-separate border-spacing-y-2">
            <thead>
              <tr className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                <th className="py-2 px-3">Debt Name</th>
                <th className="py-2 px-3">Balance ($)</th>
                <th className="py-2 px-3">Interest Rate (APR %)</th>
                <th className="py-2 px-3">Min. Payment ($/mo)</th>
                <th className="py-2 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {debts.map((debt) => (
                <tr
                  key={debt.id}
                  className="bg-zinc-50 dark:bg-zinc-800/40 hover:bg-zinc-100/80 dark:hover:bg-zinc-800 rounded-2xl transition-colors"
                >
                  <td className="py-2.5 px-3 rounded-l-2xl font-medium text-zinc-900 dark:text-white">
                    <input
                      type="text"
                      value={debt.name}
                      onChange={(e) => handleUpdateDebt(debt.id, "name", e.target.value)}
                      className="bg-transparent border-0 font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded px-1.5 py-0.5 w-full max-w-[180px]"
                      placeholder="e.g. Card Name"
                    />
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1">
                      <span className="text-zinc-400 text-xs">$</span>
                      <input
                        type="number"
                        min="0"
                        step="50"
                        value={debt.balance}
                        onChange={(e) =>
                          handleUpdateDebt(debt.id, "balance", parseFloat(e.target.value) || 0)
                        }
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 font-mono text-zinc-900 dark:text-white rounded-lg px-2.5 py-1 text-xs w-28 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="99.99"
                        step="0.1"
                        value={debt.interestRate}
                        onChange={(e) =>
                          handleUpdateDebt(debt.id, "interestRate", parseFloat(e.target.value) || 0)
                        }
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 font-mono text-zinc-900 dark:text-white rounded-lg px-2.5 py-1 text-xs w-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="text-zinc-400 text-xs">%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1">
                      <span className="text-zinc-400 text-xs">$</span>
                      <input
                        type="number"
                        min="1"
                        step="5"
                        value={debt.minimumPayment}
                        onChange={(e) =>
                          handleUpdateDebt(debt.id, "minimumPayment", parseFloat(e.target.value) || 1)
                        }
                        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 font-mono text-zinc-900 dark:text-white rounded-lg px-2.5 py-1 text-xs w-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <span className="text-zinc-400 text-[10px]">/mo</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 rounded-r-2xl text-center">
                    <button
                      type="button"
                      onClick={() => handleDeleteDebt(debt.id)}
                      className="p-1.5 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Remove debt"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Debt Inline Form */}
        {showAddForm ? (
          <form
            onSubmit={handleAddDebt}
            className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300">
                Add New Debt
              </span>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                Cancel
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-zinc-500 mb-1">Debt Name</label>
                <input
                  type="text"
                  required
                  value={newDebtName}
                  onChange={(e) => setNewDebtName(e.target.value)}
                  placeholder="e.g. Visa Signature"
                  className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-zinc-500 mb-1">Balance ($)</label>
                <input
                  type="number"
                  required
                  min="1"
                  step="10"
                  value={newDebtBalance}
                  onChange={(e) => setNewDebtBalance(e.target.value)}
                  placeholder="e.g. 4200"
                  className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-zinc-500 mb-1">Interest Rate (APR %)</label>
                <input
                  type="number"
                  required
                  min="0"
                  max="99"
                  step="0.1"
                  value={newDebtRate}
                  onChange={(e) => setNewDebtRate(e.target.value)}
                  placeholder="e.g. 24.99"
                  className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-zinc-500 mb-1">Min. Payment ($/mo)</label>
                <input
                  type="number"
                  min="1"
                  step="5"
                  value={newDebtMin}
                  onChange={(e) => setNewDebtMin(e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Save Debt
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="w-full py-2.5 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-500 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Another Debt</span>
          </button>
        )}

        {/* Portfolio Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40">
            <div className="text-[11px] font-medium text-zinc-400">Total Debt Balance</div>
            <div className="text-base sm:text-lg font-bold font-mono text-zinc-900 dark:text-white">
              {formatCurrency(comparison.totalInitialBalance)}
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40">
            <div className="text-[11px] font-medium text-zinc-400">Total Minimums</div>
            <div className="text-base sm:text-lg font-bold font-mono text-zinc-900 dark:text-white">
              {formatCurrency(comparison.totalMinimumPayments)}
              <span className="text-xs font-normal text-zinc-400">/mo</span>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-900/40 col-span-2 sm:col-span-1">
            <div className="text-[11px] font-medium text-indigo-700 dark:text-indigo-300">
              Total Monthly Budget
            </div>
            <div className="text-base sm:text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400">
              {formatCurrency(comparison.totalMonthlyCommitment)}
              <span className="text-xs font-normal text-zinc-400">/mo</span>
            </div>
          </div>
        </div>

        {/* Extra Monthly Payment Control */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold text-zinc-900 dark:text-white flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Extra Monthly Payment (The Accelerator)</span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Additional cash applied to your priority target debt each month.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400">$</span>
              <input
                type="number"
                min="0"
                max="5000"
                step="25"
                value={extraPayment}
                onChange={(e) => setExtraPayment(Math.max(0, parseFloat(e.target.value) || 0))}
                className="w-28 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 font-mono text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-right"
              />
              <span className="text-xs text-zinc-400">/mo</span>
            </div>
          </div>

          {/* Slider */}
          <input
            type="range"
            min="0"
            max="1500"
            step="25"
            value={extraPayment}
            onChange={(e) => setExtraPayment(parseFloat(e.target.value))}
            className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />

          {/* Extra Presets Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-zinc-400 font-medium">Quick Boosts:</span>
            {extraPresets.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setExtraPayment(amt)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  extraPayment === amt
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                +${amt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: HERO VERDICT & COMPARISON HUB */}
      <div className="space-y-6">
        {/* Dynamic Verdict Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-indigo-950 text-white shadow-xl relative overflow-hidden border border-zinc-800">
          <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Trophy className="w-3.5 h-3.5" />
                <span>Head-to-Head Strategy Verdict</span>
              </span>
              <span className="text-xs text-zinc-400">
                Simulated over {debts.length} debts
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {comparison.interestSavedByAvalanche > 0 ? (
                  <>
                    Debt Avalanche saves{" "}
                    <span className="text-emerald-400 font-mono">
                      {formatCurrency(comparison.interestSavedByAvalanche)}
                    </span>{" "}
                    in interest!
                  </>
                ) : (
                  <>Both strategies yield identical interest savings!</>
                )}
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
                {comparison.firstMilestoneWinner === "snowball" && comparison.snowball.firstDebtPaidMonth ? (
                  <>
                    However, <strong className="text-indigo-300">Debt Snowball</strong> gives you your first complete debt payoff in{" "}
                    <strong>Month {comparison.snowball.firstDebtPaidMonth}</strong> (vs. Month{" "}
                    {comparison.avalanche.firstDebtPaidMonth} for Avalanche)—delivering early psychological momentum to stay committed!
                  </>
                ) : (
                  <>
                    Both methods reach their first debt-free milestone at similar timelines. Debt Avalanche is mathematically superior for minimizing financing costs.
                  </>
                )}
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-800">
              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold">Avalanche Interest</div>
                <div className="text-lg font-bold font-mono text-emerald-400">
                  {formatCurrency(comparison.avalanche.totalInterestPaid)}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold">Snowball Interest</div>
                <div className="text-lg font-bold font-mono text-indigo-400">
                  {formatCurrency(comparison.snowball.totalInterestPaid)}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold">Payoff Horizon</div>
                <div className="text-lg font-bold font-mono text-white">
                  {comparison.avalanche.monthsToPayoff} months
                </div>
                <div className="text-[10px] text-zinc-400">{comparison.avalanche.payoffDate}</div>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm">
                <div className="text-[10px] text-zinc-400 uppercase font-semibold">Total Debt Eliminated</div>
                <div className="text-lg font-bold font-mono text-white">
                  {formatCurrency(comparison.totalInitialBalance)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center sm:justify-start gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab("comparison")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "comparison"
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Side-by-Side Comparison
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("snowball")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "snowball"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400"
            }`}
          >
            Debt Snowball (Dave Ramsey)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("avalanche")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "avalanche"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400"
            }`}
          >
            Debt Avalanche (Math Optimal)
          </button>
        </div>

        {/* Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Debt Snowball */}
          <div
            className={`p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border-2 transition-all ${
              activeTab === "snowball" || activeTab === "comparison"
                ? "border-indigo-500/40 shadow-lg shadow-indigo-500/5"
                : "opacity-60 border-zinc-200 dark:border-zinc-800"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900">
                  Behavioral Psychology
                </span>
                <h4 className="text-xl font-extrabold text-zinc-900 dark:text-white mt-1">
                  Debt Snowball
                </h4>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                ❄️
              </div>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
              Attacks debts from <strong>smallest balance to largest</strong>, ignoring interest rates. Winning early milestones keeps you emotionally driven to finish.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Debt-Free Date:</span>
                  <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                    {comparison.snowball.payoffDate} ({comparison.snowball.monthsToPayoff} months)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Total Interest Paid:</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {formatCurrency(comparison.snowball.totalInterestPaid)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Total Money Repaid:</span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">
                    {formatCurrency(comparison.snowball.totalPaid)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-200/50 dark:border-zinc-700/50">
                  <span className="text-zinc-500">First Debt Knocked Out:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    Month {comparison.snowball.firstDebtPaidMonth || 1} 🚀
                  </span>
                </div>
              </div>

              {/* Milestones Order */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Snowball Payoff Sequence:
                </div>
                <div className="space-y-1.5">
                  {comparison.snowball.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                          {m.debtName}
                        </span>
                      </div>
                      <span className="font-mono text-indigo-700 dark:text-indigo-300 font-semibold">
                        Month {m.monthPaidOff} ({m.datePaidOff})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Debt Avalanche */}
          <div
            className={`p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border-2 transition-all ${
              activeTab === "avalanche" || activeTab === "comparison"
                ? "border-emerald-500/40 shadow-lg shadow-emerald-500/5"
                : "opacity-60 border-zinc-200 dark:border-zinc-800"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                  Mathematical Optimization
                </span>
                <h4 className="text-xl font-extrabold text-zinc-900 dark:text-white mt-1">
                  Debt Avalanche
                </h4>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                🏔️
              </div>
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
              Attacks debts with the <strong>highest interest rate (APR)</strong> first. Minimizes lifetime interest paid, saving the absolute maximum dollar amount.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Debt-Free Date:</span>
                  <span className="font-bold text-zinc-900 dark:text-white flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    {comparison.avalanche.payoffDate} ({comparison.avalanche.monthsToPayoff} months)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Total Interest Paid:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(comparison.avalanche.totalInterestPaid)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Total Money Repaid:</span>
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">
                    {formatCurrency(comparison.avalanche.totalPaid)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-200/50 dark:border-zinc-700/50">
                  <span className="text-zinc-500">Net Interest Saved:</span>
                  <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    +{formatCurrency(comparison.interestSavedByAvalanche)} saved
                  </span>
                </div>
              </div>

              {/* Milestones Order */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Avalanche Payoff Sequence:
                </div>
                <div className="space-y-1.5">
                  {comparison.avalanche.milestones.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                          {m.debtName}
                        </span>
                      </div>
                      <span className="font-mono text-emerald-700 dark:text-emerald-300 font-semibold">
                        Month {m.monthPaidOff} ({m.datePaidOff})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Balance Depletion Timeline */}
        <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <span>Debt Elimination Balance Curve</span>
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Visual trajectory of remaining principal balance from start to debt freedom.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400">
                <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />
                Snowball
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="w-3 h-3 rounded-full bg-emerald-600 inline-block" />
                Avalanche
              </span>
            </div>
          </div>

          {/* Timeline Visual Progress Bar Points */}
          <div className="space-y-3 pt-2">
            {[0.25, 0.5, 0.75, 1.0].map((fraction) => {
              const targetBalance = comparison.totalInitialBalance * (1 - fraction);
              const sbPoint = comparison.snowball.monthlyTimeline.find((p) => p.totalBalance <= targetBalance) ||
                comparison.snowball.monthlyTimeline[comparison.snowball.monthlyTimeline.length - 1];
              const avPoint = comparison.avalanche.monthlyTimeline.find((p) => p.totalBalance <= targetBalance) ||
                comparison.avalanche.monthlyTimeline[comparison.avalanche.monthlyTimeline.length - 1];

              return (
                <div key={fraction} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-600 dark:text-zinc-400">
                      {fraction * 100}% Debt Cleared ({formatCurrency(comparison.totalInitialBalance * fraction)} repaid)
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      Snowball: Month {sbPoint.month} | Avalanche: Month {avPoint.month}
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden flex">
                    <div
                      style={{ width: `${fraction * 100}%` }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Collapsible Month-by-Month Amortization Schedule */}
        <div className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowSchedule(!showSchedule)}
            className="w-full p-5 sm:p-6 text-left flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-zinc-900 dark:text-white">
                  Month-by-Month Repayment Breakdown
                </div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">
                  Inspect balance progression and cumulative interest paid over time
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>{showSchedule ? "Hide Schedule" : "Show Schedule"}</span>
              {showSchedule ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showSchedule && (
            <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="text-[11px] font-sans font-semibold text-zinc-400 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="py-2.5 px-3">Month</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3 text-right">Snowball Balance</th>
                    <th className="py-2.5 px-3 text-right">Avalanche Balance</th>
                    <th className="py-2.5 px-3 text-right text-emerald-600 dark:text-emerald-400">
                      Interest Saved
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
                  {comparison.snowball.monthlyTimeline.map((p, idx) => {
                    const avPoint = comparison.avalanche.monthlyTimeline[idx] ||
                      comparison.avalanche.monthlyTimeline[comparison.avalanche.monthlyTimeline.length - 1];
                    const saved = Math.max(0, p.cumulativeInterest - (avPoint?.cumulativeInterest || 0));

                    return (
                      <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30">
                        <td className="py-2 px-3 font-sans font-medium text-zinc-700 dark:text-zinc-300">
                          Month {p.month}
                        </td>
                        <td className="py-2 px-3 text-zinc-500">{p.date}</td>
                        <td className="py-2 px-3 text-right font-bold text-zinc-900 dark:text-white">
                          {formatCurrency(p.totalBalance)}
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-zinc-900 dark:text-white">
                          {formatCurrency(avPoint ? avPoint.totalBalance : 0)}
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-600 dark:text-emerald-400">
                          {saved > 0 ? `+${formatCurrency(saved)}` : "$0"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
