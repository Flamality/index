import React, { useEffect, useState } from 'react'
import { databases } from '../../../../../services/appwrite';

import "./UserFriendCard.css"

export default function UserFriendCard({children}) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            setUser(null);
            console.log(children)
            const res = await databases.getDocument("main", "users", children)
            setUser(res);
        }
        getUser()
    },[children])
  return (
    <div className='user-friend-card'><p>{user?.display || "Loading"}</p><p>
      {user?.username || "Loading"}</p></div>
  )
}
