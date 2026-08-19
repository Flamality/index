import React from "react";

import styles from "./ManageUser.module.css";
import User from "../../../../../components/ui/NavBar/components/User/User";
import UserCard from "../../../../../components/core/elements/users/UserCard/UserCard";
import { FaXmark } from "react-icons/fa6";

export default function ManageUser({ user, close }) {
  return (
    <div className={styles.container}>
      <div onClick={close} className={styles.closeButton}>
        <FaXmark />
      </div>
      <div className={styles.userCard}>
        <UserCard overwrite={user} />
      </div>
      <div className={styles.manage}>
        <div className={styles.actionButtons}></div>
        <div className={styles.details}></div>
      </div>
    </div>
  );
}
