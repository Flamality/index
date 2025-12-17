// CurrentProvider.js
import React, { createContext, useContext, useState, useCallback } from "react";
import { Cache } from "./cache";
import { databases } from "../../services/appwrite";

export const Current = createContext(null);

export const useCurrent = () => useContext(Current);

export const CurrentProvider = ({ children }) => {
    const [channel, setChannel] = useState(null);
    const [currentChannel, setCurrentChannel] = useState(null);
    const [currentMessages, setCurrentMessages] = useState([]);
    const cache = useContext(Cache)

    const fetchMoreMessages = async () => {
        if (!channel) return;
        const offset = length(currentMessages);
        const res = await databases.listDocuments("social", "messages", [
            Query.equal("channel", channel),
            Query.orderDesc("$createdAt"),
            limit(10)
        ], offset)
    }

    const changeChannel = async (channel, type = "DM") => {
        setCurrentChannel(null);
        setCurrentMessages(null);
        const cacheInfo = cache.channels[channel]
        if (cacheInfo) {
            setCurrentChannel(cacheInfo)
            setCurrentMessages(cache.messages[channel])
            setChannel(channel)
        } else {
        }
        if (type == "DM") {
            const res = await databases.getDocument("social", "dms", channel)
            setCurrentChannel(res);
            setChannel(res?.$id || null);
            cache.updateChannel(res?.$id, res)
            fetchMoreMessages();
            document.title = "DM | Zone Zero"
        } else if (type == "SERVER") {
            const res = await databases.getDocument("social", "servers", channel)
            setCurrentChannel(res);
            setChannel(res?.$id || null);
            cache.updateChannel(res?.$id, res)
            fetchMoreMessages();
        }
    }
  
  return (
    <Current.Provider
      value={{
        currentChannel,
        currentMessages,
        changeChannel
      }}
    >
      {children}
    </Current.Provider>
  );
};
