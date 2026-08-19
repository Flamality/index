import { ID, Permission, Role } from 'node-appwrite';
import { tablesDB } from '../appwrite/server.js';

// MASTER LIST OF NOTIFICATION TYPES, THIS DEFINES TYPES THAT CAN BE USED GLOBALLY, BE CAREFUL WHEN CHANGING
type NotificationType =
  // ACCOUNT SYSTEM
  | 'FRIEND_REQUEST_RECEIVED'
  | 'FRIEND_REQUEST_ACCEPTED'
  | 'FRIEND_REQUEST_DECLINED'
  | 'FRIEND_REMOVED'
  // ZONE ZERO CHAT MESSAGEING
  | 'NEW_MESSAGE';

interface NotificationData {
  sender?: string;
  target?: string;
  value?: string;
  parent?: string;
  title?: string;
  desc?: string;
}

export const createNotification = async (
  type: NotificationType,
  uid: string,
  data: NotificationData
) => {
  try {
    await tablesDB.createRow({
      databaseId: 'main',
      tableId: 'events',
      rowId: ID.unique(),
      data: {
        UID: uid,
        event_type: type,
        timestamp: new Date().toISOString(),
        ...data,
      },
      permissions: [Permission.read(Role.user(uid))],
    });
  } catch (error) {
    throw new Error(`Failed to create notification: ${error}`);
  }
};
