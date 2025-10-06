import React from "react";
import Routing from "./Routing";
import SpotifyController from "./components/core/SpotifyController/SpotifyController.jsx";
import NotificationsPanel from "./components/core/elements/notificatons/NotificationsPanel.jsx";
import ContextMenu from "./components/core/elements/ContextMenu/ContextMenu.jsx";

export default function Root() {
  return (
    <React.Fragment>
      <SpotifyController />
      <NotificationsPanel />
      <ContextMenu />
      <Routing />
    </React.Fragment>
  );
}
