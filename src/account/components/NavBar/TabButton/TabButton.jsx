import React from "react";
import "./TabButton.css";
import { Link, useParams } from "react-router-dom";

export default function TabButton({ text, link, icon }) {
  const { tab } = useParams();
  return (
    <Link
      className={`account-navigation-tabbutton ${
        tab == link || (link == "" && tab == undefined) ? "active" : "inactive"
      }`}
      to={`/account/${link}`}
    >
      {icon}
      <p>{text}</p>
    </Link>
  );
}
