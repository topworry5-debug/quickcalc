/**
 * Budget Calculator Logic (50/30/20 & Custom Split Rules)
 */

export interface BudgetInput {
  income: number;
  needsPct: number;
  wantsPct: number;
  savingsPct: number;
}

export interface BudgetResult {
  needsAmount: number;
  wantsAmount: number;
  savingsAmount: number;
  totalIncome: number;
}

export function calculateBudget({
  income,
  needsPct,
  wantsPct,
  savingsPct,
}: BudgetInput): BudgetResult {
  const inc = isNaN(income) || income < 0 ? 0 : income;
  const needsAmount = Math.round(inc * (needsPct / 100));
  const wantsAmount = Math.round(inc * (wantsPct / 100));
  const savingsAmount = Math.round(inc * (savingsPct / 100));

  return {
    needsAmount,
    wantsAmount,
    savingsAmount,
    totalIncome: inc,
  };
}

export function getBudgetExplanationSteps(
  input: BudgetInput,
  result: BudgetResult
): string[] {
  const steps: string[] = [];
  const { income, needsPct, wantsPct, savingsPct } = input;

  steps.push(`Monthly net income recorded: $${income.toLocaleString()}`);
  steps.push(`Calculate Needs (${needsPct}% allocation): $${income.toLocaleString()} × ${needsPct / 100} = $${result.needsAmount.toLocaleString()} for housing, groceries, utilities & essential bills`);
  steps.push(`Calculate Wants (${wantsPct}% allocation): $${income.toLocaleString()} × ${wantsPct / 100} = $${result.wantsAmount.toLocaleString()} for dining out, entertainment & hobbies`);
  steps.push(`Calculate Savings & Debt (${savingsPct}% allocation): $${income.toLocaleString()} × ${savingsPct / 100} = $${result.savingsAmount.toLocaleString()} for retirement, emergency fund & extra debt payments`);
  steps.push(`Total budget check: $${result.needsAmount.toLocaleString()} (Needs) + $${result.wantsAmount.toLocaleString()} (Wants) + $${result.savingsAmount.toLocaleString()} (Savings) = $${result.totalIncome.toLocaleString()} (${needsPct + wantsPct + savingsPct}% allocated)`);

  return steps;
}
