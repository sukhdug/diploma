'use strict';

var Sequelize = require('sequelize');
var sequelize = require('./../../config/config');
var Book = require('./Book');

var SavedBook = sequelize.define('saved_books', {
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

SavedBook.belongsTo(Book, { foreignKey: 'book_id' });

module.exports = SavedBook;
