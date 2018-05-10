'use strict';

var Books = require('./model/Books');
var ReadBooks = require('./model/ReadBooks');
var LikedBooks = require('./model/LikedBooks');
var Users = require('./model/Users');
var Reviews = require('./model/Reviews');
var BotCommands = require('./model/BotCommands');
var Recommendation = require('./recommendation');
var RecommendedBooks = require('./model/RecommendedBooks');

// создаем экземпляры моделей
var books = new Books();
var botCommands = new BotCommands();
var users = new Users();
var likedBooks = new LikedBooks();
var readBooks = new ReadBooks();
var recommendedBooks = new RecommendedBooks();
var reviews = new Reviews();
var recommendation = new Recommendation();

function BotFunctions() {
  this._randBook = 0;
  this._recommendBookId = 0;
  this._likedBooksOptions = {};
  this._readBooksOptions = {};
  this._howSaved = [];
}

function randomInt(min, max) {
  var num = min - 0.5 + Math.random() * (max - min + 1);
  num = Math.round(rand);
  return num;
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
  botCommands.getCommandDescription(command, (req, res) => {
    if (req) {
      callback(new Error("500 Server Error"));
    } else {
      callback(null, res);
    }
  });
}

BotFunctions.prototype.getRecommendationBook = function(userId, messageId, callback) {
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
  var savedBooksOptions = {};
  this._howSaved.push({
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
    this._likedBooksOptions = savedBooksOptions;
  } else if (howSave == "read") {
    this._readBooksOptions = savedBooksOptions;
  }
}

BotFunctions.prototype.showNextSavedBooks = function(params, callback) {
  var object = null;
  var chatId = params.chat_id;
  var options = {};
  var howSaved;
  console.log(this._howSaved);
  console.log(this._howSaved.length);
  for (var i = 0; i < this._howSaved.length; i++) {
    if (this._howSaved[i].user_id === params.chat_id && this._howSaved[i].message_id === params.message_id - 1) {
      if (this._howSaved[i].how_save === "liked") {
        object = new LikedBooks();
        options = this._likedBooksOptions;
        howSaved = 'liked';
      }
      if (this._howSaved[i].how_save === "read") {
        object = new ReadBooks();
        options = this._readBooksOptions;
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
  if (howSaved == 'read') this._readBooksOptions = options;
  if (howSaved == 'liked') this._likedBooksOptions = options;
}

BotFunctions.prototype.showPrevSavedBooks = function(params, callback) {
  var object = null;
  var chatId = params.chat_id;
  var options = {};
  var howSaved;
  for (var i = 0; i < this._howSaved.length; i++) {
    if (this._howSaved[i].user_id === params.chat_id && this._howSaved[i].message_id === params.message_id - 1) {
      if (this._howSaved[i].how_save === "liked") {
        object = new LikedBooks();
        options = this._likedBooksOptions;
        howSaved = 'liked';
      }
      if (this._howSaved[i].how_save === "read") {
        object = new ReadBooks();
        options = this._readBooksOptions;
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
  if (howSaved == 'read') this._readBooksOptions = options;
  if (howSaved == 'liked') this._likedBooksOptions = options;
}

BotFunctions.prototype.getRandomBook = function(chatId, callback) {
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
  this._randBook = rand;
  var send = displayBook(rand, function (text) {
    var getData = {
      text: text,
      buttons: options
    }
    callback(getData);
  });
}

BotFunctions.prototype.editRandomBook = function(params, callback) {
  var buttons = [
    [{ text: "показать другую", callback_data: "other"}],
    [{ text: "сохранить", callback_data: "save"},
    { text: "читал(а)", callback_data: "imread"}]
  ];
  var options = buildInlineKeyboards(buttons);
  var rand = randomInt(1, 422);
  this._randBook = rand;
  var addedToRead = this.addedToRead;
  displayBook(rand, function (text) {
    var data = {
      text: text,
      buttons: options,
      read: (addedToRead === 1 ? true : false)
    }
    callback(data);
  });
  this.addedToRead = 0;
}

BotFunctions.prototype.setToReadRandomBook = function(params, callback) {
  var buttons = [
    [{ text: "показать другую", callback_data: "other"}],
    [{ text: "сохранить", callback_data: "save" }],
    [{ text: "добавлено в прочитанные", callback_data: "..."}]
  ];
  var options = buildInlineKeyboards(buttons);
  this.addedToRead = 1;
  var bookId = this._randBook;
  readBooks.setBook(params.chat_id, bookId);
  var options = buildInlineKeyboards(buttons);
  callback(options);
}

module.exports = BotFunctions;
