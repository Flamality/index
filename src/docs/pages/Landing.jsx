import React from "react";
import NavBar from "../components/NavBar/NavBar";

import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.container}>
      <NavBar />
    </div>
  );
}
