'use strict';

var Reader = require('./../entity/Reader');
var Review = require('./../entity/Review');

var reader = Reader;
var review = Review;

function Readers(){
}

Readers.prototype.getAllReviewsOfReader = function(readerId, callback) {
  review.findAll({
    where: { reader_id: readerId }
  }).then(books => {
    var bookArray = JSON.parse(JSON.stringify(books));
    var bookData = [];
    for (var i = 0; i < books.length; i++) {
      bookData[i] = {
        review_id: bookArray[i].id,
        book_id: bookArray[i].book_id,
        reader_id: bookArray[i].reader_id,
        rate: bookArray[i].rate
      }
    }
    callback(bookData);
  });
}

module.exports = Readers;
