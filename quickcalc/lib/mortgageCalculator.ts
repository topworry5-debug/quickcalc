export interface MortgageInputs {
  homePrice: number; // Purchase price of the home ($50,000 - $5,000,000)
  downPayment: number; // Down payment in dollars
  downPaymentPercent: number; // Down payment as percentage (e.g. 20%)
  interestRate30: number; // 30-Year Fixed APR in % (e.g. 6.50%)
  interestRate15: number; // 15-Year Fixed APR in % (e.g. 5.875%)
  propertyTaxAnnual: number; // Annual property tax in dollars ($0 - $50,000)
  homeInsuranceAnnual: number; // Annual homeowner's insurance ($0 - $15,000)
  hoaFeesMonthly: number; // Monthly HOA dues ($0 - $2,000)
  investmentReturnRate: number; // Assumed annual return for opportunity cost (e.g. 8.0%)
}

export interface LoanTermMetrics {
  termYears: number;
  termMonths: number;
  interestRate: number;
  loanAmount: number;
  monthlyPrincipalInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHoa: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalCostOfLoan: number;
  totalPayments: number;
  halfwayEquityYear: number;
}

export interface YearAmortizationRow {
  year: number;
  // 30-Year metrics
  balance30: number;
  principalPaid30: number;
  interestPaid30: number;
  cumulativeInterest30: number;
  equity30: number;
  // 15-Year metrics
  balance15: number;
  principalPaid15: number;
  interestPaid15: number;
  cumulativeInterest15: number;
  equity15: number;
}

export interface ChartDataPoint {
  year: number;
  label: string;
  balance30: number;
  balance15: number;
  equity30: number;
  equity15: number;
}

export interface OpportunityCostAnalysis {
  monthlyDifference: number; // Difference in monthly P&I (15-yr payment - 30-yr payment)
  assumedAnnualReturn: number;
  // Strategy A: 30-Yr borrower invests monthly savings ($D) for full 30 years
  strategy30InvestValue: number;
  strategy30TotalContributed: number;
  strategy30CompoundGain: number;
  // Strategy B: 15-Yr borrower pays off in 15 yrs, then invests full payment ($M15) for years 16-30 (15 yrs)
  strategy15InvestValue: number;
  strategy15TotalContributed: number;
  strategy15CompoundGain: number;
  netWealthDifference: number;
  favoredStrategy: "15-year" | "30-year" | "balanced";
}

export interface MortgageComparisonResult {
  loanAmount: number;
  downPayment: number;
  downPaymentPercent: number;
  homePrice: number;

  loan30: LoanTermMetrics;
  loan15: LoanTermMetrics;

  monthlyPaymentDifference: number; // How much more 15-yr costs per month
  monthlyCashFlowSavedBy30: number; // Cash flow freed up by 30-yr
  totalInterestSavedBy15: number; // Lifetime interest saved by choosing 15-yr
  percentInterestSaved: number; // % of 30-yr interest saved
  yearsSaved: number; // 15 years

  schedule: YearAmortizationRow[];
  chartPoints: ChartDataPoint[];
  opportunityCost: OpportunityCostAnalysis;
}

export const DEFAULT_MORTGAGE_INPUTS: MortgageInputs = {
  homePrice: 400000,
  downPayment: 80000,
  downPaymentPercent: 20,
  interestRate30: 6.5,
  interestRate15: 5.875,
  propertyTaxAnnual: 4800,
  homeInsuranceAnnual: 1500,
  hoaFeesMonthly: 0,
  investmentReturnRate: 8.0,
};

export function formatMoney(amount: number, decimals: number = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Math.round(amount * (10 ** decimals)) / (10 ** decimals));
}

export function formatPercent(rate: number, decimals: number = 3): string {
  return `${rate.toFixed(decimals)}%`;
}

/**
 * Standard Mortgage Payment Formula: M = L * [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateMonthlyPayment(principal: number, annualRatePct: number, months: number): number {
  if (principal <= 0) return 0;
  if (annualRatePct <= 0) return principal / months;

  const r = annualRatePct / 100 / 12;
  const factor = Math.pow(1 + r, months);
  return (principal * (r * factor)) / (factor - 1);
}

/**
 * Computes complete 15-year vs. 30-year mortgage comparison, amortization, and opportunity cost.
 */
export function calculateMortgageComparison(inputs: MortgageInputs): MortgageComparisonResult {
  const homePrice = Math.max(10000, inputs.homePrice || 400000);
  const downPayment = Math.max(0, Math.min(homePrice, inputs.downPayment || 0));
  const downPaymentPercent = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
  const loanAmount = Math.max(0, homePrice - downPayment);

  const rate30 = Math.max(0.1, inputs.interestRate30 || 6.5);
  const rate15 = Math.max(0.1, inputs.interestRate15 || 5.875);

  const monthlyPropertyTax = Math.max(0, inputs.propertyTaxAnnual || 0) / 12;
  const monthlyHomeInsurance = Math.max(0, inputs.homeInsuranceAnnual || 0) / 12;
  const monthlyHoa = Math.max(0, inputs.hoaFeesMonthly || 0);
  const totalMonthlyEscrow = monthlyPropertyTax + monthlyHomeInsurance + monthlyHoa;

  // 30-Year Loan Calculation
  const months30 = 360;
  const monthlyPI30 = calculateMonthlyPayment(loanAmount, rate30, months30);
  const totalPIPaid30 = monthlyPI30 * months30;
  const totalInterestPaid30 = Math.max(0, totalPIPaid30 - loanAmount);
  const totalCostOfLoan30 = totalPIPaid30 + totalMonthlyEscrow * months30;
  const totalMonthly30 = monthlyPI30 + totalMonthlyEscrow;

  // 15-Year Loan Calculation
  const months15 = 180;
  const monthlyPI15 = calculateMonthlyPayment(loanAmount, rate15, months15);
  const totalPIPaid15 = monthlyPI15 * months15;
  const totalInterestPaid15 = Math.max(0, totalPIPaid15 - loanAmount);
  const totalCostOfLoan15 = totalPIPaid15 + totalMonthlyEscrow * months15;
  const totalMonthly15 = monthlyPI15 + totalMonthlyEscrow;

  const monthlyPaymentDifference = monthlyPI15 - monthlyPI30;
  const monthlyCashFlowSavedBy30 = monthlyPI15 - monthlyPI30;
  const totalInterestSavedBy15 = Math.max(0, totalInterestPaid30 - totalInterestPaid15);
  const percentInterestSaved = totalInterestPaid30 > 0 ? (totalInterestSavedBy15 / totalInterestPaid30) * 100 : 0;

  // Monthly Amortization Engine to generate Year-by-Year Schedule
  const schedule: YearAmortizationRow[] = [];
  const chartPoints: ChartDataPoint[] = [];

  // Point 0 (Beginning)
  chartPoints.push({
    year: 0,
    label: "Yr 0",
    balance30: loanAmount,
    balance15: loanAmount,
    equity30: downPayment,
    equity15: downPayment,
  });

  const r30 = rate30 / 100 / 12;
  const r15 = rate15 / 100 / 12;

  let bal30 = loanAmount;
  let cumInt30 = 0;
  let bal15 = loanAmount;
  let cumInt15 = 0;

  let halfwayYear30 = 20;
  let halfwayYear15 = 7;
  let foundHalfway30 = false;
  let foundHalfway15 = false;

  for (let year = 1; year <= 30; year++) {
    let yearPrin30 = 0;
    let yearInt30 = 0;
    let yearPrin15 = 0;
    let yearInt15 = 0;

    for (let m = 1; m <= 12; m++) {
      // 30-Year Month
      if (bal30 > 0) {
        const intPayment = bal30 * r30;
        const prinPayment = Math.min(bal30, monthlyPI30 - intPayment);
        bal30 = Math.max(0, bal30 - prinPayment);
        cumInt30 += intPayment;
        yearPrin30 += prinPayment;
        yearInt30 += intPayment;

        if (!foundHalfway30 && bal30 <= loanAmount / 2) {
          halfwayYear30 = year;
          foundHalfway30 = true;
        }
      }

      // 15-Year Month (Only active for first 180 months)
      if (year <= 15 && bal15 > 0) {
        const intPayment = bal15 * r15;
        const prinPayment = Math.min(bal15, monthlyPI15 - intPayment);
        bal15 = Math.max(0, bal15 - prinPayment);
        cumInt15 += intPayment;
        yearPrin15 += prinPayment;
        yearInt15 += intPayment;

        if (!foundHalfway15 && bal15 <= loanAmount / 2) {
          halfwayYear15 = year;
          foundHalfway15 = true;
        }
      }
    }

    const equity30 = homePrice - bal30;
    const equity15 = homePrice - bal15;

    schedule.push({
      year,
      balance30: Math.round(bal30),
      principalPaid30: Math.round(yearPrin30),
      interestPaid30: Math.round(yearInt30),
      cumulativeInterest30: Math.round(cumInt30),
      equity30: Math.round(equity30),

      balance15: Math.round(bal15),
      principalPaid15: Math.round(yearPrin15),
      interestPaid15: Math.round(yearInt15),
      cumulativeInterest15: Math.round(cumInt15),
      equity15: Math.round(equity15),
    });

    // Chart points: sampled every year or key checkpoints
    chartPoints.push({
      year,
      label: `Yr ${year}`,
      balance30: Math.round(bal30),
      balance15: Math.round(bal15),
      equity30: Math.round(equity30),
      equity15: Math.round(equity15),
    });
  }

  // Opportunity Cost Analysis
  // Investment Return Rate r_inv
  const annualReturn = Math.max(0.1, inputs.investmentReturnRate || 8.0);
  const monthlyReturn = annualReturn / 100 / 12;

  // Strategy A (30-Yr borrower invests monthly difference D for 360 months):
  // FV = D * [ (1 + r_m)^360 - 1 ] / r_m
  const diffPerMonth = Math.max(0, monthlyPaymentDifference);
  const factor360 = Math.pow(1 + monthlyReturn, 360);
  const strategy30InvestValue = diffPerMonth * ((factor360 - 1) / monthlyReturn);
  const strategy30TotalContributed = diffPerMonth * 360;
  const strategy30CompoundGain = strategy30InvestValue - strategy30TotalContributed;

  // Strategy B (15-Yr borrower pays off mortgage in 15 yrs, then invests full $M15 for 180 months from yr 16-30):
  // FV = M15 * [ (1 + r_m)^180 - 1 ] / r_m
  const factor180 = Math.pow(1 + monthlyReturn, 180);
  const strategy15InvestValue = monthlyPI15 * ((factor180 - 1) / monthlyReturn);
  const strategy15TotalContributed = monthlyPI15 * 180;
  const strategy15CompoundGain = strategy15InvestValue - strategy15TotalContributed;

  // Net wealth comparison at Year 30 (Investment Portfolio + Home Equity - Total Interest Paid):
  // Both own 100% of home equity at Year 30.
  // Net financial difference = Strategy 30 Portfolio vs. Strategy 15 Portfolio + Interest Saved
  const netWealthDifference = strategy30InvestValue - strategy15InvestValue;
  const favoredStrategy =
    netWealthDifference > 50000 ? "30-year" : netWealthDifference < -50000 ? "15-year" : "balanced";

  const opportunityCost: OpportunityCostAnalysis = {
    monthlyDifference: Math.round(diffPerMonth),
    assumedAnnualReturn: annualReturn,
    strategy30InvestValue: Math.round(strategy30InvestValue),
    strategy30TotalContributed: Math.round(strategy30TotalContributed),
    strategy30CompoundGain: Math.round(strategy30CompoundGain),
    strategy15InvestValue: Math.round(strategy15InvestValue),
    strategy15TotalContributed: Math.round(strategy15TotalContributed),
    strategy15CompoundGain: Math.round(strategy15CompoundGain),
    netWealthDifference: Math.round(netWealthDifference),
    favoredStrategy,
  };

  const loan30: LoanTermMetrics = {
    termYears: 30,
    termMonths: 360,
    interestRate: rate30,
    loanAmount,
    monthlyPrincipalInterest: monthlyPI30,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyHoa,
    totalMonthlyPayment: totalMonthly30,
    totalInterestPaid: totalInterestPaid30,
    totalCostOfLoan: totalCostOfLoan30,
    totalPayments: totalPIPaid30,
    halfwayEquityYear: halfwayYear30,
  };

  const loan15: LoanTermMetrics = {
    termYears: 15,
    termMonths: 180,
    interestRate: rate15,
    loanAmount,
    monthlyPrincipalInterest: monthlyPI15,
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyHoa,
    totalMonthlyPayment: totalMonthly15,
    totalInterestPaid: totalInterestPaid15,
    totalCostOfLoan: totalCostOfLoan15,
    totalPayments: totalPIPaid15,
    halfwayEquityYear: halfwayYear15,
  };

  return {
    loanAmount,
    downPayment,
    downPaymentPercent,
    homePrice,
    loan30,
    loan15,
    monthlyPaymentDifference: Math.round(monthlyPaymentDifference),
    monthlyCashFlowSavedBy30: Math.round(monthlyCashFlowSavedBy30),
    totalInterestSavedBy15: Math.round(totalInterestSavedBy15),
    percentInterestSaved: Math.round(percentInterestSaved * 10) / 10,
    yearsSaved: 15,
    schedule,
    chartPoints,
    opportunityCost,
  };
}

/**
 * Generates CSV string for export
 */
export function generateMortgageCsv(result: MortgageComparisonResult): string {
  const headers = [
    "Year",
    "30-Yr Remaining Balance ($)",
    "30-Yr Principal Paid ($)",
    "30-Yr Interest Paid ($)",
    "30-Yr Cumulative Interest ($)",
    "30-Yr Equity ($)",
    "15-Yr Remaining Balance ($)",
    "15-Yr Principal Paid ($)",
    "15-Yr Interest Paid ($)",
    "15-Yr Cumulative Interest ($)",
    "15-Yr Equity ($)",
  ];

  const rows = result.schedule.map((row) => [
    row.year,
    row.balance30,
    row.principalPaid30,
    row.interestPaid30,
    row.cumulativeInterest30,
    row.equity30,
    row.balance15,
    row.principalPaid15,
    row.interestPaid15,
    row.cumulativeInterest15,
    row.equity15,
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
