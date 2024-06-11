// src/App.js
import React, { useEffect, useState } from 'react';
import { getAuthUrl, getToken } from './services/spotifyAuth';
import SongCharts from './components/SongCharts';
import TopArtists from './components/TopArtists';

const App = () => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga inicial

  useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const token = await getToken(code);
          setToken(token);
          setLoading(false); // Cuando se obtiene el token, detener la carga
          window.history.pushState({}, null, '/'); // Limpiar el código de la URL
        } catch (error) {
          console.error('Error fetching the token', error);
          setLoading(false); // En caso de error, detener la carga también
        }
      } else {
        setLoading(false); // Si no hay código en la URL, detener la carga
      }
    };

    fetchToken();
  }, []);

  const handleLogin = async () => {
    const authUrl = await getAuthUrl();
    window.location.href = authUrl;
  };

  if (loading) {
    return <p>Loading...</p>; // Mostrar mensaje de carga mientras se autentica
  }

  return (
    <div className="container mx-auto p-4">
      {!token ? (
        <button 
          onClick={handleLogin} 
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Iniciar sesión con Spotify
        </button>
      ) : (
        <div> {/* Agrega un contenedor para los componentes una vez que el token está disponible */}
          <SongCharts token={token} />
          <TopArtists token={token} />
        </div>
      )}
    </div>
  );
};

export default App;
