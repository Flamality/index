import React, { useContext, useEffect, useState } from "react";

import "./UserSmallCard.css";
import { databases } from "../../../../../services/appwrite";
import UserCard from "../UserCard/UserCard";
import { Layers } from "../../../../../contexts/layers";
import { useUser } from "../../../../../contexts/cache";
import UserAvatar from "../UserAvatar/UserAvatar";

export default function UserSmallCard({
  overwrite,
  disableClick = false,
  children,
}) {
  const data = useUser(children);
  const user = overwrite || data;
  const { showModal } = useContext(Layers);

  return (
    <div
      className={`user-component-small-card ${disableClick ? "disabled" : ""}`}
    >
      <div
        className="user-component-small-card-background-color"
        style={
          user?.banner_gradient
            ? user?.gradient_style === "gradient"
              ? {
                  background: `linear-gradient(${JSON.parse(
                    user.banner_gradient,
                  ).join(", ")})`,
                }
              : {
                  background: (() => {
                    const gradient = user.banner_gradient
                      ? JSON.parse(user.banner_gradient)
                      : ["90deg", "#555"];

                    const angle = gradient[0];
                    const colors = gradient.slice(1);
                    const step = 100 / colors.length;

                    return `linear-gradient(${angle}, ${colors
                      .map(
                        (color, i) =>
                          `${color} ${i * step}%, ${color} ${(i + 1) * step}%`,
                      )
                      .join(", ")})`;
                  })(),
                }
            : {}
        }
        onClick={(e) => {
          const rect = e.target.getBoundingClientRect();
          const top = rect.top + rect.height / 2 - 50;
          const left = rect.left + rect.width + 10;
          !disableClick &&
            showModal([left, top], <UserCard>{user?.id}</UserCard>);
        }}
      />

      <UserAvatar userData={user} showStatus={true} size="small" />
      {user?.sc_decor && (
        <img
          className="user-component-small-card-decor"
          src={`/images/sc_decor/${user.sc_decor}.png`}
        />
      )}

      <div className="user-component-small-card-content">
        <div className="user-component-small-card-content-display">
          {user?.display || user?.username || "loading"}
        </div>
      </div>
    </div>
  );
}
