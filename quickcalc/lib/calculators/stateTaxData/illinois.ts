import { StateTaxConfig } from "../stateSalaryConfig";

/**
 * Illinois State Tax Configuration (2026 Tax Year)
 *
 * Source: Illinois Department of Revenue (IDOR);
 * 35 ILCS 5/201; Illinois Constitution Article IX, Section 3.
 *
 * MAINTENANCE-CRITICAL NOTE:
 * Illinois enforces a flat individual income tax rate of 4.95%.
 * The state constitution strictly forbids a non-flat graduated income tax without a voter-approved
 * constitutional amendment (the proposed "Fair Tax" amendment was rejected by Illinois voters in November 2020).
 * Although periodically proposed by lawmakers, the rate remains flat at 4.95%. Verify this constant annually.
 *
 * RETIREMENT & SOCIAL SECURITY EXEMPTION:
 * Under 35 ILCS 5/203(a)(2)(F), Illinois completely exempts Social Security benefits, public/private pensions,
 * and qualified retirement distributions (401(k), 403(b), IRA) from state income tax.
 *
 * LOCAL TAX NOTE:
 * Neither Chicago, Rockford, Naperville, nor any other Illinois municipality imposes a local earned income tax.
 * (Chicago repealed its employer head tax effective December 31, 2014). The local wage tax is 0.0% statewide.
 */
export const ILLINOIS_TAX_CONFIG: StateTaxConfig = {
  stateSlug: "illinois",
  stateName: "Illinois",
  stateAbbrev: "IL",
  hasStateIncomeTax: true,
  taxYear: 2026,
  topMarginalRate: 0.0495, // Flat 4.95% rate

  /**
   * Illinois uses a Personal Exemption Allowance rather than a traditional standard deduction.
   * For the 2026 tax year, the inflation-adjusted personal exemption is $2,925 per allowance:
   * - Single / Head of Household: $2,925 (1 allowance)
   * - Married Filing Jointly: $5,850 (2 allowances: taxpayer + spouse)
   * Source: Illinois Department of Revenue Form IL-1040 Instructions.
   */
  standardDeduction: {
    single: 2925,
    married_joint: 5850,
    head_of_household: 2925,
  },

  /**
   * Flat 4.95% rate applied to net income (AGI minus personal exemption).
   * Represented as a single bracket up to Infinity across all filing statuses.
   */
  brackets: {
    single: [
      { limit: Infinity, rate: 0.0495 },
    ],
    married_joint: [
      { limit: Infinity, rate: 0.0495 },
    ],
    head_of_household: [
      { limit: Infinity, rate: 0.0495 },
    ],
  },

  hasLocalTax: false,
  localTaxDescription: "Under the Illinois Constitution, local municipalities, counties, and cities—including Chicago—cannot levy a local personal income tax on employee paychecks. The local earned income tax rate is 0% statewide.",

  exemptsSocialSecurity: true, // Illinois does not tax Social Security, pensions, or 401(k) retirement distributions

  neighborComparisons: [
    {
      stateName: "Indiana",
      stateAbbrev: "IN",
      topRate: 0.0305,
      isZeroTax: false,
      takeHomeEstimate60k: 51220.00,
      note: "Indiana features a lower flat state rate of 3.05%, but nearly all Indiana counties add mandatory local income taxes between 1.0% and 2.5%, bringing the total combined tax close to Illinois's 4.95%.",
    },
    {
      stateName: "Wisconsin",
      stateAbbrev: "WI",
      topRate: 0.0765,
      isZeroTax: false,
      takeHomeEstimate60k: 50850.00,
      note: "Wisconsin uses progressive brackets ranging from 3.5% to 7.65%. While low earners pay slightly less in Wisconsin, mid-to-high earners pay substantially more state income tax than in Illinois.",
    },
    {
      stateName: "Missouri",
      stateAbbrev: "MO",
      topRate: 0.047,
      isZeroTax: false,
      takeHomeEstimate60k: 51310.00,
      note: "Missouri has a progressive top rate of 4.7%. However, St. Louis and Kansas City add a 1.0% local earnings tax, making total taxes in those metros higher than Illinois's flat rate.",
    },
    {
      stateName: "Iowa",
      stateAbbrev: "IA",
      topRate: 0.038,
      isZeroTax: false,
      takeHomeEstimate60k: 51880.00,
      note: "Iowa has transitioned to a flat 3.8% individual income tax rate, providing slightly higher take-home pay than Illinois.",
    },
    {
      stateName: "Kentucky",
      stateAbbrev: "KY",
      topRate: 0.04,
      isZeroTax: false,
      takeHomeEstimate60k: 51760.00,
      note: "Kentucky has a flat state rate of 4.0%, but most major metropolitan areas (including Louisville and Lexington) impose local occupational license taxes of 1.5% to 2.2%.",
    },
  ],

  notes: "Illinois personal exemption is indexed annually for inflation ($2,925 in 2026; $2,850 in 2025). Flat rate of 4.95% applies to all taxable wages.",
};
