/**
 * Core mathematical functions for percentage calculations.
 */

export interface ModeAResult {
  result: number;
  formula: string;
}

export interface ModeBResult {
  percentChange: number;
  direction: "increase" | "decrease" | "none";
  difference: number;
  formula: string;
}

export interface ModeCResult {
  finalPrice: number;
  amountSaved: number;
  formula: string;
}

export interface ModeDResult {
  originalValue: number;
  formula: string;
}

/**
 * a) X% of Y — e.g. what is 20% of 1500
 */
export function calculateXPercentOfY(percent: number, total: number): ModeAResult {
  const result = (percent / 100) * total;
  const cleanPercent = Number(percent.toFixed(6));
  const cleanTotal = Number(total.toFixed(6));
  const cleanResult = Number(result.toFixed(6));
  return {
    result,
    formula: `Result = (${cleanPercent} / 100) * ${cleanTotal} = ${cleanResult}`
  };
}

/**
 * b) Percentage Increase/Decrease — from old value to new value, show % change
 */
export function calculatePercentageChange(oldValue: number, newValue: number): ModeBResult {
  const difference = newValue - oldValue;
  let percentChange = 0;
  let direction: "increase" | "decrease" | "none" = "none";

  if (oldValue !== 0) {
    percentChange = (difference / oldValue) * 100;
  } else {
    percentChange = newValue !== 0 ? 100 : 0; // standard fallback
  }

  if (percentChange > 0) {
    direction = "increase";
  } else if (percentChange < 0) {
    direction = "decrease";
  }

  const cleanOld = Number(oldValue.toFixed(6));
  const cleanNew = Number(newValue.toFixed(6));
  const cleanPercent = Number(Math.abs(percentChange).toFixed(4));

  const formula = oldValue !== 0
    ? `Percentage Change = ((${cleanNew} - ${cleanOld}) / ${cleanOld}) * 100 = ${difference >= 0 ? "" : "-"}${cleanPercent}%`
    : `Percentage Change = ((${cleanNew} - 0) / 0) * 100 = ${percentChange}%`;

  return {
    percentChange,
    direction,
    difference,
    formula
  };
}

/**
 * c) Discount Calculator — original price + discount % = final price + amount saved
 */
export function calculateDiscount(originalPrice: number, discountPercent: number): ModeCResult {
  const amountSaved = (discountPercent / 100) * originalPrice;
  const finalPrice = originalPrice - amountSaved;

  const cleanOriginal = Number(originalPrice.toFixed(6));
  const cleanDiscount = Number(discountPercent.toFixed(6));
  const cleanFinal = Number(finalPrice.toFixed(6));
  const cleanSaved = Number(amountSaved.toFixed(6));

  return {
    finalPrice,
    amountSaved,
    formula: `Saved = (${cleanDiscount} / 100) * ${cleanOriginal} = ${cleanSaved}\nFinal Price = ${cleanOriginal} - ${cleanSaved} = ${cleanFinal}`
  };
}

/**
 * d) Reverse Percentage — given the final value and the %, find the original value
 */
export function calculateReversePercentage(finalValue: number, percent: number): ModeDResult {
  // If the final value is after some percent has been added/removed, or final is X% of original
  // Standard reverse percentage is: original * (percent/100) = final => original = final / (percent/100)
  // Let's implement the standard: Original = Final / (Percent / 100)
  let originalValue = 0;
  if (percent !== 0) {
    originalValue = finalValue / (percent / 100);
  }

  const cleanFinal = Number(finalValue.toFixed(6));
  const cleanPercent = Number(percent.toFixed(6));
  const cleanOriginal = Number(originalValue.toFixed(6));

  return {
    originalValue,
    formula: `Original Value = ${cleanFinal} / (${cleanPercent} / 100) = ${cleanOriginal}`
  };
}
