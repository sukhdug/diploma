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
});

exports.setBook = function(user_id, book_id) {
  ReadBook.create({ user_id: user_id, book_id: book_id, status: 'added'})
  .then(readbook => {
    console.log(readbook.get(user_id));
  });
};