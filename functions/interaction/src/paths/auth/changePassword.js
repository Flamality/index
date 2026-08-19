import { account } from '../../appwrite/client.js';

export default async function (user, { req, res, log }, body) {
  const { newPassword, oldPassword } = body;

  if (!newPassword || !oldPassword) {
    return res.json(
      { success: false, error: 'New password and old password are required' },
      400
    );
  }

  if (!user) {
    return res.json({ success: false, error: 'Unauthorized' }, 401);
  }

  try {
    const res2 = await account.updatePassword({
      password: newPassword,
      oldPassword: oldPassword,
    });
    if (res2) {
      return res.json({ success: true }, 200);
    } else {
      return res.json(
        { success: false, error: 'Failed to update password' },
        400
      );
    }
  } catch (error) {
    return res.json(
      { success: false, error: 'Failed to update password' },
      400
    );
  }
}
