import React from "react";
import styles from "./ButtonGroup.module.css";
export default function ButtonGroup({ children, position = "left" }) {
  return (
    <div className={styles.buttonGroup} style={{ textAlign: position }}>
      {children}
    </div>
  );
}
