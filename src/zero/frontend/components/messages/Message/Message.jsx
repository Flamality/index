import React, { useContext, useEffect, useState } from 'react'

import "./Message.css"
import { databases } from '../../../../../services/appwrite';
import UserCard from '../../../../../components/core/elements/users/UserCard/UserCard';
import { Layers } from '../../../../../contexts/layers';

export default function Message({message}) {
    const [author, setAuthor] = useState(null);
    const {showModal} = useContext(Layers)

    useEffect(() => {
        const getAuthor = async () => {
            const res = await databases.getDocument("main", "users", message?.author);
            setAuthor(res);
        }
        if (message?.author) {
            getAuthor()
        }
    }, [message])

    // Function to format epoch timestamp
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return ''; // Handle null or undefined timestamp

        const messageDate = new Date(timestamp); // Convert seconds to milliseconds
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const options = { month: 'long', day: 'numeric' };
        const fullOptions = { month: 'long', day: 'numeric', year: 'numeric' };

        const hours = messageDate.getHours().toString().padStart(2, '0');
        const minutes = messageDate.getMinutes().toString().padStart(2, '0');
        const timePart = `at ${hours}:${minutes}`;

        if (messageDate.toLocaleDateString() === today.toLocaleDateString()) {
            return `Today ${timePart}`;
        } else if (messageDate.toLocaleDateString() === yesterday.toLocaleDateString()) {
            return `Yesterday ${timePart}`;
        } else if (messageDate.getFullYear() === new Date().getFullYear()) {
            return `${messageDate.toLocaleDateString('en-US', options)} ${timePart}`;
        } else {
            return `${messageDate.toLocaleDateString('en-US', fullOptions)} ${timePart}`;
        }
    };

 return (
 <div className='message'>
 <div className='message-meta'>
 <img src={author?.avatar} onClick={(e)=>{showModal([e.clientX,e.clientY], <UserCard>{message?.author}</UserCard>)}} />
        </div>
        <div className='message-content'>
 <p className='message-content-author' onClick={(e)=>{showModal([e.clientX,e.clientY], <UserCard>{message?.author}</UserCard>)}}>{author?.display || message?.author} <span className="message-timestamp">{formatTimestamp(message?.$createdAt)}</span></p>
 <p className='message-content-content'>{message?.content}</p>
        </div>
        </div>
  )
}
