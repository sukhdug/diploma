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
  this.howSaved = [];
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

BotFunctions.prototype.getCommandResult = function(command, callback) {
  botCommands.getCommandDescription(command, (description) => {
    callback(description);
  });
}

BotFunctions.prototype.getRecommendationBook = function(userId, messageId, callback) {
  var bot = this.bot;
  var buttons = [
    [{ text: 'нравится', callback_data: 'like'}],
    [{ text: 'читал (а)', callback_data: 'read'}],
    [{ text: 'не нравится', callback_data: 'dislike'}]
  ];
  var options = buildInlineKeyboards(buttons);
  recommendation.getRecommendBook(userId, messageId, function (book) {
    var id = book.id;
    displayBook(id, function (text) {
      var getData = {
        text: text,
        buttons: options
      }
      callback(getData);
    });
  });
}

BotFunctions.prototype.getSavedBooks = function(chatId, messageId, howSave, callback) {
  var object = null;
  var bot = this.bot;
  var savedBooksOptions = {};
  this.howSaved.push({
    how_save: howSave,
    user_id: chatId,
    message_id: messageId
  });
  if (howSave == "liked") {
    object = new LikedBooks();
  } else if (howSave == "read") {
    object = new ReadBooks();
  }
  object.getListUserBooks(chatId, function (books) {
    if (books == 'empty') {
      console.log(books);
      var empty = "У Вас пока нет сохраненных книг в ";
      callback(empty);
    } else {
      var buttons = [
        [
          { text: "<<", callback_data: "prev"},
          { text: "список", callback_data: "list" },
          { text: ">>", callback_data: "next"}
        ]
      ];
      var options = buildInlineKeyboards(buttons);
      var id = books[0].id;
      for (var i = 0; i < books.length; i++) {
        if (i == 1) {
          savedBooksOptions.next = books[i].id;
          savedBooksOptions.nextId = i;
        }
        if (i == books.length - 1) {
          savedBooksOptions.prev = books[i].id;
          savedBooksOptions.prevId = i;
        }
      }
      displayBook(id, function (text) {
        var getData = {
          text: text,
          buttons: options
        }
        callback(getData);
      });
    }
  });
  if (howSave == "liked") {
    this.likedBooksOptions = savedBooksOptions;
  } else if (howSave == "read") {
    this.readBooksOptions = savedBooksOptions;
  }
}

BotFunctions.prototype.showNextSavedBooks = function(params, callback) {
  var object = null;
  var chatId = params.chat_id;
  var options = {};
  var howSaved;
  console.log(this.howSaved);
  console.log(this.howSaved.length);
  for (var i = 0; i < this.howSaved.length; i++) {
    if (this.howSaved[i].user_id === params.chat_id && this.howSaved[i].message_id === params.message_id - 1) {
      if (this.howSaved[i].how_save === "liked") {
        object = new LikedBooks();
        options = this.likedBooksOptions;
        howSaved = 'liked';
      }
      if (this.howSaved[i].how_save === "read") {
        object = new ReadBooks();
        options = this.readBooksOptions;
        howSaved = 'read';
      }
    }
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
    displayBook(id, function (text) {
      callback(text);
    });
  });
  if (howSaved == 'read') this.readBooksOptions = options;
  if (howSaved == 'liked') this.likedBooksOptions = options;
}

BotFunctions.prototype.showPrevSavedBooks = function(params, callback) {
  var object = null;
  var chatId = params.chat_id;
  var options = {};
  var howSaved;
  console.log(this.howSaved);
  console.log(this.howSaved.length);
  for (var i = 0; i < this.howSaved.length; i++) {
    if (this.howSaved[i].user_id === params.chat_id && this.howSaved[i].message_id === params.message_id - 1) {
      if (this.howSaved[i].how_save === "liked") {
        object = new LikedBooks();
        options = this.likedBooksOptions;
        howSaved = 'liked';
      }
      if (this.howSaved[i].how_save === "read") {
        object = new ReadBooks();
        options = this.readBooksOptions;
        howSaved = 'read';
      }
    }
  }
  object.getListUserBooks(chatId, function (books) {
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
    displayBook(id, function (text) {
      callback(text);
    });
  });
  if (howSaved == 'read') this.readBooksOptions = options;
  if (howSaved == 'liked') this.likedBooksOptions = options;
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
