// src/components/SongCharts.js
import React, { useEffect, useState } from 'react';
import { getTopTracks } from '../services/spotifyApi';

const SongCharts = ({ token }) => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const topTracks = await getTopTracks(token);
        setTracks(topTracks);
      } catch (err) {
        setError('Failed to fetch top tracks');
        console.error(err);
      }
    };

    if (token) {
      fetchTracks();
    }
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Top Tracks</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <div key={track.id} className="bg-white p-4 rounded shadow">
            <img src={track.album.images[0].url} alt={track.name} className="w-full h-48 object-cover rounded" />
            <h3 className="mt-2 font-semibold">{track.name}</h3>
            <p className="text-gray-600">{track.artists.map((artist) => artist.name).join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SongCharts;
