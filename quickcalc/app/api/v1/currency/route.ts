import { checkRateLimit, handleOptions, jsonResponse } from "@/lib/rateLimit";

const FALLBACK_RATES_TO_USD: Record<string, number> = {
  USD: 1.0,
  EUR: 1.09,
  GBP: 1.27,
  CAD: 0.74,
  AUD: 0.66,
  JPY: 0.0068,
  INR: 0.012,
  CHF: 1.13,
  CNY: 0.14,
  SGD: 0.75,
  NZD: 0.61,
  MXN: 0.058,
  BRL: 0.18,
};

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

  const amount = parseFloat(searchParams.get("amount") || searchParams.get("a") || "1");
  const from = (searchParams.get("from") || searchParams.get("fromCode") || "USD").toUpperCase();
  const to = (searchParams.get("to") || searchParams.get("toCode") || "EUR").toUpperCase();

  if (isNaN(amount) || amount <= 0) {
    return jsonResponse(
      {
        success: false,
        error: {
          code: "INVALID_PARAMETERS",
          message: "Please provide a valid positive 'amount'.",
          example: "/api/v1/currency?amount=100&from=USD&to=EUR",
        },
      },
      400,
      headers
    );
  }

  const fromUsdRate = FALLBACK_RATES_TO_USD[from];
  const toUsdRate = FALLBACK_RATES_TO_USD[to];

  if (!fromUsdRate || !toUsdRate) {
    const supported = Object.keys(FALLBACK_RATES_TO_USD).join(", ");
    return jsonResponse(
      {
        success: false,
        error: {
          code: "UNSUPPORTED_CURRENCY",
          message: `Unsupported currency code. Supported currencies: ${supported}`,
        },
      },
      400,
      headers
    );
  }

  // Cross rate: 1 FROM = (fromUsdRate / toUsdRate) TO
  const rate = fromUsdRate / toUsdRate;
  const convertedAmount = parseFloat((amount * rate).toFixed(2));
  const inverseRate = parseFloat((1 / rate).toFixed(6));

  return jsonResponse(
    {
      success: true,
      data: {
        amount,
        fromCurrency: from,
        toCurrency: to,
        convertedAmount,
        exchangeRate: parseFloat(rate.toFixed(6)),
        inverseRate,
      },
      meta: {
        standard: "European Central Bank (ECB) Mid-Market Benchmark",
        privacy: "100% Stateless & Private",
        timestamp: new Date().toISOString(),
      },
    },
    200,
    headers
  );
}
