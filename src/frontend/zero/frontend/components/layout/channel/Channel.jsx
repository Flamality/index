import React, { useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { useDMChannel, useMessages, addMessageToCache, fetchMoreMessages } from "../../../../../../contexts/cache";
import TextField from "../../../../../../components/core/elements/inputs/TextField";
import Button from "../../../../../../components/core/elements/inputs/buttons/Button/Button";
import { execute } from "../../../../../../services/appwrite";
import Message from "../../messages/Message/Message";
import styles from "./Channel.module.css";
import {ID} from "appwrite";
import {Auth} from "../../../../../../contexts/auth";
// import {userData} from "../../../../../../contexts/auth"

export default function Channel({ dm }) {
  const { id } = useParams();
  const { user } = useContext(Auth);
  const [message, setMessage] = React.useState("");
  const scrollContainerRef = useRef(null);
  const shouldStickToBottomRef = useRef(true);
  const previousScrollSnapshotRef = useRef({ top: 0, height: 0 });
  const messages = useMessages(id);
  const channel = useDMChannel(dm);
  const [channelName, setChannelName] = React.useState("New Channel");
  const send = async () => {
    try {
      const temp = ID.unique();
      const optimisticMessage = {
        content: message,
        timestamp: Date.now(),
        author: user?.$id,
        pending: true,
        int_id: temp,
      };

      addMessageToCache(id, optimisticMessage);
      setMessage("");

      const res = await execute("interaction", "/message/send", {
        dm: id,
        content: message,
        parent: id,
        server: false,
      });

      if (res.success) {
        addMessageToCache(id, {
          ...optimisticMessage,
          pending: false,
          $id: res.id,
        });
      }
    } catch (e) {
      console.error("Failed to send message:", e);
    }
  };
  useEffect(() => {

  }, [id]);



  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    shouldStickToBottomRef.current = true;
    previousScrollSnapshotRef.current = { top: 0, height: 0 };

    const handleScroll = () => {
      if (container.scrollTop <= 10) {
        fetchMoreMessages(id);
      }

      const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
      shouldStickToBottomRef.current = distanceFromBottom <= 24;
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [id]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { top: previousTop, height: previousHeight } = previousScrollSnapshotRef.current;
    const wasInitialLoad = previousHeight === 0;

    requestAnimationFrame(() => {
      const node = scrollContainerRef.current;
      if (!node) return;

      if (shouldStickToBottomRef.current || wasInitialLoad) {
        node.scrollTop = node.scrollHeight;
      } else {
        node.scrollTop = previousTop + (node.scrollHeight - previousHeight);
      }
    });

    previousScrollSnapshotRef.current = {
      top: container.scrollTop,
      height: container.scrollHeight,
    };
  }, [id, messages.length]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{channelName || "Unknown Channel"}</h2>
      </div>
      <div className={styles.messagesContainer} ref={scrollContainerRef}>

        {[...messages].sort((a, b) => (a.timestamp ?? 0) - (b.timestamp ?? 0)).map((message) => (
          <Message key={message.$id || message.int_id || `${message.timestamp || Date.now()}-${Math.random()}`} message={message} />
        ))}
      </div>
      <div className={styles.inputContainer}>
        <TextField fullLength placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} onSubmit={send} />
          <Button onClick={send}>Send</Button>``
      </div>
    </div>
  );
}