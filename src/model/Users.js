'use strict';

var User = require('./../entity/User');

var user = User;

function Users() {
}

Users.prototype.setUser = function(username, telegram_id) {
  user.findOne({where: {telegram_id: telegram_id}}).then(user => {
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

module.exports = Users;
