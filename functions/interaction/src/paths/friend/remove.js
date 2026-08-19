// 0 = no relation
// 1 = incoming request
// 2 = outgoing request
// 3 = friends

import { tablesDB } from '../../appwrite/client.js';
import { createNotification } from '../../services/notification.js';

export default async function (user, { req, res, log }, body) {
  if (!user) {
    return res.json({ success: false, error: 'No user logged in.' }, 401);
  }

  const { id } = body;

  if (!id) {
    return res.json({ success: false, error: 'No user ID provided.' }, 400);
  }
  let relation;
  try {
    const res = await tablesDB.getRow({
      databaseId: 'social',
      tableId: 'relations',
      rowId: `${user.$id}${id}`,
    });
    relation = res?.type || 0;
  } catch (error) {
    relation = 0;
  }
  if (relation === 0) {
    return res.json(
      { success: false, error: 'No friend request to remove.' },
      400
    );
  }
  if (relation === 2) {
    try {
      await tablesDB.deleteRow({
        databaseId: 'social',
        tableId: 'relations',
        rowId: `${user.$id}${id}`,
      });
      await tablesDB.deleteRow({
        databaseId: 'social',
        tableId: 'relations',
        rowId: `${id}${user.$id}`,
      });
      await createNotification('FRIEND_REQUEST_DENIED', id, {
        sender: user.$id,
      });
    } catch (error) {
      return res.json(
        { success: false, error: 'Failed to deny friend request.' },
        500
      );
    }
  }

  if (relation === 1) {
    try {
      await tablesDB.deleteRow({
        databaseId: 'social',
        tableId: 'relations',
        rowId: `${user.$id}${id}`,
      });
      await tablesDB.deleteRow({
        databaseId: 'social',
        tableId: 'relations',
        rowId: `${id}${user.$id}`,
      });
      await createNotification('FRIEND_REQUEST_DENIED', id, {
        sender: user.$id,
      });
    } catch (error) {
      return res.json(
        { success: false, error: 'Failed to deny friend request.' },
        500
      );
    }
  }
  if (relation === 3) {
    try {
      await tablesDB.deleteRow({
        databaseId: 'social',
        tableId: 'relations',
        rowId: `${user.$id}${id}`,
      });
      await tablesDB.deleteRow({
        databaseId: 'social',
        tableId: 'relations',
        rowId: `${id}${user.$id}`,
      });
      await createNotification('FRIEND_REMOVED', id, { sender: user.$id });
    } catch (error) {
      return res.json(
        { success: false, error: 'Failed to remove friend.' },
        500
      );
    }
  }

  return res.json({ success: true });
}
