/**
 * Shoe Size Conversion Logic
 * 
 * Lookup arrays for Men's and Women's standard sizes.
 * Linear interpolation is used for sizes between grid values.
 */

export type SizingSystem = "us" | "uk" | "eu" | "jp";

export interface ShoeSizeEntry {
  us: number;
  uk: number;
  eu: number;
  jp: number; // Japan size is in cm
}

const MENS_GRID: ShoeSizeEntry[] = [
  { us: 4,   uk: 3.5, eu: 36,   jp: 22 },
  { us: 4.5, uk: 4,   eu: 37,   jp: 22.5 },
  { us: 5,   uk: 4.5, eu: 37.5, jp: 23 },
  { us: 5.5, uk: 5,   eu: 38,   jp: 23.5 },
  { us: 6,   uk: 5.5, eu: 39,   jp: 24 },
  { us: 6.5, uk: 6,   eu: 39.5, jp: 24.5 },
  { us: 7,   uk: 6.5, eu: 40,   jp: 25 },
  { us: 7.5, uk: 7,   eu: 40.5, jp: 25.5 },
  { us: 8,   uk: 7.5, eu: 41,   jp: 26 },
  { us: 8.5, uk: 8,   eu: 41.5, jp: 26.5 },
  { us: 9,   uk: 8.5, eu: 42,   jp: 27 },
  { us: 9.5, uk: 9,   eu: 42.5, jp: 27.5 },
  { us: 10,  uk: 9.5, eu: 43,   jp: 28 },
  { us: 10.5,uk: 10,  eu: 43.5, jp: 28.5 },
  { us: 11,  uk: 10.5,eu: 44,   jp: 29 },
  { us: 11.5,uk: 11,  eu: 44.5, jp: 29.5 },
  { us: 12,  uk: 11.5,eu: 45,   jp: 30 },
  { us: 13,  uk: 12.5,eu: 46,   jp: 31 },
  { us: 14,  uk: 13.5,eu: 47,   jp: 32 },
  { us: 15,  uk: 14.5,eu: 48,   jp: 33 },
  { us: 16,  uk: 15.5,eu: 49,   jp: 34 }
];

const WOMENS_GRID: ShoeSizeEntry[] = [
  { us: 3,   uk: 1,   eu: 34,   jp: 20 },
  { us: 3.5, uk: 1.5, eu: 34.5, jp: 20.5 },
  { us: 4,   uk: 2,   eu: 35,   jp: 21 },
  { us: 4.5, uk: 2.5, eu: 35.5, jp: 21.5 },
  { us: 5,   uk: 3,   eu: 36,   jp: 22 },
  { us: 5.5, uk: 3.5, eu: 36.5, jp: 22.5 },
  { us: 6,   uk: 4,   eu: 37,   jp: 23 },
  { us: 6.5, uk: 4.5, eu: 37.5, jp: 23.5 },
  { us: 7,   uk: 5,   eu: 38,   jp: 24 },
  { us: 7.5, uk: 5.5, eu: 38.5, jp: 24.5 },
  { us: 8,   uk: 6,   eu: 39,   jp: 25 },
  { us: 8.5, uk: 6.5, eu: 39.5, jp: 25.5 },
  { us: 9,   uk: 7,   eu: 40,   jp: 26 },
  { us: 9.5, uk: 7.5, eu: 40.5, jp: 26.5 },
  { us: 10,  uk: 8,   eu: 41,   jp: 27 },
  { us: 10.5,uk: 8.5,  eu: 41.5, jp: 27.5 },
  { us: 11,  uk: 9,   eu: 42,   jp: 28 },
  { us: 11.5,uk: 9.5,  eu: 42.5, jp: 28.5 },
  { us: 12,  uk: 10,  eu: 43,   jp: 29 },
  { us: 13,  uk: 11,  eu: 44,   jp: 30 },
  { us: 14,  uk: 12,  eu: 45,   jp: 31 }
];

export interface ShoeConversionResult {
  us: number;
  uk: number;
  eu: number;
  jp: number;
}

export function convertShoeSize(
  gender: "mens" | "womens",
  size: number,
  system: SizingSystem
): ShoeConversionResult | string {
  if (isNaN(size) || size <= 0) {
    return "Enter a shoe size to see the conversions";
  }

  const grid = gender === "mens" ? MENS_GRID : WOMENS_GRID;

  // Unrealistic bounds check
  const minVal = grid[0][system];
  const maxVal = grid[grid.length - 1][system];

  if (size < minVal - 2 || size > maxVal + 4) {
    return "That doesn't look like a standard size — check your input";
  }

  // Find surrounding entries for interpolation
  let lowIdx = -1;
  let highIdx = -1;

  for (let i = 0; i < grid.length; i++) {
    if (grid[i][system] === size) {
      return {
        us: parseFloat(grid[i].us.toFixed(1)),
        uk: parseFloat(grid[i].uk.toFixed(1)),
        eu: parseFloat(grid[i].eu.toFixed(1)),
        jp: parseFloat(grid[i].jp.toFixed(1)),
      };
    }
    if (grid[i][system] < size) {
      lowIdx = i;
    }
    if (grid[i][system] > size && highIdx === -1) {
      highIdx = i;
    }
  }

  // Handle extrapolation below grid
  if (lowIdx === -1) {
    const next = grid[0];
    const diff = next[system] - size;
    // extrapolation ratios based on systems
    return {
      us: parseFloat(Math.max(1, next.us - diff * (system === "eu" ? 0.75 : 1)).toFixed(1)),
      uk: parseFloat(Math.max(0.5, next.uk - diff * (system === "eu" ? 0.75 : 1)).toFixed(1)),
      eu: parseFloat(Math.max(30, next.eu - diff * (system === "us" ? 1.33 : 1)).toFixed(1)),
      jp: parseFloat(Math.max(15, next.jp - diff * (system === "eu" ? 0.5 : 1)).toFixed(1)),
    };
  }

  // Handle extrapolation above grid
  if (highIdx === -1) {
    const last = grid[grid.length - 1];
    const diff = size - last[system];
    return {
      us: parseFloat((last.us + diff * (system === "eu" ? 0.75 : 1)).toFixed(1)),
      uk: parseFloat((last.uk + diff * (system === "eu" ? 0.75 : 1)).toFixed(1)),
      eu: parseFloat((last.eu + diff * (system === "us" ? 1.33 : 1)).toFixed(1)),
      jp: parseFloat((last.jp + diff * (system === "eu" ? 0.5 : 1)).toFixed(1)),
    };
  }

  // Interpolation
  const low = grid[lowIdx];
  const high = grid[highIdx];
  const ratio = (size - low[system]) / (high[system] - low[system]);

  const interpolate = (prop: SizingSystem) => {
    const val = low[prop] + ratio * (high[prop] - low[prop]);
    return parseFloat(val.toFixed(1));
  };

  return {
    us: interpolate("us"),
    uk: interpolate("uk"),
    eu: interpolate("eu"),
    jp: interpolate("jp"),
  };
}
