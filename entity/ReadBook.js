'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../config/config');
var Book = require('./Book');

var ReadBook = sequelize.define('read_books', {
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

ReadBook.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = ReadBook;