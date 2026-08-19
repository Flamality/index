import React, { useContext } from "react";
import { Auth } from "../../../../contexts/auth";
import "./ChangeList.css";
import { FaArrowRight } from "react-icons/fa6";

export default function ChangeList() {
  const { dataDiff, discardChange } = useContext(Auth);
  return (
    <div className='account-actionbar-changelist'>
      <p>Changes</p>
      {dataDiff?.map((data) => (
        <div className='account-actionbar-changelist-item'>
          <p className='account-actionbar-changelist-item-key'>{data.key}</p>
          <div className='account-actionbar-changelist-item-data'>
            <p className='account-actionbar-changelist-item-old'>
              {data.old || "None"}
            </p>
            <FaArrowRight />
            <p className='account-actionbar-changelist-item-new'>
              {data.new || "None"}
            </p>
          </div>
          <div
            onClick={() => {
              discardChange(data.key);
            }}
            className='account-actionbar-changelist-item-remove'
          >
            <p>Discard change</p>
          </div>
        </div>
      ))}
    </div>
  );
}
