export interface RothIraInputs {
  currentAge: number; // Age today (18 - 75)
  retirementAge: number; // Planned retirement age (35 - 85)
  currentBalance: number; // Starting Roth IRA balance ($0 - $1,000,000)
  monthlyContribution: number; // Monthly contribution ($0 - $3,000)
  annualReturn: number; // Expected annual rate of return % (2% - 15%)
  taxRate: number; // Combined income/capital gains tax bracket % for comparison (10% - 45%)
  annualTaxDragPct?: number; // Annual dividend/turnover tax drag % for taxable account (default 0.6%)
}

export interface RothIraMilestone {
  age: number;
  year: number;
  totalContributions: number;
  rothTotalGrowth: number;
  rothEndingBalance: number;
  taxableEndingBalance: number;
  taxSavings: number; // Roth balance minus Taxable after-tax balance
}

export interface RothIraChartPoint {
  age: number;
  year: number;
  label: string;
  totalPrincipal: number;
  rothBalance: number;
  taxableBalance: number;
}

export interface RothIraResult {
  horizonYears: number;
  totalContributions: number;
  totalPrincipal: number; // currentBalance + totalContributions
  rothEndingBalance: number;
  rothTotalGrowth: number;
  growthMultiple: number; // rothEndingBalance / totalPrincipal

  // Taxable Brokerage Comparison
  taxableEndingBalance: number; // After annual drag and liquidation capital gains taxes
  taxableTotalGrowth: number;
  lifetimeTaxesSaved: number; // Difference between Roth and Taxable take-home
  taxSavingsPct: number;

  // Yearly Breakdowns & Chart Data
  milestones: RothIraMilestone[];
  chartPoints: RothIraChartPoint[];

  // IRS Limits info for current age
  irsAnnualLimit: number;
  irsMonthlyLimit: number;
  isCatchUpEligible: boolean;
}

export const DEFAULT_ROTH_INPUTS: RothIraInputs = {
  currentAge: 28,
  retirementAge: 65,
  currentBalance: 15000,
  monthlyContribution: 583, // ~$7,000/yr standard IRS limit
  annualReturn: 8.0,
  taxRate: 24, // Standard 24% bracket / 15% cap gains + state
  annualTaxDragPct: 0.6, // Realistic annual dividend tax drag in taxable brokerage
};

export const CONTRIBUTION_PRESETS = [
  { label: "$200/mo", value: 200, note: "Starter budget" },
  { label: "$500/mo", value: 500, note: "$6,000/yr" },
  { label: "Max Limit ($583)", value: 583, note: "IRS $7,000/yr limit" },
  { label: "Catch-Up ($667)", value: 667, note: "Age 50+ ($8,000/yr)" },
];

export const RETURN_PRESETS = [
  { label: "Conservative (6%)", value: 6.0, desc: "Bond & Dividend heavy" },
  { label: "Balanced (8%)", value: 8.0, desc: "Historical balanced index" },
  { label: "Aggressive (10%)", value: 10.0, desc: "S&P 500 historical average" },
  { label: "Optimistic (12%)", value: 12.0, desc: "High-growth equities" },
];

export function formatCurrency(amount: number, decimals: number = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatPercent(rate: number, decimals: number = 1): string {
  return `${rate.toFixed(decimals)}%`;
}

/**
 * Calculates Roth IRA compound tax-free growth and comparative taxable brokerage wealth.
 */
export function calculateRothIra(inputs: RothIraInputs): RothIraResult {
  const currentAge = Math.max(16, Math.min(80, Math.round(inputs.currentAge || 28)));
  const retirementAge = Math.max(currentAge + 1, Math.min(90, Math.round(inputs.retirementAge || 65)));
  const horizonYears = Math.max(1, retirementAge - currentAge);

  const startBalance = Math.max(0, inputs.currentBalance || 0);
  const monthlyContrib = Math.max(0, inputs.monthlyContribution || 0);
  const annualReturnPct = Math.max(0.1, Math.min(25, inputs.annualReturn || 8.0));
  const taxRatePct = Math.max(0, Math.min(50, inputs.taxRate || 24));
  const taxDragPct = inputs.annualTaxDragPct !== undefined ? Math.max(0, inputs.annualTaxDragPct) : 0.6;

  // IRS limits: Under 50 = $7,000 ($583.33/mo); 50+ = $8,000 ($666.67/mo)
  const isCatchUpEligible = currentAge >= 50;
  const irsAnnualLimit = isCatchUpEligible ? 8000 : 7000;
  const irsMonthlyLimit = Math.round(irsAnnualLimit / 12);

  // Growth rates
  const monthlyRateRoth = annualReturnPct / 100 / 12;

  // Taxable account has:
  // 1) Annual tax drag on yields/dividends: reduces compounding rate by (taxDragPct / 100)
  // 2) At retirement, long-term capital gains tax (approx 15% federal + state, or user's tax rate * 0.6)
  const effectiveTaxableAnnualReturn = Math.max(0.001, (annualReturnPct - taxDragPct) / 100);
  const monthlyRateTaxable = effectiveTaxableAnnualReturn / 12;

  // Estimated capital gains liquidation tax rate at retirement (typically 15% for federal bracket 24%, plus state)
  const capitalGainsRate = taxRatePct <= 12 ? 0.0 : taxRatePct <= 32 ? 0.15 : 0.20;

  let rothBal = startBalance;
  let taxableGrossBal = startBalance;
  let runningPrincipal = startBalance;

  const milestones: RothIraMilestone[] = [];
  const chartPoints: RothIraChartPoint[] = [
    {
      age: currentAge,
      year: 0,
      label: `Age ${currentAge}`,
      totalPrincipal: Math.round(runningPrincipal),
      rothBalance: Math.round(rothBal),
      taxableBalance: Math.round(taxableGrossBal),
    },
  ];

  for (let year = 1; year <= horizonYears; year++) {
    const age = currentAge + year;

    // Simulate 12 months for this year
    for (let m = 1; m <= 12; m++) {
      rothBal = rothBal * (1 + monthlyRateRoth) + monthlyContrib;
      taxableGrossBal = taxableGrossBal * (1 + monthlyRateTaxable) + monthlyContrib;
      runningPrincipal += monthlyContrib;
    }

    // Taxable after-tax balance if liquidated at this point
    const taxableGains = Math.max(0, taxableGrossBal - runningPrincipal);
    const taxableTaxesOwed = taxableGains * capitalGainsRate;
    const taxableNetBal = Math.max(runningPrincipal, taxableGrossBal - taxableTaxesOwed);

    const rothGains = Math.max(0, rothBal - runningPrincipal);
    const taxSavings = Math.max(0, rothBal - taxableNetBal);

    milestones.push({
      age,
      year,
      totalContributions: Math.round(runningPrincipal - startBalance),
      rothTotalGrowth: Math.round(rothGains),
      rothEndingBalance: Math.round(rothBal),
      taxableEndingBalance: Math.round(taxableNetBal),
      taxSavings: Math.round(taxSavings),
    });

    chartPoints.push({
      age,
      year,
      label: `Age ${age}`,
      totalPrincipal: Math.round(runningPrincipal),
      rothBalance: Math.round(rothBal),
      taxableBalance: Math.round(taxableNetBal),
    });
  }

  const finalRothBalance = Math.round(rothBal);
  const finalTotalPrincipal = Math.round(runningPrincipal);
  const finalTotalContributions = Math.round(finalTotalPrincipal - startBalance);
  const finalRothGrowth = Math.max(0, finalRothBalance - finalTotalPrincipal);
  const growthMultiple = finalTotalPrincipal > 0 ? Number((finalRothBalance / finalTotalPrincipal).toFixed(2)) : 0;

  // Final taxable values
  const finalTaxableGross = Math.round(taxableGrossBal);
  const finalTaxableGains = Math.max(0, finalTaxableGross - finalTotalPrincipal);
  const finalTaxesOwed = Math.round(finalTaxableGains * capitalGainsRate);
  const finalTaxableNet = Math.max(finalTotalPrincipal, finalTaxableGross - finalTaxesOwed);

  const lifetimeTaxesSaved = Math.max(0, finalRothBalance - finalTaxableNet);
  const taxSavingsPct = finalTaxableNet > 0 ? Number(((lifetimeTaxesSaved / finalTaxableNet) * 100).toFixed(1)) : 0;

  return {
    horizonYears,
    totalContributions: finalTotalContributions,
    totalPrincipal: finalTotalPrincipal,
    rothEndingBalance: finalRothBalance,
    rothTotalGrowth: finalRothGrowth,
    growthMultiple,

    taxableEndingBalance: finalTaxableNet,
    taxableTotalGrowth: Math.max(0, finalTaxableNet - finalTotalPrincipal),
    lifetimeTaxesSaved,
    taxSavingsPct,

    milestones,
    chartPoints,

    irsAnnualLimit,
    irsMonthlyLimit,
    isCatchUpEligible,
  };
}

/**
 * Generates downloadable CSV content of the Roth IRA growth schedule.
 */
export function generateRothIraCsv(result: RothIraResult, inputs: RothIraInputs): string {
  const headers = [
    "Year",
    "Age",
    "Total Principal Invested ($)",
    "Roth IRA Balance (Tax-Free) ($)",
    "Roth IRA Growth ($)",
    "Taxable Account Net Balance ($)",
    "Roth Tax Advantage ($)",
  ];

  const rows = result.milestones.map((m) => {
    const totalPrincipal = inputs.currentBalance + m.totalContributions;
    return [
      m.year,
      m.age,
      totalPrincipal,
      m.rothEndingBalance,
      m.rothTotalGrowth,
      m.taxableEndingBalance,
      m.taxSavings,
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}
