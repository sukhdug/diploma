'use strict';

var RecommendedBook = require('./../entity/RecommendedBook');
var Book = require('./../entity/Book');

var recommendedBook = RecommendedBook;
var book = Book;

function RecommendedBooks() {
}

RecommendedBooks.prototype.setRecommendBook = function (bookId, readerId, reviewId, userId, messageId, callback) {
  var userChoose = 'recommend';
  recommendedBook.create({ book_id: bookId, reader_id: readerId, review_id: reviewId, user_id: userId, message_id: messageId, user_choose: userChoose })
  .then( result => {
    console.log(result.id);
    callback(result.id);
  });
}

RecommendedBooks.prototype.setNotRecommendBook = function (bookId, readerId, reviewId, userId, callback) {
  var userChoose = 'recommend';
  recommendedBook.create({ book_id: bookId, reader_id: readerId, review_id: reviewId, user_id: userId, user_choose: userChoose })
  .then( result => {
    console.log(result.id);
    callback(result.id);
  });
}

RecommendedBooks.prototype.getRecommendedBook = function(id, callback) {
  recommendedBook.findOne({
    where: { id: id },
    include: [{
      model: book,
      attributes: ['id', 'name', 'authors', 'genres', 'description', 'link']
    }]
  }).then(book => {
    var bookArray = JSON.parse(JSON.stringify(book));
    var bookData = {
      recommend_id: bookArray.id,
      review_id: bookArray.review_id,
      reader_id: bookArray.reader_id,
      id: bookArray.book.id,
      name: bookArray.book.name,
      authors: bookArray.book.authors,
      genres: bookArray.book.genres,
      description: bookArray.book.description,
      link: bookArray.book.link,
    }
    callback(bookData);
  });
}

RecommendedBooks.prototype.getRecommendBookByUserAndMessage = function (userId, messageId, callback) {
  recommendedBook.findOne({
    where: { user_id: userId, message_id: messageId },
  }).then(book => {
    var bookArray = JSON.parse(JSON.stringify(book));
    var bookData = {
      book_id: bookArray.book_id,
    }
    callback(null, bookData);
  }).catch(err => {
    callback(new Error("Server problem"));
  });
}

RecommendedBooks.prototype.checkExistRecommendedBookByReview = function (reviewId, userId, callback) {
  recommendedBook.findOne({
    where: { review_id: reviewId, user_id: userId }
  }).then(book => {
    if (book == null) {
      callback('empty');
    }
    if (book != null) {
      callback('exist');
    }
  });
}

RecommendedBooks.prototype.checkExistRecommendedBookByBook = function (bookId, userId, callback) {
  recommendedBook.findOne({
    where: { book_id: bookId, user_id: userId }
  }).then(book => {
    if (book == null) {
      callback('empty');
    }
    if (book != null) {
      callback('exist');
    }
  });
}

RecommendedBooks.prototype.getAllLikedBooksOfUser = function (userId, callback) {
  recommendedBook.findAll({
    where: { user_id: userId, user_choose: 'like' },
    order: [['id', 'DESC']]
  }).then(books => {
    if (typeof books !== 'undefined' && books.length > 0) {
      var bookArray = JSON.parse(JSON.stringify(books));
      var bookData = [];
      for (var i = 0; i < books.length; i++) {
        bookData[i] = {
          book_id: bookArray[i].book_id,
          review_id: bookArray[i].review_id,
          reader_id: bookArray[i].reader_id
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

RecommendedBooks.prototype.getRecommendBookToChangeStatus = function(userId, messageId, callback) {
  recommendedBook.findOne({
    where: {user_id: userId, message_id: messageId, user_choose: 'recommend'}
  }).then(book => {
    var bookData = JSON.parse(JSON.stringify(book));
    var data = {
      book_id: bookData.book_id,
    }
    callback(null, data);
  }).catch(err => {
    callback(new Error("Server problem"));
  });
}

RecommendedBooks.prototype.updateRecommendedBookStatus = function (userId, messageId, status, callback) {
  recommendedBook.update({ user_choose: status}, {
    where: { user_id: userId, message_id: messageId, user_choose: 'recommend' },
    returning: true,
    plain: true
  }).then(result => {
    console.log(result);
    callback(null, result);
  }).catch(err => {
    console.log(new Error("Server problem"));
    callback(new Error("Server problem"));
  });
}

module.exports = RecommendedBooks;
