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
