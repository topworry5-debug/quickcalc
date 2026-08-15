export interface GFRCalculatorInput {
  creatinine: number;
  creatinineUnit: "mg/dL" | "umol/L";
  age: number;
  sex: "female" | "male";
}

export interface CKDStageInfo {
  stage: "Stage 1" | "Stage 2" | "Stage 3a" | "Stage 3b" | "Stage 4" | "Stage 5";
  label: string;
  rangeText: string;
  description: string;
  colorClass: string;
  badgeBg: string;
  badgeText: string;
  accentHex: string;
}

export interface GFRCalculatorResult {
  gfr: number; // eGFR in mL/min/1.73m²
  gfrFormatted: string;
  creatinineMgDl: number;
  stageInfo: CKDStageInfo;
}

export function calculateGFR(input: GFRCalculatorInput): GFRCalculatorResult {
  const { creatinine, creatinineUnit, age, sex } = input;

  // Convert serum creatinine to mg/dL if provided in µmol/L
  // 1 mg/dL = 88.4 µmol/L
  const creatinineMgDl =
    creatinineUnit === "umol/L" ? creatinine / 88.4 : creatinine;

  const kappa = sex === "female" ? 0.7 : 0.9;
  const alpha = sex === "female" ? -0.241 : -0.302;
  const sexMultiplier = sex === "female" ? 1.012 : 1.0;

  const scrOverKappa = creatinineMgDl / kappa;
  const minTerm = Math.pow(Math.min(scrOverKappa, 1), alpha);
  const maxTerm = Math.pow(Math.max(scrOverKappa, 1), -1.200);
  const ageTerm = Math.pow(0.9938, age);

  // 2021 CKD-EPI creatinine equation
  const gfrRaw = 142 * minTerm * maxTerm * ageTerm * sexMultiplier;
  const gfr = Math.round(gfrRaw * 10) / 10;
  const gfrFormatted = (Math.round(gfrRaw * 10) / 10).toFixed(1);

  // Stage classification
  let stageInfo: CKDStageInfo;

  if (gfr >= 90) {
    stageInfo = {
      stage: "Stage 1",
      label: "Normal or High Kidney Function",
      rangeText: "≥ 90 mL/min/1.73m²",
      description:
        "Normal or high eGFR. If persistent protein or blood is present in urine, it may indicate early kidney damage.",
      colorClass: "bg-emerald-500 text-white",
      badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      badgeText: "text-emerald-700 dark:text-emerald-300",
      accentHex: "#10b981",
    };
  } else if (gfr >= 60) {
    stageInfo = {
      stage: "Stage 2",
      label: "Mildly Decreased Kidney Function",
      rangeText: "60 – 89 mL/min/1.73m²",
      description:
        "Mildly reduced kidney function. Common in older adults without active kidney disease unless urine markers indicate damage.",
      colorClass: "bg-teal-500 text-white",
      badgeBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
      badgeText: "text-teal-700 dark:text-teal-300",
      accentHex: "#14b8a6",
    };
  } else if (gfr >= 45) {
    stageInfo = {
      stage: "Stage 3a",
      label: "Mild to Moderate Loss of Function",
      rangeText: "45 – 59 mL/min/1.73m²",
      description:
        "Mild-to-moderate decrease in kidney function. Clinical evaluation and routine monitoring of blood pressure and renal function are advised.",
      colorClass: "bg-amber-500 text-white",
      badgeBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      badgeText: "text-amber-700 dark:text-amber-300",
      accentHex: "#f59e0b",
    };
  } else if (gfr >= 30) {
    stageInfo = {
      stage: "Stage 3b",
      label: "Moderate to Severe Loss of Function",
      rangeText: "30 – 44 mL/min/1.73m²",
      description:
        "Moderate-to-severe decrease in kidney function. Requires medical management by a physician or nephrologist.",
      colorClass: "bg-orange-500 text-white",
      badgeBg: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
      badgeText: "text-orange-700 dark:text-orange-300",
      accentHex: "#f97316",
    };
  } else if (gfr >= 15) {
    stageInfo = {
      stage: "Stage 4",
      label: "Severe Loss of Kidney Function",
      rangeText: "15 – 29 mL/min/1.73m²",
      description:
        "Severely decreased kidney function. Urgent medical supervision and preparation for renal replacement therapy may be necessary.",
      colorClass: "bg-rose-500 text-white",
      badgeBg: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      badgeText: "text-rose-700 dark:text-rose-300",
      accentHex: "#f43f5e",
    };
  } else {
    stageInfo = {
      stage: "Stage 5",
      label: "Kidney Failure / End-Stage Renal Disease",
      rangeText: "< 15 mL/min/1.73m²",
      description:
        "Kidney failure. Immediate nephrology intervention, dialysis, or kidney transplantation planning is clinically required.",
      colorClass: "bg-purple-600 text-white",
      badgeBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
      badgeText: "text-purple-700 dark:text-purple-300",
      accentHex: "#9333ea",
    };
  }

  return {
    gfr,
    gfrFormatted,
    creatinineMgDl: Math.round(creatinineMgDl * 100) / 100,
    stageInfo,
  };
}

export function getGFRExplanationSteps(
  input: GFRCalculatorInput,
  result: GFRCalculatorResult
): string[] {
  const { creatinine, creatinineUnit, age, sex } = input;
  const steps: string[] = [];

  // Step 1: Unit Conversion
  if (creatinineUnit === "umol/L") {
    steps.push(
      `Step 1 (Unit Conversion): Convert Serum Creatinine from µmol/L to mg/dL: ${creatinine} µmol/L ÷ 88.4 = ${result.creatinineMgDl} mg/dL.`
    );
  } else {
    steps.push(
      `Step 1 (Creatinine Value): Record Serum Creatinine concentration Scr = ${creatinine} mg/dL.`
    );
  }

  // Step 2: Biological Coefficients
  const kappa = sex === "female" ? 0.7 : 0.9;
  const alpha = sex === "female" ? -0.241 : -0.302;
  const sexMult = sex === "female" ? 1.012 : 1.0;

  steps.push(
    `Step 2 (2021 CKD-EPI Parameters): Biological Sex = ${sex} (κ = ${kappa}, α = ${alpha}, Sex Multiplier = ${sexMult}), Age = ${age} years.`
  );

  // Step 3: Compute eGFR
  steps.push(
    `Step 3 (Equation Calculation): Calculate eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^-1.200 × 0.9938^Age × SexMultiplier = ${result.gfrFormatted} mL/min/1.73m².`
  );

  // Step 4: Classification
  steps.push(
    `Step 4 (KDIGO Classification): An eGFR of ${result.gfrFormatted} mL/min/1.73m² corresponds to ${result.stageInfo.stage}: ${result.stageInfo.label} (${result.stageInfo.rangeText}).`
  );

  return steps;
}
