'use strict';

var ReadBook = require('./../entity/ReadBook');
var Book = require('./../entity/Book');

function ReadBooks() {
}

ReadBooks.prototype.setBook = function (userId, bookId) {
  ReadBook.findOrCreate({ where: { user_id: userId, book_id: bookId, status: 'added'}})
  .spread((book, created) => {
    console.log(book.get());
    console.log(created);
  });
};

ReadBooks.prototype.getReadBookId = function (id, callback) {
  ReadBook.findOne({where: {book_id: id}, attributes: ['id']}).then(book => {
    var id = JSON.parse(JSON.stringify(book));
    callback(id);
  });
};

ReadBooks.prototype.getReadBook = function (id, callback) {
  ReadBook.findOne({
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

ReadBooks.prototype.getListUserBooks = function (userId, callback) {
  ReadBook.findAll({
      where: {user_id: userId, status: 'added'},
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

module.exports = ReadBooks;
