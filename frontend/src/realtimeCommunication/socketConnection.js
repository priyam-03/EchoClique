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
export const connectWithSocketServer = (userInfo) => {
  const jwtToken = userInfo.token;
  socket = io(
    "http://localhost:4000/",
    {
      auth: {
        token: jwtToken,
      },
    },
    {
      autoConnect: false,
    }
  );
  console.log("called__new user added clientside");
  socket.on("connect", () => {
    console.log("succesfully connected with socket.io server");
    console.log(socket.id);
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
    UpdateDirectChatHistoryIfActive(data);
  });
  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    store.dispatch(setPendingFriendsInvitations(pendingInvitations));
  });
};

export const sendDirectMessage = (data) => {
  if (socket) {
    socket.emit("direct-message", data);
  }
};

export const getDirectChatHistory = (data) => {
  if (socket) {
    socket.emit("direct-chat-history", data);
  }
};

export const disconnect = () => {
  if (socket) {
    socket.disconnect();
  }
};
