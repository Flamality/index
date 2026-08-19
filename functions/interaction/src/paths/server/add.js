import { users } from '../../appwrite/client.js';

export default async function (user, { req, res, log }, body) {
  if (!user) {
    return res.json({ success: false, error: 'No user logged in.' }, 401);
  }
  let id = body.id || user.$id;

  const temp_user = await users.get(id);

  users.updateLabels({
    userId: id,
    labels: temp_user.labels + [body.channel],
  });
}
