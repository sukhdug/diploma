'use strict';

var BotCommand = require('./../entity/BotCommand');

exports.getCommandDescription = function(command, callback) {
  BotCommand.findOne({where: {command: command}}).then(command => {
    callback(command.description);
  });
};