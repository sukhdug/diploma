'use strict';

var Books = require('./model/Books');
var ReadBooks = require('./model/ReadBooks');
var LikedBooks = require('./model/LikedBooks');
var Users = require('./model/Users');
var Reviews = require('./model/Reviews');
var BotCommands = require('./model/BotCommands');
var Recommendation = require('./recommendation');
var RecommendedBooks = require('./model/RecommendedBooks');

global.randomNumber = 0;
global.recommendBookId = 0;
global.recommendBookReaderId = 0;
global.recommendedBookBookId = 0;
global.bookId = 0; // ID рекомендованной книги

// создаем экземпляры моделей
var books = new Books();
var botCommands = new BotCommands();
var users = new Users();
var likedBooks = new LikedBooks();
var readBooks = new ReadBooks();
var recommendedBooks = new RecommendedBooks();
var reviews = new Reviews();
var recommendation = new Recommendation();

// переменная хранит значение рандомного числа
var randNumber = 0;

// переменная хранит id рекомендованной книги
var recommendBookId = 0;

function BotFunctions(bot) {
  this.bot = bot;
  this.randBook = 0;
  this.recommendBookId = 0;
  this.likedBooksOptions = {};
  this.readBooksOptions = {};
  this.booksArray = [];
  this.readBooksArray = [];
  this.likedBooksArray = [];
  this.howSaved = '';
}

function randomInt(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function displayBook(id, callback) {
  books.getBook(id, (bookArray) => {
    var text = "<b>Название книги:</b> " + bookArray.name +
        "\n<b>Автор:</b> " + bookArray.authors + "\n<b>Жанры:</b> " + bookArray.genres +
        "\n<b>Описание книги:</b>\n" + bookArray.description +
        "\n<a href='" + bookArray.link + "'>Читать рецензии на сайте LiveLib</a>";
    callback(text);
  });
}

function buildInlineKeyboards(buttons) {
  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: buttons,
      parse_mode: "HTML"
    })
  }
  return options;
}

BotFunctions.prototype.welcome = function(user, chatId, callback) {
  //var bot = this.bot;
  botCommands.getCommandDescription('start', (description) => {
    callback(description);
  });
  users.setUser(user, chatId);
}

BotFunctions.prototype.help = function(chatId, callback) {
  //var bot = this.bot;
  botCommands.getCommandDescription('help', (description) => {
    callback(description);
  });
}

BotFunctions.prototype.unknown = function(chatId) {
  //var bot = this.bot;
  //bot.sendMessage(chatId, "К сожалению, бот не понимает Вас! Чтобы просмотреть доступные команды, введите /help. Спасибо!");
}

BotFunctions.prototype.getRecommendationBook = function(chatId, callback) {
  var bot = this.bot;
  var buttons = [
    [{ text: 'нравится', callback_data: 'like'}],
    [{ text: 'читал (а)', callback_data: 'read'}],
    [{ text: 'не нравится', callback_data: 'dislike'}]
  ];
  var options = buildInlineKeyboards(buttons);
  recommendation.getRecommendBook(chatId, function (book) {
    var id = book.id;
    displayBook(id, function (text) {
      var getData = {
        text: text,
        buttons: options
      }
      callback(getData);
      /*bot.sendMessage(chatId, text, { parse_mode: "HTML" });
      setTimeout( function () {
        bot.sendMessage(chatId, "Выберите, чтобы получить еще рекомендацию", options);
      }, 1000);*/
    });
  });
}

BotFunctions.prototype.getSavedBooks = function(chatId, howSave, callback) {
  var object = null;
  var bot = this.bot;
  var savedBooksOptions = {};
  var booksArray;
  var howSaved = '';
  if (howSave == "liked") {
    object = new LikedBooks();
    howSaved = "понравившиеся";
  } else if (howSave == "read") {
    object = new ReadBooks();
    howSaved = "прочитанные";
  }
  object.getListUserBooks(chatId, function (books) {
    if (books == 'empty') {
      console.log(books);
      bot.sendMessage(chatId, 'У Вас пока нет сохраненных книг в ' + howSaved);
    } else {
      console.log(books);
      var buttons = [
        [
          { text: "<<", callback_data: "prev"},
          { text: "список", callback_data: "list" },
          { text: ">>", callback_data: "next"}
        ]
      ];
      var options = buildInlineKeyboards(buttons);
      var id = books[0].id;
      savedBooksOptions.booksLength = books.length;
      for (var i = 0; i < savedBooksOptions.booksLength; i++) {
        if (i == 1) {
          savedBooksOptions.next = books[i].id;
          savedBooksOptions.nextId = i;
        }
        if (i == savedBooksOptions.booksLength - 1) {
          savedBooksOptions.prev = books[i].id;
          savedBooksOptions.prevId = i;
        }
      }
      displayBook(id, function (text) {
        callback(text);
        /*bot.sendMessage(chatId, text, { parse_mode: "HTML" });
        if (savedBooksOptions.booksLength > 1) {
          setTimeout( function () {
            bot.sendMessage(chatId, "Ваши " + howSaved + " книги", options);
          }, 1000);
        }*/
      });
    }
  });
  if (howSave == "liked") {
    this.howSaved = "понравившиеся";
    this.likedBooksOptions = savedBooksOptions;
  } else if (howSave == "read") {
    this.howSaved = "прочитанные";
    this.readBooksOptions = savedBooksOptions;
  }
}

BotFunctions.prototype.showNextSavedBooks = function(params) {
  var object = null;
  var bot = this.bot;
  var howSaved = this.howSaved;
  var chatId = params.chat_id;
  var options = {};
  if (howSaved == 'прочитанные') {
    object = new ReadBooks();
    options = this.readBooksOptions;
  }
  if (howSaved == 'понравившиеся') {
    object = new LikedBooks();
    options = this.likedBooksOptions;
  }
  object.getListUserBooks(chatId, function (books) {
    console.log(books);
    var id = options.next;
    for (var i = 0; i < books.length; i++) {
      if (i === options.nextId && options.nextId === books.length - 1) {
        options.nextId = 0;
        var j = Math.abs(i - 2);
        options.prevId = j;
        options.next = books[0].id;
        options.prev = books[j].id;
        break;
      } if (i === options.nextId && options.nextId === 0) {
        options.nextId = i + 1;
        options.prevId = books.length - 1;
        options.next = books[i + 1].id;
        options.prev = books[books.length - 1].id;
        break;
      } else if (i === options.nextId) {
        options.nextId = i + 1;
        options.prevId = i - 1;
        options.next = books[i + 1].id;
        options.prev = books[i - 1].id;
        break;
      }
    }
    var send = displayBook(id, function (text) {
        bot.editMessageText(text, { message_id: params.message_id - 1, chat_id: chatId, parse_mode: "HTML" });
      });
  });
  if (howSaved == 'прочитанные') this.readBooksOptions = options;
  if (howSaved == 'понравившиеся') this.likedBooksOptions = options;
}

BotFunctions.prototype.showPrevSavedBooks = function(params) {
  var object = null;
  var bot = this.bot;
  var howSaved = this.howSaved;
  var chatId = params.chat_id;
  var options = {};
  if (howSaved == 'прочитанные') {
    object = new ReadBooks();
    options = this.readBooksOptions;
  }
  if (howSaved == 'понравившиеся') {
    object = new LikedBooks();
    options = this.likedBooksOptions;
  }
  object.getListUserBooks(chatId, function (books) {
    console.log(books);
    var id = options.prev;
    for (var i = 0; i < books.length; i++) {
      if (i === options.prevId && options.prevId === 0) {
        options.nextId = i + 1;
        options.prevId = books.length - 1;
        options.next = books[i + 1].id;
        options.prev = books[books.length - 1].id;
        break;
      } if (i === options.prevId && options.prevId === books.length - 1) {
        options.nextId = 0;
        options.prevId = i - 1;
        options.next = books[0].id;
        options.prev = books[i - 1].id;
        break;
      } else if (i === options.prevId) {
        options.nextId = i + 1;
        options.prevId = i - 1;
        options.next = books[i + 1].id;
        options.prev = books[i - 1].id;
        break;
      }
    }
    var send = displayBook(id, function (text) {
        bot.editMessageText(text, { message_id: params.message_id - 1, chat_id: chatId, parse_mode: "HTML" });
      });
  });
  if (howSaved == 'прочитанные') this.readBooksOptions = options;
  if (howSaved == 'понравившиеся') this.likedBooksOptions = options;
}

BotFunctions.prototype.getRandomBook = function(chatId, callback) {
  var bot =  this.bot;
  var readBooks = new ReadBooks();
  var buttons = [
    [{ text: "показать другую", callback_data: "other"}],
    [{ text: "сохранить", callback_data: "save"},
     { text: "читал(а)", callback_data: "imread"}]
  ];
  var options = buildInlineKeyboards(buttons);
  var addedToRead = 0;
  var addedToSave = 0;
  var rand = randomInt(1, 422);
  this.randBook = rand;
  var send = displayBook(rand, function (text) {
    var getData = {
      text: text,
      buttons: options
    }
    callback(getData);
    /*bot.sendMessage(chatId, text, { parse_mode: "HTML" });
    setTimeout( function () {
      bot.sendMessage(chatId, "Выберите", options);
    }, 1000);*/
  });
}

BotFunctions.prototype.editRandomBook = function(params) {
  var bot =  this.bot;
  var buttons = [
    [{ text: "показать другую", callback_data: "other"}],
    [{ text: "сохранить", callback_data: "save"},
    { text: "читал(а)", callback_data: "imread"}]
  ];
  var options = buildInlineKeyboards(buttons);
  var rand = randomInt(1, 422);
  this.randBook = rand;
  var send = displayBook(rand, function (text) {
    bot.editMessageText(text, { message_id: params.message_id - 1, chat_id: params.chat_id , parse_mode: "HTML"});
  });
  if (this.addedToRead == 1) {
    bot.editMessageReplyMarkup( options.reply_markup, { message_id: params.message_id, chat_id: params.chat_id });
    this.addedToRead = 0;
  }
}

BotFunctions.prototype.setToReadRandomBook = function(params) {
  var bot =  this.bot;
  var buttons = [
    [{ text: "показать другую", callback_data: "other"}],
    [{ text: "сохранить", callback_data: "save" }],
    [{ text: "добавлено в прочитанные", callback_data: "..."}]
  ];
  var options = buildInlineKeyboards(buttons);
  this.addedToRead = 1;
  var bookId = this.randBook;
  readBooks.setBook(params.chat_id, bookId);
  var options = buildInlineKeyboards(buttons);
  bot.editMessageReplyMarkup( options.reply_markup, { message_id: params.message_id, chat_id: params.chat_id });
}

module.exports = BotFunctions;
