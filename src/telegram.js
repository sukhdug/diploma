'use strict';

var TelegramBot = require('node-telegram-bot-api');
var Functions = require('./bot_functions');

// helper function -> exit with error
var exit = function (msg) {
    console.error(msg);
    throw new Error(msg);
};

module.exports = function(token, options) {
  options = options || {};

  // check variables
  if (!token) {
    exit('Please add a TOKEN env variable with the TelegramBot token');
  }

  // check if the bot should use a webHook
  var webHook = options.webHook;

  // set bot mode (polling vs webHook) depending ok the environment
  var botOptions = {};
  if (webHook) {
    botOptions.webHook = {
      port: options.port || 5000,
      host: '0.0.0.0'
    };
  } else {
    botOptions.polling = true;
  }

  // create Bot
  var bot = new TelegramBot(token, botOptions);
  if (webHook) {
    bot.setWebHook(webHook + ':443/bot' + token);
  }

  var func = new Functions(bot);

  bot.getMe().then( function (me) {
    var botName =  '@' + me.username;
    bot.on('text', function (msg) {
      var command = msg.text.replace(botName, '');
      var chatId = msg.chat.id;
      var user = msg.chat.username;
      switch (command) {
        case '/start':
          func.welcome(chatId);
          break;
        case '/help':
          func.help(chatId);
          break;
        case '/recommendation':
          func.showRecommendation(chatId);
          break;
        case '/random':
          func.showRandomBook(chatId);
          break;
        case '/read':
          func.showSavedBooks(chatId, 'read');
          break;
        case '/like':
          func.showSavedBooks(chatId, 'liked');
          break;
        default:
          bot.sendMessage(chatId, "I don't understand you, " + user + "! Sorry");
      }
    });
  }).catch(function () {
    exit('Error starting the Bot... maybe the TOKEN is wrong?');
  });
  // add function to reset the bot
  bot.reset = function () {
    return redis.clear();
  };

  return bot;
}
