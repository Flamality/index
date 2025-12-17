import React, { useState } from "react";

import "./BannerEditor.css";
import { FaPaintBrush } from "react-icons/fa";
import { FaPlus, FaXmark } from "react-icons/fa6";

export default function BannerEditor({ banner_gradient, onChange }) {
  const parsed = banner_gradient
    ? JSON.parse(banner_gradient)
    : ["135deg", "#746aff", "#4f3eff"];
  const [angle, setAngle] = useState(parsed[0]);
  const [colors, setColors] = useState(parsed.slice(1));

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
      className='account-profile-banner-editor'
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <label>
        Direction: {angle}
        <input
          type='range'
          min={0}
          max={360}
          value={parseInt(angle)}
          onChange={(e) => updateAngle(e.target.value)}
        />
      </label>
      <div
        className='banner-editor-colormap'
        style={{
          background: `linear-gradient(90deg, ${colors.join(", ")})`,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem",
        }}
      >
        {colors.length < 5 && (
          <div
            className='insert-color-edge'
            onClick={() => {
              const newColors = ["#555", ...colors];
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
              <div className='color-circle' style={{ backgroundColor: color }}>
                <input
                  type='color'
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
                />
              </div>
              <FaPaintBrush />
              <FaXmark
                className='remove-color'
                onClick={() => removeColor(i)}
              />
            </div>

            {colors.length < 5 && i < colors.length - 1 && (
              <div
                className='insert-color'
                onClick={() => {
                  const newColors = [...colors];
                  newColors.splice(i + 1, 0, "#555");
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
            className='insert-color-edge'
            onClick={() => {
              const newColors = [...colors, "#555"];
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
