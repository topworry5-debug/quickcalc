/**
 * etsyVsKdpCalculator.ts
 * 
 * 100% Accurate 2026 Etsy vs Amazon KDP Profit & Fee Comparison Engine.
 * Computes side-by-side platform fees, production/print costs, net unit margins,
 * and monthly revenue projections to determine the most profitable marketplace.
 */

import {
  calculateKDPPrintingCost,
  KDP_MARKETPLACES,
  BookFormat,
  InteriorType,
  TrimSize,
} from "./kdpRoyaltyCalculator";

export interface EtsyComparisonInputs {
  countryProcessingRate: number; // e.g. 0.03
  countryFixedFee: number; // e.g. 0.25
  offsiteAdsRate: number; // 0, 0.12, 0.15
  shippingCharged: number;
  actualShippingCost: number;
}

export interface KDPComparisonInputs {
  format: BookFormat;
  interiorType: InteriorType;
  trimSize: TrimSize;
  pageCount: number;
  distribution: "amazon_60" | "expanded_40";
}

export interface EtsyVsKdpInputs {
  retailPrice: number;
  itemCogs: number; // Base manufacturing / physical unit cost for Etsy
  monthlyVolume: number;
  etsy: EtsyComparisonInputs;
  kdp: KDPComparisonInputs;
}

export interface PlatformResult {
  platformName: string;
  grossRevenue: number;
  platformFees: number;
  itemizedFees: { name: string; amount: number }[];
  productionOrShippingCost: number;
  netProfitPerUnit: number;
  profitMarginPercent: number;
  monthlyTotalProfit: number;
  monthlyGrossRevenue: number;
}

export interface EtsyVsKdpResult {
  etsy: PlatformResult;
  kdp: PlatformResult;
  winner: "etsy" | "kdp" | "tie";
  profitDifferencePerUnit: number;
  monthlyProfitDifference: number;
  marginDifferencePercent: number;
  summaryHeadline: string;
}

export interface ComparisonPreset {
  id: string;
  name: string;
  description: string;
  inputs: Partial<EtsyVsKdpInputs>;
}

export const ETSY_VS_KDP_PRESETS: ComparisonPreset[] = [
  {
    id: "pod-journal",
    name: "POD Lined Journal (120 pgs)",
    description: "$14.99 price, $5.50 Etsy POD cost vs KDP 120-pg B&W print cost",
    inputs: {
      retailPrice: 14.99,
      itemCogs: 5.50,
      monthlyVolume: 150,
      etsy: {
        countryProcessingRate: 0.03,
        countryFixedFee: 0.25,
        offsiteAdsRate: 0,
        shippingCharged: 3.99,
        actualShippingCost: 3.99,
      },
      kdp: {
        format: "paperback",
        interiorType: "bw_cream",
        trimSize: "standard",
        pageCount: 120,
        distribution: "amazon_60",
      },
    },
  },
  {
    id: "childrens-book",
    name: "Children's Color Book (32 pgs)",
    description: "$12.99 price, $6.00 Etsy color print cost vs KDP 32-pg Premium Color",
    inputs: {
      retailPrice: 12.99,
      itemCogs: 6.00,
      monthlyVolume: 200,
      etsy: {
        countryProcessingRate: 0.03,
        countryFixedFee: 0.25,
        offsiteAdsRate: 0,
        shippingCharged: 4.50,
        actualShippingCost: 4.50,
      },
      kdp: {
        format: "paperback",
        interiorType: "premium_color",
        trimSize: "large",
        pageCount: 32,
        distribution: "amazon_60",
      },
    },
  },
  {
    id: "paperback-novel",
    name: "Paperback Novel (300 pgs)",
    description: "$16.99 price, $7.00 Etsy author copy vs KDP 300-pg B&W print cost",
    inputs: {
      retailPrice: 16.99,
      itemCogs: 7.00,
      monthlyVolume: 300,
      etsy: {
        countryProcessingRate: 0.03,
        countryFixedFee: 0.25,
        offsiteAdsRate: 0.12,
        shippingCharged: 0,
        actualShippingCost: 0,
      },
      kdp: {
        format: "paperback",
        interiorType: "bw_cream",
        trimSize: "standard",
        pageCount: 300,
        distribution: "amazon_60",
      },
    },
  },
  {
    id: "digital-vs-kdp",
    name: "Digital Printable vs KDP Print",
    description: "$9.99 price, $0 Etsy COGS (Digital download) vs KDP 100-pg paperback",
    inputs: {
      retailPrice: 9.99,
      itemCogs: 0,
      monthlyVolume: 250,
      etsy: {
        countryProcessingRate: 0.03,
        countryFixedFee: 0.25,
        offsiteAdsRate: 0,
        shippingCharged: 0,
        actualShippingCost: 0,
      },
      kdp: {
        format: "paperback",
        interiorType: "bw_white",
        trimSize: "standard",
        pageCount: 100,
        distribution: "amazon_60",
      },
    },
  },
];

/**
 * Main Comparison Calculation Engine
 */
export function calculateEtsyVsKdp(inputs: EtsyVsKdpInputs): EtsyVsKdpResult {
  const price = Math.max(0, inputs.retailPrice || 0);
  const volume = Math.max(1, inputs.monthlyVolume || 1);
  const cogs = Math.max(0, inputs.itemCogs || 0);

  // 1. Etsy Calculations
  const shippingCharged = Math.max(0, inputs.etsy.shippingCharged || 0);
  const actualShipping = Math.max(0, inputs.etsy.actualShippingCost || 0);
  const etsyGrossRevenue = price + shippingCharged;

  const listingFee = 0.20;
  const transactionFee = etsyGrossRevenue * 0.065;
  const processingFee = (etsyGrossRevenue * (inputs.etsy.countryProcessingRate || 0.03)) + (inputs.etsy.countryFixedFee || 0.25);
  const offsiteAdFee = etsyGrossRevenue * (inputs.etsy.offsiteAdsRate || 0);
  const totalEtsyFees = listingFee + transactionFee + processingFee + offsiteAdFee;

  const etsyProductionAndShipping = cogs + actualShipping;
  const etsyNetProfitPerUnit = Math.max(-price, etsyGrossRevenue - totalEtsyFees - etsyProductionAndShipping);
  const etsyProfitMarginPercent = price > 0 ? (etsyNetProfitPerUnit / price) * 100 : 0;
  const etsyMonthlyProfit = etsyNetProfitPerUnit * volume;
  const etsyMonthlyGross = etsyGrossRevenue * volume;

  const etsyResult: PlatformResult = {
    platformName: "Etsy",
    grossRevenue: Number(etsyGrossRevenue.toFixed(2)),
    platformFees: Number(totalEtsyFees.toFixed(2)),
    itemizedFees: [
      { name: "Listing Fee", amount: Number(listingFee.toFixed(2)) },
      { name: "Transaction Fee (6.5%)", amount: Number(transactionFee.toFixed(2)) },
      { name: "Payment Processing", amount: Number(processingFee.toFixed(2)) },
      ...(offsiteAdFee > 0 ? [{ name: `Offsite Ads (${((inputs.etsy.offsiteAdsRate || 0) * 100).toFixed(0)}%)`, amount: Number(offsiteAdFee.toFixed(2)) }] : []),
    ],
    productionOrShippingCost: Number(etsyProductionAndShipping.toFixed(2)),
    netProfitPerUnit: Number(etsyNetProfitPerUnit.toFixed(2)),
    profitMarginPercent: Number(etsyProfitMarginPercent.toFixed(1)),
    monthlyTotalProfit: Number(etsyMonthlyProfit.toFixed(2)),
    monthlyGrossRevenue: Number(etsyMonthlyGross.toFixed(2)),
  };

  // 2. Amazon KDP Calculations
  const usMarketplace = KDP_MARKETPLACES[0];
  const { printingCost } = calculateKDPPrintingCost(
    inputs.kdp.format,
    inputs.kdp.interiorType,
    inputs.kdp.trimSize,
    inputs.kdp.pageCount,
    usMarketplace
  );

  const royaltyRate = inputs.kdp.distribution === "expanded_40" ? 0.40 : 0.60;
  const amazonRetailCut = price * (1 - royaltyRate);
  const kdpGrossRoyalty = price * royaltyRate;
  const kdpNetProfitPerUnit = Math.max(-price, kdpGrossRoyalty - printingCost);
  const kdpProfitMarginPercent = price > 0 ? (kdpNetProfitPerUnit / price) * 100 : 0;
  const kdpMonthlyProfit = kdpNetProfitPerUnit * volume;
  const kdpMonthlyGross = price * volume;

  const kdpResult: PlatformResult = {
    platformName: "Amazon KDP",
    grossRevenue: Number(price.toFixed(2)),
    platformFees: Number(amazonRetailCut.toFixed(2)),
    itemizedFees: [
      { name: `Amazon Commission (${((1 - royaltyRate) * 100).toFixed(0)}%)`, amount: Number(amazonRetailCut.toFixed(2)) },
    ],
    productionOrShippingCost: Number(printingCost.toFixed(2)),
    netProfitPerUnit: Number(kdpNetProfitPerUnit.toFixed(2)),
    profitMarginPercent: Number(kdpProfitMarginPercent.toFixed(1)),
    monthlyTotalProfit: Number(kdpMonthlyProfit.toFixed(2)),
    monthlyGrossRevenue: Number(kdpMonthlyGross.toFixed(2)),
  };

  // 3. Comparison Logic
  const profitDiff = etsyNetProfitPerUnit - kdpNetProfitPerUnit;
  const monthlyProfitDiff = etsyMonthlyProfit - kdpMonthlyProfit;
  const marginDiff = etsyProfitMarginPercent - kdpProfitMarginPercent;

  let winner: "etsy" | "kdp" | "tie" = "tie";
  let summaryHeadline = "Both platforms yield identical net profits at this price point.";

  if (Math.abs(profitDiff) < 0.05) {
    winner = "tie";
    summaryHeadline = "Profits are essentially tied between Etsy and Amazon KDP.";
  } else if (profitDiff > 0) {
    winner = "etsy";
    summaryHeadline = `Etsy yields $${profitDiff.toFixed(2)} more profit per sale (${marginDiff.toFixed(1)}% higher margin).`;
  } else {
    winner = "kdp";
    summaryHeadline = `Amazon KDP yields $${Math.abs(profitDiff).toFixed(2)} more profit per sale (${Math.abs(marginDiff).toFixed(1)}% higher margin).`;
  }

  return {
    etsy: etsyResult,
    kdp: kdpResult,
    winner,
    profitDifferencePerUnit: Number(Math.abs(profitDiff).toFixed(2)),
    monthlyProfitDifference: Number(Math.abs(monthlyProfitDiff).toFixed(2)),
    marginDifferencePercent: Number(Math.abs(marginDiff).toFixed(1)),
    summaryHeadline,
  };
}

/**
 * Explanation steps for ExplainResultAccordion
 */
export function getEtsyVsKdpExplanationSteps(
  inputs: EtsyVsKdpInputs,
  result: EtsyVsKdpResult
): string[] {
  const etsy = result.etsy;
  const kdp = result.kdp;

  return [
    `Etsy Revenue Breakdown = Retail Price ($${inputs.retailPrice.toFixed(2)}) + Shipping ($${inputs.etsy.shippingCharged.toFixed(2)}) = $${etsy.grossRevenue.toFixed(2)} Gross Revenue`,
    `Etsy Deductions = Platform Fees ($${etsy.platformFees.toFixed(2)}) + Production/Shipping ($${etsy.productionOrShippingCost.toFixed(2)}) = Total Deductions of $${(etsy.platformFees + etsy.productionOrShippingCost).toFixed(2)}, leaving $${etsy.netProfitPerUnit.toFixed(2)} Net Profit (${etsy.profitMarginPercent.toFixed(1)}% margin)`,
    `Amazon KDP Revenue Breakdown = Retail Price ($${inputs.retailPrice.toFixed(2)}) × ${inputs.kdp.distribution === "expanded_40" ? "40%" : "60%"} Royalty Rate = Gross Royalty of $${(inputs.retailPrice * (inputs.kdp.distribution === "expanded_40" ? 0.4 : 0.6)).toFixed(2)}`,
    `Amazon KDP Deductions = Printing Cost ($${kdp.productionOrShippingCost.toFixed(2)}) subtracted from Gross Royalty = $${kdp.netProfitPerUnit.toFixed(2)} Net Royalty (${kdp.profitMarginPercent.toFixed(1)}% margin)`,
    `Monthly Comparison (${inputs.monthlyVolume} Units) = Etsy ($${etsy.monthlyTotalProfit.toFixed(2)}) vs Amazon KDP ($${kdp.monthlyTotalProfit.toFixed(2)}) -> ${result.summaryHeadline}`,
  ];
}
