const Conversation = require("../../models/conversation");
const serverStore = require("../../serverStore");

const updateChatHistory = async (
  conversationId,
  toSpecifiedSocketId = null
) => {
  const conversation = await Conversation.findById(conversationId).populate({
    path: "messages",
    model: "Message",
    populate: {
      path: "author",
      model: "Userauth",
      select: "name _id",
    },
  });

  if (conversation) {
    const io = serverStore.getSocketServerInstance();
    if (toSpecifiedSocketId) {
      // initial update of chat history
      console.log(conversation);

      return io.to(toSpecifiedSocketId).emit("direct-chat-history", {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    }

    // check if users of this conversation are online
    // if yes emit to them update of messages

    conversation.participants.forEach((_id) => {
      console.log(_id);
      const activeConnections = serverStore.getActiveConnections(
        _id.toString()
      );
      console.log(activeConnections);
      activeConnections.forEach((socketId) => {
        // console.log(socketId);
        io.to(socketId).emit("direct-chat-history", {
          messages: conversation.messages,
          participants: conversation.participants,
        });
      });
    });
  }
};

module.exports = { updateChatHistory };
