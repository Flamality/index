import React, { useEffect, useState } from "react";
import { account } from "../../services/appwrite";

import styles from "./Auth.module.css";
import { FaEnvelope, FaKey, FaPhone } from "react-icons/fa6";
import TextField from "../../components/core/elements/inputs/TextField";
import Button from "../../components/core/elements/inputs/buttons/Button/Button";

export default function MFA() {
  const [factors, setFactors] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [code, setCode] = useState("");
  useEffect(() => {
    account
      .listMFAFactors()
      .then((response) => {
        setFactors(response);
      })
      .catch((error) => {
        console.error("Failed to fetch MFA factors:", error);
      });
  }, [account]);
  const createFactor = (factor) => {
    account
      .createMFAChallenge(factor)
      .then((response) => {
        setChallenge(response.$id);
        console.log("MFA challenge created:", response);
      })
      .catch((error) => {
        console.error("Failed to create MFA challenge:", error);
      });
  };
  const submitCode = () => {
    account
      .updateMFAChallenge({
        challengeId: challenge,
        otp: code,
      })
      .then((response) => {
        console.log("MFA challenge updated:", response);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Failed to update MFA challenge:", error);
      });
  };
  return (
    <div className={styles.page_wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Verify Your Account</h1>
          <p>Please select one of your MFA factors to verify your identity.</p>

          {challenge ? (
            <div>
              <p>Enter your MFA Code:</p>
              <TextField
                placeholder="MFA Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button onClick={submitCode}>Submit</Button>
            </div>
          ) : (
            <div className={styles.factors}>
              {factors?.email && (
                <div
                  className={styles.factor}
                  onClick={() => createFactor("email")}
                >
                  <FaEnvelope />
                  <p className={styles.factor_label}>Email</p>
                  <p className={styles.factor_description}>
                    Send a code to your email
                  </p>
                </div>
              )}
              {factors?.totp && (
                <div
                  className={styles.factor}
                  onClick={() => createFactor("totp")}
                >
                  <FaPhone />
                  <p className={styles.factor_label}>Authenticator App</p>
                  <p className={styles.factor_description}>
                    Use your authenticator app to verify your identity
                  </p>
                </div>
              )}
              {factors?.recoveryCode && (
                <div
                  className={styles.factor}
                  onClick={() => createFactor("recoveryCode")}
                >
                  <FaKey />
                  <p className={styles.factor_label}>Backup Code</p>
                  <p className={styles.factor_description}>
                    Use a backup code to verify your identity
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
