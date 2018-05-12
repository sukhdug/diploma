'use strict';

var Book = require('./../entity/Book');

var book = Book;

function Books() {
}

Books.prototype.getBook = function (id, callback) {
  book.findOne({where: {id: id}}).then(function (book) {
    var bookData = {
      id: book.id,
      name: book.name,
      authors: book.authors,
      genres: book.genres,
      isbn: book.isbn,
      rating: book.rating,
      description: book.description,
      link: book.link,
      cover: book.cover
    }
    callback(null, bookData);
  }).catch( function (err) {
    callback(new Error("Server problem"));
  });
};

module.exports = Books;
