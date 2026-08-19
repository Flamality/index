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
    try {
      await tablesDB.createRow({
        databaseId: 'social',
        tableId: 'relations',
        rowId: `${user.$id}${id}`,
        data: {
          UID: user.$id,
          target: id,
          type: 1,
        },
      });
      await tablesDB.createRow({
        databaseId: 'social',
        tableId: 'relations',
        rowId: `${id}${user.$id}`,
        data: {
          UID: id,
          target: user.$id,
          type: 2,
        },
      });
      await createNotification('FRIEND_REQUEST_RECEIVED', id, {
        sender: user.$id,
      });
    } catch (error) {
      return res.json(
        { success: false, error: 'Failed to add friend request.' },
        500
      );
    }
  }
  if (relation === 2) {
    try {
      log('Creating First');
      await tablesDB.updateRow({
        databaseId: 'social',
        tableId: 'relations',
        rowId: `${user.$id}${id}`,
        data: {
          UID: user.$id,
          target: id,
          type: 3,
        },
      });
      log('Creating Second');
      await tablesDB.updateRow({
        databaseId: 'social',
        tableId: 'relations',
        rowId: `${id}${user.$id}`,
        data: {
          UID: id,
          target: user.$id,
          type: 3,
        },
      });
      await createNotification('FRIEND_REQUEST_ACCEPTED', id, {
        sender: user.$id,
      });
    } catch (error) {
      log(JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      return res.json(
        { success: false, error: 'Failed to accept friend request.' },
        500
      );
    }
  }

  if (relation === 1) {
    return res.json(
      {
        success: false,
        error: 'You already have a pending friend request from this user.',
      },
      400
    );
  }

  return res.json({ success: true });
}
