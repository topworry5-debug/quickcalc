export type StorageUnitKey =
  | "bits"
  | "bytes"
  | "kb"
  | "mb"
  | "gb"
  | "tb"
  | "pb";

export type StorageMode = "decimal" | "binary";

export interface StorageUnitConfig {
  key: StorageUnitKey;
  decimalLabel: string;
  binaryLabel: string;
  decimalSymbol: string;
  binarySymbol: string;
  power: number; // exponent for base (0 for bytes, 1 for KB/KiB, 2 for MB/MiB, etc.)
}

export const STORAGE_UNITS: StorageUnitConfig[] = [
  {
    key: "bits",
    decimalLabel: "Bits",
    binaryLabel: "Bits",
    decimalSymbol: "b",
    binarySymbol: "b",
    power: -1, // special handling (1 byte = 8 bits)
  },
  {
    key: "bytes",
    decimalLabel: "Bytes",
    binaryLabel: "Bytes",
    decimalSymbol: "B",
    binarySymbol: "B",
    power: 0,
  },
  {
    key: "kb",
    decimalLabel: "Kilobytes",
    binaryLabel: "Kibibytes",
    decimalSymbol: "KB",
    binarySymbol: "KiB",
    power: 1,
  },
  {
    key: "mb",
    decimalLabel: "Megabytes",
    binaryLabel: "Mebibytes",
    decimalSymbol: "MB",
    binarySymbol: "MiB",
    power: 2,
  },
  {
    key: "gb",
    decimalLabel: "Gigabytes",
    binaryLabel: "Gibibytes",
    decimalSymbol: "GB",
    binarySymbol: "GiB",
    power: 3,
  },
  {
    key: "tb",
    decimalLabel: "Terabytes",
    binaryLabel: "Tebibytes",
    decimalSymbol: "TB",
    binarySymbol: "TiB",
    power: 4,
  },
  {
    key: "pb",
    decimalLabel: "Petabytes",
    binaryLabel: "Pebibytes",
    decimalSymbol: "PB",
    binarySymbol: "PiB",
    power: 5,
  },
];

export interface ConvertedUnitValue {
  key: StorageUnitKey;
  label: string;
  symbol: string;
  value: number;
  formattedValue: string;
}

export interface DigitalStorageResult {
  sourceValue: number;
  sourceUnit: StorageUnitKey;
  mode: StorageMode;
  baseBytes: number;
  convertedUnits: ConvertedUnitValue[];
  osDiskComparison?: {
    decimalGb: number;
    binaryGib: number;
    differenceGb: number;
    percentageDifference: number;
  };
}

export function formatStorageNumber(num: number): string {
  if (isNaN(num) || !isFinite(num)) return "0";
  if (num === 0) return "0";

  const absNum = Math.abs(num);

  if (absNum >= 1e15) {
    return num.toExponential(4);
  }

  if (absNum < 0.000001) {
    return num.toExponential(4);
  }

  if (Number.isInteger(num)) {
    return num.toLocaleString("en-US");
  }

  // Determine decimal places needed based on magnitude
  let decimals = 2;
  if (absNum < 0.01) decimals = 6;
  else if (absNum < 1) decimals = 4;
  else if (absNum < 100) decimals = 3;

  const formatted = num.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });

  return formatted;
}

export function convertDigitalStorage(
  value: number,
  sourceUnit: StorageUnitKey,
  mode: StorageMode
): DigitalStorageResult {
  const baseFactor = mode === "binary" ? 1024 : 1000;
  const sourceConfig = STORAGE_UNITS.find((u) => u.key === sourceUnit) || STORAGE_UNITS[1];

  // Convert source input value to total bytes
  let totalBytes = 0;
  if (sourceUnit === "bits") {
    totalBytes = value / 8;
  } else {
    totalBytes = value * Math.pow(baseFactor, sourceConfig.power);
  }

  // Calculate simultaneous values across all units
  const convertedUnits: ConvertedUnitValue[] = STORAGE_UNITS.map((unit) => {
    let val = 0;
    if (unit.key === "bits") {
      val = totalBytes * 8;
    } else {
      val = totalBytes / Math.pow(baseFactor, unit.power);
    }

    const label = mode === "binary" ? unit.binaryLabel : unit.decimalLabel;
    const symbol = mode === "binary" ? unit.binarySymbol : unit.decimalSymbol;

    return {
      key: unit.key,
      label,
      symbol,
      value: val,
      formattedValue: formatStorageNumber(val),
    };
  });

  // Calculate OS hard drive capacity comparison (e.g. 1 TB drive = 931.32 GiB in Windows)
  let osDiskComparison;
  if (sourceUnit === "tb" || sourceUnit === "gb" || sourceUnit === "pb") {
    const decimalBytes = value * Math.pow(1000, sourceConfig.power);
    const binaryGib = decimalBytes / Math.pow(1024, 3); // GiB in Windows
    const decimalGb = decimalBytes / Math.pow(1000, 3);
    const diff = decimalGb - binaryGib;
    const percentDiff = ((decimalGb - binaryGib) / decimalGb) * 100;

    osDiskComparison = {
      decimalGb: Math.round(decimalGb * 100) / 100,
      binaryGib: Math.round(binaryGib * 100) / 100,
      differenceGb: Math.round(diff * 100) / 100,
      percentageDifference: Math.round(percentDiff * 10) / 10,
    };
  }

  return {
    sourceValue: value,
    sourceUnit,
    mode,
    baseBytes: totalBytes,
    convertedUnits,
    osDiskComparison,
  };
}

export function getDigitalStorageExplanationSteps(
  value: number,
  sourceUnit: StorageUnitKey,
  mode: StorageMode,
  result: DigitalStorageResult
): string[] {
  const steps: string[] = [];
  const baseFactor = mode === "binary" ? 1024 : 1000;
  const sourceConfig = STORAGE_UNITS.find((u) => u.key === sourceUnit) || STORAGE_UNITS[1];
  const unitLabel = mode === "binary" ? sourceConfig.binarySymbol : sourceConfig.decimalSymbol;

  // Step 1: Base Factor & Unit Mode
  steps.push(
    `Step 1 (Unit Standard & Multiplier): Selected mode is ${
      mode === "binary" ? "Binary / IEC (1024-based)" : "Decimal / SI (1000-based)"
    }. Multiplier base is ${baseFactor}.`
  );

  // Step 2: Convert to Base Bytes
  if (sourceUnit === "bits") {
    steps.push(
      `Step 2 (Convert to Bytes): ${value} bits ÷ 8 bits/byte = ${formatStorageNumber(result.baseBytes)} Bytes.`
    );
  } else {
    steps.push(
      `Step 2 (Convert to Bytes): ${value} ${unitLabel} × ${baseFactor}^${sourceConfig.power} = ${formatStorageNumber(result.baseBytes)} Bytes.`
    );
  }

  // Step 3: Simultaneous Conversions
  const gbUnit = result.convertedUnits.find((u) => u.key === "gb");
  const mbUnit = result.convertedUnits.find((u) => u.key === "mb");
  steps.push(
    `Step 3 (Multi-Unit Translation): ${value} ${unitLabel} equals ${mbUnit?.formattedValue} ${mbUnit?.symbol} and ${gbUnit?.formattedValue} ${gbUnit?.symbol}.`
  );

  // Step 4: Practical OS Insight
  if (result.osDiskComparison) {
    steps.push(
      `Step 4 (OS vs Manufacturer Capacity): Operating systems (like Windows) calculate 1 ${unitLabel} using 1024^3 bytes (${result.osDiskComparison.binaryGib} ${
        mode === "binary" ? "GiB" : "GiB equivalent"
      }), whereas drive makers advertise using 1000^3 bytes (${result.osDiskComparison.decimalGb} GB), resulting in a ~${result.osDiskComparison.percentageDifference}% reporting difference.`
    );
  }

  return steps;
}
