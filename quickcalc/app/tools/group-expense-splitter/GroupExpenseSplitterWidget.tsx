"use client";

import { useState, useMemo } from "react";
import {
  Person,
  ExpenseItem,
  calculateSplitExpenses,
} from "../../../lib/calculators/groupExpenseSplitter";

export default function GroupExpenseSplitterWidget() {
  const [people, setPeople] = useState<Person[]>([
    { id: "1", name: "Ali" },
    { id: "2", name: "Sarah" },
  ]);
  const [newPersonName, setNewPersonName] = useState("");

  const [items, setItems] = useState<ExpenseItem[]>([
    { id: "101", name: "Appetizers", amount: 15, splitBetween: ["1", "2"] },
    { id: "102", name: "Main Course", amount: 45, splitBetween: ["1"] },
  ]);

  const [newItemName, setNewItemName] = useState("");
  const [newItemAmount, setNewItemAmount] = useState("");
  const [newItemSplit, setNewItemSplit] = useState<string[]>(["1", "2"]);

  const [taxPercent, setTaxPercent] = useState<string>("8.25");
  const [tipPercent, setTipPercent] = useState<string>("15");

  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  // Manage people list
  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newPersonName.trim();
    if (!name) {
      setError("Please enter a valid name.");
      return;
    }
    if (people.length >= 15) {
      setError("You can add up to 15 people.");
      return;
    }
    if (people.some((p) => p.name.toLowerCase() === name.toLowerCase())) {
      setError("Someone with that name already exists in the group.");
      return;
    }
    const newId = Date.now().toString();
    const updatedPeople = [...people, { id: newId, name }];
    setPeople(updatedPeople);
    setNewPersonName("");
    setError("");

    // Automatically check this new person in default splits
    setNewItemSplit((prev) => [...prev, newId]);
  };

  const handleRemovePerson = (id: string) => {
    if (people.length <= 1) {
      setError("You must have at least one person.");
      return;
    }
    setPeople(people.filter((p) => p.id !== id));
    // Clean up items that split with this person
    setItems(
      items.map((item) => ({
        ...item,
        splitBetween: item.splitBetween.filter((pid) => pid !== id),
      }))
    );
    // Clean up new item split selection
    setNewItemSplit(newItemSplit.filter((pid) => pid !== id));
    setError("");
  };

  const handleUpdatePersonName = (id: string, newName: string) => {
    if (!newName.trim()) return;
    setPeople(people.map((p) => (p.id === id ? { ...p, name: newName } : p)));
  };

  // Manage items list
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newItemName.trim() || `Item ${items.length + 1}`;
    const amount = parseFloat(newItemAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid positive amount for the item.");
      return;
    }
    if (newItemSplit.length === 0) {
      setError("Please select at least one person to split this item.");
      return;
    }

    const newItem: ExpenseItem = {
      id: Date.now().toString(),
      name,
      amount,
      splitBetween: [...newItemSplit],
    };

    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemAmount("");
    // Keep the current split configuration as a convenient default
    setError("");
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleToggleItemPerson = (itemId: string, personId: string) => {
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          const isSelected = item.splitBetween.includes(personId);
          const splitBetween = isSelected
            ? item.splitBetween.filter((id) => id !== personId)
            : [...item.splitBetween, personId];
          return { ...item, splitBetween };
        }
        return item;
      })
    );
  };

  const handleUpdateItemAmount = (itemId: string, val: string) => {
    const num = parseFloat(val);
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          return { ...item, amount: isNaN(num) || num < 0 ? 0 : num };
        }
        return item;
      })
    );
  };

  const handleUpdateItemName = (itemId: string, newName: string) => {
    setItems(
      items.map((item) => {
        if (item.id === itemId) {
          return { ...item, name: newName };
        }
        return item;
      })
    );
  };

  // Calculations
  const calculatedResults = useMemo(() => {
    const tax = parseFloat(taxPercent) || 0;
    const tip = parseFloat(tipPercent) || 0;
    return calculateSplitExpenses(people, items, tax, tip);
  }, [people, items, taxPercent, tipPercent]);

  // Copy results summary
  const handleCopySummary = async () => {
    const { totalSubtotal, totalTax, totalTip, grandTotal, breakdowns } =
      calculatedResults;

    let text = `--- Group Expense Splitter Summary ---\n`;
    text += `Subtotal: $${totalSubtotal.toFixed(2)}\n`;
    if (totalTax > 0) text += `Tax (${taxPercent}%): $${totalTax.toFixed(2)}\n`;
    if (totalTip > 0) text += `Tip (${tipPercent}%): $${totalTip.toFixed(2)}\n`;
    text += `Grand Total: $${grandTotal.toFixed(2)}\n\n`;
    text += `Individual Breakdowns:\n`;

    breakdowns.forEach((b) => {
      text += `- ${b.personName}: $${b.total.toFixed(2)}\n`;
      text += `  (Subtotal: $${b.subtotal.toFixed(2)}, Tax/Tip share: $${(
        b.taxShare + b.tipShare
      ).toFixed(2)})\n`;
      if (b.itemShares.length > 0) {
        text += `  Items: ${b.itemShares
          .map((is) => `${is.itemName} ($${is.shareAmount.toFixed(2)})`)
          .join(", ")}\n`;
      }
    });

    text += `\nShared via QuickCalc (https://quickcalc.cloud)`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy breakdown", err);
    }
  };

  const handleResetAll = () => {
    setPeople([
      { id: "1", name: "Ali" },
      { id: "2", name: "Sarah" },
    ]);
    setItems([]);
    setNewPersonName("");
    setNewItemName("");
    setNewItemAmount("");
    setNewItemSplit(["1", "2"]);
    setTaxPercent("8.25");
    setTipPercent("15");
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden my-8 transition-colors">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white text-center border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold flex items-center justify-center gap-2">
          <span>🧾 Itemized Group Expense Splitter</span>
        </h3>
        <p className="text-xs text-blue-100 mt-1">
          Add members, input individual food or shopping items, allocate who shared what, and split tax & tips proportionally instantly!
        </p>
      </div>

      <div className="p-6 space-y-8">
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 rounded-xl text-sm font-semibold">
            ⚠️ {error}
          </div>
        )}

        {/* 1. Add People Section */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
            <span className="text-lg">👥</span> 1. Add Group Members
          </h4>
          <form onSubmit={handleAddPerson} className="flex gap-2 max-w-md">
            <input
              type="text"
              value={newPersonName}
              onChange={(e) => setNewPersonName(e.target.value)}
              placeholder="Enter person's name (e.g. John)"
              className="w-full bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-blue-500 text-sm font-medium text-zinc-900 dark:text-white"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 rounded-xl transition-colors whitespace-nowrap"
            >
              Add Member
            </button>
          </form>

          {/* Group Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {people.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 px-3 py-1.5 rounded-xl"
              >
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => handleUpdatePersonName(p.id, e.target.value)}
                  className="bg-transparent border-none outline-none font-medium text-xs text-zinc-800 dark:text-zinc-200 w-20 focus:underline"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePerson(p.id)}
                  className="text-zinc-400 hover:text-red-500 font-bold text-sm"
                  title="Remove person"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Add / Edit Items Section */}
        <div className="space-y-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <h4 className="text-base font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
            <span className="text-lg">🍔</span> 2. Expense Items List
          </h4>

          {/* Add Item Row */}
          <form onSubmit={handleAddItem} className="bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-850 p-4 rounded-xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">
                  Item Description / Name
                </label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. Steak, Wine, Movie Ticket"
                  className="w-full bg-white dark:bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1">
                  Amount ($)
                </label>
                <input
                  type="number"
                  step="any"
                  min="0"
                  value={newItemAmount}
                  onChange={(e) => setNewItemAmount(e.target.value)}
                  placeholder="e.g. 24.50"
                  className="w-full bg-white dark:bg-zinc-900 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-medium text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Split selectors */}
            <div>
              <span className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-2">
                Who shares this item?
              </span>
              <div className="flex flex-wrap gap-2">
                {people.map((p) => {
                  const isChecked = newItemSplit.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => {
                        if (isChecked) {
                          setNewItemSplit(newItemSplit.filter((id) => id !== p.id));
                        } else {
                          setNewItemSplit([...newItemSplit, p.id]);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        isChecked
                          ? "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40 text-blue-600 dark:text-blue-400"
                          : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {isChecked ? "✅ " : "⬜ "} {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2 rounded-lg transition-colors"
              >
                + Add Item
              </button>
            </div>
          </form>

          {/* Active Items Table / List */}
          {items.length === 0 ? (
            <div className="text-center py-6 bg-zinc-50 dark:bg-zinc-950/20 border border-dashed border-zinc-200 dark:border-zinc-850 rounded-xl">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                No items added yet. Complete the form above to add your first expense item!
              </p>
            </div>
          ) : (
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-950/10">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                      <th className="p-3 font-bold text-zinc-500">Item Name</th>
                      <th className="p-3 font-bold text-zinc-500">Amount</th>
                      <th className="p-3 font-bold text-zinc-500">Split Between</th>
                      <th className="p-3 font-bold text-zinc-500 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-zinc-100 dark:border-zinc-850 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/20">
                        <td className="p-3">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleUpdateItemName(item.id, e.target.value)}
                            className="bg-transparent border-none outline-none font-semibold text-zinc-800 dark:text-zinc-200 w-full focus:underline"
                          />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <span className="text-zinc-400 font-mono">$</span>
                            <input
                              type="number"
                              step="any"
                              value={item.amount}
                              onChange={(e) => handleUpdateItemAmount(item.id, e.target.value)}
                              className="bg-transparent border-none outline-none font-mono font-bold text-zinc-800 dark:text-zinc-200 w-16 focus:underline"
                            />
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {people.map((p) => {
                              const isChecked = item.splitBetween.includes(p.id);
                              return (
                                <button
                                  key={p.id}
                                  type="button"
                                  onClick={() => handleToggleItemPerson(item.id, p.id)}
                                  className={`px-2 py-1 rounded text-2xs font-bold border transition ${
                                    isChecked
                                      ? "bg-blue-500 border-blue-600 text-white"
                                      : "bg-zinc-100 dark:bg-zinc-850 border-zinc-200 dark:border-zinc-700 text-zinc-400"
                                  }`}
                                >
                                  {p.name}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:underline font-bold"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* 3. Tax / Tip proportion controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Tax Percentage (%)
            </label>
            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 transition-colors">
              <input
                type="number"
                step="any"
                min="0"
                value={taxPercent}
                onChange={(e) => setTaxPercent(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm font-mono font-medium text-zinc-900 dark:text-white"
              />
              <span className="text-sm font-extrabold text-zinc-400 font-mono">%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
              Tip Percentage (%)
            </label>
            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-950 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 focus-within:border-blue-500 transition-colors">
              <input
                type="number"
                step="any"
                min="0"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm font-mono font-medium text-zinc-900 dark:text-white"
              />
              <span className="text-sm font-extrabold text-zinc-400 font-mono">%</span>
            </div>
          </div>
        </div>

        {/* 4. Results & Summary Breakdown */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            
            {/* Left Column: Totals */}
            <div className="space-y-4 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 pb-4 md:pb-0 md:pr-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
                  Bill Totals
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">Items Subtotal:</span>
                    <span className="font-mono font-bold">${calculatedResults.totalSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">Proportional Tax:</span>
                    <span className="font-mono font-bold">${calculatedResults.totalTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-500">Proportional Tip:</span>
                    <span className="font-mono font-bold">${calculatedResults.totalTip.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/60 mt-4">
                <span className="text-3xs font-extrabold uppercase text-zinc-400 tracking-widest block">
                  Grand Total
                </span>
                <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-mono mt-1 block">
                  ${calculatedResults.grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Right 2 Columns: Individual breakdowns */}
            <div className="md:col-span-2 space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-3">
                  Individual Split Share
                </h4>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {calculatedResults.breakdowns.map((b) => (
                    <div
                      key={b.personId}
                      className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs hover:shadow-sm transition"
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-bold text-zinc-800 dark:text-zinc-100">{b.personName}</span>
                        <span className="font-mono font-extrabold text-blue-600 dark:text-blue-400 text-sm">
                          ${b.total.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-3xs text-zinc-400 dark:text-zinc-500">
                        <span>Subtotal: ${b.subtotal.toFixed(2)}</span>
                        <span>Tax/Tip share: ${(b.taxShare + b.tipShare).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800/60">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  disabled={items.length === 0}
                  className="flex-1 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition font-semibold text-xs px-4 py-2.5 rounded-lg text-center"
                >
                  {copied ? "✅ Summary Copied!" : "📋 Copy Shareable Breakdown"}
                </button>
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-bold px-4 py-2.5 transition"
                >
                  Reset Calculator
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
