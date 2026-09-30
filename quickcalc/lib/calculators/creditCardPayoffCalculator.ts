export interface CreditCardPayoffInputs {
  balance: number;
  apr: number;
  mode: "payment" | "time";
  monthlyPayment: number;
  targetMonths: number;
  extraPayment?: number;
}

export interface AmortizationRow {
  month: number;
  date: string;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  totalInterestPaidSoFar: number;
  remainingBalance: number;
}

export interface ExtraPaymentComparison {
  extraAmount: number;
  totalMonths: number;
  monthsSaved: number;
  totalInterest: number;
  interestSaved: number;
  debtFreeDate: string;
}

export interface CreditCardPayoffResult {
  isPaymentTooLow: boolean;
  minPaymentRequired: number;
  monthlyInterestCharge: number;
  monthlyPayment: number;
  effectiveMonthlyPayment: number;
  totalMonths: number;
  years: number;
  remainingMonths: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  debtFreeDate: string;
  schedule: AmortizationRow[];
  extraComparisons: ExtraPaymentComparison[];
}

export const DEFAULT_CREDIT_CARD_INPUTS: CreditCardPayoffInputs = {
  balance: 8500,
  apr: 22.99,
  mode: "payment",
  monthlyPayment: 300,
  targetMonths: 24,
  extraPayment: 0,
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyExact(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculates month-by-month credit card payoff simulation with compound monthly interest.
 */
export function calculateCreditCardPayoff(
  inputs: CreditCardPayoffInputs
): CreditCardPayoffResult {
  const {
    balance: rawBalance,
    apr: rawApr,
    mode,
    monthlyPayment: rawMonthlyPayment,
    targetMonths: rawTargetMonths,
    extraPayment = 0,
  } = inputs;

  const balance = Math.max(0, rawBalance);
  const apr = Math.max(0, rawApr);
  const r = apr / 100 / 12; // Monthly interest rate
  const monthlyInterestCharge = balance * r;
  const minPaymentRequired = Math.ceil(monthlyInterestCharge + 1);

  // Determine base monthly payment
  let baseMonthlyPayment = 0;
  if (mode === "payment") {
    baseMonthlyPayment = rawMonthlyPayment;
  } else {
    // Mode: Pay by target payoff time
    const N = Math.max(1, Math.min(360, rawTargetMonths));
    if (r === 0) {
      baseMonthlyPayment = balance / N;
    } else {
      const pow = Math.pow(1 + r, N);
      baseMonthlyPayment = (balance * (r * pow)) / (pow - 1);
    }
  }

  const effectiveMonthlyPayment = baseMonthlyPayment + Math.max(0, extraPayment);

  // Check if payment covers initial monthly interest
  if (effectiveMonthlyPayment <= monthlyInterestCharge && balance > 0) {
    return {
      isPaymentTooLow: true,
      minPaymentRequired,
      monthlyInterestCharge,
      monthlyPayment: baseMonthlyPayment,
      effectiveMonthlyPayment,
      totalMonths: 0,
      years: 0,
      remainingMonths: 0,
      totalInterestPaid: 0,
      totalAmountPaid: 0,
      debtFreeDate: "Never (Payment too low)",
      schedule: [],
      extraComparisons: [],
    };
  }

  // Run month-by-month simulation
  const { schedule, totalMonths, totalInterestPaid, totalAmountPaid, debtFreeDate } =
    simulatePayoffSchedule(balance, r, effectiveMonthlyPayment);

  // Calculate comparisons for +$25, +$50, +$100, +$200 extra payments
  const standardExtraTiers = [25, 50, 100, 200];
  const extraComparisons: ExtraPaymentComparison[] = standardExtraTiers.map((extra) => {
    const tierPayment = baseMonthlyPayment + extra;
    const sim = simulatePayoffSchedule(balance, r, tierPayment);
    return {
      extraAmount: extra,
      totalMonths: sim.totalMonths,
      monthsSaved: Math.max(0, totalMonths - sim.totalMonths),
      totalInterest: sim.totalInterestPaid,
      interestSaved: Math.max(0, totalInterestPaid - sim.totalInterestPaid),
      debtFreeDate: sim.debtFreeDate,
    };
  });

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  return {
    isPaymentTooLow: false,
    minPaymentRequired,
    monthlyInterestCharge,
    monthlyPayment: baseMonthlyPayment,
    effectiveMonthlyPayment,
    totalMonths,
    years,
    remainingMonths,
    totalInterestPaid,
    totalAmountPaid,
    debtFreeDate,
    schedule,
    extraComparisons,
  };
}

function simulatePayoffSchedule(
  initialBalance: number,
  r: number,
  monthlyPayment: number
): {
  schedule: AmortizationRow[];
  totalMonths: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  debtFreeDate: string;
} {
  if (initialBalance <= 0) {
    return {
      schedule: [],
      totalMonths: 0,
      totalInterestPaid: 0,
      totalAmountPaid: 0,
      debtFreeDate: "Debt Free Today",
    };
  }

  const schedule: AmortizationRow[] = [];
  let currentBalance = initialBalance;
  let totalInterest = 0;
  let totalPaid = 0;
  const startDate = new Date();

  let month = 0;
  const MAX_MONTHS = 600; // 50 years cap

  while (currentBalance > 0.01 && month < MAX_MONTHS) {
    month++;
    const interest = currentBalance * r;
    totalInterest += interest;

    // In the last month, payment is remaining balance plus interest
    let payment = monthlyPayment;
    if (payment > currentBalance + interest) {
      payment = currentBalance + interest;
    }

    const principal = payment - interest;
    currentBalance = Math.max(0, currentBalance - principal);
    totalPaid += payment;

    const paymentDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + month,
      1
    );
    const dateStr = paymentDate.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });

    schedule.push({
      month,
      date: dateStr,
      payment: Math.round(payment * 100) / 100,
      principalPaid: Math.round(principal * 100) / 100,
      interestPaid: Math.round(interest * 100) / 100,
      totalInterestPaidSoFar: Math.round(totalInterest * 100) / 100,
      remainingBalance: Math.round(currentBalance * 100) / 100,
    });
  }

  const finalDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + month,
    1
  );
  const debtFreeDate = finalDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return {
    schedule,
    totalMonths: month,
    totalInterestPaid: Math.round(totalInterest),
    totalAmountPaid: Math.round(totalPaid),
    debtFreeDate,
  };
}

/**
 * Generates downloadable CSV content from amortization schedule
 */
export function generatePayoffCSV(schedule: AmortizationRow[]): string {
  const headers = [
    "Month",
    "Date",
    "Monthly Payment ($)",
    "Principal Paid ($)",
    "Interest Paid ($)",
    "Cumulative Interest ($)",
    "Remaining Balance ($)",
  ];

  const rows = schedule.map((row) => [
    row.month,
    row.date,
    row.payment.toFixed(2),
    row.principalPaid.toFixed(2),
    row.interestPaid.toFixed(2),
    row.totalInterestPaidSoFar.toFixed(2),
    row.remainingBalance.toFixed(2),
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
