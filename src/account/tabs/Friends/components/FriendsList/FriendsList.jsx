import React, { useEffect, useState } from 'react'
import SectionSubtitle from '../../../../components/SectionSubtitle/SectionSubtitle'

export default function FriendsList() {
    const [friends, setFriends] = useState([])
    useEffect(() =>  {
        
    },[])
  return (
    <div className='account-tab-friends-friendslist'>
        <SectionSubtitle>My Friends</SectionSubtitle>
    </div>
  )
}
