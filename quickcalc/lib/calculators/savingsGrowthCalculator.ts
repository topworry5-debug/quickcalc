export interface SavingsCalculationResult {
  totalContributed: number;
  totalInterest: number;
  finalBalance: number;
  yearlyData: YearlyGrowthData[];
}

export interface YearlyGrowthData {
  year: number;
  contributionsThisYear: number;
  interestThisYear: number;
  cumulativeContributions: number;
  cumulativeInterest: number;
  endBalance: number;
}

export function calculateSavingsGrowth(
  initialDeposit: number,
  regularAmount: number,
  frequency: "monthly" | "yearly",
  annualRate: number,
  compoundingFrequency: "annually" | "monthly" | "daily",
  years: number
): SavingsCalculationResult {
  const yearsNum = isNaN(years) || years < 0 ? 0 : years;
  const initial = isNaN(initialDeposit) || initialDeposit < 0 ? 0 : initialDeposit;
  const regular = isNaN(regularAmount) || regularAmount < 0 ? 0 : regularAmount;
  const rate = isNaN(annualRate) || annualRate < 0 ? 0 : annualRate / 100;

  // Tracking details
  let currentBalance = initial;
  let totalContributed = initial;
  const yearlyData: YearlyGrowthData[] = [];

  const pmtAmount = regular;

  // To do a standard year-by-year compounding calculation with regular additions:
  // We can simulate month-by-month (or day-by-day/year-by-year) but since compounding frequency and contribution frequency might differ,
  // the standard industry approach (e.g. investor.gov style) is to track compounding per compounding period,
  // and process contributions at the contribution period.
  // Let's model this day-by-day or month-by-month, or we can use standard monthly steps if compounding is monthly/daily/yearly.
  // A precise chronological simulation is simple and robust:
  // There are 365 days in a year.
  // We can simulate each year step-by-step. Let's do monthly simulation for maximum accuracy and ease of alignment,
  // or day-by-day if daily compounding is selected.
  // Actually, standard compound interest with regular payments assumes contributions happen at the end (or start) of each contribution period.
  // Let's assume standard end-of-period (or beginning-of-period) contributions. Let's use end-of-period contributions.
  // Let's compute day-by-day or month-by-month depending on compounding or contribution frequency:
  // To keep it simple, extremely robust, and standard:
  // We can simulate month-by-month:
  // For each year, we can divide the year into 12 months (or 365 days).
  // Let's do a monthly simulation:
  // Total months = years * 12.
  // For daily compounding, daily interest rate is rate / 365. For monthly, rate / 12. For annual, rate / 1.
  // Let's run a monthly loop (since payments are either monthly or yearly, and compounding is daily, monthly, or annual).
  // If compounding is daily: each month has ~30.4167 days, or we can compound monthly with equivalent daily rate, or run daily loop.
  // Let's run a monthly loop:
  // Each year has 12 months.
  // Let's compute interest earned and contributions for each month:
  // For each month m from 1 to years * 12:
  // 1. Calculate interest for this month based on currentBalance.
  //    How is interest calculated for this month?
  //    - Monthly compounding: currentBalance * (rate / 12)
  //    - Annual compounding: compounded once at the end of the year, or we can compound daily.
  // Let's write a general step-by-step interest and payment simulator:
  // Since we want standard compound interest formula:
  // Let's do daily simulation for maximum precision, or we can run a loop over the smallest unit.
  // Let's do a monthly loop (12 periods per year).
  // If compounding is "daily":
  //   Interest factor for 1 month = (1 + rate / 365) ^ (365 / 12) - 1
  // If compounding is "monthly":
  //   Interest factor for 1 month = rate / 12
  // If compounding is "annually":
  //   Interest factor for 1 month = (1 + rate) ^ (1 / 12) - 1
  //
  // Let's use these monthly interest factors! It is extremely elegant, matches the mathematical formulas perfectly,
  // and keeps year-by-year compounding super precise and consistent.
  //
  // Let's calculate the interest factor per month:
  let monthlyInterestFactor = 0;
  if (rate > 0) {
    if (compoundingFrequency === "daily") {
      monthlyInterestFactor = Math.pow(1 + rate / 365, 365 / 12) - 1;
    } else if (compoundingFrequency === "monthly") {
      monthlyInterestFactor = rate / 12;
    } else {
      // annually
      monthlyInterestFactor = Math.pow(1 + rate, 1 / 12) - 1;
    }
  }

  for (let y = 1; y <= yearsNum; y++) {
    let contributionsThisYear = 0;
    let interestThisYear = 0;

    for (let m = 1; m <= 12; m++) {
      // 1. Earn interest on current balance for the month
      const interestEarned = currentBalance * monthlyInterestFactor;
      interestThisYear += interestEarned;
      currentBalance += interestEarned;

      // 2. Contributions
      let contributionAmount = 0;
      if (frequency === "monthly") {
        contributionAmount = pmtAmount;
      } else if (frequency === "yearly" && m === 12) {
        // Annual contribution at end of year
        contributionAmount = pmtAmount;
      }

      contributionsThisYear += contributionAmount;
      totalContributed += contributionAmount;
      currentBalance += contributionAmount;
    }

    const cumulativeContributions = totalContributed;
    const endBalance = currentBalance;
    const cumulativeInterest = endBalance - totalContributed;

    yearlyData.push({
      year: y,
      contributionsThisYear,
      interestThisYear,
      cumulativeContributions,
      cumulativeInterest,
      endBalance,
    });
  }

  const finalTotalInterest = currentBalance - totalContributed;

  return {
    totalContributed: Math.round(totalContributed * 100) / 100,
    totalInterest: Math.round(finalTotalInterest * 100) / 100,
    finalBalance: Math.round(currentBalance * 100) / 100,
    yearlyData: yearlyData.map(d => ({
      year: d.year,
      contributionsThisYear: Math.round(d.contributionsThisYear * 100) / 100,
      interestThisYear: Math.round(d.interestThisYear * 100) / 100,
      cumulativeContributions: Math.round(d.cumulativeContributions * 100) / 100,
      cumulativeInterest: Math.round(d.cumulativeInterest * 100) / 100,
      endBalance: Math.round(d.endBalance * 100) / 100,
    })),
  };
}

export function getSavingsGrowthExplanationSteps(
  initialDeposit: number,
  regularAmount: number,
  frequency: "monthly" | "yearly",
  annualRate: number,
  years: number,
  result: SavingsCalculationResult
): string[] {
  const steps: string[] = [];

  steps.push(`Initial deposit starting principal: $${initialDeposit.toLocaleString()}`);
  steps.push(`Recurring contribution: $${regularAmount.toLocaleString()} per ${frequency}`);

  const recurringTotal = result.totalContributed - initialDeposit;
  steps.push(`Calculate total deposits over ${years} years: $${initialDeposit.toLocaleString()} initial + $${recurringTotal.toLocaleString()} recurring = $${result.totalContributed.toLocaleString()} contributed out of pocket`);

  steps.push(`Compound interest earned at ${annualRate}% APY over ${years} years: Earned $${result.totalInterest.toLocaleString()} in interest returns`);

  steps.push(`Final accumulated nest egg: $${result.totalContributed.toLocaleString()} (principal) + $${result.totalInterest.toLocaleString()} (interest) = $${result.finalBalance.toLocaleString()}`);

  const interestPct = (result.totalInterest / (result.finalBalance || 1)) * 100;
  steps.push(`Portfolio ratio: Contributions account for ${((result.totalContributed / (result.finalBalance || 1)) * 100).toFixed(1)}% of your balance, while compound growth provided ${interestPct.toFixed(1)}%`);

  return steps;
}
