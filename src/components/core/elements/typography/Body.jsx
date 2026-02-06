import React from "react";

import styles from "./Typography.module.css";

export function BodyLarge({ muted = false, children }) {
  return (
    <p className={`${styles.bodyLarge} ${muted ? styles.muted : ""}`}>
      {children}
    </p>
  );
}

export function BodyMedium({ muted = false, children }) {
  return (
    <p className={`${styles.bodyMedium} ${muted ? styles.muted : ""}`}>
      {children}
    </p>
  );
}

export function BodySmall({ muted = false, children }) {
  return (
    <p className={`${styles.bodySmall} ${muted ? styles.muted : ""}`}>
      {children}
    </p>
  );
}
