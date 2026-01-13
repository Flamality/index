// NotificationsProvider.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { client } from "../services/appwrite";
import { Auth } from "./auth";
import { admin } from "../../devConfig";

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
  useEffect(() => {
    try {
      const subscription = client.subscribe(
        [`databases.main.collections.events.documents`],
        (response) => {
          const event = response.payload;
          console.log(event);
          createNotification("info");
        }
      );
      createNotification("success", "Connected", "Connected to realtime", true);
      return () => {
        subscription();
        createNotification(
          "danger",
          "Disconnected",
          "Disconnected from realtime",
          true
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
