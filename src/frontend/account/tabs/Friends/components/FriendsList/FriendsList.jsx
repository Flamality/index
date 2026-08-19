import React, { useContext, useEffect, useState } from "react";
import SectionSubtitle from "../../../../components/SectionSubtitle/SectionSubtitle";
import { databases } from "../../../../../../services/appwrite";
import { Query } from "appwrite";
import { Auth } from "../../../../../../contexts/auth";
import UserFriendCard from "../../../../../../components/core/elements/users/UserFriendCard/UserFriendCard";

import "./FriendsList.css";
import UserSmallCard from "../../../../../../components/core/elements/users/UserSmallCard/UserSmallCard";
import { Layers } from "../../../../../../contexts/layers";
import TabGroup from "../../../../../../components/core/elements/inputs/tabs/TabGroup/TabGroup";
import Tab from "../../../../../../components/core/elements/inputs/tabs/Tab/Tab";
import { useFriends } from "../../../../../../contexts/cache";

export default function FriendsList() {
  const [tab, setTab] = useState(0);
  const { user } = useContext(Auth);

  const friends = useFriends(3);
  const sentRequests = useFriends(1);
  const recFriendRequests = useFriends(2);
  console.log("friends", friends);

  return (
    <div className="account-tab-friends-friendslist">
      <div className="account-tab-friends-friendslist-tabs">
        <TabGroup onChange={setTab} value={tab}>
          <Tab>Friends</Tab>
          <Tab
            label={recFriendRequests.length > 0 ? recFriendRequests.length : ""}
          >
            Pending
          </Tab>
        </TabGroup>
        {/* <button onClick={()=>{setTab(true)}} className={tab ? "active" : ""}>Friends List</button>
        <button onClick={()=>{setTab(false)}} className={tab ? "" : "active"}>Pending{recFriendRequests.length > 0 && <div>{recFriendRequests.length}</div>}</button> */}
      </div>
      {tab == 0 ? (
        <>
          <SectionSubtitle>My Friends</SectionSubtitle>
          <div className="account-tab-friends-list">
            {friends?.map((friend, index) => (
              <UserSmallCard key={index}>{friend.target}</UserSmallCard>
            ))}
          </div>

          {friends.length < 1 && (
            <div>
              <p className="friend-lonely-msg">
                You must be lonely, go make some friends.
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          {recFriendRequests.length > 0 && (
            <>
              <SectionSubtitle>Incoming</SectionSubtitle>
              <div className="account-tab-friends-list">
                {recFriendRequests?.map((friend, index) => (
                  <UserFriendCard key={index}>{friend.target}</UserFriendCard>
                ))}
              </div>
            </>
          )}
          {sentRequests.length > 0 && (
            <>
              <SectionSubtitle>Outgoing</SectionSubtitle>
              <div className="account-tab-friends-list">
                {sentRequests?.map((friend, index) => (
                  <UserFriendCard key={index}>{friend.target}</UserFriendCard>
                ))}
              </div>
            </>
          )}

          {recFriendRequests.length < 1 && sentRequests.length < 1 && (
            <div>
              <p className="friend-lonely-msg">
                You have no pending friend requests {":("}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
