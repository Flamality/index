import { refreshUser } from "../contexts/cache";

export const handleNotificationEvent = async (event) => {
  const { event_type: type } = event;
  if (
    type === "FRIEND_REQUEST_RECEIVED" ||
    type === "FRIEND_REQUEST_DENIED" ||
    type === "FRIEND_REMOVED" ||
    type === "FRIEND_REQUEST_ACCEPTED"
  ) {
    const { sender } = event;
    console.log("Refreshing user cache for sender:", sender);
    refreshUser(sender);
  }
};
