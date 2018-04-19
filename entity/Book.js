var Sequelize = require('sequelize');
var sequelize = require('./../config/config').sequelize;

var Book = sequelize.define('books', {
  name: {
    type: Sequelize.STRING
  },
  authors: {
    type: Sequelize.STRING
  },
  cover: {
    type: Sequelize.STRING
  },
  genres: {
    type: Sequelize.STRING
  },
  isbn: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  link: {
    type: Sequelize.STRING
  },
  fromsite: {
    type: Sequelize.STRING
  },
  reviews_count: {
    type: Sequelize.INTEGER
  },
  quote_id: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

exports.Book = Book;