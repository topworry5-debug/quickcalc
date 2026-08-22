/**
 * pakistanPropertyTaxCalculator.ts
 * 
 * Official 2026-2027 FBR Property Tax Calculation Engine (Finance Act 2026):
 * - Section 236K (Advance tax on purchase by Transferee/Buyer)
 * - Section 236C (Advance tax on sale by Transferor/Seller)
 * - Provincial Stamp Duty, Local Govt TMA/Zila Tax, CVT, and Mutation Fees
 * - Filer vs Late Filer vs Non-Filer penalty differential modeling
 */

export type PakistanProvince = "punjab" | "sindh" | "kpk" | "balochistan" | "ict";
export type PropertyType = "residential_plot" | "commercial_plot" | "constructed_house" | "commercial_building";
export type FilerStatus = "filer" | "late_filer" | "non_filer";
export type HoldingPeriod = "under_1_year" | "1_to_2_years" | "2_to_3_years" | "3_to_6_years" | "over_6_years";

export interface PropertyTaxInputs {
  province: PakistanProvince;
  propertyType: PropertyType;
  declaredPrice: number; // Market / agreed transaction price (PKR)
  fbrRate: number; // Official FBR valuation or DC table rate (PKR)
  buyerStatus: FilerStatus;
  sellerStatus: FilerStatus;
  holdingPeriod: HoldingPeriod;
}

export interface BuyerTaxBreakdown {
  section236KRate: number; // %
  section236KAmount: number; // PKR
  stampDutyRate: number; // %
  stampDutyAmount: number; // PKR
  localGovtTaxRate: number; // %
  localGovtTaxAmount: number; // PKR
  cvtRate: number; // %
  cvtAmount: number; // PKR
  mutationFee: number; // PKR
  totalBuyerTaxes: number; // PKR
  totalBuyerCost: number; // Declared Price + Total Buyer Taxes
  effectiveBuyerRate: number; // %
}

export interface SellerTaxBreakdown {
  section236CRate: number; // %
  section236CAmount: number; // PKR
  totalSellerDeductions: number; // PKR
  netSellerProceeds: number; // Declared Price - Total Seller Deductions
  effectiveSellerRate: number; // %
}

export interface PropertyTaxResult {
  declaredPrice: number;
  fbrRate: number;
  taxableBase: number;
  isFbrHigher: boolean;
  buyer: BuyerTaxBreakdown;
  seller: SellerTaxBreakdown;
  totalGovtRevenue: number;
  nonFilerPenalty: {
    buyerExtraTax: number;
    sellerExtraTax: number;
    totalPenaltyWasted: number;
    penaltyInLakhsCrores: string;
  };
  provinceName: string;
  propertyTypeName: string;
}

export interface PropertyPreset {
  id: string;
  name: string;
  description: string;
  inputs: Partial<PropertyTaxInputs>;
}

export const PROVINCE_NAMES: Record<PakistanProvince, string> = {
  punjab: "Punjab (LDA / DHA / FDA)",
  sindh: "Sindh (Karachi / Hyderabad - KDA / SBCA)",
  kpk: "Khyber Pakhtunkhwa (Peshawar)",
  balochistan: "Balochistan (Quetta / Gwadar)",
  ict: "ICT Islamabad (CDA / Sectoral)",
};

export const PROPERTY_TYPE_NAMES: Record<PropertyType, string> = {
  residential_plot: "Residential Plot / Land",
  commercial_plot: "Commercial Plot / Land",
  constructed_house: "Constructed House / Apartment",
  commercial_building: "Commercial Building / Plaza",
};

export const PROPERTY_PRESETS: PropertyPreset[] = [
  {
    id: "5-marla-house",
    name: "5 Marla House (PKR 1.40 Cr)",
    description: "Typical 5 Marla developed house in suburban Lahore/Islamabad.",
    inputs: {
      province: "punjab",
      propertyType: "constructed_house",
      declaredPrice: 14000000,
      fbrRate: 12500000,
      buyerStatus: "filer",
      sellerStatus: "filer",
      holdingPeriod: "2_to_3_years",
    },
  },
  {
    id: "10-marla-dha-plot",
    name: "10 Marla DHA Plot (PKR 3.20 Cr)",
    description: "Prime residential plot in DHA / Bahria Town / CDA sector.",
    inputs: {
      province: "punjab",
      propertyType: "residential_plot",
      declaredPrice: 32000000,
      fbrRate: 28000000,
      buyerStatus: "filer",
      sellerStatus: "filer",
      holdingPeriod: "1_to_2_years",
    },
  },
  {
    id: "1-kanal-villa",
    name: "1 Kanal Luxury Villa (PKR 7.50 Cr)",
    description: "Constructed 1 Kanal luxury property in Islamabad/Karachi.",
    inputs: {
      province: "ict",
      propertyType: "constructed_house",
      declaredPrice: 75000000,
      fbrRate: 70000000,
      buyerStatus: "filer",
      sellerStatus: "filer",
      holdingPeriod: "3_to_6_years",
    },
  },
  {
    id: "commercial-plaza",
    name: "Commercial Plaza (PKR 25.00 Cr)",
    description: "High-value commercial building subject to top non-filer slabs.",
    inputs: {
      province: "sindh",
      propertyType: "commercial_building",
      declaredPrice: 250000000,
      fbrRate: 230000000,
      buyerStatus: "non_filer",
      sellerStatus: "non_filer",
      holdingPeriod: "under_1_year",
    },
  },
];

/**
 * Helper to format PKR into Lakhs and Crores
 */
export function formatPkrLakhCrore(amount: number): string {
  if (amount >= 10000000) {
    const crore = amount / 10000000;
    return `PKR ${crore.toFixed(2)} Crore`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    return `PKR ${lakh.toFixed(2)} Lakh`;
  }
  return `PKR ${Math.round(amount).toLocaleString()}`;
}

export function calculatePakistanPropertyTax(inputs: PropertyTaxInputs): PropertyTaxResult {
  const declaredPrice = Math.max(100000, inputs.declaredPrice || 100000);
  const fbrRate = Math.max(0, inputs.fbrRate || 0);

  // 1. Determine Taxable Valuation Base
  const taxableBase = Math.max(declaredPrice, fbrRate);
  const isFbrHigher = fbrRate > declaredPrice;

  // 2. Buyer Section 236K Rate
  let buyer236KRate = 0.03; // Filer standard 3%
  if (inputs.buyerStatus === "late_filer") {
    buyer236KRate = 0.06; // Late Filer 6%
  } else if (inputs.buyerStatus === "non_filer") {
    // Finance Act 2026: 12% for properties up to 50M, 15% above 50M
    buyer236KRate = taxableBase > 50000000 ? 0.15 : 0.12;
  }
  const section236KAmount = Math.round(taxableBase * buyer236KRate);

  // 3. Provincial Stamp Duty
  let stampDutyRate = 0.01; // Punjab standard 1%
  if (inputs.province === "sindh" || inputs.province === "kpk" || inputs.province === "balochistan") {
    stampDutyRate = 0.02; // 2%
  } else if (inputs.province === "ict") {
    stampDutyRate = 0.015; // 1.5% in ICT
  }
  const stampDutyAmount = Math.round(taxableBase * stampDutyRate);

  // 4. Local Govt / Town Corporation Fee (TMA/Zila Council Tax)
  const localGovtTaxRate = 0.01; // 1%
  const localGovtTaxAmount = Math.round(taxableBase * localGovtTaxRate);

  // 5. Capital Value Tax (CVT) - where applicable (typically 1% in ICT and high-value plots)
  let cvtRate = 0;
  if (inputs.province === "ict" || inputs.propertyType.includes("commercial")) {
    cvtRate = 0.01; // 1%
  }
  const cvtAmount = Math.round(taxableBase * cvtRate);

  // 6. Mutation / Registration (Intiqal) Fee
  // Standard fixed slab (Rs. 2,000) + 0.5% registration
  const mutationFee = Math.round(2000 + taxableBase * 0.005);

  const totalBuyerTaxes = section236KAmount + stampDutyAmount + localGovtTaxAmount + cvtAmount + mutationFee;
  const totalBuyerCost = declaredPrice + totalBuyerTaxes;
  const effectiveBuyerRate = Number(((totalBuyerTaxes / taxableBase) * 100).toFixed(2));

  // 7. Seller Section 236C Rate
  let seller236CRate = 0.03; // Filer standard 3%
  if (inputs.sellerStatus === "filer") {
    if (inputs.holdingPeriod === "over_6_years") {
      seller236CRate = 0.015; // Concessionary 1.5% for 6+ years holding
    } else {
      seller236CRate = 0.03;
    }
  } else if (inputs.sellerStatus === "late_filer") {
    seller236CRate = 0.06;
  } else if (inputs.sellerStatus === "non_filer") {
    // Non-filer seller: 10% up to 50M, 15% above 50M
    seller236CRate = taxableBase > 50000000 ? 0.15 : 0.10;
  }
  const section236CAmount = Math.round(taxableBase * seller236CRate);
  const totalSellerDeductions = section236CAmount;
  const netSellerProceeds = declaredPrice - totalSellerDeductions;
  const effectiveSellerRate = Number(((totalSellerDeductions / taxableBase) * 100).toFixed(2));

  // 8. Non-Filer Penalty Differential Modeling
  // Filer Buyer 236K = 3%
  const filerBuyer236K = Math.round(taxableBase * 0.03);
  const buyerExtraTax = Math.max(0, section236KAmount - filerBuyer236K);

  // Filer Seller 236C = 3% (or 1.5%)
  const filerSeller236C = Math.round(taxableBase * (inputs.holdingPeriod === "over_6_years" ? 0.015 : 0.03));
  const sellerExtraTax = Math.max(0, section236CAmount - filerSeller236C);

  const totalPenaltyWasted = buyerExtraTax + sellerExtraTax;
  const penaltyInLakhsCrores = formatPkrLakhCrore(totalPenaltyWasted);

  const totalGovtRevenue = totalBuyerTaxes + totalSellerDeductions;

  return {
    declaredPrice,
    fbrRate,
    taxableBase,
    isFbrHigher,
    buyer: {
      section236KRate: Number((buyer236KRate * 100).toFixed(1)),
      section236KAmount,
      stampDutyRate: Number((stampDutyRate * 100).toFixed(1)),
      stampDutyAmount,
      localGovtTaxRate: Number((localGovtTaxRate * 100).toFixed(1)),
      localGovtTaxAmount,
      cvtRate: Number((cvtRate * 100).toFixed(1)),
      cvtAmount,
      mutationFee,
      totalBuyerTaxes,
      totalBuyerCost,
      effectiveBuyerRate,
    },
    seller: {
      section236CRate: Number((seller236CRate * 100).toFixed(1)),
      section236CAmount,
      totalSellerDeductions,
      netSellerProceeds,
      effectiveSellerRate,
    },
    totalGovtRevenue,
    nonFilerPenalty: {
      buyerExtraTax,
      sellerExtraTax,
      totalPenaltyWasted,
      penaltyInLakhsCrores,
    },
    provinceName: PROVINCE_NAMES[inputs.province] || inputs.province,
    propertyTypeName: PROPERTY_TYPE_NAMES[inputs.propertyType] || inputs.propertyType,
  };
}

/**
 * Step-by-step mathematical explanation for ExplainResultAccordion
 */
export function getPakistanPropertyTaxExplanationSteps(
  inputs: PropertyTaxInputs,
  result: PropertyTaxResult
): string[] {
  const b = result.buyer;
  const s = result.seller;
  return [
    `Tax Valuation Base = MAX(Declared Price: PKR ${result.declaredPrice.toLocaleString()}, FBR DC Rate: PKR ${result.fbrRate.toLocaleString()}) = PKR ${result.taxableBase.toLocaleString()} (${formatPkrLakhCrore(result.taxableBase)})`,
    `Buyer Section 236K Advance Tax (${inputs.buyerStatus.toUpperCase()} @ ${b.section236KRate}%) = PKR ${b.section236KAmount.toLocaleString()}`,
    `Provincial Stamp Duty (${result.provinceName} @ ${b.stampDutyRate}%) = PKR ${b.stampDutyAmount.toLocaleString()}`,
    `Local Govt / TMA Corporation Fee (1%) = PKR ${b.localGovtTaxAmount.toLocaleString()}`,
    `Capital Value Tax (CVT ${b.cvtRate}%) + Mutation & Registry Fees = PKR ${(b.cvtAmount + b.mutationFee).toLocaleString()}`,
    `Total Buyer Out-of-Pocket Cost = Declared Price (PKR ${result.declaredPrice.toLocaleString()}) + Total Buyer Taxes (PKR ${b.totalBuyerTaxes.toLocaleString()}) = PKR ${b.totalBuyerCost.toLocaleString()}`,
    `Seller Section 236C Advance Tax (${inputs.sellerStatus.toUpperCase()} @ ${s.section236CRate}%) = PKR ${s.section236CAmount.toLocaleString()} (Net Seller Cash = PKR ${s.netSellerProceeds.toLocaleString()})`,
    `Non-Filer Surcharge Penalty = Extra Buyer Tax (PKR ${result.nonFilerPenalty.buyerExtraTax.toLocaleString()}) + Extra Seller Tax (PKR ${result.nonFilerPenalty.sellerExtraTax.toLocaleString()}) = Total Extra Penalty of ${result.nonFilerPenalty.penaltyInLakhsCrores}`,
  ];
}
