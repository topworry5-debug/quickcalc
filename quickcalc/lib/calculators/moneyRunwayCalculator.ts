export interface MoneyRunwayInputs {
  currentSavings: number; // Initial Balance P ($0 - $5,000,000)
  monthlyWithdrawal: number; // Monthly spend W ($100 - $50,000)
  annualReturn: number; // r in % (0 - 15%)
  inflationRate: number; // i in % (0 - 10%)
  adjustForInflation: boolean; // toggle nominal vs real
  currentAge?: number; // default 60 (20 - 90)
}

export interface YearlySchedulePoint {
  yearIndex: number; // 1, 2, 3...
  calendarYear: number; // e.g. 2026
  age: number; // e.g. 60
  startBalance: number;
  growthEarned: number;
  annualWithdrawals: number;
  endBalance: number;
}

export interface ChartDataPoint {
  year: number; // 0, 1, 2...
  calendarYear: number;
  age: number;
  balance: number;
  annualSpend: number;
  growthEarned: number;
}

export interface SmartTipInsight {
  cutSpendAmount: number;
  addedMonths: number;
  addedYearsText: string;
  isPerpetualWithCut: boolean;
  message: string;
}

export interface MoneyRunwayResult {
  totalMonths: number;
  yearsElapsed: number;
  monthsElapsed: number;
  totalYearsAndMonths: string;
  isPerpetual: boolean;
  depletionAge: number | null;
  depletionAgeText: string;
  depletionYear: number | null;
  depletionYearText: string;
  totalWithdrawn: number;
  totalInterestEarned: number;
  initialWithdrawalRate: number; // in %
  swrRiskLevel: "safe" | "moderate" | "high";
  swrStatusLabel: string;
  yearlySchedule: YearlySchedulePoint[];
  chartData: ChartDataPoint[];
  smartTip: SmartTipInsight;
}

export const DEFAULT_RUNWAY_INPUTS: MoneyRunwayInputs = {
  currentSavings: 350000,
  monthlyWithdrawal: 2500,
  annualReturn: 5.0,
  inflationRate: 2.5,
  adjustForInflation: true,
  currentAge: 60,
};

/**
 * Runs a month-by-month simulation of portfolio depletion up to 600 months (50 years).
 */
export function calculateMoneyRunway(inputs: MoneyRunwayInputs): MoneyRunwayResult {
  const currentSavings = Math.max(0, inputs.currentSavings);
  const monthlyWithdrawal = Math.max(0, inputs.monthlyWithdrawal);
  const annualReturn = Math.max(0, inputs.annualReturn);
  const inflationRate = Math.max(0, inputs.inflationRate);
  const adjustForInflation = inputs.adjustForInflation;
  const currentAge = typeof inputs.currentAge === "number" ? inputs.currentAge : 60;

  const currentCalendarYear = 2026;

  // Initial withdrawal rate % = (monthlyWithdrawal * 12) / currentSavings * 100
  const annualWithdrawalInitial = monthlyWithdrawal * 12;
  const initialWithdrawalRate =
    currentSavings > 0 ? (annualWithdrawalInitial / currentSavings) * 100 : 0;

  // Safe Withdrawal Rate (SWR) Risk Classification
  let swrRiskLevel: "safe" | "moderate" | "high" = "high";
  let swrStatusLabel = "High Depletion Risk (Capital Eroding Quickly)";

  if (initialWithdrawalRate <= 4.0) {
    swrRiskLevel = "safe";
    swrStatusLabel = "Very Safe (4% Rule Compliant)";
  } else if (initialWithdrawalRate <= 6.0) {
    swrRiskLevel = "moderate";
    swrStatusLabel = "Moderate Risk (Watch Inflation)";
  }

  // Edge Case 1: Starting with 0 savings
  if (currentSavings <= 0) {
    return {
      totalMonths: 0,
      yearsElapsed: 0,
      monthsElapsed: 0,
      totalYearsAndMonths: "0 Months (Depleted Immediately)",
      isPerpetual: false,
      depletionAge: currentAge,
      depletionAgeText: `Funds depleted immediately at age ${currentAge}`,
      depletionYear: currentCalendarYear,
      depletionYearText: `Year ${currentCalendarYear}`,
      totalWithdrawn: 0,
      totalInterestEarned: 0,
      initialWithdrawalRate: 0,
      swrRiskLevel: "high",
      swrStatusLabel: "No Initial Savings",
      yearlySchedule: [],
      chartData: [{
        year: 0,
        calendarYear: currentCalendarYear,
        age: currentAge,
        balance: 0,
        annualSpend: 0,
        growthEarned: 0,
      }],
      smartTip: {
        cutSpendAmount: 0,
        addedMonths: 0,
        addedYearsText: "0 months",
        isPerpetualWithCut: false,
        message: "Build a starting reserve or emergency fund to establish a viable financial runway.",
      },
    };
  }

  // Edge Case 2: Zero withdrawal
  if (monthlyWithdrawal <= 0) {
    return {
      totalMonths: 600,
      yearsElapsed: 50,
      monthsElapsed: 0,
      totalYearsAndMonths: "Lasts Indefinitely",
      isPerpetual: true,
      depletionAge: null,
      depletionAgeText: "Funds will support you indefinitely (No withdrawals)",
      depletionYear: null,
      depletionYearText: "Indefinite Runway",
      totalWithdrawn: 0,
      totalInterestEarned: currentSavings * ((annualReturn / 100) * 50),
      initialWithdrawalRate: 0,
      swrRiskLevel: "safe",
      swrStatusLabel: "Very Safe (Zero Withdrawals)",
      yearlySchedule: [],
      chartData: [{
        year: 0,
        calendarYear: currentCalendarYear,
        age: currentAge,
        balance: currentSavings,
        annualSpend: 0,
        growthEarned: 0,
      }],
      smartTip: {
        cutSpendAmount: 0,
        addedMonths: 0,
        addedYearsText: "0 months",
        isPerpetualWithCut: true,
        message: "With zero monthly withdrawals, your savings balance continues compounding indefinitely.",
      },
    };
  }

  // Month-by-month simulation loop (max 600 months = 50 years)
  const maxMonths = 600;
  const monthlyReturnRate = annualReturn / (100 * 12);
  const monthlyInflationRate = inflationRate / (100 * 12);

  let currentBalance = currentSavings;
  let totalWithdrawn = 0;
  let totalInterestEarned = 0;
  let depletedMonthIndex: number | null = null;

  // Track yearly aggregates for schedule & chart
  interface TempYearData {
    startBalance: number;
    interestSum: number;
    withdrawalSum: number;
    endBalance: number;
  }

  const yearlyMap = new Map<number, TempYearData>();
  let currentYearInterest = 0;
  let currentYearWithdrawal = 0;
  let yearStartBalance = currentSavings;

  for (let m = 1; m <= maxMonths; m++) {
    const yearNumber = Math.ceil(m / 12);

    // If starting a new year
    if ((m - 1) % 12 === 0) {
      yearStartBalance = currentBalance;
      currentYearInterest = 0;
      currentYearWithdrawal = 0;
    }

    // Monthly inflation adjustment: Wm = W * (1 + inflationRate / (100 * 12))^m
    const monthlySpend = adjustForInflation
      ? monthlyWithdrawal * Math.pow(1 + monthlyInflationRate, m)
      : monthlyWithdrawal;

    // Monthly interest earned: Interest_m = Balance_{m-1} * r_m
    const interestThisMonth = currentBalance * monthlyReturnRate;
    totalInterestEarned += interestThisMonth;
    currentYearInterest += interestThisMonth;

    // Check if balance + interest can satisfy the full withdrawal
    const balanceWithInterest = currentBalance + interestThisMonth;

    if (balanceWithInterest <= monthlySpend) {
      // Depleted during month m
      const finalWithdrawal = Math.max(0, balanceWithInterest);
      totalWithdrawn += finalWithdrawal;
      currentYearWithdrawal += finalWithdrawal;
      currentBalance = 0;
      depletedMonthIndex = m;

      // Finalize this year's data
      yearlyMap.set(yearNumber, {
        startBalance: yearStartBalance,
        interestSum: currentYearInterest,
        withdrawalSum: currentYearWithdrawal,
        endBalance: 0,
      });

      break;
    }

    // Normal month continuation
    currentBalance = balanceWithInterest - monthlySpend;
    totalWithdrawn += monthlySpend;
    currentYearWithdrawal += monthlySpend;

    // If ending a year or this is the last month
    if (m % 12 === 0 || m === maxMonths) {
      yearlyMap.set(yearNumber, {
        startBalance: yearStartBalance,
        interestSum: currentYearInterest,
        withdrawalSum: currentYearWithdrawal,
        endBalance: currentBalance,
      });
    }
  }

  const isPerpetual = depletedMonthIndex === null && currentBalance >= currentSavings;
  const isSurviving50Years = depletedMonthIndex === null && currentBalance > 0;

  // Calculate elapsed duration
  let yearsElapsed = 0;
  let monthsElapsed = 0;
  let totalMonths = 0;
  let totalYearsAndMonths = "";
  let depletionAge: number | null = null;
  let depletionAgeText = "";
  let depletionYear: number | null = null;
  let depletionYearText = "";

  if (isPerpetual) {
    totalMonths = 600;
    yearsElapsed = 50;
    monthsElapsed = 0;
    totalYearsAndMonths = "Lasts Indefinitely";
    depletionAge = null;
    depletionAgeText = `Funds will support you past age ${currentAge + 50}+ (Indefinite Runway)`;
    depletionYear = null;
    depletionYearText = "Indefinite / Permanent Capital Preservation";
  } else if (isSurviving50Years) {
    totalMonths = 600;
    yearsElapsed = 50;
    monthsElapsed = 0;
    totalYearsAndMonths = "50+ Years (600+ Months)";
    depletionAge = currentAge + 50;
    depletionAgeText = `Funds will support you past age ${currentAge + 50}`;
    depletionYear = currentCalendarYear + 50;
    depletionYearText = `Year ${depletionYear}+`;
  } else if (depletedMonthIndex !== null) {
    totalMonths = depletedMonthIndex;
    yearsElapsed = Math.floor(depletedMonthIndex / 12);
    monthsElapsed = depletedMonthIndex % 12;

    if (yearsElapsed > 0 && monthsElapsed > 0) {
      totalYearsAndMonths = `${yearsElapsed} Year${yearsElapsed > 1 ? "s" : ""}, ${monthsElapsed} Month${monthsElapsed > 1 ? "s" : ""}`;
    } else if (yearsElapsed > 0) {
      totalYearsAndMonths = `${yearsElapsed} Year${yearsElapsed > 1 ? "s" : ""}`;
    } else {
      totalYearsAndMonths = `${monthsElapsed} Month${monthsElapsed > 1 ? "s" : ""}`;
    }

    depletionAge = currentAge + yearsElapsed;
    depletionYear = currentCalendarYear + yearsElapsed;
    depletionAgeText = `Funds will support you until age ${depletionAge} (Year ${depletionYear})`;
    depletionYearText = `Year ${depletionYear}`;
  }

  // Construct yearly schedule
  const yearlySchedule: YearlySchedulePoint[] = [];
  const chartData: ChartDataPoint[] = [];

  // Initial year 0 point for chart
  chartData.push({
    year: 0,
    calendarYear: currentCalendarYear,
    age: currentAge,
    balance: currentSavings,
    annualSpend: annualWithdrawalInitial,
    growthEarned: 0,
  });

  let runningGrowth = 0;

  yearlyMap.forEach((data, yearNum) => {
    const calendarYear = currentCalendarYear + (yearNum - 1);
    const age = currentAge + (yearNum - 1);
    runningGrowth += data.interestSum;

    yearlySchedule.push({
      yearIndex: yearNum,
      calendarYear,
      age,
      startBalance: data.startBalance,
      growthEarned: data.interestSum,
      annualWithdrawals: data.withdrawalSum,
      endBalance: data.endBalance,
    });

    chartData.push({
      year: yearNum,
      calendarYear: calendarYear + 1,
      age: age + 1,
      balance: Math.max(0, data.endBalance),
      annualSpend: data.withdrawalSum,
      growthEarned: runningGrowth,
    });
  });

  // Calculate "What-If" Dynamic Insight (e.g. cutting monthly spend)
  // Determine cut amount: $250 if withdrawal >= $1,500, else 10% rounded to $50
  const cutSpendAmount =
    monthlyWithdrawal >= 2000
      ? 250
      : monthlyWithdrawal >= 1000
      ? 150
      : Math.max(25, Math.round((monthlyWithdrawal * 0.1) / 25) * 25);

  const whatIfInputs: MoneyRunwayInputs = {
    ...inputs,
    monthlyWithdrawal: Math.max(50, monthlyWithdrawal - cutSpendAmount),
  };

  const whatIfResult = runSimpleRunwaySimulation(whatIfInputs);

  let smartTip: SmartTipInsight;

  if (isPerpetual) {
    smartTip = {
      cutSpendAmount,
      addedMonths: 0,
      addedYearsText: "Perpetual Growth",
      isPerpetualWithCut: true,
      message: `Your current annual return (${annualReturn}%) outpaces your withdrawal rate (${initialWithdrawalRate.toFixed(1)}%). Your portfolio is self-sustaining without depleting capital!`,
    };
  } else if (whatIfResult.isPerpetual) {
    smartTip = {
      cutSpendAmount,
      addedMonths: 600 - totalMonths,
      addedYearsText: "Indefinite Runway",
      isPerpetualWithCut: true,
      message: `Cutting your monthly spend by just $${cutSpendAmount.toLocaleString()} shifts your portfolio into perpetual growth, so your money never runs out.`,
    };
  } else {
    const addedMonths = Math.max(0, whatIfResult.totalMonths - totalMonths);
    const addedYears = Math.floor(addedMonths / 12);
    const remMonths = addedMonths % 12;

    let addedYearsText = "";
    if (addedYears > 0 && remMonths > 0) {
      addedYearsText = `${addedYears} Year${addedYears > 1 ? "s" : ""} and ${remMonths} Month${remMonths > 1 ? "s" : ""}`;
    } else if (addedYears > 0) {
      addedYearsText = `${addedYears} Year${addedYears > 1 ? "s" : ""}`;
    } else {
      addedYearsText = `${remMonths} Month${remMonths > 1 ? "s" : ""}`;
    }

    smartTip = {
      cutSpendAmount,
      addedMonths,
      addedYearsText,
      isPerpetualWithCut: false,
      message: `Cutting your monthly spend by just $${cutSpendAmount.toLocaleString()} adds ${addedYearsText} to your savings runway.`,
    };
  }

  return {
    totalMonths,
    yearsElapsed,
    monthsElapsed,
    totalYearsAndMonths,
    isPerpetual,
    depletionAge,
    depletionAgeText,
    depletionYear,
    depletionYearText,
    totalWithdrawn,
    totalInterestEarned,
    initialWithdrawalRate,
    swrRiskLevel,
    swrStatusLabel,
    yearlySchedule,
    chartData,
    smartTip,
  };
}

/**
 * Lightweight helper to calculate duration for What-If scenarios.
 */
function runSimpleRunwaySimulation(inputs: MoneyRunwayInputs): { totalMonths: number; isPerpetual: boolean } {
  const currentSavings = Math.max(0, inputs.currentSavings);
  const monthlyWithdrawal = Math.max(0, inputs.monthlyWithdrawal);
  const annualReturn = Math.max(0, inputs.annualReturn);
  const inflationRate = Math.max(0, inputs.inflationRate);
  const adjustForInflation = inputs.adjustForInflation;

  if (currentSavings <= 0) return { totalMonths: 0, isPerpetual: false };
  if (monthlyWithdrawal <= 0) return { totalMonths: 600, isPerpetual: true };

  const maxMonths = 600;
  const monthlyReturnRate = annualReturn / (100 * 12);
  const monthlyInflationRate = inflationRate / (100 * 12);

  let currentBalance = currentSavings;

  for (let m = 1; m <= maxMonths; m++) {
    const monthlySpend = adjustForInflation
      ? monthlyWithdrawal * Math.pow(1 + monthlyInflationRate, m)
      : monthlyWithdrawal;

    const interestThisMonth = currentBalance * monthlyReturnRate;
    const balanceWithInterest = currentBalance + interestThisMonth;

    if (balanceWithInterest <= monthlySpend) {
      return { totalMonths: m, isPerpetual: false };
    }

    currentBalance = balanceWithInterest - monthlySpend;
  }

  return {
    totalMonths: 600,
    isPerpetual: currentBalance >= currentSavings,
  };
}

/**
 * Utility currency formatter.
 */
export function formatCurrency(amount: number, includeCents = false): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: includeCents ? 2 : 0,
    maximumFractionDigits: includeCents ? 2 : 0,
  }).format(amount);
}

/**
 * Generates CSV string for the year-by-year schedule.
 */
export function generateScheduleCSV(schedule: YearlySchedulePoint[]): string {
  const headers = [
    "Year",
    "Calendar Year",
    "Age",
    "Starting Balance ($)",
    "Growth Earned ($)",
    "Annual Withdrawals ($)",
    "End Balance ($)",
  ];

  const rows = schedule.map((item) => [
    item.yearIndex,
    item.calendarYear,
    item.age,
    item.startBalance.toFixed(2),
    item.growthEarned.toFixed(2),
    item.annualWithdrawals.toFixed(2),
    item.endBalance.toFixed(2),
  ]);

  return [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
}
