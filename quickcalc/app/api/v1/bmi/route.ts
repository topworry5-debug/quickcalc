import { checkRateLimit, handleOptions, jsonResponse } from "@/lib/rateLimit";
import { calculateBMI } from "@/lib/calculators/bmiCalculator";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(req: Request) {
  const { isRateLimited, resetSeconds, headers } = checkRateLimit(req);

  if (isRateLimited) {
    return jsonResponse(
      {
        success: false,
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: `Rate limit exceeded. Maximum 60 requests per minute allowed. Try again in ${resetSeconds} seconds.`,
        },
      },
      429,
      headers
    );
  }

  const { searchParams } = new URL(req.url);

  // Parse parameters
  const weightRaw = searchParams.get("weight") || searchParams.get("w");
  const heightRaw = searchParams.get("height") || searchParams.get("heightCm") || searchParams.get("h");
  const heightFtRaw = searchParams.get("heightFt") || searchParams.get("ft");
  const heightInRaw = searchParams.get("heightIn") || searchParams.get("in");
  const unit = searchParams.get("unit") || (searchParams.get("wu") === "lb" || searchParams.get("hu") === "ft" ? "imperial" : "metric");

  const weight = parseFloat(weightRaw || "");
  const heightCm = parseFloat(heightRaw || "");
  const heightFt = parseFloat(heightFtRaw || "0");
  const heightIn = parseFloat(heightInRaw || "0");

  const isMetric = unit === "metric";
  const weightUnit = searchParams.get("weightUnit") || (isMetric ? "kg" : "lb");
  const heightUnit = searchParams.get("heightUnit") || (isMetric ? "cm" : "ft");

  // Validate inputs
  const hasValidMetricHeight = isMetric && !isNaN(heightCm) && heightCm > 0;
  const hasValidImperialHeight = !isMetric && ((!isNaN(heightFt) && heightFt > 0) || (!isNaN(heightIn) && heightIn > 0));

  if (isNaN(weight) || weight <= 0 || (!hasValidMetricHeight && !hasValidImperialHeight)) {
    return jsonResponse(
      {
        success: false,
        error: {
          code: "INVALID_PARAMETERS",
          message: "Please provide valid positive numbers for 'weight' and 'height' (or 'heightCm' / 'heightFt' & 'heightIn').",
          example: "/api/v1/bmi?weight=70&height=175&unit=metric",
        },
      },
      400,
      headers
    );
  }

  const result = calculateBMI({
    weight,
    weightUnit: weightUnit as "kg" | "lb",
    heightCm: isMetric ? heightCm : undefined,
    heightFt: !isMetric ? heightFt : undefined,
    heightIn: !isMetric ? heightIn : undefined,
    heightUnit: heightUnit as "cm" | "ft",
  });

  if (!result) {
    return jsonResponse(
      {
        success: false,
        error: {
          code: "CALCULATION_ERROR",
          message: "Could not calculate BMI with the provided parameters.",
        },
      },
      400,
      headers
    );
  }

  // Calculate healthy weight range based on height
  let heightM = 0;
  if (isMetric) {
    heightM = heightCm / 100;
  } else {
    heightM = (heightFt * 12 + heightIn) * 0.0254;
  }

  const minHealthyKg = parseFloat((18.5 * heightM * heightM).toFixed(1));
  const maxHealthyKg = parseFloat((24.9 * heightM * heightM).toFixed(1));

  return jsonResponse(
    {
      success: true,
      data: {
        bmi: result.bmi,
        category: result.category,
        healthyRange: {
          minBmi: 18.5,
          maxBmi: 24.9,
          minWeightKg: minHealthyKg,
          maxWeightKg: maxHealthyKg,
          minWeightLb: parseFloat((minHealthyKg * 2.20462).toFixed(1)),
          maxWeightLb: parseFloat((maxHealthyKg * 2.20462).toFixed(1)),
        },
        inputs: {
          weight,
          weightUnit,
          height: isMetric ? heightCm : `${heightFt}ft ${heightIn}in`,
          heightUnit,
          unitSystem: isMetric ? "metric" : "imperial",
        },
      },
      meta: {
        formula: "BMI = weight (kg) / [height (m)]²",
        standard: "World Health Organization (WHO)",
        privacy: "100% Stateless & Private — No data logged",
        timestamp: new Date().toISOString(),
      },
    },
    200,
    headers
  );
}
