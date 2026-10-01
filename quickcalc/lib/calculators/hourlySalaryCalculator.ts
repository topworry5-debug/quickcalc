export interface HourlySalaryInput {
  hourlyWage: number;
  hoursPerWeek: number;
  daysPerWeek: number;
  unpaidWeeksPerYear: number;
  paidVacationWeeks: number;
  overtimeHoursPerWeek: number;
  annualBonus: number;
}

export interface PeriodEarnings {
  hourly: number;
  daily: number;
  weekly: number;
  biweekly: number;
  semimonthly: number;
  monthly: number;
  annual: number;
}

export interface HourlySalaryResult {
  unadjustedAnnual: number;
  adjustedAnnual: number;
  regularAnnualPay: number;
  overtimeAnnualPay: number;
  annualBonus: number;
  workingWeeksPerYear: number;
  totalAnnualHours: number;
  effectiveHourlyRate: number;

  unadjustedPeriods: PeriodEarnings;
  adjustedPeriods: PeriodEarnings;
}

export const DEFAULT_HOURLY_INPUT: HourlySalaryInput = {
  hourlyWage: 35,
  hoursPerWeek: 40,
  daysPerWeek: 5,
  unpaidWeeksPerYear: 0,
  paidVacationWeeks: 2,
  overtimeHoursPerWeek: 0,
  annualBonus: 0,
};

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function formatMoneyDetailed(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calculateHourlyToSalary(input: HourlySalaryInput): HourlySalaryResult {
  const hourly = Math.max(0, input.hourlyWage);
  const hoursPerWeek = Math.max(1, Math.min(100, input.hoursPerWeek));
  const daysPerWeek = Math.max(1, Math.min(7, input.daysPerWeek));
  const unpaidWeeks = Math.max(0, Math.min(52, input.unpaidWeeksPerYear));
  const workingWeeks = Math.max(0, 52 - unpaidWeeks);
  const overtimeHours = Math.max(0, input.overtimeHoursPerWeek);
  const bonus = Math.max(0, input.annualBonus);

  // Standard (Unadjusted 2,080 hours = 40h * 52w)
  const standardHours = hoursPerWeek * 52;
  const unadjustedAnnual = hourly * standardHours;

  const unadjustedPeriods: PeriodEarnings = {
    hourly,
    daily: (unadjustedAnnual / (daysPerWeek * 52)),
    weekly: unadjustedAnnual / 52,
    biweekly: unadjustedAnnual / 26,
    semimonthly: unadjustedAnnual / 24,
    monthly: unadjustedAnnual / 12,
    annual: unadjustedAnnual,
  };

  // Adjusted (factors unpaid time off, overtime at 1.5x, and bonuses)
  const regularAnnualHours = hoursPerWeek * workingWeeks;
  const overtimeAnnualHours = overtimeHours * workingWeeks;
  const totalAnnualHours = regularAnnualHours + overtimeAnnualHours;

  const regularAnnualPay = regularAnnualHours * hourly;
  const overtimeAnnualPay = overtimeAnnualHours * (hourly * 1.5);
  const adjustedAnnual = regularAnnualPay + overtimeAnnualPay + bonus;

  const adjustedWorkingDays = Math.max(1, daysPerWeek * workingWeeks);

  const adjustedPeriods: PeriodEarnings = {
    hourly,
    daily: adjustedAnnual / adjustedWorkingDays,
    weekly: workingWeeks > 0 ? adjustedAnnual / 52 : 0,
    biweekly: adjustedAnnual / 26,
    semimonthly: adjustedAnnual / 24,
    monthly: adjustedAnnual / 12,
    annual: adjustedAnnual,
  };

  const effectiveHourlyRate = totalAnnualHours > 0 ? adjustedAnnual / totalAnnualHours : hourly;

  return {
    unadjustedAnnual: Math.round(unadjustedAnnual),
    adjustedAnnual: Math.round(adjustedAnnual),
    regularAnnualPay: Math.round(regularAnnualPay),
    overtimeAnnualPay: Math.round(overtimeAnnualPay),
    annualBonus: Math.round(bonus),
    workingWeeksPerYear: workingWeeks,
    totalAnnualHours: Math.round(totalAnnualHours),
    effectiveHourlyRate: Number(effectiveHourlyRate.toFixed(2)),
    unadjustedPeriods,
    adjustedPeriods,
  };
}

// Popular wage benchmark conversions table (2,080 standard hours)
export const HOURLY_BENCHMARKS = [
  { hourly: 15, annual: 31200, monthly: 2600, biweekly: 1200 },
  { hourly: 20, annual: 41600, monthly: 3467, biweekly: 1600 },
  { hourly: 25, annual: 52000, monthly: 4333, biweekly: 2000 },
  { hourly: 30, annual: 62400, monthly: 5200, biweekly: 2400 },
  { hourly: 35, annual: 72800, monthly: 6067, biweekly: 2800 },
  { hourly: 40, annual: 83200, monthly: 6933, biweekly: 3200 },
  { hourly: 45, annual: 93600, monthly: 7800, biweekly: 3600 },
  { hourly: 50, annual: 104000, monthly: 8667, biweekly: 4000 },
  { hourly: 60, annual: 124800, monthly: 10400, biweekly: 4800 },
  { hourly: 75, annual: 156000, monthly: 13000, biweekly: 6000 },
  { hourly: 100, annual: 208000, monthly: 17333, biweekly: 8000 },
];
