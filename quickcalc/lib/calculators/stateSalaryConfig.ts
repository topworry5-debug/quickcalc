/**
 * Reusable 50-State Salary & Paycheck Calculation Engine
 * QuickCalc.cloud
 *
 * Designed to power the 50-state salary calculator cluster.
 * State-agnostic logic layer: accepts a generic `StateTaxConfig` object,
 * calculates federal income taxes, FICA (Social Security & Medicare),
 * pre-tax deductions, and progressive state income taxes.
 *
 * MAINTENANCE NOTE:
 * Federal brackets and standard deductions update annually each fall via IRS Revenue Procedures.
 * State tax brackets must be reviewed annually based on state legislative sessions.
 */

export type FilingStatus = "single" | "married_joint" | "head_of_household";
export type PayFrequency = "annual" | "monthly" | "semimonthly" | "biweekly" | "weekly";
export type WageType = "annual" | "hourly";

export interface TaxBracket {
  limit: number; // Upper ceiling of this bracket (use Infinity for top bracket)
  rate: number;  // Marginal tax rate, e.g. 0.037 for 3.7%
}

export interface NeighborStateComparison {
  stateName: string;
  stateAbbrev: string;
  topRate: number;
  isZeroTax: boolean;
  takeHomeEstimate60k: number;
  note: string;
}

export interface StateTaxConfig {
  stateSlug: string;
  stateName: string;
  stateAbbrev: string;
  hasStateIncomeTax: boolean;
  taxYear: number;
  topMarginalRate: number; // e.g. 0.037
  standardDeduction: Record<FilingStatus, number>;
  brackets: Record<FilingStatus, TaxBracket[]>;
  hasLocalTax: boolean;
  localTaxDescription: string;
  exemptsSocialSecurity: boolean;
  neighborComparisons: NeighborStateComparison[];
  notes: string;
}

export interface PreTaxDeductions {
  fourZeroOneKPercent: number; // e.g. 5 for 5%
  monthlyHealthInsurance: number; // e.g. 200 for $200/month
}

export interface StateSalaryInput {
  wage: number;
  wageType: WageType;
  hoursPerWeek: number; // default 40
  filingStatus: FilingStatus;
  payFrequency: PayFrequency;
  preTaxDeductions?: PreTaxDeductions;
}

export interface FrequencyBreakdown {
  gross: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  totalTax: number;
  preTaxDeductions: number;
  netPay: number;
}

export interface DeductionLineItem {
  name: string;
  amountAnnual: number;
  amountSelected: number;
  percentOfGross: number;
  category: "federal" | "state" | "fica" | "pretax";
}

export interface StateSalaryResult {
  stateName: string;
  stateAbbrev: string;
  taxYear: number;
  wageType: WageType;
  hoursPerWeek: number;
  filingStatus: FilingStatus;
  selectedFrequency: PayFrequency;

  // Annual Totals
  grossAnnual: number;
  grossSelected: number;
  annualPreTaxDeductions: number;
  adjustedGrossIncome: number; // After pre-tax deductions
  annualFederalTax: number;
  annualStateTax: number;
  annualSocialSecurity: number;
  annualMedicare: number;
  annualTotalFica: number;
  annualTotalTax: number;
  annualNetPay: number;

  // Effective Rates
  effectiveFederalRate: number;
  effectiveStateRate: number;
  effectiveFicaRate: number;
  effectiveTotalTaxRate: number;
  takeHomePercentage: number;

  // Frequency Outputs
  selectedPeriod: FrequencyBreakdown;
  allFrequencies: Record<PayFrequency, FrequencyBreakdown>;

  // Itemized List for UI
  deductionsList: DeductionLineItem[];
}

export const PAY_FREQUENCY_DIVISORS: Record<PayFrequency, number> = {
  annual: 1,
  monthly: 12,
  semimonthly: 24,
  biweekly: 26,
  weekly: 52,
};

export const FILING_STATUS_LABELS: Record<FilingStatus, string> = {
  single: "Single",
  married_joint: "Married Filing Jointly",
  head_of_household: "Head of Household",
};

/**
 * 2026 Federal Tax Parameters (IRS Projections & Wage Base Limits)
 */
export const FEDERAL_TAX_CONFIG_2026 = {
  TAX_YEAR: 2026,
  SOCIAL_SECURITY_RATE: 0.062,
  SOCIAL_SECURITY_WAGE_BASE: 184500, // Official 2026 SSA limit
  MEDICARE_BASE_RATE: 0.0145,
  ADDITIONAL_MEDICARE_RATE: 0.009,
  ADDITIONAL_MEDICARE_THRESHOLDS: {
    single: 200000,
    head_of_household: 200000,
    married_joint: 250000,
  },
  STANDARD_DEDUCTION: {
    single: 15000,
    head_of_household: 22500,
    married_joint: 30000,
  } as Record<FilingStatus, number>,
  BRACKETS: {
    single: [
      { limit: 11925, rate: 0.10 },
      { limit: 48475, rate: 0.12 },
      { limit: 103350, rate: 0.22 },
      { limit: 197300, rate: 0.24 },
      { limit: 250525, rate: 0.32 },
      { limit: 626350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ],
    married_joint: [
      { limit: 23850, rate: 0.10 },
      { limit: 96950, rate: 0.12 },
      { limit: 206700, rate: 0.22 },
      { limit: 394600, rate: 0.24 },
      { limit: 501050, rate: 0.32 },
      { limit: 751600, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ],
    head_of_household: [
      { limit: 17000, rate: 0.10 },
      { limit: 64850, rate: 0.12 },
      { limit: 103350, rate: 0.22 },
      { limit: 197300, rate: 0.24 },
      { limit: 250500, rate: 0.32 },
      { limit: 626350, rate: 0.35 },
      { limit: Infinity, rate: 0.37 },
    ],
  } as Record<FilingStatus, TaxBracket[]>,
};

/**
 * Calculates progressive tax through any graduated bracket schedule.
 */
export function calculateProgressiveTax(taxableIncome: number, brackets: TaxBracket[]): number {
  if (taxableIncome <= 0) return 0;
  let tax = 0;
  let previousLimit = 0;

  for (const bracket of brackets) {
    if (taxableIncome > previousLimit) {
      const taxableInThisBracket = Math.min(taxableIncome, bracket.limit) - previousLimit;
      tax += taxableInThisBracket * bracket.rate;
      previousLimit = bracket.limit;
      if (taxableIncome <= bracket.limit) break;
    }
  }

  return tax;
}

/**
 * Generic State & Federal Paycheck Calculation Function.
 * Reusable for any of the 50 US states.
 */
export function calculateStateSalaryPaycheck(
  input: StateSalaryInput,
  stateConfig: StateTaxConfig
): StateSalaryResult {
  const wage = Math.max(0, input.wage || 0);
  const hoursPerWeek = Math.max(1, input.hoursPerWeek || 40);

  // 1. Calculate Gross Annual Income
  let grossAnnual = 0;
  if (input.wageType === "hourly") {
    grossAnnual = wage * hoursPerWeek * 52;
  } else {
    grossAnnual = wage;
  }

  // 2. Pre-Tax Deductions (401k & Health Insurance)
  const fourZeroOneKPct = Math.max(0, Math.min(60, input.preTaxDeductions?.fourZeroOneKPercent || 0));
  const monthlyHealth = Math.max(0, input.preTaxDeductions?.monthlyHealthInsurance || 0);

  const annual401k = grossAnnual * (fourZeroOneKPct / 100);
  const annualHealthInsurance = monthlyHealth * 12;
  const annualPreTaxDeductions = annual401k + annualHealthInsurance;

  // AGI for federal & state income tax base
  const adjustedGrossIncome = Math.max(0, grossAnnual - annualPreTaxDeductions);

  // 3. Federal Income Tax
  const fedStandardDeduction = FEDERAL_TAX_CONFIG_2026.STANDARD_DEDUCTION[input.filingStatus] || 15000;
  const federalTaxableIncome = Math.max(0, adjustedGrossIncome - fedStandardDeduction);
  const federalBrackets = FEDERAL_TAX_CONFIG_2026.BRACKETS[input.filingStatus];
  const annualFederalTax = calculateProgressiveTax(federalTaxableIncome, federalBrackets);

  // 4. FICA Taxes (Social Security & Medicare)
  // Note: 401(k) is subject to FICA, but Section 125 health insurance is exempt.
  const ficaWageBase = Math.max(0, grossAnnual - annualHealthInsurance);

  // Social Security (capped at $184,500 in 2026)
  const ssSubjectWages = Math.min(ficaWageBase, FEDERAL_TAX_CONFIG_2026.SOCIAL_SECURITY_WAGE_BASE);
  const annualSocialSecurity = ssSubjectWages * FEDERAL_TAX_CONFIG_2026.SOCIAL_SECURITY_RATE;

  // Medicare (1.45% uncapped + 0.9% additional over threshold)
  const baseMedicare = ficaWageBase * FEDERAL_TAX_CONFIG_2026.MEDICARE_BASE_RATE;
  const addMedicareThreshold = FEDERAL_TAX_CONFIG_2026.ADDITIONAL_MEDICARE_THRESHOLDS[input.filingStatus];
  const excessMedicareWages = Math.max(0, ficaWageBase - addMedicareThreshold);
  const additionalMedicare = excessMedicareWages * FEDERAL_TAX_CONFIG_2026.ADDITIONAL_MEDICARE_RATE;
  const annualMedicare = baseMedicare + additionalMedicare;
  const annualTotalFica = annualSocialSecurity + annualMedicare;

  // 5. State Income Tax
  let annualStateTax = 0;
  if (stateConfig.hasStateIncomeTax) {
    const stateStandardDeduction = stateConfig.standardDeduction[input.filingStatus] || 0;
    const stateTaxableIncome = Math.max(0, adjustedGrossIncome - stateStandardDeduction);
    const stateBrackets = stateConfig.brackets[input.filingStatus] || stateConfig.brackets.single;
    annualStateTax = calculateProgressiveTax(stateTaxableIncome, stateBrackets);
  }

  // 6. Annual Totals & Rates
  const annualTotalTax = annualFederalTax + annualStateTax + annualTotalFica;
  const annualNetPay = Math.max(0, grossAnnual - annualTotalTax - annualPreTaxDeductions);

  const effectiveFederalRate = grossAnnual > 0 ? (annualFederalTax / grossAnnual) * 100 : 0;
  const effectiveStateRate = grossAnnual > 0 ? (annualStateTax / grossAnnual) * 100 : 0;
  const effectiveFicaRate = grossAnnual > 0 ? (annualTotalFica / grossAnnual) * 100 : 0;
  const effectiveTotalTaxRate = grossAnnual > 0 ? (annualTotalTax / grossAnnual) * 100 : 0;
  const takeHomePercentage = grossAnnual > 0 ? (annualNetPay / grossAnnual) * 100 : 0;

  // 7. Breakdown Across All 5 Pay Frequencies
  const allFrequencies: Record<PayFrequency, FrequencyBreakdown> = {
    annual: createFrequencyBreakdown(1, grossAnnual, annualFederalTax, annualStateTax, annualSocialSecurity, annualMedicare, annualTotalTax, annualPreTaxDeductions, annualNetPay),
    monthly: createFrequencyBreakdown(12, grossAnnual, annualFederalTax, annualStateTax, annualSocialSecurity, annualMedicare, annualTotalTax, annualPreTaxDeductions, annualNetPay),
    semimonthly: createFrequencyBreakdown(24, grossAnnual, annualFederalTax, annualStateTax, annualSocialSecurity, annualMedicare, annualTotalTax, annualPreTaxDeductions, annualNetPay),
    biweekly: createFrequencyBreakdown(26, grossAnnual, annualFederalTax, annualStateTax, annualSocialSecurity, annualMedicare, annualTotalTax, annualPreTaxDeductions, annualNetPay),
    weekly: createFrequencyBreakdown(52, grossAnnual, annualFederalTax, annualStateTax, annualSocialSecurity, annualMedicare, annualTotalTax, annualPreTaxDeductions, annualNetPay),
  };

  const selectedDivisor = PAY_FREQUENCY_DIVISORS[input.payFrequency] || 26;
  const grossSelected = grossAnnual / selectedDivisor;
  const selectedPeriod = allFrequencies[input.payFrequency];

  // 8. Deductions Line Items for UI
  const deductionsList: DeductionLineItem[] = [
    {
      name: "Federal Income Tax",
      amountAnnual: annualFederalTax,
      amountSelected: annualFederalTax / selectedDivisor,
      percentOfGross: grossAnnual > 0 ? (annualFederalTax / grossAnnual) * 100 : 0,
      category: "federal",
    },
    {
      name: `${stateConfig.stateName} State Tax`,
      amountAnnual: annualStateTax,
      amountSelected: annualStateTax / selectedDivisor,
      percentOfGross: grossAnnual > 0 ? (annualStateTax / grossAnnual) * 100 : 0,
      category: "state",
    },
    {
      name: "Social Security (OASDI 6.2%)",
      amountAnnual: annualSocialSecurity,
      amountSelected: annualSocialSecurity / selectedDivisor,
      percentOfGross: grossAnnual > 0 ? (annualSocialSecurity / grossAnnual) * 100 : 0,
      category: "fica",
    },
    {
      name: "Medicare (1.45%)",
      amountAnnual: annualMedicare,
      amountSelected: annualMedicare / selectedDivisor,
      percentOfGross: grossAnnual > 0 ? (annualMedicare / grossAnnual) * 100 : 0,
      category: "fica",
    },
  ];

  if (annualPreTaxDeductions > 0) {
    if (annual401k > 0) {
      deductionsList.push({
        name: `401(k) Retirement (${fourZeroOneKPct}%)`,
        amountAnnual: annual401k,
        amountSelected: annual401k / selectedDivisor,
        percentOfGross: grossAnnual > 0 ? (annual401k / grossAnnual) * 100 : 0,
        category: "pretax",
      });
    }
    if (annualHealthInsurance > 0) {
      deductionsList.push({
        name: "Health Insurance (Pre-Tax)",
        amountAnnual: annualHealthInsurance,
        amountSelected: annualHealthInsurance / selectedDivisor,
        percentOfGross: grossAnnual > 0 ? (annualHealthInsurance / grossAnnual) * 100 : 0,
        category: "pretax",
      });
    }
  }

  return {
    stateName: stateConfig.stateName,
    stateAbbrev: stateConfig.stateAbbrev,
    taxYear: stateConfig.taxYear,
    wageType: input.wageType,
    hoursPerWeek,
    filingStatus: input.filingStatus,
    selectedFrequency: input.payFrequency,

    grossAnnual,
    grossSelected,
    annualPreTaxDeductions,
    adjustedGrossIncome,
    annualFederalTax,
    annualStateTax,
    annualSocialSecurity,
    annualMedicare,
    annualTotalFica,
    annualTotalTax,
    annualNetPay,

    effectiveFederalRate,
    effectiveStateRate,
    effectiveFicaRate,
    effectiveTotalTaxRate,
    takeHomePercentage,

    selectedPeriod,
    allFrequencies,
    deductionsList,
  };
}

function createFrequencyBreakdown(
  divisor: number,
  gross: number,
  fed: number,
  state: number,
  ss: number,
  med: number,
  totalTax: number,
  preTax: number,
  net: number
): FrequencyBreakdown {
  return {
    gross: gross / divisor,
    federalTax: fed / divisor,
    stateTax: state / divisor,
    socialSecurity: ss / divisor,
    medicare: med / divisor,
    totalTax: totalTax / divisor,
    preTaxDeductions: preTax / divisor,
    netPay: net / divisor,
  };
}
