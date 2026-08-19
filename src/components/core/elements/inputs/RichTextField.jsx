import { useLayoutEffect, useRef, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { VscLoading } from "react-icons/vsc";

import RichText from "./RichText";
import "./RichText.css";

const modeAliases = {
  display: "preview",
  text: "edit",
  view: "preview",
};

const supportedModes = new Set(["edit", "preview", "split"]);

export default function RichTextField({
  value,
  initial = "",
  onChange = () => {},
  onValueChange = () => {},
  placeholder = "Type here",
  maxLength = 1000,
  minLength = 0,
  showCount = false,
  showCountMax = false,
  disabled = false,
  loading = false,
  error = false,
  success = false,
  errorMessage = "",
  leading = null,
  mode = "edit",
  textVisibility = "always",
  minRows = 3,
  autoGrow = true,
  plainPreview = false,
  fullLength = false,
  className = "",
}) {
  const [localValue, setLocalValue] = useState(initial);
  const [isHovering, setIsHovering] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);
  const isControlled = value !== undefined;
  const text = String((isControlled ? value : localValue) ?? "");
  const resolvedMode = modeAliases[mode] || mode;
  const safeMode = supportedModes.has(resolvedMode) ? resolvedMode : "edit";
  const normalizedMode = disabled && safeMode === "edit" ? "preview" : safeMode;
  const visibility = textVisibility === "hover" ? "hover" : "always";
  const revealOnHover = normalizedMode === "edit" && visibility === "hover";
  const showEditor =
    normalizedMode === "split" ||
    (normalizedMode === "edit" &&
      (visibility === "always" || isHovering || isFocused));
  const showPreview =
    normalizedMode === "preview" ||
    normalizedMode === "split" ||
    (revealOnHover && !showEditor);

  useLayoutEffect(() => {
    if (!autoGrow || !textareaRef.current || !showEditor) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [autoGrow, showEditor, text]);

  const handleChange = (event) => {
    const nextValue = event.target.value;

    if (!isControlled) setLocalValue(nextValue);

    onChange(event);
    onValueChange(nextValue, event);
  };

  const rootClasses = [
    "core-element-rich-text-field",
    `core-element-rich-text-field-${normalizedMode}`,
    revealOnHover ? "core-element-rich-text-field-hover-reveal" : "",
    error || loading || success
      ? "core-element-rich-text-field-with-symbol"
      : "",
    leading ? "core-element-rich-text-field-with-leading" : "",
    errorMessage ? "core-element-rich-text-field-with-error-message" : "",
    disabled ? "core-element-rich-text-field-disabled" : "",
    className,
    fullLength ? "core-element-rich-text-field-full-length" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={rootClasses}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {leading && (
        <div className="core-element-rich-text-field-leading">{leading}</div>
      )}

      {showPreview && (
        <div className="core-element-rich-text-field-preview">
          {text ? (
            <RichText value={text} unstyled={plainPreview} />
          ) : (
            <p className="core-element-rich-text-field-placeholder">
              {placeholder}
            </p>
          )}
        </div>
      )}

      {showEditor && (
        <textarea
          ref={textareaRef}
          className={`core-element-rich-text-field-editor ${fullLength ? "core-element-rich-text-field-full-length" : ""}`}
          placeholder={placeholder}
          value={text}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled || loading}
          rows={minRows}
          maxLength={maxLength}
          minLength={minLength}
          spellCheck={false}
        />
      )}

      {loading ? (
        <VscLoading className="core-element-rich-text-field-loading" />
      ) : error ? (
        <FaXmark className="core-element-rich-text-field-x" />
      ) : success ? (
        <FaCheck className="core-element-rich-text-field-check" />
      ) : null}

      {showCount && (
        <div className="core-element-rich-text-field-count">
          {text.length}
          {showCountMax ? ` / ${maxLength}` : ""}
        </div>
      )}

      <div
        className={`core-element-rich-text-field-error-message ${
          errorMessage
            ? ""
            : "core-element-rich-text-field-error-message-hidden"
        }`}
      >
        {errorMessage && error && errorMessage}
      </div>
    </div>
  );
}
