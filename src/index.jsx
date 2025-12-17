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
// import { MDXProvider } from "@mdx-js/react";

// const mdxComponents = {
//   h1: (props) => <h1 style={{ fontSize: "2rem", marginTop: "1em", color: "#fff" }} {...props} />,
//   p: (props) => <p style={{ marginBottom: "1em", lineHeight: "1.6", color: "#fff" }} {...props} />,
//   a: (props) => <a style={{ color: "#0077ff" }} {...props} />,
//   ul: (props) => <ul style={{ listStyle: "none", paddingLeft: "0" }} {...props} />,
//   ol: (props) => <ol style={{ listStyle: "none", paddingLeft: "0" }} {...props} />,
//   li: (props) => <li style={{ color: "#fff" }} {...props} />,
// };

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    {/* <MDXProvider components={mdxComponents}> */}
    <NotificationsProvider>
      <AuthProvider>
        <LayersProvider>
          <ConnectionsProvider>
            <Root />
          </ConnectionsProvider>
        </LayersProvider>
      </AuthProvider>
    </NotificationsProvider>
    {/* </MDXProvider> */}
  </BrowserRouter>
  // </React.StrictMode>
);
