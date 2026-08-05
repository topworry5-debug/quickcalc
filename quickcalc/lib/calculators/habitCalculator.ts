/**
 * Habit Cost Calculator Logic
 */

export interface HabitInput {
  habitName: string;
  dailyCost: number;
  dailyMinutes: number;
  returnRate?: number; // e.g. 7% investment return
}

export interface HabitResult {
  monthlyCost: number;
  yearlyCost: number;
  tenYearCost: number;
  investedTenYear: number;
  yearlyHours: number;
}

export function getHabitExplanationSteps(
  input: HabitInput,
  result: HabitResult
): string[] {
  const steps: string[] = [];
  const { habitName, dailyCost, dailyMinutes } = input;
  const name = habitName || "your habit";

  steps.push(`Daily expense baseline: $${dailyCost.toFixed(2)} spent per day on ${name}`);
  steps.push(`Monthly spending (30.4 days avg): $${dailyCost.toFixed(2)} × 30.4 days = $${result.monthlyCost.toFixed(2)}/month`);
  steps.push(`Annual direct cost (365 days): $${dailyCost.toFixed(2)} × 365 = $${result.yearlyCost.toFixed(2)}/year`);
  steps.push(`10-Year cumulative cash spent: $${result.yearlyCost.toFixed(2)} × 10 years = $${result.tenYearCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

  if (dailyMinutes > 0) {
    const annualHours = (dailyMinutes * 365) / 60;
    steps.push(`Time commitment calculation: ${dailyMinutes} mins/day × 365 days = ${Math.round(annualHours)} hours per year (${(annualHours / 24).toFixed(1)} full 24-hour days per year)`);
  }

  steps.push(`Opportunity cost (Investing at 7% return): Investing that $${dailyCost.toFixed(2)}/day ($${result.monthlyCost.toFixed(2)}/mo) over 10 years yields ~$${result.investedTenYear.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })} in wealth`);

  return steps;
}
