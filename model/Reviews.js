var Review = require('./../entity/Review').Review;
var Op = require('./../config/config').Op;

exports.getReview = function (id, callback) {
  Review.findOne({where: {id: id}}).then(review => {
    var reviewArray = JSON.parse(JSON.stringify(review));
    var reviewData = [];
    console.log(reviewArray);
    reviewData[0] = reviewArray.id;
    reviewData[1] = reviewArray.book_id;
    reviewData[2] = reviewArray.reader_id;
    callback(reviewData);
  });
}

exports.getReviewsOfReader = function(bookId, readerId, callback) {
  Review.findAll({ where: { book_id: { [Op.ne]: bookId }, reader_id: readerId, rate: { [Op.between]: [4, 5]}}})
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

exports.getReviewsOfBook = function(bookId, readerId, callback) {
  Review.findAll({ where: { book_id: bookId, reader_id: { [Op.ne]: readerId }, rate: { [Op.between]: [4, 5]}}})
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

exports.getRandomReview = function(id, callback) {
  Review.findAll({where: {id: id}})
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