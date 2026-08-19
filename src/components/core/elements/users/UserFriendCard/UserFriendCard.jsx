import React, { useContext, useEffect, useState } from "react";
import { databases, execute } from "../../../../../services/appwrite";

import "./UserFriendCard.css";
import { Auth } from "../../../../../contexts/auth";
import { refreshUser, useUser } from "../../../../../contexts/cache";
import UserSmallCard from "../UserSmallCard/UserSmallCard";
import Button from "../../inputs/buttons/Button/Button";
import { FaPersonCircleCheck, FaPersonCircleXmark } from "react-icons/fa6";
import ToolTip from "../../overlays/tooltip/ToolTip";

export default function UserFriendCard({ children }) {
  const [type, setType] = useState(0);
  const { user: currentUsr } = useContext(Auth);

  const [loadingFriend, setLoadingFriend] = useState(false);
  const user = useUser(children);

  useEffect(() => {
    const type = user?.relation || 0;
    setType(type);
  }, [user]);

  const sendUpdate = async (id, type) => {
    try {
      const res = await execute("interaction", `/friend/${type}`, { id });
      if (res.success) {
        refreshUser(id);
      }
    } catch (error) {}
  };

  return (
    <div className="user-friend-card">
      <UserSmallCard>{children}</UserSmallCard>
      <div className="user-friend-card-actions">
        {type === 2 && (
          <ToolTip content="Accept Friend Request">
            <div
              className="user-friend-card-action-accept"
              onClick={() => sendUpdate(user?.id, "add")}
            >
              <FaPersonCircleCheck />
            </div>
          </ToolTip>
        )}
        {type === 1 || type === 2 ? (
          <ToolTip
            content={
              type === 1 ? "Decline Friend Request" : "Cancel Friend Request"
            }
          >
            <div
              className="user-friend-card-action-deny"
              onClick={() => sendUpdate(user?.id, "remove")}
            >
              <FaPersonCircleXmark />
            </div>
          </ToolTip>
        ) : null}
      </div>
    </div>
  );
}
