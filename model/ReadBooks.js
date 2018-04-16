const Sequelize = require('sequelize');
const Book = require('./Books').Book;

const sequelize = new Sequelize('mysql://diploma:diploma@localhost:3306/diploma');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const ReadBook = sequelize.define('read_books', {
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

exports.setBook = function (user_id, book_id) {
  ReadBook.create({ user_id: user_id, book_id: book_id, status: 'added'})
};

exports.getReadBookId = function (id, callback) {
  ReadBook.findOne({where: {book_id: id}, attributes: ['id']}).then(book => {
    var id = JSON.parse(JSON.stringify(book));
    callback(id);
  });
};

exports.getReadBook = function (id, callback) {
  ReadBook.findOne({
    where: { user_id: id },
    inlcude: [{
      model: Book
    }]
  }).then(book => {

    var data = JSON.parse(JSON.stringify(book));
    console.log(data);
    var bookData = {
      id: data.book.id,
      name: data.book.name,
      authors: data.book.authors,
      genres: data.book.genres,
      description: data.book.description,
    }
    callback(bookData);
  });
};

exports.getListReadBooks = function (userId, callback) {
  ReadBook.findAll({
      where: {user_id: userId, status: 'added'},
      limit: 10,
      order: [
        [Book, 'name', 'ASC']
      ],
      include: [{
        model: Book,
        attributes: ['id', 'name']
      }],
      attributes: ['book_id']
    })
  .then(books => {
    var data = JSON.parse(JSON.stringify(books));
    var booksList = [];
    for (var i = 0; i < data.length; i++) {
      booksList[i] = data[i].book;
    }
    callback(booksList);
  });
}