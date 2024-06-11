// src/components/TopArtistsPieChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getTopArtistsPopularity } from '../services/spotifyApi';

const TopArtistsPieChart = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const topArtistsPopularity = await getTopArtistsPopularity(token);

        const data = {
          labels: topArtistsPopularity.map(artist => artist.name),
          datasets: [
            {
              label: 'Popularity',
              data: topArtistsPopularity.map(artist => artist.popularity),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };

        setChartData(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch top artists popularity');
        setLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!chartData) {
    return <p>No data available</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Top Artists Popularity Pie Chart</h2>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

export default TopArtistsPieChart;
