var Sequelize = require('sequelize');
var sequelize = require('./../config/config').sequelize;

var BotCommand = sequelize.define('bot_commands', {
  command: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
}, {
	timestamps: false
});

exports.BotCommand = BotCommand;