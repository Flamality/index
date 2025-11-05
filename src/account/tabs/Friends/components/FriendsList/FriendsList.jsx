import React, { useContext, useEffect, useState } from 'react'
import SectionSubtitle from '../../../../components/SectionSubtitle/SectionSubtitle'
import { databases } from '../../../../../services/appwrite'
import { Query } from 'appwrite'
import { Auth } from '../../../../../contexts/auth'
import UserFriendCard from '../../../../../components/core/elements/users/UserFriendCard/UserFriendCard'

import "./FriendsList.css"
import UserSmallCard from '../../../../../components/core/elements/users/UserSmallCard/UserSmallCard'
import { Layers } from '../../../../../contexts/layers'

export default function FriendsList() {
    const [friends, setFriends] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);
    const [recFriendRequests, setRecFriendRequests] = useState([]);
    const [tab, setTab] = useState(true);
    const {user} = useContext(Auth)
    useEffect(() =>  {
      const getFriends = async () => {
        const res = await databases.listDocuments("social", "relations", [
          Query.equal("UID", user.$id),
          Query.equal("type", 3)
        ])
        setFriends(res?.documents || [])
        const res1 = await databases.listDocuments("social", "relations", [
          Query.equal("UID", user.$id),
          Query.equal("type", 1)
        ])
        setSentRequests(res1?.documents || [])
        const res2 = await databases.listDocuments("social", "relations", [
          Query.equal("UID", user.$id),
          Query.equal("type", 2)
        ])
        setRecFriendRequests(res2?.documents || [])
      }
        getFriends()
    },[user])
  return (
    <div className='account-tab-friends-friendslist'>
      <div className='account-tab-friends-friendslist-tabs'>
        <button onClick={()=>{setTab(true)}} className={tab ? "active" : ""}>Friends List</button>
        <button onClick={()=>{setTab(false)}} className={tab ? "" : "active"}>Pending{recFriendRequests.length > 0 && <div>{recFriendRequests.length}</div>}</button>
        
      </div>
    {tab ? (
      <>
      <SectionSubtitle>My Friends</SectionSubtitle>
      {friends?.map((friend) => (
        <UserSmallCard>{friend.target}</UserSmallCard>
        ))}
        {friends.length < 1 && <div><p className='friend-lonely-msg'>You must be lonely, go make some friends.</p></div>}
      </>
      ) : (
        <>
        {recFriendRequests.length > 0 && (
          <>
            <SectionSubtitle>Incoming</SectionSubtitle>
            {recFriendRequests?.map((friend) => (
            <UserFriendCard>{friend.target}</UserFriendCard>
            ))}
           </>
        )}
        {sentRequests.length > 0 && (
          <>
            <SectionSubtitle>Outgoing</SectionSubtitle>
            {sentRequests?.map((friend) => (
            <UserFriendCard>{friend.target}</UserFriendCard>
            ))}
           </>
        )}
      
      {(recFriendRequests.length < 1 && sentRequests.length < 1) && <div><p className='friend-lonely-msg'>You have no pending friend requests {':('}</p></div>}
    </>
  )}
    </div>
  )
}
