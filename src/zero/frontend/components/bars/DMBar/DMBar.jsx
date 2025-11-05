import React, { useContext, useEffect, useState } from 'react';

import "./DMBar.css"
import DMButton from './DMButton/DMButton';
import { databases } from '../../../../../services/appwrite';
import { Query } from 'appwrite';
import { Auth } from '../../../../../contexts/auth';
import { Current } from '../../../../contexts/current';

export default function DMBar() {
  const {user} = useContext(Auth);
  const [dms, setDms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentChannel } = useContext(Current);

  useEffect(() => {
    const getDms = async () => {
      const res = await databases.listDocuments("social", "directmessages", [
        Query.contains("users", user.$id)
      ])
      setDms(res.documents);
      setLoading(false); 
    }
    getDms();
  },[])
  return (
    <div className='app-bar-dms'>
      <p className='app-bar-dms-header'>Messages</p>
      <div className='app-bar-dms-container'>
        {dms?.map((dm) => (
          <DMButton key={dm.$id} dm={dm} />
        ))}
      </div>
    </div>
  );
}
