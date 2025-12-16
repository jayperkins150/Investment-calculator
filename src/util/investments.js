export function calculateInvestmentResults(
    {
        initialInvestment = 0,
        annualInvestment = 0,
        expectedReturn = 0,
        duration = 0
    },
    timePeriod = 'yearly'
) {
    const results = [];
    const baseRate = expectedReturn / 100;
    
    // Determine time step and contributions based on view
    let numPeriods;
    let periodRate;
    let periodContribution;
    
    if (timePeriod === 'monthly') {
        // Calculations adjusted for monthly compounding
        numPeriods = duration * 12; // Total months
        periodRate = baseRate / 12;  // Monthly return rate
        periodContribution = annualInvestment / 12; // Monthly contribution
    } else {
        // Yearly view (original logic)
        numPeriods = duration; // Total years
        periodRate = baseRate;
        periodContribution = annualInvestment;
    }

    let previousValue = Number(initialInvestment) || 0;
    let cumulativeInterest = 0;
    
    // Store the initial investment amount to track invested capital
    const initialCapital = Number(initialInvestment) || 0;

    for (let period = 1; period <= numPeriods; period++) {
        const afterContribution = previousValue + periodContribution;

        // Future Value calculation (simplified)
        const investmentValue = afterContribution * (1 + periodRate);

        const interest = investmentValue - afterContribution;

        cumulativeInterest += interest;
        
        // Calculate Invested Capital based on the number of full years passed
        const yearsPassed = timePeriod === 'monthly' ? Math.floor(period / 12) : period;
        const investedCapital = initialCapital + (Number(annualInvestment) * yearsPassed);
        
        // Only push results for every full year in yearly view, or every period in monthly view
        if (timePeriod === 'monthly' || period % 1 === 0) {
            results.push({
                // The 'year' field now represents the time period number
                year: period, 
                investmentValue,
                interest,
                totalInterest: cumulativeInterest,
                investedCapital
            });
        }

        previousValue = investmentValue;
    }
    
    // Filter out monthly results, keeping only the final month of each year for a cleaner yearly chart representation,
    // if the user is in the yearly view (or just return all if monthly).
    if (timePeriod === 'yearly') {
         // In yearly view, we only want the final result of the year's calculation loop.
         // Since the loop runs yearly (period=1, 2, 3...), we return all results.
         return results; 
    } else {
        // For monthly view, we return all 12*duration results.
        return results;
    }
}