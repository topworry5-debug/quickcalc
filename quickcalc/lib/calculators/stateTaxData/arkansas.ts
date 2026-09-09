import { StateTaxConfig } from "../stateSalaryConfig";

/**
 * Arkansas State Tax Configuration (2026 Tax Year)
 *
 * Source: Arkansas Department of Finance and Administration (DFA);
 * Ark. Code Ann. § 26-51-201 as amended by Act 1 of the 2024 Second Extraordinary Session
 * (lowering the top individual income tax rate to 3.7% effective for tax years 2025 and 2026).
 *
 * MAINTENANCE-CRITICAL NOTE:
 * Arkansas has been regularly cutting its top individual income tax rate through special legislative sessions
 * (previously 5.9%, then 4.9%, 4.7%, 4.4%, and currently 3.7%). Check the Arkansas DFA revenue rulings
 * annually after each legislative cycle.
 */
export const ARKANSAS_TAX_CONFIG: StateTaxConfig = {
  stateSlug: "arkansas",
  stateName: "Arkansas",
  stateAbbrev: "AR",
  hasStateIncomeTax: true,
  taxYear: 2026,
  topMarginalRate: 0.037, // 3.7%

  // Official DFA Standard Deduction amounts
  standardDeduction: {
    single: 2470,
    married_joint: 4940,
    head_of_household: 2470,
  },

  /**
   * Graduated brackets under Act 1 of the 2024 2nd Extraordinary Session:
   * - $0 to $5,599: 0.0%
   * - $5,600 to $11,199: 2.0%
   * - $11,200 to $15,999: 3.0%
   * - $16,000 to $26,399: 3.4%
   * - $26,400 and above: 3.7%
   */
  brackets: {
    single: [
      { limit: 5599, rate: 0.00 },
      { limit: 11199, rate: 0.02 },
      { limit: 15999, rate: 0.03 },
      { limit: 26399, rate: 0.034 },
      { limit: Infinity, rate: 0.037 },
    ],
    married_joint: [
      { limit: 11198, rate: 0.00 },
      { limit: 22398, rate: 0.02 },
      { limit: 31998, rate: 0.03 },
      { limit: 52798, rate: 0.034 },
      { limit: Infinity, rate: 0.037 },
    ],
    head_of_household: [
      { limit: 5599, rate: 0.00 },
      { limit: 11199, rate: 0.02 },
      { limit: 15999, rate: 0.03 },
      { limit: 26399, rate: 0.034 },
      { limit: Infinity, rate: 0.037 },
    ],
  },

  hasLocalTax: false,
  localTaxDescription: "Arkansas state statute prohibits cities, towns, and counties from assessing local personal income taxes. All municipalities in Arkansas have a 0% local income tax rate.",

  exemptsSocialSecurity: true, // Arkansas does not tax Social Security benefits

  neighborComparisons: [
    {
      stateName: "Texas",
      stateAbbrev: "TX",
      topRate: 0.0,
      isZeroTax: true,
      takeHomeEstimate60k: 50248.50,
      note: "Texas levies no individual income tax, providing an extra ~$1,761 per year (~$147/month) in take-home pay on a $60,000 salary compared to Arkansas.",
    },
    {
      stateName: "Tennessee",
      stateAbbrev: "TN",
      topRate: 0.0,
      isZeroTax: true,
      takeHomeEstimate60k: 50248.50,
      note: "Tennessee has no state personal earned income tax. Arkansas workers moving east save ~$1,761 annually on state income taxes.",
    },
    {
      stateName: "Missouri",
      stateAbbrev: "MO",
      topRate: 0.047,
      isZeroTax: false,
      takeHomeEstimate60k: 47920.00,
      note: "Missouri has a higher top income tax rate of 4.7% plus local earnings taxes in Kansas City and St. Louis (1.0%), making Arkansas noticeably cheaper for state income tax.",
    },
    {
      stateName: "Oklahoma",
      stateAbbrev: "OK",
      topRate: 0.0475,
      isZeroTax: false,
      takeHomeEstimate60k: 47850.00,
      note: "Oklahoma has a top marginal rate of 4.75%, meaning Arkansas's reduced 3.7% rate yields lower state withholding.",
    },
    {
      stateName: "Louisiana",
      stateAbbrev: "LA",
      topRate: 0.0425,
      isZeroTax: false,
      takeHomeEstimate60k: 48110.00,
      note: "Louisiana's graduated top bracket sits at 4.25%, higher than Arkansas's 3.7% ceiling.",
    },
    {
      stateName: "Mississippi",
      stateAbbrev: "MS",
      topRate: 0.047,
      isZeroTax: false,
      takeHomeEstimate60k: 47930.00,
      note: "Mississippi imposes a flat 4.7% tax rate on income above $10,000, resulting in slightly higher state tax liability than Arkansas.",
    },
  ],

  notes: "Arkansas Act 1 of 2024 Second Extraordinary Session lowered the top individual income tax rate from 4.4% to 3.7%.",
};
