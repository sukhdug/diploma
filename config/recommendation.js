const Book = require('./Books');
const Reader = require('./Readers');
const Review = require('./Reviews');
const User = require('./Users');
const RecommendedBook = require('./RecommendedBooks');

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
 Review.getReviewsOfBook(bookId, readerId, function (reviews) {
	var rec_book = reviews[0];
	callback(rec_book);
 });
}