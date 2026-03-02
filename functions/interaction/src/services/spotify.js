export const getSpotifyUser = async (token) => {
  try {
    const res = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.error('Failed to fetch Spotify user');
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {}
};

const refreshToken = async (refreshToken) => {};
