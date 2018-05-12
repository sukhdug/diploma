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
            //Recommendation.formRecommendBook();
          }
        });
      });
    } else if (result === 'exist') {
      console.log('exist');
      callHimself(userId, messageId);
      //Recommendation.formRecommendBook();
    }
  });
}

Recommendation.prototype.formRecommendBookForUser = function(userId, callback) {
  var reviewFound = 0;
  var i = 0;
  recommendedBooks.getAllLikedBooksOfUser(userId, function (books) {
    //for (var i = 0; i < books.length; i++) {
    if (books !== 'empty') {
      do {
        var readerId = books[i].reader_id;
        reader.getAllReviewsOfReader(readerId, function (reviews) {
          //for(var j = 0; j < reviews.length; j++) {
          var j = 0;
          while(reviewFound === 0) {
            console.log("# рецензии: " + reviews[j].review_id);
            var reviewId = reviews[j].review_id;
            var bookId = reviews[j].book_id;
            recommendedBooks.checkExistRecommendedBookByReview(reviewId, userId, function (result) {
              if (result === 'empty') {
                recommendedBooks.checkExistRecommendedBookByBook(bookId, userId, function (result) {
                  if (result === 'empty') {
                    reviewFound = 1;
                    recommendedBooks.setRecommendBook(bookId, readerId, reviewId, userId, function (id) {
                      recommendedBooks.getRecommendedBook(id, function (book) {
                        callback(book);
                      });
                    });
                  }
                });
              }
            });
            j++;
            if (j == reviews.length) break;
          }
        });
        i++;
        if (i == books.length) break;
      } while (reviewFound == 0);
    } else {
      console.log('empty');
    }
  });
}

module.exports = Recommendation;
