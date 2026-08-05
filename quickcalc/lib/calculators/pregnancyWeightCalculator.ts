/**
 * Pregnancy Weight Gain Calculator Logic
 * Based on the Institute of Medicine (IOM) / National Research Council (NRC) guidelines.
 */

export interface PregnancyCalculatorParams {
  prePregnancyWeight: number; // in weightUnit
  currentWeight: number; // in weightUnit
  weightUnit: "kg" | "lb";
  heightCm?: number;
  heightFt?: number;
  heightIn?: number;
  heightUnit: "cm" | "ft";
  currentWeek: number; // 1 to 42
  pregnancyType: "single" | "twin";
}

export interface PregnancyCalculatorResult {
  bmi: number;
  bmiCategory: "Underweight" | "Normal" | "Overweight" | "Obese";
  totalGainedKg: number;
  totalGainedLb: number;
  expectedMinKg: number;
  expectedMaxKg: number;
  expectedMinLb: number;
  expectedMaxLb: number;
  totalRecommendedMinKg: number;
  totalRecommendedMaxKg: number;
  totalRecommendedMinLb: number;
  totalRecommendedMaxLb: number;
  status: "below" | "within" | "above";
  message: string;
}

export function calculatePregnancyWeightGain({
  prePregnancyWeight,
  currentWeight,
  weightUnit,
  heightCm,
  heightFt,
  heightIn,
  heightUnit,
  currentWeek,
  pregnancyType,
}: PregnancyCalculatorParams): PregnancyCalculatorResult | null {
  if (!prePregnancyWeight || prePregnancyWeight <= 0) return null;
  if (!currentWeight || currentWeight <= 0) return null;
  if (currentWeek < 1 || currentWeek > 42) return null;

  // 1. Calculate pre-pregnancy BMI
  const weightKg = weightUnit === "lb" ? prePregnancyWeight * 0.45359237 : prePregnancyWeight;

  let heightM = 0;
  if (heightUnit === "cm") {
    if (!heightCm || heightCm <= 0) return null;
    heightM = heightCm / 100;
  } else {
    const ft = heightFt || 0;
    const inch = heightIn || 0;
    if (ft <= 0 && inch <= 0) return null;
    const totalInches = ft * 12 + inch;
    heightM = totalInches * 0.0254;
  }

  if (heightM <= 0) return null;
  const bmi = weightKg / (heightM * heightM);
  if (isNaN(bmi) || bmi <= 0 || !isFinite(bmi)) return null;

  // Determine pre-pregnancy BMI category
  let bmiCategory: "Underweight" | "Normal" | "Overweight" | "Obese";
  if (bmi < 18.5) {
    bmiCategory = "Underweight";
  } else if (bmi < 25) {
    bmiCategory = "Normal";
  } else if (bmi < 30) {
    bmiCategory = "Overweight";
  } else {
    bmiCategory = "Obese";
  }

  // 2. Define IOM total recommendation limits in KG
  // Single Guidelines:
  // Underweight: 12.5 - 18 kg
  // Normal: 11.5 - 16 kg
  // Overweight: 7 - 11.5 kg
  // Obese: 5 - 9 kg
  //
  // Twin Guidelines:
  // Underweight: 22.5 - 27.5 kg
  // Normal: 16.8 - 24.5 kg
  // Overweight: 14.1 - 22.7 kg
  // Obese: 11.3 - 19.1 kg

  let totalRecommendedMinKg = 0;
  let totalRecommendedMaxKg = 0;

  // Standard first trimester expected gain ranges (in KG)
  let firstTrimesterMin = 0.5;
  let firstTrimesterMax = 2.0;

  if (pregnancyType === "single") {
    switch (bmiCategory) {
      case "Underweight":
        totalRecommendedMinKg = 12.5;
        totalRecommendedMaxKg = 18.0;
        firstTrimesterMin = 1.0;
        firstTrimesterMax = 2.0;
        break;
      case "Normal":
        totalRecommendedMinKg = 11.5;
        totalRecommendedMaxKg = 16.0;
        firstTrimesterMin = 0.8;
        firstTrimesterMax = 2.0;
        break;
      case "Overweight":
        totalRecommendedMinKg = 7.0;
        totalRecommendedMaxKg = 11.5;
        firstTrimesterMin = 0.5;
        firstTrimesterMax = 1.5;
        break;
      case "Obese":
        totalRecommendedMinKg = 5.0;
        totalRecommendedMaxKg = 9.0;
        firstTrimesterMin = 0.5;
        firstTrimesterMax = 1.0;
        break;
    }
  } else {
    // Twin pregnancy guidelines
    switch (bmiCategory) {
      case "Underweight":
        totalRecommendedMinKg = 22.5;
        totalRecommendedMaxKg = 27.5;
        firstTrimesterMin = 1.5;
        firstTrimesterMax = 2.5;
        break;
      case "Normal":
        totalRecommendedMinKg = 16.8;
        totalRecommendedMaxKg = 24.5;
        firstTrimesterMin = 1.2;
        firstTrimesterMax = 2.5;
        break;
      case "Overweight":
        totalRecommendedMinKg = 14.1;
        totalRecommendedMaxKg = 22.7;
        firstTrimesterMin = 0.8;
        firstTrimesterMax = 2.0;
        break;
      case "Obese":
        totalRecommendedMinKg = 11.3;
        totalRecommendedMaxKg = 19.1;
        firstTrimesterMin = 0.5;
        firstTrimesterMax = 1.5;
        break;
    }
  }

  // 3. Compute non-linear expected gain ranges for the current week
  // Total term is 40 weeks, cap progress calculations at week 40 to represent full-term targets.
  const effectiveWeek = Math.min(currentWeek, 40);

  let expectedMinKg = 0;
  let expectedMaxKg = 0;

  if (effectiveWeek <= 12) {
    // Linear progression during the first trimester (weeks 1 to 12) from 0 to firstTrimester limits
    expectedMinKg = firstTrimesterMin * (effectiveWeek / 12);
    expectedMaxKg = firstTrimesterMax * (effectiveWeek / 12);
  } else {
    // Second & Third trimesters: constant weekly gain rate
    const rateMin = (totalRecommendedMinKg - firstTrimesterMin) / 28;
    const rateMax = (totalRecommendedMaxKg - firstTrimesterMax) / 28;
    const extraWeeks = effectiveWeek - 12;

    expectedMinKg = firstTrimesterMin + rateMin * extraWeeks;
    expectedMaxKg = firstTrimesterMax + rateMax * extraWeeks;
  }

  // Calculate actual weight change
  const currentWeightKg = weightUnit === "lb" ? currentWeight * 0.45359237 : currentWeight;
  const prePregnancyWeightKg = weightUnit === "lb" ? prePregnancyWeight * 0.45359237 : prePregnancyWeight;
  const actualGainKg = currentWeightKg - prePregnancyWeightKg;

  // Convert all results to pounds (lb) as well
  const totalGainedKg = actualGainKg;
  const totalGainedLb = actualGainKg / 0.45359237;

  const expectedMinLb = expectedMinKg / 0.45359237;
  const expectedMaxLb = expectedMaxKg / 0.45359237;

  const totalRecommendedMinLb = totalRecommendedMinKg / 0.45359237;
  const totalRecommendedMaxLb = totalRecommendedMaxKg / 0.45359237;

  // Determine status (use small tolerance of 0.1 kg to avoid hyper-sensitivity)
  let status: "below" | "within" | "above" = "within";
  if (actualGainKg < expectedMinKg - 0.1) {
    status = "below";
  } else if (actualGainKg > expectedMaxKg + 0.1) {
    status = "above";
  }

  // 4. Generate highly supportive, calm, non-judgmental feedback messaging
  let message = "";

  if (currentWeek <= 4) {
    message = "You are in the very early weeks of your pregnancy. At this stage, physical weight changes are typically minimal, and keeping hydrated and resting is the primary focus. Your body is doing incredible foundational work.";
  } else if (actualGainKg < 0) {
    message = "It is very common and normal to experience early weight loss, particularly in the first trimester due to morning sickness, nausea, or a changing appetite. If you are struggling to keep food or fluids down, please discuss this with your doctor or midwife at your next appointment.";
  } else {
    switch (status) {
      case "below":
        message = "Your current weight gain is slightly below the general guidelines for this week. This is extremely common, especially if you have experienced morning sickness, food aversions, or are in the earlier half of your pregnancy. Every body progresses differently — mention this at your next prenatal checkup so your healthcare provider can provide personalized support.";
        break;
      case "within":
        message = "Your weight gain is within the standard recommended range for this stage of your pregnancy. This suggests steady, gradual progress aligned with typical biological patterns. Remember that these ranges are supportive guidelines, not strict metrics.";
        break;
      case "above":
        message = "Your weight gain is slightly above the general guidelines for this week. It is completely normal for weight gain to occur in sudden growth spurts rather than a perfect line. Hormonal changes, fluid retention, and your baby's growth timing all play a role. There is no need for worry or restrictive dieting — simply mention it to your healthcare team at your next visit.";
        break;
    }
  }

  return {
    bmi: parseFloat(bmi.toFixed(1)),
    bmiCategory,
    totalGainedKg: parseFloat(totalGainedKg.toFixed(2)),
    totalGainedLb: parseFloat(totalGainedLb.toFixed(2)),
    expectedMinKg: parseFloat(expectedMinKg.toFixed(2)),
    expectedMaxKg: parseFloat(expectedMaxKg.toFixed(2)),
    expectedMinLb: parseFloat(expectedMinLb.toFixed(2)),
    expectedMaxLb: parseFloat(expectedMaxLb.toFixed(2)),
    totalRecommendedMinKg: parseFloat(totalRecommendedMinKg.toFixed(1)),
    totalRecommendedMaxKg: parseFloat(totalRecommendedMaxKg.toFixed(1)),
    totalRecommendedMinLb: parseFloat(totalRecommendedMinLb.toFixed(1)),
    totalRecommendedMaxLb: parseFloat(totalRecommendedMaxLb.toFixed(1)),
    status,
    message,
  };
}

export function getPregnancyWeightExplanationSteps(
  params: PregnancyCalculatorParams,
  result: PregnancyCalculatorResult
): string[] {
  const steps: string[] = [];
  const { prePregnancyWeight, currentWeight, weightUnit, currentWeek, pregnancyType } = params;

  steps.push(`Calculate pre-pregnancy baseline BMI: ${result.bmi} BMI falls into the '${result.bmiCategory}' category`);

  const unitLabel = weightUnit === "lb" ? "lbs" : "kg";
  const gained = weightUnit === "lb" ? result.totalGainedLb : result.totalGainedKg;
  const targetMin = weightUnit === "lb" ? result.expectedMinLb : result.expectedMinKg;
  const targetMax = weightUnit === "lb" ? result.expectedMaxLb : result.expectedMaxKg;
  const totalMin = weightUnit === "lb" ? result.totalRecommendedMinLb : result.totalRecommendedMinKg;
  const totalMax = weightUnit === "lb" ? result.totalRecommendedMaxLb : result.totalRecommendedMaxKg;

  steps.push(`Calculate actual weight gained so far: ${currentWeight} ${unitLabel} (current) - ${prePregnancyWeight} ${unitLabel} (pre-pregnancy) = ${gained.toFixed(1)} ${unitLabel} gained at Week ${currentWeek}`);

  steps.push(`Apply IOM Guidelines (${pregnancyType === "single" ? "Single Baby" : "Twins"}, ${result.bmiCategory}): Total recommended 40-week gain range is ${totalMin} to ${totalMax} ${unitLabel}`);

  steps.push(`Calculate week-specific target range for Week ${currentWeek}: Ideal target range is ${targetMin.toFixed(1)} to ${targetMax.toFixed(1)} ${unitLabel}`);

  steps.push(`Status assessment: Your current gain of ${gained.toFixed(1)} ${unitLabel} is ${result.status === "within" ? "within" : result.status === "below" ? "slightly below" : "slightly above"} the recommended range for Week ${currentWeek}`);

  return steps;
}
