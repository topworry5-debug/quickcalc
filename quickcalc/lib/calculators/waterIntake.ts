/**
 * Water Intake Calculation Logic
 * 
 * Baseline hydration requirement: 35 ml of water per kilogram of body weight.
 * Activity adjustment:
 *  - Sedentary: +0 ml
 *  - Moderate: +500 ml
 *  - Active: +1000 ml
 * Climate adjustment:
 *  - Normal: +0 ml
 *  - Hot: +500 ml
 */

export interface WaterIntakeParams {
  weight: number;
  weightUnit: "kg" | "lb";
  activityLevel: "sedentary" | "moderate" | "active";
  climate: "normal" | "hot";
}

export interface WaterIntakeResult {
  liters: number;
  glasses: number;
}

export function calculateWaterIntake({
  weight,
  weightUnit,
  activityLevel,
  climate,
}: WaterIntakeParams): WaterIntakeResult {
  // Convert weight to kg
  const weightInKg = weightUnit === "lb" ? weight * 0.45359237 : weight;

  // Calculate baseline water (35ml per kg)
  let waterMl = weightInKg * 35;

  // Add activity adjustment
  switch (activityLevel) {
    case "moderate":
      waterMl += 500;
      break;
    case "active":
      waterMl += 1000;
      break;
    case "sedentary":
    default:
      break;
  }

  // Add climate adjustment
  if (climate === "hot") {
    waterMl += 500;
  }

  // Prevent negative or unrealistic values
  if (waterMl < 0 || isNaN(waterMl)) {
    waterMl = 0;
  }

  const liters = parseFloat((waterMl / 1000).toFixed(2));
  // 1 glass = 250ml (0.25 liters)
  const glasses = parseFloat((waterMl / 250).toFixed(1));

  return {
    liters,
    glasses,
  };
}
