
import React, { useEffect, useState } from 'react'
import { databases } from '../../../../../services/appwrite';
import { Query } from 'appwrite';
import Message from '../Message/Message';

import "./ChannelContainer.css"

export default function ChannelContainer({channel}) {
    const [messages, setMessages] = useState([]);
    const [noChannel, setNoChannel] = useState(false);
    useEffect(() => {
        if (!channel){
            setNoChannel(true);
            return;
        }else{
            setNoChannel(false);
        }
        const getMessages = async () => {
            setMessages([]);
            const res = await databases.listDocuments("social", "messages", [
                Query.equal("parent", channel),
                Query.orderDesc("timestamp")
            ])
            setMessages(res.documents);
        }
        getMessages();
    },[channel])
  return (
    <div className='channel-container'>
        <div className='channel-container-messages-container'>
            {messages?.map(message => <Message message={message} />)}
        </div>
        <input type='text' />
    </div>
  )
}

