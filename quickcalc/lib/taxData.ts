export type FilingStatus = "single" | "married_joint" | "head_of_household";
export type PayFrequency = "annual" | "monthly" | "semimonthly" | "biweekly" | "weekly" | "hourly";
export type WageType = "annual" | "hourly";

export interface TaxBracket {
  limit: number;
  rate: number;
}

export interface StateTaxData {
  name: string;
  slug: string;
  abbrev: string;
  hasIncomeTax: boolean;
  taxType: "none" | "flat" | "graduated";
  topRateText: string;
  topRatePercent: number;
  standardDeduction: Record<FilingStatus, number>;
  brackets: Record<FilingStatus, TaxBracket[]>;
  localTaxNote?: string;
  description: string;
  rankByPopulation: number;
  popular?: boolean;
}

export interface PaycheckInput {
  wage: number;
  wageType: WageType;
  hoursPerWeek: number;
  payFrequency: PayFrequency;
  filingStatus: FilingStatus;
  k401Percent?: number;
  monthlyHealthInsurance?: number;
}

export interface PeriodBreakdown {
  gross: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  totalFica: number;
  totalTaxes: number;
  preTaxDeductions: number;
  netPay: number;
}

export interface PaycheckResult {
  state: StateTaxData;
  grossAnnual: number;
  taxableWages: number;
  annualFederalTax: number;
  annualStateTax: number;
  annualSocialSecurity: number;
  annualMedicare: number;
  annualTotalFica: number;
  annualTotalTaxes: number;
  annualPreTaxDeductions: number;
  annualNetPay: number;

  effectiveFederalRate: number;
  effectiveStateRate: number;
  effectiveFicaRate: number;
  effectiveTotalTaxRate: number;
  takeHomePercentage: number;

  selectedPeriod: PeriodBreakdown;
  periods: Record<"annual" | "monthly" | "semimonthly" | "biweekly" | "weekly", PeriodBreakdown>;
}

export const FEDERAL_2026 = {
  STANDARD_DEDUCTION: {
    single: 15000,
    married_joint: 30000,
    head_of_household: 22500,
  } as Record<FilingStatus, number>,
  SS_WAGE_BASE: 184500, // 2026 SSA cap
  SS_RATE: 0.062,
  MEDICARE_RATE: 0.0145,
  ADD_MEDICARE_RATE: 0.009,
  ADD_MEDICARE_THRESHOLD: {
    single: 200000,
    married_joint: 250000,
    head_of_household: 200000,
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

export const FREQUENCY_DIVISORS: Record<"annual" | "monthly" | "semimonthly" | "biweekly" | "weekly", number> = {
  annual: 1,
  monthly: 12,
  semimonthly: 24,
  biweekly: 26,
  weekly: 52,
};

// Helper for progressive tax math
export function calculateProgressiveTax(taxableIncome: number, brackets: TaxBracket[]): number {
  if (taxableIncome <= 0) return 0;
  let tax = 0;
  let prevLimit = 0;
  for (const b of brackets) {
    if (taxableIncome > prevLimit) {
      const taxableInBracket = Math.min(taxableIncome, b.limit) - prevLimit;
      tax += taxableInBracket * b.rate;
      prevLimit = b.limit;
      if (taxableIncome <= b.limit) break;
    }
  }
  return tax;
}

// Flat bracket generator helper
function flatBrackets(rate: number): Record<FilingStatus, TaxBracket[]> {
  return {
    single: [{ limit: Infinity, rate }],
    married_joint: [{ limit: Infinity, rate }],
    head_of_household: [{ limit: Infinity, rate }],
  };
}

// Zero bracket generator helper
function zeroBrackets(): Record<FilingStatus, TaxBracket[]> {
  return flatBrackets(0);
}

// Complete 50 States + DC Tax Data
export const STATES_TAX_DATA: StateTaxData[] = [
  {
    name: "Alabama",
    slug: "alabama",
    abbrev: "AL",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "5.0%",
    topRatePercent: 5.0,
    standardDeduction: { single: 3000, married_joint: 8500, head_of_household: 5200 },
    brackets: {
      single: [
        { limit: 500, rate: 0.02 },
        { limit: 3000, rate: 0.04 },
        { limit: Infinity, rate: 0.05 },
      ],
      married_joint: [
        { limit: 1000, rate: 0.02 },
        { limit: 6000, rate: 0.04 },
        { limit: Infinity, rate: 0.05 },
      ],
      head_of_household: [
        { limit: 500, rate: 0.02 },
        { limit: 3000, rate: 0.04 },
        { limit: Infinity, rate: 0.05 },
      ],
    },
    description: "Graduated state tax from 2.0% to 5.0% with state standard deduction.",
    rankByPopulation: 24,
  },
  {
    name: "Alaska",
    slug: "alaska",
    abbrev: "AK",
    hasIncomeTax: false,
    taxType: "none",
    topRateText: "0.0%",
    topRatePercent: 0.0,
    standardDeduction: { single: 0, married_joint: 0, head_of_household: 0 },
    brackets: zeroBrackets(),
    description: "No state individual income tax on wages or salary.",
    rankByPopulation: 48,
  },
  {
    name: "Arizona",
    slug: "arizona",
    abbrev: "AZ",
    hasIncomeTax: true,
    taxType: "flat",
    topRateText: "2.5%",
    topRatePercent: 2.5,
    standardDeduction: { single: 15000, married_joint: 30000, head_of_household: 22500 },
    brackets: flatBrackets(0.025),
    description: "Statutory 2.5% flat personal income tax rate.",
    rankByPopulation: 14,
  },
  {
    name: "Arkansas",
    slug: "arkansas",
    abbrev: "AR",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "3.7%",
    topRatePercent: 3.7,
    standardDeduction: { single: 2470, married_joint: 4940, head_of_household: 2470 },
    brackets: {
      single: [
        { limit: 5599, rate: 0.00 },
        { limit: 11199, rate: 0.02 },
        { limit: 15999, rate: 0.03 },
        { limit: 26399, rate: 0.034 },
        { limit: Infinity, rate: 0.037 },
      ],
      married_joint: [
        { limit: 11198, rate: 0.00 },
        { limit: 22398, rate: 0.02 },
        { limit: 31998, rate: 0.03 },
        { limit: 52798, rate: 0.034 },
        { limit: Infinity, rate: 0.037 },
      ],
      head_of_household: [
        { limit: 5599, rate: 0.00 },
        { limit: 11199, rate: 0.02 },
        { limit: 15999, rate: 0.03 },
        { limit: 26399, rate: 0.034 },
        { limit: Infinity, rate: 0.037 },
      ],
    },
    description: "Progressive brackets with a recently reduced 3.7% top marginal rate.",
    rankByPopulation: 33,
  },
  {
    name: "California",
    slug: "california",
    abbrev: "CA",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "13.3%",
    topRatePercent: 13.3,
    standardDeduction: { single: 5540, married_joint: 11080, head_of_household: 11080 },
    brackets: {
      single: [
        { limit: 10412, rate: 0.01 },
        { limit: 24684, rate: 0.02 },
        { limit: 38959, rate: 0.04 },
        { limit: 54081, rate: 0.06 },
        { limit: 68350, rate: 0.08 },
        { limit: 349137, rate: 0.093 },
        { limit: 418961, rate: 0.103 },
        { limit: 698271, rate: 0.113 },
        { limit: 1000000, rate: 0.123 },
        { limit: Infinity, rate: 0.133 },
      ],
      married_joint: [
        { limit: 20824, rate: 0.01 },
        { limit: 49368, rate: 0.02 },
        { limit: 77918, rate: 0.04 },
        { limit: 108162, rate: 0.06 },
        { limit: 136700, rate: 0.08 },
        { limit: 698274, rate: 0.093 },
        { limit: 837922, rate: 0.103 },
        { limit: 1396542, rate: 0.113 },
        { limit: 2000000, rate: 0.123 },
        { limit: Infinity, rate: 0.133 },
      ],
      head_of_household: [
        { limit: 20839, rate: 0.01 },
        { limit: 49369, rate: 0.02 },
        { limit: 63641, rate: 0.04 },
        { limit: 78765, rate: 0.06 },
        { limit: 93037, rate: 0.08 },
        { limit: 474824, rate: 0.093 },
        { limit: 569790, rate: 0.103 },
        { limit: 949649, rate: 0.113 },
        { limit: 1000000, rate: 0.123 },
        { limit: Infinity, rate: 0.133 },
      ],
    },
    description: "Ten progressive tiers ranging from 1.0% up to 13.3% for high earners.",
    rankByPopulation: 1,
    popular: true,
  },
  {
    name: "Colorado",
    slug: "colorado",
    abbrev: "CO",
    hasIncomeTax: true,
    taxType: "flat",
    topRateText: "4.4%",
    topRatePercent: 4.4,
    standardDeduction: { single: 15000, married_joint: 30000, head_of_household: 22500 },
    brackets: flatBrackets(0.044),
    description: "Flat 4.4% state income tax tied to federal taxable income.",
    rankByPopulation: 21,
  },
  {
    name: "Connecticut",
    slug: "connecticut",
    abbrev: "CT",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "6.99%",
    topRatePercent: 6.99,
    standardDeduction: { single: 0, married_joint: 0, head_of_household: 0 },
    brackets: {
      single: [
        { limit: 10000, rate: 0.02 },
        { limit: 50000, rate: 0.045 },
        { limit: 100000, rate: 0.055 },
        { limit: 200000, rate: 0.06 },
        { limit: 250000, rate: 0.065 },
        { limit: 500000, rate: 0.069 },
        { limit: Infinity, rate: 0.0699 },
      ],
      married_joint: [
        { limit: 20000, rate: 0.02 },
        { limit: 100000, rate: 0.045 },
        { limit: 200000, rate: 0.055 },
        { limit: 400000, rate: 0.06 },
        { limit: 500000, rate: 0.065 },
        { limit: 1000000, rate: 0.069 },
        { limit: Infinity, rate: 0.0699 },
      ],
      head_of_household: [
        { limit: 16000, rate: 0.02 },
        { limit: 80000, rate: 0.045 },
        { limit: 160000, rate: 0.055 },
        { limit: 320000, rate: 0.06 },
        { limit: 400000, rate: 0.065 },
        { limit: 800000, rate: 0.069 },
        { limit: Infinity, rate: 0.0699 },
      ],
    },
    description: "Seven progressive brackets from 2.0% to 6.99% with personal tax credits.",
    rankByPopulation: 29,
  },
  {
    name: "Delaware",
    slug: "delaware",
    abbrev: "DE",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "6.6%",
    topRatePercent: 6.6,
    standardDeduction: { single: 3250, married_joint: 6500, head_of_household: 3250 },
    brackets: {
      single: [
        { limit: 2000, rate: 0.00 },
        { limit: 5000, rate: 0.022 },
        { limit: 10000, rate: 0.039 },
        { limit: 20000, rate: 0.048 },
        { limit: 25000, rate: 0.052 },
        { limit: 60000, rate: 0.0555 },
        { limit: Infinity, rate: 0.066 },
      ],
      married_joint: [
        { limit: 2000, rate: 0.00 },
        { limit: 5000, rate: 0.022 },
        { limit: 10000, rate: 0.039 },
        { limit: 20000, rate: 0.048 },
        { limit: 25000, rate: 0.052 },
        { limit: 60000, rate: 0.0555 },
        { limit: Infinity, rate: 0.066 },
      ],
      head_of_household: [
        { limit: 2000, rate: 0.00 },
        { limit: 5000, rate: 0.022 },
        { limit: 10000, rate: 0.039 },
        { limit: 20000, rate: 0.048 },
        { limit: 25000, rate: 0.052 },
        { limit: 60000, rate: 0.0555 },
        { limit: Infinity, rate: 0.066 },
      ],
    },
    description: "Progressive rates from 2.2% up to 6.6% over $60k.",
    rankByPopulation: 45,
  },
  {
    name: "Florida",
    slug: "florida",
    abbrev: "FL",
    hasIncomeTax: false,
    taxType: "none",
    topRateText: "0.0%",
    topRatePercent: 0.0,
    standardDeduction: { single: 0, married_joint: 0, head_of_household: 0 },
    brackets: zeroBrackets(),
    description: "No state individual income tax on wages or salary.",
    rankByPopulation: 3,
    popular: true,
  },
  {
    name: "Georgia",
    slug: "georgia",
    abbrev: "GA",
    hasIncomeTax: true,
    taxType: "flat",
    topRateText: "5.39%",
    topRatePercent: 5.39,
    standardDeduction: { single: 12000, married_joint: 24000, head_of_household: 12000 },
    brackets: flatBrackets(0.0539),
    description: "Flat 5.39% individual state tax rate.",
    rankByPopulation: 8,
    popular: true,
  },
  {
    name: "Hawaii",
    slug: "hawaii",
    abbrev: "HI",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "11.0%",
    topRatePercent: 11.0,
    standardDeduction: { single: 2200, married_joint: 4400, head_of_household: 3212 },
    brackets: {
      single: [
        { limit: 2400, rate: 0.014 },
        { limit: 4800, rate: 0.032 },
        { limit: 9600, rate: 0.055 },
        { limit: 14400, rate: 0.064 },
        { limit: 19200, rate: 0.068 },
        { limit: 24000, rate: 0.072 },
        { limit: 36000, rate: 0.076 },
        { limit: 48000, rate: 0.079 },
        { limit: 150000, rate: 0.0825 },
        { limit: 175000, rate: 0.09 },
        { limit: 200000, rate: 0.10 },
        { limit: Infinity, rate: 0.11 },
      ],
      married_joint: [
        { limit: 4800, rate: 0.014 },
        { limit: 9600, rate: 0.032 },
        { limit: 19200, rate: 0.055 },
        { limit: 28800, rate: 0.064 },
        { limit: 38400, rate: 0.068 },
        { limit: 48000, rate: 0.072 },
        { limit: 72000, rate: 0.076 },
        { limit: 96000, rate: 0.079 },
        { limit: 300000, rate: 0.0825 },
        { limit: 350000, rate: 0.09 },
        { limit: 400000, rate: 0.10 },
        { limit: Infinity, rate: 0.11 },
      ],
      head_of_household: [
        { limit: 3600, rate: 0.014 },
        { limit: 7200, rate: 0.032 },
        { limit: 14400, rate: 0.055 },
        { limit: 21600, rate: 0.064 },
        { limit: 28800, rate: 0.068 },
        { limit: 36000, rate: 0.072 },
        { limit: 54000, rate: 0.076 },
        { limit: 72000, rate: 0.079 },
        { limit: 225000, rate: 0.0825 },
        { limit: 262500, rate: 0.09 },
        { limit: 300000, rate: 0.10 },
        { limit: Infinity, rate: 0.11 },
      ],
    },
    description: "Twelve graduated tax tiers with a top marginal rate of 11.0%.",
    rankByPopulation: 40,
  },
  {
    name: "Idaho",
    slug: "idaho",
    abbrev: "ID",
    hasIncomeTax: true,
    taxType: "flat",
    topRateText: "5.695%",
    topRatePercent: 5.695,
    standardDeduction: { single: 15000, married_joint: 30000, head_of_household: 22500 },
    brackets: flatBrackets(0.05695),
    description: "Flat 5.695% individual income tax rate.",
    rankByPopulation: 38,
  },
  {
    name: "Illinois",
    slug: "illinois",
    abbrev: "IL",
    hasIncomeTax: true,
    taxType: "flat",
    topRateText: "4.95%",
    topRatePercent: 4.95,
    standardDeduction: { single: 2775, married_joint: 5550, head_of_household: 2775 },
    brackets: flatBrackets(0.0495),
    description: "Flat 4.95% state income tax with statutory personal exemptions.",
    rankByPopulation: 6,
    popular: true,
  },
  {
    name: "Indiana",
    slug: "indiana",
    abbrev: "IN",
    hasIncomeTax: true,
    taxType: "flat",
    topRateText: "3.05%",
    topRatePercent: 3.05,
    standardDeduction: { single: 1000, married_joint: 2000, head_of_household: 1000 },
    brackets: flatBrackets(0.0305),
    localTaxNote: "Counties levy local income tax from 1.0% to 2.9%.",
    description: "Low state flat rate of 3.05% plus local county tax.",
    rankByPopulation: 17,
  },
  {
    name: "Iowa",
    slug: "iowa",
    abbrev: "IA",
    hasIncomeTax: true,
    taxType: "flat",
    topRateText: "3.8%",
    topRatePercent: 3.8,
    standardDeduction: { single: 15000, married_joint: 30000, head_of_household: 22500 },
    brackets: flatBrackets(0.038),
    description: "Consolidated flat individual income tax rate of 3.8%.",
    rankByPopulation: 31,
  },
  {
    name: "Kansas",
    slug: "kansas",
    abbrev: "KS",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "5.58%",
    topRatePercent: 5.58,
    standardDeduction: { single: 3500, married_joint: 8000, head_of_household: 6000 },
    brackets: {
      single: [
        { limit: 15000, rate: 0.031 },
        { limit: 30000, rate: 0.0525 },
        { limit: Infinity, rate: 0.0558 },
      ],
      married_joint: [
        { limit: 30000, rate: 0.031 },
        { limit: 60000, rate: 0.0525 },
        { limit: Infinity, rate: 0.0558 },
      ],
      head_of_household: [
        { limit: 15000, rate: 0.031 },
        { limit: 30000, rate: 0.0525 },
        { limit: Infinity, rate: 0.0558 },
      ],
    },
    description: "Three graduated brackets up to 5.58%.",
    rankByPopulation: 35,
  },
  {
    name: "Kentucky",
    slug: "kentucky",
    abbrev: "KY",
    hasIncomeTax: true,
    taxType: "flat",
    topRateText: "4.0%",
    topRatePercent: 4.0,
    standardDeduction: { single: 3160, married_joint: 3160, head_of_household: 3160 },
    brackets: flatBrackets(0.04),
    description: "Flat 4.0% state individual income tax rate.",
    rankByPopulation: 26,
  },
  {
    name: "Louisiana",
    slug: "louisiana",
    abbrev: "LA",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "4.25%",
    topRatePercent: 4.25,
    standardDeduction: { single: 4500, married_joint: 9000, head_of_household: 4500 },
    brackets: {
      single: [
        { limit: 12500, rate: 0.0185 },
        { limit: 50000, rate: 0.035 },
        { limit: Infinity, rate: 0.0425 },
      ],
      married_joint: [
        { limit: 25000, rate: 0.0185 },
        { limit: 100000, rate: 0.035 },
        { limit: Infinity, rate: 0.0425 },
      ],
      head_of_household: [
        { limit: 12500, rate: 0.0185 },
        { limit: 50000, rate: 0.035 },
        { limit: Infinity, rate: 0.0425 },
      ],
    },
    description: "Three progressive tax brackets from 1.85% to 4.25%.",
    rankByPopulation: 25,
  },
  {
    name: "Maine",
    slug: "maine",
    abbrev: "ME",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "7.15%",
    topRatePercent: 7.15,
    standardDeduction: { single: 15000, married_joint: 30000, head_of_household: 22500 },
    brackets: {
      single: [
        { limit: 26050, rate: 0.058 },
        { limit: 61600, rate: 0.0675 },
        { limit: Infinity, rate: 0.0715 },
      ],
      married_joint: [
        { limit: 52100, rate: 0.058 },
        { limit: 123250, rate: 0.0675 },
        { limit: Infinity, rate: 0.0715 },
      ],
      head_of_household: [
        { limit: 39100, rate: 0.058 },
        { limit: 92450, rate: 0.0675 },
        { limit: Infinity, rate: 0.0715 },
      ],
    },
    description: "Three graduated brackets ranging from 5.8% to 7.15%.",
    rankByPopulation: 42,
  },
  {
    name: "Maryland",
    slug: "maryland",
    abbrev: "MD",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "5.75%",
    topRatePercent: 5.75,
    standardDeduction: { single: 2700, married_joint: 5450, head_of_household: 2700 },
    brackets: {
      single: [
        { limit: 1000, rate: 0.02 },
        { limit: 2000, rate: 0.03 },
        { limit: 3000, rate: 0.04 },
        { limit: 100000, rate: 0.0475 },
        { limit: 125000, rate: 0.05 },
        { limit: 150000, rate: 0.0525 },
        { limit: 250000, rate: 0.055 },
        { limit: Infinity, rate: 0.0575 },
      ],
      married_joint: [
        { limit: 1000, rate: 0.02 },
        { limit: 2000, rate: 0.03 },
        { limit: 3000, rate: 0.04 },
        { limit: 150000, rate: 0.0475 },
        { limit: 175000, rate: 0.05 },
        { limit: 225000, rate: 0.0525 },
        { limit: 300000, rate: 0.055 },
        { limit: Infinity, rate: 0.0575 },
      ],
      head_of_household: [
        { limit: 1000, rate: 0.02 },
        { limit: 2000, rate: 0.03 },
        { limit: 3000, rate: 0.04 },
        { limit: 100000, rate: 0.0475 },
        { limit: 125000, rate: 0.05 },
        { limit: 150000, rate: 0.0525 },
        { limit: 250000, rate: 0.055 },
        { limit: Infinity, rate: 0.0575 },
      ],
    },
    localTaxNote: "Counties levy local income tax from 2.25% to 3.2%.",
    description: "Graduated state tax up to 5.75% plus county local income taxes.",
    rankByPopulation: 19,
  },
  {
    name: "Massachusetts",
    slug: "massachusetts",
    abbrev: "MA",
    hasIncomeTax: true,
    taxType: "flat",
    topRateText: "5.0%",
    topRatePercent: 5.0,
    standardDeduction: { single: 4400, married_joint: 8800, head_of_household: 6800 },
    brackets: flatBrackets(0.05),
    description: "Flat 5.0% income tax rate (plus 4% surtax over $1M income).",
    rankByPopulation: 15,
  },
  {
    name: "Michigan",
    slug: "michigan",
    abbrev: "MI",
    hasIncomeTax: true,
    taxType: "flat",
    topRateText: "4.25%",
    topRatePercent: 4.25,
    standardDeduction: { single: 5600, married_joint: 11200, head_of_household: 5600 },
    brackets: flatBrackets(0.0425),
    localTaxNote: "Certain cities like Detroit levy local income tax.",
    description: "Flat 4.25% state personal income tax rate.",
    rankByPopulation: 10,
  },
  {
    name: "Minnesota",
    slug: "minnesota",
    abbrev: "MN",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "9.85%",
    topRatePercent: 9.85,
    standardDeduction: { single: 15000, married_joint: 30000, head_of_household: 22500 },
    brackets: {
      single: [
        { limit: 31690, rate: 0.0535 },
        { limit: 104090, rate: 0.068 },
        { limit: 193240, rate: 0.0785 },
        { limit: Infinity, rate: 0.0985 },
      ],
      married_joint: [
        { limit: 46330, rate: 0.0535 },
        { limit: 184080, rate: 0.068 },
        { limit: 321450, rate: 0.0785 },
        { limit: Infinity, rate: 0.0985 },
      ],
      head_of_household: [
        { limit: 39010, rate: 0.0535 },
        { limit: 156760, rate: 0.068 },
        { limit: 251730, rate: 0.0785 },
        { limit: Infinity, rate: 0.0985 },
      ],
    },
    description: "Four progressive tax brackets from 5.35% to 9.85%.",
    rankByPopulation: 22,
  },
  {
    name: "Mississippi",
    slug: "mississippi",
    abbrev: "MS",
    hasIncomeTax: true,
    taxType: "flat",
    topRateText: "4.7%",
    topRatePercent: 4.7,
    standardDeduction: { single: 2300, married_joint: 4600, head_of_household: 3400 },
    brackets: flatBrackets(0.047),
    description: "Flat 4.7% individual income tax rate over exempt thresholds.",
    rankByPopulation: 34,
  },
  {
    name: "Missouri",
    slug: "missouri",
    abbrev: "MO",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "4.8%",
    topRatePercent: 4.8,
    standardDeduction: { single: 15000, married_joint: 30000, head_of_household: 22500 },
    brackets: {
      single: [
        { limit: 1273, rate: 0.00 },
        { limit: 2546, rate: 0.02 },
        { limit: 3819, rate: 0.025 },
        { limit: 5092, rate: 0.03 },
        { limit: 6365, rate: 0.035 },
        { limit: 7638, rate: 0.04 },
        { limit: 8911, rate: 0.045 },
        { limit: Infinity, rate: 0.048 },
      ],
      married_joint: [
        { limit: 1273, rate: 0.00 },
        { limit: 2546, rate: 0.02 },
        { limit: 3819, rate: 0.025 },
        { limit: 5092, rate: 0.03 },
        { limit: 6365, rate: 0.035 },
        { limit: 7638, rate: 0.04 },
        { limit: 8911, rate: 0.045 },
        { limit: Infinity, rate: 0.048 },
      ],
      head_of_household: [
        { limit: 1273, rate: 0.00 },
        { limit: 2546, rate: 0.02 },
        { limit: 3819, rate: 0.025 },
        { limit: 5092, rate: 0.03 },
        { limit: 6365, rate: 0.035 },
        { limit: 7638, rate: 0.04 },
        { limit: 8911, rate: 0.045 },
        { limit: Infinity, rate: 0.048 },
      ],
    },
    localTaxNote: "St. Louis and Kansas City charge 1.0% earnings tax.",
    description: "Progressive rates with a top bracket of 4.8%.",
    rankByPopulation: 18,
  },
  {
    name: "Montana",
    slug: "montana",
    abbrev: "MT",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "5.9%",
    topRatePercent: 5.9,
    standardDeduction: { single: 15000, married_joint: 30000, head_of_household: 22500 },
    brackets: {
      single: [
        { limit: 20500, rate: 0.047 },
        { limit: Infinity, rate: 0.059 },
      ],
      married_joint: [
        { limit: 41000, rate: 0.047 },
        { limit: Infinity, rate: 0.059 },
      ],
      head_of_household: [
        { limit: 30750, rate: 0.047 },
        { limit: Infinity, rate: 0.059 },
      ],
    },
    description: "Two-bracket income tax system with 4.7% and 5.9% rates.",
    rankByPopulation: 44,
  },
  {
    name: "Nebraska",
    slug: "nebraska",
    abbrev: "NE",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "5.2%",
    topRatePercent: 5.2,
    standardDeduction: { single: 8250, married_joint: 16500, head_of_household: 12150 },
    brackets: {
      single: [
        { limit: 3700, rate: 0.0246 },
        { limit: 22170, rate: 0.0351 },
        { limit: 35730, rate: 0.0501 },
        { limit: Infinity, rate: 0.052 },
      ],
      married_joint: [
        { limit: 7390, rate: 0.0246 },
        { limit: 44350, rate: 0.0351 },
        { limit: 71460, rate: 0.0501 },
        { limit: Infinity, rate: 0.052 },
      ],
      head_of_household: [
        { limit: 6860, rate: 0.0246 },
        { limit: 38810, rate: 0.0351 },
        { limit: 55400, rate: 0.0501 },
        { limit: Infinity, rate: 0.052 },
      ],
    },
    description: "Four progressive brackets with a 5.2% top rate.",
    rankByPopulation: 37,
  },
  {
    name: "Nevada",
    slug: "nevada",
    abbrev: "NV",
    hasIncomeTax: false,
    taxType: "none",
    topRateText: "0.0%",
    topRatePercent: 0.0,
    standardDeduction: { single: 0, married_joint: 0, head_of_household: 0 },
    brackets: zeroBrackets(),
    description: "No state individual income tax on wages or salary.",
    rankByPopulation: 32,
    popular: true,
  },
  {
    name: "New Hampshire",
    slug: "new-hampshire",
    abbrev: "NH",
    hasIncomeTax: false,
    taxType: "none",
    topRateText: "0.0%",
    topRatePercent: 0.0,
    standardDeduction: { single: 0, married_joint: 0, head_of_household: 0 },
    brackets: zeroBrackets(),
    description: "No state earned wage income tax (interest/dividend tax phased out).",
    rankByPopulation: 41,
  },
  {
    name: "New Jersey",
    slug: "new-jersey",
    abbrev: "NJ",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "10.75%",
    topRatePercent: 10.75,
    standardDeduction: { single: 1000, married_joint: 2000, head_of_household: 1000 },
    brackets: {
      single: [
        { limit: 20000, rate: 0.014 },
        { limit: 35000, rate: 0.0175 },
        { limit: 40000, rate: 0.035 },
        { limit: 75000, rate: 0.05525 },
        { limit: 500000, rate: 0.0637 },
        { limit: 1000000, rate: 0.0897 },
        { limit: Infinity, rate: 0.1075 },
      ],
      married_joint: [
        { limit: 20000, rate: 0.014 },
        { limit: 50000, rate: 0.0175 },
        { limit: 70000, rate: 0.0245 },
        { limit: 80000, rate: 0.035 },
        { limit: 150000, rate: 0.05525 },
        { limit: 500000, rate: 0.0637 },
        { limit: 1000000, rate: 0.0897 },
        { limit: Infinity, rate: 0.1075 },
      ],
      head_of_household: [
        { limit: 20000, rate: 0.014 },
        { limit: 35000, rate: 0.0175 },
        { limit: 40000, rate: 0.035 },
        { limit: 75000, rate: 0.05525 },
        { limit: 500000, rate: 0.0637 },
        { limit: 1000000, rate: 0.0897 },
        { limit: Infinity, rate: 0.1075 },
      ],
    },
    description: "Seven progressive brackets from 1.4% up to 10.75% for millionaires.",
    rankByPopulation: 11,
    popular: true,
  },
  {
    name: "New Mexico",
    slug: "new-mexico",
    abbrev: "NM",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "5.9%",
    topRatePercent: 5.9,
    standardDeduction: { single: 15000, married_joint: 30000, head_of_household: 22500 },
    brackets: {
      single: [
        { limit: 5500, rate: 0.017 },
        { limit: 11000, rate: 0.032 },
        { limit: 16000, rate: 0.047 },
        { limit: 210000, rate: 0.049 },
        { limit: Infinity, rate: 0.059 },
      ],
      married_joint: [
        { limit: 8000, rate: 0.017 },
        { limit: 16000, rate: 0.032 },
        { limit: 24000, rate: 0.047 },
        { limit: 315000, rate: 0.049 },
        { limit: Infinity, rate: 0.059 },
      ],
      head_of_household: [
        { limit: 5500, rate: 0.017 },
        { limit: 11000, rate: 0.032 },
        { limit: 16000, rate: 0.047 },
        { limit: 210000, rate: 0.049 },
        { limit: Infinity, rate: 0.059 },
      ],
    },
    description: "Five progressive brackets from 1.7% to 5.9%.",
    rankByPopulation: 36,
  },
  {
    name: "New York",
    slug: "new-york",
    abbrev: "NY",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "10.9%",
    topRatePercent: 10.9,
    standardDeduction: { single: 8000, married_joint: 16050, head_of_household: 11200 },
    brackets: {
      single: [
        { limit: 8500, rate: 0.04 },
        { limit: 11700, rate: 0.045 },
        { limit: 13900, rate: 0.0525 },
        { limit: 80650, rate: 0.055 },
        { limit: 215400, rate: 0.06 },
        { limit: 1077550, rate: 0.0685 },
        { limit: 5000000, rate: 0.0965 },
        { limit: 25000000, rate: 0.103 },
        { limit: Infinity, rate: 0.109 },
      ],
      married_joint: [
        { limit: 17150, rate: 0.04 },
        { limit: 23600, rate: 0.045 },
        { limit: 27900, rate: 0.0525 },
        { limit: 161550, rate: 0.055 },
        { limit: 323200, rate: 0.06 },
        { limit: 2155350, rate: 0.0685 },
        { limit: 5000000, rate: 0.0965 },
        { limit: 25000000, rate: 0.103 },
        { limit: Infinity, rate: 0.109 },
      ],
      head_of_household: [
        { limit: 12800, rate: 0.04 },
        { limit: 17650, rate: 0.045 },
        { limit: 20900, rate: 0.0525 },
        { limit: 107750, rate: 0.055 },
        { limit: 269300, rate: 0.06 },
        { limit: 1616450, rate: 0.0685 },
        { limit: 5000000, rate: 0.0965 },
        { limit: 25000000, rate: 0.103 },
        { limit: Infinity, rate: 0.109 },
      ],
    },
    localTaxNote: "NYC residents pay an additional 3.078% to 3.876% city income tax.",
    description: "Progressive state income tax rates from 4.0% to 10.9%.",
    rankByPopulation: 4,
    popular: true,
  },
  {
    name: "North Carolina",
    slug: "north-carolina",
    abbrev: "NC",
    hasIncomeTax: true,
    taxType: "flat",
    topRateText: "4.5%",
    topRatePercent: 4.5,
    standardDeduction: { single: 12750, married_joint: 25500, head_of_household: 19125 },
    brackets: flatBrackets(0.045),
    description: "Flat 4.5% individual state income tax rate.",
    rankByPopulation: 9,
    popular: true,
  },
  {
    name: "North Dakota",
    slug: "north-dakota",
    abbrev: "ND",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "2.5%",
    topRatePercent: 2.5,
    standardDeduction: { single: 15000, married_joint: 30000, head_of_household: 22500 },
    brackets: {
      single: [
        { limit: 44725, rate: 0.00 },
        { limit: 225975, rate: 0.0195 },
        { limit: Infinity, rate: 0.025 },
      ],
      married_joint: [
        { limit: 74750, rate: 0.00 },
        { limit: 275100, rate: 0.0195 },
        { limit: Infinity, rate: 0.025 },
      ],
      head_of_household: [
        { limit: 59900, rate: 0.00 },
        { limit: 247050, rate: 0.0195 },
        { limit: Infinity, rate: 0.025 },
      ],
    },
    description: "Generous 0% bottom tier and top rate of only 2.5%.",
    rankByPopulation: 47,
  },
  {
    name: "Ohio",
    slug: "ohio",
    abbrev: "OH",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "3.5%",
    topRatePercent: 3.5,
    standardDeduction: { single: 2400, married_joint: 4800, head_of_household: 2400 },
    brackets: {
      single: [
        { limit: 26050, rate: 0.00 },
        { limit: 100000, rate: 0.0275 },
        { limit: Infinity, rate: 0.035 },
      ],
      married_joint: [
        { limit: 26050, rate: 0.00 },
        { limit: 100000, rate: 0.0275 },
        { limit: Infinity, rate: 0.035 },
      ],
      head_of_household: [
        { limit: 26050, rate: 0.00 },
        { limit: 100000, rate: 0.0275 },
        { limit: Infinity, rate: 0.035 },
      ],
    },
    localTaxNote: "Ohio cities and school districts frequently charge 1.5% to 2.5% local income tax.",
    description: "Simplified two-bracket tax system with 0% under $26k and 3.5% top rate.",
    rankByPopulation: 7,
    popular: true,
  },
  {
    name: "Oklahoma",
    slug: "oklahoma",
    abbrev: "OK",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "4.75%",
    topRatePercent: 4.75,
    standardDeduction: { single: 6350, married_joint: 12700, head_of_household: 9350 },
    brackets: {
      single: [
        { limit: 1000, rate: 0.0025 },
        { limit: 2500, rate: 0.0075 },
        { limit: 3750, rate: 0.0175 },
        { limit: 4900, rate: 0.0275 },
        { limit: 7200, rate: 0.0375 },
        { limit: Infinity, rate: 0.0475 },
      ],
      married_joint: [
        { limit: 2000, rate: 0.0025 },
        { limit: 5000, rate: 0.0075 },
        { limit: 7500, rate: 0.0175 },
        { limit: 9800, rate: 0.0275 },
        { limit: 12200, rate: 0.0375 },
        { limit: Infinity, rate: 0.0475 },
      ],
      head_of_household: [
        { limit: 1000, rate: 0.0025 },
        { limit: 2500, rate: 0.0075 },
        { limit: 3750, rate: 0.0175 },
        { limit: 4900, rate: 0.0275 },
        { limit: 7200, rate: 0.0375 },
        { limit: Infinity, rate: 0.0475 },
      ],
    },
    description: "Six progressive brackets from 0.25% to 4.75%.",
    rankByPopulation: 28,
  },
  {
    name: "Oregon",
    slug: "oregon",
    abbrev: "OR",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "9.9%",
    topRatePercent: 9.9,
    standardDeduction: { single: 2745, married_joint: 5495, head_of_household: 4420 },
    brackets: {
      single: [
        { limit: 4300, rate: 0.0475 },
        { limit: 10750, rate: 0.0675 },
        { limit: 125000, rate: 0.0875 },
        { limit: Infinity, rate: 0.099 },
      ],
      married_joint: [
        { limit: 8600, rate: 0.0475 },
        { limit: 21500, rate: 0.0675 },
        { limit: 250000, rate: 0.0875 },
        { limit: Infinity, rate: 0.099 },
      ],
      head_of_household: [
        { limit: 6900, rate: 0.0475 },
        { limit: 17200, rate: 0.0675 },
        { limit: 200000, rate: 0.0875 },
        { limit: Infinity, rate: 0.099 },
      ],
    },
    description: "Progressive rates from 4.75% to 9.9% (no state sales tax).",
    rankByPopulation: 27,
  },
  {
    name: "Pennsylvania",
    slug: "pennsylvania",
    abbrev: "PA",
    hasIncomeTax: true,
    taxType: "flat",
    topRateText: "3.07%",
    topRatePercent: 3.07,
    standardDeduction: { single: 0, married_joint: 0, head_of_household: 0 },
    brackets: flatBrackets(0.0307),
    localTaxNote: "Local Earned Income Tax (EIT) of 1% to 3.75% (e.g. Philadelphia).",
    description: "Flat 3.07% rate on gross compensation with no standard deduction.",
    rankByPopulation: 5,
    popular: true,
  },
  {
    name: "Rhode Island",
    slug: "rhode-island",
    abbrev: "RI",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "5.99%",
    topRatePercent: 5.99,
    standardDeduction: { single: 10300, married_joint: 20600, head_of_household: 15450 },
    brackets: {
      single: [
        { limit: 77450, rate: 0.0375 },
        { limit: 176050, rate: 0.0475 },
        { limit: Infinity, rate: 0.0599 },
      ],
      married_joint: [
        { limit: 77450, rate: 0.0375 },
        { limit: 176050, rate: 0.0475 },
        { limit: Infinity, rate: 0.0599 },
      ],
      head_of_household: [
        { limit: 77450, rate: 0.0375 },
        { limit: 176050, rate: 0.0475 },
        { limit: Infinity, rate: 0.0599 },
      ],
    },
    description: "Three progressive tax tiers from 3.75% to 5.99%.",
    rankByPopulation: 43,
  },
  {
    name: "South Carolina",
    slug: "south-carolina",
    abbrev: "SC",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "6.2%",
    topRatePercent: 6.2,
    standardDeduction: { single: 15000, married_joint: 30000, head_of_household: 22500 },
    brackets: {
      single: [
        { limit: 3460, rate: 0.00 },
        { limit: 17330, rate: 0.03 },
        { limit: Infinity, rate: 0.062 },
      ],
      married_joint: [
        { limit: 3460, rate: 0.00 },
        { limit: 17330, rate: 0.03 },
        { limit: Infinity, rate: 0.062 },
      ],
      head_of_household: [
        { limit: 3460, rate: 0.00 },
        { limit: 17330, rate: 0.03 },
        { limit: Infinity, rate: 0.062 },
      ],
    },
    description: "Simplified three-tier system with 0%, 3%, and 6.2% brackets.",
    rankByPopulation: 23,
  },
  {
    name: "South Dakota",
    slug: "south-dakota",
    abbrev: "SD",
    hasIncomeTax: false,
    taxType: "none",
    topRateText: "0.0%",
    topRatePercent: 0.0,
    standardDeduction: { single: 0, married_joint: 0, head_of_household: 0 },
    brackets: zeroBrackets(),
    description: "No state individual income tax on wages or salary.",
    rankByPopulation: 46,
  },
  {
    name: "Tennessee",
    slug: "tennessee",
    abbrev: "TN",
    hasIncomeTax: false,
    taxType: "none",
    topRateText: "0.0%",
    topRatePercent: 0.0,
    standardDeduction: { single: 0, married_joint: 0, head_of_household: 0 },
    brackets: zeroBrackets(),
    description: "No state personal income tax on earned wages or salaries.",
    rankByPopulation: 16,
    popular: true,
  },
  {
    name: "Texas",
    slug: "texas",
    abbrev: "TX",
    hasIncomeTax: false,
    taxType: "none",
    topRateText: "0.0%",
    topRatePercent: 0.0,
    standardDeduction: { single: 0, married_joint: 0, head_of_household: 0 },
    brackets: zeroBrackets(),
    description: "No state personal income tax on employee wages or salaries.",
    rankByPopulation: 2,
    popular: true,
  },
  {
    name: "Utah",
    slug: "utah",
    abbrev: "UT",
    hasIncomeTax: true,
    taxType: "flat",
    topRateText: "4.65%",
    topRatePercent: 4.65,
    standardDeduction: { single: 0, married_joint: 0, head_of_household: 0 },
    brackets: flatBrackets(0.0465),
    description: "Flat 4.65% state income tax with taxpayer tax credits.",
    rankByPopulation: 30,
  },
  {
    name: "Vermont",
    slug: "vermont",
    abbrev: "VT",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "8.75%",
    topRatePercent: 8.75,
    standardDeduction: { single: 7350, married_joint: 14700, head_of_household: 11050 },
    brackets: {
      single: [
        { limit: 45400, rate: 0.0335 },
        { limit: 110050, rate: 0.066 },
        { limit: 229550, rate: 0.076 },
        { limit: Infinity, rate: 0.0875 },
      ],
      married_joint: [
        { limit: 75850, rate: 0.0335 },
        { limit: 183200, rate: 0.066 },
        { limit: 279300, rate: 0.076 },
        { limit: Infinity, rate: 0.0875 },
      ],
      head_of_household: [
        { limit: 60800, rate: 0.0335 },
        { limit: 156950, rate: 0.066 },
        { limit: 254450, rate: 0.076 },
        { limit: Infinity, rate: 0.0875 },
      ],
    },
    description: "Four progressive brackets ranging from 3.35% to 8.75%.",
    rankByPopulation: 49,
  },
  {
    name: "Virginia",
    slug: "virginia",
    abbrev: "VA",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "5.75%",
    topRatePercent: 5.75,
    standardDeduction: { single: 8500, married_joint: 17000, head_of_household: 8500 },
    brackets: {
      single: [
        { limit: 3000, rate: 0.02 },
        { limit: 5000, rate: 0.03 },
        { limit: 17000, rate: 0.05 },
        { limit: Infinity, rate: 0.0575 },
      ],
      married_joint: [
        { limit: 3000, rate: 0.02 },
        { limit: 5000, rate: 0.03 },
        { limit: 17000, rate: 0.05 },
        { limit: Infinity, rate: 0.0575 },
      ],
      head_of_household: [
        { limit: 3000, rate: 0.02 },
        { limit: 5000, rate: 0.03 },
        { limit: 17000, rate: 0.05 },
        { limit: Infinity, rate: 0.0575 },
      ],
    },
    description: "Four progressive tax brackets with a 5.75% top rate over $17k.",
    rankByPopulation: 12,
    popular: true,
  },
  {
    name: "Washington",
    slug: "washington",
    abbrev: "WA",
    hasIncomeTax: false,
    taxType: "none",
    topRateText: "0.0%",
    topRatePercent: 0.0,
    standardDeduction: { single: 0, married_joint: 0, head_of_household: 0 },
    brackets: zeroBrackets(),
    description: "No state individual income tax on employee paychecks.",
    rankByPopulation: 13,
    popular: true,
  },
  {
    name: "West Virginia",
    slug: "west-virginia",
    abbrev: "WV",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "5.12%",
    topRatePercent: 5.12,
    standardDeduction: { single: 0, married_joint: 0, head_of_household: 0 },
    brackets: {
      single: [
        { limit: 10000, rate: 0.0236 },
        { limit: 25000, rate: 0.0315 },
        { limit: 40000, rate: 0.0354 },
        { limit: 60000, rate: 0.0472 },
        { limit: Infinity, rate: 0.0512 },
      ],
      married_joint: [
        { limit: 10000, rate: 0.0236 },
        { limit: 25000, rate: 0.0315 },
        { limit: 40000, rate: 0.0354 },
        { limit: 60000, rate: 0.0472 },
        { limit: Infinity, rate: 0.0512 },
      ],
      head_of_household: [
        { limit: 10000, rate: 0.0236 },
        { limit: 25000, rate: 0.0315 },
        { limit: 40000, rate: 0.0354 },
        { limit: 60000, rate: 0.0472 },
        { limit: Infinity, rate: 0.0512 },
      ],
    },
    description: "Five progressive brackets with recently enacted tax cuts.",
    rankByPopulation: 39,
  },
  {
    name: "Wisconsin",
    slug: "wisconsin",
    abbrev: "WI",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "7.65%",
    topRatePercent: 7.65,
    standardDeduction: { single: 13810, married_joint: 25520, head_of_household: 17790 },
    brackets: {
      single: [
        { limit: 14320, rate: 0.035 },
        { limit: 28640, rate: 0.044 },
        { limit: 315310, rate: 0.053 },
        { limit: Infinity, rate: 0.0765 },
      ],
      married_joint: [
        { limit: 19090, rate: 0.035 },
        { limit: 38190, rate: 0.044 },
        { limit: 420420, rate: 0.053 },
        { limit: Infinity, rate: 0.0765 },
      ],
      head_of_household: [
        { limit: 14320, rate: 0.035 },
        { limit: 28640, rate: 0.044 },
        { limit: 315310, rate: 0.053 },
        { limit: Infinity, rate: 0.0765 },
      ],
    },
    description: "Four progressive tax tiers with standard sliding-scale deduction.",
    rankByPopulation: 20,
  },
  {
    name: "Wyoming",
    slug: "wyoming",
    abbrev: "WY",
    hasIncomeTax: false,
    taxType: "none",
    topRateText: "0.0%",
    topRatePercent: 0.0,
    standardDeduction: { single: 0, married_joint: 0, head_of_household: 0 },
    brackets: zeroBrackets(),
    description: "No state individual income tax on wages or salary.",
    rankByPopulation: 50,
  },
  {
    name: "District of Columbia",
    slug: "district-of-columbia",
    abbrev: "DC",
    hasIncomeTax: true,
    taxType: "graduated",
    topRateText: "10.75%",
    topRatePercent: 10.75,
    standardDeduction: { single: 15000, married_joint: 30000, head_of_household: 22500 },
    brackets: {
      single: [
        { limit: 10000, rate: 0.04 },
        { limit: 40000, rate: 0.06 },
        { limit: 60000, rate: 0.065 },
        { limit: 250000, rate: 0.085 },
        { limit: 500000, rate: 0.0925 },
        { limit: 1000000, rate: 0.0975 },
        { limit: Infinity, rate: 0.1075 },
      ],
      married_joint: [
        { limit: 10000, rate: 0.04 },
        { limit: 40000, rate: 0.06 },
        { limit: 60000, rate: 0.065 },
        { limit: 250000, rate: 0.085 },
        { limit: 500000, rate: 0.0925 },
        { limit: 1000000, rate: 0.0975 },
        { limit: Infinity, rate: 0.1075 },
      ],
      head_of_household: [
        { limit: 10000, rate: 0.04 },
        { limit: 40000, rate: 0.06 },
        { limit: 60000, rate: 0.065 },
        { limit: 250000, rate: 0.085 },
        { limit: 500000, rate: 0.0925 },
        { limit: 1000000, rate: 0.0975 },
        { limit: Infinity, rate: 0.1075 },
      ],
    },
    description: "Progressive District rates from 4.0% up to 10.75% for millionaires.",
    rankByPopulation: 51,
  },
];

export function getStateTaxData(slug: string): StateTaxData | undefined {
  return STATES_TAX_DATA.find((s) => s.slug === slug.toLowerCase());
}

/**
 * Main Paycheck Calculator Engine
 */
export function calculatePaycheck(input: PaycheckInput, state: StateTaxData): PaycheckResult {
  const rawWage = Math.max(0, input.wage || 0);
  const hoursPerWeek = Math.max(1, input.hoursPerWeek || 40);

  // 1. Annual Gross Income
  let grossAnnual = 0;
  if (input.wageType === "hourly") {
    grossAnnual = rawWage * hoursPerWeek * 52;
  } else {
    grossAnnual = rawWage;
  }

  // 2. Pre-Tax Deductions
  const k401Pct = Math.max(0, Math.min(60, input.k401Percent || 0));
  const healthMonthly = Math.max(0, input.monthlyHealthInsurance || 0);

  const annual401k = grossAnnual * (k401Pct / 100);
  const annualHealth = healthMonthly * 12;
  const annualPreTaxDeductions = annual401k + annualHealth;

  // AGI for federal & state
  const adjustedGrossIncome = Math.max(0, grossAnnual - annualPreTaxDeductions);

  // 3. Federal Tax
  const fedStd = FEDERAL_2026.STANDARD_DEDUCTION[input.filingStatus] || 15000;
  const fedTaxable = Math.max(0, adjustedGrossIncome - fedStd);
  const annualFederalTax = calculateProgressiveTax(fedTaxable, FEDERAL_2026.BRACKETS[input.filingStatus]);

  // 4. State Tax
  let annualStateTax = 0;
  if (state.hasIncomeTax && state.brackets) {
    const stateStd = state.standardDeduction[input.filingStatus] || 0;
    const stateTaxable = Math.max(0, adjustedGrossIncome - stateStd);
    const stateBrackets = state.brackets[input.filingStatus] || state.brackets.single;
    annualStateTax = calculateProgressiveTax(stateTaxable, stateBrackets);
  }

  // 5. FICA (Social Security & Medicare)
  // Health insurance is Sec 125 exempt from FICA; 401k is subject to FICA.
  const ficaWageBase = Math.max(0, grossAnnual - annualHealth);
  const ssSubjectWages = Math.min(ficaWageBase, FEDERAL_2026.SS_WAGE_BASE);
  const annualSocialSecurity = ssSubjectWages * FEDERAL_2026.SS_RATE;

  const baseMedicare = ficaWageBase * FEDERAL_2026.MEDICARE_RATE;
  const addMedicareThresh = FEDERAL_2026.ADD_MEDICARE_THRESHOLD[input.filingStatus] || 200000;
  const addMedicare = Math.max(0, ficaWageBase - addMedicareThresh) * FEDERAL_2026.ADD_MEDICARE_RATE;
  const annualMedicare = baseMedicare + addMedicare;
  const annualTotalFica = annualSocialSecurity + annualMedicare;

  // Totals
  const annualTotalTaxes = annualFederalTax + annualStateTax + annualTotalFica;
  const annualNetPay = Math.max(0, grossAnnual - annualTotalTaxes - annualPreTaxDeductions);

  // Effective Rates
  const safeGross = grossAnnual > 0 ? grossAnnual : 1;
  const effectiveFederalRate = (annualFederalTax / safeGross) * 100;
  const effectiveStateRate = (annualStateTax / safeGross) * 100;
  const effectiveFicaRate = (annualTotalFica / safeGross) * 100;
  const effectiveTotalTaxRate = (annualTotalTaxes / safeGross) * 100;
  const takeHomePercentage = (annualNetPay / safeGross) * 100;

  // Period Breakdowns
  const buildPeriod = (div: number): PeriodBreakdown => ({
    gross: grossAnnual / div,
    federalTax: annualFederalTax / div,
    stateTax: annualStateTax / div,
    socialSecurity: annualSocialSecurity / div,
    medicare: annualMedicare / div,
    totalFica: annualTotalFica / div,
    totalTaxes: annualTotalTaxes / div,
    preTaxDeductions: annualPreTaxDeductions / div,
    netPay: annualNetPay / div,
  });

  const periods: Record<"annual" | "monthly" | "semimonthly" | "biweekly" | "weekly", PeriodBreakdown> = {
    annual: buildPeriod(1),
    monthly: buildPeriod(12),
    semimonthly: buildPeriod(24),
    biweekly: buildPeriod(26),
    weekly: buildPeriod(52),
  };

  const selectedPeriod: PeriodBreakdown =
    input.payFrequency === "hourly"
      ? {
          gross: grossAnnual / 2080,
          federalTax: annualFederalTax / 2080,
          stateTax: annualStateTax / 2080,
          socialSecurity: annualSocialSecurity / 2080,
          medicare: annualMedicare / 2080,
          totalFica: annualTotalFica / 2080,
          totalTaxes: annualTotalTaxes / 2080,
          preTaxDeductions: annualPreTaxDeductions / 2080,
          netPay: annualNetPay / 2080,
        }
      : periods[input.payFrequency as "annual" | "monthly" | "semimonthly" | "biweekly" | "weekly"] || periods.biweekly;

  return {
    state,
    grossAnnual: Math.round(grossAnnual),
    taxableWages: Math.round(adjustedGrossIncome),
    annualFederalTax: Math.round(annualFederalTax),
    annualStateTax: Math.round(annualStateTax),
    annualSocialSecurity: Math.round(annualSocialSecurity),
    annualMedicare: Math.round(annualMedicare),
    annualTotalFica: Math.round(annualTotalFica),
    annualTotalTaxes: Math.round(annualTotalTaxes),
    annualPreTaxDeductions: Math.round(annualPreTaxDeductions),
    annualNetPay: Math.round(annualNetPay),
    effectiveFederalRate,
    effectiveStateRate,
    effectiveFicaRate,
    effectiveTotalTaxRate,
    takeHomePercentage,
    selectedPeriod,
    periods,
  };
}
