/**
 * Discount Calculator Logic
 */

export interface DiscountInput {
  originalPrice: number;
  discount1: number;
  discount2: number;
  taxRate: number;
}

export interface DiscountResult {
  finalPrice: number;
  totalSaved: number;
  effectiveDiscountPercent: number;
}

export function getDiscountExplanationSteps(
  input: DiscountInput,
  result: DiscountResult
): string[] {
  const steps: string[] = [];
  const { originalPrice, discount1, discount2, taxRate } = input;

  steps.push(`Original price: $${originalPrice.toFixed(2)}`);

  const amount1 = originalPrice * (discount1 / 100);
  const priceAfter1 = originalPrice - amount1;
  steps.push(`Apply primary discount (${discount1}%): $${originalPrice.toFixed(2)} × ${discount1}% = $${amount1.toFixed(2)} off → $${priceAfter1.toFixed(2)} remaining`);

  let currentPrice = priceAfter1;
  if (discount2 > 0) {
    const amount2 = priceAfter1 * (discount2 / 100);
    currentPrice = priceAfter1 - amount2;
    steps.push(`Apply stacked secondary discount (${discount2}%): $${priceAfter1.toFixed(2)} × ${discount2}% = $${amount2.toFixed(2)} off → $${currentPrice.toFixed(2)} remaining`);
  }

  if (taxRate > 0) {
    const taxAmount = currentPrice * (taxRate / 100);
    steps.push(`Add sales tax (${taxRate}%): $${currentPrice.toFixed(2)} × ${taxRate}% = +$${taxAmount.toFixed(2)} tax → $${result.finalPrice.toFixed(2)} final total out-of-pocket`);
  } else {
    steps.push(`Final discounted price: $${result.finalPrice.toFixed(2)}`);
  }

  steps.push(`Total savings calculation: $${originalPrice.toFixed(2)} (original) - $${(currentPrice).toFixed(2)} (discounted) = $${result.totalSaved.toFixed(2)} saved (${result.effectiveDiscountPercent.toFixed(1)}% total effective discount)`);

  return steps;
}
