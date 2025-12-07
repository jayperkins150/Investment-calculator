import React from 'react';
import InvestmentChart from './InvestmentChart';
import { calculateInvestmentResults } from '../util/investments';

const OutputData = ({ inputValue, currency = "GBP" }) => {
    if (!inputValue) return <p>No input available.</p>;

    const values = {
        initialInvestment: Number(inputValue.initialInvestment) || 0,
        annualInvestment: Number(inputValue.annualInvestment) || 0,
        expectedReturn: Number(inputValue.expectedReturn) || 0,
        duration: Number(inputValue.duration) || 0,
    };

    // Error handling for incomplete or invalid input
    if (
        values.initialInvestment <= 0 ||
        values.annualInvestment <= 0 ||
        values.expectedReturn <= 0 ||
        values.duration <= 0
    ) {
        return (
            <p style={{ color: "red", fontWeight: "bold" }}>
                Complete the form to generate output.
            </p>
        );
    }
    
    // Run the calculations
    const resultData = calculateInvestmentResults(values);

    // Handle case with no results
    if (!Array.isArray(resultData) || resultData.length === 0) {
        return <p>No results to display.</p>;
    }

    // Determine max interest for highlighting
    const maxInterest = Math.max(...resultData.map(r => r.interest));

    // Currency formatter
    const formatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
        minimumFractionDigits: 2
    });

    return (
        <>
            {/* Chart component */}
            <div style={{ width: "100%", margin: "2rem auto", backgroundColor: "white" }}>
                <InvestmentChart data={resultData} currency={currency} />
            </div>

            {/* Table structure */}
            <table id="result">
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Investment Value</th>
                        <th>Interest (Year)</th>
                        <th>Total Interest</th>
                        <th>Invested Capital</th>
                    </tr>
                </thead>

                <tbody>
                    {resultData.map((y) => (
                        <tr
                            key={y.year}
                            style={y.interest === maxInterest ? { backgroundColor: "#43d300ff" } : {}}
                        >
                            <td>{yearData.year}</td>
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
                <p>Total Invested: {formatter.format(resultData.at(-1).investedCapital)}</p>
                <p>Total Interest Earned: {formatter.format(resultData.at(-1).totalInterest)}</p>
            </div>
        </>
    );
};

export default OutputData;
