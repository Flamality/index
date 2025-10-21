// AuthProvider.js
import React, { useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { account, databases } from "../services/appwrite";
import { getCurrentSong, getSpotifyUser, refreshSpotifyToken } from "../services/spotify";
import { Notifications } from "./notifications";

export const Auth = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updUserData, setUpdUserData] = useState(userData || {});
  const [dataDiff, setdataDiff] = useState([]);
  const [connections, setConnections] = useState([]);
  const { createNotification } = useContext(Notifications);
  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    account.get().then(
      (response) => {
        setUser(response);
        getUserData(response.$id);
      },
      (error) => {
        setUser(null);
        setLoading(false);
      }
    );
  }, []);

  const getUserData = async (userId) => {
    const response = await databases.getDocument("main", "users", userId);
    setUserData(response);
    setUpdUserData(response);
    createNotification("success", "Fetched user data", `Got user data for ${response?.username}`)
    await getConnections(userId);
    setLoading(false);
    return response;
  };

  const logout = async () => {
    setLoading(true);
    return account.deleteSession("current").then(
      () => {
        setUser(null);
        setUserData(null);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        throw error;
      }
    );
  };

  const register = async (email, password, username, display) => {};

  const login = async (email, password) => {
    setLoading(true);
    try {
      return account.createEmailPasswordSession(email, password).then(
        (response) => {
          return account.get().then(
            async (response) => {
              setUser(response);
              await getUserData(response.$id);
              return response;
            },
            (error) => {
              setUser(null);
              setLoading(false);
              throw error;
            }
          );
        },
        (error) => {
          setLoading(false);
          throw error;
        }
      );
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  const updateDataValue = (key, value) => {
    const oldData = userData[key];
    if (!oldData && oldData != "") return;

    const updatedData = { ...updUserData, [key]: value };

    setUpdUserData(updatedData);

    const diff = [];
    Object.keys(updatedData).forEach((k) => {
      if (updatedData[k] !== userData[k]) {
        diff.push({ key: k, old: userData[k], new: updatedData[k] });
      }
    });

    setdataDiff(diff);
  };

  const discardChange = (key) => {
    const revertedData = { ...updUserData, [key]: userData[key] };
    setUpdUserData(revertedData);

    const diff = [];
    Object.keys(revertedData).forEach((k) => {
      if (revertedData[k] !== userData[k]) {
        diff.push({ key: k, old: userData[k], new: revertedData[k] });
      }
    });

    setdataDiff(diff);
  };
  const saveChanges = async () => {
    const updates = {};
    dataDiff.forEach((diff) => {
      updates[diff.key] = diff.new;
    });

    try {
      const res = await databases.updateDocument(
        "main",
        "users",
        user.$id,
        updates
      );
      console.log("Saved!", res);
      setdataDiff([]);
      getUserData(user.$id);
      createNotification("success", "Saved", "Your settings have saved.");
    } catch (err) {
      createNotification(
        "danger",
        "Couldn't save",
        "There was an error while saving."
      );
      console.error("Save failed!", err);
    }
  };

  const getConnections = async (id) => {
    setLoading(true);
    setConnections([]);
    try {
      const response = await databases.getDocument("main", "secrets", id);
      let accessToken = response.spotify_token;

      let spotifyUser = await getSpotifyUser(accessToken);
      if (!spotifyUser) {
        // Maybe token expired – try to refresh
        accessToken = await refreshSpotifyToken(response.spotify_refresh_token);
        if (!accessToken) throw new Error("Could not refresh token");

        spotifyUser = await getSpotifyUser(accessToken);
        // optionally update the DB with new access token
      }

      if (spotifyUser) {
        setConnections((prev) => [
          ...prev,
          {
            app: "spotify",
            name: spotifyUser.display_name,
            token: accessToken,
          },
        ]);
      }

      const listening = await getCurrentSong(accessToken);
      console.log("Current song:", listening);
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  const value = {
    user,
    loading,
    login,
    userData,
    dataDiff,
    updUserData,
    updateDataValue,
    logout,
    register,
    discardChange,
    saveChanges,
    connections,
  };

  return <Auth.Provider value={value}>{children}</Auth.Provider>;
};
