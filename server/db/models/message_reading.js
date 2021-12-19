const db = require("../db");

const MessageReading = db.define("messageReading", {
  messageId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports = MessageReading;