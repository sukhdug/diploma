const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://diploma:diploma@localhost:3306/diploma');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Review = sequelize.define('reviews', {
  book_id: {
    type: Sequelize.INTEGER
  },
  reader_id: {
    type: Sequelize.INTEGER
  },
  rate: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
}, {
  underscored: true
});
const Op = Sequelize.Op;

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

exports.getReviewsOfBook = function(bookId, readerId, callback) {
  Review.findAll({ where: { book_id: { [Op.ne]: bookId }, reader_id: readerId, rate: { [Op.between]: [4, 5]}}})
  .then(reviews => {
    if (reviews != null) {
      var data = JSON.parse(JSON.stringify(reviews));
      var booksList = [];
      console.log(data);
      for (id = 0; id < data.length; id++) {
        booksList[id] = data[id].book_id;
      }
      callback(booksList);
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