import React, { useState, useEffect } from 'react';
import { Line, Pie, Doughnut, Radar, PolarArea, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement, RadialLinearScale } from 'chart.js';
import './Dashboard.css'; // Assuming this CSS file is correct

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement, // For Pie, Doughnut, Polar Area charts
  BarElement, // For Bar chart
  RadialLinearScale // For Radar chart
);

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();

        const userPostCount = result.reduce((acc, post) => {
          acc[post.userId] = (acc[post.userId] || 0) + 1;
          return acc;
        }, {});

        const labels = Object.keys(userPostCount);
        const dataValues = Object.values(userPostCount);

        setData({
          labels: labels,
          datasets: [
            {
              label: 'Number of Posts per User',
              data: dataValues,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
            },
            {
              label: 'Another Chart',
              data: dataValues.reverse(),
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
            },
          ],
        });
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Data for different types of charts
  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 205, 86, 1)'],
      },
    ],
  };

  const doughnutData = {
    labels: ['Red', 'Green', 'Blue'],
    datasets: [
      {
        data: [30, 50, 20],
        backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)'],
      },
    ],
  };

  const radarData = {
    labels: ['Red', 'Green', 'Blue', 'Yellow', 'Purple'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 90, 81, 56],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const polarAreaData = {
    labels: ['Red', 'Green', 'Yellow', 'Blue', 'Purple'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
        backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(54, 162, 235, 1)'],
      },
    ],
  };

  const barData = {
    labels: ['Red', 'Green', 'Blue'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [15, 25, 35],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Example of rendering different types of charts
  const renderCharts = () => {
    return (
      <>
        <div className="chart-wrapper">
          <h3>Line Chart</h3>
          <Line data={data} />
        </div>
        <div className="chart-wrapper">
          <h3>Pie Chart</h3>
          <Pie data={pieData} />
        </div>
        <div className="chart-wrapper">
          <h3>Doughnut Chart</h3>
          <Doughnut data={doughnutData} />
        </div>
        <div className="chart-wrapper">
          <h3>Radar Chart</h3>
          <Radar data={radarData} />
        </div>
        <div className="chart-wrapper">
          <h3>Polar Area Chart</h3>
          <PolarArea data={polarAreaData} />
        </div>
        <div className="chart-wrapper">
          <h3>Bar Chart</h3>
          <Bar data={barData} />
        </div>
      </>
    );
  };

  return (
    <div className="dashboard-content">
      <h2>Dashboard</h2>
      <div className="dashboard-grid">
        {renderCharts()}
      </div>
    </div>
  );
};

export default Dashboard;
