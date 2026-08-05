/**
 * Currency Converter Calculation Logic
 */

export interface CurrencyConversionInput {
  amount: number;
  fromCode: string;
  fromSymbol: string;
  toCode: string;
  toSymbol: string;
  exchangeRate: number; // 1 fromCode = exchangeRate toCode
  convertedAmount: number;
}

export function getCurrencyExplanationSteps(input: CurrencyConversionInput): string[] {
  const steps: string[] = [];
  const { amount, fromCode, fromSymbol, toCode, toSymbol, exchangeRate, convertedAmount } = input;

  steps.push(`Base input: ${fromSymbol}${amount.toLocaleString()} ${fromCode}`);
  steps.push(`Retrieve current exchange rate: 1 ${fromCode} = ${exchangeRate.toFixed(4)} ${toCode}`);
  steps.push(`Multiply base amount by exchange rate: ${amount.toLocaleString()} × ${exchangeRate.toFixed(4)} = ${toSymbol}${convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCode}`);
  steps.push(`Calculate reverse exchange rate: 1 ${toCode} = ${(1 / exchangeRate).toFixed(4)} ${fromCode}`);
  steps.push(`Final conversion result: ${fromSymbol}${amount.toLocaleString()} ${fromCode} equals ${toSymbol}${convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCode}`);

  return steps;
}
