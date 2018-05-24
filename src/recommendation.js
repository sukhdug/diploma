'use strict';

var Book = require('./model/Books');
var Reader = require('./model/Readers');
var Review = require('./model/Reviews');
var User = require('./model/Users');
var RecommendedBooks = require('./model/RecommendedBooks');

var recommendedBooks = new RecommendedBooks();
var review = new Review();
var reader = new Reader();

function randomInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function Recommendation() {
}

function callHimself(userId, messageId) {
  var rec = new Recommendation();
  rec.getRecommendBook(userId, messageId);
}

function callHimselfForm(userId) {
  var rec = new Recommendation();
  rec.formRecommendBookForUser(userId);
}

Recommendation.prototype.getRecommendBook = function (userId, messageId, callback) {
  var rand = randomInt(1, 1073);
  var reviewId = rand;
  recommendedBooks.checkExistRecommendedBookByReview(reviewId, userId, function (result) {
    if (result === 'empty') {
      review.getReview(rand, function (review) {
        var reviewData = {
          reviewId: review[0],
          bookId: review[1],
          readerId: review[2]
        };
        recommendedBooks.checkExistRecommendedBookByBook(reviewData.bookId, userId, function (result) {
          if (result === 'empty') {
            recommendedBooks.setRecommendBook(reviewData.bookId, reviewData.readerId, reviewData.reviewId, userId, messageId, function (id) {
              recommendedBooks.getRecommendedBook(id, function (book) {
                callback(book);
              });
            });
          } else if (result === 'exist') {
            console.log('exist');
            callHimself(userId, messageId);
          }
        });
      });
    } else if (result === 'exist') {
      console.log('exist');
      callHimself(userId, messageId);
    }
  });
}

Recommendation.prototype.formRecommendBookForUser = function(userId, messageId, callback) {
  recommendedBooks.getAllLikedBooksOfUser(userId, function (req, books) {
    if (req) {
      callback(new Error("Server problem"));
    } else {
      if (books !== 'empty') {
        var readerId = books[0].reader_id;
        var bookId = books[0].book_id;
        reader.getAllReviewsOfReaderExceptBook(readerId, bookId, function (req, reviews) {
          if (req) {
            callback(new Error("Not Found"));
          } else {
            if (reviews !== 'empty') {
              var reviewId = reviews[0].review_id;
              var bookId = reviews[0].book_id;
              console.log(reviewId);
              recommendedBooks.checkExistRecommendedBookByReview(reviewId, userId, function (result) {
                if (result === 'empty') {
                  recommendedBooks.checkExistRecommendedBookByBook(bookId, userId, function (result) {
                    if (result === 'empty') {
                      recommendedBooks.setRecommendBook(bookId, readerId, reviewId, userId, messageId, function (id) {
                        recommendedBooks.getRecommendedBook(id, function (book) {
                          callback(null, book);
                        });
                      });
                    } else {
                      console.log(result);
                      callback(null, 'empty');
                    }
                  });
                } else {
                  console.log(result);
                  callback(null, 'empty');
                }
              });
            } else {
              console.log('empty');
              callback(null, 'empty');
            }
          }
        });
      } else {
        console.log('empty');
        callback(null, 'empty');
      }
    }
  });
}

module.exports = Recommendation;
