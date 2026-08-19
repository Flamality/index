import { ID } from 'node-appwrite';
import { tablesDB } from '../../appwrite/client.js';

export default async function (user, { req, res, log }, body) {
  if (!user) {
    return res.json({ success: false, error: 'No user logged in.' }, 401);
  }

  let content = body.content;
  if (!content) {
    return res.json(
      { success: false, error: 'No message content provided.' },
      400
    );
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
        clienttimestamp: body.clienttimestamp || null,
        timestamp: String(Date.now()),
      },
    });
    return res.json({ success: true });
  } catch (error) {
    return res.json(
      { success: false, error: error.message || 'Failed to send message.' },
      500
    );
  }
}
