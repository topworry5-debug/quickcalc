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
    liters: parseFloat(liters.toFixed(2)),
    glasses: Math.round(glasses),
  };
}

export function getWaterExplanationSteps(
  params: WaterIntakeParams,
  result: WaterIntakeResult
): string[] {
  const steps: string[] = [];
  const { weight, weightUnit, activityLevel, climate } = params;

  let weightKg = weight;
  if (weightUnit === "lb") {
    weightKg = parseFloat((weight * 0.45359237).toFixed(2));
    steps.push(`Convert weight from pounds to kilograms: ${weight} lbs ÷ 2.205 = ${weightKg} kg`);
  } else {
    steps.push(`Record weight: ${weight} kg`);
  }

  const baseMl = Math.round(weightKg * 35);
  steps.push(`Calculate baseline hydration requirement (35 ml per kg): ${weightKg} kg × 35 ml/kg = ${baseMl} ml`);

  let activityAdd = 0;
  if (activityLevel === "moderate") activityAdd = 500;
  if (activityLevel === "active") activityAdd = 1000;
  if (activityAdd > 0) {
    steps.push(`Add activity adjustment ('${activityLevel}'): +${activityAdd} ml for sweat & exercise loss`);
  } else {
    steps.push(`Activity level ('sedentary'): No extra water addition required`);
  }

  const climateAdd = climate === "hot" ? 500 : 0;
  if (climateAdd > 0) {
    steps.push(`Add climate adjustment ('hot/humid'): +${climateAdd} ml for elevated perspiration`);
  }

  const totalMl = baseMl + activityAdd + climateAdd;
  steps.push(`Sum total daily fluid goal: ${baseMl} ml (base) + ${activityAdd} ml (activity) + ${climateAdd} ml (climate) = ${totalMl} ml (${result.liters} L)`);

  steps.push(`Convert to standard 250 ml glasses: ${totalMl} ml ÷ 250 ml = ~${result.glasses} glasses of water/day`);

  return steps;
}
