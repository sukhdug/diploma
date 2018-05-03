'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/config');

var Reader = sequelize.define('readers', {
  username: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      max: 255
    }
  },
  fromsite: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      max: 45
    }
  },
  reviews_count: {
    type: Sequelize.INTEGER,
    validate: {
      isInt: true,
      max: 11
    }
  },
  link: {
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

module.exports = Reader;