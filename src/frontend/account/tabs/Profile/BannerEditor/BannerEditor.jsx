import React, { useContext, useEffect, useState } from "react";

import "./BannerEditor.css";
import { FaPaintBrush } from "react-icons/fa";
import { FaPlus, FaXmark } from "react-icons/fa6";
import ColorPicker from "../../../../../components/core/elements/inputs/colors/ColorPicker";
import { Layers } from "../../../../../contexts/layers";

export default function BannerEditor({ banner_gradient, onChange, style }) {
  const { showModal } = useContext(Layers);
  const parsed = banner_gradient
    ? JSON.parse(banner_gradient)
    : ["135deg", "#746aff", "#4f3eff"];
  const [angle, setAngle] = useState(parsed[0]);
  const [colors, setColors] = useState(parsed.slice(1));
  const [step, setStep] = useState(100 / colors.length);
  const gradientString =
    style === "block"
      ? `linear-gradient(90deg, ${colors
          .map(
            (color, i) =>
              `${color} ${i * (100 / colors.length)}%, ${color} ${
                (i + 1) * (100 / colors.length)
              }%`,
          )
          .join(", ")})`
      : `linear-gradient(90deg, ${colors.join(", ")})`;

  useEffect(() => {
    if (!banner_gradient) return;
    const parsed = JSON.parse(banner_gradient);
    setAngle(parsed[0]);
    setColors(parsed.slice(1));
  }, [banner_gradient]);

  const updateFromIndex = (index, value) => {
    if (index === 0) {
      updateAngle(value);
    } else {
      updateColor(index - 1, value);
    }
  };

  const updateColor = (index, value) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
    onChange(JSON.stringify([angle, ...newColors]));
  };

  const addColor = () => {
    const newColors = [...colors, "#ffffff"];
    setColors(newColors);
    onChange(JSON.stringify([angle, ...newColors]));
  };

  const removeColor = (index) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
    onChange(JSON.stringify([angle, ...newColors]));
  };

  const updateAngle = (value) => {
    setAngle(value + "deg");
    onChange(JSON.stringify([value + "deg", ...colors]));
  };

  return (
    <div
      className="account-profile-banner-editor"
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <label>
        Direction: {angle}
        <input
          type="range"
          min={0}
          max={360}
          value={parseInt(angle)}
          onChange={(e) => updateAngle(e.target.value)}
        />
      </label>
      <div
        className="banner-editor-colormap"
        style={{
          background: gradientString,
        }}
      >
        {colors.length < 5 && (
          <div
            className="insert-color-edge"
            onClick={() => {
              const newColors = ["#555555", ...colors];
              setColors(newColors);
              onChange(JSON.stringify([angle, ...newColors]));
            }}
          >
            <FaPlus />
          </div>
        )}

        {colors.map((color, i) => (
          <React.Fragment key={i}>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <div
                className="color-circle"
                style={{ backgroundColor: color }}
                onClick={(e) => {
                  const rect = e.target.getBoundingClientRect();
                  const top = rect.top + rect.height / 2 - 5;
                  const left = rect.left + rect.width / 2 - 30;
                  showModal(
                    [left, top],
                    <ColorPicker
                      color={color.replace("#", "")}
                      setColor={(newColor) => updateColor(i, "#" + newColor)}
                      button1="Confirm"
                      button2="Remove"
                    />,
                  );
                }}
              >
                {/* <input
                  type="color"
                  value={color}
                  onChange={(e) => updateColor(i, e.target.value)}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer",
                  }}
                /> */}
              </div>
              <FaPaintBrush />
              <FaXmark
                className="remove-color"
                onClick={() => removeColor(i)}
              />
            </div>

            {colors.length < 5 && i < colors.length - 1 && (
              <div
                className="insert-color"
                onClick={() => {
                  const newColors = [...colors];
                  newColors.splice(i + 1, 0, "#555555");
                  setColors(newColors);
                  onChange(JSON.stringify([angle, ...newColors]));
                }}
              >
                <FaPlus />
              </div>
            )}
          </React.Fragment>
        ))}

        {colors.length < 5 && (
          <div
            className="insert-color-edge"
            onClick={() => {
              const newColors = [...colors, "#555555"];
              setColors(newColors);
              onChange(JSON.stringify([angle, ...newColors]));
            }}
          >
            <FaPlus />
          </div>
        )}
      </div>
    </div>
  );
}
