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

  // проверка, задан токен бота или нет
  if (!token) {
    exit('Please add a TOKEN env variable with the TelegramBot token');
  }

  // check if the bot should use a webHook
  // проверка, если бот будет работать в режиме webHook
  var webHook = options.webHook;

  // set bot mode (polling vs webHook) depending ok the environment
  // здесь задаем, в каком режиме (polling vs webHook) будет работать бот
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
  // В Functions() находятся все функции, которые возвращают callbackом
  // все данные, необходимые для отправки сообщений пользователю
  var func = new Functions();

  bot.getMe().then( function (me) {
    var botName =  '@' + me.username;

    bot.onText(/\/search ([а-яА-Я]+)/, function (msg, match) {
      var chatId = msg.chat.id;
      var searchBook = match[1];
      func.getFoundBooks(searchBook, function (req, res) {
        if (req) {
          console.log(req);
          bot.sendMessage(chatId, "500 Server Error! Sorry :-(");
        } else {
          bot.sendMessage(chatId, res, { parse_mode: "HTML" });
        }
      });
    });

    bot.on('text', function (msg) {
      var command = msg.text.replace(botName, '');
      var chatId = msg.chat.id;
      var user = msg.chat.username;
      switch (command) {
        case '/start':
          func.getCommandResult('start', function (req, res) {
            if (req) {
              console.log(req);
              bot.sendMessage(chatId, "500 Server Error! Sorry :-(", { parse_mode: "HTML" });
            } else {
              bot.sendMessage(chatId, res, { parse_mode: "HTML" });
            }
          });
          break;
        case '/help':
          func.getCommandResult('help', function (req, res) {
            if (req) {
              console.log(req);
              bot.sendMessage(chatId, "500 Server Error! Sorry :-(", { parse_mode: "HTML" });
            } else {
              bot.sendMessage(chatId, res, { parse_mode: "HTML" });
            }
          });
          break;
        case '/recommendation':
          var messageId = msg.message_id + 1;
          func.getRecommendationBook(chatId, messageId, function (req, res) {
            if (req) {
              console.log(req);
              bot.sendMessage(chatId, "500 Server Error! Sorry :-(", { parse_mode: "HTML" });
            } else {
              bot.sendMessage(chatId, res.text, { parse_mode: "HTML" });
              setTimeout( function () {
                bot.sendMessage(chatId, "Выберите, чтобы получить еще рекомендацию", res.buttons);
              }, 1000);
            }
          });
          break;
        case '/random':
          func.getRandomBook(function (req, res) {
            if (req) {
              console.log(req);
              bot.sendMessage(chatId, "404 Книга не найдена", { parse_mode: "HTML" });
            } else {
              console.log(res);
              bot.sendMessage(chatId, res.text, { parse_mode: "HTML" });
              setTimeout( function() {
                bot.sendMessage(chatId, "Выберите один из вариантов", res.buttons);
              }, 1000);
            }
          });
          break;
        case '/read':
          var messageId = msg.message_id + 1;
          func.getSavedBooks(chatId, messageId, 'read', function (req, res) {
            if (req) {
              console.log(req);
              bot.sendMessage(chatId, "К сожалению, сервер не нашел книг. Попробуйте сохранить книги в этот раздел.");
            } else {
              bot.sendMessage(chatId, res.text, { parse_mode: "HTML" });
              if (res.length > 1) {
                setTimeout( function() {
                  bot.sendMessage(chatId, "Ваши прочитанные книги", res.buttons);
                }, 1000);
              }
            }
          });
          break;
        case '/like':
          var messageId = msg.message_id + 1;
          func.getSavedBooks(chatId, messageId, 'liked', function (req, res) {
            if (req) {
              console.log(req);
              bot.sendMessage(chatId, "К сожалению, сервер не нашел книг. Попробуйте сохранить книги в этот раздел");
            } else {
              if (res.length > 1) {
                bot.sendMessage(chatId, res.text, { parse_mode: "HTML" });
                setTimeout( function() {
                  bot.sendMessage(chatId, "Ваши понравившиеся книги", res.buttons);
                }, 1000);
              }
            }
          });
          break;
        case '/search':
          bot.sendMessage(chatId, "Чтобы найти книги по названию, отправьте сообщение /search [название книги]\n" +
          "например, /search Жизнь Галилея");
          break;
        //default:
        //  bot.sendMessage(chatId, "К сожалению, бот не понимает Вас! Чтобы просмотреть доступные команды, введите /help. Спасибо!");
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
        func.editRandomBook(function (req, res) {
          if (req) {
            console.log(req);
            bot.editMessageText("Ошибка сервера! Попробуйте позже", { message_id: telegramOptions.message_id - 1, chat_id: telegramOptions.chat_id , parse_mode: "HTML"});
          } else {
            bot.editMessageText(res.text, { message_id: telegramOptions.message_id - 1, chat_id: telegramOptions.chat_id , parse_mode: "HTML"});
            if (res.read) {
              bot.editMessageReplyMarkup( res.buttons.reply_markup, { message_id: telegramOptions.message_id, chat_id: telegramOptions.chat_id });
            }
          }
        });
      }
      if (action === 'imread') {
        func.setToReadRandomBook(telegramOptions, function (req, res) {
          if (req) {
            console.log(req);
            bot.editMessageText("Ошибка сервера! Попробуйте позже", { message_id: telegramOptions.message_id - 1, chat_id: telegramOptions.chat_id , parse_mode: "HTML"});
          } else {
            bot.editMessageReplyMarkup( res.reply_markup, { message_id: telegramOptions.message_id, chat_id: telegramOptions.chat_id });
          }
        });
      }
      if (action === 'next') {
        func.showNextSavedBooks(telegramOptions, function (req, res) {
          if (req) {
            console.log(req);
            bot.sendMessage(chatId, "500 Server Error! Sorry :-(", { parse_mode: "HTML" });
          } else {
            bot.editMessageText(res, { message_id: telegramOptions.message_id - 1, chat_id: telegramOptions.chat_id, parse_mode: "HTML" });
          }
        });
      }
      if (action === 'prev') {
        func.showPrevSavedBooks(telegramOptions, function (req, res) {
          if (req) {
            console.log(req);
            bot.sendMessage(chatId, "500 Server Error! Sorry :-(", { parse_mode: "HTML" });
          } else {
            bot.editMessageText(res, { message_id: telegramOptions.message_id - 1, chat_id: telegramOptions.chat_id, parse_mode: "HTML" });
          }
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

    bot.on('polling_error', (error) => {
      console.log(error.code);
    });

  }).catch(function () {
    exit('Error starting the Bot... maybe the TOKEN is wrong?');
  });

  return bot;
}
