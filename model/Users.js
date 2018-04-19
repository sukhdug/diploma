var User = require('./../entity/User').User;

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