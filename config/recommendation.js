const Book = require('./Books');
const Reader = require('./Readers');
const Review = require('./Reviews');
const User = require('./Users');
const RecommendedBook = require('./RecommendedBooks');

exports.recommendedBook = function (bookId, readerId, reviewId, userId, callback) {
  RecommendedBook.setRecommendBook(bookId, readerId, reviewId, userId, function (result) {
  	RecommendedBook.getRecommendedBook(bookId, function (book) {
      callback(book);
  	});
  });
}

exports.findReviewOfLikeBook = function(bookId, readerId, callback) {
	Review.getReviewsOfBook(bookId, readerId, function (reviews) {
		//console.log(reviews);
		//var readers = [];
		//console.log(reviews);
		var rec_book = reviews[0];
		/*for (id = 0; id < reviews.length; id++) {
			readers[id] = reviews[id].book_id;
			rec_book = reviews[id].book_id;
		}*/
		//console.log(reviews.length);
		//console.log(readers);
		//console.log(rec_book);
		callback(rec_book);
	});
}