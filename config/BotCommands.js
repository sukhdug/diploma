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

const Book = sequelize.define('bot_commands', {
  command: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  }
}, {
	timestamps: false
});

exports.getCommandDescription = function(command, callback) {
	Book.findOne({where: {command: command}}).then(command => {
		callback(command.description);
	});
};