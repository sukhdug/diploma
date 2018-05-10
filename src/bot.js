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
          func.getCommandResult('start', function (res) {
            bot.sendMessage(chatId, res, { parse_mode: "HTML" });
          });
          break;
        case '/help':
          func.getCommandResult('help', function (res) {
            console.log(msg);
            bot.sendMessage(chatId, res, { parse_mode: "HTML" });
          });
          break;
        case '/recommendation':
          var messageId = msg.message_id + 1;
          func.getRecommendationBook(chatId, messageId, function (res) {
            bot.sendMessage(chatId, res.text, { parse_mode: "HTML" });
            setTimeout( function () {
              bot.sendMessage(chatId, "Выберите, чтобы получить еще рекомендацию", res.buttons);
            }, 1000);
          });
          break;
        case '/random':
          func.getRandomBook(chatId, function (res) {
            bot.sendMessage(chatId, res.text, { parse_mode: "HTML" });
            setTimeout( function() {
              bot.sendMessage(chatId, "Выберите один из вариантов", res.buttons);
            });
          });
          break;
        case '/read':
          var messageId = msg.message_id + 1;
          func.getSavedBooks(chatId, messageId, 'read', function (res) {
            bot.sendMessage(chatId, res.text, { parse_mode: "HTML" });
            setTimeout( function() {
              bot.sendMessage(chatId, "Выберите прочитанные книги", res.buttons);
            });
          });
          break;
        case '/like':
          var messageId = msg.message_id + 1;
          func.getSavedBooks(chatId, messageId, 'liked', function (res) {
            bot.sendMessage(chatId, res.text, { parse_mode: "HTML" });
            setTimeout( function() {
              bot.sendMessage(chatId, "Ваши понравившиеся книг", res.buttons);
            });
          });
          break;
        default:
          bot.sendMessage(chatId, "К сожалению, бот не понимает Вас! Чтобы просмотреть доступные команды, введите /help. Спасибо!");
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
        func.showNextSavedBooks(telegramOptions, function (res) {
          bot.editMessageText(res, { message_id: telegramOptions.message_id - 1, chat_id: telegramOptions.chat_id, parse_mode: "HTML" });
        });
      }
      if (action === 'prev') {
        func.showPrevSavedBooks(telegramOptions, function (res) {
          bot.editMessageText(res, { message_id: telegramOptions.message_id - 1, chat_id: telegramOptions.chat_id, parse_mode: "HTML" });
        });
      }
      if (action === 'like') {

      }
      if (action === 'read') {

      }
      if (action === 'dislike') {
        func.editRecommendBook(telegramOptions, 'dislike');
      }

    });

  }).catch(function () {
    exit('Error starting the Bot... maybe the TOKEN is wrong?');
  });

  return bot;
}
