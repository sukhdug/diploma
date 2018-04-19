var Sequelize = require('sequelize');
var sequelize = require('./../config/config').sequelize;
var Book = require('./Book').Book;
var Review = require('./Review').Review;
var Reader = require('./Reader').Reader;

var RecommendedBook = sequelize.define('recommended_books', {
  book_id: {
    type: Sequelize.INTEGER
  },
  reader_id: {
    type: Sequelize.INTEGER
  },
  review_id: {
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  user_choose: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
}, {
  underscored: true
});

RecommendedBook.belongsTo(Book, { foreignKey: 'book_id' });

exports.RecommendedBook = RecommendedBook;