import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface ChartJsData {
  labels: string[];
  datasets: [{
    label: string;
    data: string[];
  }]
}

function DoughnutChart({chartData}: {chartData: ChartJsData}) {  
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
        text: 'Productos vendidos',
        color: '#fff',
        font: {
          size: 20
        }
      },
    },
  };

  return (
    <Doughnut 
      data={chartData}
      options={options}
    />
  )
}

export default DoughnutChart