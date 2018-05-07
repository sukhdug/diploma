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
          func.welcome(user, chatId);
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
          func.unknown(chatId);
      }
    });
    bot.on('callback_query', function (callbackQuery) {
      const action = callbackQuery.data;
      const msg = callbackQuery.message;
      const telegramOptions = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
      };
      let text;

      if (action === 'list') {
        text = 'Edited Text';
        bot.editMessageText(text, telegramOptions);
      }
      if (action === 'other') {
        func.editRandomBook(telegramOptions);
      }
      if (action === 'imread') {
        func.setToReadRandomBook(telegramOptions);
      }
      if (action === 'next') {
        func.showNextSavedBooks(telegramOptions);
      }
      if (action === 'prev') {
        func.showPrevSavedBooks(telegramOptions);
      }

      //bot.editMessageText(text, opts);
    });

  }).catch(function () {
    exit('Error starting the Bot... maybe the TOKEN is wrong?');
  });

  return bot;
}
