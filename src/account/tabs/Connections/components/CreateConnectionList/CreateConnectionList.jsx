import React from "react";

import "./CreateConnectionList.css";
import { FaSpotify } from "react-icons/fa6";

export default function CreateConnectionList() {
  const connectSpotify = () => {
    const clientId = "4b9c7d2f60ae4267a42d0e68db606675";
    // const redirectUri = "https://flamality.com/connect/spotify";
    const redirectUri = "https://9000-firebase-index-1756315404059.cluster-j3txs2guavbhgth3nz5qsaq5gi.cloudworkstations.dev/connect/spotify"
    const scope = [
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-email",
    ].join(" ");

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
