import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { getPollutionDescription } from './AirQuality';
import { getColorForIndex } from './AirColorUtils';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, annotationPlugin);

const MeasurementChart = ({ measurements }) => {
  if (measurements.values.length === 0) return null;

  // sort by date ascending order
  const sortedMeasurements = [...measurements.values].sort((a, b) => new Date(a.date) - new Date(b.date));

  // latest 24 measurements
  const latestMeasurements = sortedMeasurements.slice(-24);

  const chartData = {
    labels: latestMeasurements.map(item => item.date.slice(11, 16)), // time (HH:mm) as labels
    datasets: [
      {
        label: measurements.key,
        data: latestMeasurements.map(item => item.value),
        backgroundColor: latestMeasurements.map(item => {
          // Get the pollution description for the current parameter
          const description = getPollutionDescription(measurements.key, item.value);
          // Get the color for description
          return getColorForIndex(description);
        }),
      },
    ],
  };

  // Add vertical lines to indicate the start of each day at 00:00
  const annotations = latestMeasurements.reduce((acc, item, index) => {
    if (item.date.slice(11, 16) === '00:00') {
      acc.push({
        type: 'line',
        xMin: index,
        xMax: index,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 1,
      });
    }
    return acc;
  }, []);

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: { display: false },
        grid: { display: false },
        ticks: { display: true },
      },
      y: {
        title: { display: true, text: 'µg/m³' },
        grid: { display: true },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: false },
      annotation: { annotations },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const time = latestMeasurements[context.dataIndex].date.slice(11, 16);
            return `${value} µg/m³ at ${time}`;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default MeasurementChart;
