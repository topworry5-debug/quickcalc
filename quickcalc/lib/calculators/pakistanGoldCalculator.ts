/**
 * pakistanGoldCalculator.ts
 * 
 * Official Pakistani Sarafa Market Gold Unit & Price Calculation Engine:
 * - Traditional Units: 1 Tola = 12 Masha = 96 Ratti = 11.6638 Grams
 * - Purity Conversions: 24K (Bullion), 22K (916 Jewelry), 21K (875), 18K (750)
 * - Making Charges (Jorai): Per Tola, Percentage, or Lump-Sum
 * - Wastage / Cut (Kass): Ratti per Tola or Percentage
 */

export type GoldKarat = 24 | 22 | 21 | 18;
export type WeightMode = "traditional" | "grams";
export type MakingChargeType = "per_tola" | "percentage" | "lump_sum";
export type WastageType = "ratti_per_tola" | "percentage";

export interface GoldCalculatorInputs {
  rate24KPerTola: number; // PKR
  karat: GoldKarat;
  weightMode: WeightMode;
  // Traditional weight
  tola: number;
  masha: number;
  ratti: number;
  // Metric weight
  grams: number;
  // Making charges
  makingChargeType: MakingChargeType;
  makingChargeValue: number; // PKR per tola, %, or lump sum PKR
  // Wastage (Kass)
  wastageType: WastageType;
  wastageValue: number; // Ratti per tola or %
}

export interface WeightBreakdown {
  totalTolas: number;
  totalGrams: number;
  tolaInt: number;
  mashaInt: number;
  rattiDecimal: number;
  totalOunces: number; // Troy Ounces
}

export interface GoldPriceBreakdown {
  rate24KPerTola: number;
  purityRatePerTola: number; // Karat rate per tola
  ratePerGram: number; // Karat rate per gram
  baseGoldCost: number; // Gold without wastage or making charges
  wastageTolas: number;
  wastageCost: number;
  effectiveGoldCostWithWastage: number;
  makingChargesTotal: number;
  netTotalPrice: number; // PKR
  effectivePricePerTola: number; // With making & wastage
  effectivePricePerGram: number; // With making & wastage
}

export interface GoldCalculatorResult {
  weights: WeightBreakdown;
  pricing: GoldPriceBreakdown;
  karat: GoldKarat;
  purityPercentage: number;
  karatLabel: string;
}

export interface GoldPreset {
  id: string;
  name: string;
  description: string;
  inputs: Partial<GoldCalculatorInputs>;
}

export const TOLA_TO_GRAMS = 11.6638;
export const TROY_OUNCE_TO_GRAMS = 31.1035;

export const KARAT_DETAILS: Record<GoldKarat, { label: string; purityPercent: number; description: string }> = {
  24: {
    label: "24K (999 Pure Bullion)",
    purityPercent: 100,
    description: "Pure 99.9% fine gold bar/coin used for investment.",
  },
  22: {
    label: "22K / 916 (Standard Jewelry)",
    purityPercent: 91.67,
    description: "Standard 91.6% hallmark jewelry alloyed for durability.",
  },
  21: {
    label: "21K / 875 (Middle East / Gulf)",
    purityPercent: 87.50,
    description: "Popular Arabic & Gulf import jewelry standard (87.5%).",
  },
  18: {
    label: "18K / 750 (Diamond Setting)",
    purityPercent: 75.00,
    description: "Stronger 75% gold alloy ideal for diamond and stone settings.",
  },
};

export const GOLD_PRESETS: GoldPreset[] = [
  {
    id: "1-tola-22k-ring",
    name: "1 Tola 22K Ring (1T 0M 0R)",
    description: "Standard 1 Tola Pakistani 22K gold jewelry ring.",
    inputs: {
      rate24KPerTola: 285000,
      karat: 22,
      weightMode: "traditional",
      tola: 1,
      masha: 0,
      ratti: 0,
      makingChargeType: "per_tola",
      makingChargeValue: 6000,
      wastageType: "ratti_per_tola",
      wastageValue: 0,
    },
  },
  {
    id: "bridal-necklace-set",
    name: "Bridal Set (4 Tola 6 Masha)",
    description: "Heavy Pakistani bridal necklace & earring set with making charges.",
    inputs: {
      rate24KPerTola: 285000,
      karat: 22,
      weightMode: "traditional",
      tola: 4,
      masha: 6,
      ratti: 0,
      makingChargeType: "per_tola",
      makingChargeValue: 8500,
      wastageType: "ratti_per_tola",
      wastageValue: 1.5,
    },
  },
  {
    id: "gold-bangle-pair",
    name: "Pair of Bangles (2 Tola 4 M)",
    description: "Standard 22K gold kada/bangle pair.",
    inputs: {
      rate24KPerTola: 285000,
      karat: 22,
      weightMode: "traditional",
      tola: 2,
      masha: 4,
      ratti: 0,
      makingChargeType: "percentage",
      makingChargeValue: 4,
      wastageType: "ratti_per_tola",
      wastageValue: 0,
    },
  },
  {
    id: "10g-bullion-bar",
    name: "10 Grams 24K Bar",
    description: "Standard 10g 24K pure gold investment biscuit.",
    inputs: {
      rate24KPerTola: 285000,
      karat: 24,
      weightMode: "grams",
      grams: 10,
      makingChargeType: "lump_sum",
      makingChargeValue: 1500,
      wastageType: "percentage",
      wastageValue: 0,
    },
  },
];

export function calculatePakistanGold(inputs: GoldCalculatorInputs): GoldCalculatorResult {
  const rate24K = Math.max(1000, inputs.rate24KPerTola || 285000);
  const karat = inputs.karat || 22;

  // 1. Calculate Total Weight in Tolas & Grams
  let totalTolas = 0;
  let totalGrams = 0;

  if (inputs.weightMode === "traditional") {
    const tola = Math.max(0, inputs.tola || 0);
    const masha = Math.max(0, inputs.masha || 0);
    const ratti = Math.max(0, inputs.ratti || 0);

    totalTolas = tola + (masha / 12) + (ratti / 96);
    totalGrams = totalTolas * TOLA_TO_GRAMS;
  } else {
    totalGrams = Math.max(0, inputs.grams || 0);
    totalTolas = totalGrams / TOLA_TO_GRAMS;
  }

  // Decompose totalTolas back into exact Tola, Masha, Ratti
  const tolaInt = Math.floor(totalTolas);
  const remainderTola = totalTolas - tolaInt;
  const totalMasha = remainderTola * 12;
  const mashaInt = Math.floor(totalMasha);
  const remainderMasha = totalMasha - mashaInt;
  const rattiDecimal = Number((remainderMasha * 8).toFixed(2));

  const totalOunces = totalGrams / TROY_OUNCE_TO_GRAMS;

  // 2. Karat Purity Price Calculations
  const purityMultiplier = karat / 24;
  const purityRatePerTola = Math.round(rate24K * purityMultiplier);
  const ratePerGram = Number((purityRatePerTola / TOLA_TO_GRAMS).toFixed(2));

  // 3. Base Gold Cost
  const baseGoldCost = Math.round(totalTolas * purityRatePerTola);

  // 4. Wastage (Kass) Calculation
  let wastageTolas = 0;
  if (inputs.wastageType === "ratti_per_tola") {
    // Ratti per tola: e.g. 1 Ratti per tola = (1 / 96) of tola per tola
    const rattiPerTola = Math.max(0, inputs.wastageValue || 0);
    wastageTolas = totalTolas * (rattiPerTola / 96);
  } else {
    const wastagePercent = Math.max(0, inputs.wastageValue || 0);
    wastageTolas = totalTolas * (wastagePercent / 100);
  }
  const wastageCost = Math.round(wastageTolas * purityRatePerTola);
  const effectiveGoldCostWithWastage = baseGoldCost + wastageCost;

  // 5. Making Charges (Jorai) Calculation
  let makingChargesTotal = 0;
  if (inputs.makingChargeType === "per_tola") {
    const perTolaRate = Math.max(0, inputs.makingChargeValue || 0);
    makingChargesTotal = Math.round(perTolaRate * totalTolas);
  } else if (inputs.makingChargeType === "percentage") {
    const percent = Math.max(0, inputs.makingChargeValue || 0);
    makingChargesTotal = Math.round(baseGoldCost * (percent / 100));
  } else {
    makingChargesTotal = Math.round(Math.max(0, inputs.makingChargeValue || 0));
  }

  // 6. Net Total Price
  const netTotalPrice = effectiveGoldCostWithWastage + makingChargesTotal;
  const effectivePricePerTola = totalTolas > 0 ? Math.round(netTotalPrice / totalTolas) : 0;
  const effectivePricePerGram = totalGrams > 0 ? Number((netTotalPrice / totalGrams).toFixed(2)) : 0;

  return {
    weights: {
      totalTolas: Number(totalTolas.toFixed(4)),
      totalGrams: Number(totalGrams.toFixed(3)),
      tolaInt,
      mashaInt,
      rattiDecimal,
      totalOunces: Number(totalOunces.toFixed(4)),
    },
    pricing: {
      rate24KPerTola: rate24K,
      purityRatePerTola,
      ratePerGram,
      baseGoldCost,
      wastageTolas: Number(wastageTolas.toFixed(4)),
      wastageCost,
      effectiveGoldCostWithWastage,
      makingChargesTotal,
      netTotalPrice,
      effectivePricePerTola,
      effectivePricePerGram,
    },
    karat,
    purityPercentage: KARAT_DETAILS[karat].purityPercent,
    karatLabel: KARAT_DETAILS[karat].label,
  };
}

/**
 * Step-by-step calculation explanation for ExplainResultAccordion
 */
export function getPakistanGoldExplanationSteps(
  inputs: GoldCalculatorInputs,
  result: GoldCalculatorResult
): string[] {
  const w = result.weights;
  const p = result.pricing;

  return [
    `Total Weight Conversion: ${w.totalTolas} Tola (${w.tolaInt} Tola, ${w.mashaInt} Masha, ${w.rattiDecimal} Ratti) = ${w.totalGrams} Grams (based on official Pakistani standard 1 Tola = 11.6638g)`,
    `${result.karat}K Gold Rate: 24K Rate (PKR ${p.rate24KPerTola.toLocaleString()}) × (${result.karat}/24) = PKR ${p.purityRatePerTola.toLocaleString()} per Tola (PKR ${p.ratePerGram.toLocaleString()}/gram)`,
    `Base Raw Gold Cost = ${w.totalTolas} Tolas × PKR ${p.purityRatePerTola.toLocaleString()}/Tola = PKR ${p.baseGoldCost.toLocaleString()}`,
    `Wastage / Cut (Kass) Adjustment = +${p.wastageTolas} Tolas = +PKR ${p.wastageCost.toLocaleString()}`,
    `Making Charges (Jorai) = +PKR ${p.makingChargesTotal.toLocaleString()} (${inputs.makingChargeType === "per_tola" ? `PKR ${inputs.makingChargeValue.toLocaleString()}/Tola` : inputs.makingChargeType === "percentage" ? `${inputs.makingChargeValue}% of gold` : "Lump-sum"})`,
    `Net Final Price = Pure Gold (PKR ${p.baseGoldCost.toLocaleString()}) + Wastage (PKR ${p.wastageCost.toLocaleString()}) + Making (PKR ${p.makingChargesTotal.toLocaleString()}) = PKR ${p.netTotalPrice.toLocaleString()}`,
    `Effective All-Inclusive Rates: PKR ${p.effectivePricePerTola.toLocaleString()} / Tola | PKR ${p.effectivePricePerGram.toLocaleString()} / Gram`,
  ];
}
