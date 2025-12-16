import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// Add viewMode prop
const InvestmentChart = ({ data = [], currency = "GBP", viewMode = "yearly" }) => {
    
    // Use years for clarity, regardless of data resolution.
    // If monthly, only label the years (12th, 24th, 36th period, etc.)
    const labels = data.map(item => {
        if (viewMode === 'monthly') {
            // Only show the label if the period is the end of a year
            if (item.year % 12 === 0) {
                return `Year ${item.year / 12}`;
            }
            return ''; // Hide labels for individual months
        }
        // If yearly view, use the actual year number
        return `Year ${item.year}`;
    });

  const chartData = {
    labels: labels, // Use the smart labels
    datasets: [
      {
        label: `Investment Value (${currency})`,
        data: data.map(item => item.investmentValue),
        borderWidth: 2,
        tension: 0.3,
        fill: false,
      }
    ]
  };

    // Add configuration to skip drawing zero-length labels
    const options = {
        responsive: true,
        scales: {
            x: {
                // Ensure labels without text are skipped for a clean axis
                ticks: {
                    autoSkip: true,
                    maxRotation: 0,
                    minRotation: 0,
                    // If monthly view, show fewer ticks to prevent crowding
                    maxTicksLimit: viewMode === 'monthly' ? 20 : 30 
                }
            },
            y: {
                ticks: {
                    // Currency formatting helper for the Y-axis (optional)
                    callback: function(value) {
                         const symbol = currency === "GBP" ? "£" : currency === "USD" ? "$" : "€";
                         return symbol + value.toLocaleString();
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                 // Show the correct period number in the tooltip
                 callbacks: {
                    title: function(tooltipItems) {
                        const period = tooltipItems[0].label.replace('Year ', '');
                        if (viewMode === 'monthly') {
                           return `Period: Month ${tooltipItems[0].dataIndex + 1}`;
                        }
                        return `Period: Year ${period}`;
                    }
                 }
            }
        }
    };

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '2rem auto' }}>
      <Line data={chartData} options={options} /> 
    </div>
  );
};

export default InvestmentChart;