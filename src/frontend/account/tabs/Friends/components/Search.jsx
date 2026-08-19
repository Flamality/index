import React, { useContext, useEffect, useState } from "react";
import { databases, execute } from "../../../../../services/appwrite";
import { Query } from "appwrite";

import "./Search.css";
import { Auth } from "../../../../../contexts/auth";
import { Notifications } from "../../../../../contexts/notifications";
import Button from "../../../../../components/core/elements/inputs/buttons/Button/Button";
import { refreshUser } from "../../../../../contexts/cache";

// TYPE 0 -> no relation
// TYPE 1 -> sent friend request
// TYPE 2 -> receiving friend request
// TYPE 3 -> friends
export default function Search() {
  const [res, setRes] = useState([]);
  const [input, setInput] = useState("");
  const { user } = useContext(Auth);
  const { createNotification } = useContext(Notifications);
  const [focused, setFocused] = useState(true);
  useEffect(() => {
    if (input === "") {
      setRes([]);
      return;
    }

    const atTheTime = input;

    let active = true; // cancel async if input changes

    databases
      .listDocuments("main", "users", [
        Query.or([
          Query.contains("display", input),
          Query.contains("username", input),
        ]),
        Query.limit(5),
      ])
      .then((response) => {
        if (!active || atTheTime !== input) return;
        const temp = [];
        response.documents.forEach((doc) => {
          if (doc.$id === user.$id) return;
          databases
            .listDocuments("social", "relations", [
              Query.equal("UID", user.$id),
              Query.equal("target", doc.$id),
            ])
            .then((relationResponse) => {
              temp.push({
                ...doc,
                relationType:
                  relationResponse.documents.length > 0
                    ? relationResponse.documents[0].type
                    : "0",
              });
              if (
                temp.length ===
                response.documents.filter((d) => d.$id !== user.$id).length
              ) {
                setRes(temp);
              }
            });
        });
      })
      .catch(console.log);

    return () => {
      active = false;
    }; // cancel on cleanup
  }, [input]);

  useEffect(() => {
    if (input == "") {
      setRes([]);
      return;
    }
  }, [input]);

  const addFriend = async (usr) => {
    search("");
    const res = await execute("interaction", "/friend/add", { id: usr.$id });
    if (res.success) {
      createNotification(
        "success",
        "Friend Request Sent",
        `Sent friend request to ${usr.username}`,
      );
      refreshUser(usr.$id);
    } else {
      createNotification(
        "error",
        "Friend Request Failed",
        `Failed to send friend request to ${usr.username}`,
      );
    }
  };
  const search = async (e) => {
    setInput(e?.target?.value || "");
  };
  return (
    <div className="account-tab-friends-search">
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          search(e);
        }}
        placeholder="Search for friends"
      />
      <div className="account-tab-friends-search-results">
        {focused &&
          res.map((usr) => (
            <div key={usr.$id} className="account-tab-friends-search-result">
              <img src={usr.avatar} />
              <div className="small">
                <p className="display">{usr.display || usr.username}</p>
                <p className="username">{usr.username}</p>
              </div>
              {usr.$id === user.$id ? (
                <Button disabled>This is you</Button>
              ) : usr?.relationType == 1 ? (
                <Button disabled>Friend Request Sent</Button>
              ) : usr?.relationType == 2 ? (
                <Button
                  onClick={() => {
                    addFriend(usr);
                  }}
                >
                  Accept Friend Request
                </Button>
              ) : usr?.relationType == 3 ? (
                <Button disabled>Friends</Button>
              ) : (
                <Button
                  onClick={() => {
                    addFriend(usr);
                  }}
                >
                  Add Friend
                </Button>
              )}
              {/* <p>{usr?.relationType || "0"}</p> */}
              {/* <p>{usr?.$id}</p> */}
            </div>
          ))}
      </div>
    </div>
  );
}
