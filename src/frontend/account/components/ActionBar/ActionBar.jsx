import React, { useContext, useState } from "react";
import "./ActionBar.css";
import {
  FaChevronDown,
  FaChevronUp,
  FaTriangleExclamation,
} from "react-icons/fa6";
import ChangeList from "./ChangeList/ChangeList";
import { Auth } from "../../../contexts/auth";
export default function ActionBar() {
  const [showChanges, setShowChanges] = useState(false);
  const { saveChanges, dataDiff } = useContext(Auth);
  return (
    <div className={`account-actionbar ${dataDiff.length > 0}`}>
      <div className='account-actionbar-warning'>
        <FaTriangleExclamation />
        <p className='account-actionbar-text'>You have unsaved changes</p>
      </div>

      <div className='account-actionbar-buttons'>
        {showChanges ? <ChangeList /> : <></>}
        <div
          onClick={() => {
            setShowChanges(!showChanges);
          }}
          className='account-actionbar-show-changes'
        >
          {showChanges ? <FaChevronDown /> : <FaChevronUp />}
        </div>
        <button onClick={saveChanges}>Save</button>
      </div>
    </div>
  );
}
