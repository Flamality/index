import { ID, Permission, Role } from 'node-appwrite';
import { tablesDB } from '../main.js';

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
  await tablesDB.createRow({
    databaseId: 'main',
    tableId: 'events',
    rowId: ID.unique(),
    data: {
      uid,
      event_type: type,
      ...data,
    },
    permissions: [Permission.read(Role.user(uid))],
  });
};
