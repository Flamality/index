import React, { useContext } from "react";
import Button from "../../../inputs/buttons/Button/Button";
import { Layers } from "../../../../../../contexts/layers";

import styles from "./ConfirmationModal.module.css";

export default function ConfirmationModal({
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  const { hideModal } = useContext(Layers);

  const onConfirmClick = () => {
    onConfirm();
    hideModal();
  };
  const onCancelClick = () => {
    onCancel();
    hideModal();
  };
  return (
    <div className={styles.modal}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.actions}>
        <Button onClick={onCancelClick}>{cancelText}</Button>
        <Button onClick={onConfirmClick} style="danger">
          {confirmText}
        </Button>
      </div>
    </div>
  );
}
