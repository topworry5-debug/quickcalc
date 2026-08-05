/**
 * Core mathematical functions and types for Group Expense Splitter.
 */

export interface Person {
  id: string;
  name: string;
}

export interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  splitBetween: string[]; // Array of person IDs
}

export interface PersonBreakdown {
  personId: string;
  personName: string;
  subtotal: number;
  taxShare: number;
  tipShare: number;
  total: number;
  itemShares: { itemName: string; shareAmount: number }[];
}

export interface SplitterResult {
  totalSubtotal: number;
  totalTax: number;
  totalTip: number;
  grandTotal: number;
  breakdowns: PersonBreakdown[];
}

export function calculateSplitExpenses(
  people: Person[],
  items: ExpenseItem[],
  taxPercent: number,
  tipPercent: number
): SplitterResult {
  const totalSubtotal = items.reduce((sum, item) => sum + item.amount, 0);
  
  // Initialize breakdown for each person
  const breakdownsMap: Record<string, PersonBreakdown> = {};
  people.forEach((p) => {
    breakdownsMap[p.id] = {
      personId: p.id,
      personName: p.name,
      subtotal: 0,
      taxShare: 0,
      tipShare: 0,
      total: 0,
      itemShares: [],
    };
  });

  // Distribute item costs
  items.forEach((item) => {
    const splitCount = item.splitBetween.length;
    if (splitCount > 0 && item.amount > 0) {
      const shareAmount = item.amount / splitCount;
      item.splitBetween.forEach((pid) => {
        if (breakdownsMap[pid]) {
          breakdownsMap[pid].subtotal += shareAmount;
          breakdownsMap[pid].itemShares.push({
            itemName: item.name || "Unnamed Item",
            shareAmount,
          });
        }
      });
    }
  });

  const totalTax = (taxPercent / 100) * totalSubtotal;
  const totalTip = (tipPercent / 100) * totalSubtotal;
  const grandTotal = totalSubtotal + totalTax + totalTip;

  // Calculate proportional tax, tip and grand total for each person
  people.forEach((p) => {
    const b = breakdownsMap[p.id];
    if (b && totalSubtotal > 0) {
      const proportion = b.subtotal / totalSubtotal;
      b.taxShare = proportion * totalTax;
      b.tipShare = proportion * totalTip;
      b.total = b.subtotal + b.taxShare + b.tipShare;
    }
  });

  return {
    totalSubtotal,
    totalTax,
    totalTip,
    grandTotal,
    breakdowns: Object.values(breakdownsMap),
  };
}

export function getGroupExpenseExplanationSteps(
  result: SplitterResult,
  taxPct: number,
  tipPct: number
): string[] {
  const steps: string[] = [];

  steps.push(`Sum total item subtotals: $${result.totalSubtotal.toFixed(2)} across all group expenses`);

  if (taxPct > 0) {
    steps.push(`Calculate total sales tax (${taxPct}%): $${result.totalSubtotal.toFixed(2)} × ${taxPct}% = $${result.totalTax.toFixed(2)} tax`);
  }
  if (tipPct > 0) {
    steps.push(`Calculate total tip (${tipPct}%): $${result.totalSubtotal.toFixed(2)} × ${tipPct}% = $${result.totalTip.toFixed(2)} tip`);
  }

  steps.push(`Calculate grand bill total: $${result.totalSubtotal.toFixed(2)} (items) + $${result.totalTax.toFixed(2)} (tax) + $${result.totalTip.toFixed(2)} (tip) = $${result.grandTotal.toFixed(2)}`);

  steps.push(`Distribute costs fairly: Tax & tip are split proportionally based on each person's individual item subtotal proportion`);

  if (result.breakdowns.length > 0) {
    const p1 = result.breakdowns[0];
    steps.push(`Example breakdown (${p1.personName}): Subtotal $${p1.subtotal.toFixed(2)} + Tax $${p1.taxShare.toFixed(2)} + Tip $${p1.tipShare.toFixed(2)} = $${p1.total.toFixed(2)} total owed`);
  }

  return steps;
}
