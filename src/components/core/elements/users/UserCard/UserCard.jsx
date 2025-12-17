import React, { useContext, useEffect, useState } from "react";
import "./UserCard.css";
import { databases } from "../../../../../services/appwrite";
import Spinner from "../../Spinner";
import { Auth } from "../../../../../contexts/auth";
import Button from "../../inputs/buttons/Button/Button";

export default function UserCard({overwrite, children }) {
  const [user, setUser] = useState();
  const [relation, setRelation] = useState(0);
  const {user: usr, userData} = useContext(Auth);

  useEffect(() => {
    const getUser = async () => {
      if (overwrite){
        setUser(overwrite);
        return;
      }
      if (children == usr.$id) {
        setUser(userData);
        setRelation(8);
        return;
      }
      setUser(null);
      const res = await databases.getDocument("main", "users", children);
      setUser(res);
      const res2 = await databases.getDocument("social", "relations", usr.$id + res.$id) || null;
      setRelation(res2?.type || "0")
    };

    getUser();
  }, [overwrite, children]);

  // if (!user) {
  //   return (
  //     <div className='user-card'>
  //       <Spinner />
  //      </div>
  //   )
  // };

  return (
    <div className={`user-card-container ${!user && "loading"}`} style={
      user?.banner_gradient
      ? {
          background: `linear-gradient(${JSON.parse(
            user.banner_gradient
          ).join(", ")})`,
        }
      : {}
      }>
      <div
      className='user-card'
      >
        <div
          className='user-card-banner'
          style={
            user?.banner_gradient
              ? {
                  background: `linear-gradient(${JSON.parse(
                    user.banner_gradient
                  ).join(", ")})`,
                }
              : {}
          }
        />
        <div className='user-card-avatar-wrapper'>
          <img
            className='user-card-avatar'
            src={user?.avatar}
            alt={user?.username}
          />
        </div>

        <div className='user-card-info'>
          <div
            className={`user-card-names ${
              user?.display && user.display !== user.username
                ? "display"
                : "username"
            }`}
          >
            <h3>
              {(user?.display && user.display !== user.username
                ? user.display
                : user?.username) || "Loading"}
            </h3>
            {user?.display && user.display !== user.username && (
              <p>{user?.username || "Loading"}</p>
            )}
          </div>

          <div className='user-card-buttons'>
            <Button>Friends</Button>
          </div>

          {user?.bio && (
            <div className='user-card-bio'>
              <p>{user.bio}</p>
            </div>
          )}

          <div className='user-card-stats'>
            <h4>Joined</h4>
            <p>
              {new Date(user?.$createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
