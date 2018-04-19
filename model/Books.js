var Book = require('./../entity/Book').Book;

exports.Book = Book;

exports.getBook = function (id, callback) {
  Book.findOne({where: {id: id}}).then(book => {
    callback(book.name);
  });
};

exports.getRandomBook = function (id, callback) {
  Book.findOne({where: {id: id}}).then(book => {

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
    callback(bookData);
  });
};

exports.getCountOfBooks = function (callback) {
  Book.count().then(count => {
    callback(count);
  });
};