import { tablesDB } from '../main.js';
import { getSpotifyUser } from '../services/spotify.js';

export default async function (user, { req, res, log }, body) {
  if (!user) {
    return res.json({ success: false, error: 'No user logged in.' }, 401);
  }

  const userData = await tablesDB.getRow({
    databaseId: 'main',
    tableId: 'users',
    rowId: user.$id,
  });
  const fullData = { ...user, ...userData };
  let connections = {};
  const secret = await tablesDB.getRow({
    databaseId: 'main',
    tableId: 'secrets',
    rowId: user.$id,
  });
  if (secret?.spotify_token) {
    const spotifyUser = await getSpotifyUser(secret.spotify_token);
    connections = {
      'spotify:': {
        id: spotifyUser?.id || null,
        username: spotifyUser?.display_name || null,
        email: spotifyUser?.email || null,
        profile_url: spotifyUser?.external_urls?.spotify || null,
        connected: true,
      },
    };
  }
  const userObject = {
    id: fullData.$id,
    username: fullData.username,
    email: fullData.email,
    emailVerification: fullData.emailVerification,
    avatar: fullData.avatar,
    bio: fullData.bio,
    banner_gradient: fullData.banner_gradient,
    banner: null,
    badges: fullData.badges,
    online: fullData.online,
    connections: connections,
  };
  return res.json(userObject || null);
}
