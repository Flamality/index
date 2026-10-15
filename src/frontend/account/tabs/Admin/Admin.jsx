import React, { useContext, useState } from "react";
import { Auth } from "../../../../contexts/auth";
import RichTextField from "../../../../components/core/elements/inputs/RichTextField";
import styles from "./Admin.module.css";
import { execute, presences } from "../../../../services/appwrite";
import GlintButton from "../../../../components/core/elements/inputs/buttons/GlintButton/GlintButton";
import { Link } from "react-router-dom";
import { Query } from "appwrite";
import ColorPicker from "../../../../components/core/elements/inputs/colors/ColorPicker";
import { Layers } from "../../../../contexts/layers";
import {
  DropDown,
  DropDownItem,
} from "../../../../components/core/elements/inputs/dropdown/DropDown";
import Button from "../../../../components/core/elements/inputs/buttons/Button/Button";
import ButtonGroup from "../../../../components/core/elements/inputs/buttons/ButtonGroup/ButtonGroup";
import { Quests } from "../../../../contexts/quests";

export default function Data() {
  const { userData, user, updUserData, dataDiff, loading, connections } =
    useContext(Auth);
  const { grantQuest, quests, logout } = useContext(Quests);
  const { showModal } = useContext(Layers);
  const [funcId, setFuncId] = useState("interaction");
  const [funcPath, setFuncPath] = useState("");
  const [funcData, setFuncData] = useState("");
  const [funcRes, setFuncRes] = useState({});
  const [color, setColor] = useState("ffffff");
  const [presence, setPresence] = useState(null);

  const [dropdownValue, setDropdownValue] = useState();

  const fetchPresence = async () => {
    try {
      const res = await presences.list([Query.equal("userId", [user.$id])]);
      setPresence(res);
    } catch (error) {
      setPresence({
        error: "Failed to fetch presence",
        message: error.message,
      });
    }
  };

  const sendFunc = async () => {
    let data = {};
    if (funcData) {
      try {
        data = JSON.parse(funcData);
      } catch (e) {
        setFuncRes({ error: "Invalid JSON in data field", message: e.message });
        return;
      }
    }
    setFuncRes({ loading: true });
    const res = await execute(funcId, funcPath, data);
    setFuncRes(res);
  };
  return (
    <div className="account-tab-data account-tab">
      <Link to="/admin">
        <GlintButton>Admin Pannel</GlintButton>
      </Link>
      <p className={styles.header}>Function</p>
      <input placeholder="id" onChange={(e) => setFuncId(e.target.value)} />
      <input placeholder="path" onChange={(e) => setFuncPath(e.target.value)} />
      <input placeholder="data" onChange={(e) => setFuncData(e.target.value)} />
      <ButtonGroup>
        <Button onClick={sendFunc}>Send</Button>
        <Button
          onClick={() => {
            showModal(
              "center",
              <ColorPicker color={color} setColor={setColor} />,
            );
          }}
        >
          Show Modal
        </Button>{" "}
        <DropDown
          title="Dropdown"
          position="bottom"
          selected={dropdownValue}
          onSelect={setDropdownValue}
        >
          <DropDownItem value="item1">
            <p>Item 1</p>
          </DropDownItem>
          <DropDownItem value="item2">
            <p>Item 2</p>
          </DropDownItem>
          <DropDownItem value="item3">
            <p>Item 3</p>
          </DropDownItem>
        </DropDown>
        <Button onClick={fetchPresence}>Fetch Presence</Button>
      </ButtonGroup>

      <pre className={styles.code}>{JSON.stringify(presence, null, 2)}</pre>

      <pre className={styles.code}>{JSON.stringify(funcRes, null, 2)}</pre>

      <RichTextField
        mode="edit"
        textVisibility="hover"
        placeholder="Try @mentions, #hashtags, **bold**, `code`, and :smile:"
        showCount
        showCountMax
      />

      <ButtonGroup>
        {Object.entries(quests)?.map(([key, quest], index) => (
          <Button key={index} onClick={() => grantQuest(key)}>
            Grant {key}
          </Button>
        ))}

        <Button onClick={() => logout()}>Reset</Button>
      </ButtonGroup>
      <pre className={styles.code}>{JSON.stringify(quests, null, 2)}</pre>
      {/* DEBUG DATA */}

      <p className={styles.header}>User</p>
      <pre className={styles.code}>{JSON.stringify(user, null, 2)}</pre>

      <p className={styles.header}>UserData</p>
      <pre className={styles.code}>{JSON.stringify(userData, null, 2)}</pre>

      <p className={styles.header}>Loading</p>
      <pre className={styles.code}>{JSON.stringify(loading, null, 2)}</pre>

      <p className={styles.header}>dataDiff</p>
      <pre className={styles.code}>{JSON.stringify(dataDiff, null, 2)}</pre>

      <p className={styles.header}>updUserData</p>
      <pre className={styles.code}>{JSON.stringify(updUserData, null, 2)}</pre>

      <p className={styles.header}>connections</p>
      <pre className={styles.code}>{JSON.stringify(connections, null, 2)}</pre>
    </div>
  );
}
