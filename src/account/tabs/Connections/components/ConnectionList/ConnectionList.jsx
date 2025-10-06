import React, { useContext } from "react";

import "./ConnectionList.css";
import { Auth } from "../../../../../contexts/auth";

export default function ConnectionList() {
  const { connections } = useContext(Auth);
  return (
    <div className='account-tab-connections-connectionlist'>
      {connections?.map((connection) => (
        <div>
          <h3>{connection.app}</h3>
          <h4>{connection.name}</h4>
          <div></div>
        </div>
      ))}
    </div>
  );
}
