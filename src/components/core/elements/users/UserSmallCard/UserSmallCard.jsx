import React, { useContext, useEffect, useState } from 'react'

import "./UserSmallCard.css"
import { databases } from '../../../../../services/appwrite';
import UserCard from '../UserCard/UserCard';
import { Layers } from '../../../../../contexts/layers';

export default function UserSmallCard({children}) {
  const [user, setUser] = useState(null);
  const {showModal} = useContext(Layers)

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
    <div className='user-component-small-card'>
      <div
  className='user-component-small-card-background-color'
  style={{
    background: `linear-gradient(${JSON.parse(user?.banner_gradient || '[]').join(', ')})`
  }}
  onClick={(e)=>{showModal([e.clientX,e.clientY], <UserCard>{user?.$id}</UserCard>)}}
/>

      <img src={user?.avatar} alt={user?.name} />
      <div className='user-component-small-card-content'>
        <div className='user-component-small-card-content-display'>{user?.display || user?.username || "loading"}</div>
    </div>
    </div>
  )
}
