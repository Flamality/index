import React from "react";
import Routing from "./Routing";
import SpotifyController from "./components/core/SpotifyController/SpotifyController";
import NotificationsPanel from "./components/core/elements/notificatons/NotificationsPanel";
import ContextMenu from "./components/core/elements/overlays/ContextMenu/ContextMenu";
import Modal from "./components/core/elements/Modal/Modal";

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
