'use strict';

var ReadBook = require('./../entity/ReadBook');
var Book = require('./../entity/Book');

var readBook = ReadBook;
var book = Book;

function ReadBooks() {
}

ReadBooks.prototype.setBook = function (userId, bookId) {
  readBook.findOrCreate({ where: { user_id: userId, book_id: bookId, status: 'added'}})
  .spread((book, created) => {
    console.log(created);
  }).catch( function (err) {
    callback(new Error("Server problem"));
  });
};

ReadBooks.prototype.getReadBook = function (id, callback) {
  readBook.findOne({
    where: { user_id: id },
    inlcude: [{
      model: book
    }]
  }).then(book => {
    var data = JSON.parse(JSON.stringify(book));
    var bookData = {
      id: data.book.id,
      name: data.book.name,
      authors: data.book.authors,
      genres: data.book.genres,
      description: data.book.description,
    }
    callback(null, bookData);
  }).catch( function (err) {
    callback(new Error("Server problem"));
  });
};

ReadBooks.prototype.getListUserBooks = function (userId, callback) {
  readBook.findAll({
    where: {user_id: userId, status: 'added'},
    order: [
      [book, 'name', 'ASC']
    ],
    include: [{
      model: book,
      attributes: ['id', 'name', 'authors']
    }],
    attributes: ['book_id']
  }).then(books => {
    var data = JSON.parse(JSON.stringify(books));
    var booksList = [];
    for (var i = 0; i < data.length; i++) {
      booksList[i] = data[i].book;
    }
    callback(null, booksList);
  }).catch( function (err) {
    callback(new Error("Server problem"));
  });
}

module.exports = ReadBooks;
