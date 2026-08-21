/**
 * creatineMacroCalculator.ts
 * 
 * Evidence-based International Society of Sports Nutrition (ISSN) & ACSM
 * Creatine Monohydrate dosage, Hydration, Mifflin-St Jeor / Katch-McArdle TDEE,
 * and Macronutrient distribution engine.
 */

export type UnitSystem = "metric" | "imperial";
export type Gender = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "heavy" | "athlete";
export type FitnessGoal = "cut_aggressive" | "cut_moderate" | "maintenance" | "bulk_lean" | "bulk_aggressive";
export type CreatineProtocol = "loading_maintenance" | "maintenance_only";

export interface CreatineCalculatorInputs {
  unitSystem: UnitSystem;
  gender: Gender;
  age: number;
  weightKg: number;
  heightCm: number;
  bodyFatPercent?: number | null;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  protocol: CreatineProtocol;
}

export interface MacroDistribution {
  proteinGrams: number;
  proteinCalories: number;
  proteinPercent: number;

  carbsGrams: number;
  carbsCalories: number;
  carbsPercent: number;

  fatsGrams: number;
  fatsCalories: number;
  fatsPercent: number;
}

export interface CreatineDosing {
  protocol: CreatineProtocol;
  loadingDailyGrams: number;
  loadingDosePerServing: number;
  loadingServingsPerDay: number;
  loadingDurationDays: number;
  
  maintenanceDailyGrams: number;
  suggestedWaterExtraMl: number;
  suggestedWaterExtraOz: number;
  daysToFullSaturation: number;
}

export interface CreatineMacroResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  calorieDeficitOrSurplus: number;
  macros: MacroDistribution;
  creatine: CreatineDosing;
  formulaUsed: "Mifflin-St Jeor" | "Katch-McArdle";
  weightInKg: number;
  weightInLbs: number;
}

export interface CreatinePreset {
  id: string;
  name: string;
  description: string;
  inputs: Partial<CreatineCalculatorInputs>;
}

export const CREATINE_PRESETS: CreatinePreset[] = [
  {
    id: "lean-bulk-male",
    name: "Lean Bulk Athlete (80kg)",
    description: "Male, 26 yrs, 80kg, 180cm, Moderately Active, +10% Lean Bulk, Fast Loading",
    inputs: {
      unitSystem: "metric",
      gender: "male",
      age: 26,
      weightKg: 80,
      heightCm: 180,
      bodyFatPercent: 14,
      activityLevel: "moderate",
      goal: "bulk_lean",
      protocol: "loading_maintenance",
    },
  },
  {
    id: "fat-loss-female",
    name: "Fat Loss & Tone (62kg)",
    description: "Female, 28 yrs, 62kg, 165cm, Lightly Active, -15% Fat Loss, Maintenance Only",
    inputs: {
      unitSystem: "metric",
      gender: "female",
      age: 28,
      weightKg: 62,
      heightCm: 165,
      bodyFatPercent: 22,
      activityLevel: "light",
      goal: "cut_moderate",
      protocol: "maintenance_only",
    },
  },
  {
    id: "heavy-lifter",
    name: "Heavyweight Lifter (95kg)",
    description: "Male, 32 yrs, 95kg, 185cm, Very Active, +10% Muscle Gain, Fast Loading",
    inputs: {
      unitSystem: "metric",
      gender: "male",
      age: 32,
      weightKg: 95,
      heightCm: 185,
      bodyFatPercent: 16,
      activityLevel: "heavy",
      goal: "bulk_lean",
      protocol: "loading_maintenance",
    },
  },
  {
    id: "recomp-athlete",
    name: "Body Recomposition (75kg)",
    description: "Male, 24 yrs, 75kg, 175cm, Moderately Active, Maintenance Calories",
    inputs: {
      unitSystem: "metric",
      gender: "male",
      age: 24,
      weightKg: 75,
      heightCm: 175,
      bodyFatPercent: null,
      activityLevel: "moderate",
      goal: "maintenance",
      protocol: "loading_maintenance",
    },
  },
];

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  heavy: 1.725,
  athlete: 1.9,
};

const GOAL_ADJUSTMENTS: Record<FitnessGoal, number> = {
  cut_aggressive: -0.25,
  cut_moderate: -0.15,
  maintenance: 0,
  bulk_lean: 0.10,
  bulk_aggressive: 0.20,
};

/**
 * Main Calculation Engine
 */
export function calculateCreatineAndMacros(inputs: CreatineCalculatorInputs): CreatineMacroResult {
  const weightKg = Math.max(30, Math.min(250, inputs.weightKg || 70));
  const heightCm = Math.max(100, Math.min(250, inputs.heightCm || 175));
  const age = Math.max(15, Math.min(90, inputs.age || 25));
  const weightLbs = weightKg * 2.20462;

  // 1. BMR Calculation (Mifflin-St Jeor vs Katch-McArdle)
  let bmr: number;
  let formulaUsed: "Mifflin-St Jeor" | "Katch-McArdle" = "Mifflin-St Jeor";

  if (inputs.bodyFatPercent && inputs.bodyFatPercent >= 4 && inputs.bodyFatPercent <= 60) {
    const lbmKg = weightKg * (1 - inputs.bodyFatPercent / 100);
    bmr = 370 + 21.6 * lbmKg;
    formulaUsed = "Katch-McArdle";
  } else {
    if (inputs.gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }
  }

  // 2. TDEE & Target Calories
  const activityMult = ACTIVITY_MULTIPLIERS[inputs.activityLevel] || 1.55;
  const tdee = bmr * activityMult;

  const goalAdj = GOAL_ADJUSTMENTS[inputs.goal] || 0;
  const targetCalories = Math.max(1000, tdee * (1 + goalAdj));
  const calorieDeficitOrSurplus = targetCalories - tdee;

  // 3. Macronutrient Distribution
  // Protein: 2.2g/kg for cutting or bulking, 1.8g/kg for maintenance
  const proteinMultiplier = inputs.goal === "maintenance" ? 1.8 : 2.2;
  const proteinGrams = Math.round(weightKg * proteinMultiplier);
  const proteinCalories = proteinGrams * 4;

  // Fat: 25% of target daily calories
  const fatCalories = targetCalories * 0.25;
  const fatsCalories = Math.round(fatCalories);
  const fatsGrams = Math.round(fatCalories / 9);

  // Carbs: Remaining calories
  const remainingCaloriesForCarbs = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const carbsGrams = Math.round(remainingCaloriesForCarbs / 4);
  const carbsCalories = carbsGrams * 4;

  const totalCalculatedCalories = proteinCalories + carbsCalories + fatCalories;
  const proteinPercent = Math.round((proteinCalories / totalCalculatedCalories) * 100);
  const fatsPercent = Math.round((fatCalories / totalCalculatedCalories) * 100);
  const carbsPercent = Math.max(0, 100 - proteinPercent - fatsPercent);

  // 4. Creatine Dosage & Hydration (ISSN Guidelines)
  // Loading: 0.3g per kg (~20g/day) split into 4 equal doses for 5-7 days
  const rawLoadingDose = weightKg * 0.3;
  const loadingDailyGrams = Math.round(Math.min(30, Math.max(15, rawLoadingDose)));
  const loadingServingsPerDay = 4;
  const loadingDosePerServing = Number((loadingDailyGrams / loadingServingsPerDay).toFixed(1));
  const loadingDurationDays = 7;

  // Maintenance: 0.04g per kg (or 5g standard, up to 8g for heavy individuals >90kg)
  let maintenanceDailyGrams = Math.round(weightKg * 0.04);
  if (weightKg > 90) {
    maintenanceDailyGrams = Math.max(5, Math.min(8, Math.round(weightKg * 0.05)));
  } else {
    maintenanceDailyGrams = Math.max(3, Math.min(5, maintenanceDailyGrams));
  }

  // Extra Water: ~10-12ml per kg extra, or 500-1000ml
  const suggestedWaterExtraMl = Math.round(Math.max(500, Math.min(1200, weightKg * 10)));
  const suggestedWaterExtraOz = Math.round(suggestedWaterExtraMl * 0.033814);

  const daysToFullSaturation = inputs.protocol === "loading_maintenance" ? 7 : 28;

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    targetCalories: Math.round(targetCalories),
    calorieDeficitOrSurplus: Math.round(calorieDeficitOrSurplus),
    macros: {
      proteinGrams,
      proteinCalories,
      proteinPercent,
      carbsGrams,
      carbsCalories,
      carbsPercent,
      fatsGrams,
      fatsCalories,
      fatsPercent,
    },
    creatine: {
      protocol: inputs.protocol,
      loadingDailyGrams,
      loadingDosePerServing,
      loadingServingsPerDay,
      loadingDurationDays,
      maintenanceDailyGrams,
      suggestedWaterExtraMl,
      suggestedWaterExtraOz,
      daysToFullSaturation,
    },
    formulaUsed,
    weightInKg: Number(weightKg.toFixed(1)),
    weightInLbs: Number(weightLbs.toFixed(1)),
  };
}

/**
 * Step-by-step mathematical explanation for ExplainResultAccordion
 */
export function getCreatineExplanationSteps(
  inputs: CreatineCalculatorInputs,
  result: CreatineMacroResult
): string[] {
  const isMale = inputs.gender === "male";
  const c = result.creatine;

  return [
    `BMR (${result.formulaUsed}) = ${
      result.formulaUsed === "Katch-McArdle"
        ? `370 + (21.6 × Lean Body Mass of ${(result.weightInKg * (1 - (inputs.bodyFatPercent || 15) / 100)).toFixed(1)}kg) = ${result.bmr} kcal/day`
        : `(10 × ${result.weightInKg}kg) + (6.25 × ${inputs.heightCm}cm) - (5 × ${inputs.age}y) ${isMale ? "+ 5" : "- 161"} = ${result.bmr} kcal/day`
    }`,
    `TDEE = BMR (${result.bmr}) × Activity Multiplier (${ACTIVITY_MULTIPLIERS[inputs.activityLevel]}) = ${result.tdee} kcal/day`,
    `Target Energy Intake = ${result.tdee} kcal ${
      result.calorieDeficitOrSurplus >= 0 ? `+ ${result.calorieDeficitOrSurplus}` : `${result.calorieDeficitOrSurplus}`
    } kcal (${GOAL_ADJUSTMENTS[inputs.goal] * 100}% goal adjustment) = ${result.targetCalories} kcal/day`,
    `Macro Allocation = Protein: ${result.macros.proteinGrams}g (${result.macros.proteinPercent}%) | Carbs: ${result.macros.carbsGrams}g (${result.macros.carbsPercent}%) | Fats: ${result.macros.fatsGrams}g (${result.macros.fatsPercent}%)`,
    `Creatine Protocol (${c.protocol === "loading_maintenance" ? "Loading Phase" : "Maintenance Only"}) = ${
      c.protocol === "loading_maintenance"
        ? `Phase 1 (Days 1–7): Take ${c.loadingDailyGrams}g/day split into ${c.loadingServingsPerDay} doses of ${c.loadingDosePerServing}g. Phase 2 (Day 8+): Daily maintenance dose of ${c.maintenanceDailyGrams}g/day (Full saturation reached in ~7 days).`
        : `Daily steady dose of ${c.maintenanceDailyGrams}g/day from Day 1 (Full intramuscular phosphocreatine saturation reached gradually in ~28 days).`
    }`,
    `Hydration Requirement = Drink an additional +${c.suggestedWaterExtraMl} ml (+${c.suggestedWaterExtraOz} oz) of water daily to support intracellular cellular hydration.`,
  ];
}
