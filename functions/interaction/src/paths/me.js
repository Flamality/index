import { Query } from 'node-appwrite';
import { presences, tablesDB } from '../appwrite/client.js';
import { getSpotifyUser } from '../services/spotify';

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
  let presence = 'offline';
  log(Query.equal('userId', [user.$id]));
  try {
    const presenceList = await presences.list([
      Query.equal('userId', [user.$id]),
    ]);
    if (presenceList.total > 0) {
      presence = fullData.status || 'offline';
    }
  } catch (error) {}
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
    display: fullData.display,
    username: fullData.username,
    email: fullData.email,
    emailVerification: fullData.emailVerification,
    avatar: fullData.avatar,
    bio: fullData.bio,
    banner_gradient: fullData.banner_gradient,
    banner: fullData.banner,
    badges: fullData.badges,
    online: fullData.online,
    timezone: fullData.timezone,
    connections: connections,
    presence: presence,
    sc_decor: fullData.sc_decor,
    gradient_style: fullData.gradient_style,
    joined: fullData.$createdAt,
    status: fullData.status || 'offline',
  };
  return res.json(userObject || null);
}
