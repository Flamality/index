export default async function (user, { req, res, log }) {
  let body;
  try {
    body = JSON.parse(req.body);
  } catch (error) {
    return res.text('Invalid JSON body.', 400);
  }
  const id = body.id;

  if (!id) {
    return res.json({ success: false, error: 'No user ID provided' });
  }

  try {
    const userData = await tablesDB.getRow({
      databaseId: 'main',
      tableId: 'users',
      rowId: req.body.id,
    });

    const fullData = { ...user, ...userData };

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
      connections: fullData.connections,
    };

    return res.json(userObject || null);
  } catch (error) {
    log(error);
    return res.json(
      { success: false, error: 'An error occurred while fetching user data.' },
      500
    );
  }
}
