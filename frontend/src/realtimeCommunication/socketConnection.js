import io from "socket.io-client";
import {
  setPendingFriendsInvitations,
  setFriends,
  setOnlineUsers,
} from "../store/actions/friendsActions";
import { store } from "../store/store";
import { UpdateDirectChatHistoryIfActive } from "../shared/utils/chat";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
let socket = null;
// const SocketComponent = () => {
//   const { userInfo } = useSelector((state) => state.auth);
//   const [socket, setSocket] = useState(null);
// const [pendingInvitations, setPendingInvitations] = useState([]);
// const [friends, setFriends] = useState([]);
// const [onlineUsers, setOnlineUsers] = useState([]);
// useEffect(() => {
export const connectWithSocketServer = (userInfo) => {
  const jwtToken = userInfo.token;
  console.log(jwtToken);
  socket = io("http://localhost:4000/", {
    auth: {
      token: jwtToken,
    },
  });
  console.log(socket);
  socket.on("connect", () => {
    console.log("succesfully connected with socket.io server");
    console.log(socket.id);
  });

  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;
    store.dispatch(setFriends(friends));
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    store.dispatch(setOnlineUsers(onlineUsers));
  });

  socket.on("direct-chat-history", (data) => {
    console.log(data);
    UpdateDirectChatHistoryIfActive(data);
  });
};
// }, [userInfo]);
// connectWithSocketServer();
export const sendDirectMessage = (data) => {
  if (socket) {
    console.log(data);
    socket.emit("direct-message", data);
  }
};

export const getDirectChatHistory = (data) => {
  if (socket) {
    console.log(data);
    socket.emit("direct-chat-history", data);
  }
};
// };
// export default {
//   connectWithSocketServer,
//   sendDirectMessage,
//   getDirectChatHistory,
// };
