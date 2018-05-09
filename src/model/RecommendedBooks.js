'use strict';

var RecommendedBook = require('./../entity/RecommendedBook');
var Book = require('./../entity/Book');

var recommendedBook = RecommendedBook;
var book = Book;

function RecommendedBooks() {
}

RecommendedBooks.prototype.setRecommendBook = function (bookId, readerId, reviewId, userId, callback) {
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

RecommendedBooks.prototype.updateRecommendedBookStatusToLike = function (id) {
  var userChoose = 'like';
  recommendedBook.update({ user_choose: userChoose}, { where: { id: id}});
}

RecommendedBooks.prototype.updateRecommendedBookStatusToDislike = function (id) {
  var userChoose = 'dislike';
  recommendedBook.update({ user_choose: userChoose}, { where: { id: id}});
}

RecommendedBooks.prototype.updateRecommendedBookStatusToRead = function (id) {
  var userChoose = 'read';
  recommendedBook.update({ user_choose: userChoose}, { where: { id: id}});
}

module.exports = RecommendedBooks;
