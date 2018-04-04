var TelegramBot = require('node-telegram-bot-api');
var Books = require('./config/Books');
var ReadBooks = require('./config/ReadBooks');
var Users = require('./config/Users');
var BotCommands = require('./config/BotCommands');
// Токен телеграм-бота
var token = '488077289:AAHu1Tv8ITPDnicBMkjQDiczFHFDLlfoa30';
// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});

global.randomNumber = 0;

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

function botCommand (command, callback) {
  BotCommands.getCommandDescription(command, (description) => {
    callback(description);
  });
}

function recommendBook (rand, chatId) {
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
  var hiMessage = (msg.text.toString().toLowerCase().indexOf('hi') === 0);
  var helpMessage = (msg.text.toString().toLowerCase().indexOf('справка') === 0) || (msg.text.toString().indexOf('/help') === 0);
  var randomMessage = (msg.text.toString().toLowerCase().indexOf('рандом') === 0) || (msg.text.toString().indexOf('/random') === 0);
  var recommendMessage = (msg.text.toString().toLowerCase().indexOf('рекомендация') === 0) || (msg.text.toString().indexOf('/recommendation') === 0);
  var readMessage = (msg.text.toString().toLowerCase().indexOf('прочитанные') === 0) || (msg.text.toString().indexOf('/read') === 0);
  if (hiMessage) {
    bot.sendMessage(chatId, "Hello " + user + "!");
  } else if (msg.text.toString().indexOf('/start') === 0) {
    botCommand('start', function (description) {
      bot.sendMessage(chatId, description, { parse_mode: "HTML"});
    });
    Users.setUser(user, chatId);
  } else if (helpMessage) {
    botCommand('help', function (description) {
      bot.sendMessage(chatId, description, { parse_mode: "HTML" });
    });
  } else if (randomMessage) {
    var rand = randomInt(1, 422);
    randomBook(rand, function (bookData) {
      bot.sendMessage(chatId, "<b>Название книги:</b> " + bookData.name +
        "\n<b>Автор:</b> " + bookData.authors + "\n<b>Жанры:</b> " + bookData.genres +
        "\n<b>ISBN:</b> " + bookData.isbn + "\n<b>Рейтинг на сайте LiveLib:</b> " + bookData.rating +
        "\n<b>Описание книги:</b>\n" + bookData.description +
        "\n<a href='" + bookData.link + "'>Читать рецензии на сайте LiveLib</a>", { parse_mode: "HTML" }
      );
      var photo = bookData.cover;
      bot.sendPhoto(chatId, photo);
    })
  } else if (recommendMessage) {
    var rand = randomInt(1, 422);
    global.randomNumber = rand;
    recommendBook(rand, chatId);
    bot.on('callback_query', function (msg) {
      var answer = msg.data.split('_');
      var index = answer[0];
      if (index == 'dislike') {
        var rand = randomInt(1, 422);
        recommendBook(rand, chatId);
      } else if (index == 'read') {
        console.log(global.randomNumber);
        ReadBooks.setBook(chatId, global.randomNumber);
        var rand = randomInt(1, 422);
        global.randomNumber = rand;
        recommendBook(rand, chatId);
      } else if (index == 'like') {
        bot.sendMessage(chatId, "Вам нравится эта книга!");
      }
    });
  } else if (readMessage) {
    ReadBooks.getListReadBooks(chatId, function (books) {
      console.log(books);
      var text = '';
      for (var i = 0; i < books.length; i++) {
        text += books[i].name;
        text += '\n';
      }
      var options = {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{text: books[0].name, callback_data: books[0].id}]
          ]
        })
      }
      console.log(options);
      bot.sendMessage(chatId, text);
    });
    bot.sendMessage(chatId, "Здесь будут выводиться ваши прочитанные книги");
  } else {
    bot.sendMessage(chatId, "I don't understand you, " + user + "! Sorry");
  }
});
