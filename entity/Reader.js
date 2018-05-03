'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/config');

var Reader = sequelize.define('readers', {
  username: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  fromsite: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  reviews_count: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true
    }
  },
  link: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
      isUrl: true
    }
  }
}, {
  timestamps: false
}, {
  underscored: true
});

module.exports = Reader;