import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { readMessages } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column"
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user, readMessages } = props;
  const conversation = props.conversation || {};

  // When conversation object changes:
  // Check for presence of conversation.messages to ensure conversation has been fetched
  // Iterate through messages, select the ones which were not sent or read by the current user
  // If any exist, send them to the backend and then update redux state
  useEffect( () => {
    if(conversation.messages){
      const unreadMessageIds = conversation.messages
        .filter(msg => (!msg.readByReceiver && msg.senderId !== user.id))
        .map(msg => msg.id);
      if(unreadMessageIds.length !== 0){
        readMessages( conversation.id, unreadMessageIds);
      }
    }
  }, [conversation]);

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    readMessages: (conversationId, messageIds) => dispatch(readMessages(conversationId, messageIds)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveChat);
