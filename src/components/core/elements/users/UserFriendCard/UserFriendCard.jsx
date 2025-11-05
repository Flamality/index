import React, { useContext, useEffect, useState } from 'react'
import { databases } from '../../../../../services/appwrite';

import "./UserFriendCard.css"
import { Auth } from '../../../../../contexts/auth';

export default function UserFriendCard({children}) {
    const [user, setUser] = useState(null);
    const [type, setType] = useState(0);
    const {user: currentUsr} = useContext(Auth)
    useEffect(() => {
        const getUser = async () => {
            setUser(null);
            console.log(children)
            const res = await databases.getDocument("main", "users", children)
            setUser(res);
            const res2 = await databases.getDocument("social", "relations", currentUsr.$id + children)
            setType(res2?.type || 0)
        }

        getUser()
    },[children])
  return (
    <div className='user-friend-card'><p>{user?.display || "Loading"}</p><p>
      {user?.username || "Loading"}</p></div>
  )
}
