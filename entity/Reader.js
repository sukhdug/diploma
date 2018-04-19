var Sequelize = require('sequelize');
var sequelize = require('./../config/config').sequelize;

var Reader = sequelize.define('readers', {
  username: {
    type: Sequelize.STRING
  },
  fromsite: {
    type: Sequelize.STRING
  },
  reviews_count: {
    type: Sequelize.INTEGER
  },
  link: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
}, {
  underscored: true
});

exports.Reader = Reader;