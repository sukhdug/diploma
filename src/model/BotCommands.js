'use strict';

var BotCommand = require('./../entity/BotCommand');

var botCommand = BotCommand;

function BotCommands() {
}

BotCommands.prototype.getCommandDescription = function(command, callback) {
  botCommand.findOne({where: {command: command}}).then(command => {
    callback(command.description);
  });
};

module.exports = BotCommands;
