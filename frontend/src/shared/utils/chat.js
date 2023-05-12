import { store } from "../../store/store";
import { setMessages } from "../../store/actions/chatActions";
import { useDispatch, useSelector } from "react-redux";
export const UpdateDirectChatHistoryIfActive = (data) => {
  // const { userInfo } = useSelector((state) => state.auth);
  // const { receiverInfo } = useSelector((state) => state.chat);
  const receiverId = store.getState().chat.chosenChatDetails?.id;
  const userId = store.getState().auth.userInfo.user._id;
  // console.log(userInfo);
  const { participants, messages } = data;
  console.log(data);
  // find id of user from token and id from active conversation

  // const userId = userInfo.user._id;
  // const receiverId = receiverInfo.chosenChatDetails.id;

  if (receiverId && userId) {
    const usersInCoversation = [receiverId, userId];

    updateChatHistoryIfSameConversationActive({
      participants,
      usersInCoversation,
      messages,
    });
  }
};

const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInCoversation,
  messages,
}) => {
  const result = participants.every(function (participantId) {
    return usersInCoversation.includes(participantId);
  });
  console.log(messages);
  if (result) {
    store.dispatch(setMessages(messages));
  }
};
