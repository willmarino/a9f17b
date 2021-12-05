import React from "react";
import { Box, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 30,
    height: 20,
    backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  empty: {
    width: 30,
    height: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
  }
}));

const UnreadMessageCounter = (props) => {
  const classes = useStyles();
  const { conversation, otherUser } = props;
  const { messages } = conversation;

  // Same as in Messages component, has constant, not linear, time complexity
  let numUnreadMessages = 0;
  if(messages.length !== 0){
    for(let i = messages.length - 1; i >= 0; i--){
      const curMessage = messages[i];
      if(curMessage.readByReceiver && (curMessage.senderId === otherUser.id)){
        break;
      }else if(!curMessage.readByReceiver && (curMessage.senderId === otherUser.id)){
        numUnreadMessages += 1;
      }
    }
  }

  if(numUnreadMessages === 0){
    return(
      <Box className={classes.empty}></Box>
    );
  }else{
    return(
      <Box className={classes.root}>
        <Typography className={classes.text}>{numUnreadMessages}</Typography>
      </Box>
    );
  }
}

export default UnreadMessageCounter;