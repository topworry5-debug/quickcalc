import { checkRateLimit, handleOptions, jsonResponse } from "@/lib/rateLimit";
import { calculateTip } from "@/lib/calculators/tipCalculator";

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

  const billAmount = parseFloat(searchParams.get("bill") || searchParams.get("billAmount") || "");
  const tipPercentage = parseFloat(searchParams.get("tip") || searchParams.get("tipPercentage") || "15");
  const peopleCount = parseInt(searchParams.get("people") || searchParams.get("peopleCount") || "1", 10);

  if (isNaN(billAmount) || billAmount <= 0 || isNaN(tipPercentage) || tipPercentage < 0 || isNaN(peopleCount) || peopleCount < 1) {
    return jsonResponse(
      {
        success: false,
        error: {
          code: "INVALID_PARAMETERS",
          message: "Please provide valid numbers for 'bill' (positive), 'tip' (non-negative percentage), and 'people' (integer ≥ 1).",
          example: "/api/v1/tip?bill=100&tip=18&people=4",
        },
      },
      400,
      headers
    );
  }

  const result = calculateTip({
    billAmount,
    tipPercentage,
    peopleCount,
  });

  return jsonResponse(
    {
      success: true,
      data: {
        tipAmount: parseFloat(result.tipAmount.toFixed(2)),
        totalBill: parseFloat(result.totalBill.toFixed(2)),
        tipPerPerson: parseFloat(result.tipPerPerson.toFixed(2)),
        totalPerPerson: parseFloat(result.totalPerPerson.toFixed(2)),
        inputs: {
          billAmount,
          tipPercentage,
          peopleCount,
        },
      },
      meta: {
        formula: "Tip = Bill × (Tip % / 100) | Per Person = (Bill + Tip) / Headcount",
        privacy: "100% Stateless & Private",
        timestamp: new Date().toISOString(),
      },
    },
    200,
    headers
  );
}
