import React, { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

import styles from "./TopLevelNav.module.css";
import { FaArrowRightToBracket, FaHouse } from "react-icons/fa6";
import { Auth } from "../../../../contexts/auth";
import UserSmallCard from "../../../../components/core/elements/users/UserSmallCard/UserSmallCard";
import Button from "../../../../components/core/elements/inputs/buttons/Button/Button";

export default function TopLevelNav({ tab }) {
  const { logout, userData } = useContext(Auth);
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.user_card}>
        <UserSmallCard disableClick overwrite={userData} />
      </div>
      <div className={styles.tab_name}>
        <p>
          {tab ? tab[0].toUpperCase() + tab.slice(1) : "Account Management"}
        </p>
      </div>
      <div className={styles.actions}>
        <Button
          onClick={logout}
          leading={<FaArrowRightToBracket />}
          style="danger"
        >
          Logout
        </Button>
        <Button onClick={() => navigate("/")} leading={<FaHouse />}>
          Home
        </Button>
      </div>
    </div>
  );
}
