import PropTypes from "prop-types";
import { Toaster } from "sonner";
import { createContext, useContext, useState } from "react";
import Login from "../layouts/login";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [socketData, setSocketData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const contextValue = {
    isLogin,
    setIsLogin,
    user,
    setUser,
    socketData,
    setSocketData,
    onlineUsers,
    setOnlineUsers,
    selectedRoom,
    setSelectedRoom,
    messages,
    setMessages,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <Toaster position="top-right" />
      {!isLogin ? <Login /> : socketData === null ? "Loading..." : children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
