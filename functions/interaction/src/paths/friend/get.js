import { Query } from 'appwrite';
import { tablesDB } from '../../appwrite/client.js';

export default async function (user, { req, res, log }, body) {
  if (!user) {
    return res.json({ success: false, error: 'No user logged in.' }, 401);
  }
  try {
    const userData = await tablesDB.listRows({
      databaseId: 'social',
      tableId: 'relations',
      queries: [Query.equal('UID', user.$id), Query.equal('type', [1, 2, 3])],
    });
    return res.json(userData.rows || [], 200);
  } catch (error) {
    log(error);
    return res.json(
      {
        success: false,
        error: 'An error occurred while fetching friend data.',
      },
      500
    );
  }
}
