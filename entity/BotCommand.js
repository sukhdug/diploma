'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/config');

var BotCommand = sequelize.define('bot_commands', {
  command: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      max: 255
    }
  },
  description: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      max: 255
    }
  }
}, {
	timestamps: false
}, {
  underscored: true
});

module.exports = BotCommand;