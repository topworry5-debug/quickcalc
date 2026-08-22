/**
 * pakistanElectricityCalculator.ts
 * 
 * Official 2026-2027 NEPRA Domestic Electricity Tariff Slabs,
 * Protected vs Unprotected classifications, FPA, GST, FC Surcharge,
 * Electricity Duty, and DISCO bill estimation engine.
 */

export type DiscoCompany = "LESCO" | "IESCO" | "FESCO" | "MEPCO" | "GEPCO" | "PESCO" | "HESCO" | "QESCO" | "KELECTRIC";
export type ConsumerCategory = "protected" | "unprotected";

export interface PakistanElectricityInputs {
  disco: DiscoCompany;
  category: ConsumerCategory;
  units: number;
  fpaRate: number; // e.g. 2.50 PKR/unit
  includeTvFee: boolean; // PKR 35
  customFixedCharges?: number | null;
}

export interface SlabBreakdownItem {
  slabName: string;
  unitsInSlab: number;
  ratePerUnit: number;
  cost: number;
}

export interface TaxBreakdown {
  electricityDuty: number; // 1.5% of Base Cost
  fpaAmount: number; // Units * FPA Rate
  fcSurcharge: number; // Units * 3.23
  gstAmount: number; // 18% of (Base + Fixed + FPA + ED)
  tvFee: number; // 35
  totalTaxesAndSurcharges: number;
}

export interface PakistanElectricityResult {
  units: number;
  category: ConsumerCategory;
  isCategoryForcedUnprotected: boolean;
  baseCost: number;
  fixedCharges: number;
  taxes: TaxBreakdown;
  totalBill: number;
  effectiveRatePerUnit: number;
  slabBreakdown: SlabBreakdownItem[];
  discoName: string;
  discoFullName: string;
}

export interface ElectricityPreset {
  id: string;
  name: string;
  description: string;
  inputs: Partial<PakistanElectricityInputs>;
}

export const DISCO_INFO: Record<DiscoCompany, { name: string; city: string }> = {
  LESCO: { name: "Lahore Electric Supply Company", city: "Lahore & Kasur" },
  IESCO: { name: "Islamabad Electric Supply Company", city: "Islamabad & Rawalpindi" },
  FESCO: { name: "Faisalabad Electric Supply Company", city: "Faisalabad & Sargodha" },
  MEPCO: { name: "Multan Electric Power Company", city: "Multan & South Punjab" },
  GEPCO: { name: "Gujranwala Electric Power Company", city: "Gujranwala & Sialkot" },
  PESCO: { name: "Peshawar Electric Supply Company", city: "Khyber Pakhtunkhwa" },
  HESCO: { name: "Hyderabad Electric Supply Company", city: "Hyderabad & Sindh" },
  QESCO: { name: "Quetta Electric Supply Company", city: "Balochistan" },
  KELECTRIC: { name: "K-Electric Limited", city: "Karachi" },
};

export const ELECTRICITY_PRESETS: ElectricityPreset[] = [
  {
    id: "protected-lifeline",
    name: "Protected Lifeline (95 Units)",
    description: "Low-consumption household with fans & LED lights only. Subsidized tariff under 100 units.",
    inputs: {
      disco: "LESCO",
      category: "protected",
      units: 95,
      fpaRate: 2.50,
      includeTvFee: true,
    },
  },
  {
    id: "protected-ceiling",
    name: "Protected Max (185 Units)",
    description: "Household maintaining protected status under 200 units with refrigerator & fans.",
    inputs: {
      disco: "IESCO",
      category: "protected",
      units: 185,
      fpaRate: 2.50,
      includeTvFee: true,
    },
  },
  {
    id: "summer-ac-moderate",
    name: "1-AC Moderate Summer (340 Units)",
    description: "Family running one 1.5-ton inverter AC for 6-8 hours daily.",
    inputs: {
      disco: "FESCO",
      category: "unprotected",
      units: 340,
      fpaRate: 2.50,
      includeTvFee: true,
    },
  },
  {
    id: "heavy-household",
    name: "Heavy 2-AC Load (650 Units)",
    description: "Multi-story home running 2 ACs, water motor, and deep freezer.",
    inputs: {
      disco: "KELECTRIC",
      category: "unprotected",
      units: 650,
      fpaRate: 2.50,
      includeTvFee: true,
    },
  },
];

/**
 * 2026 NEPRA Domestic Slabs
 */
const PROTECTED_SLABS = [
  { max: 100, rate: 13.75, name: "1 to 100 Units" },
  { max: 200, rate: 16.80, name: "101 to 200 Units" },
];

const UNPROTECTED_SLABS = [
  { max: 100, rate: 24.50, name: "1 to 100 Units" },
  { max: 200, rate: 30.10, name: "101 to 200 Units" },
  { max: 300, rate: 36.20, name: "201 to 300 Units" },
  { max: 400, rate: 41.50, name: "301 to 400 Units" },
  { max: 500, rate: 44.80, name: "401 to 500 Units" },
  { max: 600, rate: 46.20, name: "501 to 600 Units" },
  { max: 700, rate: 47.90, name: "601 to 700 Units" },
  { max: Infinity, rate: 51.50, name: "Above 700 Units" },
];

export function calculatePakistanElectricityBill(
  inputs: PakistanElectricityInputs
): PakistanElectricityResult {
  const units = Math.max(1, Math.min(5000, inputs.units || 1));
  const fpaRate = Math.max(0, inputs.fpaRate || 0);

  // If consumer selected 'protected' but units > 200, NEPRA rules mandate unprotected tariff
  let effectiveCategory = inputs.category;
  let isCategoryForcedUnprotected = false;
  if (effectiveCategory === "protected" && units > 200) {
    effectiveCategory = "unprotected";
    isCategoryForcedUnprotected = true;
  }

  // 1. Slab Calculation
  let baseCost = 0;
  const slabBreakdown: SlabBreakdownItem[] = [];

  if (effectiveCategory === "protected") {
    let remainingUnits = units;
    let prevMax = 0;

    for (const slab of PROTECTED_SLABS) {
      if (remainingUnits <= 0) break;
      const slabCapacity = slab.max - prevMax;
      const unitsInThisSlab = Math.min(remainingUnits, slabCapacity);
      const costForSlab = unitsInThisSlab * slab.rate;

      baseCost += costForSlab;
      slabBreakdown.push({
        slabName: slab.name,
        unitsInSlab: unitsInThisSlab,
        ratePerUnit: slab.rate,
        cost: Math.round(costForSlab * 100) / 100,
      });

      remainingUnits -= unitsInThisSlab;
      prevMax = slab.max;
    }
  } else {
    // Unprotected slabs calculation
    let remainingUnits = units;
    let prevMax = 0;

    for (const slab of UNPROTECTED_SLABS) {
      if (remainingUnits <= 0) break;
      const slabCapacity = slab.max === Infinity ? remainingUnits : slab.max - prevMax;
      const unitsInThisSlab = Math.min(remainingUnits, slabCapacity);
      const costForSlab = unitsInThisSlab * slab.rate;

      baseCost += costForSlab;
      slabBreakdown.push({
        slabName: slab.name,
        unitsInSlab: unitsInThisSlab,
        ratePerUnit: slab.rate,
        cost: Math.round(costForSlab * 100) / 100,
      });

      remainingUnits -= unitsInThisSlab;
      prevMax = slab.max;
    }
  }

  // 2. Fixed Charges (Automatic NEPRA slabs or custom)
  let fixedCharges = 0;
  if (inputs.customFixedCharges !== undefined && inputs.customFixedCharges !== null && inputs.customFixedCharges >= 0) {
    fixedCharges = inputs.customFixedCharges;
  } else {
    if (units >= 501) fixedCharges = 600;
    else if (units >= 401) fixedCharges = 400;
    else if (units >= 301) fixedCharges = 200;
    else fixedCharges = 0;
  }

  // 3. Taxes & Surcharges
  const fpaAmount = Math.round(units * fpaRate * 100) / 100;
  const electricityDuty = Math.round(baseCost * 0.015 * 100) / 100; // 1.5% ED
  const fcSurcharge = Math.round(units * 3.23 * 100) / 100; // Rs. 3.23 / unit Financing Cost
  const tvFee = inputs.includeTvFee ? 35 : 0;

  // General Sales Tax (18% on Base Cost + Fixed + FPA + ED)
  const gstTaxableBase = baseCost + fixedCharges + fpaAmount + electricityDuty;
  const gstAmount = Math.round(gstTaxableBase * 0.18 * 100) / 100;

  const totalTaxesAndSurcharges = Math.round(
    (electricityDuty + fpaAmount + fcSurcharge + gstAmount + tvFee) * 100
  ) / 100;

  const totalBill = Math.round(baseCost + fixedCharges + totalTaxesAndSurcharges);
  const effectiveRatePerUnit = Number((totalBill / units).toFixed(2));

  return {
    units,
    category: effectiveCategory,
    isCategoryForcedUnprotected,
    baseCost: Math.round(baseCost),
    fixedCharges,
    taxes: {
      electricityDuty,
      fpaAmount,
      fcSurcharge,
      gstAmount,
      tvFee,
      totalTaxesAndSurcharges: Math.round(totalTaxesAndSurcharges),
    },
    totalBill,
    effectiveRatePerUnit,
    slabBreakdown,
    discoName: inputs.disco,
    discoFullName: DISCO_INFO[inputs.disco]?.name || inputs.disco,
  };
}

/**
 * Step-by-step mathematical explanation for ExplainResultAccordion
 */
export function getPakistanElectricityExplanationSteps(
  inputs: PakistanElectricityInputs,
  result: PakistanElectricityResult
): string[] {
  const t = result.taxes;
  return [
    `Consumer Classification: ${result.category === "protected" ? "Protected Domestic (Subsidized ≤200 Units)" : "Unprotected Domestic"} across ${result.discoName} (${result.discoFullName}).`,
    `Base Energy Cost = Sum of ${result.units} units calculated across ${result.slabBreakdown.length} NEPRA tariff slabs = PKR ${result.baseCost.toLocaleString()}`,
    `Fixed Charges = PKR ${result.fixedCharges} (based on ${result.units} units slab tier)`,
    `Fuel Price Adjustment (FPA) = ${result.units} units × PKR ${inputs.fpaRate}/unit = PKR ${t.fpaAmount.toLocaleString()}`,
    `Electricity Duty (ED 1.5%) = 1.5% × PKR ${result.baseCost.toLocaleString()} = PKR ${t.electricityDuty.toLocaleString()}`,
    `Financing Cost (FC) Surcharge = ${result.units} units × PKR 3.23/unit = PKR ${t.fcSurcharge.toLocaleString()}`,
    `General Sales Tax (GST 18%) = 18% of (Base + Fixed + FPA + ED) = 18% × PKR ${(result.baseCost + result.fixedCharges + t.fpaAmount + t.electricityDuty).toLocaleString()} = PKR ${t.gstAmount.toLocaleString()}`,
    `Total Estimated Payable Bill = Base Energy (PKR ${result.baseCost.toLocaleString()}) + Fixed (PKR ${result.fixedCharges}) + Taxes & Surcharges (PKR ${t.totalTaxesAndSurcharges.toLocaleString()}) = PKR ${result.totalBill.toLocaleString()} (Effective Rate: PKR ${result.effectiveRatePerUnit}/unit)`,
  ];
}
