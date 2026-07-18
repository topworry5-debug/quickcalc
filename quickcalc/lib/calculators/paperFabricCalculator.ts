/**
 * Paper & Fabric Size Conversion Logic
 */

export interface PaperSize {
  name: string;
  widthMm: number;
  heightMm: number;
}

export const PAPER_SIZES: Record<string, PaperSize> = {
  a0: { name: "A0", widthMm: 841, heightMm: 1189 },
  a1: { name: "A1", widthMm: 594, heightMm: 841 },
  a2: { name: "A2", widthMm: 420, heightMm: 594 },
  a3: { name: "A3", widthMm: 297, heightMm: 420 },
  a4: { name: "A4", widthMm: 210, heightMm: 297 },
  a5: { name: "A5", widthMm: 148, heightMm: 210 },
  a6: { name: "A6", widthMm: 105, heightMm: 148 },
  a7: { name: "A7", widthMm: 74, heightMm: 105 },
  a8: { name: "A8", widthMm: 52, heightMm: 74 },
  a9: { name: "A9", widthMm: 37, heightMm: 52 },
  a10: { name: "A10", widthMm: 26, heightMm: 37 },
  letter: { name: "Letter (US)", widthMm: 215.9, heightMm: 279.4 },
  legal: { name: "Legal (US)", widthMm: 215.9, heightMm: 355.6 },
  tabloid: { name: "Tabloid (US)", widthMm: 279.4, heightMm: 431.8 },
};

export interface PaperSizeResult {
  name: string;
  mm: { width: number; height: number };
  cm: { width: number; height: number };
  inches: { width: number; height: number };
}

export function getPaperSizeResult(key: string): PaperSizeResult | null {
  const paper = PAPER_SIZES[key];
  if (!paper) return null;

  return {
    name: paper.name,
    mm: {
      width: parseFloat(paper.widthMm.toFixed(1)),
      height: parseFloat(paper.heightMm.toFixed(1)),
    },
    cm: {
      width: parseFloat((paper.widthMm / 10).toFixed(2)),
      height: parseFloat((paper.heightMm / 10).toFixed(2)),
    },
    inches: {
      width: parseFloat((paper.widthMm / 25.4).toFixed(3)),
      height: parseFloat((paper.heightMm / 25.4).toFixed(3)),
    },
  };
}

export type FabricUnit = "yards" | "meters" | "inches" | "cm";

export interface FabricConversionResult {
  yards: number;
  meters: number;
  inches: number;
  cm: number;
}

// Convert fabric lengths
export function convertFabricLength(
  value: number,
  fromUnit: FabricUnit
): FabricConversionResult | string {
  if (isNaN(value) || value <= 0) {
    return "Enter a length greater than 0 to convert fabric measurements";
  }

  // Convert to meters first (base unit)
  let meters = 0;
  switch (fromUnit) {
    case "meters":
      meters = value;
      break;
    case "yards":
      meters = value * 0.9144;
      break;
    case "inches":
      meters = value * 0.0254;
      break;
    case "cm":
      meters = value * 0.01;
      break;
  }

  return {
    meters: parseFloat(meters.toFixed(4)),
    yards: parseFloat((meters / 0.9144).toFixed(4)),
    inches: parseFloat((meters / 0.0254).toFixed(2)),
    cm: parseFloat((meters / 0.01).toFixed(2)),
  };
}
