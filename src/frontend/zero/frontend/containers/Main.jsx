import React from "react";
import DMBar from "../components/layout/dmBar/DMBar";

import styles from "./Main.module.css";
import Channel from "../components/layout/channel/Channel";

export default function Main({dm = false}) {
  return (
    <div className={styles.app_mount}>
      <DMBar />
      <Channel dm={dm} />
    </div>
  );
}
