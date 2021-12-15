import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  let lastReadMessage = null;
  if(messages.length !== 0){
    for(let i = messages.length - 1; i >= 0; i--){
      const curMessage = messages[i];
      if(curMessage.read && (curMessage.senderId === userId)){
        lastReadMessage = curMessage;
        break;
      }
    }
  }

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        const isLastReadMessage = (lastReadMessage)
          ? (message.id === lastReadMessage.id)
          : false;

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            isLastReadMessage={isLastReadMessage}
            otherUser={otherUser}/>
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
