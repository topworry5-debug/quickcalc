export interface RamseyInputs {
  currentAge: number;
  retirementAge: number;
  startingBalance: number;
  monthlyContribution: number;
  annualReturn: number; // default 10-12%
}

export interface RamseyYearBreakdown {
  year: number;
  age: number;
  totalContributions: number;
  totalGrowth: number;
  endingBalance: number;
}

export interface RamseyResult {
  yearsToInvest: number;
  totalInvested: number;
  totalGrowth: number;
  futureValue: number;
  monthlyRetirementIncome: number; // 4% rule
  yearlyBreakdown: RamseyYearBreakdown[];
  fundAllocation: {
    growth: number;
    growthAndIncome: number;
    aggressiveGrowth: number;
    international: number;
  };
}

export const DEFAULT_RAMSEY_INPUTS: RamseyInputs = {
  currentAge: 30,
  retirementAge: 65,
  startingBalance: 10000,
  monthlyContribution: 500,
  annualReturn: 10,
};

export function calculateRamseyInvestment(inputs: RamseyInputs): RamseyResult {
  const currentAge = Math.max(18, Math.min(80, inputs.currentAge));
  const retirementAge = Math.max(currentAge + 1, Math.min(100, inputs.retirementAge));
  const yearsToInvest = retirementAge - currentAge;
  const startingBalance = Math.max(0, inputs.startingBalance);
  const monthlyContribution = Math.max(0, inputs.monthlyContribution);
  const annualReturn = Math.max(0, Math.min(25, inputs.annualReturn));

  const monthlyRate = annualReturn / 100 / 12;

  let currentBalance = startingBalance;
  let totalInvested = startingBalance;
  const yearlyBreakdown: RamseyYearBreakdown[] = [];

  for (let year = 1; year <= yearsToInvest; year++) {
    for (let month = 1; month <= 12; month++) {
      currentBalance = currentBalance * (1 + monthlyRate) + monthlyContribution;
      totalInvested += monthlyContribution;
    }

    const totalGrowth = Math.max(0, currentBalance - totalInvested);
    yearlyBreakdown.push({
      year,
      age: currentAge + year,
      totalContributions: Math.round(totalInvested),
      totalGrowth: Math.round(totalGrowth),
      endingBalance: Math.round(currentBalance),
    });
  }

  const futureValue = Math.round(currentBalance);
  const totalGrowth = Math.max(0, futureValue - totalInvested);
  const monthlyRetirementIncome = Math.round((futureValue * 0.04) / 12);

  // Dave Ramsey's classic 4-fund portfolio (25% each)
  const quarterValue = Math.round(futureValue * 0.25);
  const fundAllocation = {
    growth: quarterValue,
    growthAndIncome: quarterValue,
    aggressiveGrowth: quarterValue,
    international: futureValue - quarterValue * 3,
  };

  return {
    yearsToInvest,
    totalInvested: Math.round(totalInvested),
    totalGrowth,
    futureValue,
    monthlyRetirementIncome,
    yearlyBreakdown,
    fundAllocation,
  };
}
