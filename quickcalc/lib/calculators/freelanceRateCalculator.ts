/**
 * Freelance Rate Calculator Logic
 */

export interface FreelanceRateInput {
  desiredIncome: number;
  incomePeriod: "annual" | "monthly";
  mode: "basic" | "advanced";
  expenses: number;
  expensesPeriod: "annual" | "monthly";
  workWeeksPerYear: number;
  workHoursPerWeek: number;
  billablePercentage: number;
}

export interface FreelanceRateResult {
  totalAnnualDesiredIncome: number;
  totalAnnualExpenses: number;
  totalAnnualRevenueNeeded: number;
  totalWorkingHoursPerYear: number;
  totalBillableHoursPerYear: number;
  billableHoursPerWeek: number;
  nonBillableHoursPerWeek: number;
  minimumHourlyRate: number;
  dailyRate: number;
  weeklyTarget: number;
  monthlyTarget: number;
}

export function calculateFreelanceRate(input: FreelanceRateInput): FreelanceRateResult {
  const {
    desiredIncome,
    incomePeriod,
    mode,
    expenses,
    expensesPeriod,
    workWeeksPerYear,
    workHoursPerWeek,
    billablePercentage,
  } = input;

  const validDesiredIncome = Math.max(0, desiredIncome || 0);
  const totalAnnualDesiredIncome =
    incomePeriod === "monthly" ? validDesiredIncome * 12 : validDesiredIncome;

  const validExpenses = mode === "advanced" ? Math.max(0, expenses || 0) : 0;
  const totalAnnualExpenses =
    expensesPeriod === "monthly" ? validExpenses * 12 : validExpenses;

  const totalAnnualRevenueNeeded = totalAnnualDesiredIncome + totalAnnualExpenses;

  const validWeeks = Math.min(52, Math.max(1, workWeeksPerYear || 48));
  const validHours = Math.min(168, Math.max(1, workHoursPerWeek || 40));
  const validBillablePct = Math.min(100, Math.max(1, billablePercentage || 70));

  const totalWorkingHoursPerYear = validWeeks * validHours;
  const totalBillableHoursPerYear = totalWorkingHoursPerYear * (validBillablePct / 100);

  const billableHoursPerWeek = validHours * (validBillablePct / 100);
  const nonBillableHoursPerWeek = validHours - billableHoursPerWeek;

  const minimumHourlyRate =
    totalBillableHoursPerYear > 0
      ? totalAnnualRevenueNeeded / totalBillableHoursPerYear
      : 0;

  // Daily target rate based on 5-day work week over the active work weeks
  const totalWorkDays = validWeeks * 5;
  const dailyRate = totalWorkDays > 0 ? totalAnnualRevenueNeeded / totalWorkDays : 0;

  const weeklyTarget = validWeeks > 0 ? totalAnnualRevenueNeeded / validWeeks : 0;
  const monthlyTarget = totalAnnualRevenueNeeded / 12;

  return {
    totalAnnualDesiredIncome,
    totalAnnualExpenses,
    totalAnnualRevenueNeeded,
    totalWorkingHoursPerYear,
    totalBillableHoursPerYear,
    billableHoursPerWeek,
    nonBillableHoursPerWeek,
    minimumHourlyRate,
    dailyRate,
    weeklyTarget,
    monthlyTarget,
  };
}

export function getFreelanceRateExplanationSteps(
  input: FreelanceRateInput,
  result: FreelanceRateResult,
  currencySymbol: string = "$"
): string[] {
  const steps: string[] = [];

  const fmt = (num: number) =>
    `${currencySymbol}${num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  steps.push(
    `Calculate target annual revenue: ${
      input.incomePeriod === "monthly"
        ? `${fmt(input.desiredIncome)}/month × 12 months = `
        : ""
    }${fmt(result.totalAnnualDesiredIncome)} desired income${
      input.mode === "advanced" && result.totalAnnualExpenses > 0
        ? ` + ${fmt(result.totalAnnualExpenses)} annual business/living expenses`
        : ""
    } = ${fmt(result.totalAnnualRevenueNeeded)} total revenue needed.`
  );

  steps.push(
    `Calculate total working hours: ${input.workWeeksPerYear} work weeks/year × ${input.workHoursPerWeek} hours/week = ${result.totalWorkingHoursPerYear.toLocaleString()} total working hours/year.`
  );

  steps.push(
    `Calculate annual billable hours: ${result.totalWorkingHoursPerYear.toLocaleString()} total hours × ${input.billablePercentage}% billable ratio = ${result.totalBillableHoursPerYear.toLocaleString(
      undefined,
      { maximumFractionDigits: 1 }
    )} billable hours/year (${result.nonBillableHoursPerWeek.toFixed(
      1
    )} hours/week reserved for admin, sales & overhead).`
  );

  steps.push(
    `Compute minimum hourly rate: Total revenue target (${fmt(
      result.totalAnnualRevenueNeeded
    )}) ÷ Annual billable hours (${result.totalBillableHoursPerYear.toLocaleString(
      undefined,
      { maximumFractionDigits: 1 }
    )}) = ${fmt(result.minimumHourlyRate)} per hour.`
  );

  steps.push(
    `Compute targets: Daily target = ${fmt(
      result.dailyRate
    )} (assuming 5 work days/week), Monthly target = ${fmt(
      result.monthlyTarget
    )}/month.`
  );

  return steps;
}
