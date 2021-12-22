const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const ConversationParticipant = require("./conversation_participant");
const MessageReading = require("./message_reading");

// associations

Conversation.belongsTo(User, { as: "user1" });
Conversation.belongsTo(User, { as: "user2" });

User.hasMany(ConversationParticipant);
Conversation.hasMany(ConversationParticipant);
ConversationParticipant.belongsTo(User);
ConversationParticipant.belongsTo(Conversation);

Message.hasMany(MessageReading);
User.hasMany(MessageReading);
MessageReading.belongsTo(Message);
MessageReading.belongsTo(User);

Conversation.hasMany(Message);
Message.belongsTo(Conversation);


module.exports = {
  User,
  Conversation,
  Message
};
