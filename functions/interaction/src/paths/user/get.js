import { Query } from 'node-appwrite';
import { presences, tablesDB } from '../../appwrite/client.js';

export default async function (user, { req, res, log }, body) {
  const id = body.id;

  if (!id) {
    return res.json({ success: false, error: 'No user ID provided' }, 401);
  }

  try {
    const userData = await tablesDB.getRow({
      databaseId: 'main',
      tableId: 'users',
      rowId: body.id,
    });
    let relation = 0;
    try {
      if (user) {
        const res = await tablesDB.getRow({
          databaseId: 'social',
          tableId: 'relations',
          rowId: user.$id + body.id,
        });
        relation = res.type;
      }
    } catch (error) {
      relation = 0;
    }

    const fullData = { ...user, ...userData };
    let presence = 'offline';
    try {
      const presenceList = await presences.list([
        Query.equal('userId', [body.id]),
      ]);
      if (presenceList.total > 0) {
        presence = fullData.status || 'offline';
      }
    } catch (error) {}
    const userObject = {
      id: fullData.$id,
      username: fullData.username,
      display: fullData.display,
      email: fullData.email,
      emailVerification: fullData.emailVerification,
      avatar: fullData.avatar,
      bio: fullData.bio,
      banner_gradient: fullData.banner_gradient,
      banner: fullData.banner,
      badges: fullData.badges,
      presence: presence,
      connections: fullData.connections,
      timezone: fullData.timezone,
      relation: relation,
      sc_decor: fullData.sc_decor,
      gradient_style: fullData.gradient_style,
      joined: fullData.$createdAt,
    };

    return res.json(userObject || null, 200);
  } catch (error) {
    log(error);
    return res.json(
      { success: false, error: 'An error occurred while fetching user data.' },
      500
    );
  }
}

export const config = {
  requiresUser: true,
  requiresAdmin: false,
  requiresVerification: false,
};
