// CacheProvider.js
import React, { createContext, useContext, useState, useCallback } from "react";

export const Cache = createContext(null);

export const useCache = () => useContext(Cache);

export const CacheProvider = ({ children }) => {
  // Store all cached entities
  const [users, setUsers] = useState({});
  const [channels, setChannels] = useState({});
  const [messages, setMessages] = useState({});

  // --- Helper functions ---
  const updateUser = useCallback((id, data) => {
    setUsers(prev => ({ ...prev, [id]: { ...prev[id], ...data } }));
  }, []);

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
