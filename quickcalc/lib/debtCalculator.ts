export interface DebtItem {
  id: string;
  name: string;
  balance: number;
  interestRate: number; // Annual Percentage Rate (APR %)
  minimumPayment: number;
}

export interface DebtMilestone {
  debtId: string;
  debtName: string;
  monthPaidOff: number;
  datePaidOff: string;
  freedUpPayment: number;
  order: number;
}

export interface MonthlyDataPoint {
  month: number;
  date: string;
  totalBalance: number;
  interestPaidThisMonth: number;
  cumulativeInterest: number;
  debtsRemaining: number;
  debtBalances: Record<string, number>;
}

export interface StrategyResult {
  strategy: "snowball" | "avalanche";
  name: string;
  monthsToPayoff: number;
  yearsToPayoff: number;
  payoffDate: string;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  totalPaid: number;
  monthlyTimeline: MonthlyDataPoint[];
  milestones: DebtMilestone[];
  firstDebtPaidMonth: number | null;
}

export interface DebtComparisonResult {
  totalInitialBalance: number;
  totalMinimumPayments: number;
  extraMonthlyPayment: number;
  totalMonthlyCommitment: number;
  snowball: StrategyResult;
  avalanche: StrategyResult;
  interestSavedByAvalanche: number;
  monthsDifference: number;
  fasterStrategy: "avalanche" | "snowball" | "tie";
  cheaperStrategy: "avalanche" | "snowball" | "tie";
  firstMilestoneWinner: "snowball" | "avalanche" | "tie";
  warnings: string[];
}

export const DEFAULT_DEBTS: DebtItem[] = [
  {
    id: "debt-1",
    name: "Retail Store Card",
    balance: 2400,
    interestRate: 26.99,
    minimumPayment: 75,
  },
  {
    id: "debt-2",
    name: "Bank Credit Card",
    balance: 5800,
    interestRate: 21.49,
    minimumPayment: 150,
  },
  {
    id: "debt-3",
    name: "Auto Loan",
    balance: 11500,
    interestRate: 6.90,
    minimumPayment: 270,
  },
  {
    id: "debt-4",
    name: "Medical Payment Plan",
    balance: 950,
    interestRate: 0.00,
    minimumPayment: 50,
  },
];

export function getMonthDateString(monthsFromNow: number): string {
  const d = new Date();
  d.setMonth(d.getMonth() + monthsFromNow);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function formatCurrencyDetailed(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function simulateStrategy(
  debtsInput: DebtItem[],
  extraMonthlyPayment: number,
  strategy: "snowball" | "avalanche"
): StrategyResult {
  // Deep clone debts
  interface ActiveDebt {
    id: string;
    name: string;
    balance: number;
    interestRate: number;
    minimumPayment: number;
    initialBalance: number;
    isPaidOff: boolean;
    paidOffMonth: number | null;
  }

  const debts: ActiveDebt[] = debtsInput
    .filter((d) => d.balance > 0)
    .map((d) => ({
      id: d.id,
      name: d.name || "Untitled Debt",
      balance: d.balance,
      interestRate: Math.max(0, d.interestRate),
      minimumPayment: Math.max(1, d.minimumPayment),
      initialBalance: d.balance,
      isPaidOff: false,
      paidOffMonth: null,
    }));

  const totalPrincipal = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinPayments = debts.reduce((sum, d) => sum + d.minimumPayment, 0);
  const totalMonthlyCommitment = totalMinPayments + Math.max(0, extraMonthlyPayment);

  const monthlyTimeline: MonthlyDataPoint[] = [];
  const milestones: DebtMilestone[] = [];

  // Month 0 initial state
  monthlyTimeline.push({
    month: 0,
    date: getMonthDateString(0),
    totalBalance: Math.round(totalPrincipal),
    interestPaidThisMonth: 0,
    cumulativeInterest: 0,
    debtsRemaining: debts.length,
    debtBalances: debts.reduce((acc, d) => {
      acc[d.id] = d.balance;
      return acc;
    }, {} as Record<string, number>),
  });

  let currentMonth = 0;
  let cumulativeInterest = 0;
  const MAX_MONTHS = 600; // 50-year cap to prevent runaway simulation

  while (debts.some((d) => !d.isPaidOff) && currentMonth < MAX_MONTHS) {
    currentMonth++;
    let monthInterest = 0;

    // Step 1: Accrue monthly interest on all active debts
    for (const d of debts) {
      if (!d.isPaidOff) {
        const monthlyRate = d.interestRate / 100 / 12;
        const interest = d.balance * monthlyRate;
        d.balance += interest;
        monthInterest += interest;
      }
    }
    cumulativeInterest += monthInterest;

    // Step 2: Pay minimums on all active debts
    let moneyUsed = 0;
    for (const d of debts) {
      if (!d.isPaidOff) {
        const payment = Math.min(d.balance, d.minimumPayment);
        d.balance -= payment;
        moneyUsed += payment;
        if (d.balance <= 0.01) {
          d.balance = 0;
          d.isPaidOff = true;
          d.paidOffMonth = currentMonth;
          milestones.push({
            debtId: d.id,
            debtName: d.name,
            monthPaidOff: currentMonth,
            datePaidOff: getMonthDateString(currentMonth),
            freedUpPayment: d.minimumPayment,
            order: milestones.length + 1,
          });
        }
      }
    }

    // Step 3: Distribute leftover payment pool (Rollover + Extra) to target debts
    let remainingPool = Math.max(0, totalMonthlyCommitment - moneyUsed);

    while (remainingPool > 0.01 && debts.some((d) => !d.isPaidOff)) {
      // Find priority target debt
      const activeDebts = debts.filter((d) => !d.isPaidOff);
      if (activeDebts.length === 0) break;

      let targetDebt: ActiveDebt;
      if (strategy === "snowball") {
        // Lowest balance first
        targetDebt = activeDebts.reduce((min, d) => (d.balance < min.balance ? d : min), activeDebts[0]);
      } else {
        // Highest APR first (avalanche), tie-break by lowest balance
        targetDebt = activeDebts.reduce((max, d) => {
          if (d.interestRate > max.interestRate) return d;
          if (d.interestRate === max.interestRate) {
            return d.balance < max.balance ? d : max;
          }
          return max;
        }, activeDebts[0]);
      }

      const extraPayment = Math.min(targetDebt.balance, remainingPool);
      targetDebt.balance -= extraPayment;
      remainingPool -= extraPayment;

      if (targetDebt.balance <= 0.01) {
        targetDebt.balance = 0;
        targetDebt.isPaidOff = true;
        targetDebt.paidOffMonth = currentMonth;
        milestones.push({
          debtId: targetDebt.id,
          debtName: targetDebt.name,
          monthPaidOff: currentMonth,
          datePaidOff: getMonthDateString(currentMonth),
          freedUpPayment: targetDebt.minimumPayment,
          order: milestones.length + 1,
        });
      }
    }

    // Record monthly snapshot
    const totalRemaining = debts.reduce((sum, d) => sum + d.balance, 0);
    const debtsRemainingCount = debts.filter((d) => !d.isPaidOff).length;

    // Sample timeline every month up to 60 months, then quarterly to keep payload compact
    if (currentMonth <= 60 || currentMonth % 3 === 0 || debtsRemainingCount === 0) {
      monthlyTimeline.push({
        month: currentMonth,
        date: getMonthDateString(currentMonth),
        totalBalance: Math.max(0, Math.round(totalRemaining)),
        interestPaidThisMonth: Math.round(monthInterest),
        cumulativeInterest: Math.round(cumulativeInterest),
        debtsRemaining: debtsRemainingCount,
        debtBalances: debts.reduce((acc, d) => {
          acc[d.id] = Math.max(0, Math.round(d.balance));
          return acc;
        }, {} as Record<string, number>),
      });
    }

    if (debtsRemainingCount === 0) break;
  }

  const firstDebt = milestones.length > 0 ? milestones[0].monthPaidOff : null;

  return {
    strategy,
    name: strategy === "snowball" ? "Debt Snowball" : "Debt Avalanche",
    monthsToPayoff: currentMonth,
    yearsToPayoff: Number((currentMonth / 12).toFixed(1)),
    payoffDate: getMonthDateString(currentMonth),
    totalInterestPaid: Math.round(cumulativeInterest),
    totalPrincipalPaid: Math.round(totalPrincipal),
    totalPaid: Math.round(totalPrincipal + cumulativeInterest),
    monthlyTimeline,
    milestones,
    firstDebtPaidMonth: firstDebt,
  };
}

export function calculateDebtComparison(
  debts: DebtItem[],
  extraMonthlyPayment: number
): DebtComparisonResult {
  const validDebts = debts.filter((d) => d.balance > 0);
  const totalInitialBalance = validDebts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinimumPayments = validDebts.reduce((sum, d) => sum + d.minimumPayment, 0);
  const totalMonthlyCommitment = totalMinimumPayments + Math.max(0, extraMonthlyPayment);

  // Warnings check
  const warnings: string[] = [];
  for (const d of validDebts) {
    const monthlyInterest = (d.balance * (d.interestRate / 100)) / 12;
    if (d.minimumPayment <= monthlyInterest) {
      warnings.push(
        `"${d.name}" minimum payment ($${d.minimumPayment}) does not cover its monthly interest ($${Math.round(
          monthlyInterest
        )}). Increase its minimum payment or ensure extra payments cover this deficit.`
      );
    }
  }

  const snowball = simulateStrategy(validDebts, extraMonthlyPayment, "snowball");
  const avalanche = simulateStrategy(validDebts, extraMonthlyPayment, "avalanche");

  const interestSavedByAvalanche = Math.max(0, snowball.totalInterestPaid - avalanche.totalInterestPaid);
  const monthsDiff = Math.abs(snowball.monthsToPayoff - avalanche.monthsToPayoff);

  let fasterStrategy: "avalanche" | "snowball" | "tie" = "tie";
  if (avalanche.monthsToPayoff < snowball.monthsToPayoff) {
    fasterStrategy = "avalanche";
  } else if (snowball.monthsToPayoff < avalanche.monthsToPayoff) {
    fasterStrategy = "snowball";
  }

  let cheaperStrategy: "avalanche" | "snowball" | "tie" = "tie";
  if (avalanche.totalInterestPaid < snowball.totalInterestPaid) {
    cheaperStrategy = "avalanche";
  } else if (snowball.totalInterestPaid < avalanche.totalInterestPaid) {
    cheaperStrategy = "snowball";
  }

  let firstMilestoneWinner: "snowball" | "avalanche" | "tie" = "tie";
  if (snowball.firstDebtPaidMonth !== null && avalanche.firstDebtPaidMonth !== null) {
    if (snowball.firstDebtPaidMonth < avalanche.firstDebtPaidMonth) {
      firstMilestoneWinner = "snowball";
    } else if (avalanche.firstDebtPaidMonth < snowball.firstDebtPaidMonth) {
      firstMilestoneWinner = "avalanche";
    }
  }

  return {
    totalInitialBalance: Math.round(totalInitialBalance),
    totalMinimumPayments: Math.round(totalMinimumPayments),
    extraMonthlyPayment: Math.max(0, extraMonthlyPayment),
    totalMonthlyCommitment: Math.round(totalMonthlyCommitment),
    snowball,
    avalanche,
    interestSavedByAvalanche,
    monthsDifference: monthsDiff,
    fasterStrategy,
    cheaperStrategy,
    firstMilestoneWinner,
    warnings,
  };
}
