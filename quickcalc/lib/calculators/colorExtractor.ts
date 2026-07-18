/**
 * Color Extraction and Accessibility Utilities
 */

export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Converts Hex to RGB
 */
export function hexToRgb(hex: string): ColorRGB | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculates relative luminance for WCAG contrast
 */
export function getRelativeLuminance(rgb: ColorRGB): number {
  const a = [rgb.r, rgb.g, rgb.b].map((v) => {
    const val = v / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Calculates WCAG contrast ratio between two hex colors
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 1;

  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);

  const brightest = Math.max(l1, l2);
  const darkest = Math.min(l1, l2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Extracts 6-8 dominant colors from canvas pixels.
 * Uses a grid-sampling bucketing approach to ensure distinct, spread-out hues.
 */
export function extractDominantColors(canvas: HTMLCanvasElement, count: number = 8): string[] {
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  // Sample fewer pixels for extreme high performance (e.g. 100x100 grid)
  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // Let's count colors and cluster them based on color distance
  const colorCounts: Record<string, number> = {};

  for (let i = 0; i < data.length; i += 40) { // step by 10 pixels for speed
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Ignore mostly transparent pixels
    if (a < 128) continue;

    // Quantize colors slightly to group similar shades (bucket to nearest multiple of 8)
    const qr = Math.round(r / 8) * 8;
    const qg = Math.round(g / 8) * 8;
    const qb = Math.round(b / 8) * 8;

    const hex = rgbToHex(qr, qg, qb);
    colorCounts[hex] = (colorCounts[hex] || 0) + 1;
  }

  // Sort by frequency
  const sortedColors = Object.entries(colorCounts).sort((a, b) => b[1] - a[1]);

  // Select unique, visually distinct colors (using CIEDE2000 or simple Euclidean distance in RGB)
  const finalColors: string[] = [];

  for (const [hex] of sortedColors) {
    if (finalColors.length >= count) break;

    const rgb = hexToRgb(hex);
    if (!rgb) continue;

    // Check if this color is too similar to any color we already picked
    const isDistinct = finalColors.every((pickedHex) => {
      const pickedRgb = hexToRgb(pickedHex);
      if (!pickedRgb) return true;

      // Euclidean distance in RGB space
      const dist = Math.sqrt(
        Math.pow(rgb.r - pickedRgb.r, 2) +
        Math.pow(rgb.g - pickedRgb.g, 2) +
        Math.pow(rgb.b - pickedRgb.b, 2)
      );

      // Distance threshold: ~55 ensures visually distinct swatches
      return dist > 55;
    });

    if (isDistinct) {
      finalColors.push(hex);
    }
  }

  // Fallback if we couldn't find enough distinct colors
  if (finalColors.length < 6 && sortedColors.length > 0) {
    for (const [hex] of sortedColors) {
      if (finalColors.length >= count) break;
      if (!finalColors.includes(hex)) {
        finalColors.push(hex);
      }
    }
  }

  return finalColors;
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, val));
  const toHex = (c: number) => {
    const hex = clamp(c).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return "#" + toHex(r) + toHex(g) + toHex(b);
}
