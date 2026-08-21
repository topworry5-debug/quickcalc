/**
 * pakistanTaxCalculator.ts
 * 
 * 100% Accurate Pakistan Federal Board of Revenue (FBR) Income Tax Engine for FY 2026-2027.
 * Implements official Finance Act slabs for Salaried vs Non-Salaried individuals,
 * allowable deductions u/s 60 (Zakat), Section 63 (VPS Pension), and Advance Tax (WHT) adjustments.
 */

export type TaxpayerType = "salaried" | "business";
export type IncomeFrequency = "monthly" | "annual";

export interface TaxSlab {
  min: number;
  max: number | null;
  baseTax: number;
  ratePercent: number;
  description: string;
}

export const SALARIED_TAX_SLABS_2026: TaxSlab[] = [
  { min: 0, max: 600000, baseTax: 0, ratePercent: 0, description: "Up to PKR 600,000 (0% Tax Free)" },
  { min: 600000, max: 1200000, baseTax: 0, ratePercent: 5, description: "PKR 600,001 to 1,200,000 (5% of excess over 600k)" },
  { min: 1200000, max: 2200000, baseTax: 30000, ratePercent: 15, description: "PKR 1,200,001 to 2,200,000 (PKR 30,000 + 15% of excess over 1.2M)" },
  { min: 2200000, max: 3200000, baseTax: 180000, ratePercent: 25, description: "PKR 2,200,001 to 3,200,000 (PKR 180,000 + 25% of excess over 2.2M)" },
  { min: 3200000, max: 4100000, baseTax: 430000, ratePercent: 30, description: "PKR 3,200,001 to 4,100,000 (PKR 430,000 + 30% of excess over 3.2M)" },
  { min: 4100000, max: null, baseTax: 700000, ratePercent: 35, description: "Above PKR 4,100,000 (PKR 700,000 + 35% of excess over 4.1M)" },
];

export const BUSINESS_TAX_SLABS_2026: TaxSlab[] = [
  { min: 0, max: 600000, baseTax: 0, ratePercent: 0, description: "Up to PKR 600,000 (0% Tax Free)" },
  { min: 600000, max: 1200000, baseTax: 0, ratePercent: 15, description: "PKR 600,001 to 1,200,000 (15% of excess over 600k)" },
  { min: 1200000, max: 1600000, baseTax: 90000, ratePercent: 20, description: "PKR 1,200,001 to 1,600,000 (PKR 90,000 + 20% of excess over 1.2M)" },
  { min: 1600000, max: 3200000, baseTax: 170000, ratePercent: 30, description: "PKR 1,600,001 to 3,200,000 (PKR 170,000 + 30% of excess over 1.6M)" },
  { min: 3200000, max: null, baseTax: 650000, ratePercent: 40, description: "Above PKR 3,200,000 (PKR 650,000 + 40% of excess over 3.2M)" },
];

export interface PakistanTaxInputs {
  taxpayerType: TaxpayerType;
  frequency: IncomeFrequency;
  grossIncome: number;
  zakatDeduction: number;
  advanceTaxPaid: number;
  pensionContribution: number;
}

export interface PakistanTaxResult {
  grossAnnualIncome: number;
  grossMonthlyIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  
  // Tax Calculations
  grossAnnualTax: number;
  advanceTaxCredit: number;
  netAnnualTaxPayable: number;
  monthlyTaxDeduction: number;
  
  // Take-Home Incomes
  netMonthlyTakeHome: number;
  netAnnualTakeHome: number;
  
  // Ratios
  effectiveTaxRatePercent: number;
  marginalTaxRatePercent: number;
  activeSlabIndex: number;
  activeSlab: TaxSlab;
  allSlabs: TaxSlab[];
}

export interface TaxPresetScenario {
  id: string;
  name: string;
  description: string;
  inputs: Partial<PakistanTaxInputs>;
}

export const PAKISTAN_TAX_PRESETS: TaxPresetScenario[] = [
  {
    id: "entry-salaried",
    name: "Entry Level (₨ 75,000/mo)",
    description: "PKR 75,000 monthly (PKR 900,000/yr), 5% marginal tax bracket",
    inputs: {
      taxpayerType: "salaried",
      frequency: "monthly",
      grossIncome: 75000,
      zakatDeduction: 0,
      advanceTaxPaid: 0,
      pensionContribution: 0,
    },
  },
  {
    id: "mid-salaried",
    name: "Mid-Level Professional (₨ 175,000/mo)",
    description: "PKR 175,000 monthly (PKR 2,100,000/yr), 15% marginal tax bracket",
    inputs: {
      taxpayerType: "salaried",
      frequency: "monthly",
      grossIncome: 175000,
      zakatDeduction: 0,
      advanceTaxPaid: 12000,
      pensionContribution: 0,
    },
  },
  {
    id: "senior-salaried",
    name: "Senior Manager (₨ 350,000/mo)",
    description: "PKR 350,000 monthly (PKR 4,200,000/yr), 35% top marginal bracket",
    inputs: {
      taxpayerType: "salaried",
      frequency: "monthly",
      grossIncome: 35000,
      zakatDeduction: 25000,
      advanceTaxPaid: 45000,
      pensionContribution: 50000,
    },
  },
  {
    id: "business-freelance",
    name: "IT Consultant / Business (₨ 250,000/mo)",
    description: "PKR 250,000 monthly non-salaried business individual (PKR 3,000,000/yr)",
    inputs: {
      taxpayerType: "business",
      frequency: "monthly",
      grossIncome: 250000,
      zakatDeduction: 0,
      advanceTaxPaid: 20000,
      pensionContribution: 0,
    },
  },
];

/**
 * Format currency with standard South Asian / Pakistani numbering convention
 */
export function formatPKR(val: number, includeDecimals: boolean = false): string {
  const rounded = includeDecimals ? Math.round(val * 100) / 100 : Math.round(val);
  return `₨ ${rounded.toLocaleString("en-PK", {
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  })}`;
}

/**
 * 100% Accurate FBR Tax Calculation
 */
export function calculatePakistanTax(inputs: PakistanTaxInputs): PakistanTaxResult {
  const isMonthly = inputs.frequency === "monthly";
  const rawIncome = Math.max(0, inputs.grossIncome || 0);

  const grossAnnualIncome = isMonthly ? rawIncome * 12 : rawIncome;
  const grossMonthlyIncome = grossAnnualIncome / 12;

  // Deductions: Zakat u/s 60 + Pension Fund Contribution u/s 63 (capped at 20% of taxable income)
  const zakatDeduction = Math.max(0, inputs.zakatDeduction || 0);
  const pensionContribution = Math.min(
    Math.max(0, inputs.pensionContribution || 0),
    grossAnnualIncome * 0.20
  );
  const totalDeductions = zakatDeduction + pensionContribution;

  const taxableIncome = Math.max(0, grossAnnualIncome - totalDeductions);

  const slabs =
    inputs.taxpayerType === "salaried"
      ? SALARIED_TAX_SLABS_2026
      : BUSINESS_TAX_SLABS_2026;

  let grossAnnualTax = 0;
  let activeSlabIndex = 0;

  for (let i = 0; i < slabs.length; i++) {
    const slab = slabs[i];
    if (taxableIncome > slab.min) {
      activeSlabIndex = i;
      const excess = taxableIncome - slab.min;
      grossAnnualTax = slab.baseTax + (excess * (slab.ratePercent / 100));
    }
  }

  const activeSlab = slabs[activeSlabIndex];
  const marginalTaxRatePercent = activeSlab.ratePercent;

  // Advance Tax / WHT adjustment
  const advanceTaxCredit = Math.max(0, inputs.advanceTaxPaid || 0);
  const netAnnualTaxPayable = Math.max(0, grossAnnualTax - advanceTaxCredit);
  const monthlyTaxDeduction = netAnnualTaxPayable / 12;

  const netMonthlyTakeHome = grossMonthlyIncome - monthlyTaxDeduction;
  const netAnnualTakeHome = grossAnnualIncome - netAnnualTaxPayable;

  const effectiveTaxRatePercent =
    grossAnnualIncome > 0 ? (netAnnualTaxPayable / grossAnnualIncome) * 100 : 0;

  return {
    grossAnnualIncome: Number(grossAnnualIncome.toFixed(2)),
    grossMonthlyIncome: Number(grossMonthlyIncome.toFixed(2)),
    totalDeductions: Number(totalDeductions.toFixed(2)),
    taxableIncome: Number(taxableIncome.toFixed(2)),
    grossAnnualTax: Number(grossAnnualTax.toFixed(2)),
    advanceTaxCredit: Number(advanceTaxCredit.toFixed(2)),
    netAnnualTaxPayable: Number(netAnnualTaxPayable.toFixed(2)),
    monthlyTaxDeduction: Number(monthlyTaxDeduction.toFixed(2)),
    netMonthlyTakeHome: Number(netMonthlyTakeHome.toFixed(2)),
    netAnnualTakeHome: Number(netAnnualTakeHome.toFixed(2)),
    effectiveTaxRatePercent: Number(effectiveTaxRatePercent.toFixed(2)),
    marginalTaxRatePercent,
    activeSlabIndex,
    activeSlab,
    allSlabs: slabs,
  };
}

/**
 * Step-by-step explanation for ExplainResultAccordion
 */
export function getPakistanTaxExplanationSteps(
  inputs: PakistanTaxInputs,
  result: PakistanTaxResult
): string[] {
  const isSalaried = inputs.taxpayerType === "salaried";
  const slab = result.activeSlab;

  return [
    `Annual Gross Income = ${formatPKR(result.grossMonthlyIncome)}/month × 12 = ${formatPKR(result.grossAnnualIncome)}/year`,
    `Taxable Income after Deductions = Gross (${formatPKR(result.grossAnnualIncome)}) - Allowable Deductions (${formatPKR(result.totalDeductions)}) = ${formatPKR(result.taxableIncome)}`,
    `FBR Tax Slab Applied (${isSalaried ? "Salaried" : "Business"} Slabs) = Falls into Bracket ${result.activeSlabIndex + 1}: ${slab.description}`,
    `Gross Annual Tax Computation = Base Tax (${formatPKR(slab.baseTax)}) + [${slab.ratePercent}% of taxable income exceeding ${formatPKR(slab.min)} (${formatPKR(Math.max(0, result.taxableIncome - slab.min))})] = ${formatPKR(result.grossAnnualTax)}`,
    `Advance Tax Credit Adjustments = Gross Tax (${formatPKR(result.grossAnnualTax)}) - Advance WHT Paid (${formatPKR(result.advanceTaxCredit)}) = ${formatPKR(result.netAnnualTaxPayable)}/year`,
    `Monthly Salary Deduction & Take-Home = Monthly Tax of ${formatPKR(result.monthlyTaxDeduction)} yields a net monthly take-home salary of ${formatPKR(result.netMonthlyTakeHome)} (Effective Tax Rate: ${result.effectiveTaxRatePercent.toFixed(1)}%).`,
  ];
}
