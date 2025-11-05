import React from "react";
import Routing from "./Routing";
import SpotifyController from "./components/core/SpotifyController/SpotifyController.jsx";
import NotificationsPanel from "./components/core/elements/notificatons/NotificationsPanel.jsx";
import ContextMenu from "./components/core/elements/ContextMenu/ContextMenu.jsx";
import Modal from "./components/core/elements/Modal/Modal.jsx";

export default function Root() {
  return (
    <React.Fragment>
      <SpotifyController />
      <NotificationsPanel />
      <ContextMenu />
      <Modal />
      <Routing />
    </React.Fragment>
  );
}
