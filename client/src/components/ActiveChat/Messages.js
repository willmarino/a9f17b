import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  const sortMessagesDesc = (message1, message2) => {
    if(message1.createdAt > message2.createdAt){
      return 1;
    }else if(message1.createdAt < message2.createdAt){
      return -1;
    }else{
      return 0;
    }
  }

  return (
    <Box>
      {messages.sort(sortMessagesDesc).map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
