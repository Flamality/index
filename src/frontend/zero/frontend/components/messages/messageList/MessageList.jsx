import React from "react";

import styles from "./MessageList.module.css";
import { useParams } from "react-router-dom";

export default function MessageList() {
    const { id } = useParams();

    
  return <div className={styles.container}></div>;
}
