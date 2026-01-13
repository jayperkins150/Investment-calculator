export function calculateInvestmentResults(
  {
    initialInvestment = 0,
    annualInvestment = 0,
    expectedReturn = 0,
    duration = 0,
  },
  timePeriod = "yearly",
  options = { monthlyOutput: "monthly" } // "monthly" | "yearly"
) {
  const results = [];

  const baseRate = (Number(expectedReturn) || 0) / 100;
  const initialCapital = Number(initialInvestment) || 0;
  const annual = Number(annualInvestment) || 0;

  const isMonthly = timePeriod === "monthly";

  const numPeriods = isMonthly ? (Number(duration) || 0) * 12 : (Number(duration) || 0);
  const periodRate = isMonthly ? baseRate / 12 : baseRate;
  const periodContribution = isMonthly ? annual / 12 : annual;

  let previousValue = initialCapital;
  let cumulativeInterest = 0;

  for (let period = 1; period <= numPeriods; period++) {
    const afterContribution = previousValue + periodContribution;
    const investmentValue = afterContribution * (1 + periodRate);
    const interest = investmentValue - afterContribution;

    cumulativeInterest += interest;

    // Invested capital for both modes
    const investedCapital = initialCapital + periodContribution * period;

    // Control how many rows to output in monthly compounding mode
    const shouldPush =
      !isMonthly ||
      options.monthlyOutput === "monthly" ||
      (options.monthlyOutput === "yearly" && period % 12 === 0);

    if (shouldPush) {
      results.push({
        year: isMonthly ? period : period,
        investmentValue,
        interest,
        totalInterest: cumulativeInterest,
        investedCapital,
      });
    }

    previousValue = investmentValue;
  }

  return results;
}
