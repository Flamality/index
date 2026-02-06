import React, { useEffect, useState } from "react";

import styles from "./Docs.module.css";
import { useLocation, useParams } from "react-router-dom";

const builtinDocs = ["terms", "privacy"];

import Landing from "./pages/Landing.jsx";
import DocViewer from "./pages/DocViewer";

export default function Docs() {
  const { id } = useParams();
  const location = useLocation();
  const [isDoc, setIsDoc] = useState(false);
  useEffect(() => {
    document.title = "Flamality | Docs";
  }, []);
  useEffect(() => {
    if (
      id ||
      (location.pathname !== "/docs" && location.pathname !== "/docs/")
    ) {
      setIsDoc(true);
    } else {
      setIsDoc(false);
    }
  }, [id, location.pathname]);
  return (
    <>
      {isDoc ? (
        <DocViewer id={id || location.pathname.replace("/", "")} />
      ) : (
        <Landing />
      )}
    </>
  );
}
