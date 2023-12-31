import { useState } from "react";
import { sendMessage } from "../lib/socketHelper";
import { useUserContext } from "../provider/userDataProvider";
import { Button } from "./button";

export const ChatBar = () => {
  const { selectedRoom, socketData, messages, setMessages, user } =
    useUserContext();
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText !== "") {
      sendMessage({
        message: {
          messageText,
          senderName: user.userName,
        },
        room: selectedRoom.id,
        messages: messages,
        setMessages: setMessages,
        socket: socketData,
        senderId: socketData.id,
      });

      setMessageText("");
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <div className="block md:flex">
        <input
          placeholder="Enter your message!"
          className="w-full mr-6 rounded p-2 focus:outline-slate-700"
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
        />
        <Button type="submit" title="SEND" className="mt-3 md:mt-0 md:w-20" />
      </div>
    </form>
  );
};
