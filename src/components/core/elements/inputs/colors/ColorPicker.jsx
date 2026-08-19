import { useEffect, useRef, useState } from "react";
import styles from "./ColorPicker.module.css";
import ButtonGroup from "../buttons/ButtonGroup/ButtonGroup";
import Button from "../buttons/Button/Button";

const presets = [""];

const clamp = (num, min, max) => Math.min(max, Math.max(min, num));

function hexToHSL(hex) {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  const hue = Math.round(h * 360);
  const saturation = Math.round(s * 100);
  const lightness = Math.round(l * 100);

  return [hue, saturation, lightness];
}

const hslToHex = (h, s, l) => {
  const sat = s / 100;
  const lig = l / 100;

  const c = (1 - Math.abs(2 * lig - 1)) * sat;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lig - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h >= 0 && h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (v) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export default function ColorPicker({
  color = "ff0000",
  setColor,
  button1 = "",
  button1Action = () => {},
  button2 = "",
  button2Action = () => {},
}) {
  const inputHSL = hexToHSL(color);
  const [hue, setHue] = useState(inputHSL[0]);
  const [saturation, setSaturation] = useState(inputHSL[1]);
  const [lightness, setLightness] = useState(inputHSL[2]);
  const [sliderPercent, setSliderPercent] = useState(100);
  const initTopLightness = 100 - (inputHSL[1] / 100) * 50;
  const initY =
    initTopLightness > 0 ? (1 - inputHSL[2] / initTopLightness) * 100 : 0;
  const [canvasPercent, setCanvasPercent] = useState({
    x: inputHSL[1],
    y: initY,
  });
  const [result, setResult] = useState(
    `hsl(${hue}, ${saturation}%, ${lightness}%)`,
  );
  const [hex, setHex] = useState(color);

  const canvas = useRef(null);

  // useEffect(() => {
  //     if (hue < 0) {
  //         setHue(0);
  //         setSliderPercent(0);
  //     } else if (hue > 360) {
  //         setHue(360);
  //         setSliderPercent(100);
  //     }
  // }, [sliderPercent])

  useEffect(() => {
    if (saturation < 0) {
      setSaturation(0);
      setCanvasPercent({ ...canvasPercent, x: 0 });
    } else if (saturation > 100) {
      setSaturation(100);
      setCanvasPercent({ ...canvasPercent, x: 100 });
    }
    if (lightness < 0) {
      setLightness(0);
      setCanvasPercent({ ...canvasPercent, y: 100 });
    } else if (lightness > 100) {
      setLightness(100);
      setCanvasPercent({ ...canvasPercent, y: 0 });
    }
    if (hue < 0) {
      setHue(0);
      setSliderPercent(0);
    } else if (hue > 360) {
      setHue(360);
      setSliderPercent(100);
    }
    setResult(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    setHex(hslToHex(hue, saturation, lightness));
    setColor(hslToHex(hue, saturation, lightness));

    setSliderPercent((hue / 360) * 100);
  }, [hue, lightness, saturation]);

  const onHexChange = (e) => {
    const value = e.target.value
      .trim()
      .replace(/[^0-9A-Fa-f]/g, "")
      .slice(0, 6);
    setHex(value);
    if (/^([0-9A-Fa-f]{6})$/i.test(value)) {
      const r = parseInt(value.slice(0, 2), 16) / 255;
      const g = parseInt(value.slice(2, 4), 16) / 255;
      const b = parseInt(value.slice(4, 6), 16) / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = 0,
        s = 0;
      const l = (max + min) / 2;

      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h *= 60;
      }

      const newS = s * 100;
      const newL = l * 100;
      const topLightness = 100 - (newS / 100) * 50;
      const cursorY = topLightness > 0 ? (1 - newL / topLightness) * 100 : 0;

      setHue(h);
      setSaturation(newS);
      setLightness(newL);
      setCanvasPercent({ x: newS, y: cursorY });
    }
  };

  const onSliderClick = (e) => {
    try {
      const slider = e.currentTarget;
      const rect = slider.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const hue = (x / rect.width) * 360;
      setHue(clamp(hue, 0, 360));
    } catch (error) {
      console.error("Error occurred while handling slider click:", error);
    }
  };

  const onSliderDown = (e) => {
    const slider = e.currentTarget;
    const onMouseMove = (moveEvent) => {
      const rect = slider.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const hue = (x / rect.width) * 360;
      setHue(clamp(hue, 0, 360));
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const onCanvasClick = (e) => {
    try {
      const canvas = e.currentTarget;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const saturation = (x / rect.width) * 100;
      const topLightness = 100 - (x / rect.width) * 50;
      const lightness = topLightness * (1 - y / rect.height);
      console.log(`Saturation: ${saturation}, Lightness: ${lightness}`);
      setSaturation(saturation);
      setLightness(lightness);
      setCanvasPercent({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    } catch (error) {
      console.error("Error occurred while handling canvas click:", error);
    }
  };

  const onCanvasDown = (e) => {
    const canvas = e.currentTarget;
    const onMouseMove = (moveEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const y = moveEvent.clientY - rect.top;
      let newX = x;
      let newY = y;
      if (y < 0) {
        newY = 0;
      } else if (y > rect.height) {
        newY = rect.height;
      }
      if (x < 0) {
        newX = 0;
      } else if (x > rect.width) {
        newX = rect.width;
      }
      const saturation = (newX / rect.width) * 100;
      const topLightness = 100 - (newX / rect.width) * 50;
      const lightness = topLightness * (1 - newY / rect.height);
      setSaturation(saturation);
      setLightness(lightness);
      setCanvasPercent({
        x: (newX / rect.width) * 100,
        y: (newY / rect.height) * 100,
      });
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.container}
        ref={canvas}
        onClick={onCanvasClick}
        onMouseDown={onCanvasDown}
        style={{ background: `hsl(${hue}, 100%, 50%)` }}
      >
        <div className={styles.overlay}></div>
        <div
          className={styles.cursor}
          style={{ left: `${canvasPercent.x}%`, top: `${canvasPercent.y}%` }}
        ></div>
      </div>
      <div className={styles.sliderContainer}>
        <div
          className={styles.slider}
          onClick={onSliderClick}
          onMouseDown={onSliderDown}
        >
          <div
            className={styles.sliderCursor}
            style={{ left: `${sliderPercent}%` }}
          ></div>
        </div>
      </div>
      <div className={styles.result} style={{ background: result }}></div>
      <div className={styles.hex}>
        <p>#</p>
        <input type="text" value={hex} onChange={onHexChange} />
      </div>
      <ButtonGroup>
        {button1 && (
          <Button className={styles.button} onClick={button1Action}>
            {button1}
          </Button>
        )}
        {button2 && (
          <Button
            className={styles.button}
            style="danger"
            onClick={button2Action}
          >
            {button2}
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
}
