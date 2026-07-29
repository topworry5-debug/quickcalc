/**
 * Speed, Distance & Time Calculator Logic
 */

// --- CORE S-D-T CONVERSIONS ---

// Base units: Distance in meters, Time in seconds, Speed in meters per second (m/s)

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

export interface CoreSDTParams {
  calculateType: "speed" | "distance" | "time";
  distance?: number;
  distanceUnit: DistanceUnit;
  time?: number;
  timeUnit: TimeUnit;
  speed?: number;
  speedUnit: SpeedUnit;
}

export interface CoreSDTResult {
  calculatedValue: number;
  speedVal: number; // in current speedUnit
  distanceVal: number; // in current distanceUnit
  timeVal: number; // in current timeUnit
  formattedTime: string; // e.g. "1h 15m 30s"
}

export function calculateCoreSDT({
  calculateType,
  distance = 0,
  distanceUnit,
  time = 0,
  timeUnit,
  speed = 0,
  speedUnit,
}: CoreSDTParams): CoreSDTResult | null {
  if (calculateType === "speed") {
    if (distance <= 0 || time <= 0) return null;
    const distanceBase = DISTANCE_UNITS[distanceUnit].toBase(distance);
    const timeBase = TIME_UNITS[timeUnit].toBase(time);
    const speedBase = distanceBase / timeBase; // m/s
    const calculated = SPEED_UNITS[speedUnit].fromBase(speedBase);
    return {
      calculatedValue: calculated,
      speedVal: calculated,
      distanceVal: distance,
      timeVal: time,
      formattedTime: formatSeconds(timeBase),
    };
  } else if (calculateType === "distance") {
    if (speed <= 0 || time <= 0) return null;
    const speedBase = SPEED_UNITS[speedUnit].toBase(speed);
    const timeBase = TIME_UNITS[timeUnit].toBase(time);
    const distanceBase = speedBase * timeBase; // meters
    const calculated = DISTANCE_UNITS[distanceUnit].fromBase(distanceBase);
    return {
      calculatedValue: calculated,
      speedVal: speed,
      distanceVal: calculated,
      timeVal: time,
      formattedTime: formatSeconds(timeBase),
    };
  } else {
    // calculate time
    if (distance <= 0 || speed <= 0) return null;
    const distanceBase = DISTANCE_UNITS[distanceUnit].toBase(distance);
    const speedBase = SPEED_UNITS[speedUnit].toBase(speed);
    const timeBase = distanceBase / speedBase; // seconds
    const calculated = TIME_UNITS[timeUnit].fromBase(timeBase);
    return {
      calculatedValue: calculated,
      speedVal: speed,
      distanceVal: distance,
      timeVal: calculated,
      formattedTime: formatSeconds(timeBase),
    };
  }
}

export function formatSeconds(totalSecs: number): string {
  if (totalSecs <= 0 || isNaN(totalSecs) || !isFinite(totalSecs)) return "0s";
  const h = Math.floor(totalSecs / 3600);
  const m = Math.floor((totalSecs % 3600) / 60);
  const s = parseFloat((totalSecs % 60).toFixed(1));

  const parts = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0 || parts.length === 0) parts.push(`${s}s`);
  return parts.join(" ");
}

// --- RUNNING PACE CALCULATOR ---

export interface RunningPaceParams {
  distance: number;
  distanceUnit: "km" | "miles" | "meters";
  // time split
  hours: number;
  minutes: number;
  seconds: number;
}

export interface RunningPaceResult {
  speedKmh: number;
  speedMph: number;
  paceMinKm: string; // min:sec / km
  paceMinMile: string; // min:sec / mile
  totalSeconds: number;
}

export function calculateRunningPace({
  distance,
  distanceUnit,
  hours,
  minutes,
  seconds,
}: RunningPaceParams): RunningPaceResult | null {
  if (distance <= 0) return null;
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds <= 0) return null;

  // Convert distance to km and miles
  let distKm = 0;
  if (distanceUnit === "km") distKm = distance;
  else if (distanceUnit === "miles") distKm = distance * 1.609344;
  else distKm = distance / 1000; // meters

  const distMiles = distKm / 1.609344;

  if (distKm <= 0) return null;

  const hoursTotal = totalSeconds / 3600;
  const speedKmh = distKm / hoursTotal;
  const speedMph = distMiles / hoursTotal;

  // Pace: seconds per km / mile
  const paceSecsPerKm = totalSeconds / distKm;
  const paceSecsPerMile = totalSeconds / distMiles;

  const formatPace = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return {
    speedKmh: parseFloat(speedKmh.toFixed(2)),
    speedMph: parseFloat(speedMph.toFixed(2)),
    paceMinKm: formatPace(paceSecsPerKm),
    paceMinMile: formatPace(paceSecsPerMile),
    totalSeconds,
  };
}

// --- FLIGHT TIME ESTIMATOR ---

export interface FlightTimeParams {
  distance: number;
  distanceUnit: "km" | "miles" | "nm"; // nautical miles
  aircraftType: "commercial" | "turboprop" | "piston" | "custom";
  customSpeed?: number; // in knots or mph/kmh depending on setting
  speedUnit: "knots" | "mph" | "km/h";
  windSpeed: number; // in knots
  windType: "headwind" | "tailwind" | "none";
}

export interface FlightTimeResult {
  groundSpeed: number; // in speedUnit
  airSpeed: number; // in speedUnit
  flightDurationSeconds: number; // cruising time
  totalDurationSeconds: number; // cruise + 30 mins buffer (takeoff, taxi, climb, descent)
  formattedCruisingTime: string;
  formattedTotalTime: string;
}

export function calculateFlightTime({
  distance,
  distanceUnit,
  aircraftType,
  customSpeed = 0,
  speedUnit,
  windSpeed = 0,
  windType,
}: FlightTimeParams): FlightTimeResult | null {
  if (distance <= 0) return null;

  // Typical cruising airspeed in knots (kt)
  let airspeedKt = 480; // Commercial Jet
  if (aircraftType === "turboprop") airspeedKt = 280;
  else if (aircraftType === "piston") airspeedKt = 140;
  else if (aircraftType === "custom") {
    // Convert custom speed to knots
    if (customSpeed <= 0) return null;
    if (speedUnit === "knots") airspeedKt = customSpeed;
    else if (speedUnit === "mph") airspeedKt = customSpeed / 1.15078;
    else airspeedKt = customSpeed / 1.852; // km/h to knots
  }

  // Adjust for headwind / tailwind
  let groundspeedKt = airspeedKt;
  if (windType === "headwind") {
    groundspeedKt = Math.max(20, airspeedKt - windSpeed);
  } else if (windType === "tailwind") {
    groundspeedKt = airspeedKt + windSpeed;
  }

  // Convert distance to nautical miles (nm)
  let distNm = 0;
  if (distanceUnit === "nm") distNm = distance;
  else if (distanceUnit === "km") distNm = distance / 1.852;
  else distNm = distance / 1.15078; // miles to nm

  // Flight duration (cruising) in hours
  const cruiseHours = distNm / groundspeedKt;
  const cruiseSeconds = cruiseHours * 3600;

  // Add 25 minutes buffer (1500 seconds) for takeoff, taxi, climb, descent, landing
  const bufferSeconds = 25 * 60;
  const totalSeconds = cruiseSeconds + bufferSeconds;

  // Output speeds in requested unit
  const convertFromKnots = (kt: number, targetUnit: "knots" | "mph" | "km/h") => {
    if (targetUnit === "knots") return kt;
    if (targetUnit === "mph") return kt * 1.15078;
    return kt * 1.852; // km/h
  };

  return {
    groundSpeed: parseFloat(convertFromKnots(groundspeedKt, speedUnit).toFixed(1)),
    airSpeed: parseFloat(convertFromKnots(airspeedKt, speedUnit).toFixed(1)),
    flightDurationSeconds: Math.round(cruiseSeconds),
    totalDurationSeconds: Math.round(totalSeconds),
    formattedCruisingTime: formatSeconds(cruiseSeconds),
    formattedTotalTime: formatSeconds(totalSeconds),
  };
}

// --- FUEL COST ESTIMATOR ---

export interface FuelCostParams {
  distance: number;
  distanceUnit: "km" | "miles";
  efficiency: number;
  efficiencyUnit: "l/100km" | "mpg_us" | "mpg_uk" | "km/l";
  fuelPrice: number; // price per unit (Litre or Gallon)
  pricePerUnit: "litre" | "gallon_us";
}

export interface FuelCostResult {
  fuelUsedLitres: number;
  fuelUsedGallonsUs: number;
  totalCost: number;
}

export function calculateFuelCost({
  distance,
  distanceUnit,
  efficiency,
  efficiencyUnit,
  fuelPrice,
  pricePerUnit,
}: FuelCostParams): FuelCostResult | null {
  if (distance <= 0 || efficiency <= 0 || fuelPrice < 0) return null;

  // Convert distance to km for calculations
  const distKm = distanceUnit === "miles" ? distance * 1.609344 : distance;

  // Calculate fuel consumption in liters per 100 km (L/100km)
  let l100km = 0;
  if (efficiencyUnit === "l/100km") {
    l100km = efficiency;
  } else if (efficiencyUnit === "km/l") {
    l100km = 100 / efficiency;
  } else if (efficiencyUnit === "mpg_us") {
    // 235.215 / mpg
    l100km = 235.214583 / efficiency;
  } else if (efficiencyUnit === "mpg_uk") {
    // 282.481 / mpg
    l100km = 282.480936 / efficiency;
  }

  // Total fuel in liters
  const fuelUsedLitres = (distKm * l100km) / 100;
  const fuelUsedGallonsUs = fuelUsedLitres / 3.785411784;

  // Calculate price
  let totalCost = 0;
  if (pricePerUnit === "litre") {
    totalCost = fuelUsedLitres * fuelPrice;
  } else {
    totalCost = fuelUsedGallonsUs * fuelPrice;
  }

  return {
    fuelUsedLitres: parseFloat(fuelUsedLitres.toFixed(2)),
    fuelUsedGallonsUs: parseFloat(fuelUsedGallonsUs.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
  };
}
