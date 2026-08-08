import { checkRateLimit, handleOptions, jsonResponse } from "@/lib/rateLimit";
import { calculateLoan } from "@/lib/calculators/loanCalculator";

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

  const principal = parseFloat(searchParams.get("principal") || searchParams.get("amount") || "");
  const annualRate = parseFloat(searchParams.get("annualRate") || searchParams.get("rate") || "");
  const tenure = parseFloat(searchParams.get("tenure") || searchParams.get("years") || searchParams.get("months") || "");
  const tenureUnit = (searchParams.get("tenureUnit") || (searchParams.has("months") ? "months" : "years")) as "years" | "months";

  if (isNaN(principal) || principal <= 0 || isNaN(annualRate) || annualRate < 0 || isNaN(tenure) || tenure <= 0) {
    return jsonResponse(
      {
        success: false,
        error: {
          code: "INVALID_PARAMETERS",
          message: "Please provide valid numbers for 'principal', 'annualRate' (e.g. 7.5), and 'tenure'.",
          example: "/api/v1/loan?principal=250000&annualRate=6.5&tenure=30&tenureUnit=years",
        },
      },
      400,
      headers
    );
  }

  const result = calculateLoan({
    principal,
    annualRate,
    tenure,
    tenureUnit,
  });

  return jsonResponse(
    {
      success: true,
      data: {
        monthlyEMI: parseFloat(result.monthlyEMI.toFixed(2)),
        totalPayment: parseFloat(result.totalPayment.toFixed(2)),
        totalInterestPayable: parseFloat(result.totalInterestPayable.toFixed(2)),
        amortizationSummary: result.amortizationTable.map((y) => ({
          yearNumber: y.yearNumber,
          startingBalance: parseFloat(y.startingBalance.toFixed(2)),
          principalPaid: parseFloat(y.principalPaid.toFixed(2)),
          interestPaid: parseFloat(y.interestPaid.toFixed(2)),
          endingBalance: parseFloat(y.endingBalance.toFixed(2)),
        })),
        inputs: {
          principal,
          annualRate,
          tenure,
          tenureUnit,
        },
      },
      meta: {
        formula: "EMI = P × [r(1+r)ⁿ] / [(1+r)ⁿ - 1]",
        standard: "Reducing-Balance Compound Interest Amortization",
        privacy: "100% Stateless & Private — No data logged",
        timestamp: new Date().toISOString(),
      },
    },
    200,
    headers
  );
}
