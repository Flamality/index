import React from "react";

import styles from "./Typography.module.css";

export function HeaderLarge({ muted = false, children }) {
  return (
    <p className={`${styles.headerLarge} ${muted ? styles.muted : ""}`}>
      {children}
    </p>
  );
}

export function HeaderMedium({ muted = false, children }) {
  return (
    <p className={`${styles.headerMedium} ${muted ? styles.muted : ""}`}>
      {children}
    </p>
  );
}

export function HeaderSmall({ muted = false, children }) {
  return (
    <p className={`${styles.headerSmall} ${muted ? styles.muted : ""}`}>
      {children}
    </p>
  );
}

export function HeaderTiny({ muted = false, children }) {
  return (
    <p className={`${styles.headerTiny} ${muted ? styles.muted : ""}`}>
      {children}
    </p>
  );
}
