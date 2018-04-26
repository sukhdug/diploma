var Sequelize = require('sequelize');
var sequelize = require('./../config/config').sequelize;
var Book = require('./Book').Book;

var ReadBook = sequelize.define('read_books', {
  user_id: {
    type: Sequelize.INTEGER
  },
  book_id: {
    type: Sequelize.INTEGER
  },
  status: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
}, {
  underscored: true
});

ReadBook.belongsTo(Book, { foreignKey: 'book_id' });

exports.ReadBook = ReadBook;