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
