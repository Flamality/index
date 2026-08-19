import React, { useContext, useState } from "react";
import { Auth } from "../../contexts/auth";
import { Link, useLocation } from "react-router-dom";
import { Query } from "appwrite";
import { databases, registerUser } from "../../services/appwrite";
import {
  checkConfirmPassword,
  checkEmail,
  checkPassword,
  checkUsername,
} from "../../services/test";
import { FaXmark } from "react-icons/fa6";
import TextField from "../../components/core/elements/inputs/TextField";
import GlintButton from "../../components/core/elements/inputs/buttons/GlintButton/GlintButton";

import styles from "./Auth.module.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [confirmError, setConfirmError] = useState(null);

  const [emailLoading, setEmailLoading] = useState(false);
  const [usernameLoading, setUsernameLoading] = useState(false);

  const location = useLocation();

  const handleSignup = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setUsernameError(null);
    setConfirmError(null);
    var error = false;
    const temail = await checkEmail(email, setEmailError);
    const tusername = await checkUsername(username, setUsernameError);
    const tpassword = await checkPassword(password, setPasswordError);
    const tconfirm = checkConfirmPassword(password, confirm, setConfirmError);
    if (!temail) return;
    if (!tusername) return;
    if (!tpassword) return;
    if (!tconfirm) return;
    registerUser(email, password, username);
  };

  const UsernameChange = async (e) => {
    const newUsername = e.target.value.toLowerCase();
    setUsername(newUsername);
    setUsernameLoading(true);
    await checkUsername(newUsername, setUsernameError);
    setUsernameLoading(false);
  };

  const EmailChange = async (e) => {
    const newEmail = e.target.value.toLowerCase();
    setEmail(newEmail);
    setEmailLoading(true);
    await checkEmail(newEmail, setEmailError);
    setEmailLoading(false);
  };

  const PasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPassword(newPassword, setPasswordError);
  };

  const ConfirmChange = (e) => {
    const newConfirm = e.target.value;
    setConfirm(newConfirm);
    checkConfirmPassword(password, newConfirm, setConfirmError);
  };

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link to="/" className="auth-screen-title">
            Flamality
          </Link>

          <h1>Register</h1>
          <p>Create a new account!</p>
          <form>
            <TextField
              onChange={EmailChange}
              value={email}
              placeholder="Email"
              type="email"
              error={!!emailError}
              loading={emailLoading}
              success={!emailError && email.length > 0 && !emailLoading}
              errorMessage={emailError}
              fullLength
            />
            <TextField
              onChange={UsernameChange}
              value={username}
              placeholder="Username"
              maxLength={32}
              fullLength
              error={!!usernameError}
              loading={usernameLoading}
              success={
                !usernameError && username.length > 0 && !usernameLoading
              }
              errorMessage={usernameError}
            />
            <TextField
              onChange={PasswordChange}
              type="password"
              placeholder="Password"
              value={password}
              maxLength={128}
              fullLength
              error={!!passwordError}
              success={!passwordError && password.length > 0}
              errorMessage={passwordError}
            />
            <TextField
              onChange={ConfirmChange}
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              fullLength
              maxLength={128}
              error={!!confirmError}
              success={
                !confirmError && confirm.length > 0 && confirm === password
              }
              errorMessage={confirmError}
            />
            <GlintButton type="submit" onClick={handleSignup} fullLength>
              Register
            </GlintButton>
          </form>
          <p className="auth-screen-form-footer">
            Already have an account?{" "}
            <a href={`/auth/login${location.search}`}>Login here</a>.
          </p>
          <div className="auth-screen-decor" />
        </div>
      </div>
    </div>
  );
}
