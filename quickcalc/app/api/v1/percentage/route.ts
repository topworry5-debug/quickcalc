import { checkRateLimit, handleOptions, jsonResponse } from "@/lib/rateLimit";
import {
  calculateXPercentOfY,
  calculatePercentageChange,
  calculateDiscount
} from "@/lib/calculators/percentageCalculator";

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
  const type = searchParams.get("type") || "of";

  if (type === "of") {
    const percent = parseFloat(searchParams.get("percent") || searchParams.get("x") || "");
    const total = parseFloat(searchParams.get("total") || searchParams.get("y") || "");

    if (isNaN(percent) || isNaN(total)) {
      return jsonResponse(
        {
          success: false,
          error: {
            code: "INVALID_PARAMETERS",
            message: "Missing 'percent' (x) or 'total' (y) parameters.",
            example: "/api/v1/percentage?type=of&percent=20&total=150",
          },
        },
        400,
        headers
      );
    }

    const result = calculateXPercentOfY(percent, total);
    return jsonResponse(
      {
        success: true,
        data: {
          type: "percent_of_total",
          result: parseFloat(result.result.toFixed(4)),
          inputs: { percent, total },
        },
        meta: {
          formula: result.formula,
          privacy: "100% Stateless & Private",
          timestamp: new Date().toISOString(),
        },
      },
      200,
      headers
    );
  }

  if (type === "change") {
    const initial = parseFloat(searchParams.get("initial") || searchParams.get("v1") || searchParams.get("from") || "");
    const finalVal = parseFloat(searchParams.get("final") || searchParams.get("v2") || searchParams.get("to") || "");

    if (isNaN(initial) || isNaN(finalVal)) {
      return jsonResponse(
        {
          success: false,
          error: {
            code: "INVALID_PARAMETERS",
            message: "Missing 'initial' (v1) or 'final' (v2) parameters.",
            example: "/api/v1/percentage?type=change&initial=100&final=125",
          },
        },
        400,
        headers
      );
    }

    const result = calculatePercentageChange(initial, finalVal);
    return jsonResponse(
      {
        success: true,
        data: {
          type: "percentage_change",
          percentChange: parseFloat(result.percentChange.toFixed(4)),
          direction: result.direction,
          difference: parseFloat(result.difference.toFixed(4)),
          inputs: { initial, final: finalVal },
        },
        meta: {
          formula: result.formula,
          privacy: "100% Stateless & Private",
          timestamp: new Date().toISOString(),
        },
      },
      200,
      headers
    );
  }

  if (type === "discount") {
    const price = parseFloat(searchParams.get("price") || searchParams.get("original") || "");
    const discount = parseFloat(searchParams.get("discount") || searchParams.get("percent") || "");

    if (isNaN(price) || isNaN(discount)) {
      return jsonResponse(
        {
          success: false,
          error: {
            code: "INVALID_PARAMETERS",
            message: "Missing 'price' and 'discount' parameters.",
            example: "/api/v1/percentage?type=discount&price=80&discount=25",
          },
        },
        400,
        headers
      );
    }

    const result = calculateDiscount(price, discount);
    return jsonResponse(
      {
        success: true,
        data: {
          type: "percentage_discount",
          finalPrice: parseFloat(result.finalPrice.toFixed(2)),
          amountSaved: parseFloat(result.amountSaved.toFixed(2)),
          inputs: { price, discountPercent: discount },
        },
        meta: {
          formula: result.formula,
          privacy: "100% Stateless & Private",
          timestamp: new Date().toISOString(),
        },
      },
      200,
      headers
    );
  }

  if (type === "proportion" || type === "is_what_of") {
    const part = parseFloat(searchParams.get("part") || searchParams.get("x") || "");
    const whole = parseFloat(searchParams.get("whole") || searchParams.get("y") || "");

    if (isNaN(part) || isNaN(whole) || whole === 0) {
      return jsonResponse(
        {
          success: false,
          error: {
            code: "INVALID_PARAMETERS",
            message: "Missing 'part' (x) or 'whole' (y) parameters.",
            example: "/api/v1/percentage?type=proportion&part=40&whole=200",
          },
        },
        400,
        headers
      );
    }

    const percentage = (part / whole) * 100;
    return jsonResponse(
      {
        success: true,
        data: {
          type: "part_is_what_percent_of_whole",
          percentage: parseFloat(percentage.toFixed(4)),
          inputs: { part, whole },
        },
        meta: {
          formula: `Percentage = (${part} / ${whole}) * 100 = ${percentage.toFixed(4)}%`,
          privacy: "100% Stateless & Private",
          timestamp: new Date().toISOString(),
        },
      },
      200,
      headers
    );
  }

  return jsonResponse(
    {
      success: false,
      error: {
        code: "UNSUPPORTED_TYPE",
        message: "Supported percentage types: 'of', 'change', 'discount', 'proportion'.",
      },
    },
    400,
    headers
  );
}
