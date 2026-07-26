/**
 * Salary Take-Home Pay Calculator Logic
 * Includes simplified tax bracket calculations for United States, Canada, and Pakistan.
 * Brackets and rates are commented and can be updated for future tax years.
 */

export interface SalaryCalculatorInput {
  grossSalary: number; // can be annual or monthly based on salaryType
  salaryType: "annual" | "monthly";
  payFrequency: "annually" | "monthly" | "biweekly" | "weekly";
}

export interface DeductionBreakdown {
  name: string;
  amount: number;
}

export interface SalaryCalculatorResult {
  grossSalaryAnnual: number;
  grossSalarySelected: number;
  netPayAnnual: number;
  netPaySelected: number;
  totalDeductionsAnnual: number;
  totalDeductionsSelected: number;
  deductionsBreakdownAnnual: DeductionBreakdown[];
  deductionsBreakdownSelected: DeductionBreakdown[];
  takeHomePercentage: number;
  taxPercentage: number;
  deductionsPercentage: number;
}

// ==========================================
// US TAX CONFIGURATION (2025/2026 ESTIMATES)
// ==========================================
export const US_TAX_CONFIG = {
  STANDARD_DEDUCTION: 15000, // Standard deduction for Single filers
  SOCIAL_SECURITY_RATE: 0.062, // 6.2%
  SOCIAL_SECURITY_WAGE_BASE: 176100, // Maximum taxable wage base for Social Security
  MEDICARE_RATE: 0.0145, // 1.45% (simplified, no additional high-income medicare surcharges)
  FEDERAL_BRACKETS: [
    { limit: 11925, rate: 0.10 },
    { limit: 48475, rate: 0.12 },
    { limit: 103350, rate: 0.22 },
    { limit: 197300, rate: 0.24 },
    { limit: 250525, rate: 0.32 },
    { limit: 626350, rate: 0.35 },
    { limit: Infinity, rate: 0.37 },
  ]
};

// ==========================================
// CANADA TAX CONFIGURATION (2025 ESTIMATES)
// ==========================================
export const CANADA_TAX_CONFIG = {
  BASIC_PERSONAL_AMOUNT: 15705, // Federal basic personal amount
  CPP_RATE: 0.0595, // 5.95%
  CPP_EXEMPTION: 3500, // First $3,500 exempt
  CPP_MAX_CONTRIBUTION: 3867.50, // Maximum annual contribution
  EI_RATE: 0.0166, // 1.66%
  EI_MAX_PREMIUM: 1052.44, // Maximum annual premium
  PROVINCIAL_AVG_RATE: 0.10, // Simplified flat average provincial tax rate (10%)
  FEDERAL_BRACKETS: [
    { limit: 57375, rate: 0.15 },
    { limit: 114750, rate: 0.205 },
    { limit: 177882, rate: 0.26 },
    { limit: 246752, rate: 0.29 },
    { limit: Infinity, rate: 0.33 }
  ]
};

// ==========================================
// PAKISTAN TAX CONFIGURATION (FBR 2024/2025 SALARIED SLABS)
// ==========================================
export const PAKISTAN_TAX_CONFIG = {
  SLABS: [
    { limit: 600000, baseTax: 0, rate: 0 },
    { limit: 1200000, baseTax: 0, rate: 0.05 },
    { limit: 2200000, baseTax: 30000, rate: 0.15 },
    { limit: 3200000, baseTax: 180000, rate: 0.25 },
    { limit: 4100000, baseTax: 430000, rate: 0.30 },
    { limit: Infinity, baseTax: 700000, rate: 0.35 }
  ]
};

/**
 * Calculates progressive tax for a set of brackets
 */
function calculateProgressiveTax(taxableIncome: number, brackets: { limit: number; rate: number }[]): number {
  if (taxableIncome <= 0) return 0;
  
  let tax = 0;
  let previousLimit = 0;
  
  for (const bracket of brackets) {
    if (taxableIncome > previousLimit) {
      const taxableInThisBracket = Math.min(taxableIncome - previousLimit, bracket.limit - previousLimit);
      tax += taxableInThisBracket * bracket.rate;
      previousLimit = bracket.limit;
    } else {
      break;
    }
  }
  
  return tax;
}

/**
 * Calculate USA Salary Take-Home
 */
function calculateUSSalary(annualGross: number): DeductionBreakdown[] {
  // Social security deduction
  const socialSecurity = Math.min(annualGross * US_TAX_CONFIG.SOCIAL_SECURITY_RATE, US_TAX_CONFIG.SOCIAL_SECURITY_WAGE_BASE * US_TAX_CONFIG.SOCIAL_SECURITY_RATE);
  
  // Medicare deduction
  const medicare = annualGross * US_TAX_CONFIG.MEDICARE_RATE;
  
  // Federal Income Tax on taxable income
  const taxableIncome = Math.max(0, annualGross - US_TAX_CONFIG.STANDARD_DEDUCTION);
  const federalTax = calculateProgressiveTax(taxableIncome, US_TAX_CONFIG.FEDERAL_BRACKETS);
  
  return [
    { name: "Federal Income Tax", amount: Math.round(federalTax * 100) / 100 },
    { name: "Social Security (FICA)", amount: Math.round(socialSecurity * 100) / 100 },
    { name: "Medicare", amount: Math.round(medicare * 100) / 100 }
  ];
}

/**
 * Calculate Canada Salary Take-Home
 */
function calculateCanadaSalary(annualGross: number): DeductionBreakdown[] {
  // CPP contribution
  const cppBase = Math.max(0, annualGross - CANADA_TAX_CONFIG.CPP_EXEMPTION);
  const cpp = Math.min(cppBase * CANADA_TAX_CONFIG.CPP_RATE, CANADA_TAX_CONFIG.CPP_MAX_CONTRIBUTION);
  
  // EI premium
  const ei = Math.min(annualGross * CANADA_TAX_CONFIG.EI_RATE, CANADA_TAX_CONFIG.EI_MAX_PREMIUM);
  
  // Federal Tax
  const taxableIncome = Math.max(0, annualGross - CANADA_TAX_CONFIG.BASIC_PERSONAL_AMOUNT);
  const federalTax = calculateProgressiveTax(taxableIncome, CANADA_TAX_CONFIG.FEDERAL_BRACKETS);
  
  // Simplified Average Provincial Tax
  const provincialTax = taxableIncome * CANADA_TAX_CONFIG.PROVINCIAL_AVG_RATE;
  
  return [
    { name: "Federal Income Tax", amount: Math.round(federalTax * 100) / 100 },
    { name: "Provincial Tax (Simplified Avg)", amount: Math.round(provincialTax * 100) / 100 },
    { name: "CPP Contribution", amount: Math.round(cpp * 100) / 100 },
    { name: "EI Premium", amount: Math.round(ei * 100) / 100 }
  ];
}

/**
 * Calculate Pakistan Salary Take-Home
 */
function calculatePakistanSalary(annualGross: number): DeductionBreakdown[] {
  // Pakistan salaried slabs
  let tax = 0;
  const slabs = PAKISTAN_TAX_CONFIG.SLABS;
  
  // Locate slab
  let slabIndex = -1;
  for (let i = 0; i < slabs.length; i++) {
    const prevLimit = i === 0 ? 0 : slabs[i - 1].limit;
    if (annualGross > prevLimit && annualGross <= slabs[i].limit) {
      slabIndex = i;
      break;
    }
  }
  if (slabIndex === -1) {
    slabIndex = slabs.length - 1; // last slab
  }
  
  const slab = slabs[slabIndex];
  const prevLimit = slabIndex === 0 ? 0 : slabs[slabIndex - 1].limit;
  
  if (annualGross > prevLimit) {
    tax = slab.baseTax + (annualGross - prevLimit) * slab.rate;
  }
  
  return [
    { name: "Income Tax (FBR)", amount: Math.round(tax * 100) / 100 }
  ];
}

/**
 * Run Salary Take-Home Pay calculations
 */
export function calculateSalary(
  input: SalaryCalculatorInput,
  country: "US" | "Canada" | "Pakistan"
): SalaryCalculatorResult {
  const { grossSalary, salaryType, payFrequency } = input;
  
  // Convert input gross to annual gross
  const annualGross = salaryType === "annual" ? grossSalary : grossSalary * 12;
  
  // Calculate annual deductions
  let deductionsBreakdownAnnual: DeductionBreakdown[] = [];
  if (annualGross > 0) {
    if (country === "US") {
      deductionsBreakdownAnnual = calculateUSSalary(annualGross);
    } else if (country === "Canada") {
      deductionsBreakdownAnnual = calculateCanadaSalary(annualGross);
    } else if (country === "Pakistan") {
      deductionsBreakdownAnnual = calculatePakistanSalary(annualGross);
    }
  } else {
    // If salary is 0 or negative
    deductionsBreakdownAnnual = [];
  }
  
  const totalDeductionsAnnual = deductionsBreakdownAnnual.reduce((sum, d) => sum + d.amount, 0);
  const netPayAnnual = Math.max(0, annualGross - totalDeductionsAnnual);
  
  // Frequency conversion helper
  const getFrequencyDivisor = (freq: "annually" | "monthly" | "biweekly" | "weekly"): number => {
    switch (freq) {
      case "annually": return 1;
      case "monthly": return 12;
      case "biweekly": return 26;
      case "weekly": return 52;
    }
  };
  
  const divisor = getFrequencyDivisor(payFrequency);
  
  // Selected gross salary based on selection
  let grossSalarySelected = 0;
  if (salaryType === "annual") {
    grossSalarySelected = annualGross / divisor;
  } else {
    // Input is monthly
    const inputMonthlyToSelected = (grossSalary * 12) / divisor;
    grossSalarySelected = inputMonthlyToSelected;
  }
  
  const totalDeductionsSelected = totalDeductionsAnnual / divisor;
  const netPaySelected = netPayAnnual / divisor;
  
  const deductionsBreakdownSelected = deductionsBreakdownAnnual.map(d => ({
    name: d.name,
    amount: Math.round((d.amount / divisor) * 100) / 100
  }));
  
  // Percentages
  let takeHomePercentage = 100;
  let taxPercentage = 0;
  let deductionsPercentage = 0;
  
  if (annualGross > 0) {
    takeHomePercentage = (netPayAnnual / annualGross) * 100;
    
    // Find Income Taxes in breakdown vs payroll/social taxes
    let taxAmount = 0;
    let otherDeductionAmount = 0;
    for (const d of deductionsBreakdownAnnual) {
      if (d.name.toLowerCase().includes("tax")) {
        taxAmount += d.amount;
      } else {
        otherDeductionAmount += d.amount;
      }
    }
    
    taxPercentage = (taxAmount / annualGross) * 100;
    deductionsPercentage = (otherDeductionAmount / annualGross) * 100;
  }
  
  return {
    grossSalaryAnnual: Math.round(annualGross * 100) / 100,
    grossSalarySelected: Math.round(grossSalarySelected * 100) / 100,
    netPayAnnual: Math.round(netPayAnnual * 100) / 100,
    netPaySelected: Math.round(netPaySelected * 100) / 100,
    totalDeductionsAnnual: Math.round(totalDeductionsAnnual * 100) / 100,
    totalDeductionsSelected: Math.round(totalDeductionsSelected * 100) / 100,
    deductionsBreakdownAnnual,
    deductionsBreakdownSelected,
    takeHomePercentage: Math.round(takeHomePercentage * 10) / 10,
    taxPercentage: Math.round(taxPercentage * 10) / 10,
    deductionsPercentage: Math.round(deductionsPercentage * 10) / 10
  };
}
