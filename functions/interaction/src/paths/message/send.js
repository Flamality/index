import { ID } from 'node-appwrite';
import { tablesDB } from '../../appwrite/client.js';
import { createNotification } from '../../services/notification.js';

export default async function (user, { req, res, log }, body) {
  if (!user) {
    return res.json({ success: false, error: 'No user logged in.' }, 401);
  }

  let content = body.content;
  let dm = body.dm || false;
  if (!content) {
    return res.json(
      { success: false, error: 'No message content provided.' },
      400
    );
  }
let dmData
  if (dm) {
    const dmRes = await tablesDB.getRow({
      databaseId: 'social',
      tableId: 'directmessages',
      rowId: dm,
    });
    if (!dmRes) {
      return res.json({ success: false, error: 'DM channel not found.' }, 404);
    }
    if (!dmRes.users.includes(user.$id)) {
      return res.json(
        { success: false, error: 'User is not a member of this DM channel.' },
        403
      );
    }
    dmData = dmRes;
  }

  content = content.trim();
  if (content.length === 0) {
    return res.json(
      { success: false, error: 'Message content cannot be empty.' },
      400
    );
  }
  try {
    await tablesDB.createRow({
      databaseId: 'social',
      tableId: 'messages',
      rowId: ID.unique(),
      data: {
        content: content,
        author: user.$id,
        parent: body.parent || null,
        dm_parent: dm || null,
        clienttimestamp: body.clienttimestamp || null,
        timestamp: String(Date.now()),
        server: !!dm
      },
    });
    log(`Message sent by user ${user.$id} in ${dm ? 'DM' : 'channel'} ${dm || body.parent || 'N/A'}`);
    log(`DM Data: ${JSON.stringify(dmData)}`);
    await createNotification(
      'NEW_MESSAGE',
      user.$id,
      { value: content, parent: dm || body.parent || null },
      dmData?.users || [],
      log
    );
    return res.json({ success: true });
  } catch (error) {
    return res.json(
      { success: false, error: error.message || 'Failed to send message.' },
      500
    );
  }
}
