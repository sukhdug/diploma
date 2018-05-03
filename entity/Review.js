'use strict';

const Sequelize = require('sequelize');
var sequelize = require('./../config/config');

const Review = sequelize.define('reviews', {
  book_id: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      isInt: true,
      max: 11
    }
  },
  reader_id: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      isInt: true,
      max: 11
    }
  },
  rate: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false,
      max: 10
    }
  }
}, {
  timestamps: false
}, {
  underscored: true
});

module.exports = Review;