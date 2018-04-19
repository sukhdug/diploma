var Book = require('./model/Books');
var Reader = require('./model/Readers');
var Review = require('./model/Reviews');
var User = require('./model/Users');
var RecommendedBook = require('./model/RecommendedBooks');

exports.recommendedBook = function (bookId, readerId, reviewId, userId, callback) {
  RecommendedBook.setRecommendBook(bookId, readerId, reviewId, userId, function (result) {
    RecommendedBook.getRecommendedBook(result, function (book) {
      callback(book);
  	});
  });
}

exports.findReviewOfDislikeBook = function(id, callback) {
  Review.getRandomReview(id, function (reviews) {
	var rec_book = reviews[0];
	callback(rec_book);
  });
}

exports.findReviewOfLikeBook = function(bookId, readerId, callback) {
  Review.getReviewsOfReader(bookId, readerId, function (reviews) {
    if (reviews !== 'error') {
      var rec_book = reviews[0];
      callback(rec_book);
    } else if (reviews === 'error') {
      Review.getReviewsOfBook(bookId, readerId, function (reviews) {
        var rec_book = reviews[0];
        callback(rec_book);
      });
    }
  });
}