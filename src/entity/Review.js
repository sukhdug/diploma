'use strict';

const Sequelize = require('sequelize');
var sequelize = require('./../../config/config');

const Review = sequelize.define('reviews', {
  book_id: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      isInt: true
    }
  },
  reader_id: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      isInt: true
    }
  },
  rate: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false
    }
  }
}, {
  timestamps: false
}, {
  underscored: true
});

module.exports = Review;
