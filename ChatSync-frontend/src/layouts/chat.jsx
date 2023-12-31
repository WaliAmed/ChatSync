import { useState } from "react";
import { ChatBar } from "../components/chatBar";
import { Button } from "../components/button";
import SideBar from "./sideBar";
import { MessagePill } from "../components/messagePill";
import { useScreenResolution } from "../hook/useScreenResolution";
import { faBurger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserPill } from "../components/userPill";
import { useUserContext } from "../provider/userDataProvider";
import { receiveMessage } from "../lib/socketHelper";

function Chat() {
  const { screenWidth } = useScreenResolution();
  const { socketData, selectedRoom, messages, setMessages } = useUserContext();

  const containerWidth = screenWidth >= 768 ? "calc(100% - 288px)" : "100%";

  const [open, setOpen] = useState(false);

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("overlay")) {
      setOpen(false);
    }
  };

  receiveMessage(messages, setMessages, socketData);

  return (
    <div
      className="bg-slate-200 px-6 py-4 relative h-screen max-h-screen flex justify-between flex-col md:block"
      style={{ width: containerWidth }}
    >
      <div>
        <div className="block md:hidden mb-6">
          <Button
            handleClick={() => setOpen(true)}
            title=""
            Icon={<FontAwesomeIcon icon={faBurger} />}
            className={"rounded-full w-10 px-1 h-10"}
          />

          {open && (
            <div
              onClick={handleOverlayClick}
              className={`fixed top-0 left-0 z-20 w-full h-full transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0 pointer-events-none"
              } backdrop-filter backdrop-blur-lg bg-black bg-opacity-50 overlay`}
            >
              <SideBar />
            </div>
          )}
        </div>

        {selectedRoom !== null && (
          <>
            <div className="bg-slate-300 p-3 rounded w-full mb-8">
              <div
                className="w-full"
                title={"Logged In from " + selectedRoom.city}
              >
                <UserPill
                  onlineStatus
                  username={selectedRoom.userName}
                  location={"Logged In from " + selectedRoom.city}
                />
              </div>
            </div>

            {messages.length > 0 &&
              messages
                .filter(
                  (message) =>
                    message.ids.includes(socketData.id) &&
                    message.ids.includes(selectedRoom.id)
                )
                .map((message, index) => (
                  <div key={index}>
                    {message.messages.map((msg, msgIndex) => (
                      <MessagePill
                        key={msgIndex}
                        username={msg.senderName}
                        message={msg.messageText}
                        time="10:00PM"
                      />
                    ))}
                  </div>
                ))}
          </>
        )}
      </div>

      {selectedRoom !== null && (
        <div className="md:absolute bottom-6 md:w-[95%]">
          <ChatBar />
        </div>
      )}

      {selectedRoom === null && (
        <div className="h-full flex justify-center items-center">
          <p className="font-semibold blink">
            Select an online user or join a room to start chatting!
          </p>
        </div>
      )}
    </div>
  );
}

export default Chat;
