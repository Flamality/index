// ConnectionsProvider.js
import React, { createContext, useState } from "react";
import { databases } from "../services/appwrite";
import { FaSpotify } from "react-icons/fa6";

export const Connections = createContext(null);

export const platforms = {
  spotify: {
    name: "Spotify",
    icon: FaSpotify,
  },
};

export const ConnectionsProvider = ({ children }) => {
  const [loadingConnections, setLoadingConnections] = useState(true);
  const [connections, setConnections] = useState([]);

  const getConnections = (id) => {
    setLoadingConnections(true);
    try {
      const private_connections = databases.getDocument("main", "secrets", id);
      setConnections(private_connections.connection_info);
    } catch (error) {}
  };

  const createConnection = async (id, platform, token, refresh, display) => {
    if (platforms[platform]) {
      const data = {
        platform,
        token,
        refresh,
        display,
        public: false,
      };
      setConnections((prev) => [...prev, data]);
      await databases.upsertDocument(
        "main",
        "secrets",
        id,
        JSON.stringify(data)
      );
    }
  };

  return (
    <Connections.Provider
      value={{
        getConnections,
        connections,
        createConnection,
      }}
    >
      {children}
    </Connections.Provider>
  );
};
