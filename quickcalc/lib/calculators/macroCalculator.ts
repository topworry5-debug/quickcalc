import { calculateCalories, CalorieParams } from "./calorieCalculator";

export type MacroGoal = "maintain" | "lose" | "gain";
export type MacroPreset = "balanced" | "high-protein" | "low-carb" | "keto" | "custom";

export interface MacroParams extends CalorieParams {
  goal: MacroGoal;
  preset: MacroPreset;
  customProteinPct?: number;
  customCarbsPct?: number;
  customFatPct?: number;
}

export interface MacroResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinPct: number;
  carbsPct: number;
  fatPct: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  proteinCalories: number;
  carbsCalories: number;
  fatCalories: number;
  perMeal3: {
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
    calories: number;
  };
  perMeal4: {
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
    calories: number;
  };
}

export function calculateMacros(params: MacroParams): MacroResult {
  const calorieResult = calculateCalories(params);
  const { bmr, tdee } = calorieResult;

  let targetCalories = tdee;
  if (params.goal === "lose") {
    targetCalories = Math.max(1200, tdee - 500);
  } else if (params.goal === "gain") {
    targetCalories = tdee + 500;
  }
  targetCalories = Math.round(targetCalories);

  let proteinPct = 30;
  let carbsPct = 40;
  let fatPct = 30;

  switch (params.preset) {
    case "balanced":
      proteinPct = 30;
      carbsPct = 40;
      fatPct = 30;
      break;
    case "high-protein":
      proteinPct = 40;
      carbsPct = 40;
      fatPct = 20;
      break;
    case "low-carb":
      proteinPct = 35;
      carbsPct = 25;
      fatPct = 40;
      break;
    case "keto":
      proteinPct = 25;
      carbsPct = 5;
      fatPct = 70;
      break;
    case "custom":
      proteinPct = Math.max(0, Math.min(100, params.customProteinPct ?? 30));
      carbsPct = Math.max(0, Math.min(100, params.customCarbsPct ?? 40));
      fatPct = Math.max(0, Math.min(100, params.customFatPct ?? 30));
      break;
  }

  const proteinCalories = Math.round(targetCalories * (proteinPct / 100));
  const carbsCalories = Math.round(targetCalories * (carbsPct / 100));
  const fatCalories = Math.round(targetCalories * (fatPct / 100));

  const proteinGrams = Math.round(proteinCalories / 4);
  const carbsGrams = Math.round(carbsCalories / 4);
  const fatGrams = Math.round(fatCalories / 9);

  return {
    bmr,
    tdee,
    targetCalories,
    proteinPct,
    carbsPct,
    fatPct,
    proteinGrams,
    carbsGrams,
    fatGrams,
    proteinCalories,
    carbsCalories,
    fatCalories,
    perMeal3: {
      proteinGrams: Math.round(proteinGrams / 3),
      carbsGrams: Math.round(carbsGrams / 3),
      fatGrams: Math.round(fatGrams / 3),
      calories: Math.round(targetCalories / 3),
    },
    perMeal4: {
      proteinGrams: Math.round(proteinGrams / 4),
      carbsGrams: Math.round(carbsGrams / 4),
      fatGrams: Math.round(fatGrams / 4),
      calories: Math.round(targetCalories / 4),
    },
  };
}

export function getMacroExplanationSteps(
  params: MacroParams,
  result: MacroResult
): string[] {
  const steps: string[] = [];

  const goalText =
    params.goal === "lose"
      ? "Weight Loss (TDEE - 500 kcal deficit)"
      : params.goal === "gain"
      ? "Weight Gain (TDEE + 500 kcal surplus)"
      : "Weight Maintenance (TDEE baseline)";

  steps.push(
    `Calculate Total Daily Energy Expenditure (TDEE): Baseline BMR (${result.bmr} kcal) × activity multiplier = ${result.tdee} kcal/day.`
  );

  steps.push(
    `Determine target daily calories for '${goalText}': ${result.targetCalories.toLocaleString()} kcal/day.`
  );

  steps.push(
    `Apply macro ratio split (${result.proteinPct}% Protein / ${result.carbsPct}% Carbs / ${result.fatPct}% Fat): ` +
      `Protein = ${result.proteinCalories.toLocaleString()} kcal | Carbs = ${result.carbsCalories.toLocaleString()} kcal | Fat = ${result.fatCalories.toLocaleString()} kcal.`
  );

  steps.push(
    `Convert macro calories to daily grams (Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g): ` +
      `Protein = ${result.proteinGrams}g/day, Carbs = ${result.carbsGrams}g/day, Fat = ${result.fatGrams}g/day.`
  );

  return steps;
}
