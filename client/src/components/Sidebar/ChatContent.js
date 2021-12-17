import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  unreadText: {
    fontWeight: "bold",
    color: "black",
  },
  box: {
    width: 30,
    height: 20,
    marginRight: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
  },
  counter: {
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
  },
  numberText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();
  const { conversation, activeConversation } = props;
  const { latestMessageText, otherUser, messages } = conversation;

  const currentlyViewingConversation = Boolean(activeConversation === conversation.otherUser.username);

  let numUnreadMessages = 0;
  if(messages.length !== 0){
    for(let i = messages.length - 1; i >= 0; i--){
      const curMessage = messages[i];
      if(curMessage.senderId === otherUser.id){
        if(curMessage.read){
          break;
        }else{
          numUnreadMessages += 1;
        }
      }
    }
  }

  const noUnreadMessages = Boolean(numUnreadMessages === 0 || currentlyViewingConversation);

  // If there are any unread messages and the conversation is not being viewed currently,
  // display the number of unread messages in a Box
  // Else, display a placeholder box
  let unreadMessageCounter = (noUnreadMessages)
    ? (<Box className={classes.box}></Box>)
    : (<Box className={`${classes.box} ${classes.counter}`}>
        <Typography className={classes.numberText}>{numUnreadMessages}</Typography>
      </Box>);

  const textClassName = (noUnreadMessages)
    ? classes.previewText
    : `${classes.previewText} ${classes.unreadText}`;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={textClassName}>
          {latestMessageText}
        </Typography>
      </Box>
      {unreadMessageCounter}
    </Box>
  );
};

export default ChatContent;
