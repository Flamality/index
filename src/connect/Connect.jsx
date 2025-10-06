import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { databases } from "../services/appwrite";
import { Auth } from "../contexts/auth";
import { Permission, Role } from "appwrite";
import Spinner from "../components/core/elements/Spinner";

import "./Connect.css";
import { FaCheck, FaSpotify, FaXmark } from "react-icons/fa6";
import { Connections } from "../contexts/connections";
import { Notifications } from "../contexts/notifications";

const connectionTypes = {
  spotify: {
    name: "Spotify",
    icon: <FaSpotify />,
  },
};

export default function Connect() {
   const { createNotification } = useContext(Notifications);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("Unknown Error Occured")
  const { app } = useParams();
  const { createConnection } = useContext(Connections);

  const { user } = useContext(Auth);

  const exchangeSpotifyCode = async (code) => {
    setLoading(true);
    setSuccess(false);
    setError("Unknown Error Occured")
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    createNotification("info", "Starting connection", "Exchanging code.")
    // const redirectUri = "https://flamality.com/connect/spotify";
    const redirectUri = "https://9000-firebase-index-1756315404059.cluster-j3txs2guavbhgth3nz5qsaq5gi.cloudworkstations.dev/connect/spotify"

    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(`${clientId}:${clientSecret}`),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
    });
    createNotification("info", "Got response", "Got response from spotify.")
    if (!res.ok) {
      setSuccess(false);
      setLoading(false);
      const errText = await res.text();
      const errJson = await res.json();
      console.log(errJson);
      setError(res?.error_description || "Unknown Error Occured");
      createNotification("danger", "Failed", `${res.status}: ${errText}`);
      return;
    }
    const data = await res.json();
    console.log(data);
    createNotification("success", "Connected", data.access_token)
    setSuccess(true);
    setLoading(false);
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;

    databases.upsertDocument(
      "main",
      "secrets",
      user.$id,
      {
        spotify_token: accessToken,
        spotify_refresh_token: refreshToken,
        UID: user.$id,
      },
      [
        Permission.read(Role.user(user.$id)),
        Permission.update(Role.user(user.$id)),
        Permission.delete(Role.user(user.$id)),
      ]
    );
    createConnection(
      user.$id,
      "spotify",
      spotify_token,
      spotify_refresh_token,
      "Example"
    );
    return accessToken;
  };

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      if (code && !success) {
        if (app === "spotify") {
          exchangeSpotifyCode(code);
        }
      }
    }
  }, [app]);
  return (
    <div className='connect'>
      <div className='connect-card'>
        <h1>Connecting {connectionTypes[app].name}</h1>
        <div className='connect-icon'>
          {connectionTypes[app].icon}
          {loading ? "●●●" : success ? <FaCheck /> : <FaXmark />}
          <img src='/context/favicon-96x96.png' />
        </div>
        {loading ? (
          <div className='connect-bio'>
            <Spinner />
          </div>
        ) : success ? (
          <div className='connect-bio'>
            <h2>Connected!</h2>
          </div>
        ) : (
          <div className='connect-bio'>
            <h2>Connection failed!</h2>
            <p>Please try again later.</p>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
