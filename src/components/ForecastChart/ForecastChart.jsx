import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './ForecastChart.css';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ForecastChart = ({ forecast }) => {
  const data = {
    labels: forecast.map(d => new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: forecast.map(d => d.temp),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3, // Smooth curves
        fill: false
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Temperature Trend' }
    }
  };

  return <div className="chart-container"><Line data={data} options={options} /></div>;
};

export default ForecastChart;