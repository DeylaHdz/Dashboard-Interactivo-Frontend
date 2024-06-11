// src/components/TopArtists.js
import React, { useEffect, useState } from 'react';
import { getTopArtists } from '../services/spotifyApi';

const TopArtists = ({ token }) => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const topArtists = await getTopArtists(token);
        setArtists(topArtists);
      } catch (err) {
        setError('Failed to fetch top artists');
        console.error(err);
      }
    };

    if (token) {
      fetchArtists();
    }
  }, [token]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Top Artists</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {artists.map((artist, index) => (
          <div key={artist.id} className="bg-white p-4 rounded shadow">
            <h3 className="mt-2 font-semibold">{index + 1}. {artist.name}</h3>
            <p>Popularity: {artist.popularity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
