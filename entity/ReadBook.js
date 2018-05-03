'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/config');
var Book = require('./Book');

var ReadBook = sequelize.define('read_books', {
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

ReadBook.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = ReadBook;