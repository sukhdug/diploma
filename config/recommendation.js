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

const Book = sequelize.define('recommended_books', {
  book_id: {
    type: Sequelize.INTEGER
  },
  reader_id: {
    type: Sequelize.INTEGER
  },
  review_id: {
    type: Sequelize.INTEGER
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  user_choose: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

exports.getBook = function(id, callback) {
  Book.findOne({where: {id: id}}).then(book => {
    //console.log(book.name);
    callback(book.name);
  });
};

exports.getRandomBook = function(id, callback) {
  Book.findOne({where: {id: id}}).then(book => {
    //console.log(book.name);
    var bookData = [];
    bookData.push(book.name);
    bookData.push(book.authors);
    bookData.push(book.genres);
    bookData.push(book.isbn);
    bookData.push(book.rating);
    bookData.push(book.description);
    bookData.push(book.link);
    bookData.push(book.cover);
    callback(bookData);
  });
};