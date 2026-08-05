/**
 * BMI Calculation Logic
 * 
 * Formula: BMI = weight(kg) / (height(m))^2
 * 
 * Bands:
 *  - <18.5: Underweight
 *  - 18.5 - 24.9: Normal weight
 *  - 25.0 - 29.9: Overweight
 *  - >=30.0: Obese
 */

export interface BMICalculatorParams {
  weight: number; // in weightUnit
  weightUnit: "kg" | "lb";
  heightCm?: number; // if heightUnit is "cm"
  heightFt?: number; // if heightUnit is "ft"
  heightIn?: number; // if heightUnit is "ft"
  heightUnit: "cm" | "ft";
}

export interface BMICalculatorResult {
  bmi: number;
  category: "Underweight" | "Normal" | "Overweight" | "Obese";
  colorClass: string;
  percent: number; // percentage along the visual gauge/bar for representation
}

export function calculateBMI({
  weight,
  weightUnit,
  heightCm,
  heightFt,
  heightIn,
  heightUnit,
}: BMICalculatorParams): BMICalculatorResult | null {
  // Convert weight to kg
  if (!weight || weight <= 0) return null;
  const weightKg = weightUnit === "lb" ? weight * 0.45359237 : weight;

  // Convert height to meters
  let heightM = 0;
  if (heightUnit === "cm") {
    if (!heightCm || heightCm <= 0) return null;
    heightM = heightCm / 100;
  } else {
    const ft = heightFt || 0;
    const inch = heightIn || 0;
    if (ft <= 0 && inch <= 0) return null;
    // convert feet + inches to meters: 1 inch = 0.0254 meters, 1 foot = 12 inches
    const totalInches = ft * 12 + inch;
    heightM = totalInches * 0.0254;
  }

  if (heightM <= 0) return null;

  const bmi = weightKg / (heightM * heightM);

  if (isNaN(bmi) || bmi <= 0 || !isFinite(bmi)) {
    return null;
  }

  // Get category and gauge percent
  let category: "Underweight" | "Normal" | "Overweight" | "Obese";
  let colorClass = "";
  let percent = 0; // percentage for a horizontal gauge that spans from 15 to 35+ (width of display is 15 to 40 BMI range)

  if (bmi < 18.5) {
    category = "Underweight";
    colorClass = "text-sky-500 dark:text-sky-400 bg-sky-500";
    // Scale 15 to 18.5 across 0% to 25%
    const minBmi = 12;
    const maxBmi = 18.5;
    percent = Math.max(0, Math.min(25, ((bmi - minBmi) / (maxBmi - minBmi)) * 25));
  } else if (bmi < 25) {
    category = "Normal";
    colorClass = "text-emerald-500 dark:text-emerald-400 bg-emerald-500";
    // Scale 18.5 to 25 across 25% to 50%
    percent = 25 + ((bmi - 18.5) / (25 - 18.5)) * 25;
  } else if (bmi < 30) {
    category = "Overweight";
    colorClass = "text-amber-500 dark:text-amber-400 bg-amber-500";
    // Scale 25 to 30 across 50% to 75%
    percent = 50 + ((bmi - 25) / (30 - 25)) * 25;
  } else {
    category = "Obese";
    colorClass = "text-rose-500 dark:text-rose-400 bg-rose-500";
    // Scale 30 to 40 across 75% to 100%
    const minBmi = 30;
    const maxBmi = 40;
    percent = 75 + Math.min(25, ((bmi - minBmi) / (maxBmi - minBmi)) * 25);
  }

  return {
    bmi: parseFloat(bmi.toFixed(1)),
    category,
    colorClass,
    percent: Math.min(100, Math.max(0, parseFloat(percent.toFixed(1)))),
  };
}

export function getBMIExplanationSteps(
  params: BMICalculatorParams,
  result: BMICalculatorResult
): string[] {
  const steps: string[] = [];
  const { weight, weightUnit, heightCm, heightFt, heightIn, heightUnit } = params;

  if (weightUnit === "lb") {
    const weightKg = (weight * 0.45359237).toFixed(2);
    steps.push(`Convert weight from pounds to kilograms: ${weight} lbs ÷ 2.205 = ${weightKg} kg`);
  } else {
    steps.push(`Record weight: ${weight} kg`);
  }

  let heightM = 0;
  if (heightUnit === "cm") {
    heightM = (heightCm || 0) / 100;
    steps.push(`Convert height to meters: ${heightCm} cm ÷ 100 = ${heightM} m`);
  } else {
    const totalInches = (heightFt || 0) * 12 + (heightIn || 0);
    heightM = totalInches * 0.0254;
    steps.push(`Convert height (${heightFt || 0} ft ${heightIn || 0} in = ${totalInches} in) to meters: ${totalInches} in × 0.0254 = ${heightM.toFixed(3)} m`);
  }

  const heightSquared = (heightM * heightM).toFixed(4);
  steps.push(`Square the height in meters: ${heightM.toFixed(2)} × ${heightM.toFixed(2)} = ${heightSquared} m²`);

  const weightKgNum = weightUnit === "lb" ? weight * 0.45359237 : weight;
  steps.push(`Divide weight by height squared: ${weightKgNum.toFixed(2)} ÷ ${heightSquared} = ${result.bmi}`);

  const categoryRange =
    result.category === "Underweight"
      ? "less than 18.5"
      : result.category === "Normal"
      ? "18.5–24.9"
      : result.category === "Overweight"
      ? "25.0–29.9"
      : "30.0 or higher";

  steps.push(`Your BMI of ${result.bmi} falls into the '${result.category}' weight range (${categoryRange}).`);

  return steps;
}
