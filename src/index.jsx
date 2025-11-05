import React, { useContext } from "react";

import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/Theme.css";
import Root from "./Root";
import { AuthProvider } from "./contexts/auth";
import { BrowserRouter } from "react-router-dom";
import { NotificationsProvider } from "./contexts/notifications";
import { ConnectionsProvider } from "./contexts/connections";
import { LayersProvider } from "./contexts/layers";
console.log("Test");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <NotificationsProvider>
        <AuthProvider>
          <LayersProvider>
            <ConnectionsProvider>
              <Root />
            </ConnectionsProvider>
          </LayersProvider>
        </AuthProvider>
      </NotificationsProvider>
    </BrowserRouter>
  // </React.StrictMode>
);
