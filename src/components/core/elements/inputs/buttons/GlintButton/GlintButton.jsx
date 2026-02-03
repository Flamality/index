import React from "react";

import styles from "./GlintButton.module.css";

export default function GlintButton({ onClick, children }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}
