'use strict';

var BotCommand = require('./../entity/BotCommand');

function BotCommands() {
  this.botCommand = new BotCommand();
}

BotCommands.prototype.getCommandDescription = function(command, callback) {
  var botCommand = this.botCommand;
  botCommand.findOne({where: {command: command}}).then(command => {
    callback(command.description);
  });
};

module.exports = BotCommands;