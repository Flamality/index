import { tablesDB } from '../../appwrite/client.js';

export default async function (user, { req, res, log }) {
  let body;
  try {
    body = JSON.parse(req.body);
  } catch (error) {
    return res.text('Invalid JSON body.', 400);
  }
  if (!body.name || !body.code)
    return res.text('No connection name or code provided.', 400);
  const name = body.name;
  const code = body.code;

  if (!user) {
    return res.text('Unauthorized', 401);
  }

  if (name !== 'spotify') {
    return res.text('Unsupported connection type.', 400);
  }
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = 'http://127.0.0.1:3000/connect/spotify';
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    });
    if (!response.ok) {
      const errText = await response.text();
      log(`Spotify token exchange failed: ${errText}`);
      return res.text(`Spotify token exchange failed: ${errText}`, 400);
    }
    const data = await response.json();
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;

    await tablesDB.upsertRow({
      databaseId: 'main',
      tableId: 'secrets',
      rowId: user.$id,
      data: {
        spotify_token: accessToken,
        spotify_refresh_token: refreshToken,
        UID: user.$id,
      },
      permissions: [
        Permission.read(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
        Permission.delete(Role.user(user.$id)),
      ],
    });
    return res.json({ success: true });
  } catch (error) {
    log(error);
    return res.text('An error occurred while adding the connection.', 500);
  }
}
