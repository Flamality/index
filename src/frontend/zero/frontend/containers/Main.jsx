import React from "react";
import DMBar from "../components/layout/dmBar/dmBar";

import styles from "./Main.module.css";

export default function Main() {
  return (
    <div className={styles.app_mount}>
      <DMBar />
    </div>
  );
}
