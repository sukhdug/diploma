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
      var reviewFound = 0;
      var i = 0;
      if (books !== 'empty') {
        do {
          var readerId = books[i].reader_id;
          var bookId = books[i].book_id;
          reader.getAllReviewsOfReaderExceptBook(readerId, bookId, function (req, reviews) {
            if (req) {
              callback(new Error("Not Found"));
            } else {
              for (var j = 0; j < reviews.length; j++) {
                console.log("# рецензии: " + reviews[j].review_id);
                var reviewId = reviews[j].review_id;
                var bookId = reviews[j].book_id;
                console.log(reviewId);
                recommendedBooks.checkExistRecommendedBookByReview(reviewId, userId, function (result) {
                  if (result === 'empty') {
                    recommendedBooks.checkExistRecommendedBookByBook(bookId, userId, function (result) {
                      if (result === 'empty') {
                        recommendedBooks.setRecommendBook(bookId, readerId, reviewId, userId, messageId, function (id) {
                          recommendedBooks.getRecommendedBook(id, function (book) {
                            reviewFound = 1;
                            callback(null, book);
                          });
                        });
                      } else {
                        console.log(result);
                        console.log(reviewFound);
                        callback(null, 'empty');
                      }
                    });
                  } else {
                    console.log(result);
                    console.log(reviewFound);
                    callback(null, 'empty');
                  }
                });
                if (reviewFound == 1) break;
              }
            }
          });
          i++;
          if (i == books.length) break;
        } while (reviewFound == 0);
      } else {
        console.log('empty');
        callback(null, 'empty');
      }
    }
  });
}

module.exports = Recommendation;
