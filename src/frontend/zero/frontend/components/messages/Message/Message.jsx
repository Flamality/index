import React from "react";

import styles from "./Message.module.css";
import { useUser } from "../../../../../../contexts/cache";
import UserAvatar from "../../../../../../components/core/elements/users/UserAvatar/UserAvatar";

export default function Message({ message }) {
  const sender = useUser(message.author);
  return (
  <div className={`${styles.container} ${message.pending ? styles.pending : ""}`}>
      <div className={styles.avatarContainer}>
        <UserAvatar userData={sender} size={"small"} showStatus={false} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.messageHeader}><p className={styles.senderName}>
          {sender?.display || sender?.username || "Unknown User"}
        </p>
        <p className={styles.timestamp}>{timeStampToDateString(message.timestamp)}</p></div>
       
        <p className={styles.messageContent}>
          {message.content}
        </p>
      <div>
        {/* <p>{JSON.stringify(message)}</p> */}
      </div>
      </div>
    </div>
  );
}


const timeStampToDateString = (timestamp) => {
  const currentDate = new Date();
  const messageDate = new Date(timestamp * 1);
  if (currentDate.toDateString() === messageDate.toDateString()) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (currentDate.getDate() - messageDate.getDate() === 1) {
    return "Yesterday at " + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return messageDate.toLocaleDateString() + " " + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}