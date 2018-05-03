'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/config');
var Book = require('./Book');

var LikedBook = sequelize.define('liked_books', {
  user_id: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      isInt: true,
      max: 11
    }
  },
  book_id: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      isInt: true,
      max: 11
    }
  },
  status: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      max: 45
    }
  }
}, {
  timestamps: false
}, {
  underscored: true
});

LikedBook.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = LikedBook;