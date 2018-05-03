'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/config');

var BotCommand = sequelize.define('bot_commands', {
  command: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
}, {
	timestamps: false
}, {
  underscored: true
});

module.exports = BotCommand;