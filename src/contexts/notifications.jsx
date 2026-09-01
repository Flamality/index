// NotificationsProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { client, realtime } from "../services/appwrite";
import { Auth } from "./auth";
import { admin } from "../../devConfig";
import { Channel } from "appwrite";
import { addMessageToCache, getDMChannelFromCache, refreshUser, updateUserCache, useDMChannel } from "./cache";

export const Notifications = createContext(null);

// let nextId = 0;

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const createNotification = (type, title, desc, reqAdmin = false) => {
    if (reqAdmin && !admin) return;
    const id = Math.random();
    setNotifications((prev) => [...prev, { id, type, title, desc }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  const handleNotificationEvent = async (event) => {
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

      // if (type === "FRIEND_REQUEST_RECEIVED") {
      //   createNotification(
      //     "info",
      //     "Friend Request Received",
      //     `You have received a friend request from ${sender}`,
      //   );
      // }
      // if (type === "FRIEND_REQUEST_DENIED") {
      //   createNotification(
      //     "info",
      //     "Friend Request Denied",
      //     `Your friend request to ${sender} was denied`,
      //   );
      // }
    }
    if (type === "NEW_MESSAGE") {
      const { value, parent, UID, target } = event;
      const channel = await getDMChannelFromCache(parent);
      addMessageToCache(parent, {
        content: value,
        author: UID,
        timestamp: Date.now(),
        $id: target
      });
    }
  };

  useEffect(() => {
    try {
      const subscription = client.subscribe(
        [`databases.main.collections.events.documents`],
        (response) => {
          const event = response.payload;
          console.log(event);
          createNotification(
            "info",
            "Event received",
            JSON.stringify(event),
            true,
          );
          handleNotificationEvent(event);
        },
      );
      const presenceSubscription = realtime.subscribe(
        Channel.presences(),
        (response) => {
          createNotification(
            "info",
            "Presence event",
            JSON.stringify(response.payload),
            true,
          );
          if (response.channels.includes("presences.delete")) {
            const userId = response.payload.userId;
            updateUserCache(userId, { presence: "offline" });
          }
          if (
            response.channels.includes("presences.upsert") ||
            response.channels.includes("presences.update")
          ) {
            updateUserCache(response.payload?.userId, {
              ...response?.payload?.metadata,
              presence: response.payload.status,
            });
          }
        },
      );
      createNotification("success", "Connected", "Connected to realtime", true);
      return () => {
        subscription();
        presenceSubscription();
        createNotification(
          "danger",
          "Disconnected",
          "Disconnected from realtime",
          true,
        );
      };
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Notifications.Provider value={{ notifications, createNotification }}>
      {children}
    </Notifications.Provider>
  );
};
