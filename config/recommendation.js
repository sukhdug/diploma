const Book = require('./Books');
const Reader = require('./Readers');
const Review = require('./Reviews');
const User = require('./Users');
const RecommendedBook = require('./RecommendedBooks');

exports.recommendedBook = function (bookId, readerId, reviewId, userId, callback) {
  //RecommendedBook.setRecommendBook(bookId, readerId, reviewId, userId);
  RecommendedBook.getRecommendedBook(bookId, function (book) {
      callback(book);
  });
}

