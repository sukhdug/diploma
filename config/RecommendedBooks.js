const Sequelize = require('sequelize');
const Book = require('./Books').Book;
const Review = require('./Reviews').Review;
const Reader = require('./Readers').Reader;
const sequelize = new Sequelize('mysql://diploma:diploma@localhost:3306/diploma');
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const RecommendedBook = sequelize.define('recommended_books', {
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
}, {
  underscored: true
});

RecommendedBook.belongsTo(Book, { foreignKey: 'book_id' });

exports.setRecommendBook = function (bookId, readerId, reviewId, userId) {
  var userChoose = 'recommend';
  RecommendedBook.create({ book_id: bookId, reader_id: readerId, review_id: reviewId, user_id: userId, user_choose: userChoose });
}

exports.getRecommendedBook = function(bookId, callback) {
  RecommendedBook.findOne({
    where: { book_id: bookId },
    include: [{
      model: Book,
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

exports.updateRecommendedBookStatusToLike = function (id) {
  var userChoose = 'like';
  RecommendedBook.update({ user_choose: userChoose}, { where: { id: id}});
}

// Здесь будет функция выбора книг рецензента, если какая-либо определенная книга нравится пользователю