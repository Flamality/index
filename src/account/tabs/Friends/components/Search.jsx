import React, { useContext, useEffect, useState } from 'react'
import { databases } from '../../../../services/appwrite';
import { Query } from 'appwrite';

import "./Search.css"
import { Auth } from '../../../../contexts/auth';
import { Notifications } from '../../../../contexts/notifications';


// TYPE 0 -> no relation
// TYPE 1 -> sent friend request
// TYPE 2 -> receiving friend request
// TYPE 3 -> friends
export default function Search() {
    const [res, setRes] = useState([]);
    const [input, setInput] = useState("");
    const {user} = useContext(Auth)
    const { createNotification } = useContext(Notifications)
    const [focused, setFocused] = useState(true);
    useEffect(() => {
        if (input === "") {
            setRes([]);
            return;
        }
    
        const atTheTime = input;
    
        let active = true; // cancel async if input changes
    
        databases.listDocuments("main", "users", [
            Query.or([
                Query.contains("display", input),
                Query.contains("username", input)
            ]),
            Query.limit(5),
        ])
        .then((response) => {
            if (!active || atTheTime !== input) return;
            const temp = [];
            response.documents.forEach((doc) => {
                if (doc.$id === user.$id) return;
                databases.listDocuments("social", "relations", [
                    Query.equal("UID", user.$id),
                    Query.equal("target", doc.$id)
                ]).then((relationResponse) => {
                    temp.push({
                        ...doc,
                        relationType: relationResponse.documents.length > 0 ? relationResponse.documents[0].type : "0",
                    });
                    if (temp.length === response.documents.filter(d => d.$id !== user.$id).length) {
                        setRes(temp);
                    }
                });
            });
        })
        .catch(console.log);
    
        return () => { active = false }; // cancel on cleanup
    }, [input]);
    
    useEffect(() => {
        if (input == "") {
            setRes([])
            return
        }
    },[input])
    
    const addFriend = async (usr) => {
        search("")
        if (usr.relationType == 2) {
            await databases.updateDocument("social", "relations", usr.$id + user.$id, 
                {type: 3}
            )
            await databases.updateDocument("social", "relations", user.$id + usr.$id, 
                {type: 3}
            )
            createNotification("success", "Friend Request Accepted", "Your friend request has been accepted")
            return
        } else if (usr.relationType == 1) {
            createNotification("warning", "Friend Request Sent", "Your friend request has already been sent")
            return
        } else {
            try {
                await databases.upsertDocument("social", "relations", user.$id + usr.$id, 
                    {UID: user.$id, target: usr.$id, type: 1}
                )
                await databases.upsertDocument("social", "relations", usr.$id + user.$id, 
                    {UID: usr.$id, target: user.$id, type: 2}
                )
                createNotification("success", "Friend Request Sent", "Your friend request has been sent")
            } catch (error) {
                createNotification("warning", "Error occurred", error.message)
            }
        }
        
        
    }
    const search = async (e) => {
        setInput(e?.target?.value || "")
    }
  return (
    <div className='account-tab-friends-search'>
        <input 
        value={input}
        onChange={(e) => {setInput(e.target.value); search(e)}}
        placeholder='Search for friends'
        
        />
        <div className='account-tab-friends-search-results'>
        {
            focused && res.map((usr) => 
                (
                    <div key={usr.$id} className='account-tab-friends-search-result'>
                        <img src={usr.avatar} />
                        <div>
                        <p className='display'>{usr.display || usr.username}</p>
                        <p className='username'>{usr.username}</p>
                        </div>
                        {usr.$id === user.$id ? (
                            <button disabled>This is you</button>
                        ) : (
                            usr?.relationType == 1 ? (
                                <button disabled>Friend Request Sent</button>
                            ) : (
                                usr?.relationType == 2 ? (
                                    <button onClick={()=>{addFriend(usr)}}>Accept Friend Request</button>
                                ) : (
                                    usr?.relationType == 3 ? (
                                        <button disabled>Friends</button>
                                    ) : (
                                        <button onClick={()=>{addFriend(usr)}}>Add Friend</button>
                                    )
                                )
                            )
                        )}
                        {/* <p>{usr?.relationType || "0"}</p> */}
                        {/* <p>{usr?.$id}</p> */}
                    </div>
                ) 
            )
        }
        </div>
    </div>
  )
}
