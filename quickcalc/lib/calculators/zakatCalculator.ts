/**
 * Zakat Calculator Utilities
 */

export interface ZakatConfig {
  cash: number;
  goldGrams: number;
  silverGrams: number;
  businessAssets: number;
  investments: number;
  moneyOwedToYou: number;
  moneyOwedToOthers: number;
  goldPricePerGram: number;
  silverPricePerGram: number;
  nisabStandard: "gold" | "silver";
}

export interface ZakatResult {
  totalAssets: number;
  netWealth: number;
  nisabThreshold: number;
  isAboveNisab: boolean;
  zakatDue: number;
}

export const GOLD_NISAB_GRAMS = 87.48;
export const SILVER_NISAB_GRAMS = 612.36;

/**
 * Computes the Zakat breakdown
 */
export function calculateZakat(config: ZakatConfig): ZakatResult {
  const cash = isNaN(config.cash) || config.cash < 0 ? 0 : config.cash;
  const goldGrams = isNaN(config.goldGrams) || config.goldGrams < 0 ? 0 : config.goldGrams;
  const silverGrams = isNaN(config.silverGrams) || config.silverGrams < 0 ? 0 : config.silverGrams;
  const businessAssets = isNaN(config.businessAssets) || config.businessAssets < 0 ? 0 : config.businessAssets;
  const investments = isNaN(config.investments) || config.investments < 0 ? 0 : config.investments;
  const moneyOwedToYou = isNaN(config.moneyOwedToYou) || config.moneyOwedToYou < 0 ? 0 : config.moneyOwedToYou;
  const moneyOwedToOthers = isNaN(config.moneyOwedToOthers) || config.moneyOwedToOthers < 0 ? 0 : config.moneyOwedToOthers;
  
  const goldPrice = isNaN(config.goldPricePerGram) || config.goldPricePerGram < 0 ? 0 : config.goldPricePerGram;
  const silverPrice = isNaN(config.silverPricePerGram) || config.silverPricePerGram < 0 ? 0 : config.silverPricePerGram;

  // Gold asset value and silver asset value in cash
  const goldValue = goldGrams * goldPrice;
  const silverValue = silverGrams * silverPrice;

  // Total Assets
  const totalAssets = cash + goldValue + silverValue + businessAssets + investments + moneyOwedToYou;

  // Net Wealth (Assets - Liabilities)
  const netWealth = totalAssets - moneyOwedToOthers;

  // Calculate Nisab thresholds
  const goldNisabThreshold = GOLD_NISAB_GRAMS * goldPrice;
  const silverNisabThreshold = SILVER_NISAB_GRAMS * silverPrice;

  const nisabThreshold = config.nisabStandard === "gold" ? goldNisabThreshold : silverNisabThreshold;

  // Handle edge cases: if net wealth is <= 0, no Zakat is due.
  // Zakat is due if net wealth is above the selected Nisab threshold.
  const isAboveNisab = netWealth > 0 && netWealth >= nisabThreshold;
  const zakatDue = isAboveNisab ? netWealth * 0.025 : 0;

  return {
    totalAssets: Number(totalAssets.toFixed(2)),
    netWealth: Number(netWealth.toFixed(2)),
    nisabThreshold: Number(nisabThreshold.toFixed(2)),
    isAboveNisab,
    zakatDue: Number(zakatDue.toFixed(2)),
  };
}
