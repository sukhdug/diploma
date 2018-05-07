'use strict';

var LikedBook = require('./../entity/LikedBook');
var Book = require('./../entity/Book');

function LikedBooks() {
  this.likedBook = new LikedBook();
  this.book = new Book();
}

LikedBooks.prototype.setBook = function (userId, bookId) {
  var likedBook = this.likedBook;
  likedBook.findOrCreate({ where: { user_id: userId, book_id: bookId, status: 'added'}})
  .spread((book, created) => {
    console.log(book.get());
    console.log(created);
  });
};

LikedBooks.prototype.getLikedBookId = function (id, callback) {
  var likedBook = this.likedBook;
  likedBook.findOne({where: {book_id: id}, attributes: ['id']}).then(book => {
    var id = JSON.parse(JSON.stringify(book));
    callback(id);
  });
};

LikedBooks.prototype.getLikedBook = function (id, callback) {
  var likedBook = this.likedBook;
  var book = this.book;
  likedBook.findOne({
    where: { user_id: id },
    inlcude: [{
      model: book
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

LikedBooks.prototype.getListUserBooks = function (userId, callback) {
  var likedBook = this.likedBook;
  var book = this.book;
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