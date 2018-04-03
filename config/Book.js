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

const Book = sequelize.define('books', {
  name: {
    type: Sequelize.STRING
  },
  authors: {
    type: Sequelize.STRING
  },
  cover: {
    type: Sequelize.STRING
  },
  genres: {
    type: Sequelize.STRING
  },
  isbn: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  link: {
    type: Sequelize.STRING
  },
  fromsite: {
    type: Sequelize.STRING
  },
  reviews_count: {
    type: Sequelize.INTEGER
  },
  quote_id: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

exports.getBook = function(id, callback) {
  Book.findOne({where: {id: id}}).then(book => {
    callback(book.name);
  });
};

exports.getRandomBook = function(id, callback) {
  Book.findOne({where: {id: id}}).then(book => {

    var bookData = {
      id: book.id,
      name: book.name,
      authors: book.authors,
      genres: book.genres,
      isbn: book.isbn,
      rating: book.rating,
      description: book.description,
      link: book.link,
      cover: book.cover
    }
    callback(bookData);
  });
};

exports.getCountOfBooks = function(callback) {
  Book.count().then(count => {
    callback(count);
  });
};