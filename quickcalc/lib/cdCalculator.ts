export type CompoundFrequency = "daily" | "monthly" | "quarterly" | "annually";

export interface CdCalculatorInputs {
  initialDeposit: number; // Principal $P ($100 - $2,000,000)
  annualPercentageYield: number; // APY / Interest Rate in % (0.1% - 15.0%)
  cdTermMonths: number; // Term in months (3, 6, 9, 12, 18, 24, 36, 48, 60)
  compoundFrequency: CompoundFrequency; // Daily (365), Monthly (12), Quarterly (4), Annually (1)
  taxBracket: number; // Federal + state combined tax rate in % (0, 10, 12, 22, 24, 32, 35, 37)
  earlyWithdrawalPenaltyDays?: number; // Days of interest forfeited (30, 60, 90, 180, 270, 365)
  earlyWithdrawalMonth?: number; // Simulated premature withdrawal month (1 to termMonths - 1)
}

export interface CdSchedulePoint {
  month: number;
  label: string;
  startBalance: number;
  interestEarned: number;
  accumulatedInterest: number;
  accumulatedTax: number;
  endBalance: number;
  netEndBalance: number;
}

export interface CdChartPoint {
  month: number;
  label: string;
  principal: number;
  accumulatedInterest: number;
  totalBalance: number;
  netBalance: number;
}

export interface EarlyWithdrawalResult {
  withdrawalMonth: number;
  penaltyDays: number;
  accruedInterestAtWithdrawal: number;
  dailyRate: number;
  penaltyAmount: number;
  netInterestRetained: number;
  earlyCashOutValue: number;
  principalErosion: number;
  lostMaturityInterest: number;
}

export interface CdCalculatorResult {
  initialDeposit: number;
  annualRate: number;
  termMonths: number;
  termYears: number;
  compoundFrequencyName: string;
  compoundPeriodsPerYear: number;
  effectiveApy: number;

  grossMaturityBalance: number;
  grossInterestEarned: number;
  taxAmount: number;
  netInterestEarned: number;
  netMaturityBalance: number;

  dailyInterestRate: number;
  dailyEarnings: number;
  monthlyAverageInterest: number;

  schedule: CdSchedulePoint[];
  chartPoints: CdChartPoint[];
  penaltySimulation: EarlyWithdrawalResult;
}

export const FREQUENCY_MAP: Record<CompoundFrequency, { name: string; periods: number }> = {
  daily: { name: "Daily (365/yr)", periods: 365 },
  monthly: { name: "Monthly (12/yr)", periods: 12 },
  quarterly: { name: "Quarterly (4/yr)", periods: 4 },
  annually: { name: "Annually (1/yr)", periods: 1 },
};

export const CD_TERM_PRESETS = [
  { label: "3 Mo", months: 3 },
  { label: "6 Mo", months: 6 },
  { label: "9 Mo", months: 9 },
  { label: "1 Yr", months: 12 },
  { label: "18 Mo", months: 18 },
  { label: "2 Yr", months: 24 },
  { label: "3 Yr", months: 36 },
  { label: "4 Yr", months: 48 },
  { label: "5 Yr", months: 60 },
];

export const TAX_BRACKET_OPTIONS = [
  { label: "0% (Tax-Exempt / IRA)", value: 0 },
  { label: "10% (Federal Lowest)", value: 10 },
  { label: "12% (Standard Bracket)", value: 12 },
  { label: "22% (Median Bracket)", value: 22 },
  { label: "24% (Middle-High)", value: 24 },
  { label: "32% (High Earner)", value: 32 },
  { label: "35% (Upper Tier)", value: 35 },
  { label: "37% (Top Federal Tier)", value: 37 },
];

export const DEFAULT_CD_INPUTS: CdCalculatorInputs = {
  initialDeposit: 10000,
  annualPercentageYield: 4.5,
  cdTermMonths: 12,
  compoundFrequency: "monthly",
  taxBracket: 22,
  earlyWithdrawalPenaltyDays: 90,
  earlyWithdrawalMonth: 6,
};

export function formatCurrency(amount: number, decimals: number = 2): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatPercent(rate: number, decimals: number = 2): string {
  return `${rate.toFixed(decimals)}%`;
}

/**
 * Calculates CD compound growth, tax deduction, schedule trajectory, and penalty simulation.
 */
export function calculateCdGrowth(inputs: CdCalculatorInputs): CdCalculatorResult {
  const deposit = Math.max(100, Math.min(10000000, inputs.initialDeposit || 10000));
  const apyRate = Math.max(0.01, Math.min(30, inputs.annualPercentageYield || 4.5));
  const termMonths = Math.max(1, Math.min(120, inputs.cdTermMonths || 12));
  const termYears = termMonths / 12;
  const freqConfig = FREQUENCY_MAP[inputs.compoundFrequency] || FREQUENCY_MAP.monthly;
  const n = freqConfig.periods;
  const r = apyRate / 100;
  const taxRate = Math.max(0, Math.min(60, inputs.taxBracket || 0)) / 100;

  // Standard Compound Interest Formula: A = P * (1 + r/n)^(n * t)
  const totalPeriods = n * termYears;
  const grossMaturityBalance = deposit * Math.pow(1 + r / n, totalPeriods);
  const grossInterestEarned = Math.max(0, grossMaturityBalance - deposit);

  // Tax and Net Calculations
  const taxAmount = grossInterestEarned * taxRate;
  const netInterestEarned = grossInterestEarned - taxAmount;
  const netMaturityBalance = deposit + netInterestEarned;

  // Effective APY: (1 + r/n)^n - 1
  const effectiveApy = (Math.pow(1 + r / n, n) - 1) * 100;

  const dailyInterestRate = r / 365;
  const dailyEarnings = (deposit * r) / 365;
  const monthlyAverageInterest = termMonths > 0 ? grossInterestEarned / termMonths : 0;

  // Monthly Schedule Generation
  const schedule: CdSchedulePoint[] = [];
  const chartPoints: CdChartPoint[] = [];

  // Point 0 (Start)
  chartPoints.push({
    month: 0,
    label: "Start",
    principal: deposit,
    accumulatedInterest: 0,
    totalBalance: deposit,
    netBalance: deposit,
  });

  let runningBalance = deposit;
  let runningAccruedInterest = 0;

  for (let m = 1; m <= termMonths; m++) {
    const elapsedYears = m / 12;
    const balanceAtMonth = deposit * Math.pow(1 + r / n, n * elapsedYears);
    const monthInterest = balanceAtMonth - runningBalance;
    runningAccruedInterest += monthInterest;
    runningBalance = balanceAtMonth;

    const monthTax = runningAccruedInterest * taxRate;
    const netMonthEndBalance = deposit + (runningAccruedInterest - monthTax);

    const pointLabel = m % 12 === 0 ? `Yr ${m / 12}` : `Mo ${m}`;

    schedule.push({
      month: m,
      label: pointLabel,
      startBalance: balanceAtMonth - monthInterest,
      interestEarned: monthInterest,
      accumulatedInterest: runningAccruedInterest,
      accumulatedTax: monthTax,
      endBalance: balanceAtMonth,
      netEndBalance: netMonthEndBalance,
    });

    // Chart downsampling if term is long: ensure chart has 6-13 clean points
    const shouldIncludeInChart =
      termMonths <= 18 ||
      m % Math.ceil(termMonths / 12) === 0 ||
      m === termMonths;

    if (shouldIncludeInChart) {
      chartPoints.push({
        month: m,
        label: pointLabel,
        principal: deposit,
        accumulatedInterest: runningAccruedInterest,
        totalBalance: balanceAtMonth,
        netBalance: netMonthEndBalance,
      });
    }
  }

  // Early Withdrawal Penalty Simulation
  // Default penalty days: 90 days for <= 12 mo, 180 days for > 12 mo if unspecified
  const defaultPenaltyDays = termMonths <= 12 ? 90 : 180;
  const penaltyDays = inputs.earlyWithdrawalPenaltyDays ?? defaultPenaltyDays;
  const simulatedWithdrawalMonth = Math.min(
    termMonths - 1,
    Math.max(1, inputs.earlyWithdrawalMonth ?? Math.min(6, Math.max(1, Math.floor(termMonths / 2))))
  );

  const elapsedWithdrawalYears = simulatedWithdrawalMonth / 12;
  const balanceAtEarlyExit = deposit * Math.pow(1 + r / n, n * elapsedWithdrawalYears);
  const accruedInterestAtEarlyExit = Math.max(0, balanceAtEarlyExit - deposit);

  // Bank simple penalty formula: Principal * (r / 365) * penaltyDays
  const penaltyAmount = deposit * (r / 365) * penaltyDays;
  const netInterestRetained = Math.max(0, accruedInterestAtEarlyExit - penaltyAmount);
  const principalErosion = penaltyAmount > accruedInterestAtEarlyExit ? penaltyAmount - accruedInterestAtEarlyExit : 0;
  const earlyCashOutValue = deposit - principalErosion + netInterestRetained;
  const lostMaturityInterest = grossInterestEarned - netInterestRetained;

  const penaltySimulation: EarlyWithdrawalResult = {
    withdrawalMonth: simulatedWithdrawalMonth,
    penaltyDays,
    accruedInterestAtWithdrawal: accruedInterestAtEarlyExit,
    dailyRate: dailyInterestRate,
    penaltyAmount,
    netInterestRetained,
    earlyCashOutValue,
    principalErosion,
    lostMaturityInterest,
  };

  return {
    initialDeposit: deposit,
    annualRate: apyRate,
    termMonths,
    termYears,
    compoundFrequencyName: freqConfig.name,
    compoundPeriodsPerYear: n,
    effectiveApy,
    grossMaturityBalance,
    grossInterestEarned,
    taxAmount,
    netInterestEarned,
    netMaturityBalance,
    dailyInterestRate,
    dailyEarnings,
    monthlyAverageInterest,
    schedule,
    chartPoints,
    penaltySimulation,
  };
}

/**
 * Generates CSV string for export
 */
export function generateCdCsv(result: CdCalculatorResult): string {
  const headers = [
    "Month",
    "Label",
    "Starting Balance ($)",
    "Interest Earned ($)",
    "Accumulated Gross Interest ($)",
    "Estimated Tax ($)",
    "Gross Ending Balance ($)",
    "Net Ending Balance ($)",
  ];

  const rows = result.schedule.map((row) => [
    row.month,
    `"${row.label}"`,
    row.startBalance.toFixed(2),
    row.interestEarned.toFixed(2),
    row.accumulatedInterest.toFixed(2),
    row.accumulatedTax.toFixed(2),
    row.endBalance.toFixed(2),
    row.netEndBalance.toFixed(2),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
