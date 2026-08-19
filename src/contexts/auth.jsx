// AuthProvider.js
import React, { useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";
import {
  account,
  databases,
  execute,
  presences,
  realtime,
} from "../services/appwrite";
import {
  getCurrentSong,
  getSpotifyUser,
  refreshSpotifyToken,
} from "../services/spotify";
import { Notifications } from "./notifications";
import { ID, Permission, Role } from "appwrite";
import { redirect } from "../services/redirect";
import { Layers } from "./layers";
import { initiateCache, updateUserCache } from "./cache";

export const Auth = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { confirmationModal } = useContext(Layers);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updUserData, setUpdUserData] = useState(userData || {});
  const [dataDiff, setdataDiff] = useState([]);
  const [PID, setPID] = useState(null);
  const [connections, setConnections] = useState([]);

  const presenceRef = useRef(null);

  const [friends, setFriends] = useState([]);
  const [incomingFriends, setIncomingFriends] = useState([]);
  const [outgoingFriends, setOutgoingFriends] = useState([]);

  const { createNotification } = useContext(Notifications);
  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    account.get().then(
      (response) => {
        if (response.type === "user_more_factors_required") {
          setLoading(false);
          redirect("/auth/mfa", true);
          return;
        }
        setUser(response);
        getUserData(response.$id);
      },
      (error) => {
        setUser(null);
        setLoading(false);
      },
    );
  }, []);

  const getUserData = async (userId, tryCount = 0) => {
    // const response = await databases.getDocument("main", "users", userId);
    const response = await execute("interaction", "/me");
    if (response.success === false) {
      if (tryCount < 8) {
        setTimeout(() => getUserData(userId, tryCount + 1), 1000);
      }
      return;
    }
    await initiateCache();
    setUserData(response);
    setUpdUserData(response);
    createNotification(
      "success",
      "Fetched user data",
      `Got user data for ${response?.username}`,
      true,
    );
    await getConnections(userId);
    setLoading(false);

    subscribeToPresence(response);
    return response;
  };

  const subscribeToPresence = async (userData) => {
    if (presenceRef.current) return;
    const presenceID = ID.unique();
    setPID(presenceID);
    const presence = await realtime.upsertPresence({
      presenceId: presenceID,
      status: userData?.status || "offline",
      permissions: [
        Permission.read(Role.users()),
        Permission.update(Role.user(userData.id)),
        Permission.delete(Role.user(userData.id)),
        Permission.write(Role.user(userData.id)),
      ],
    });
    presenceRef.current = presence;
  };

  const confirmLogout = () => {
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
      },
    );
  };

  const logout = async () => {
    confirmationModal(
      "Log Out?",
      "Are you sure you want to logout?",
      confirmLogout,
      () => {},
      "Log Out",
      "Cancel",
    );
  };

  const register = async (email, password, username, display) => {};

  const login = async (email, password) => {
    setLoading(true);
    try {
      return account.createEmailPasswordSession(email, password).then(
        (response) => {
          console.log("Login response:", response);
          if (response.type === "user_more_factors_required") {
            redirect("/auth/mfa", true);
            return;
          }
          return account.get().then(
            async (response) => {
              await getUserData(response.$id);
              return response;
            },
            (error) => {
              if (error.type === "user_more_factors_required") {
                window.location.href = "/auth/mfa";
              }
              setUser(null);
              setLoading(false);
              throw error;
            },
          );
        },
        (error) => {
          setLoading(false);
          throw error;
        },
      );
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };
  const updateDataValue = (key, value) => {
    const oldData = userData[key];
    if (oldData === undefined) return;

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
        updates,
      );
      setdataDiff([]);
      try {
        realtime.upsertPresence({
          presenceId: presenceRef?.current?.$id,
          status: res.status || "offline",
          metadata: { updates: updates },
        });
      } catch (error) {
        console.error("Error updating presence:", error);
        createNotification(
          "danger",
          "Couldn't send presence update",
          "There was an error",
        );
      }

      getUserData(user.$id);
      createNotification("success", "Saved", "Your settings have saved.");
    } catch (err) {
      createNotification(
        "danger",
        "Couldn't save",
        "There was an error while saving.",
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
