import React, { useContext, useEffect, useState } from "react";
import { account } from "../../../../../../services/appwrite";
import { Layers } from "../../../../../../contexts/layers";

import styles from "../../modal.module.css";
import Title from "../../builder/Title";
import QRCode from "react-qr-code";
import Button from "../../../inputs/buttons/Button/Button";
import TextField from "../../../inputs/TextField";
import { AuthenticatorType } from "appwrite";
import ButtonGroup from "../../builder/ButtonGroup";

export default function TOTPsetup({ onFinish = () => {} }) {
  const [code, setCode] = useState("");
  const { hideModal } = useContext(Layers);
  const [challenge, setChallenge] = useState(null);
  const [section, setSection] = useState("qr");
  const [error, setError] = useState(null);

  useEffect(() => {
    account
      .createMfaAuthenticator("totp")
      .then((response) => {
        setChallenge(response);
        console.log("MFA challenge created:", response);
      })
      .catch((error) => {
        console.error("Failed to create MFA challenge:", error);
        hideModal();
      });
  }, []);

  const verifyCode = () => {
    account
      .updateMFAAuthenticator(AuthenticatorType.Totp, code)
      .then((response) => {
        console.log("MFA challenge updated:", response);
        onFinish();
        hideModal();
      })
      .catch((error) => {
        console.error("Failed to update MFA challenge:", error);
        setError("Failed to verify code. Please try again.");
      });
  };

  return (
    <div className={styles.main}>
      <Title>Set up Authenticator</Title>
      {section === "qr" && (
        <>
          {challenge ? (
            <QRCode value={challenge?.uri} height={150} width={150} />
          ) : (
            <div className={styles.qr_loading} />
          )}
          <Button onClick={() => setSection("code")}>Continue</Button>
        </>
      )}
      {section === "info" && <></>}
      {section === "code" && (
        <>
          <p>Enter the code from your authenticator app</p>
          <TextField
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            error={!!error}
            errorMessage={error}
          />
          <ButtonGroup>
            <Button onClick={verifyCode}>Verify Code</Button>
            <Button onClick={() => setSection("qr")}>Back to QR Code</Button>
          </ButtonGroup>
        </>
      )}
    </div>
  );
}
