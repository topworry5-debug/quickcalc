export interface RentVsBuyInputs {
  homePrice: number; // Purchase price of the home ($100,000 - $3,000,000)
  downPaymentPercent: number; // Down payment percentage (0% - 100%)
  interestRate: number; // Mortgage interest rate APR % (2.0% - 14.0%)
  loanTermYears: number; // Mortgage term in years (15 or 30)
  monthlyRent: number; // Equivalent monthly rental cost ($500 - $15,000)
  yearsToStay: number; // Time horizon in years (1 - 30)
  homeAppreciationRate: number; // Annual home value appreciation % (0% - 10%)
  rentInflationRate: number; // Annual rent increase % (0% - 10%)
  investmentReturnRate: number; // Annual return if down payment & cash savings are invested in index funds (2% - 15%)
  propertyTaxRate: number; // Annual property tax % of home value (0.2% - 3.5%)
  homeInsuranceAnnual: number; // Annual homeowner insurance ($400 - $6,000)
  maintenanceRate: number; // Annual maintenance & repairs % of home value (0.5% - 3.0%)
  sellingCostRate: number; // Realtor commission & transfer taxes when selling % (3% - 10%)
  buyingClosingCostRate: number; // Upfront buying closing costs % (1% - 5%)
}

export interface YearMilestone {
  year: number;
  homeValue: number;
  remainingMortgage: number;
  buyerEquityNetOfSellingCosts: number;
  buyerInvestments: number;
  buyerTotalNetWorth: number;

  monthlyRent: number;
  renterInvestments: number;
  renterTotalNetWorth: number;

  netDifference: number; // buyerTotalNetWorth - renterTotalNetWorth
  winningOption: "buy" | "rent" | "tie";
}

export interface RentVsBuyChartPoint {
  year: number;
  label: string;
  buyerNetWorth: number;
  renterNetWorth: number;
}

export interface RentVsBuyResult {
  yearsToStay: number;
  downPaymentAmount: number;
  loanAmount: number;
  monthlyMortgagePayment: number; // Principal & Interest only

  // Year 1 Monthly Costs
  year1MonthlyBuyTotal: number; // P&I + Tax + Insurance + Maintenance
  year1MonthlyRentTotal: number;
  year1MonthlySavings: number; // Buy total - Rent total (positive if rent is cheaper)

  // Final Results at horizon (yearsToStay)
  finalBuyerNetWorth: number;
  finalRenterNetWorth: number;
  netWorthAdvantage: number; // Absolute difference
  winner: "buy" | "rent" | "tie";
  winnerText: string;

  // Break-even year (earliest year where Buy Net Worth >= Rent Net Worth)
  breakEvenYear: number | null;
  breakEvenText: string;

  // Trajectory details
  milestones: YearMilestone[];
  chartPoints: RentVsBuyChartPoint[];

  // Cumulative breakdown
  totalRentPaidOverHorizon: number;
  totalMortgagePaymentsOverHorizon: number;
  totalMaintenancePaid: number;
  totalPropertyTaxesPaid: number;
  homeEquityAtEnd: number;
  sellingCostsAtEnd: number;
}

export const DEFAULT_RENT_VS_BUY_INPUTS: RentVsBuyInputs = {
  homePrice: 420000,
  downPaymentPercent: 20, // $84,000
  interestRate: 6.5,
  loanTermYears: 30,
  monthlyRent: 2200,
  yearsToStay: 7,
  homeAppreciationRate: 3.5,
  rentInflationRate: 3.0,
  investmentReturnRate: 8.0,
  propertyTaxRate: 1.2,
  homeInsuranceAnnual: 1200,
  maintenanceRate: 1.0,
  sellingCostRate: 6.0,
  buyingClosingCostRate: 2.5,
};

export function formatCurrency(amount: number, decimals: number = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatPercent(rate: number, decimals: number = 1): string {
  return `${rate.toFixed(decimals)}%`;
}

/**
 * Standard Amortization Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateMonthlyMortgage(principal: number, annualRatePct: number, years: number): number {
  if (principal <= 0) return 0;
  if (annualRatePct <= 0 || years <= 0) return years > 0 ? principal / (years * 12) : 0;

  const r = annualRatePct / 100 / 12;
  const n = years * 12;
  const factor = Math.pow(1 + r, n);
  return (principal * (r * factor)) / (factor - 1);
}

/**
 * Simulates month-by-month and year-by-year net worth trajectory for Buying vs Renting.
 */
export function calculateRentVsBuy(inputs: RentVsBuyInputs): RentVsBuyResult {
  const homePrice = Math.max(20000, inputs.homePrice || 420000);
  const downPaymentPct = Math.max(0, Math.min(100, inputs.downPaymentPercent || 20));
  const downPaymentAmount = (homePrice * downPaymentPct) / 100;
  const loanAmount = Math.max(0, homePrice - downPaymentAmount);

  const interestRate = Math.max(0.1, inputs.interestRate || 6.5);
  const loanTermYears = Math.max(5, Math.min(40, inputs.loanTermYears || 30));
  const yearsToStay = Math.max(1, Math.min(30, Math.round(inputs.yearsToStay || 7)));

  const initialMonthlyRent = Math.max(100, inputs.monthlyRent || 2200);
  const homeApprRate = (inputs.homeAppreciationRate || 3.5) / 100;
  const rentInflRate = (inputs.rentInflationRate || 3.0) / 100;
  const invReturnRate = (inputs.investmentReturnRate || 8.0) / 100;

  const propTaxRate = (inputs.propertyTaxRate || 1.2) / 100;
  const homeInsAnnual = Math.max(0, inputs.homeInsuranceAnnual || 1200);
  const maintRate = (inputs.maintenanceRate || 1.0) / 100;
  const sellingCostRate = (inputs.sellingCostRate || 6.0) / 100;
  const buyingClosingCostRate = (inputs.buyingClosingCostRate || 2.5) / 100;

  // Monthly mortgage P&I
  const monthlyMortgagePayment = calculateMonthlyMortgage(loanAmount, interestRate, loanTermYears);
  const monthlyMortgageRate = interestRate / 100 / 12;
  const monthlyInvRate = invReturnRate / 12;

  // Initial Capital outlay difference
  const buyerClosingCosts = homePrice * buyingClosingCostRate;
  const initialBuyerCapital = downPaymentAmount + buyerClosingCosts;

  // Renter starts with initialBuyerCapital invested in market
  let renterPortfolio = initialBuyerCapital;
  let buyerPortfolio = 0; // If renting costs more than buying, buyer invests the savings

  // Year 1 starting values
  const year1MonthlyTax = (homePrice * propTaxRate) / 12;
  const year1MonthlyIns = homeInsAnnual / 12;
  const year1MonthlyMaint = (homePrice * maintRate) / 12;
  const year1MonthlyBuyTotal = monthlyMortgagePayment + year1MonthlyTax + year1MonthlyIns + year1MonthlyMaint;
  const year1MonthlyRentTotal = initialMonthlyRent;
  const year1MonthlySavings = year1MonthlyBuyTotal - year1MonthlyRentTotal;

  // Running tracking
  let remainingMortgageBalance = loanAmount;
  let currentHomeValue = homePrice;
  let currentMonthlyRent = initialMonthlyRent;

  let totalRentPaid = 0;
  let totalMortgagePaid = 0;
  let totalMaintPaid = 0;
  let totalPropTaxPaid = 0;

  const milestones: YearMilestone[] = [];
  const chartPoints: RentVsBuyChartPoint[] = [
    {
      year: 0,
      label: "Start",
      buyerNetWorth: Math.round(downPaymentAmount - buyerClosingCosts),
      renterNetWorth: Math.round(initialBuyerCapital),
    },
  ];

  let breakEvenYear: number | null = null;

  // Simulate up to 30 years to find break-even even if horizon is shorter
  const simulationYears = 30;

  for (let year = 1; year <= simulationYears; year++) {
    // Current year costs
    const annualPropertyTax = currentHomeValue * propTaxRate;
    const annualMaintenance = currentHomeValue * maintRate;
    const annualInsurance = homeInsAnnual * Math.pow(1 + homeApprRate, year - 1);

    const monthlyTax = annualPropertyTax / 12;
    const monthlyMaint = annualMaintenance / 12;
    const monthlyIns = annualInsurance / 12;

    // Simulate 12 months for this year
    for (let m = 1; m <= 12; m++) {
      // Mortgage interest & principal
      let interestCharge = 0;
      let principalPaid = 0;
      if (remainingMortgageBalance > 0.01) {
        interestCharge = remainingMortgageBalance * monthlyMortgageRate;
        principalPaid = Math.min(remainingMortgageBalance, monthlyMortgagePayment - interestCharge);
        remainingMortgageBalance = Math.max(0, remainingMortgageBalance - principalPaid);
        totalMortgagePaid += monthlyMortgagePayment;
      }

      totalRentPaid += currentMonthlyRent;
      totalMaintPaid += monthlyMaint;
      totalPropTaxPaid += monthlyTax;

      const monthlyBuyCashOut = monthlyMortgagePayment + monthlyTax + monthlyMaint + monthlyIns;
      const monthlyRentCashOut = currentMonthlyRent;

      // Investment compounding
      renterPortfolio *= (1 + monthlyInvRate);
      buyerPortfolio *= (1 + monthlyInvRate);

      // Monthly cash flow difference
      if (monthlyBuyCashOut > monthlyRentCashOut) {
        // Renting was cheaper this month: renter invests difference
        renterPortfolio += (monthlyBuyCashOut - monthlyRentCashOut);
      } else {
        // Buying was cheaper this month: buyer invests difference
        buyerPortfolio += (monthlyRentCashOut - monthlyBuyCashOut);
      }
    }

    // Appreciate home and rent at year end
    currentHomeValue *= (1 + homeApprRate);
    currentMonthlyRent *= (1 + rentInflRate);

    // Calculate Net Worth at end of this year
    const sellingCosts = currentHomeValue * sellingCostRate;
    const buyerEquityNetOfSelling = Math.max(0, currentHomeValue - remainingMortgageBalance - sellingCosts);
    const buyerTotalNetWorth = Math.round(buyerEquityNetOfSelling + buyerPortfolio);
    const renterTotalNetWorth = Math.round(renterPortfolio);

    const diff = buyerTotalNetWorth - renterTotalNetWorth;
    const winningOption: "buy" | "rent" | "tie" =
      diff > 500 ? "buy" : diff < -500 ? "rent" : "tie";

    // Track break-even year
    if (breakEvenYear === null && buyerTotalNetWorth >= renterTotalNetWorth) {
      breakEvenYear = year;
    }

    milestones.push({
      year,
      homeValue: Math.round(currentHomeValue),
      remainingMortgage: Math.round(remainingMortgageBalance),
      buyerEquityNetOfSellingCosts: Math.round(buyerEquityNetOfSelling),
      buyerInvestments: Math.round(buyerPortfolio),
      buyerTotalNetWorth,

      monthlyRent: Math.round(currentMonthlyRent),
      renterInvestments: Math.round(renterPortfolio),
      renterTotalNetWorth,

      netDifference: Math.round(diff),
      winningOption,
    });

    if (year <= yearsToStay) {
      chartPoints.push({
        year,
        label: `Year ${year}`,
        buyerNetWorth: buyerTotalNetWorth,
        renterNetWorth: renterTotalNetWorth,
      });
    }
  }

  // Horizon final values
  const horizonIndex = Math.min(yearsToStay, milestones.length) - 1;
  const targetMilestone = milestones[horizonIndex] || milestones[milestones.length - 1];

  const finalBuyerNetWorth = targetMilestone.buyerTotalNetWorth;
  const finalRenterNetWorth = targetMilestone.renterTotalNetWorth;
  const netWorthAdvantage = Math.abs(finalBuyerNetWorth - finalRenterNetWorth);

  let winner: "buy" | "rent" | "tie" = "tie";
  let winnerText = "Buying and Renting are virtually tied in net worth over this period.";

  if (finalBuyerNetWorth > finalRenterNetWorth) {
    winner = "buy";
    winnerText = `Buying builds ${formatCurrency(netWorthAdvantage)} more net worth than renting over ${yearsToStay} years.`;
  } else if (finalRenterNetWorth > finalBuyerNetWorth) {
    winner = "rent";
    winnerText = `Renting builds ${formatCurrency(netWorthAdvantage)} more net worth than buying over ${yearsToStay} years.`;
  }

  let breakEvenText = "";
  if (breakEvenYear === null) {
    breakEvenText = "Renting remains financially superior for over 30 years with current rate and return assumptions.";
  } else if (breakEvenYear === 1) {
    breakEvenText = "Buying breaks even immediately in Year 1.";
  } else {
    breakEvenText = `Buying breaks even and surpasses renting starting in Year ${breakEvenYear}.`;
  }

  return {
    yearsToStay,
    downPaymentAmount: Math.round(downPaymentAmount),
    loanAmount: Math.round(loanAmount),
    monthlyMortgagePayment: Math.round(monthlyMortgagePayment),

    year1MonthlyBuyTotal: Math.round(year1MonthlyBuyTotal),
    year1MonthlyRentTotal: Math.round(year1MonthlyRentTotal),
    year1MonthlySavings: Math.round(year1MonthlySavings),

    finalBuyerNetWorth,
    finalRenterNetWorth,
    netWorthAdvantage,
    winner,
    winnerText,

    breakEvenYear,
    breakEvenText,

    milestones: milestones.slice(0, Math.max(yearsToStay, 15)),
    chartPoints,

    totalRentPaidOverHorizon: Math.round(totalRentPaid),
    totalMortgagePaymentsOverHorizon: Math.round(totalMortgagePaid),
    totalMaintenancePaid: Math.round(totalMaintPaid),
    totalPropertyTaxesPaid: Math.round(totalPropTaxPaid),
    homeEquityAtEnd: targetMilestone.buyerEquityNetOfSellingCosts,
    sellingCostsAtEnd: Math.round(targetMilestone.homeValue * sellingCostRate),
  };
}

/**
 * Generates downloadable CSV content of the Rent vs Buy comparison schedule.
 */
export function generateRentVsBuyCsv(result: RentVsBuyResult): string {
  const headers = [
    "Year",
    "Home Value ($)",
    "Mortgage Balance ($)",
    "Buyer Net Equity ($)",
    "Buyer Total Net Worth ($)",
    "Monthly Rent ($)",
    "Renter Total Net Worth ($)",
    "Net Advantage ($)",
    "Leader",
  ];

  const rows = result.milestones.map((m) => {
    return [
      m.year,
      m.homeValue,
      m.remainingMortgage,
      m.buyerEquityNetOfSellingCosts,
      m.buyerTotalNetWorth,
      m.monthlyRent,
      m.renterTotalNetWorth,
      m.netDifference,
      m.winningOption.toUpperCase(),
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}
