export const getCurrentSong = async (token) => {
  try {
    const res = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch current song");
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching current song:", error);
    return null;
  }
};

export const getSpotifyUser = async (token) => {
  try {
    const res = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.error("Failed to fetch Spotify user");
      return null;
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching Spotify user:", error);
    return null;
  }
};

export const pauseSpotify = async (token) => {
  try {
    const res = await fetch("https://api.spotify.com/v1/me/player/pause", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.error("Failed to pause Spotify playback");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error pausing Spotify playback:", error);
    return false;
  }
};
export const nextSpotify = async (token) => {
  try {
    const res = await fetch("https://api.spotify.com/v1/me/player/next", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.error("Failed to skip to next track");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error skipping to next track:", error);
    return false;
  }
};

export const prevSpotify = async (token) => {
  try {
    const res = await fetch("https://api.spotify.com/v1/me/player/previous", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.error("Failed to skip to previous track");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error skipping to previous track:", error);
    return false;
  }
};
export const refreshSpotifyToken = async (refreshToken) => {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  const basicAuth = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    if (!res.ok) throw new Error("Failed to refresh token");

    const data = await res.json();
    return data.access_token;
  } catch (err) {
    console.error("Error refreshing token:", err);
    return null;
  }
};
