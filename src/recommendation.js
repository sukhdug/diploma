'use strict';

var Book = require('./model/Books');
var Reader = require('./model/Readers');
var Review = require('./model/Reviews');
var User = require('./model/Users');
var RecommendedBooks = require('./model/RecommendedBooks');

var recommendedBooks = new RecommendedBooks();
var review = new Review();
/*
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
*/
function randomInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function Recommendation() {
}

Recommendation.prototype.formRecommendBook = function (userId, callback) {
  var rand = randomInt(1, 931);
  var reviewId = rand;
  recommendedBooks.checkExistRecommendedBookByReview(reviewId, userId, function (result) {
    if (result === 'empty') {
      review.getReview(rand, function (review) {
        var reviewData = {
          reviewId: review[0],
          bookId: review[1],
          readerId: review[2]
        };
        console.log(reviewData);
        recommendedBooks.checkExistRecommendedBookByBook(reviewData.bookId, userId, function (result) {
          if (result === 'empty') {
            
          } else if (result === 'exist') {
            Recommendation.formRecommendBook();
          }
        });
      });
    } else if (result === 'exist') {
      Recommendation.formRecommendBook();
    }
  });
}

module.exports = Recommendation;