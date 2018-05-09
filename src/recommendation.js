'use strict';

var Book = require('./model/Books');
var Reader = require('./model/Readers');
var Review = require('./model/Reviews');
var User = require('./model/Users');
var RecommendedBooks = require('./model/RecommendedBooks');

var recommendedBooks = new RecommendedBooks();
var review = new Review();

function randomInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function Recommendation() {
}

Recommendation.prototype.getRecommendBook = function (userId, callback) {
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
            recommendedBooks.setRecommendBook(reviewData.bookId, reviewData.readerId, reviewData.reviewId, userId, function (id) {
              recommendedBooks.getRecommendedBook(id, function (book) {
                var text = "<b>Название книги:</b> " + book.name +
                  "\n<b>Автор:</b> " + book.authors + "\n<b>Жанры:</b> " + book.genres +
                  "\n<b>Описание книги:</b>\n" + book.description +
                  "\n<a href='" + book.link + "'>Читать рецензии на сайте LiveLib</a>";
                callback(text);
              });
            });
          } else if (result === 'exist') {
            console.log('exist');
            //Recommendation.formRecommendBook();
          }
        });
      });
    } else if (result === 'exist') {
      console.log('exist');
      //Recommendation.formRecommendBook();
    }
  });
}

module.exports = Recommendation;
