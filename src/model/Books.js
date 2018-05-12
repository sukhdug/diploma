'use strict';

var Book = require('./../entity/Book');
var Op = require('./../../config/op');

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

Books.prototype.getListFoundBooks = function (word, callback) {
  book.findAll({where: {name: { [Op.like]: '%' + word + '%'}}, order: [['name', 'ASC']]}).then(function (books) {
    var data = JSON.parse(JSON.stringify(books));
    var booksList = [];
    for (var i = 0; i < data.length; i++) {
      booksList[i] = {
        name: data[i].name,
        authors: data[i].authors,
        genres: data[i].genres,
        link: data[i].link
      }
    }
    callback(null, booksList);
  }).catch(function(err) {
    callback(new Error("Server problem"));
  });
};

module.exports = Books;
