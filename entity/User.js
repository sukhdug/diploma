'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/config');

var User = sequelize.define('users', {
  username: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      max: 255
    }
  },
  telegram_id: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true,
      notEmpty: true
    }
  }
}, {
  timestamps: false
}, {
  underscored: true
});

module.exports = User;