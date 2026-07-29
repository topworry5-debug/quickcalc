/**
 * Travel Time and Fuel Cost Calculator logic
 */

export const DISTANCE_UNITS = {
  km: { name: "Kilometers (km)", toBase: (val: number) => val * 1000, fromBase: (val: number) => val / 1000 },
  miles: { name: "Miles (mi)", toBase: (val: number) => val * 1609.344, fromBase: (val: number) => val / 1609.344 },
  meters: { name: "Meters (m)", toBase: (val: number) => val, fromBase: (val: number) => val },
};

export const TIME_UNITS = {
  hours: { name: "Hours (h)", toBase: (val: number) => val * 3600, fromBase: (val: number) => val / 3600 },
  minutes: { name: "Minutes (min)", toBase: (val: number) => val * 60, fromBase: (val: number) => val / 60 },
  seconds: { name: "Seconds (s)", toBase: (val: number) => val, fromBase: (val: number) => val },
};

export const SPEED_UNITS = {
  "km/h": { name: "Kilometers per Hour (km/h)", toBase: (val: number) => val / 3.6, fromBase: (val: number) => val * 3.6 },
  mph: { name: "Miles per Hour (mph)", toBase: (val: number) => val * 0.44704, fromBase: (val: number) => val / 0.44704 },
  "m/s": { name: "Meters per Second (m/s)", toBase: (val: number) => val, fromBase: (val: number) => val },
};

export type DistanceUnit = keyof typeof DISTANCE_UNITS;
export type TimeUnit = keyof typeof TIME_UNITS;
export type SpeedUnit = keyof typeof SPEED_UNITS;

export interface SDTResult {
  value: number;
  formatted: string;
  explanation: string;
}

export function formatTimeSeconds(totalSeconds: number): string {
  if (totalSeconds <= 0 || isNaN(totalSeconds) || !isFinite(totalSeconds)) return "0s";
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = parseFloat((totalSeconds % 60).toFixed(2));

  const parts = [];
  if (h > 0) parts.push(`${h} hr${h > 1 ? "s" : ""}`);
  if (m > 0) parts.push(`${m} min${m > 1 ? "s" : ""}`);
  if (s > 0 || parts.length === 0) parts.push(`${s} sec${s !== 1 ? "s" : ""}`);
  return parts.join(" ");
}

export function calculateSDT({
  calculateType,
  distance,
  distanceUnit,
  speed,
  speedUnit,
  time,
  timeUnit,
}: {
  calculateType: "time" | "distance" | "speed";
  distance: number;
  distanceUnit: DistanceUnit;
  speed: number;
  speedUnit: SpeedUnit;
  time: number;
  timeUnit: TimeUnit;
}): SDTResult | null {
  if (calculateType === "time") {
    if (distance <= 0 || speed <= 0 || isNaN(distance) || isNaN(speed)) return null;
    const distanceM = DISTANCE_UNITS[distanceUnit].toBase(distance);
    const speedMs = SPEED_UNITS[speedUnit].toBase(speed);
    const timeS = distanceM / speedMs;
    const resultVal = TIME_UNITS[timeUnit].fromBase(timeS);
    return {
      value: parseFloat(resultVal.toFixed(4)),
      formatted: formatTimeSeconds(timeS),
      explanation: `Time = Distance ÷ Speed\nTime = ${distance} ${distanceUnit} ÷ ${speed} ${speedUnit} = ${resultVal.toFixed(2)} ${timeUnit}`,
    };
  } else if (calculateType === "distance") {
    if (speed <= 0 || time <= 0 || isNaN(speed) || isNaN(time)) return null;
    const speedMs = SPEED_UNITS[speedUnit].toBase(speed);
    const timeS = TIME_UNITS[timeUnit].toBase(time);
    const distanceM = speedMs * timeS;
    const resultVal = DISTANCE_UNITS[distanceUnit].fromBase(distanceM);
    return {
      value: parseFloat(resultVal.toFixed(4)),
      formatted: `${parseFloat(resultVal.toFixed(2)).toLocaleString()} ${distanceUnit}`,
      explanation: `Distance = Speed × Time\nDistance = ${speed} ${speedUnit} × ${time} ${timeUnit} = ${resultVal.toFixed(2)} ${distanceUnit}`,
    };
  } else {
    // Speed
    if (distance <= 0 || time <= 0 || isNaN(distance) || isNaN(time)) return null;
    const distanceM = DISTANCE_UNITS[distanceUnit].toBase(distance);
    const timeS = TIME_UNITS[timeUnit].toBase(time);
    const speedMs = distanceM / timeS;
    const resultVal = SPEED_UNITS[speedUnit].fromBase(speedMs);
    return {
      value: parseFloat(resultVal.toFixed(4)),
      formatted: `${parseFloat(resultVal.toFixed(2)).toLocaleString()} ${speedUnit}`,
      explanation: `Speed = Distance ÷ Time\nSpeed = ${distance} ${distanceUnit} ÷ ${time} ${timeUnit} = ${resultVal.toFixed(2)} ${speedUnit}`,
    };
  }
}

// Flight duration estimation
export function calculateFlightDuration(
  distance: number,
  distanceUnit: DistanceUnit,
  speed: number,
  speedUnit: SpeedUnit
): { durationSeconds: number; formatted: string } | null {
  if (distance <= 0 || speed <= 0 || isNaN(distance) || isNaN(speed)) return null;
  const distanceM = DISTANCE_UNITS[distanceUnit].toBase(distance);
  const speedMs = SPEED_UNITS[speedUnit].toBase(speed);
  const durationS = distanceM / speedMs;
  return {
    durationSeconds: Math.round(durationS),
    formatted: formatTimeSeconds(durationS),
  };
}

// Fuel Cost calculator
export interface FuelCalculatorParams {
  distance: number;
  distanceUnit: "km" | "miles";
  efficiency: number; // e.g. 15 km/l or 30 mpg
  efficiencyUnit: "km/l" | "mpg_us" | "mpg_uk" | "l/100km";
  fuelPrice: number;
  priceUnit: "per_litre" | "per_gal_us" | "per_gal_uk";
}

export interface FuelCalculatorResult {
  totalFuelLiters: number;
  totalFuelGallonsUs: number;
  totalFuelGallonsUk: number;
  totalCost: number;
  efficiencyL100km: number;
}

export function calculateFuelCost({
  distance,
  distanceUnit,
  efficiency,
  efficiencyUnit,
  fuelPrice,
  priceUnit,
}: FuelCalculatorParams): FuelCalculatorResult | null {
  if (distance <= 0 || efficiency <= 0 || fuelPrice < 0 || isNaN(distance) || isNaN(efficiency) || isNaN(fuelPrice)) {
    return null;
  }

  // 1. Normalize distance to Kilometers
  const distanceKm = distanceUnit === "miles" ? distance * 1.609344 : distance;

  // 2. Convert Efficiency to L/100km (or directly calculate total fuel in Liters)
  let l100km = 0;
  if (efficiencyUnit === "l/100km") {
    l100km = efficiency;
  } else if (efficiencyUnit === "km/l") {
    l100km = 100 / efficiency;
  } else if (efficiencyUnit === "mpg_us") {
    // 1 US gallon = 3.785411784 L, 1 mile = 1.609344 km
    // L/100km = 235.214583 / mpg_us
    l100km = 235.214583 / efficiency;
  } else if (efficiencyUnit === "mpg_uk") {
    // 1 UK gallon = 4.54609 L, 1 mile = 1.609344 km
    // L/100km = 282.480936 / mpg_uk
    l100km = 282.480936 / efficiency;
  }

  const totalFuelLiters = (distanceKm * l100km) / 100;
  const totalFuelGallonsUs = totalFuelLiters / 3.785411784;
  const totalFuelGallonsUk = totalFuelLiters / 4.54609;

  // 3. Calculate cost based on Price Unit
  let totalCost = 0;
  if (priceUnit === "per_litre") {
    totalCost = totalFuelLiters * fuelPrice;
  } else if (priceUnit === "per_gal_us") {
    totalCost = totalFuelGallonsUs * fuelPrice;
  } else if (priceUnit === "per_gal_uk") {
    totalCost = totalFuelGallonsUk * fuelPrice;
  }

  return {
    totalFuelLiters: parseFloat(totalFuelLiters.toFixed(2)),
    totalFuelGallonsUs: parseFloat(totalFuelGallonsUs.toFixed(2)),
    totalFuelGallonsUk: parseFloat(totalFuelGallonsUk.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    efficiencyL100km: parseFloat(l100km.toFixed(2)),
  };
}
