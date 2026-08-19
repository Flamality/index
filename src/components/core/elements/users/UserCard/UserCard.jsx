import React, { useContext, useEffect, useState } from "react";
import "./UserCard.css";
import { databases, execute } from "../../../../../services/appwrite";
import Spinner from "../../Spinner";
import { Auth } from "../../../../../contexts/auth";
import Button from "../../inputs/buttons/Button/Button";
import { refreshUser, useUser } from "../../../../../contexts/cache";
import UserAvatar from "../UserAvatar/UserAvatar";
import {
  FaClock,
  FaPaintbrush,
  FaPersonCircleCheck,
  FaPersonCircleMinus,
  FaPersonCirclePlus,
  FaPersonCircleXmark,
} from "react-icons/fa6";
import ButtonGroup from "../../inputs/buttons/ButtonGroup/ButtonGroup";
import RichText from "../../inputs/RichText";
import Badge from "./components/Badge";

export default function UserCard({ overwrite = false, children }) {
  // const [user, setUser] = useState();
  const { user: usr, userData } = useContext(Auth);

  const [loadingFriend, setLoadingFriend] = useState(false);

  const sendUpdate = async (id, type) => {
    try {
      setLoadingFriend(true);
      const res = await execute("interaction", `/friend/${type}`, { id });
      setLoadingFriend(false);
      if (res.success) {
        refreshUser(id);
      }
    } catch (error) {
      setLoadingFriend(false);
    }
  };

  const data = useUser(children);
  const user = overwrite || data;
  return (
    <div
      className={`user-card-container ${!user ? "loading" : ""}`}
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
    >
      <div className="user-card">
        {!user?.banner ? (
          <div
            className="user-card-banner"
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
          />
        ) : (
          <img className="user-card-banner" src={user?.banner} />
        )}
        <div className="user-card-avatar-wrapper">
          <UserAvatar userData={user} showStatus={true} size="large" />
        </div>

        <div className="user-card-info">
          <div
            className={`user-card-names ${
              user?.display && user?.display !== user?.username
                ? "display"
                : "username"
            }`}
          >
            <div className="user-card-names-inner">
              <h3>
                {(user?.display && user?.display !== user?.username
                  ? user.display
                  : user?.username) || "Loading"}
              </h3>
              <div className="user-card-badges">
                {user?.badges?.sort().map((badge, index) => (
                  <Badge key={index} badge={badge} />
                ))}
              </div>
            </div>
            {user?.display && user?.display !== user?.username && (
              <p>{user?.username || "Loading"}</p>
            )}
          </div>

          <div className="user-card-buttons">
            <ButtonGroup>
              {user?.relation === 0 && (
                <Button
                  onClick={() => sendUpdate(user?.id, "add")}
                  leading={<FaPersonCirclePlus />}
                  loading={loadingFriend}
                >
                  Send Friend Request
                </Button>
              )}
              {user?.relation === 2 && (
                <Button
                  onClick={() => sendUpdate(user?.id, "add")}
                  leading={<FaPersonCircleCheck />}
                  loading={loadingFriend}
                  tooltip="Accept Friend Request"
                >
                  Accept Request
                </Button>
              )}
              {user?.relation === 2 && (
                <Button
                  onClick={() => sendUpdate(user?.id, "remove")}
                  leading={<FaPersonCircleMinus />}
                  loading={loadingFriend}
                  tooltip="Decline Friend Request"
                ></Button>
              )}
              {user?.relation === 1 && (
                <Button
                  onClick={() => sendUpdate(user?.id, "remove")}
                  leading={<FaPersonCircleMinus />}
                  loading={loadingFriend}
                  tooltip="Cancel Friend Request"
                ></Button>
              )}
              {user?.relation === 3 && (
                <Button
                  onClick={() => sendUpdate(user?.id, "remove")}
                  leading={<FaPersonCircleXmark />}
                  loading={loadingFriend}
                >
                  Remove Friend
                </Button>
              )}
              {user?.id === usr?.$id && (
                <Button leading={<FaPaintbrush />} link="/account/profile">
                  Edit Profile
                </Button>
              )}
            </ButtonGroup>
          </div>

          {user?.bio && (
            <div className="user-card-bio">
              <RichText>{user.bio}</RichText>
              {/* <p>{user.bio}</p> */}
            </div>
          )}

          <div className="user-card-stats">
            {user?.timezone && (
              <div>
                <FaClock />
                <p>
                  {new Date().toLocaleTimeString("en-US", {
                    timeZone: user.timezone,
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
            <div>
              <p>
                Joined{" "}
                {new Date(user?.joined).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
