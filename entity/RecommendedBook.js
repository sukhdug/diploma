'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/config');
var Book = require('./Book');
var Review = require('./Review');
var Reader = require('./Reader');

var RecommendedBook = sequelize.define('recommended_books', {
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
  review_id: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      isInt: true,
      max: 11
    }
  },
  user_id: {
    type: Sequelize.INTEGER,
    notEmpty: true,
    isInt: true,
    max: 11
  },
  user_choose: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: false,
      max: 100
    }
  }
}, {
  timestamps: false
}, {
  underscored: true
});

RecommendedBook.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = RecommendedBook;