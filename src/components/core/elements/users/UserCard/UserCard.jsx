import React from "react";
import "./UserCard.css";

export default function UserCard({ user }) {
  return (
    <div className='user-card'>
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
            {user?.display && user.display !== user.username
              ? user.display
              : user?.username}
          </h3>
          {user?.display && user.display !== user.username && (
            <p>{user?.username}</p>
          )}
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
  );
}
