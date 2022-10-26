import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartJsData {
  labels: string[];
  datasets: [{
    label: string;
    data: string[];
  }]
}

function LineChart({chartData}: {chartData: ChartJsData}) {  
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        }
      },
      title: {
        display: true,
        text: 'Periodos ventas',
        color: '#fff',
        font: {
          size: 20
        }
      },
    },
  };

  return (
    <Line 
      data={chartData}
      options={options}
    />
  )
}

export default LineChart