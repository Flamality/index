import React from "react";

import "./CreateConnectionList.css";
import { FaSpotify } from "react-icons/fa6";

export default function CreateConnectionList() {
  const connectSpotify = () => {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const port = window.location.port ? `:${window.location.port}` : "";
    const redirectUri =
      window.location.protocol +
      "//" +
      window.location.hostname +
      port +
      "/connect/spotify";
    const scope = [
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-email",
    ].join(" ");

    console.log(redirectUri);

    const authUrl =
      "https://accounts.spotify.com/authorize" +
      `?client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
  };
  return (
    <div className='account-tab-connections-createlist'>
      <a onClick={connectSpotify}>
        <FaSpotify />
      </a>
    </div>
  );
}
