'use strict';

var BotCommand = require('./../entity/BotCommand');

var botCommand = BotCommand;

function BotCommands() {
}

BotCommands.prototype.getCommandDescription = function(command, callback) {
  botCommand.findOne({where: {command: command}}).then( function (command) {
    callback(null, command.description);
  }).catch( function (err) {
    callback(new Error("Server problem"));
  });
};

module.exports = BotCommands;
