import { useContext, useEffect, useState } from "react";

import styles from "./Design.module.css";
import Button from "../../../../components/core/elements/inputs/buttons/Button/Button";
import GlintButton from "../../../../components/core/elements/inputs/buttons/GlintButton/GlintButton";
import TextField from "../../../../components/core/elements/inputs/TextField";
import TabGroup from "../../../../components/core/elements/inputs/tabs/TabGroup/TabGroup";
import Tab from "../../../../components/core/elements/inputs/tabs/Tab/Tab";
import { Notifications } from "../../../../contexts/notifications";
import { FaUser } from "react-icons/fa6";
import Typography from "./sections/Typography";

export default function Colors() {
  const [colors, setColors] = useState([]);
  const [textFieldValue, setTextFieldValue] = useState("");
  const { createNotification } = useContext(Notifications);

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const result = [];

    for (let i = 0; i < styles.length; i++) {
      const name = styles[i];
      if (name.startsWith("--color-")) {
        const hsl = styles.getPropertyValue(name).trim();

        // Convert to RGB using the browser
        const el = document.createElement("div");
        el.style.color = hsl;
        document.body.appendChild(el);
        const rgb = getComputedStyle(el).color;
        document.body.removeChild(el);

        result.push({ name, hsl, rgb });
      }
    }

    result.sort((a, b) => a.name.localeCompare(b.name));

    setColors(result);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.input_container}>
        <h2>Buttons</h2>
        <Button style="primary">Primary Button</Button>
        <Button style="secondary">Secondary Button</Button>
        <Button style="grayscale">Grayscale Button</Button>
        <Button disabled>Default Button (Disabled)</Button>
        <GlintButton>Glint Button</GlintButton>
        <h2>Text Fields</h2>
        <TextField
          placeholder="Default TextField"
          value={textFieldValue}
          onChange={(e) => setTextFieldValue(e.target.value)}
        />
        <TextField
          placeholder="TextField with leading icon"
          leading={<FaUser />}
          value={textFieldValue}
          onChange={(e) => setTextFieldValue(e.target.value)}
        />
        <TextField
          placeholder="TextField with error"
          value={textFieldValue}
          error
          onChange={(e) => setTextFieldValue(e.target.value)}
        />
        <TextField
          placeholder="TextField loading"
          value={textFieldValue}
          loading
          onChange={(e) => setTextFieldValue(e.target.value)}
        />
        <TextField
          placeholder="TextField success"
          value={textFieldValue}
          success
          onChange={(e) => setTextFieldValue(e.target.value)}
        />
        <TextField
          placeholder="TextField with char count"
          value={textFieldValue}
          showCount
          showCountMax
          maxLength={50}
          onChange={(e) => setTextFieldValue(e.target.value)}
        />
        <h2>Tabs</h2>
        <TabGroup>
          <Tab>Tab1</Tab>
          <Tab>Tab2</Tab>
          <Tab>Tab3</Tab>
        </TabGroup>
        <h2>Notifications</h2>
        <Button
          onClick={() =>
            createNotification("info", "This is an info notification", "desc")
          }
        >
          Info Notification
        </Button>
        <Button
          onClick={() =>
            createNotification(
              "warning",
              "This is a warning notification",
              "desc",
            )
          }
        >
          Warn Notification
        </Button>
        <Button
          onClick={() =>
            createNotification(
              "danger",
              "This is a danger notification",
              "desc",
            )
          }
        >
          Danger Notification
        </Button>
        <Button
          onClick={() =>
            createNotification(
              "success",
              "This is a success notification",
              "desc",
            )
          }
        >
          Success Notification
        </Button>
        <Typography />
        <h2>Misc</h2>
        <p>--space-xxs</p>
        <div
          className={styles.space_display}
          style={{ gap: "var(--space-xxs)" }}
        >
          <div />
          <div />
        </div>
        <p>--space-xs</p>
        <div
          className={styles.space_display}
          style={{ gap: "var(--space-xs)" }}
        >
          <div />
          <div />
        </div>
        <p>--space-sm</p>
        <div
          className={styles.space_display}
          style={{ gap: "var(--space-sm)" }}
        >
          <div />
          <div />
        </div>
        <p>--space-md</p>
        <div
          className={styles.space_display}
          style={{ gap: "var(--space-md)" }}
        >
          <div />
          <div />
        </div>
        <p>--space-lg</p>
        <div
          className={styles.space_display}
          style={{ gap: "var(--space-lg)" }}
        >
          <div />
          <div />
        </div>
        <p>--space-xl</p>
        <div
          className={styles.space_display}
          style={{ gap: "var(--space-xl)" }}
        >
          <div />
          <div />
        </div>
        <p>--space-2xl</p>
        <div
          className={styles.space_display}
          style={{ gap: "var(--space-2xl)" }}
        >
          <div />
          <div />
        </div>
        <p>--space-3xl</p>
        <div
          className={styles.space_display}
          style={{ gap: "var(--space-3xl)" }}
        >
          <div />
          <div />
        </div>
        <p>--radius-sm</p>
        <div
          className={styles.radius}
          style={{ borderRadius: "var(--radius-sm)" }}
        />
        <p>--radius-md</p>
        <div
          className={styles.radius}
          style={{ borderRadius: "var(--radius-md)" }}
        />
        <p>--radius-lg</p>
        <div
          className={styles.radius}
          style={{ borderRadius: "var(--radius-lg)" }}
        />
        <p>--radius-xl</p>
        <div
          className={styles.radius}
          style={{ borderRadius: "var(--radius-xl)" }}
        />
        <p>--radius-full</p>
        <div
          className={styles.radius}
          style={{ borderRadius: "var(--radius-full)" }}
        />
      </div>

      <div className={styles.color_container}>
        <h2>Colors</h2>
        {colors.map(({ name, hsl, rgb }) => (
          <div
            key={name}
            style={{
              marginBottom: "10px",
              padding: "5px",
              borderLeft: `10px solid ${hsl}`,
            }}
          >
            <p className={styles.name}>{name}</p>
            <p className={styles.hsl}>
              HSL<span>{hsl}</span>
            </p>
            <p className={styles.rgb}>
              RGB<span>{rgb}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
