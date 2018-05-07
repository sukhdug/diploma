'use strict';

var User = require('./../entity/User');

function Users() {
  this.user = new User();
}

Users.prototype.setUser = function(username, telegram_id) {
  var user = this.user;
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