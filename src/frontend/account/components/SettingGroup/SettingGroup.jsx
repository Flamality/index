import React from "react";

import styles from "./SettingGroup.module.css";

export default function SettingGroup({ children }) {
  return <div className={styles.group}>{children}</div>;
}
