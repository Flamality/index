import React, { useContext, useEffect, useState } from "react";
import { account, execute } from "../../../../services/appwrite";
import Sessions from "./components/Sessions/Sessions";
import PageTitle from "../../components/PageTitle/PageTitle";
import PageContent from "../../components/PageContent/PageContent";
import SettingGroup from "../../components/SettingGroup/SettingGroup";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Button from "../../../../components/core/elements/inputs/buttons/Button/Button";
import TextField from "../../../../components/core/elements/inputs/TextField";
import { checkPassword } from "../../../../services/test";
import SectionSubtitle from "../../components/SectionSubtitle/SectionSubtitle";
import { Auth } from "../../../../contexts/auth";
import Checkbox from "../../../../components/core/elements/inputs/checkbox/Checkbox";
import { Layers } from "../../../../contexts/layers";
import TOTPsetup from "../../../../components/core/elements/Modal/Modals/settings/TOTPsetup";
import { Notifications } from "../../../../contexts/notifications";
import("./Security.css");
export default function Security() {
  const { user } = useContext(Auth);
  const { confirmationModal, showModal } = useContext(Layers);
  const { createNotification } = useContext(Notifications);
  const [sessions, setSessions] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);

  const [factors, setFactors] = useState({});
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [waitingOnEmail, setWaitingOnEmail] = useState(null);
  const [emailCode, setEmailCode] = useState("");

  useEffect(() => {
    const getFactors = async () => {
      const accRes = await account.get();
      console.log("MFA status:", accRes.mfa);
      if (accRes.mfa) {
        setMfaEnabled(true);
        const res = await account.listMFAFactors();
        setFactors(res);
      } else {
        setFactors({});
        setMfaEnabled(false);
      }
    };
    const getSessions = async () => {
      const res = await account.listSessions();
      const res2 = await account.getSession("current");
      setSessions(res.sessions);
      setCurrentSession(res2);
    };
    getFactors();
    getSessions();
  }, []);
  const changePassword = async (e) => {
    const res = await execute("interaction", "/auth/changePassword", {
      oldPassword,
      newPassword,
    });
    if (res.error) {
      createNotification(
        "error",
        "Failed to change password",
        res.error.message,
      );
    } else {
      createNotification(
        "success",
        "Password changed",
        "Your password has been changed successfully.",
      );
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };
  const PasswordChange = (e) => {
    setNewPassword(e.target.value);
    const error = checkPassword(e.target.value, setPasswordError);
  };

  const toggleEmailMFA = async () => {
    console.log(factors);
    if (factors?.email) {
      await account.deleteMFAAuthenticator("email");
    } else {
      const challenge = await account.createMFAChallenge("email");
      console.log(challenge);
      setWaitingOnEmail(challenge.$id);
      setEmailCode("");
    }
    const res = await account.listMFAFactors();
    setFactors(res.factors);
  };

  const OnMFAConfirm = async () => {
    const res2 = await account.updateMFA({ mfa: true });
    setMfaEnabled(res2.mfa);
    const backupCodes = await account.updateMFARecoveryCodes();
    confirmationModal(
      "Backup Codes",
      `Your backup codes are:\n\n${backupCodes.recoveryCodes.join("\n")}\n\nMake sure to save these codes in a safe place, as they will not be shown again. Sharing these codes with anyone is not recommended as they can be used to access your account if you lose access to your other MFA factors.`,
      () => {},
      () => {},
      "OK",
      "Close",
    );
    const res3 = await account.listMFAFactors();
    setFactors(res3.factors);
    createNotification(
      "success",
      "MFA Enabled",
      "Multi-factor authentication has been enabled on your account.",
    );
  };

  const onDisableMFAConfirm = async () => {
    const res2 = await account.updateMFA({ mfa: false });
    setMfaEnabled(res2.mfa);
    const res = await account.listMFAFactors();
    setFactors(res.factors);
    createNotification(
      "success",
      "MFA Disabled",
      "Multi-factor authentication has been disabled on your account.",
    );
  };

  const toggleMFA = async () => {
    const ifUsingMFA = await account.get();
    setMfaEnabled(ifUsingMFA.mfa);
    if (ifUsingMFA.mfa) {
      confirmationModal(
        "Disable MFA",
        "Are you sure you want to disable MFA? This will make your account less secure and is not recommended.",
        onDisableMFAConfirm,
        () => {},
      );
    } else {
      confirmationModal(
        "Enable MFA",
        "Are you sure you want to enable MFA? You won't be able to access your account unless you set up at least one MFA factor.",
        OnMFAConfirm,
        () => {},
      );
    }
  };

  const onTotpFinish = async () => {
    const res = await account.listMFAFactors();
    setFactors(res.factors);
    createNotification(
      "success",
      "Authenticator MFA Enabled",
      "Authenticator app multi-factor authentication has been enabled on your account.",
    );
  };

  const enableTotp = async () => {
    if (!mfaEnabled) {
      return;
    }
    if (factors?.totp) {
      await account.deleteMFAAuthenticator("totp");
    } else {
      showModal("center", <TOTPsetup onFinished={onTotpFinish} />);
    }
  };

  const confirmBackupCodeRegeneration = async () => {
    // if (factors?.recoveryCode) {
    //   await account.deleteMFAAuthenticator("recoveryCode");
    // }

    const backupCodes = await account.updateMFARecoveryCodes();
    const res = await account.listMFAFactors();
    setFactors(res.factors);
    confirmationModal(
      "Backup Codes Regenerated",
      `Your new backup codes are:\n\n${backupCodes.recoveryCodes.join("\n")}\n\nMake sure to save these codes in a safe place, as they will not be shown again. Sharing these codes with anyone is not recommended as they can be used to access your account if you lose access to your other MFA factors.`,
      () => {
        createNotification(
          "success",
          "Backup Codes Regenerated",
          "Your backup codes have been regenerated successfully.",
        );
      },
      () => {},
      "OK",
      "Close",
    );
  };

  const regenerateBackupCodes = async () => {
    confirmationModal(
      "Regenerate Backup Codes",
      "Are you sure you want to regenerate your backup codes? This will invalidate your current backup codes.",
      confirmBackupCodeRegeneration,
      () => {},
    );
  };

  return (
    <PageContent>
      <SectionTitle>Change Password</SectionTitle>
      <SettingGroup>
        <SectionSubtitle>Current password</SectionSubtitle>
        <TextField
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <SectionSubtitle>New password</SectionSubtitle>
        <TextField
          onChange={PasswordChange}
          type="password"
          placeholder="Password"
          value={newPassword}
          maxLength={128}
          error={!!passwordError}
          success={!passwordError && newPassword.length > 0}
          errorMessage={passwordError}
        />
        <SectionSubtitle>Confirm new password</SectionSubtitle>
        <TextField
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPassword !== newPassword}
          success={
            confirmPassword === newPassword && confirmPassword.length > 0
          }
          errorMessage={
            confirmPassword !== newPassword ? "Passwords do not match" : ""
          }
        />
        <Button
          onClick={changePassword}
          disabled={
            !oldPassword || !newPassword || newPassword !== confirmPassword
          }
        >
          Change Password
        </Button>
      </SettingGroup>
      <SectionTitle>MFA</SectionTitle>

      <Checkbox label="MFA Enabled" value={mfaEnabled} onChange={toggleMFA} />

      <SectionTitle>MFA Factors</SectionTitle>
      <SettingGroup>
        <SectionSubtitle>Email</SectionSubtitle>
        <p>{user.email}</p>
      </SettingGroup>
      <SettingGroup>
        <SectionSubtitle>Authenticator App</SectionSubtitle>
        <Button onClick={enableTotp} disabled={!mfaEnabled}>
          {factors?.totp == true
            ? "Disable Authenticator MFA"
            : "Enable Authenticator MFA"}
        </Button>
      </SettingGroup>

      <SettingGroup>
        <SectionSubtitle>Backup Codes</SectionSubtitle>
        <Button onClick={regenerateBackupCodes} disabled={!mfaEnabled}>
          Regenerate Backup Codes
        </Button>
      </SettingGroup>
      <Sessions data={sessions} current={currentSession} />
    </PageContent>
  );
}
