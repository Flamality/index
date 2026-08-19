import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { execute } from "../services/appwrite";
import { Auth } from "../contexts/auth";
import Spinner from "../components/core/elements/Spinner";

import "./Connect.css";
import { FaCheck, FaSpotify, FaUser, FaXmark } from "react-icons/fa6";
import { Connections } from "../contexts/connections";
import { Notifications } from "../contexts/notifications";
import Button from "../components/core/elements/inputs/buttons/Button/Button";

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
  const { app } = useParams();

  const exchangeSpotifyCode = async (code) => {
    setLoading(true);
    setSuccess(false);
    createNotification("info", "Starting connection", "Exchanging code.", true);
    const res = await execute("interaction", "connection/add", {
      name: "spotify",
      code: code,
    });
    createNotification(
      "info",
      "Got response",
      "Got response from spotify.",
      true,
    );
    if (!res.success) {
      setSuccess(false);
      setLoading(false);
      createNotification("danger", "Failed", "Couldn't connect to Spotify.");
      return;
    }
    createNotification("success", "Connected", "Connected to Spotify!");
    setSuccess(true);
    setLoading(false);
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
    <div className="connect">
      <div className="connect-card">
        <h1>Connecting {connectionTypes[app].name}</h1>
        <div className="connect-icon">
          {connectionTypes[app].icon}
          {loading ? "●●●" : success ? <FaCheck /> : <FaXmark />}
          <img src="/context/favicon-96x96.png" />
        </div>
        {loading ? (
          <div className="connect-bio">
            <Spinner />
          </div>
        ) : success ? (
          <div className="connect-bio">
            <h2>Connected!</h2>
            <a href="/account">
              <Button>Back to account</Button>
            </a>
          </div>
        ) : (
          <div className="connect-bio">
            <h2>Connection failed!</h2>
            <a href="/account">
              <Button>Back to account</Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
