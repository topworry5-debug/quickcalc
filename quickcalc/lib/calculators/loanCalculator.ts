/**
 * Loan / EMI Calculator Logic
 * 
 * Computes monthly EMI, total interest payable, and total payment.
 * Also generates a year-by-year amortization table.
 */

export interface LoanParams {
  principal: number;
  annualRate: number; // e.g. 7.5 for 7.5%
  tenure: number;     // tenure in number of units
  tenureUnit: "years" | "months";
}

export interface AmortizationYear {
  yearNumber: number;
  startingBalance: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  endingBalance: number;
}

export interface LoanResult {
  monthlyEMI: number;
  totalInterestPayable: number;
  totalPayment: number;
  amortizationTable: AmortizationYear[];
}

export function calculateLoan({
  principal,
  annualRate,
  tenure,
  tenureUnit,
}: LoanParams): LoanResult {
  const totalMonths = tenureUnit === "years" ? tenure * 12 : tenure;
  const monthlyRate = (annualRate / 12) / 100;

  let monthlyEMI = 0;
  if (monthlyRate === 0) {
    monthlyEMI = principal / totalMonths;
  } else {
    monthlyEMI = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                 (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const totalPayment = monthlyEMI * totalMonths;
  const totalInterestPayable = totalPayment - principal;

  // Generate Year-by-Year Amortization Table
  const amortizationTable: AmortizationYear[] = [];
  let remainingBalance = principal;
  
  let interestPaidThisYear = 0;
  let principalPaidThisYear = 0;
  let totalPaidThisYear = 0;
  let startingBalanceThisYear = principal;

  for (let month = 1; month <= totalMonths; month++) {
    const interestPaidThisMonth = remainingBalance * monthlyRate;
    const principalPaidThisMonth = monthlyEMI - interestPaidThisMonth;
    
    interestPaidThisYear += interestPaidThisMonth;
    principalPaidThisYear += principalPaidThisMonth;
    totalPaidThisYear += monthlyEMI;
    remainingBalance -= principalPaidThisMonth;

    // End of year or last month
    if (month % 12 === 0 || month === totalMonths) {
      const yearNumber = Math.ceil(month / 12);
      
      // Prevent slight floating point errors from leaving small residues
      const endingBalance = remainingBalance < 0.1 ? 0 : remainingBalance;

      amortizationTable.push({
        yearNumber,
        startingBalance: parseFloat(startingBalanceThisYear.toFixed(2)),
        principalPaid: parseFloat(principalPaidThisYear.toFixed(2)),
        interestPaid: parseFloat(interestPaidThisYear.toFixed(2)),
        totalPaid: parseFloat(totalPaidThisYear.toFixed(2)),
        endingBalance: parseFloat(endingBalance.toFixed(2)),
      });

      // Reset for next year
      startingBalanceThisYear = endingBalance;
      interestPaidThisYear = 0;
      principalPaidThisYear = 0;
      totalPaidThisYear = 0;
    }
  }

  return {
    monthlyEMI: parseFloat(monthlyEMI.toFixed(2)),
    totalInterestPayable: parseFloat(totalInterestPayable.toFixed(2)),
    totalPayment: parseFloat(totalPayment.toFixed(2)),
    amortizationTable,
  };
}

export function getLoanExplanationSteps(
  params: LoanParams,
  result: LoanResult
): string[] {
  const steps: string[] = [];
  const { principal, annualRate, tenure, tenureUnit } = params;

  const totalMonths = tenureUnit === "years" ? tenure * 12 : tenure;
  if (tenureUnit === "years") {
    steps.push(`Convert loan term into months: ${tenure} years × 12 = ${totalMonths} monthly payments`);
  } else {
    steps.push(`Loan duration: ${totalMonths} monthly payments`);
  }

  const monthlyRatePercent = annualRate / 12;
  const monthlyRateDecimal = monthlyRatePercent / 100;
  steps.push(`Calculate monthly interest rate: ${annualRate}% ÷ 12 = ${monthlyRatePercent.toFixed(4)}% per month (${monthlyRateDecimal.toFixed(6)} decimal)`);

  if (annualRate === 0) {
    steps.push(`With 0% interest, divide loan principal by number of months: $${principal.toLocaleString()} ÷ ${totalMonths} = $${result.monthlyEMI.toLocaleString()} / month`);
  } else {
    steps.push(
      `Apply EMI formula [P × r × (1+r)^n] ÷ [(1+r)^n - 1]: Principal = $${principal.toLocaleString()}, monthly rate r = ${monthlyRateDecimal.toFixed(6)}, n = ${totalMonths}`
    );
    steps.push(`Calculated monthly payment (EMI): $${result.monthlyEMI.toLocaleString()} / month`);
  }

  steps.push(`Calculate total payment over full term: $${result.monthlyEMI.toLocaleString()} × ${totalMonths} months = $${result.totalPayment.toLocaleString()}`);

  steps.push(`Calculate total interest paid: Total Payment ($${result.totalPayment.toLocaleString()}) - Principal ($${principal.toLocaleString()}) = $${result.totalInterestPayable.toLocaleString()}`);

  return steps;
}
