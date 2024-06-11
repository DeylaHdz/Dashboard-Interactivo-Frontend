// src/services/spotifyApi.js
const baseUrl = "https://api.spotify.com/v1";

export const getTopTracks = async (token) => {
  const response = await fetch(`${baseUrl}/me/top/tracks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error response:", errorData);
    throw new Error("Failed to fetch top tracks");
  }

  const data = await response.json();
  console.log("API Response:", data);
  return data.items;
};

// src/services/spotifyApi.js
export const getTopArtists = async (token) => {
  const response = await fetch(`${baseUrl}/me/top/artists?limit=10`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error response:', errorData);
    throw new Error('Failed to fetch top artists');
  }

  const data = await response.json();
  console.log('API Response:', data);
  
  // Ordenar los artistas por popularidad (de mayor a menor)
  const sortedArtists = data.items.sort((a, b) => b.popularity - a.popularity);
  
  return sortedArtists;
};

export const getTopArtistsPopularity = async (token) => {
  const response = await fetch(`${baseUrl}/me/top/artists?limit=10`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error response:', errorData);
    throw new Error('Failed to fetch top artists');
  }

  const data = await response.json();
  console.log('API Response:', data);
  
  // Obtener los 10 artistas más escuchados y sus popularidades
  const topArtistsPopularity = data.items.slice(0, 10).map(artist => ({
    name: artist.name,
    popularity: artist.popularity
  }));
  
  return topArtistsPopularity;
};

