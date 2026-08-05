/**
 * Historical Consumer Price Index (CPI) data for the United States, Canada, and Pakistan.
 * 
 * Sources:
 * - United States: US Bureau of Labor Statistics (BLS) Consumer Price Index (CPI-U), annual averages.
 * - Canada: Statistics Canada, Consumer Price Index (CPI), annual averages (base year 2002 = 100).
 * - Pakistan: Pakistan Bureau of Statistics (PBS), Consumer Price Index (CPI), annual averages.
 * 
 * Year Range: 1990 - 2026 (including projections/preliminary figures for recent years).
 */

export interface CPIRecord {
  year: number;
  cpi: number;
}

export interface CountryData {
  name: string;
  code: string;
  currencySymbol: string;
  currencyName: string;
  cpiHistory: CPIRecord[];
  generalSource: string;
}

export const inflationData: Record<string, CountryData> = {
  US: {
    name: "United States",
    code: "US",
    currencySymbol: "$",
    currencyName: "USD",
    generalSource: "Based on published CPI data from the U.S. Bureau of Labor Statistics (BLS).",
    cpiHistory: [
      { year: 1990, cpi: 130.7 },
      { year: 1991, cpi: 136.2 },
      { year: 1992, cpi: 140.3 },
      { year: 1993, cpi: 144.5 },
      { year: 1994, cpi: 148.2 },
      { year: 1995, cpi: 152.4 },
      { year: 1996, cpi: 156.9 },
      { year: 1997, cpi: 160.5 },
      { year: 1998, cpi: 163.0 },
      { year: 1999, cpi: 166.6 },
      { year: 2000, cpi: 172.2 },
      { year: 2001, cpi: 177.1 },
      { year: 2002, cpi: 179.9 },
      { year: 2003, cpi: 184.0 },
      { year: 2004, cpi: 188.9 },
      { year: 2005, cpi: 195.3 },
      { year: 2006, cpi: 201.6 },
      { year: 2007, cpi: 207.342 },
      { year: 2008, cpi: 215.303 },
      { year: 2009, cpi: 214.537 },
      { year: 2010, cpi: 218.056 },
      { year: 2011, cpi: 224.939 },
      { year: 2012, cpi: 229.594 },
      { year: 2013, cpi: 232.957 },
      { year: 2014, cpi: 236.736 },
      { year: 2015, cpi: 237.017 },
      { year: 2016, cpi: 240.007 },
      { year: 2017, cpi: 245.120 },
      { year: 2018, cpi: 251.107 },
      { year: 2019, cpi: 255.657 },
      { year: 2020, cpi: 258.811 },
      { year: 2021, cpi: 270.970 },
      { year: 2022, cpi: 292.655 },
      { year: 2023, cpi: 304.702 },
      { year: 2024, cpi: 313.200 },
      // Note: 2025 and 2026 values are estimated/projected, not final published data
      { year: 2025, cpi: 321.000 },
      { year: 2026, cpi: 329.000 },
    ],
  },
  CA: {
    name: "Canada",
    code: "CA",
    currencySymbol: "$",
    currencyName: "CAD",
    generalSource: "Based on published Consumer Price Index (CPI) data from Statistics Canada.",
    cpiHistory: [
      { year: 1990, cpi: 78.4 },
      { year: 1991, cpi: 82.8 },
      { year: 1992, cpi: 84.1 },
      { year: 1993, cpi: 85.6 },
      { year: 1994, cpi: 85.7 },
      { year: 1995, cpi: 87.6 },
      { year: 1996, cpi: 89.0 },
      { year: 1997, cpi: 90.4 },
      { year: 1998, cpi: 91.3 },
      { year: 1999, cpi: 93.0 },
      { year: 2000, cpi: 95.4 },
      { year: 2001, cpi: 97.8 },
      { year: 2002, cpi: 100.0 },
      { year: 2003, cpi: 102.8 },
      { year: 2004, cpi: 104.7 },
      { year: 2005, cpi: 107.0 },
      { year: 2006, cpi: 109.1 },
      { year: 2007, cpi: 111.5 },
      { year: 2008, cpi: 114.1 },
      { year: 2009, cpi: 114.4 },
      { year: 2010, cpi: 116.5 },
      { year: 2011, cpi: 119.9 },
      { year: 2012, cpi: 121.7 },
      { year: 2013, cpi: 122.8 },
      { year: 2014, cpi: 125.2 },
      { year: 2015, cpi: 126.6 },
      { year: 2016, cpi: 128.4 },
      { year: 2017, cpi: 130.4 },
      { year: 2018, cpi: 133.4 },
      { year: 2019, cpi: 136.0 },
      { year: 2020, cpi: 137.0 },
      { year: 2021, cpi: 141.6 },
      { year: 2022, cpi: 151.2 },
      { year: 2023, cpi: 157.1 },
      { year: 2024, cpi: 161.5 },
      // Note: 2025 and 2026 values are estimated/projected, not final published data
      { year: 2025, cpi: 165.5 },
      { year: 2026, cpi: 169.6 },
    ],
  },
  PK: {
    name: "Pakistan",
    code: "PK",
    currencySymbol: "₨",
    currencyName: "PKR",
    generalSource: "Based on published CPI data from the Pakistan Bureau of Statistics (PBS).",
    cpiHistory: [
      { year: 1990, cpi: 10.5 },
      { year: 1991, cpi: 11.8 },
      { year: 1992, cpi: 12.9 },
      { year: 1993, cpi: 14.2 },
      { year: 1994, cpi: 15.8 },
      { year: 1995, cpi: 17.7 },
      { year: 1996, cpi: 19.6 },
      { year: 1997, cpi: 21.9 },
      { year: 1998, cpi: 23.6 },
      { year: 1999, cpi: 24.6 },
      { year: 2000, cpi: 25.5 },
      { year: 2001, cpi: 26.6 },
      { year: 2002, cpi: 27.5 },
      { year: 2003, cpi: 28.3 },
      { year: 2004, cpi: 30.4 },
      { year: 2005, cpi: 33.1 },
      { year: 2006, cpi: 35.7 },
      { year: 2007, cpi: 38.4 },
      { year: 2008, cpi: 46.2 },
      { year: 2009, cpi: 52.5 },
      { year: 2010, cpi: 59.8 },
      { year: 2011, cpi: 68.0 },
      { year: 2012, cpi: 74.6 },
      { year: 2013, cpi: 80.1 },
      { year: 2014, cpi: 86.2 },
      { year: 2015, cpi: 88.4 },
      { year: 2016, cpi: 91.0 },
      { year: 2017, cpi: 94.8 },
      { year: 2018, cpi: 99.6 },
      { year: 2019, cpi: 110.1 },
      { year: 2020, cpi: 120.8 },
      { year: 2021, cpi: 131.5 },
      { year: 2022, cpi: 147.5 },
      { year: 2023, cpi: 190.5 },
      { year: 2024, cpi: 237.1 },
      // Note: 2025 and 2026 values are estimated/projected, not final published data
      { year: 2025, cpi: 265.5 },
      { year: 2026, cpi: 292.0 },
    ],
  },
};

export interface InflationExplanationParams {
  amount: number;
  startYear: number;
  endYear: number;
  symbol: string;
  startCPI: number;
  endCPI: number;
  equivalentAmount: number;
  totalPercent: number;
}

export function getInflationExplanationSteps(params: InflationExplanationParams): string[] {
  const steps: string[] = [];
  const { amount, startYear, endYear, symbol, startCPI, endCPI, equivalentAmount, totalPercent } = params;

  steps.push(`Base currency amount: ${symbol}${amount.toLocaleString()} in Year ${startYear} (CPI Index: ${startCPI})`);
  steps.push(`Target year CPI Index: Year ${endYear} CPI Index is ${endCPI}`);
  steps.push(`Calculate cumulative inflation rate: ((${endCPI} - ${startCPI}) ÷ ${startCPI}) × 100 = +${totalPercent.toFixed(1)}% cumulative inflation`);
  steps.push(`Calculate equivalent purchasing power: ${symbol}${amount.toLocaleString()} × (${endCPI} ÷ ${startCPI}) = ${symbol}${equivalentAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  steps.push(`Conclusion: ${symbol}${amount.toLocaleString()} in ${startYear} has the exact same buying power as ${symbol}${equivalentAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in ${endYear}`);

  return steps;
}
