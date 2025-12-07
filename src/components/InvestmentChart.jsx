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

const InvestmentChart = ({ data = [], currency = "GBP" }) => {
  const chartData = {
    labels: data.map(item => `Year ${item.year}`),
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

  return (
    <div style={{ width: '100%', maxWidth: '900px', margin: '2rem auto' }}>
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default InvestmentChart;
