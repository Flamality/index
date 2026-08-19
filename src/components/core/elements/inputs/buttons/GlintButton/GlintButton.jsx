import React from "react";

import styles from "./GlintButton.module.css";

export default function GlintButton({ fullLength, onClick, children }) {
  return (
    <button
      className={`${styles.button} ${fullLength ? styles.fullLength : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
