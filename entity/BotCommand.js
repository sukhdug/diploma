'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/config');

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

module.exports = BotCommand;