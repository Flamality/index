import { databases, tablesDB } from '../../appwrite/client.js';

export default async function (user, { req, res, log }, body) {
  if (!body.id) {
    res.status(400).json({ error: 'Missing channel ID' });
    return;
  }

  let info = null;

  try {
    const res = await tablesDB.getRow({
      databaseId: 'social',
      tableId: 'channels',
      rowId: body.id,
    });
  } catch (error) {}
}
