'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/config');
var Book = require('./Book');

var LikedBook = sequelize.define('liked_books', {
  user_id: {
    type: Sequelize.INTEGER
  },
  book_id: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
}, {
  underscored: true
});

LikedBook.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = LikedBook;