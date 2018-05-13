'use strict';

var Reader = require('./../entity/Reader');
var Review = require('./../entity/Review');
var Sequelize = require('sequelize');
var Op = require('./../../config/op');

var reader = Reader;
var review = Review;

function Readers(){
}

Readers.prototype.getAllReviewsOfReaderExceptBook = function(readerId, bookId, callback) {
  review.findAll({
    where: { reader_id: readerId, book_id: { [Op.ne]: bookId }}
  }).then(books => {
    if (typeof books !== 'undefined' && books.length > 0) {
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
    } else {
      callback(null, 'empty');
    }
  }).catch(err => {
    callback(new Error("Server problem"));
  });
}

module.exports = Readers;
