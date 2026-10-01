export interface AutoLoanInputs {
  currentLoanBalance: number; // Balance owed on current car loan ($1,000 - $150,000)
  currentInterestRate: number; // Current loan APR in % (e.g. 8.50%)
  remainingMonths: number; // Remaining term in months (1 - 84)
  newInterestRate: number; // New refinance loan APR in % (e.g. 5.99%)
  newLoanTerm: number; // New term in months (e.g. 36, 48, 60, 72)
  refinanceFees: number; // Title transfer, lien, administrative fees ($0 - $2,000)
  includeFeesInLoan: boolean; // Whether fees are financed or paid upfront (default true)
  extraMonthlyPayment: number; // Extra payment to accelerate payoff ($0 - $2,000)
}

export interface AutoLoanDetail {
  balance: number;
  rate: number;
  termMonths: number;
  monthlyPayment: number;
  totalInterestPaid: number;
  totalCostOfLoan: number;
}

export interface AcceleratedPayoffResult {
  hasExtraPayment: boolean;
  extraPaymentAmount: number;
  acceleratedMonthlyPayment: number;
  monthsToPayoff: number;
  monthsSaved: number;
  totalInterestPaid: number;
  interestSavedWithExtraPayment: number;
  payoffTimelineText: string;
}

export interface AutoLoanSchedulePoint {
  month: number;
  currentBalance: number;
  currentInterestPaid: number;
  newBalance: number;
  newInterestPaid: number;
  acceleratedBalance: number;
}

export interface AutoLoanChartPoint {
  month: number;
  label: string;
  currentBalance: number;
  newBalance: number;
  acceleratedBalance: number;
}

export interface AutoLoanRefinanceResult {
  currentLoan: AutoLoanDetail;
  newLoan: AutoLoanDetail;

  monthlyPaymentSavings: number; // Current payment - New payment
  totalInterestSavings: number; // Current interest - New interest (after fees)
  netLifetimeSavings: number; // Total savings factoring in refinance fees
  breakEvenMonths: number | null; // Months to recover refinance fees
  isRefinanceWorthwhile: boolean;

  acceleratedPayoff: AcceleratedPayoffResult;

  schedule: AutoLoanSchedulePoint[];
  chartPoints: AutoLoanChartPoint[];
}

export const DEFAULT_AUTO_INPUTS: AutoLoanInputs = {
  currentLoanBalance: 22000,
  currentInterestRate: 8.5,
  remainingMonths: 48,
  newInterestRate: 5.99,
  newLoanTerm: 48,
  refinanceFees: 150,
  includeFeesInLoan: true,
  extraMonthlyPayment: 0,
};

export const AUTO_TERM_PRESETS = [24, 36, 48, 60, 72];

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
 * Standard Amortization Payment Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateCarPayment(principal: number, annualRatePct: number, months: number): number {
  if (principal <= 0) return 0;
  if (annualRatePct <= 0 || months <= 0) return months > 0 ? principal / months : 0;

  const r = annualRatePct / 100 / 12;
  const factor = Math.pow(1 + r, months);
  return (principal * (r * factor)) / (factor - 1);
}

/**
 * Calculates auto loan refinance comparison, break-even period, and accelerated payoff.
 */
export function calculateAutoLoanRefinance(inputs: AutoLoanInputs): AutoLoanRefinanceResult {
  const currentBal = Math.max(500, inputs.currentLoanBalance || 22000);
  const currentRate = Math.max(0.1, inputs.currentInterestRate || 8.5);
  const currentMonths = Math.max(1, Math.min(120, inputs.remainingMonths || 48));

  const newRate = Math.max(0.1, inputs.newInterestRate || 5.99);
  const newMonths = Math.max(1, Math.min(120, inputs.newLoanTerm || 48));
  const fees = Math.max(0, inputs.refinanceFees || 0);
  const includeFees = inputs.includeFeesInLoan;

  const extraPayment = Math.max(0, inputs.extraMonthlyPayment || 0);

  // 1. Current Loan Math
  const currentMonthlyPayment = calculateCarPayment(currentBal, currentRate, currentMonths);
  const currentTotalPayments = currentMonthlyPayment * currentMonths;
  const currentTotalInterest = Math.max(0, currentTotalPayments - currentBal);

  const currentLoan: AutoLoanDetail = {
    balance: currentBal,
    rate: currentRate,
    termMonths: currentMonths,
    monthlyPayment: currentMonthlyPayment,
    totalInterestPaid: currentTotalInterest,
    totalCostOfLoan: currentTotalPayments,
  };

  // 2. New Refinanced Loan Math
  const financedAmount = includeFees ? currentBal + fees : currentBal;
  const newMonthlyPayment = calculateCarPayment(financedAmount, newRate, newMonths);
  const newTotalPayments = newMonthlyPayment * newMonths;
  const newTotalInterest = Math.max(0, newTotalPayments - financedAmount);
  const newTotalCostOfLoan = newTotalPayments + (includeFees ? 0 : fees);

  const newLoan: AutoLoanDetail = {
    balance: financedAmount,
    rate: newRate,
    termMonths: newMonths,
    monthlyPayment: newMonthlyPayment,
    totalInterestPaid: newTotalInterest,
    totalCostOfLoan: newTotalCostOfLoan,
  };

  // 3. Savings & Break-Even Analysis
  const monthlyPaymentSavings = currentMonthlyPayment - newMonthlyPayment;
  const totalInterestSavings = currentTotalInterest - newTotalInterest;
  const netLifetimeSavings = currentTotalPayments - newTotalCostOfLoan;

  let breakEvenMonths: number | null = null;
  if (fees > 0 && monthlyPaymentSavings > 0) {
    breakEvenMonths = Math.ceil(fees / monthlyPaymentSavings);
  } else if (fees === 0 && monthlyPaymentSavings >= 0) {
    breakEvenMonths = 0;
  }

  const isRefinanceWorthwhile = netLifetimeSavings > 0;

  // 4. Accelerated Payoff with Extra Monthly Payment (Applied to New Refinanced Loan)
  const rNewMonthly = newRate / 100 / 12;
  let accBal = financedAmount;
  let accMonthsCount = 0;
  let accTotalInterest = 0;
  const totalAcceleratedPayment = newMonthlyPayment + extraPayment;

  if (extraPayment > 0 && accBal > 0) {
    while (accBal > 0.01 && accMonthsCount < 240) {
      accMonthsCount++;
      const interestCharge = accBal * rNewMonthly;
      accTotalInterest += interestCharge;
      const principalPayment = Math.min(accBal, totalAcceleratedPayment - interestCharge);
      accBal = Math.max(0, accBal - principalPayment);
    }
  } else {
    accMonthsCount = newMonths;
    accTotalInterest = newTotalInterest;
  }

  const monthsSaved = Math.max(0, newMonths - accMonthsCount);
  const interestSavedWithExtraPayment = Math.max(0, newTotalInterest - accTotalInterest);

  const acceleratedPayoff: AcceleratedPayoffResult = {
    hasExtraPayment: extraPayment > 0,
    extraPaymentAmount: extraPayment,
    acceleratedMonthlyPayment: totalAcceleratedPayment,
    monthsToPayoff: accMonthsCount,
    monthsSaved,
    totalInterestPaid: accTotalInterest,
    interestSavedWithExtraPayment,
    payoffTimelineText:
      extraPayment > 0
        ? `Pays off in ${accMonthsCount} months (${monthsSaved} months sooner)`
        : `Pays off on schedule in ${newMonths} months`,
  };

  // 5. Month-by-Month Amortization Schedule & Chart Generation
  const maxMonths = Math.max(currentMonths, newMonths);
  const schedule: AutoLoanSchedulePoint[] = [];
  const chartPoints: AutoLoanChartPoint[] = [];

  const rCurrMonthly = currentRate / 100 / 12;
  let runBalCurr = currentBal;
  let runBalNew = financedAmount;
  let runBalAcc = financedAmount;

  // Initial Point (Month 0)
  chartPoints.push({
    month: 0,
    label: "Mo 0",
    currentBalance: Math.round(currentBal),
    newBalance: Math.round(financedAmount),
    acceleratedBalance: Math.round(financedAmount),
  });

  for (let m = 1; m <= maxMonths; m++) {
    // Current loan month
    let intPaidCurr = 0;
    if (runBalCurr > 0 && m <= currentMonths) {
      intPaidCurr = runBalCurr * rCurrMonthly;
      const prinPaidCurr = Math.min(runBalCurr, currentMonthlyPayment - intPaidCurr);
      runBalCurr = Math.max(0, runBalCurr - prinPaidCurr);
    } else {
      runBalCurr = 0;
    }

    // New refinance loan month
    let intPaidNew = 0;
    if (runBalNew > 0 && m <= newMonths) {
      intPaidNew = runBalNew * rNewMonthly;
      const prinPaidNew = Math.min(runBalNew, newMonthlyPayment - intPaidNew);
      runBalNew = Math.max(0, runBalNew - prinPaidNew);
    } else {
      runBalNew = 0;
    }

    // Accelerated loan month
    if (runBalAcc > 0) {
      const intPaidAcc = runBalAcc * rNewMonthly;
      const prinPaidAcc = Math.min(runBalAcc, totalAcceleratedPayment - intPaidAcc);
      runBalAcc = Math.max(0, runBalAcc - prinPaidAcc);
    } else {
      runBalAcc = 0;
    }

    schedule.push({
      month: m,
      currentBalance: Math.round(runBalCurr),
      currentInterestPaid: Math.round(intPaidCurr),
      newBalance: Math.round(runBalNew),
      newInterestPaid: Math.round(intPaidNew),
      acceleratedBalance: Math.round(runBalAcc),
    });

    // Sample chart points every 6 months or at end of terms
    if (m % 6 === 0 || m === currentMonths || m === newMonths || m === maxMonths) {
      chartPoints.push({
        month: m,
        label: `Mo ${m}`,
        currentBalance: Math.round(runBalCurr),
        newBalance: Math.round(runBalNew),
        acceleratedBalance: Math.round(runBalAcc),
      });
    }
  }

  return {
    currentLoan,
    newLoan,
    monthlyPaymentSavings,
    totalInterestSavings,
    netLifetimeSavings,
    breakEvenMonths,
    isRefinanceWorthwhile,
    acceleratedPayoff,
    schedule,
    chartPoints,
  };
}

/**
 * Generates CSV export content
 */
export function generateAutoLoanCsv(result: AutoLoanRefinanceResult): string {
  const headers = [
    "Month",
    "Current Loan Balance ($)",
    "Current Interest Paid ($)",
    "Refinanced Loan Balance ($)",
    "Refinanced Interest Paid ($)",
    "Accelerated Balance ($)",
  ];

  const rows = result.schedule.map((row) => [
    row.month,
    row.currentBalance,
    row.currentInterestPaid,
    row.newBalance,
    row.newInterestPaid,
    row.acceleratedBalance,
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
