import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Messages from "./Messages/Messages";
import NewMessageInput from "./NewMessageInput";
// import { getDirectChatHistory } from "../../realtimeCommunication/socketConnection";
import { useSelector } from "react-redux";
import { getDirectChatHistory } from "../../realtimeCommunication/socketConnection";
// ("../../realtimeCommunication/socketConnection");
const Wrapper = styled("div")({
  flexGrow: 1,
});

const MessengerContent = ({ chosenChatDetails }) => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(chosenChatDetails);
  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  );
};

export default MessengerContent;
