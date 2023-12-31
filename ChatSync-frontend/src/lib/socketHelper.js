import io from "socket.io-client";

export const connectSocket = (user, setSocketData) => {
  const socket = io("http://localhost:3000");
  socket.on("connect", () => {
    setSocketData(socket);

    socket.emit("user-info", { ...user, id: socket.id });
  });
};

export const sendMessage = ({
  message,
  room,
  messages,
  setMessages,
  socket,
  senderId,
}) => {
  socket.emit("send-message", message, room, senderId);

  let messageFound = false;
  let updatedMessages = messages.map((existingMessage) => {
    if (
      existingMessage.ids.includes(senderId) &&
      existingMessage.ids.includes(room)
    ) {
      messageFound = true;
      return {
        ...existingMessage,
        messages: [...(existingMessage.messages || []), message],
      };
    }
    return existingMessage;
  });

  if (!messageFound) {
    updatedMessages.push({
      ids: [room, senderId],
      messages: [message],
    });
  }

  setMessages(updatedMessages);
};

export const receiveMessage = (messages, setMessages, socket) => {
  socket.on("receive-message", (message, room, senderId) => {
    let messageFound = false;
    let updatedMessages = messages.map((existingMessage) => {
      if (
        existingMessage.ids.includes(senderId) &&
        existingMessage.ids.includes(room)
      ) {
        messageFound = true;
        return {
          ...existingMessage,
          messages: [...(existingMessage.messages || []), message],
        };
      }
      return existingMessage;
    });

    if (!messageFound) {
      updatedMessages.push({
        ids: [room, senderId],
        messages: [message],
      });
    }

    setMessages(updatedMessages);
  });
};

export const getOnlineUsers = (setOnlineUsers, socket) => {
  socket.on("online-users", (users) => {
    setOnlineUsers(users);
  });
};
