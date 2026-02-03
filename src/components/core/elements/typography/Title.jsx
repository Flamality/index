import React from "react";

import styles from "./Typography.module.css";

export function TitleLarge({ muted = false, children }) {
  return (
    <p className={`${styles.titleLarge} ${muted ? styles.muted : ""}`}>
      {children}
    </p>
  );
}

export function TitleMedium({ muted = false, children }) {
  return (
    <p className={`${styles.titleMedium} ${muted ? styles.muted : ""}`}>
      {children}
    </p>
  );
}

export function TitleSmall({ muted = false, children }) {
  return (
    <p className={`${styles.titleSmall} ${muted ? styles.muted : ""}`}>
      {children}
    </p>
  );
}
