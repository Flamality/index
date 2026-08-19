import React from "react";

import "./UserAvatar.css";

export default function UserAvatar({
  userData,
  showStatus = true,
  size = "medium",
}) {
  return (
    <div className={`user-avatar ${size}`}>
      <img src={userData?.avatar} alt="User avatar" />
      {showStatus && (
        <div
          className={`user-avatar-status ${userData?.presence || "offline"}`}
        />
      )}
    </div>
  );
}
