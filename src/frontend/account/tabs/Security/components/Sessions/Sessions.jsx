import React from "react";
import SessionCard from "./SessionCard/SessionCard";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import SectionSubtitle from "../../../../components/SectionSubtitle/SectionSubtitle";
import("./Sessions.css");

export default function Sessions({ data, current }) {
  const sorted = [...(data || [])]
    .filter((session) => session.$id !== current?.$id)
    .sort((a, b) => new Date(b.$updatedAt) - new Date(a.$updatedAt));

  return (
    <div className='account-tab-security-sessions'>
      <SectionTitle>Sessions</SectionTitle>
      {data?.length > 1 ? (
        <>
          {current && (
            <>
              <SectionSubtitle>Current Session</SectionSubtitle>
              <SessionCard current={true} data={current} />
            </>
          )}
          <SectionSubtitle>Other Sessions</SectionSubtitle>
          
          {sorted.length ? (
            <div className="account-tab-security-sessions-other">
            {sorted.map((i) => (
              <SessionCard current={false} key={i.$id} data={i} />
            ))}</div>
          ) : (
            <p>No other sessions</p>
          )}
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
