import React from "react";

import styles from "./Button.module.css";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../Spinner";
import ToolTip from "../../../overlays/tooltip/ToolTip";

export default function Button({
  leading,
  trailing,
  onClick,
  disabled = false,
  style = "grayscale",
  link,
  loading = false,
  tooltip = "",
  children,
}) {
  const navigate = useNavigate();
  return (
    <ToolTip position="top" content={tooltip}>
      <div
        className={
          styles.button +
          " " +
          styles[style] +
          " " +
          (disabled ? styles.disabled : "") +
          (loading ? styles.loading : "") +
          " " +
          (leading && !children ? styles.iconOnly : "")
        }
        onClick={
          disabled || loading
            ? null
            : () => (link ? navigate(link) : onClick && onClick())
        }
        disabled={disabled}
      >
        {leading && leading}
        <p>{children}</p>
        {trailing && trailing}
        {loading && <Spinner />}
      </div>
    </ToolTip>
  );
}
