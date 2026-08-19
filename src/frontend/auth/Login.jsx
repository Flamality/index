import React, { useContext, useState } from "react";
import { Auth } from "../../contexts/auth";
import { Link, useLocation } from "react-router-dom";
import GlintButton from "../../components/core/elements/inputs/buttons/GlintButton/GlintButton";

import styles from "./Auth.module.css";
import TextField from "../../components/core/elements/inputs/TextField";

export default function Login() {
  const { login } = useContext(Auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    } else if (password.length > 128) {
      setPasswordError("Password must be less than 128 characters.");
      return;
    }
    try {
      const res = await login(email, password);

      window.location.reload();
    } catch (error) {
      if (error.type === "user_more_factors_required") {
        window.location.href = "/auth/mfa";
        return;
      } else if (error.type === "user_invalid_credentials") {
        setPasswordError("Invalid email or password.");
      } else if (error.type === "user_session_already_exists") {
        setPasswordError("A session for this user already exists.");
        window.location.href = "/account";
      } else {
        setPasswordError("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link to="/" className="auth-screen-title">
            Flamality
          </Link>
          <h1>Login</h1>
          <p>Please log in to continue.</p>
          <form>
            <TextField
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              errorMessage={emailError}
              fullLength
            />
            <TextField
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!passwordError}
              errorMessage={passwordError}
              fullLength
            />
            <GlintButton type="submit" onClick={handleLogin} fullLength>
              Login
            </GlintButton>
          </form>
          <p className="auth-screen-form-footer">
            Don't have an account?{" "}
            <a href={`/auth/register${location.search}`}>Register here</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
