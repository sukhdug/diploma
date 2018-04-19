const Sequelize = require('sequelize');
var sequelize = require('./../config/config').sequelize;

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

exports.Review = Review;