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

const Reader = sequelize.define('readers', {
  username: {
    type: Sequelize.STRING
  },
  fromsite: {
    type: Sequelize.STRING
  },
  reviews_count: {
    type: Sequelize.INTEGER
  },
  link: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
}, {
  underscored: true
});