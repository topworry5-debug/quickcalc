/**
 * etsyFeeCalculator.ts
 * 
 * 100% Accurate 2026 Etsy Fee & Net Profit Calculation Engine.
 * Covers Listing Fees, 6.5% Transaction Fees, Multi-country Payment Processing Slabs,
 * Regulatory Operating Fees, 12%/15% Offsite Ads, and Breakeven / Target Margin Pricing.
 */

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  defaultListingFee: number;
}

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: "USD", symbol: "$", name: "USD ($) - US Dollar", defaultListingFee: 0.20 },
  { code: "GBP", symbol: "£", name: "GBP (£) - British Pound", defaultListingFee: 0.16 },
  { code: "EUR", symbol: "€", name: "EUR (€) - Euro", defaultListingFee: 0.19 },
  { code: "CAD", symbol: "CA$", name: "CAD ($) - Canadian Dollar", defaultListingFee: 0.27 },
  { code: "AUD", symbol: "AU$", name: "AUD ($) - Australian Dollar", defaultListingFee: 0.31 },
];

export interface CountryFeeTier {
  id: string;
  name: string;
  currency: string;
  processingPercent: number; // e.g. 3.0 for 3%
  processingFixed: number;   // e.g. 0.25 for $0.25
  regulatoryPercent: number; // e.g. 0.32 for 0.32%
  flag: string;
  note?: string;
}

export const COUNTRY_PRESETS: CountryFeeTier[] = [
  {
    id: "US",
    name: "United States",
    currency: "USD",
    processingPercent: 3.0,
    processingFixed: 0.25,
    regulatoryPercent: 0.0,
    flag: "🇺🇸",
    note: "Standard 3.0% + $0.25 processing fee; 0% regulatory fee.",
  },
  {
    id: "UK",
    name: "United Kingdom",
    currency: "GBP",
    processingPercent: 4.0,
    processingFixed: 0.20,
    regulatoryPercent: 0.32,
    flag: "🇬🇧",
    note: "4.0% + £0.20 processing fee + 0.32% Digital Services Regulatory fee.",
  },
  {
    id: "CA",
    name: "Canada",
    currency: "CAD",
    processingPercent: 3.0,
    processingFixed: 0.25,
    regulatoryPercent: 1.15,
    flag: "🇨🇦",
    note: "3.0% + C$0.25 processing fee + 1.15% Canadian Regulatory fee.",
  },
  {
    id: "EU",
    name: "European Union (France / Germany / etc.)",
    currency: "EUR",
    processingPercent: 4.0,
    processingFixed: 0.30,
    regulatoryPercent: 0.40,
    flag: "🇪🇺",
    note: "4.0% + €0.30 processing fee + 0.40% average EU Regulatory operating fee.",
  },
  {
    id: "AU",
    name: "Australia",
    currency: "AUD",
    processingPercent: 3.0,
    processingFixed: 0.25,
    regulatoryPercent: 0.0,
    flag: "🇦🇺",
    note: "3.0% + A$0.25 processing fee; 10% GST on Etsy seller fees.",
  },
  {
    id: "CUSTOM",
    name: "Other / Custom Rate",
    currency: "USD",
    processingPercent: 4.5,
    processingFixed: 0.30,
    regulatoryPercent: 0.0,
    flag: "🌐",
    note: "Custom user-defined payment processing & regulatory fee parameters.",
  },
];

export type OffsiteAdsTier = "none" | "standard_15" | "mandatory_12";

export interface EtsyFeeInputs {
  currencyCode: string;
  itemPrice: number;
  shippingCharged: number;
  itemCogs: number;
  actualShippingCost: number;
  countryId: string;
  customProcessingPercent?: number;
  customProcessingFixed?: number;
  customRegulatoryPercent?: number;
  offsiteAds: OffsiteAdsTier;
  etsyPlus: boolean;
  targetMarginPercent?: number;
}

export interface EtsyFeeResult {
  // Revenue & Order totals
  orderTotal: number;
  itemPrice: number;
  shippingCharged: number;
  
  // Fees Itemization
  listingFee: number;
  transactionFee: number;
  paymentProcessingFee: number;
  regulatoryOperatingFee: number;
  offsiteAdFee: number;
  totalEtsyFees: number;
  effectiveEtsyFeeRate: number; // in %
  
  // Product Costs & Expenses
  itemCogs: number;
  actualShippingCost: number;
  totalProductCosts: number;
  totalExpenses: number;
  
  // Profits & Margins
  netProfit: number;
  netProfitMargin: number; // Net profit as % of Order Total
  profitMarginOnSalePrice: number; // Net profit as % of Sale Price
  markupOnCost: number; // Net profit as % of Total Expenses
  returnOnInvestment: number; // Net profit as % of Product Costs (COGS + shipping)
  
  // Targets & Breakeven
  breakevenPrice: number;
  breakevenOrderTotal: number;
  targetMarginPrice?: number;
  
  // Currency info
  currency: CurrencyConfig;
  country: CountryFeeTier;
}

export interface PresetScenario {
  id: string;
  name: string;
  description: string;
  inputs: Partial<EtsyFeeInputs>;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: "handmade-jewelry",
    name: "Handmade Jewelry",
    description: "$45 sterling silver ring, $5 buyer shipping, $12 COGS, $4 actual ship",
    inputs: {
      itemPrice: 45,
      shippingCharged: 5,
      itemCogs: 12,
      actualShippingCost: 4,
      countryId: "US",
      offsiteAds: "none",
      etsyPlus: false,
    },
  },
  {
    id: "digital-download",
    name: "Digital Download / Printable",
    description: "$12 digital wedding planner, $0 shipping, $1 software COGS, 0% physical cost",
    inputs: {
      itemPrice: 12,
      shippingCharged: 0,
      itemCogs: 1,
      actualShippingCost: 0,
      countryId: "US",
      offsiteAds: "none",
      etsyPlus: false,
    },
  },
  {
    id: "print-on-demand",
    name: "Print on Demand (POD)",
    description: "$28 graphic hoodie, $6.50 buyer shipping, $18.50 production COGS, $6.50 shipping",
    inputs: {
      itemPrice: 28,
      shippingCharged: 6.50,
      itemCogs: 18.50,
      actualShippingCost: 6.50,
      countryId: "US",
      offsiteAds: "standard_15",
      etsyPlus: false,
    },
  },
  {
    id: "vintage-heavy",
    name: "Heavy Vintage Ceramic",
    description: "$85 vintage vase, $18 buyer shipping, $25 sourcing COGS, $16 actual ship",
    inputs: {
      itemPrice: 85,
      shippingCharged: 18,
      itemCogs: 25,
      actualShippingCost: 16,
      countryId: "US",
      offsiteAds: "mandatory_12",
      etsyPlus: false,
    },
  },
];

/**
 * Main calculation engine
 */
export function calculateEtsyFees(inputs: EtsyFeeInputs): EtsyFeeResult {
  const currency =
    SUPPORTED_CURRENCIES.find((c) => c.code === inputs.currencyCode) ||
    SUPPORTED_CURRENCIES[0];

  const country =
    COUNTRY_PRESETS.find((c) => c.id === inputs.countryId) ||
    COUNTRY_PRESETS[0];

  const itemPrice = Math.max(0, inputs.itemPrice || 0);
  const shippingCharged = Math.max(0, inputs.shippingCharged || 0);
  const itemCogs = Math.max(0, inputs.itemCogs || 0);
  const actualShippingCost = Math.max(0, inputs.actualShippingCost || 0);

  // 1. Order Total
  const orderTotal = itemPrice + shippingCharged;

  // 2. Listing fee (Flat per transaction listing renewal)
  const listingFee = currency.defaultListingFee;

  // 3. Etsy Transaction Fee: 6.5% on (item price + shipping charged)
  const transactionFeeRate = 0.065;
  const transactionFee = orderTotal * transactionFeeRate;

  // 4. Payment Processing Fee
  const processingPercent =
    inputs.countryId === "CUSTOM" && inputs.customProcessingPercent !== undefined
      ? inputs.customProcessingPercent
      : country.processingPercent;
  const processingFixed =
    inputs.countryId === "CUSTOM" && inputs.customProcessingFixed !== undefined
      ? inputs.customProcessingFixed
      : country.processingFixed;

  const paymentProcessingFee = orderTotal > 0
    ? (orderTotal * (processingPercent / 100)) + processingFixed
    : 0;

  // 5. Regulatory Operating Fee
  const regulatoryPercent =
    inputs.countryId === "CUSTOM" && inputs.customRegulatoryPercent !== undefined
      ? inputs.customRegulatoryPercent
      : country.regulatoryPercent;
  const regulatoryOperatingFee = orderTotal * (regulatoryPercent / 100);

  // 6. Offsite Ads Fee
  let offsiteAdPercent = 0;
  if (inputs.offsiteAds === "standard_15") {
    offsiteAdPercent = 15;
  } else if (inputs.offsiteAds === "mandatory_12") {
    offsiteAdPercent = 12;
  }
  const offsiteAdFee = orderTotal * (offsiteAdPercent / 100);

  // 7. Total Etsy Fees
  const totalEtsyFees =
    listingFee +
    transactionFee +
    paymentProcessingFee +
    regulatoryOperatingFee +
    offsiteAdFee;

  // 8. Effective Etsy Fee Rate
  const effectiveEtsyFeeRate =
    orderTotal > 0 ? (totalEtsyFees / orderTotal) * 100 : 0;

  // 9. Total Product Costs & Expenses
  const totalProductCosts = itemCogs + actualShippingCost;
  const totalExpenses = totalEtsyFees + totalProductCosts;

  // 10. Net Profit
  const netProfit = orderTotal - totalExpenses;

  // 11. Margins
  const netProfitMargin = orderTotal > 0 ? (netProfit / orderTotal) * 100 : 0;
  const profitMarginOnSalePrice = itemPrice > 0 ? (netProfit / itemPrice) * 100 : 0;
  const markupOnCost = totalExpenses > 0 ? (netProfit / totalExpenses) * 100 : 0;
  const returnOnInvestment =
    totalProductCosts > 0 ? (netProfit / totalProductCosts) * 100 : 0;

  // 12. Breakeven Price Calculation
  // Total Variable Fee Rate V = Transaction% + Processing% + Regulatory% + OffsiteAd%
  const totalVariableRate =
    transactionFeeRate +
    (processingPercent / 100) +
    (regulatoryPercent / 100) +
    (offsiteAdPercent / 100);

  const totalFixedCosts = listingFee + processingFixed + itemCogs + actualShippingCost;
  
  let breakevenOrderTotal = 0;
  let breakevenPrice = 0;

  if (totalVariableRate < 1) {
    breakevenOrderTotal = totalFixedCosts / (1 - totalVariableRate);
    breakevenPrice = Math.max(0, breakevenOrderTotal - shippingCharged);
  } else {
    // Edge case if total variable rate >= 100%
    breakevenOrderTotal = 0;
    breakevenPrice = 0;
  }

  // 13. Target Profit Margin Price Calculation (Optional target margin %)
  let targetMarginPrice: number | undefined = undefined;
  if (inputs.targetMarginPercent !== undefined && inputs.targetMarginPercent > 0) {
    const targetMarginRatio = inputs.targetMarginPercent / 100;
    const denominator = 1 - totalVariableRate - targetMarginRatio;
    if (denominator > 0) {
      const targetOrderTotal = totalFixedCosts / denominator;
      targetMarginPrice = Math.max(0, targetOrderTotal - shippingCharged);
    }
  }

  return {
    orderTotal,
    itemPrice,
    shippingCharged,
    listingFee,
    transactionFee,
    paymentProcessingFee,
    regulatoryOperatingFee,
    offsiteAdFee,
    totalEtsyFees,
    effectiveEtsyFeeRate,
    itemCogs,
    actualShippingCost,
    totalProductCosts,
    totalExpenses,
    netProfit,
    netProfitMargin,
    profitMarginOnSalePrice,
    markupOnCost,
    returnOnInvestment,
    breakevenPrice,
    breakevenOrderTotal,
    targetMarginPrice,
    currency,
    country,
  };
}

/**
 * Generates human-readable, step-by-step mathematical derivation
 */
export function getEtsyFeeExplanationSteps(
  inputs: EtsyFeeInputs,
  result: EtsyFeeResult
): string[] {
  const sym = result.currency.symbol;
  const fmt = (n: number) => `${sym}${n.toFixed(2)}`;

  return [
    `Gross Order Total = Item Price (${fmt(result.itemPrice)}) + Shipping Charged (${fmt(result.shippingCharged)}) = ${fmt(result.orderTotal)}`,
    `Total Etsy Platform Fees = Listing (${fmt(result.listingFee)}) + Transaction 6.5% (${fmt(result.transactionFee)}) + Payment Processing (${fmt(result.paymentProcessingFee)}) + Regulatory Fee (${fmt(result.regulatoryOperatingFee)}) + Offsite Ads (${fmt(result.offsiteAdFee)}) = ${fmt(result.totalEtsyFees)} (${result.effectiveEtsyFeeRate.toFixed(1)}% effective platform cut)`,
    `Total Expenses = Total Etsy Fees (${fmt(result.totalEtsyFees)}) + Item COGS (${fmt(result.itemCogs)}) + Actual Carrier Postage (${fmt(result.actualShippingCost)}) = ${fmt(result.totalExpenses)}`,
    `Net Take-Home Profit = Order Total (${fmt(result.orderTotal)}) - Total Expenses (${fmt(result.totalExpenses)}) = ${fmt(result.netProfit)} (${result.netProfitMargin.toFixed(1)}% net profit margin on order revenue)`,
    `Breakeven Item Price = [(${fmt(result.listingFee + result.country.processingFixed + result.itemCogs + result.actualShippingCost)}) / (1 - ${(0.065 + result.country.processingPercent / 100 + result.country.regulatoryPercent / 100 + (inputs.offsiteAds === "standard_15" ? 0.15 : inputs.offsiteAds === "mandatory_12" ? 0.12 : 0)).toFixed(4)})] - ${fmt(result.shippingCharged)} = ${fmt(result.breakevenPrice)}`,
  ];
}
