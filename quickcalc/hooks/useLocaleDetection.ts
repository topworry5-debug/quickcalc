/**
 * useLocaleDetection
 *
 * Detects the visitor's likely locale and preferences purely from the browser's
 * built-in Intl API — no external API calls, no IP lookups, no data leaves
 * the device. Consistent with our "100% Client-Side & Private" positioning.
 *
 * Strategy:
 *   1. navigator.language / navigator.languages gives us a BCP-47 locale tag
 *      (e.g. "en-US", "de-DE", "en-GB", "ar-SA").
 *   2. We derive the region subtag (e.g. "US") from the first well-formed tag.
 *   3. We map that region to a currency code and unit system.
 *   4. If parsing fails at any step, we fall back gracefully to USD / metric.
 *
 * Returns a stable object (only changes if locale actually differs).
 * Safe to call during SSR — all detection is gated on `typeof window`.
 */

export type UnitSystem = "metric" | "imperial";

export interface LocaleDetectionResult {
  /** ISO 4217 currency code for the visitor's likely home country */
  currencyCode: string;
  /** "metric" for most of the world, "imperial" for US/Myanmar/Liberia */
  unitSystem: UnitSystem;
  /** The raw BCP-47 locale string we detected, or null if unavailable */
  detectedLocale: string | null;
}

// ---------------------------------------------------------------------------
// Region → Currency mapping
// Only regions where the currency differs from USD and is in our supported list.
// ---------------------------------------------------------------------------
const REGION_TO_CURRENCY: Record<string, string> = {
  // Europe
  DE: "EUR", FR: "EUR", IT: "EUR", ES: "EUR", NL: "EUR", BE: "EUR",
  AT: "EUR", PT: "EUR", FI: "EUR", GR: "EUR", IE: "EUR", LU: "EUR",
  SK: "EUR", SI: "EUR", EE: "EUR", LV: "EUR", LT: "EUR", CY: "EUR",
  MT: "EUR",
  GB: "GBP",
  CH: "CHF",
  SE: "SEK",
  NO: "NOK",
  DK: "DKK",
  PL: "PLN",
  TR: "TRY",
  RU: "RUB",
  // Asia-Pacific
  JP: "JPY",
  CN: "CNY",
  HK: "HKD",
  SG: "SGD",
  AU: "AUD",
  NZ: "NZD",
  IN: "INR",
  PK: "PKR",
  BD: "BDT",
  LK: "LKR",
  KR: "KRW",
  TH: "THB",
  VN: "VND",
  ID: "IDR",
  MY: "MYR",
  PH: "PHP",
  // Middle East
  AE: "AED",
  SA: "SAR",
  KW: "KWD",
  QA: "QAR",
  BH: "BHD",
  OM: "OMR",
  EG: "EGP",
  // Americas
  CA: "CAD",
  BR: "BRL",
  MX: "MXN",
  // Africa
  ZA: "ZAR",
  NG: "NGN",
};

// Countries that use imperial units (US is by far the primary one; Myanmar and
// Liberia technically use imperial for some measures but their locales typically
// report metric, so we only flip to imperial for US).
const IMPERIAL_REGIONS = new Set(["US"]);

/**
 * Derive a 2-letter region code from a BCP-47 locale string.
 * "en-US" → "US", "de-DE" → "DE", "zh-Hans-CN" → "CN", "en" → null
 */
function regionFromLocale(locale: string): string | null {
  // BCP-47 subtags are separated by hyphens. The region subtag is always
  // exactly 2 ASCII letters (alpha-2) or 3 digits. We scan all subtags.
  const parts = locale.split("-");
  for (let i = 1; i < parts.length; i++) {
    if (/^[A-Za-z]{2}$/.test(parts[i])) {
      return parts[i].toUpperCase();
    }
  }
  return null;
}

/**
 * Run detection synchronously once on the client.
 * Returns null during SSR (window is not available).
 */
export function detectLocale(): LocaleDetectionResult | null {
  if (typeof window === "undefined") return null;

  try {
    // Prefer navigator.languages (ordered list), fall back to navigator.language
    const langs: readonly string[] =
      (navigator.languages && navigator.languages.length > 0)
        ? navigator.languages
        : navigator.language
          ? [navigator.language]
          : [];

    if (langs.length === 0) return null;

    // Try each locale tag until we find one with a parseable region
    let region: string | null = null;
    let detectedLocale: string | null = null;

    for (const lang of langs) {
      region = regionFromLocale(lang);
      if (region) {
        detectedLocale = lang;
        break;
      }
    }

    // Could not parse a region — return null so callers use their hardcoded defaults
    if (!region) return null;

    const currencyCode = REGION_TO_CURRENCY[region] ?? "USD";
    const unitSystem: UnitSystem = IMPERIAL_REGIONS.has(region) ? "imperial" : "metric";

    return { currencyCode, unitSystem, detectedLocale };
  } catch {
    // Any unexpected error → fall back silently
    return null;
  }
}

/**
 * React hook version: runs detection once after mount (avoids SSR mismatch)
 * and returns a stable result. The returned value is null on the first render
 * (server) and populates on the first client paint — callers should initialise
 * their state with sensible defaults and apply the detected value in a
 * useEffect, so there is no layout shift on SSR-hydrated pages.
 */
import { useState, useEffect } from "react";

export function useLocaleDetection(): LocaleDetectionResult | null {
  const [result, setResult] = useState<LocaleDetectionResult | null>(null);

  useEffect(() => {
    // Run synchronously on mount — Intl API is instant, no async needed
    const detected = detectLocale();
    if (detected) setResult(detected);
  }, []);

  return result;
}
