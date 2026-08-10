/**
 * aiTokenCost.ts — AI Model Token Pricing & Request Cost Calculations
 */

export interface AIModel {
  id: string;
  name: string;
  provider: string; // "OpenAI" | "Anthropic" | "Google" | "DeepSeek" | "Custom"
  inputCostPerM: number;  // USD per 1M input tokens
  outputCostPerM: number; // USD per 1M output tokens
  contextWindow: string;  // e.g. "128k"
  popular?: boolean;
}

export const AI_MODELS: AIModel[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    inputCostPerM: 2.50,
    outputCostPerM: 10.00,
    contextWindow: "128k",
    popular: true,
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    provider: "OpenAI",
    inputCostPerM: 0.15,
    outputCostPerM: 0.60,
    contextWindow: "128k",
    popular: true,
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    inputCostPerM: 3.00,
    outputCostPerM: 15.00,
    contextWindow: "200k",
    popular: true,
  },
  {
    id: "claude-3-5-haiku",
    name: "Claude 3.5 Haiku",
    provider: "Anthropic",
    inputCostPerM: 0.80,
    outputCostPerM: 4.00,
    contextWindow: "200k",
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "Anthropic",
    inputCostPerM: 15.00,
    outputCostPerM: 75.00,
    contextWindow: "200k",
  },
  {
    id: "gemini-1-5-flash",
    name: "Gemini 1.5 Flash",
    provider: "Google",
    inputCostPerM: 0.075,
    outputCostPerM: 0.30,
    contextWindow: "1M",
    popular: true,
  },
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    inputCostPerM: 1.25,
    outputCostPerM: 5.00,
    contextWindow: "2M",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    provider: "DeepSeek",
    inputCostPerM: 0.14,
    outputCostPerM: 0.28,
    contextWindow: "64k",
    popular: true,
  },
  {
    id: "custom",
    name: "Custom Rates",
    provider: "Custom",
    inputCostPerM: 1.00,
    outputCostPerM: 3.00,
    contextWindow: "Custom",
  },
];

export interface ModelComparisonResult {
  modelId: string;
  modelName: string;
  provider: string;
  inputCostPerM: number;
  outputCostPerM: number;
  costPerRequest: number;
  monthlyCost: number;
  costPer1kRequests: number;
  savingsVsBaselinePercent?: number; // % difference vs selected model
}

export interface TokenCostResult {
  selectedModel: AIModel;
  inputTokens: number;
  outputTokens: number;
  totalTokensPerRequest: number;
  requestsPerDay: number;
  requestsPerMonth: number;
  
  // Single Request Costs
  inputCostPerRequest: number;
  outputCostPerRequest: number;
  costPerRequest: number;

  // Monthly Costs
  monthlyInputCost: number;
  monthlyOutputCost: number;
  monthlyTotalCost: number;
  annualTotalCost: number;

  // Cost per 1K requests
  costPer1kRequests: number;

  // Comparison across top models
  comparisons: ModelComparisonResult[];
}

/**
 * Estimate token count from word count (~0.75 words per token -> tokens = words / 0.75)
 */
export function estimateTokensFromWords(wordCount: number): number {
  if (wordCount <= 0) return 0;
  return Math.round(wordCount / 0.75);
}

/**
 * Estimate words from raw text string
 */
export function countWordsFromText(text: string): number {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Format currency to 4 or 6 decimal places for small token costs
 */
export function formatCurrencyDetailed(amount: number): string {
  if (amount === 0) return "$0.00";
  if (amount < 0.01) {
    return `$${amount.toFixed(5)}`;
  }
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}`;
}

/**
 * Format standard currency ($X,XXX.XX)
 */
export function formatCurrencyStandard(amount: number): string {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Calculate AI token cost & side-by-side model comparison
 */
export function calculateTokenCost(
  modelId: string,
  inputTokens: number,
  outputTokens: number,
  requestsPerDay: number,
  customInputRate: number = 1.00,
  customOutputRate: number = 3.00
): TokenCostResult {
  const baseModel = AI_MODELS.find((m) => m.id === modelId) || AI_MODELS[0];
  
  const effectiveModel: AIModel = modelId === "custom"
    ? {
        ...baseModel,
        inputCostPerM: customInputRate,
        outputCostPerM: customOutputRate,
      }
    : baseModel;

  const validInputs = Math.max(0, inputTokens);
  const validOutputs = Math.max(0, outputTokens);
  const validReqsPerDay = Math.max(0, requestsPerDay);
  const validReqsPerMonth = validReqsPerDay * 30;

  // Single request cost
  const inputCostPerRequest = (validInputs / 1_000_000) * effectiveModel.inputCostPerM;
  const outputCostPerRequest = (validOutputs / 1_000_000) * effectiveModel.outputCostPerM;
  const costPerRequest = inputCostPerRequest + outputCostPerRequest;

  // Monthly cost
  const monthlyInputCost = inputCostPerRequest * validReqsPerMonth;
  const monthlyOutputCost = outputCostPerRequest * validReqsPerMonth;
  const monthlyTotalCost = costPerRequest * validReqsPerMonth;
  const annualTotalCost = monthlyTotalCost * 12;

  const costPer1kRequests = costPerRequest * 1000;

  // Side-by-side comparison across all models
  const comparisons: ModelComparisonResult[] = AI_MODELS.filter((m) => m.id !== "custom").map((m) => {
    const inCost = (validInputs / 1_000_000) * m.inputCostPerM;
    const outCost = (validOutputs / 1_000_000) * m.outputCostPerM;
    const reqCost = inCost + outCost;
    const mCost = reqCost * validReqsPerMonth;
    const kCost = reqCost * 1000;

    let savingsVsBaselinePercent = 0;
    if (costPerRequest > 0) {
      savingsVsBaselinePercent = ((costPerRequest - reqCost) / costPerRequest) * 100;
    }

    return {
      modelId: m.id,
      modelName: m.name,
      provider: m.provider,
      inputCostPerM: m.inputCostPerM,
      outputCostPerM: m.outputCostPerM,
      costPerRequest: reqCost,
      monthlyCost: mCost,
      costPer1kRequests: kCost,
      savingsVsBaselinePercent,
    };
  });

  return {
    selectedModel: effectiveModel,
    inputTokens: validInputs,
    outputTokens: validOutputs,
    totalTokensPerRequest: validInputs + validOutputs,
    requestsPerDay: validReqsPerDay,
    requestsPerMonth: validReqsPerMonth,
    inputCostPerRequest,
    outputCostPerRequest,
    costPerRequest,
    monthlyInputCost,
    monthlyOutputCost,
    monthlyTotalCost,
    annualTotalCost,
    costPer1kRequests,
    comparisons,
  };
}

export function getTokenCostExplanationSteps(result: TokenCostResult): string[] {
  return [
    `Model & Token Configuration: Target model ${result.selectedModel.name} (${result.selectedModel.provider}) with $${result.selectedModel.inputCostPerM}/1M input tokens and $${result.selectedModel.outputCostPerM}/1M output tokens.`,
    `Single Request Cost Math: Input cost (${result.inputTokens} tokens) = ${formatCurrencyDetailed(result.inputCostPerRequest)} + Output cost (${result.outputTokens} tokens) = ${formatCurrencyDetailed(result.outputCostPerRequest)}, totaling ${formatCurrencyDetailed(result.costPerRequest)} per call.`,
    `Monthly Volume Projection: At ${result.requestsPerDay.toLocaleString()} requests/day (${result.requestsPerMonth.toLocaleString()} requests/month), projected monthly spend is ${formatCurrencyStandard(result.monthlyTotalCost)} (${formatCurrencyStandard(result.annualTotalCost)}/year).`,
    "Word-to-Token Approximation: Token counts reflect the standard ~0.75 words per token conversion (or ~1.33 tokens per word) commonly observed across English natural language prompts.",
  ];
}
