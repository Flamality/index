import { Query } from 'appwrite';
import { tablesDB } from '../../appwrite/client.js';

export default async function (user, { res, log }, body) {
  if (!user) {
    return res.json({ success: false, error: 'No user logged in.' }, 401);
  }

  const dmParent = String(body?.dm_parent || '');
  if (!dmParent) {
    return res.json({ success: false, error: 'No DM channel provided.' }, 400);
  }

  const offset = Math.max(0, Number(body?.offset) || 0);

  try {
    const dm = await tablesDB.getRow({
      databaseId: 'social',
      tableId: 'directmessages',
      rowId: dmParent,
    });

    if (!dm.users?.includes(user.$id)) {
      return res.json(
        { success: false, error: 'User is not a member of this DM channel.' },
        403
      );
    }

    const result = await tablesDB.listRows({
      databaseId: 'social',
      tableId: 'messages',
      queries: [
        Query.equal('dm_parent', dmParent),
        Query.orderDesc('timestamp'),
        Query.limit(50),
        Query.offset(offset),
      ],
    });

    return res.json(result.rows || [], 200);
  } catch (error) {
    log(error);
    return res.json(
      { success: false, error: 'An error occurred while fetching messages.' },
      500
    );
  }
}