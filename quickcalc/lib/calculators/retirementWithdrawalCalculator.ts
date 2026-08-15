// Historical Annual Return & Inflation Data for US Market (1928 - 2023)
// Sources: NYU Stern Damodaran Data, Federal Reserve FRED, Shiller S&P 500 Historical Total Returns
export interface HistoricalDataPoint {
  year: number;
  stockReturn: number; // Decimal (e.g. 0.4381 for +43.81%)
  bondReturn: number;  // Decimal (e.g. 0.0084 for +0.84%)
  inflation: number;   // Decimal (e.g. -0.0116 for -1.16%)
}

export const US_HISTORICAL_DATA: HistoricalDataPoint[] = [
  { year: 1928, stockReturn: 0.4381, bondReturn: 0.0084, inflation: -0.0116 },
  { year: 1929, stockReturn: -0.083, bondReturn: 0.042, inflation: 0.0058 },
  { year: 1930, stockReturn: -0.2512, bondReturn: 0.0454, inflation: -0.064 },
  { year: 1931, stockReturn: -0.4384, bondReturn: -0.0256, inflation: -0.0932 },
  { year: 1932, stockReturn: -0.0864, bondReturn: 0.0879, inflation: -0.1027 },
  { year: 1933, stockReturn: 0.4998, bondReturn: 0.0186, inflation: 0.0078 },
  { year: 1934, stockReturn: -0.0119, bondReturn: 0.0796, inflation: 0.0154 },
  { year: 1935, stockReturn: 0.4674, bondReturn: 0.0447, inflation: 0.0299 },
  { year: 1936, stockReturn: 0.3194, bondReturn: 0.0502, inflation: 0.0145 },
  { year: 1937, stockReturn: -0.3534, bondReturn: 0.0138, inflation: 0.0286 },
  { year: 1938, stockReturn: 0.2928, bondReturn: 0.0421, inflation: -0.0278 },
  { year: 1939, stockReturn: -0.011, bondReturn: 0.0441, inflation: 0.0 },
  { year: 1940, stockReturn: -0.1067, bondReturn: 0.0308, inflation: 0.0071 },
  { year: 1941, stockReturn: -0.1277, bondReturn: -0.005, inflation: 0.0993 },
  { year: 1942, stockReturn: 0.1917, bondReturn: 0.0322, inflation: 0.0903 },
  { year: 1943, stockReturn: 0.2506, bondReturn: 0.0208, inflation: 0.0303 },
  { year: 1944, stockReturn: 0.1903, bondReturn: 0.0258, inflation: 0.0227 },
  { year: 1945, stockReturn: 0.3582, bondReturn: 0.038, inflation: 0.0222 },
  { year: 1946, stockReturn: -0.0843, bondReturn: 0.0313, inflation: 0.1813 },
  { year: 1947, stockReturn: 0.052, bondReturn: -0.0094, inflation: 0.0884 },
  { year: 1948, stockReturn: 0.057, bondReturn: 0.0195, inflation: 0.0299 },
  { year: 1949, stockReturn: 0.183, bondReturn: 0.0466, inflation: -0.0207 },
  { year: 1950, stockReturn: 0.3081, bondReturn: 0.0043, inflation: 0.0593 },
  { year: 1951, stockReturn: 0.2368, bondReturn: -0.003, inflation: 0.06 },
  { year: 1952, stockReturn: 0.1815, bondReturn: 0.0227, inflation: 0.0075 },
  { year: 1953, stockReturn: -0.0121, bondReturn: 0.0414, inflation: 0.0074 },
  { year: 1954, stockReturn: 0.5256, bondReturn: 0.0329, inflation: -0.0074 },
  { year: 1955, stockReturn: 0.3274, bondReturn: -0.0134, inflation: 0.0037 },
  { year: 1956, stockReturn: 0.0744, bondReturn: -0.0226, inflation: 0.0299 },
  { year: 1957, stockReturn: -0.1046, bondReturn: 0.068, inflation: 0.029 },
  { year: 1958, stockReturn: 0.4372, bondReturn: -0.021, inflation: 0.0176 },
  { year: 1959, stockReturn: 0.1206, bondReturn: -0.0265, inflation: 0.0173 },
  { year: 1960, stockReturn: 0.0034, bondReturn: 0.1164, inflation: 0.0148 },
  { year: 1961, stockReturn: 0.2664, bondReturn: 0.0206, inflation: 0.0073 },
  { year: 1962, stockReturn: -0.0881, bondReturn: 0.0569, inflation: 0.0122 },
  { year: 1963, stockReturn: 0.2261, bondReturn: 0.0168, inflation: 0.0165 },
  { year: 1964, stockReturn: 0.1642, bondReturn: 0.0373, inflation: 0.0119 },
  { year: 1965, stockReturn: 0.124, bondReturn: 0.0072, inflation: 0.0192 },
  { year: 1966, stockReturn: -0.0997, bondReturn: 0.0291, inflation: 0.0336 },
  { year: 1967, stockReturn: 0.238, bondReturn: -0.0158, inflation: 0.0304 },
  { year: 1968, stockReturn: 0.1081, bondReturn: 0.0327, inflation: 0.0472 },
  { year: 1969, stockReturn: -0.0825, bondReturn: -0.0501, inflation: 0.062 },
  { year: 1970, stockReturn: 0.0356, bondReturn: 0.1675, inflation: 0.0557 },
  { year: 1971, stockReturn: 0.1422, bondReturn: 0.0979, inflation: 0.0327 },
  { year: 1972, stockReturn: 0.1876, bondReturn: 0.0282, inflation: 0.0341 },
  { year: 1973, stockReturn: -0.1431, bondReturn: 0.0366, inflation: 0.0871 },
  { year: 1974, stockReturn: -0.2647, bondReturn: 0.0437, inflation: 0.1234 },
  { year: 1975, stockReturn: 0.37, bondReturn: 0.0917, inflation: 0.0694 },
  { year: 1976, stockReturn: 0.2383, bondReturn: 0.1675, inflation: 0.0486 },
  { year: 1977, stockReturn: -0.0698, bondReturn: -0.0069, inflation: 0.067 },
  { year: 1978, stockReturn: 0.0651, bondReturn: -0.0118, inflation: 0.0902 },
  { year: 1979, stockReturn: 0.1852, bondReturn: 0.0067, inflation: 0.1331 },
  { year: 1980, stockReturn: 0.3174, bondReturn: -0.0299, inflation: 0.1252 },
  { year: 1981, stockReturn: -0.047, bondReturn: 0.082, inflation: 0.0892 },
  { year: 1982, stockReturn: 0.2042, bondReturn: 0.3281, inflation: 0.0383 },
  { year: 1983, stockReturn: 0.2234, bondReturn: 0.032, inflation: 0.0379 },
  { year: 1984, stockReturn: 0.0615, bondReturn: 0.1373, inflation: 0.0395 },
  { year: 1985, stockReturn: 0.3124, bondReturn: 0.2571, inflation: 0.038 },
  { year: 1986, stockReturn: 0.1849, bondReturn: 0.2428, inflation: 0.011 },
  { year: 1987, stockReturn: 0.0581, bondReturn: -0.0496, inflation: 0.0443 },
  { year: 1988, stockReturn: 0.1654, bondReturn: 0.0822, inflation: 0.0442 },
  { year: 1989, stockReturn: 0.3148, bondReturn: 0.1769, inflation: 0.0465 },
  { year: 1990, stockReturn: -0.0306, bondReturn: 0.0624, inflation: 0.0611 },
  { year: 1991, stockReturn: 0.3023, bondReturn: 0.1500, inflation: 0.0306 },
  { year: 1992, stockReturn: 0.0749, bondReturn: 0.0936, inflation: 0.029 },
  { year: 1993, stockReturn: 0.0997, bondReturn: 0.1421, inflation: 0.0275 },
  { year: 1994, stockReturn: 0.0133, bondReturn: -0.0804, inflation: 0.0267 },
  { year: 1995, stockReturn: 0.3743, bondReturn: 0.2348, inflation: 0.0254 },
  { year: 1996, stockReturn: 0.2307, bondReturn: 0.0143, inflation: 0.0332 },
  { year: 1997, stockReturn: 0.3336, bondReturn: 0.0994, inflation: 0.017 },
  { year: 1998, stockReturn: 0.2858, bondReturn: 0.1492, inflation: 0.0161 },
  { year: 1999, stockReturn: 0.2104, bondReturn: -0.0825, inflation: 0.0268 },
  { year: 2000, stockReturn: -0.091, bondReturn: 0.1666, inflation: 0.0339 },
  { year: 2001, stockReturn: -0.1189, bondReturn: 0.0557, inflation: 0.0155 },
  { year: 2002, stockReturn: -0.221, bondReturn: 0.1512, inflation: 0.0238 },
  { year: 2003, stockReturn: 0.2868, bondReturn: 0.0038, inflation: 0.0188 },
  { year: 2004, stockReturn: 0.1088, bondReturn: 0.0449, inflation: 0.0326 },
  { year: 2005, stockReturn: 0.0491, bondReturn: 0.0287, inflation: 0.0342 },
  { year: 2006, stockReturn: 0.1579, bondReturn: 0.0196, inflation: 0.0254 },
  { year: 2007, stockReturn: 0.0549, bondReturn: 0.1021, inflation: 0.0408 },
  { year: 2008, stockReturn: -0.37, bondReturn: 0.201, inflation: 0.0009 },
  { year: 2009, stockReturn: 0.2646, bondReturn: -0.1112, inflation: 0.0272 },
  { year: 2010, stockReturn: 0.1506, bondReturn: 0.0846, inflation: 0.015 },
  { year: 2011, stockReturn: 0.0211, bondReturn: 0.1604, inflation: 0.0296 },
  { year: 2012, stockReturn: 0.16, bondReturn: 0.0297, inflation: 0.0174 },
  { year: 2013, stockReturn: 0.3239, bondReturn: -0.091, inflation: 0.015 },
  { year: 2014, stockReturn: 0.1369, bondReturn: 0.1075, inflation: 0.0076 },
  { year: 2015, stockReturn: 0.0138, bondReturn: 0.0128, inflation: 0.0073 },
  { year: 2016, stockReturn: 0.1196, bondReturn: 0.0069, inflation: 0.0207 },
  { year: 2017, stockReturn: 0.2183, bondReturn: 0.028, inflation: 0.0211 },
  { year: 2018, stockReturn: -0.0438, bondReturn: -0.0002, inflation: 0.0191 },
  { year: 2019, stockReturn: 0.3149, bondReturn: 0.0964, inflation: 0.0229 },
  { year: 2020, stockReturn: 0.184, bondReturn: 0.1133, inflation: 0.0136 },
  { year: 2021, stockReturn: 0.2871, bondReturn: -0.0442, inflation: 0.0704 },
  { year: 2022, stockReturn: -0.1811, bondReturn: -0.1783, inflation: 0.0645 },
  { year: 2023, stockReturn: 0.2629, bondReturn: 0.0388, inflation: 0.0335 },
];

export interface SimulationConfig {
  initialPortfolio: number;
  initialWithdrawal: number;
  useWithdrawalRate: boolean; // If true, initialWithdrawal is interpreted as rate %
  withdrawalRatePercent: number;
  durationYears: number;
  stockAllocationPct: number; // 0 to 100
  adjustForInflation: boolean;
}

export interface RollingSequenceResult {
  startYear: number;
  endYear: number;
  isSuccess: boolean;
  failedYear?: number;
  endingBalance: number;
  minBalance: number;
  maxBalance: number;
  yearlyBalances: number[]; // Index 0 is starting balance, index 1..N yearly end balances
}

export interface SimulationSummary {
  totalSequences: number;
  successfulSequences: number;
  failedSequences: number;
  successRatePct: number;
  medianEndingBalance: number;
  worstSequence: RollingSequenceResult;
  bestSequence: RollingSequenceResult;
  sequences: RollingSequenceResult[];
}

export function runRetirementSimulation(config: SimulationConfig): SimulationSummary {
  const {
    initialPortfolio,
    initialWithdrawal,
    useWithdrawalRate,
    withdrawalRatePercent,
    durationYears,
    stockAllocationPct,
    adjustForInflation,
  } = config;

  const actualStartWithdrawal = useWithdrawalRate
    ? (initialPortfolio * withdrawalRatePercent) / 100
    : initialWithdrawal;

  const stockWeight = Math.min(100, Math.max(0, stockAllocationPct)) / 100;
  const bondWeight = 1 - stockWeight;

  const datasetLength = US_HISTORICAL_DATA.length;
  const maxStartYearIndex = datasetLength - durationYears;

  const sequences: RollingSequenceResult[] = [];

  for (let i = 0; i <= maxStartYearIndex; i++) {
    const startYear = US_HISTORICAL_DATA[i].year;
    const endYear = US_HISTORICAL_DATA[i + durationYears - 1].year;

    let currentBalance = initialPortfolio;
    let currentWithdrawal = actualStartWithdrawal;
    let isSuccess = true;
    let failedYear: number | undefined = undefined;

    const yearlyBalances: number[] = [initialPortfolio];
    let minBal = initialPortfolio;
    let maxBal = initialPortfolio;

    for (let yrIndex = 0; yrIndex < durationYears; yrIndex++) {
      const dataPoint = US_HISTORICAL_DATA[i + yrIndex];

      // Inflation adjustment for withdrawal starting from year 2
      if (yrIndex > 0 && adjustForInflation) {
        currentWithdrawal = currentWithdrawal * (1 + dataPoint.inflation);
      }

      // Deduct annual withdrawal at beginning of period
      const balanceAfterWithdrawal = currentBalance - currentWithdrawal;

      if (balanceAfterWithdrawal <= 0) {
        if (isSuccess) {
          isSuccess = false;
          failedYear = dataPoint.year;
        }
        currentBalance = 0;
        yearlyBalances.push(0);
        minBal = 0;
        continue;
      }

      // Apply asset allocation weighted return
      const weightedReturn = stockWeight * dataPoint.stockReturn + bondWeight * dataPoint.bondReturn;
      currentBalance = Math.max(0, balanceAfterWithdrawal * (1 + weightedReturn));

      yearlyBalances.push(currentBalance);
      if (currentBalance < minBal) minBal = currentBalance;
      if (currentBalance > maxBal) maxBal = currentBalance;
    }

    sequences.push({
      startYear,
      endYear,
      isSuccess,
      failedYear,
      endingBalance: currentBalance,
      minBalance: minBal,
      maxBalance: maxBal,
      yearlyBalances,
    });
  }

  // Calculate summary metrics
  const totalSequences = sequences.length;
  const successfulSequences = sequences.filter((s) => s.isSuccess).length;
  const failedSequences = totalSequences - successfulSequences;
  const successRatePct = totalSequences > 0 ? (successfulSequences / totalSequences) * 100 : 0;

  // Sort sequences by ending balance
  const sortedByEnding = [...sequences].sort((a, b) => a.endingBalance - b.endingBalance);
  const worstSequence = sortedByEnding[0];
  const bestSequence = sortedByEnding[sortedByEnding.length - 1];

  const medianIndex = Math.floor(sortedByEnding.length / 2);
  const medianEndingBalance = sortedByEnding[medianIndex]?.endingBalance || 0;

  return {
    totalSequences,
    successfulSequences,
    failedSequences,
    successRatePct,
    medianEndingBalance,
    worstSequence,
    bestSequence,
    sequences,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getSimulationExplanationSteps(
  config: SimulationConfig,
  summary: SimulationSummary
): string[] {
  const steps: string[] = [];

  const actualWithdrawal = config.useWithdrawalRate
    ? (config.initialPortfolio * config.withdrawalRatePercent) / 100
    : config.initialWithdrawal;

  const actualRatePct = ((actualWithdrawal / config.initialPortfolio) * 100).toFixed(2);

  steps.push(
    `Step 1 (Portfolio Setup): Initial capital of ${formatCurrency(config.initialPortfolio)} with an initial annual withdrawal of ${formatCurrency(actualWithdrawal)} (${actualRatePct}% withdrawal rate) over a ${config.durationYears}-year horizon.`
  );

  steps.push(
    `Step 2 (Asset Allocation): Portfolio split configured as ${config.stockAllocationPct}% Stocks (S&P 500 total return) and ${100 - config.stockAllocationPct}% Bonds (10-Year US Treasury bonds).`
  );

  steps.push(
    `Step 3 (Rolling Historical Backtest): Ran ${summary.totalSequences} distinct rolling ${config.durationYears}-year retirement periods using real US market return and CPI inflation data from 1928 to 2023.`
  );

  steps.push(
    `Step 4 (Historical Outcome): ${summary.successfulSequences} out of ${summary.totalSequences} historical sequences (${summary.successRatePct.toFixed(1)}%) survived without depletion. Worst starting period was ${summary.worstSequence.startYear}, while the median ending wealth was ${formatCurrency(summary.medianEndingBalance)}.`
  );

  return steps;
}
