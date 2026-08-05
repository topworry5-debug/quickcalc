/**
 * Calorie Calculation Logic (Mifflin-St Jeor Equation)
 * 
 * BMR formula:
 *  - Men: BMR = 10 * weight (kg) + 6.25 * height (cm) - 5 * age (y) + 5
 *  - Women: BMR = 10 * weight (kg) + 6.25 * height (cm) - 5 * age (y) - 161
 * 
 * TDEE multipliers:
 *  - Sedentary: BMR * 1.2
 *  - Lightly active: BMR * 1.375
 *  - Moderately active: BMR * 1.55
 *  - Very active: BMR * 1.725
 *  - Extremely active: BMR * 1.9
 */

export interface CalorieParams {
  sex: "male" | "female";
  age: number;
  height: number; // in cm
  weight: number; // in kg
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "extreme";
}

export interface CalorieResult {
  bmr: number;
  tdee: number;
  loseWeight: number; // TDEE - 500
  maintainWeight: number; // TDEE
  gainWeight: number; // TDEE + 500
}

export function calculateCalories({
  sex,
  age,
  height,
  weight,
  activityLevel,
}: CalorieParams): CalorieResult {
  // Mifflin-St Jeor Equation for BMR
  let bmr = 0;
  if (sex === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Activity Multipliers
  let multiplier = 1.2;
  switch (activityLevel) {
    case "sedentary":
      multiplier = 1.2;
      break;
    case "light":
      multiplier = 1.375;
      break;
    case "moderate":
      multiplier = 1.55;
      break;
    case "active":
      multiplier = 1.725;
      break;
    case "extreme":
      multiplier = 1.9;
      break;
  }

  const tdee = bmr * multiplier;

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    loseWeight: Math.round(tdee - 500),
    maintainWeight: Math.round(tdee),
    gainWeight: Math.round(tdee + 500),
  };
}

export function getCalorieExplanationSteps(
  params: CalorieParams,
  result: CalorieResult
): string[] {
  const steps: string[] = [];
  const { sex, age, height, weight, activityLevel } = params;

  const sexFormula = sex === "male"
    ? `(10 × ${weight}kg) + (6.25 × ${height}cm) - (5 × ${age}y) + 5`
    : `(10 × ${weight}kg) + (6.25 × ${height}cm) - (5 × ${age}y) - 161`;

  steps.push(`Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor formula: ${sexFormula} = ${result.bmr} kcal/day`);

  const multMap: Record<string, { label: string; val: number }> = {
    sedentary: { label: "Sedentary (little to no exercise)", val: 1.2 },
    light: { label: "Lightly Active (1-3 days/wk)", val: 1.375 },
    moderate: { label: "Moderately Active (3-5 days/wk)", val: 1.55 },
    active: { label: "Very Active (6-7 days/wk)", val: 1.725 },
    extreme: { label: "Extremely Active (hard physical job)", val: 1.9 },
  };

  const activityInfo = multMap[activityLevel] || { label: activityLevel, val: 1.2 };
  steps.push(`Apply physical activity factor '${activityInfo.label}': BMR (${result.bmr}) × ${activityInfo.val} = ${result.tdee} kcal/day (Total Daily Energy Expenditure)`);

  steps.push(`Maintenance Target: Eat ~${result.tdee} kcal/day to keep weight unchanged`);
  steps.push(`Weight Loss Target (-1 lb / 0.45 kg per week): 500 kcal deficit → ${result.loseWeight} kcal/day`);
  steps.push(`Weight Gain Target (+1 lb / 0.45 kg per week): 500 kcal surplus → ${result.gainWeight} kcal/day`);

  return steps;
}
