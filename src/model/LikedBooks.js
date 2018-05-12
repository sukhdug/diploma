'use strict';

var LikedBook = require('./../entity/LikedBook');
var Book = require('./../entity/Book');

var likedBook = LikedBook;
var book = Book;

function LikedBooks() {
}

LikedBooks.prototype.setBook = function (userId, bookId) {
  likedBook.findOrCreate({ where: { user_id: userId, book_id: bookId, status: 'added'}})
  .spread((book, created) => {
    console.log(created);
  }).catch( function (err) {
    console.log(new Error("Server problem"));
  });
};

LikedBooks.prototype.getLikedBookId = function (id, callback) {
  likedBook.findOne({where: {book_id: id}, attributes: ['id']}).then(book => {
    var id = JSON.parse(JSON.stringify(book));
    callback(null, id);
  }).catch( function (err) {
    callback(new Error("Server problem"));
  });
};

LikedBooks.prototype.getLikedBook = function (id, callback) {
  likedBook.findOne({
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

LikedBooks.prototype.getListUserBooks = function (userId, callback) {
  likedBook.findAll({
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
  });;
}

module.exports = LikedBooks;
