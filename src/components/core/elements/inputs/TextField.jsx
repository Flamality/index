import React from "react";
import Spinner from "../Spinner";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";

import "./TextField.css";

export default function TextField({
  onChange = () => {},
  value = "",
  type = "text",
  placeholder = "",
  maxLength = 100,
  minLength = 0,
  showCount = false,
  showCountMax = false,
  disabled = false,
  loading = false,
  error = false,
  success = false,
  errorMessage = "",
  leading = null,
  fullLength = false,
  onSubmit = () => {},
}) {
  return (
    <div
      className={`core-element-textfield ${
        error || loading || success ? "core-element-textfield-with-symbol" : ""
      } ${leading ? "core-element-textfield-with-leading" : ""} ${errorMessage ? "core-element-textfield-with-error-message" : ""} ${fullLength ? "core-element-textfield-full-length" : ""}`}
    >
      {leading && (
        <div className="core-element-textfield-leading">{leading}</div>
      )}
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        maxLength={maxLength}
        minLength={minLength}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
          }
        }}
      />
      {loading ? (
        <VscLoading className="core-element-textfield-loading" />
      ) : error ? (
        <FaXmark className="core-element-textfield-x" />
      ) : success ? (
        <FaCheck className="core-element-textfield-check" />
      ) : null}
      {showCount && (
        <div className="core-element-textfield-count">
          {value.length}
          {showCountMax ? ` / ${maxLength}` : ""}
        </div>
      )}
      <div
        className={`core-element-textfield-error-message ${errorMessage ? "" : "core-element-textfield-error-message-hidden"}`}
      >
        {errorMessage && error && errorMessage}
      </div>
    </div>
  );
}
