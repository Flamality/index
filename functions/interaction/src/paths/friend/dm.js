import { ID, Query } from "appwrite";
import { tablesDB } from "../../appwrite/client.js";

export default async function (user, { req, res, log }, body) {
  if (!user) {
    return res.json({ success: false, error: 'No user logged in.' }, 401);
  }
  if (!body?.user) {
    return res.json({ success: false, error: 'No user provided' }, 400);
  }

  if (body.user === user.$id || body.user?.$id === user.$id) {
    return res.json({ success: false, error: 'Cannot create a DM with yourself' }, 400);
  }

  let channel = null;
  const targetUserId = typeof body.user === 'object' 
    ? (body.user.$id || body.user.id || body.user.userId) 
    : body.user;

  const targetIdStr = String(targetUserId);
  const currentUserIdStr = String(user.$id);

  try {
    const listResponse = await tablesDB.listRows({
      databaseId: 'social',
      tableId: 'directmessages',
      queries: [
        Query.contains('users', targetIdStr),
        Query.contains('users', currentUserIdStr),
        Query.equal('friend', true)
      ]
    });

    log("LISTED: " + JSON.stringify(listResponse));

    if (listResponse?.rows?.length > 0) {
      channel = listResponse.rows[0];
    }
  } catch (error) {
    log("Error fetching DM channel:", error);
  }

  if (!channel) {
    try {
      const createdResponse = await tablesDB.createRow({
        databaseId: "social",
        tableId: 'directmessages',
        rowId: ID.unique(),
        data: {
          friend: true,
          users: [targetIdStr, currentUserIdStr]
        }
      });

      log("CREATED: " + JSON.stringify(createdResponse));
      channel = createdResponse;
    } catch (error) {
      log("Error creating DM channel:", error);
    }
  }

  if (!channel?.$id) {
    return res.json({ success: false, error: "Couldn't find or create dm" }, 400);
  }

  return res.json({ id: channel.$id });
}