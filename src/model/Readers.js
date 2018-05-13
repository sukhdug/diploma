'use strict';

var Reader = require('./../entity/Reader');
var Review = require('./../entity/Review');
var Op = require('./../../config/op');

var reader = Reader;
var review = Review;

function Readers(){
}

Readers.prototype.getAllReviewsOfReaderExceptBook = function(readerId, bookId, callback) {
  review.findAll({
    where: { reader_id: readerId, book_id: { [Op.ne]: bookId }}
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
    callback(null, bookData);
  }).catch(err => {
    callback(new Error("Server problem"));
  });
}

module.exports = Readers;
