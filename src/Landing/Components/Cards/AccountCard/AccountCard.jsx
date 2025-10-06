import React from "react";
import { Link } from "react-router-dom";
import "./AccountCard.css";
import { Auth } from "../../../../contexts/auth";
export default function AccountCard() {
  const { user, loading, userData } = React.useContext(Auth);

  return (
    <div className='account-card'>
      <div className='account-card-content'>
        <h2 className='account-card-title'>
          My <span className='highlight'>Flamality</span> Account
        </h2>

        {loading ? (
          <p className='account-loading'>Loading...</p>
        ) : user ? (
          <div className='account-user'>
            <img src={userData?.avatar} alt='Avatar' />
            <p>Hey, {userData?.display || userData?.username}!</p>
            <Link to='/account'>
              <button>Manage Account</button>
            </Link>
          </div>
        ) : (
          <div className='account-guest'>
            <p>Looks like you&apos;re not logged in.</p>
            <Link to='/account'>
              <button>Log In or Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
