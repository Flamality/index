import { databases, tablesDB } from '../../appwrite/client.js';

export default async function (user, { req, res, log }, body) {
  if (!body.id) {
    return res.status(400).json({ error: 'Missing channel ID' });
  }

  let info = null;

  try {
    const res = await tablesDB.getRow({
      databaseId: 'social',
      tableId: 'channels',
      rowId: body.id,
    });
    info = res;
  } catch (error) {}
  if (!info) {
   return res.status(404)
  }
  return res.json(info);
}

