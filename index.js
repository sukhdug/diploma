var TelegramBot = require('node-telegram-bot-api');
var Books = require('./config/Book');
var ReadBooks = require('./config/ReadBooks');
var BotCommands = require('./config/BotCommands');
// Токен телеграм-бота
var token = '488077289:AAHu1Tv8ITPDnicBMkjQDiczFHFDLlfoa30';
// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});

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

function read_book (chatId, bookId) {
  ReadBooks.setBook(chatId, bookId);
}

function recommend_book (rand, chatId) {
  var options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'нравится', callback_data: 'like' }],
          [{ text: 'читал (а)', callback_data: 'read' }],
          [{ text: 'не нравится', callback_data: 'dislike' }]
        ],
        parse_mode: "Markdown",
      })
    };
    randomBook(rand, function (bookData) {
      bot.sendMessage(chatId, "<b>Название книги:</b> " + bookData.name +
        "\n<b>Автор:</b> " + bookData.authors + "\n<b>Жанры:</b> " + bookData.genres +
        "\n<b>ISBN:</b> " + bookData.isbn + "\n<b>Рейтинг на сайте LiveLib:</b> " + bookData.rating +
        "\n<b>Описание книги:</b>\n" + bookData.description +
        "\n<a href='" + bookData.link + "'>Читать рецензии на сайте LiveLib</a>", { parse_mode: "HTML" }
      );
      bot.sendMessage(chatId, "Выберите, чтобы получить еще рекомендацию", options);
    });
}

bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  var user = msg.chat.username;
  var hi = 'hi';
  if (msg.text.toString().toLowerCase().indexOf('hi') === 0) {
    bot.sendMessage(chatId, "Hello " + user + "!");
  } else if (msg.text.toString().indexOf('/start') === 0) {
    bot_command('start', (description) => {
      bot.sendMessage(chatId, description, { parse_mode: "HTML"});
      bot.sendMessage(chatId, chatId);
    })
  } else if ((msg.text.toString().toLowerCase().indexOf('справка') === 0) || (msg.text.toString().toLowerCase().indexOf('/help') === 0)) {
    bot_command('help', (description) => {
      bot.sendMessage(chatId, description, { parse_mode: "HTML"});
    })
  } else if ((msg.text.toString().toLowerCase().indexOf('рандом') === 0) || (msg.text.toString().toLowerCase().indexOf('/random') === 0)) {
    var c = countBooks();
    var rand = randomInt(1, 422);
    randomBook(rand, function (bookData) {
      bot.sendMessage(chatId, "<b>Название книги:</b> " + bookData.name +
        "\n<b>Автор:</b> " + bookData.authors + "\n<b>Жанры:</b> " + bookData.genres +
        "\n<b>ISBN:</b> " + bookData.isbn + "\n<b>Рейтинг на сайте LiveLib:</b> " + bookData.rating +
        "\n<b>Описание книги:</b>\n" + bookData.description +
        "\n<a href='" + bookData.link + "'>Читать рецензии на сайте LiveLib</a>", {parse_mode: "HTML"}
      );
      var photo = bookData.cover;
      bot.sendPhoto(chatId, photo);
    })
  } else if ((msg.text.toString().toLowerCase().indexOf('рекомендация') === 0) || (msg.text.toString().toLowerCase().indexOf('/recommendation') === 0)) {
    var rand = randomInt(1, 422);
    recommend_book(rand, chatId);
    bot.on('callback_query', function (msg) {
      var answer = msg.data.split('_');
      var index = answer[0];
      if (index == 'dislike') {
        var rand = randomInt(1, 422);
        console.log(rand);
        recommend_book(rand, chatId);
      } else if (index == 'read') {
        console.log(rand);
        //read_book (chatId, rand);
        var rand = randomInt(1, 422);
        recommend_book(rand, chatId);
      } else if (index == 'like') {
        bot.sendMessage(chatId, "Вам нравится эта книга!");
      }
    });
  } else if (msg.text.toString().indexOf('how are you?') === 0) {
    bot.sendMessage(chatId, "I'm fine, and you?");
  } else {
    bot.sendMessage(chatId, "I don't understand you, " + user + "! Sorry");
  }
});
