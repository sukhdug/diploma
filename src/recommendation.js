'use strict';

var Book = require('./model/Books');
var Reader = require('./model/Readers');
var Review = require('./model/Reviews');
var User = require('./model/Users');
var RecommendedBooks = require('./model/RecommendedBooks');

var recommendedBooks = new RecommendedBooks();
var review = new Review();

exports.recommendedBook = function (bookId, readerId, reviewId, userId, callback) {
  recommendedBooks.setRecommendBook(bookId, readerId, reviewId, userId, function (result) {
    recommendedBooks.getRecommendedBook(result, function (book) {
      callback(book);
  	});
  });
}

exports.findReviewOfDislikeBook = function(id, callback) {
  review.getRandomReview(id, function (reviews) {
	var rec_book = reviews[0];
	callback(rec_book);
  });
}

exports.findReviewOfLikeBook = function(bookId, readerId, callback) {
  review.getReviewsOfReader(bookId, readerId, function (reviews) {
    if (reviews !== 'error') {
      var rec_book = reviews[0];
      callback(rec_book);
    } else if (reviews === 'error') {
      review.getReviewsOfBook(bookId, readerId, function (reviews) {
        var rec_book = reviews[0];
        callback(rec_book);
      });
    }
  });
}
