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

exports.getReview = function (id, callback) {
  Review.findOne({where: {id: id}}).then(review => {
    var reviewArray = JSON.parse(JSON.stringify(review));
    callback(reviewArray);
  });
}