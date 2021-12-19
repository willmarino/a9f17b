const db = require("../db");

const ConversationParticipant = db.define("conversationParticipant", {
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports = ConversationParticipant;