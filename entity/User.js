'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/config');

var User = sequelize.define('users', {
  username: {
    type: Sequelize.INTEGER
  },
  telegram_id: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

module.exports = User;