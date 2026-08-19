import React, { useContext, useState } from "react";

import styles from "./Flag.module.css";
import GlintButton from "../../../../components/core/elements/inputs/buttons/GlintButton/GlintButton";
import { databases } from "../../../../services/appwrite";
import { Notifications } from "../../../../contexts/notifications";

export default function Flag({ flag }) {
  const { createNotification } = useContext(Notifications);
  const [title, setTitle] = useState(flag.title);
  const [desc, setDesc] = useState(flag.desc);
  const [active, setActive] = useState(flag.active);

  const handleSave = async () => {
    const updatedFlag = {
      title,
      desc,
      active,
    };
    try {
      databases.updateDocument("main", "flags", flag.$id, updatedFlag);
      createNotification("success", "Updated", "Flag updated successfully");
    } catch (error) {
      createNotification(
        "error",
        "Error",
        "Failed to update flag" + error.message
      );
    }
  };
  return (
    <div className={styles.container}>
      <input
        type='checkbox'
        checked={active}
        onChange={(e) => setActive(e.target.checked)}
        className={styles.active}
      />
      <p className={styles.id}>{flag.$id}</p>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.title}
      />
      <input
        type='checkbox'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.nullable}
      />
      <input
        type='text'
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className={styles.desc}
      />
      <GlintButton onClick={handleSave}>Save</GlintButton>
      <p className={styles.updated}>
        Updated: {new Date(flag.$updatedAt).toLocaleDateString()}
      </p>
    </div>
  );
}
