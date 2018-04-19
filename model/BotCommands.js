var BotCommand = require('./../entity/BotCommand').BotCommand;

exports.getCommandDescription = function(command, callback) {
	BotCommand.findOne({where: {command: command}}).then(command => {
		callback(command.description);
	});
};