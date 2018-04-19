var Sequelize = require('sequelize');
var sequelize = require('./../config/config').sequelize;

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

exports.User = User;