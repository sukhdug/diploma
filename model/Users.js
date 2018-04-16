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

const User = sequelize.define('users', {
  username: {
    type: Sequelize.INTEGER
  },
  telegram_id: {
    type: Sequelize.INTEGER
  }
}, {
  timestamps: false
});

exports.setUser = function(username, telegram_id) {

  User.findOne({where: {telegram_id: telegram_id}}).then(user => {
    if (user) {
      console.log("Пользователь существует");
    } else {
      User.create({ username: username, telegram_id: telegram_id})
      .then(user => {
        console.log(user.get(telegram_id));
      });
    }
  });
};