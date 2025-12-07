export function calculateInvestmentResults(
    {
        initialInvestment = 0,
        annualInvestment = 0,
        expectedReturn = 0,
        duration = 0
    }) {
    const results = [];
    const rate = expectedReturn / 100;

    let previousValue = Number(initialInvestment) || 0;
    let cumulativeInterest = 0;

    for (let year = 1; year <= duration; year++) {
        const afterContribution = previousValue + Number(annualInvestment);

        const investmentValue = afterContribution * (1 + rate);

        const interest = investmentValue - afterContribution;

        cumulativeInterest += interest;

        const investedCapital =
            Number(initialInvestment) + Number(annualInvestment) * year;

        results.push({
            year,
            investmentValue,
            interest,
            totalInterest: cumulativeInterest,
            investedCapital
        });

        previousValue = investmentValue;
    }

    return results;
}
