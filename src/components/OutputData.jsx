import React, { useState, useEffect } from 'react';
import InvestmentChart from './InvestmentChart';
import { calculateInvestmentResults } from '../util/investments';
import { generatePDF } from '../util/generatereport.js';

const OutputData = ({ userInput, currency = "GBP", viewMode }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [calculatedData, setCalculatedData] = useState(null);

    const values = {
        initialInvestment: Number(userInput.initialInvestment),
        annualInvestment: Number(userInput.annualInvestment),
        expectedReturn: Number(userInput.expectedReturn),
        duration: Number(userInput.duration)
    };

    // Check for invalid input immediately
    const isInputValid = !(
        values.initialInvestment <= 0 ||
        values.annualInvestment <= 0 ||
        values.expectedReturn <= 0 ||
        values.duration <= 0
    );
    
    // Use useEffect to trigger asynchronous calculation
    useEffect(() => {
        
        if (!isInputValid) {
            setCalculatedData(null); // Clear data if inputs are invalid
            setIsLoading(false);
            return;
        }
        
        // Start loading sequence
        setIsLoading(true);
        setCalculatedData(null); // Clear previous results immediately

        // Calculate results
        const results = calculateInvestmentResults(userInput, viewMode); 

        const timer = setTimeout(() => {
            setCalculatedData(results); // Update state with final result
            setIsLoading(false);
        }, 500); // Enforce a 500ms minimum loading time

        // Cleanup function for useEffect: clear the timer if inputs change before delay finishes
        return () => clearTimeout(timer);

    }, [userInput, viewMode, isInputValid]); // Dependencies: Recalculate when input or viewMode changes

    // Handle Loading State early
    if (isLoading) {
        return <p style={{ color: "#1677ff", fontWeight: "bold" }}>Calculating investment growth...</p>;
    }

    // Use calculatedData for rendering checks
    if (!calculatedData || calculatedData.length === 0) {
        return (
            <p style={{ color: "red", fontWeight: "bold" }}>
                Complete the form to generate output.
            </p>
        );
    }
    
    // Use calculatedData for all rendering logic below this point
    const resultData = calculatedData;
    const periodLabel = viewMode === 'monthly' ? 'Month' : 'Year';

    const formatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
        minimumFractionDigits: 2
    });

    // Determine max interest for highlighting
    const maxInterest = Math.max(...resultData.map(r => r.interest));

    // handleDownloadPDF function
    const handleDownloadPDF = () => {
        generatePDF(resultData, currency, userInput);
    };

    return (
        <>
            {/* Chart component */}
            <div style={{ width: "100%", margin: "1rem auto", padding: "1px", backgroundColor: "white" }}>
                {/* Pass viewMode to the chart */}
                <InvestmentChart data={resultData} currency={currency} viewMode={viewMode} /> 
            </div>

            {/* Table structure */}
            <table id="result">
                <thead>
                    <tr>
                        <th>{periodLabel}</th>
                        <th>Investment Value</th>
                        <th>Interest ({periodLabel})</th>
                        <th>Total Interest</th>
                        <th>Invested Capital</th>
                    </tr>
                </thead>

                <tbody>
                    {resultData.map((y) => (
                        <tr
                            key={y.year}
                            style={y.interest === maxInterest ? { backgroundColor: "#ffffffff" } : {}}
                        >
                            <td>{y.year}</td>
                            <td>{formatter.format(y.investmentValue)}</td>
                            <td>{formatter.format(y.interest)}</td>
                            <td>{formatter.format(y.totalInterest)}</td>
                            <td>{formatter.format(y.investedCapital)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Summary section */}
            <div style={{ marginTop: "1.5rem", fontWeight: "bold" }}>
                <p>Total Invested: {formatter.format(resultData[resultData.length - 1].investedCapital)}</p>
                <p>Total Interest Earned: {formatter.format(resultData[resultData.length - 1].totalInterest)}</p>
            </div>

            {/* Download PDF button */}
            <button type="button" onClick={handleDownloadPDF}>
                Download PDF
            </button>
        </>
    );
};

export default OutputData;
