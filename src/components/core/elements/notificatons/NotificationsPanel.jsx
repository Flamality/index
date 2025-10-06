import React, { useContext, useEffect, useState } from "react";
import { Notifications } from "../../../../contexts/notifications";
import "./NotificationsPanel.css";
import {
  FaCheck,
  FaInfo,
  FaQuestion,
  FaTriangleExclamation,
} from "react-icons/fa6";

export default function NotificationsPanel() {
  const { notifications } = useContext(Notifications);
  const [localNotifs, setLocalNotifs] = useState([]);

  useEffect(() => {
    notifications.forEach((n) => {
      if (!localNotifs.find((ln) => ln.id === n.id)) {
        // Add with visible=false first
        setLocalNotifs((prev) => [...prev, { ...n, visible: false }]);
        // Trigger enter in next tick
        setTimeout(() => {
          setLocalNotifs((prev) =>
            prev.map((ln) => (ln.id === n.id ? { ...ln, visible: true } : ln))
          );
        }, 10);

        setTimeout(() => hideNotification(n.id), 3000);
      }
    });
  }, [notifications]);

  const hideNotification = (id) => {
    setLocalNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, visible: false } : n))
    );
    setTimeout(() => {
      setLocalNotifs((prev) => prev.filter((n) => n.id !== id));
    }, 400);
  };

  return (
    <div className='notifications-panel'>
      {localNotifs.map((n) => (
        <div
          key={n.id}
          className={`notification ${n.type} ${n.visible ? "enter" : "exit"}`}
        >
          <div className='notification-accent'>
            {n.type == "danger" && <FaTriangleExclamation />}
            {n.type == "success" && <FaCheck />}
            {n.type == "warning" && <FaQuestion />}
            {n.type == "info" && <FaInfo />}
          </div>
          <p className="notification-title">{n.title}</p>
          <p className="notification-desc">{n.desc}</p>
        </div>
      ))}
    </div>
  );
}
