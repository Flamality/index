import React from "react";
import { account } from "../../../../../../services/appwrite";
import { FaXmark } from "react-icons/fa6";
import("./SessionCard.css");

export default function SessionCard({ data, current }) {
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const s = diff / 1000,
      m = s / 60,
      h = m / 60,
      d = h / 24;
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    if (Math.abs(d) >= 1) return rtf.format(-Math.floor(d), "day");
    if (Math.abs(h) >= 1) return rtf.format(-Math.floor(h), "hour");
    if (Math.abs(m) >= 1) return rtf.format(-Math.floor(m), "minute");
    return rtf.format(-Math.floor(s), "second");
  };
  const closeSession = () => {
    if (!current) {
      account.deleteSession(data.$id);
    }
  };
  return (
    <div
      className={`account-tab-security-sessions-card ${
        current ? "current" : ""
      }`}
    >
      <div className='account-tab-security-sessions-card-info'>
        <p className='account-tab-security-sessions-card-title'>
          {data.osName} | {data.countryName} ({data.clientType})
        </p>
        <p className='account-tab-security-sessions-card-ip'>{data.ip}</p>
        <p className='account-tab-security-sessions-card-time'>
          {getRelativeTime(data.$updatedAt)}
        </p>
      </div>

      {!current && (
        <p
          className='account-tab-security-sessions-card-cancel'
          onClick={closeSession}
        >
          <FaXmark />
        </p>
      )}
    </div>
  );
}
