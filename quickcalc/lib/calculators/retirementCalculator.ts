export interface YearlyRetirementData {
  year: number;
  age: number;
  monthlyContribution: number;
  contributionsThisYear: number;
  growthThisYear: number;
  cumulativeContributions: number;
  cumulativeGrowth: number;
  endBalance: number;
}

export interface RetirementPlanSummary {
  yearsCount: number;
  startAge: number;
  endAge: number;
  initialSavings: number;
  totalContributed: number;
  totalGrowth: number;
  projectedTotal: number;
  contributionPercent: number;
  growthPercent: number;
  yearlyData: YearlyRetirementData[];
}

export interface RetirementCalculationResult {
  currentPlan: RetirementPlanSummary;
  earlier5Years: RetirementPlanSummary;
  later5Years: RetirementPlanSummary;
}

function runSim(
  startAge: number,
  targetRetirementAge: number,
  initialSavings: number,
  initialMonthlyContribution: number,
  annualReturnRate: number,
  annualSalaryGrowthRate: number
): RetirementPlanSummary {
  const yearsCount = Math.max(0, targetRetirementAge - startAge);
  const initial = isNaN(initialSavings) || initialSavings < 0 ? 0 : initialSavings;
  const baseMonthly = isNaN(initialMonthlyContribution) || initialMonthlyContribution < 0 ? 0 : initialMonthlyContribution;
  const returnRate = isNaN(annualReturnRate) || annualReturnRate < 0 ? 0 : annualReturnRate / 100;
  const salaryGrowthRate = isNaN(annualSalaryGrowthRate) || annualSalaryGrowthRate < 0 ? 0 : annualSalaryGrowthRate / 100;

  const monthlyReturn = returnRate / 12;

  let balance = initial;
  let totalContributed = initial;
  let totalGrowth = 0;
  const yearlyData: YearlyRetirementData[] = [];

  if (yearsCount <= 0) {
    return {
      yearsCount: 0,
      startAge,
      endAge: targetRetirementAge,
      initialSavings: initial,
      totalContributed: initial,
      totalGrowth: 0,
      projectedTotal: initial,
      contributionPercent: 100,
      growthPercent: 0,
      yearlyData: [],
    };
  }

  for (let y = 1; y <= yearsCount; y++) {
    const currentAge = startAge + y;
    // Apply annual salary growth to monthly contribution
    const monthlyPmt = baseMonthly * Math.pow(1 + salaryGrowthRate, y - 1);
    
    let growthThisYear = 0;
    let contributionsThisYear = 0;

    for (let m = 1; m <= 12; m++) {
      // Interest earned on balance at start of month
      const interestMonth = balance * monthlyReturn;
      growthThisYear += interestMonth;
      contributionsThisYear += monthlyPmt;
      balance += interestMonth + monthlyPmt;
    }

    totalContributed += contributionsThisYear;
    totalGrowth += growthThisYear;

    yearlyData.push({
      year: y,
      age: currentAge,
      monthlyContribution: Math.round(monthlyPmt * 100) / 100,
      contributionsThisYear: Math.round(contributionsThisYear * 100) / 100,
      growthThisYear: Math.round(growthThisYear * 100) / 100,
      cumulativeContributions: Math.round(totalContributed * 100) / 100,
      cumulativeGrowth: Math.round(totalGrowth * 100) / 100,
      endBalance: Math.round(balance * 100) / 100,
    });
  }

  const finalBalance = Math.round(balance * 100) / 100;
  const roundedContributed = Math.round(totalContributed * 100) / 100;
  const roundedGrowth = Math.round(totalGrowth * 100) / 100;

  const contributionPercent = finalBalance > 0 ? Math.round((roundedContributed / finalBalance) * 1000) / 10 : 100;
  const growthPercent = finalBalance > 0 ? Math.round((roundedGrowth / finalBalance) * 1000) / 10 : 0;

  return {
    yearsCount,
    startAge,
    endAge: targetRetirementAge,
    initialSavings: initial,
    totalContributed: roundedContributed,
    totalGrowth: roundedGrowth,
    projectedTotal: finalBalance,
    contributionPercent,
    growthPercent,
    yearlyData,
  };
}

export function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number,
  annualSalaryGrowth: number = 0
): RetirementCalculationResult {
  const cAge = isNaN(currentAge) || currentAge < 0 ? 30 : currentAge;
  const rAge = isNaN(retirementAge) || retirementAge < 0 ? 65 : retirementAge;

  const currentPlan = runSim(
    cAge,
    rAge,
    currentSavings,
    monthlyContribution,
    annualReturn,
    annualSalaryGrowth
  );

  // Earlier 5 years means starting 5 years earlier (i.e. cAge - 5), compounding up to rAge
  const earlier5Years = runSim(
    cAge - 5,
    rAge,
    currentSavings,
    monthlyContribution,
    annualReturn,
    annualSalaryGrowth
  );

  // Later 5 years means starting 5 years later (i.e. cAge + 5), compounding up to rAge
  const later5Years = runSim(
    cAge + 5,
    rAge,
    currentSavings,
    monthlyContribution,
    annualReturn,
    annualSalaryGrowth
  );

  return {
    currentPlan,
    earlier5Years,
    later5Years,
  };
}
