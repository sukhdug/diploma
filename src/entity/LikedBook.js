'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../../config/config');
var Book = require('./Book');

var LikedBook = sequelize.define('liked_books', {
  user_id: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      isInt: true
    }
  },
  book_id: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true,
      isInt: true
    }
  },
  status: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
}, {
  timestamps: false
}, {
  underscored: true
});

LikedBook.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = LikedBook;
