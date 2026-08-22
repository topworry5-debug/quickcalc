/**
 * pakistanFuelMileageCalculator.ts
 * 
 * Official 2026 Pakistan Fuel Cost & Mileage Calculation Engine:
 * - Petrol, Diesel, Hybrid (HEV), and Electric Vehicle (EV) comparative running costs
 * - Daily, monthly, annual expenses and cost-per-kilometer (PKR/km)
 * - Home solar charging integration (PKR 0/unit)
 * - Financial payback period modeling for EV/Hybrid initial purchase premiums
 */

export type DistanceMode = "daily" | "monthly" | "trip";
export type FuelType = "petrol" | "diesel";

export interface FuelMileageInputs {
  distanceMode: DistanceMode;
  distanceKm: number;
  petrolPrice: number; // PKR / Liter
  dieselPrice: number; // PKR / Liter
  gridElectricityRate: number; // PKR / kWh
  hasSolarCharging: boolean; // Toggle: sets effective EV rate to 0
  primaryFuelType: FuelType;
  petrolMileageKml: number; // km/L (Standard ICE car)
  hybridMileageKml: number; // km/L (Hybrid HEV car)
  evEfficiencyKmKwh: number; // km/kWh (EV)
  petrolCarPriceLacs?: number; // Optional purchase price in Lacs (e.g. 65)
  hybridCarPriceLacs?: number; // Optional purchase price in Lacs (e.g. 85)
  evCarPriceLacs?: number; // Optional purchase price in Lacs (e.g. 95)
}

export interface FuelMileageBreakdown {
  monthlyDistanceKm: number;
  annualDistanceKm: number;
  petrolCostPerKm: number;
  hybridCostPerKm: number;
  evCostPerKm: number;
  effectiveEvRate: number;
  
  // Expenses
  petrolCostTrip: number;
  hybridCostTrip: number;
  evCostTrip: number;
  
  petrolCostMonthly: number;
  hybridCostMonthly: number;
  evCostMonthly: number;
  
  petrolCostAnnual: number;
  hybridCostAnnual: number;
  evCostAnnual: number;

  // Savings vs Petrol
  hybridMonthlySavings: number;
  hybridAnnualSavings: number;
  hybridPercentSavings: number;

  evMonthlySavings: number;
  evAnnualSavings: number;
  evPercentSavings: number;

  // Payback Analysis (if prices provided)
  hybridPaybackMonths: number | null;
  hybridPaybackYears: number | null;
  evPaybackMonths: number | null;
  evPaybackYears: number | null;
}

export interface FuelPreset {
  id: string;
  name: string;
  description: string;
  inputs: Partial<FuelMileageInputs>;
}

export const FUEL_PRESETS: FuelPreset[] = [
  {
    id: "daily-city-commute",
    name: "Daily City Commute (35 km/day)",
    description: "Typical Lahore/Karachi/Islamabad office round-trip commute.",
    inputs: {
      distanceMode: "daily",
      distanceKm: 35,
      petrolPrice: 275,
      gridElectricityRate: 45,
      hasSolarCharging: false,
      primaryFuelType: "petrol",
      petrolMileageKml: 12,
      hybridMileageKml: 22,
      evEfficiencyKmKwh: 6.5,
      petrolCarPriceLacs: 65,
      hybridCarPriceLacs: 85,
      evCarPriceLacs: 95,
    },
  },
  {
    id: "lahore-islamabad-trip",
    name: "Lahore to Islamabad Trip (380 km)",
    description: "M-2 Motorway one-way intercity journey comparison.",
    inputs: {
      distanceMode: "trip",
      distanceKm: 380,
      petrolPrice: 275,
      gridElectricityRate: 45,
      hasSolarCharging: false,
      primaryFuelType: "petrol",
      petrolMileageKml: 14,
      hybridMileageKml: 20,
      evEfficiencyKmKwh: 5.5,
    },
  },
  {
    id: "ride-hailing-heavy",
    name: "Ride-Hailing / Careem / InDrive (120 km/day)",
    description: "High-mileage commercial driver analyzing operating savings.",
    inputs: {
      distanceMode: "daily",
      distanceKm: 120,
      petrolPrice: 275,
      gridElectricityRate: 45,
      hasSolarCharging: false,
      primaryFuelType: "petrol",
      petrolMileageKml: 14,
      hybridMileageKml: 24,
      evEfficiencyKmKwh: 7.0,
      petrolCarPriceLacs: 45,
      hybridCarPriceLacs: 60,
      evCarPriceLacs: 70,
    },
  },
  {
    id: "home-solar-ev",
    name: "Home Solar EV Commute (50 km/day)",
    description: "Zero fuel cost using home rooftop net-metering solar charging.",
    inputs: {
      distanceMode: "daily",
      distanceKm: 50,
      petrolPrice: 275,
      gridElectricityRate: 45,
      hasSolarCharging: true,
      primaryFuelType: "petrol",
      petrolMileageKml: 12,
      hybridMileageKml: 22,
      evEfficiencyKmKwh: 6.5,
      petrolCarPriceLacs: 65,
      hybridCarPriceLacs: 85,
      evCarPriceLacs: 90,
    },
  },
];

export function calculatePakistanFuelMileage(inputs: FuelMileageInputs): FuelMileageBreakdown {
  const distanceKm = Math.max(1, inputs.distanceKm || 35);
  const petrolPrice = Math.max(50, inputs.petrolPrice || 275);
  const dieselPrice = Math.max(50, inputs.dieselPrice || 280);
  const fuelRate = inputs.primaryFuelType === "diesel" ? dieselPrice : petrolPrice;
  
  const effectiveEvRate = inputs.hasSolarCharging ? 0 : Math.max(0, inputs.gridElectricityRate || 45);
  const petrolMileage = Math.max(2, inputs.petrolMileageKml || 12);
  const hybridMileage = Math.max(2, inputs.hybridMileageKml || 22);
  const evEfficiency = Math.max(1, inputs.evEfficiencyKmKwh || 6.5);

  // Compute Cost Per KM
  const petrolCostPerKm = fuelRate / petrolMileage;
  const hybridCostPerKm = fuelRate / hybridMileage;
  const evCostPerKm = effectiveEvRate / evEfficiency;

  // Distances
  let monthlyDistanceKm = 0;
  if (inputs.distanceMode === "daily") {
    monthlyDistanceKm = distanceKm * 30;
  } else if (inputs.distanceMode === "monthly") {
    monthlyDistanceKm = distanceKm;
  } else {
    // Single trip
    monthlyDistanceKm = distanceKm;
  }
  const annualDistanceKm = monthlyDistanceKm * 12;

  // Trip Expenses (for the input distanceKm)
  const petrolCostTrip = Math.round(distanceKm * petrolCostPerKm);
  const hybridCostTrip = Math.round(distanceKm * hybridCostPerKm);
  const evCostTrip = Math.round(distanceKm * evCostPerKm);

  // Monthly Expenses
  const petrolCostMonthly = Math.round(monthlyDistanceKm * petrolCostPerKm);
  const hybridCostMonthly = Math.round(monthlyDistanceKm * hybridCostPerKm);
  const evCostMonthly = Math.round(monthlyDistanceKm * evCostPerKm);

  // Annual Expenses
  const petrolCostAnnual = petrolCostMonthly * 12;
  const hybridCostAnnual = hybridCostMonthly * 12;
  const evCostAnnual = evCostMonthly * 12;

  // Savings vs Petrol
  const hybridMonthlySavings = Math.max(0, petrolCostMonthly - hybridCostMonthly);
  const hybridAnnualSavings = hybridMonthlySavings * 12;
  const hybridPercentSavings = petrolCostMonthly > 0 ? Math.round((hybridMonthlySavings / petrolCostMonthly) * 100) : 0;

  const evMonthlySavings = Math.max(0, petrolCostMonthly - evCostMonthly);
  const evAnnualSavings = evMonthlySavings * 12;
  const evPercentSavings = petrolCostMonthly > 0 ? Math.round((evMonthlySavings / petrolCostMonthly) * 100) : 0;

  // Payback Modeling (Lacs to PKR: 1 Lac = 100,000 PKR)
  let hybridPaybackMonths: number | null = null;
  let hybridPaybackYears: number | null = null;
  if (inputs.petrolCarPriceLacs && inputs.hybridCarPriceLacs && inputs.hybridCarPriceLacs > inputs.petrolCarPriceLacs && hybridMonthlySavings > 0) {
    const diffPkr = (inputs.hybridCarPriceLacs - inputs.petrolCarPriceLacs) * 100000;
    hybridPaybackMonths = Math.round((diffPkr / hybridMonthlySavings) * 10) / 10;
    hybridPaybackYears = Math.round((hybridPaybackMonths / 12) * 10) / 10;
  }

  let evPaybackMonths: number | null = null;
  let evPaybackYears: number | null = null;
  if (inputs.petrolCarPriceLacs && inputs.evCarPriceLacs && inputs.evCarPriceLacs > inputs.petrolCarPriceLacs && evMonthlySavings > 0) {
    const diffPkr = (inputs.evCarPriceLacs - inputs.petrolCarPriceLacs) * 100000;
    evPaybackMonths = Math.round((diffPkr / evMonthlySavings) * 10) / 10;
    evPaybackYears = Math.round((evPaybackMonths / 12) * 10) / 10;
  }

  return {
    monthlyDistanceKm,
    annualDistanceKm,
    petrolCostPerKm: Math.round(petrolCostPerKm * 100) / 100,
    hybridCostPerKm: Math.round(hybridCostPerKm * 100) / 100,
    evCostPerKm: Math.round(evCostPerKm * 100) / 100,
    effectiveEvRate,
    petrolCostTrip,
    hybridCostTrip,
    evCostTrip,
    petrolCostMonthly,
    hybridCostMonthly,
    evCostMonthly,
    petrolCostAnnual,
    hybridCostAnnual,
    evCostAnnual,
    hybridMonthlySavings,
    hybridAnnualSavings,
    hybridPercentSavings,
    evMonthlySavings,
    evAnnualSavings,
    evPercentSavings,
    hybridPaybackMonths,
    hybridPaybackYears,
    evPaybackMonths,
    evPaybackYears,
  };
}

/**
 * Step-by-step mathematical explanation for ExplainResultAccordion
 */
export function getPakistanFuelExplanationSteps(
  inputs: FuelMileageInputs,
  result: FuelMileageBreakdown
): string[] {
  const fuelName = inputs.primaryFuelType === "diesel" ? "Diesel" : "Petrol";
  const fuelRate = inputs.primaryFuelType === "diesel" ? inputs.dieselPrice : inputs.petrolPrice;

  return [
    `Running Cost Per KM: ${fuelName} = PKR ${fuelRate}/L ÷ ${inputs.petrolMileageKml} km/L = PKR ${result.petrolCostPerKm.toFixed(2)}/km`,
    `Hybrid Running Cost: PKR ${fuelRate}/L ÷ ${inputs.hybridMileageKml} km/L = PKR ${result.hybridCostPerKm.toFixed(2)}/km (Saves ${result.hybridPercentSavings}% per km)`,
    `EV Running Cost: PKR ${result.effectiveEvRate}/kWh ÷ ${inputs.evEfficiencyKmKwh} km/kWh = PKR ${result.evCostPerKm.toFixed(2)}/km ${inputs.hasSolarCharging ? "(100% Free Solar Charging)" : `(Saves ${result.evPercentSavings}% per km)`}`,
    `Monthly Expense (${result.monthlyDistanceKm.toLocaleString()} km): Petrol = PKR ${result.petrolCostMonthly.toLocaleString()} | Hybrid = PKR ${result.hybridCostMonthly.toLocaleString()} | EV = PKR ${result.evCostMonthly.toLocaleString()}`,
    `Annual Savings: Switching from Petrol to Hybrid saves PKR ${result.hybridAnnualSavings.toLocaleString()} / year; Switching to EV saves PKR ${result.evAnnualSavings.toLocaleString()} / year.`,
    result.evPaybackYears !== null
      ? `Payback Analysis: The purchase price difference of PKR ${((inputs.evCarPriceLacs! - inputs.petrolCarPriceLacs!) * 100000).toLocaleString()} for an EV is recovered in approximately ${result.evPaybackYears} years (${result.evPaybackMonths} months) purely through fuel savings.`
      : "Payback Analysis: Enter vehicle purchase prices in Lacs to calculate exact payback duration.",
  ];
}
