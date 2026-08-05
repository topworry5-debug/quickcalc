/**
 * Tip Calculator Utilities
 */

export interface TipConfig {
  billAmount: number;
  tipPercentage: number;
  peopleCount: number;
}

export interface TipResult {
  tipAmount: number;
  totalBill: number;
  tipPerPerson: number;
  totalPerPerson: number;
}

/**
 * Computes the tip and splitting breakdown
 */
export function calculateTip(config: TipConfig): TipResult {
  const { billAmount, tipPercentage, peopleCount } = config;
  
  // Safe defaults
  const bill = isNaN(billAmount) || billAmount < 0 ? 0 : billAmount;
  const percentage = isNaN(tipPercentage) || tipPercentage < 0 ? 0 : tipPercentage;
  const people = isNaN(peopleCount) || peopleCount < 1 ? 1 : peopleCount;

  // Maths
  const tipAmount = bill * (percentage / 100);
  const totalBill = bill + tipAmount;
  
  const tipPerPerson = tipAmount / people;
  const totalPerPerson = totalBill / people;

  return {
    tipAmount: Number(tipAmount.toFixed(2)),
    totalBill: Number(totalBill.toFixed(2)),
    tipPerPerson: Number(tipPerPerson.toFixed(2)),
    totalPerPerson: Number(totalPerPerson.toFixed(2)),
  };
}

export function getTipExplanationSteps(config: TipConfig, result: TipResult): string[] {
  const steps: string[] = [];
  const { billAmount, tipPercentage, peopleCount } = config;

  steps.push(`Base bill subtotal: $${billAmount.toFixed(2)}`);
  steps.push(`Calculate total tip (${tipPercentage}%): $${billAmount.toFixed(2)} × ${tipPercentage}% = $${result.tipAmount.toFixed(2)} tip`);
  steps.push(`Sum grand bill total: $${billAmount.toFixed(2)} (bill) + $${result.tipAmount.toFixed(2)} (tip) = $${result.totalBill.toFixed(2)}`);

  if (peopleCount > 1) {
    steps.push(`Split tip per person (${peopleCount} people): $${result.tipAmount.toFixed(2)} ÷ ${peopleCount} = $${result.tipPerPerson.toFixed(2)} tip per person`);
    steps.push(`Split total per person: $${result.totalBill.toFixed(2)} ÷ ${peopleCount} = $${result.totalPerPerson.toFixed(2)} total owed per person`);
  }

  return steps;
}
