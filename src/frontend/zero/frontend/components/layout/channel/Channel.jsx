import React from "react";
import { useParams } from "react-router-dom";
import { useMessages } from "../../../../../../contexts/cache";
import TextField from "../../../../../../components/core/elements/inputs/TextField";
import Button from "../../../../../../components/core/elements/inputs/buttons/Button/Button";
import { execute } from "../../../../../../services/appwrite";

export default function Channel({ dm }) {
  const { id } = useParams();
  const [message, setMessage] = React.useState("");
  const messages = useMessages(id);
  const send = async () => {
    try {
      const res = await execute("interaction", "/message/send", {
        dm: id,
        content: message,
        parent: id,
        server: false,
      });
      if (res.success) {
        setMessage("");
      }
    } catch (e) {
      
    }
  }

  return (
    <div>
      {messages.map((message) => (
        <div key={message.$id}>
          <p>{message.content}</p>
        </div>
      ))}
      <div>
        <TextField placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
          <Button onClick={send}>Send</Button>``
      </div>
    </div>
  );
}