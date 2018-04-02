var TelegramBot = require('node-telegram-bot-api');
var Books = require('./config/Book');
var BotCommands = require('./config/BotCommands');

function randomInt (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

function book (callback) {
  Books.getBook(25, (book) => {
  callback(book);
  });
}

function randomBook (number, callback) {
  var id = number;
  Books.getRandomBook(id, (bookData) => {
    callback(bookData);
  });
}

function countBooks () {
  Books.getCountOfBooks((count) => {
    return count;
  });
}

function bot_command (command, callback) {
  BotCommands.getCommandDescription(command, (description) => {
    callback(description);
  });
}

// Токен телеграм-бота
var token = '488077289:AAHu1Tv8ITPDnicBMkjQDiczFHFDLlfoa30';

// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  var chatId = msg.chat.id;
  var user = msg.chat.username;
  var hi = 'hi';
  if (msg.text.toString().toLowerCase().indexOf('hi') === 0) {
    bot.sendMessage(chatId, "Hello " + user + "!");
  } else if (msg.text.toString().indexOf('/start') === 0) {
    bot_command('start', (description) => {
      bot.sendMessage(chatId, description, { parse_mode: "HTML"});
    })
  } else if ((msg.text.toString().toLowerCase().indexOf('справка') === 0) || (msg.text.toString().toLowerCase().indexOf('/help') === 0)) {
    bot_command('help', (description) => {
      bot.sendMessage(chatId, description, { parse_mode: "HTML"});
    })
  } else if ((msg.text.toString().toLowerCase().indexOf('рандом') === 0) || (msg.text.toString().toLowerCase().indexOf('/random') === 0)) {
    var c = countBooks();
    var rand = randomInt(1, 422);
    randomBook(rand, (bookData) => {
      bot.sendMessage(chatId, "<b>Название книги:</b> " + bookData[0] +
        "\n<b>Автор:</b> " + bookData[1] + "\n<b>Жанры:</b> " + bookData[2] +
        "\n<b>ISBN:</b> " + bookData[3] + "\n<b>Рейтинг на сайте LiveLib:</b> " + bookData[4] +
        "\n<b>Описание книги:</b>\n" + bookData[5] +
        "\n<a href='" + bookData[6] + "'>Читать рецензии на сайте LiveLib</a>", {parse_mode: "HTML"}
      );
      var photo = bookData[7];
      bot.sendPhoto(chatId, photo);
    })
  } else if (msg.text.toString().indexOf('how are you?') === 0) {
    bot.sendMessage(chatId, "I'm fine, and you?");
  } else {
    bot.sendMessage(chatId, "I don't understand you, " + user + "! Sorry");
  }
});
