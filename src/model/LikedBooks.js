'use strict';

var LikedBook = require('./../entity/LikedBook');
var Book = require('./../entity/Book');

function LikedBooks() {
}

LikedBooks.prototype.setBook = function (user_id, book_id) {
  LikedBook.create({ user_id: user_id, book_id: book_id, status: 'added'})
};

LikedBooks.prototype.getLikedBookId = function (id, callback) {
  LikedBook.findOne({where: {book_id: id}, attributes: ['id']}).then(book => {
    var id = JSON.parse(JSON.stringify(book));
    callback(id);
  });
};

LikedBooks.prototype.getLikedBook = function (id, callback) {
  LikedBook.findOne({
    where: { user_id: id },
    inlcude: [{
      model: Book
    }]
  }).then(book => {

    var data = JSON.parse(JSON.stringify(book));
    console.log(data);
    var bookData = {
      id: data.book.id,
      name: data.book.name,
      authors: data.book.authors,
      genres: data.book.genres,
      description: data.book.description,
    }
    callback(bookData);
  });
};

LikedBooks.prototype.getListLikedBooks = function (userId, callback) {
  LikedBook.findAll({
      where: {user_id: userId, status: 'added'},
      limit: 10,
      order: [
        [Book, 'name', 'ASC']
      ],
      include: [{
        model: Book,
        attributes: ['id', 'name', 'authors']
      }],
      attributes: ['book_id']
    })
  .then(books => {
    if (typeof books !== 'undefined' && books.length > 0) {
      var data = JSON.parse(JSON.stringify(books));
      var booksList = [];
      for (var i = 0; i < data.length; i++) {
        booksList[i] = data[i].book;
      }
      callback(booksList);
    } else {
      callback('empty');
    }
  });
}

LikedBooks.prototype.getListUserBooks = function (userId, callback) {
  LikedBook.findAll({
      where: {user_id: userId, status: 'added'},
      limit: 10,
      order: [
        [Book, 'name', 'ASC']
      ],
      include: [{
        model: Book,
        attributes: ['id', 'name', 'authors']
      }],
      attributes: ['book_id']
    })
  .then(books => {
    if (typeof books !== 'undefined' && books.length > 0) {
      var data = JSON.parse(JSON.stringify(books));
      var booksList = [];
      for (var i = 0; i < data.length; i++) {
        booksList[i] = data[i].book;
      }
      callback(booksList);
    } else {
      callback('empty');
    }
  });
}

module.exports = LikedBooks;