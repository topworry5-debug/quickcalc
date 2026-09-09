/**
 * OASDI (Old-Age, Survivors, and Disability Insurance) Tax Calculation Engine
 * QuickCalc.cloud
 *
 * MAINTENANCE-CRITICAL CONSTANT:
 * The Social Security Administration (SSA) announces the official Contribution
 * and Benefit Base annually (typically in mid-October for the subsequent calendar year).
 * When updating this file for future tax years, add the new year and wage base limit to
 * `OASDI_WAGE_BASE_BY_YEAR` and update `CURRENT_OASDI_YEAR`.
 *
 * Reference: Social Security Act § 230 [42 U.S.C. 430]; IRC § 3101(a), § 3111(a), § 1401(a).
 */

export type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly" | "annual";
export type EmploymentType = "employee" | "self_employed";
export type WageInputMode = "annual" | "per_paycheck";

export interface OASDIYtdConfig {
  hasPriorEarnings: boolean;
  priorYtdEarnings: number;
}

export interface OASDICalculatorInput {
  grossWage: number;
  inputMode: WageInputMode;
  frequency: PayFrequency;
  employmentType: EmploymentType;
  taxYear: number;
  ytdConfig?: OASDIYtdConfig;
}

export interface OASDICalculatorResult {
  taxYear: number;
  wageBaseLimit: number;
  oasdiRate: number; // e.g. 0.062 or 0.124
  employmentType: EmploymentType;
  frequency: PayFrequency;
  paychecksPerYear: number;

  // Pay Period Figures
  paycheckGross: number;
  taxableOASDIWagesPeriod: number;
  exemptOASDIWagesPeriod: number;
  oasdiTaxPeriod: number;
  employerOASDIMatchPeriod: number; // 6.2% paid by employer for W-2, or half of SE tax
  medicareTaxPeriod: number; // Informational line item (1.45% employee or 2.9% SE)
  totalFicaPeriod: number; // OASDI + Medicare

  // Annualized Figures
  annualGross: number;
  annualTaxableOASDI: number;
  annualOASDITax: number;
  annualEmployerOASDIMatch: number;
  annualMedicareTax: number;
  annualTotalFica: number;

  // Wage Base Room & Cap Status
  priorYtdEarnings: number;
  cumulativeEarningsAfterPeriod: number;
  remainingWageBaseRoom: number;
  capExceededThisPeriod: boolean;
  alreadyOverCapPrior: boolean;
  percentOfCapReached: number;

  // Plain language summary
  explanationSentence: string;
}

/**
 * Historical and verified Contribution & Benefit Bases (Wage Base Limits).
 * Source: Social Security Administration (SSA) National Average Wage Indexing.
 */
export const OASDI_WAGE_BASE_BY_YEAR: Record<number, number> = {
  2026: 184500, // Official 2026 wage base cap ($184,500)
  2025: 176100, // Official 2025 wage base cap ($176,100)
  2024: 168600, // Official 2024 wage base cap ($168,600)
  2023: 160200, // Official 2023 wage base cap ($160,200)
  2022: 147000, // Official 2022 wage base cap ($147,000)
};

export const CURRENT_OASDI_YEAR = 2026;
export const AVAILABLE_OASDI_YEARS = [2026, 2025, 2024, 2023, 2022];

export const EMPLOYEE_OASDI_RATE = 0.062; // 6.2%
export const EMPLOYER_OASDI_RATE = 0.062; // 6.2%
export const SELF_EMPLOYED_OASDI_RATE = 0.124; // 12.4%
export const SE_NET_EARNINGS_FACTOR = 0.9235; // 92.35% standard IRS Schedule SE deduction

export const EMPLOYEE_MEDICARE_RATE = 0.0145; // 1.45% (uncapped)
export const SELF_EMPLOYED_MEDICARE_RATE = 0.029; // 2.9% (uncapped)

export const PAY_FREQUENCY_PERIODS: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
  annual: 1,
};

export const PAY_FREQUENCY_LABELS: Record<PayFrequency, string> = {
  weekly: "Weekly (52 checks/yr)",
  biweekly: "Biweekly (26 checks/yr)",
  semimonthly: "Semimonthly (24 checks/yr)",
  monthly: "Monthly (12 checks/yr)",
  annual: "Annually (1 lump sum)",
};

/**
 * Calculates OASDI tax, remaining wage base cap room, and plain-language summary.
 */
export function calculateOASDITax(input: OASDICalculatorInput): OASDICalculatorResult {
  const taxYear = OASDI_WAGE_BASE_BY_YEAR[input.taxYear] ? input.taxYear : CURRENT_OASDI_YEAR;
  const wageBaseLimit = OASDI_WAGE_BASE_BY_YEAR[taxYear];
  const paychecksPerYear = PAY_FREQUENCY_PERIODS[input.frequency] || 26;
  const isEmployee = input.employmentType === "employee";
  const oasdiRate = isEmployee ? EMPLOYEE_OASDI_RATE : SELF_EMPLOYED_OASDI_RATE;
  const medicareRate = isEmployee ? EMPLOYEE_MEDICARE_RATE : SELF_EMPLOYED_MEDICARE_RATE;

  // Standardize paycheck vs annual gross
  const rawWage = Math.max(0, input.grossWage || 0);
  let paycheckGross = 0;
  let annualGross = 0;

  if (input.inputMode === "annual") {
    annualGross = rawWage;
    paycheckGross = paychecksPerYear > 0 ? annualGross / paychecksPerYear : annualGross;
  } else {
    paycheckGross = rawWage;
    annualGross = paycheckGross * paychecksPerYear;
  }

  // Handle YTD earnings and crossover
  const hasYtd = Boolean(input.ytdConfig?.hasPriorEarnings);
  const priorYtdEarnings = hasYtd ? Math.max(0, input.ytdConfig?.priorYtdEarnings || 0) : 0;
  const cumulativeEarningsAfterPeriod = priorYtdEarnings + paycheckGross;

  // Check if prior YTD already hit cap
  const alreadyOverCapPrior = priorYtdEarnings >= wageBaseLimit;

  // Determine taxable wages for this pay period
  let taxableOASDIWagesPeriod = 0;
  let exemptOASDIWagesPeriod = 0;
  let capExceededThisPeriod = false;

  if (hasYtd) {
    if (alreadyOverCapPrior) {
      taxableOASDIWagesPeriod = 0;
      exemptOASDIWagesPeriod = paycheckGross;
    } else {
      const remainingRoomBeforeCheck = Math.max(0, wageBaseLimit - priorYtdEarnings);
      taxableOASDIWagesPeriod = Math.min(paycheckGross, remainingRoomBeforeCheck);
      exemptOASDIWagesPeriod = Math.max(0, paycheckGross - taxableOASDIWagesPeriod);
      if (exemptOASDIWagesPeriod > 0) {
        capExceededThisPeriod = true;
      }
    }
  } else {
    // If no prior YTD specified, we evaluate based on annual gross vs cap
    if (annualGross <= wageBaseLimit) {
      taxableOASDIWagesPeriod = paycheckGross;
      exemptOASDIWagesPeriod = 0;
    } else {
      // Annual gross exceeds cap: average paycheck or lump sum evaluation
      if (input.frequency === "annual") {
        taxableOASDIWagesPeriod = wageBaseLimit;
        exemptOASDIWagesPeriod = Math.max(0, annualGross - wageBaseLimit);
        capExceededThisPeriod = true;
      } else {
        // For recurring paychecks without specific YTD entered,
        // we show the standard paycheck deduction when below cap.
        taxableOASDIWagesPeriod = paycheckGross;
        exemptOASDIWagesPeriod = 0;
      }
    }
  }

  // Self-employment net earnings adjustment (92.35% of net earnings)
  const seSubjectWagePeriod = isEmployee
    ? taxableOASDIWagesPeriod
    : taxableOASDIWagesPeriod * SE_NET_EARNINGS_FACTOR;

  const oasdiTaxPeriod = seSubjectWagePeriod * oasdiRate;
  const employerOASDIMatchPeriod = isEmployee
    ? taxableOASDIWagesPeriod * EMPLOYER_OASDI_RATE
    : oasdiTaxPeriod / 2; // For SE, half is deductible above-the-line

  // Medicare tax (uncapped, informational context)
  const seSubjectMedicareWagePeriod = isEmployee
    ? paycheckGross
    : paycheckGross * SE_NET_EARNINGS_FACTOR;
  const medicareTaxPeriod = seSubjectMedicareWagePeriod * medicareRate;
  const totalFicaPeriod = oasdiTaxPeriod + medicareTaxPeriod;

  // Annual figures calculation
  const annualTaxableOASDI = Math.min(annualGross, wageBaseLimit);
  const seSubjectAnnualOASDI = isEmployee
    ? annualTaxableOASDI
    : annualTaxableOASDI * SE_NET_EARNINGS_FACTOR;
  const annualOASDITax = seSubjectAnnualOASDI * oasdiRate;
  const annualEmployerOASDIMatch = isEmployee
    ? annualTaxableOASDI * EMPLOYER_OASDI_RATE
    : annualOASDITax / 2;

  const seSubjectAnnualMedicare = isEmployee
    ? annualGross
    : annualGross * SE_NET_EARNINGS_FACTOR;
  const annualMedicareTax = seSubjectAnnualMedicare * medicareRate;
  const annualTotalFica = annualOASDITax + annualMedicareTax;

  // Remaining Wage Base Room
  const effectiveCumulative = hasYtd ? cumulativeEarningsAfterPeriod : annualGross;
  const remainingWageBaseRoom = Math.max(0, wageBaseLimit - effectiveCumulative);
  const percentOfCapReached = Math.min(100, (effectiveCumulative / wageBaseLimit) * 100);

  // Generate plain-language humanized explanation
  const explanationSentence = generateExplanation({
    isEmployee,
    taxYear,
    wageBaseLimit,
    paycheckGross,
    annualGross,
    frequency: input.frequency,
    oasdiTaxPeriod,
    annualOASDITax,
    taxableOASDIWagesPeriod,
    exemptOASDIWagesPeriod,
    hasYtd,
    priorYtdEarnings,
    alreadyOverCapPrior,
    capExceededThisPeriod,
    remainingWageBaseRoom,
  });

  return {
    taxYear,
    wageBaseLimit,
    oasdiRate,
    employmentType: input.employmentType,
    frequency: input.frequency,
    paychecksPerYear,

    paycheckGross,
    taxableOASDIWagesPeriod,
    exemptOASDIWagesPeriod,
    oasdiTaxPeriod,
    employerOASDIMatchPeriod,
    medicareTaxPeriod,
    totalFicaPeriod,

    annualGross,
    annualTaxableOASDI,
    annualOASDITax,
    annualEmployerOASDIMatch,
    annualMedicareTax,
    annualTotalFica,

    priorYtdEarnings,
    cumulativeEarningsAfterPeriod,
    remainingWageBaseRoom,
    capExceededThisPeriod,
    alreadyOverCapPrior,
    percentOfCapReached,

    explanationSentence,
  };
}

/**
 * Generates an intuitive, non-jargon, conversational summary sentence.
 */
function generateExplanation(params: {
  isEmployee: boolean;
  taxYear: number;
  wageBaseLimit: number;
  paycheckGross: number;
  annualGross: number;
  frequency: PayFrequency;
  oasdiTaxPeriod: number;
  annualOASDITax: number;
  taxableOASDIWagesPeriod: number;
  exemptOASDIWagesPeriod: number;
  hasYtd: boolean;
  priorYtdEarnings: number;
  alreadyOverCapPrior: boolean;
  capExceededThisPeriod: boolean;
  remainingWageBaseRoom: number;
}): string {
  const {
    isEmployee,
    taxYear,
    wageBaseLimit,
    paycheckGross,
    annualGross,
    frequency,
    oasdiTaxPeriod,
    annualOASDITax,
    exemptOASDIWagesPeriod,
    taxableOASDIWagesPeriod,
    hasYtd,
    priorYtdEarnings,
    alreadyOverCapPrior,
    capExceededThisPeriod,
    remainingWageBaseRoom,
  } = params;

  const formattedCap = `$${wageBaseLimit.toLocaleString("en-US")}`;
  const formattedPeriodTax = `$${oasdiTaxPeriod.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formattedAnnualTax = `$${annualOASDITax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formattedCheckGross = `$${paycheckGross.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const ratePct = isEmployee ? "6.2%" : "12.4%";

  // Case 1: Prior YTD earnings already crossed the cap
  if (hasYtd && alreadyOverCapPrior) {
    return `Because your prior year-to-date earnings ($${priorYtdEarnings.toLocaleString("en-US")}) have already exceeded the ${taxYear} Social Security wage cap (${formattedCap}), you owe $0.00 in OASDI tax on this paycheck. No more Social Security tax will be withheld from your pay for the rest of this calendar year.`;
  }

  // Case 2: This specific paycheck crosses the cap
  if (hasYtd && capExceededThisPeriod) {
    const formattedTaxable = `$${taxableOASDIWagesPeriod.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const formattedExempt = `$${exemptOASDIWagesPeriod.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `This paycheck puts you over the ${taxYear} Social Security cap! Only the first ${formattedTaxable} of your ${formattedCheckGross} check is taxed at ${ratePct} (${formattedPeriodTax} owed). The remaining ${formattedExempt} is exempt, and every subsequent paycheck this year will have $0.00 in OASDI tax deducted.`;
  }

  // Case 3: Self-employed specific explanation
  if (!isEmployee) {
    if (annualGross > wageBaseLimit) {
      return `As a self-employed individual earning $${annualGross.toLocaleString("en-US")}, you pay the 12.4% OASDI tax on 92.35% of your net earnings, capped at the ${taxYear} wage base limit (${formattedCap}). Your maximum annual OASDI tax is capped at ${formattedAnnualTax} (with half deductible on your Form 1040).`;
    }
    return `As a self-employed individual, you pay the 12.4% OASDI rate on 92.35% of your net earnings ($${(paycheckGross * SE_NET_EARNINGS_FACTOR).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} subject income). Your OASDI tax is ${formattedPeriodTax} for this period, with an estimated annual total of ${formattedAnnualTax}.`;
  }

  // Case 4: Standard W-2 employee below or above cap
  if (annualGross > wageBaseLimit) {
    const payFreqWord = frequency === "annual" ? "year" : "paycheck";
    return `Your annual salary ($${annualGross.toLocaleString("en-US")}) surpasses the ${taxYear} wage cap (${formattedCap}). Your employer withholds 6.2% (${formattedPeriodTax} per ${payFreqWord}) until you reach ${formattedCap} in cumulative earnings. After that, your OASDI deduction drops to $0.00 for the rest of the year, capping your total annual OASDI tax at ${formattedAnnualTax}.`;
  }

  const freqLabel = frequency === "annual" ? "year" : frequency === "biweekly" ? "biweekly paycheck" : frequency === "monthly" ? "monthly paycheck" : "paycheck";
  const remainingSentence = remainingWageBaseRoom > 0
    ? ` You have $${remainingWageBaseRoom.toLocaleString("en-US")} in wage base room remaining before reaching the annual limit.`
    : "";

  return `Your employer withholds 6.2% (${formattedPeriodTax}) from your ${formattedCheckGross} ${freqLabel} for OASDI Social Security tax, matched by another 6.2% from your employer. Your total estimated OASDI tax for ${taxYear} is ${formattedAnnualTax}.${remainingSentence}`;
}
