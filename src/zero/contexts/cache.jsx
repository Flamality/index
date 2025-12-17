// CacheProvider.js
import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { databases } from "../../services/appwrite";

export const Cache = createContext(null);

export const useCache = () => useContext(Cache);

export const CacheProvider = ({ children }) => {
  // Store all cached entities
  const [users, setUsers] = useState({});
  const [channels, setChannels] = useState({});
  const [messages, setMessages] = useState({});
  const fetchingUsers = useRef({});
  // --- Helper functions ---
  

  const updateUser = useCallback(async (id) => {
    if (fetchingUsers.current[id]) return fetchingUsers.current[id];
  
    if (users[id] && Date.now() - users[id].lastFetch < 10000) return;
  
    const promise = databases.getDocument("main", "users", id)
      .then(res => {
        setUsers(prev => ({
          ...prev,
          [id]: { ...res, lastFetch: Date.now() }
        }));
        return res;
      })
      .finally(() => {
        delete fetchingUsers.current[id];
      });
  
    fetchingUsers.current[id] = promise;
    return promise;
  }, [users]);

  const updateChannel = useCallback((id, data) => {
    setChannels(prev => ({ ...prev, [id]: { ...prev[id], ...data } }));
  }, []);

  const updateMessage = useCallback((id, data) => {
    setMessages(prev => ({ ...prev, [id]: { ...prev[id], ...data } }));
  }, []);

  const clearCache = useCallback(() => {
    setUsers({});
    setChannels({});
    setMessages({});
  }, []);

  return (
    <Cache.Provider
      value={{
        users,
        channels,
        messages,
        updateUser,
        updateChannel,
        updateMessage,
        clearCache,
      }}
    >
      {children}
    </Cache.Provider>
  );
};
