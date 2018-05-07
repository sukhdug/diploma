var Review = require('./../entity/Review');
var Op = require('./../../config/op');

function Reviews() {
  this.review = new Review();
}

Reviews.prototype.getReview = function (id, callback) {
  var review = this.review;
  review.findOne({where: {id: id}}).then(review => {
    var reviewArray = JSON.parse(JSON.stringify(review));
    var reviewData = [];
    console.log(reviewArray);
    reviewData[0] = reviewArray.id;
    reviewData[1] = reviewArray.book_id;
    reviewData[2] = reviewArray.reader_id;
    callback(reviewData);
  });
}

Reviews.prototype.getReviewsOfReader = function(bookId, readerId, callback) {
  var review = this.review;
  review.findAll({ where: { book_id: { [Op.ne]: bookId }, reader_id: readerId, rate: { [Op.between]: [4, 5]}}})
  .then(reviews => {
    if(typeof reviews !== 'undefined' && reviews.length > 0) {
      var data = JSON.parse(JSON.stringify(reviews));
      var booksList = [];
      console.log(data);
      for (id = 0; id < data.length; id++) {
        booksList[id] = data[id].book_id;
      }
      callback(booksList);
    } else {
      callback('error');
    }
  });
}

Reviews.prototype.getReviewsOfBook = function(bookId, readerId, callback) {
  var review = this.review;
  review.findAll({ where: { book_id: bookId, reader_id: { [Op.ne]: readerId }, rate: { [Op.between]: [4, 5]}}})
  .then(reviews => {
    if (typeof reviews !== 'undefined' && reviews.length > 0) {
      var data = JSON.parse(JSON.stringify(reviews));
      var booksList = [];
      console.log(data);
      for (id = 0; id < data.length; id++) {
        booksList[id] = data[id].book_id;
      }
      callback(booksList);
    } else {
      callback('error');
    }
  });
}

Reviews.prototype.getRandomReview = function(id, callback) {
  var review = this.review;
  review.findAll({where: {id: id}})
  .then(reviews => {
    var data = JSON.parse(JSON.stringify(reviews));
      var booksList = [];
      console.log(data);
      for (id = 0; id < data.length; id++) {
        booksList[id] = data[id].book_id;
      }
      callback(booksList);
  });
}

module.exports = Reviews;