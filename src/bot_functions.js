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
  this._addedToRead = 0;
  this._recommendBook = [];
  this._likedBooksOptions = {};
  this._readBooksOptions = {};
  this._howSaved = [];
}

function randomInt(min, max) {
  var num = min - 0.5 + Math.random() * (max - min + 1);
  num = Math.round(num);
  return num;
}

function displayBook(id, callback) {
  books.getBook(id, function (err, bookArray) {
    if (err) {
      console.log(err);
      callback(new Error("Книга не найдена"));
    } else {
      var text = "<b>Название книги:</b> " + bookArray.name +
          "\n<b>Автор:</b> " + bookArray.authors + "\n<b>Жанры:</b> " + bookArray.genres +
          "\n<b>Описание книги:</b>\n" + bookArray.description +
          "\n<a href='" + bookArray.link + "'>Читать рецензии на сайте LiveLib</a>";
      callback(null, text);
    }
  });
}

function buildInlineKeyboards(buttons) {
  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: buttons,
      parse_mode: "HTML"
    }),
    parse_mode: "HTML"
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
  var recommend = [];
  var options = buildInlineKeyboards(buttons);
  recommendation.getRecommendBook(userId, messageId, function (book) {
    var id = book.id;
    recommend.push({
      message_id: messageId,
      user_id: userId,
      book_id: id
    });
    displayBook(id, function (err, text) {
      if (err) {
        callback(new Error("Server error"));
      } else {
        var getData = {
          text: text,
          buttons: options
        }
        callback(null, getData);
      }
    });
  });
  this._recommendBook = recommend;
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
  object.getListUserBooks(chatId, function (err, books) {
    if (err) {
      callback(new Error("500 Server Error"));
    } else {
      var buttons = [
        [
          { text: "<<", callback_data: "prev"},
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
      displayBook(id, function (err, text) {
        if (err) {
          callback(new Error("Server problem"));
        } else {
          var getData = {
            text: text,
            length: books.length,
            options: options
          }
          callback(null, getData);
        }
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
  object.getListUserBooks(chatId, function (err, books) {
    if (err) {
      callback(new Error("500 Server Error"));
    } else {
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
      displayBook(id, function (err, text) {
        if (err) {
          callback(new Error("Server problem"));
        } else {
          callback(null, text);
        }
      });
    }
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
  object.getListUserBooks(chatId, function (err, books) {
    if (err) {
      callback(new Error("500 Server Error"));
    } else {
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
      displayBook(id, function (err, text) {
        if (err) {
          callback(new Error("Server problem"));
        } else {
          callback(null, text);
        }
      });
    }
  });
  if (howSaved == 'read') this._readBooksOptions = options;
  if (howSaved == 'liked') this._likedBooksOptions = options;
}

BotFunctions.prototype.getRandomBook = function(callback) {
  var buttons = [
    [{ text: "показать другую", callback_data: "other"}],
    [{ text: "сохранить", callback_data: "save"},
     { text: "читал(а)", callback_data: "imread"}]
  ];
  var options = buildInlineKeyboards(buttons);
  var rand = randomInt(1, 422);
  this._randBook = rand;
  displayBook(rand, function (err, text) {
    if (err) {
      callback(new Error("Server problem"));
    } else {
      var getData = {
        text: text,
        buttons: options
      }
      console.log(getData);
      callback(null, getData);
    }
  });
}

BotFunctions.prototype.editRandomBook = function(callback) {
  var buttons = [
    [{ text: "показать другую", callback_data: "other"}],
    [{ text: "сохранить", callback_data: "save"},
    { text: "читал(а)", callback_data: "imread"}]
  ];
  var options = buildInlineKeyboards(buttons);
  var rand = randomInt(1, 422);
  this._randBook = rand;
  var addedToRead = this._addedToRead;
  displayBook(rand, function (err, text) {
    if (err) {
      callback(new Error('Книга не найдена'));
    } else {
      var getData = {
        text: text,
        buttons: options,
        read: (addedToRead === 1 ? true : false)
      }
      callback(null, getData);
    }
  });
  this._addedToRead = 0;
}

BotFunctions.prototype.setToReadRandomBook = function(params, callback) {
  var buttons = [
    [{ text: "показать другую", callback_data: "other"}],
    [{ text: "сохранить", callback_data: "save" }],
    [{ text: "добавлено в прочитанные", callback_data: "..."}]
  ];
  var options = buildInlineKeyboards(buttons);
  this._addedToRead = 1;
  var bookId = this._randBook;
  var userId = params.chat_id;
  readBooks.setBook(userId, bookId);
  var options = buildInlineKeyboards(buttons);
  callback(null, options);
}

BotFunctions.prototype.getFoundBooks = function(searchBook, callback) {
  books.getListFoundBooks(searchBook, function (err, books) {
    if (err) {
      callback(new Error("500 Server Error"));
    } else {
      var text = "";
      console.log(books.length);
      if (books.length > 5) {
        for (var i = 0; i < 5; i++) {
          text += "<b>" + books[i].name + "</b>\n" + books[i].authors + '\n' +
              "<i>" + books[i].genres + "</i>\n" +
              "<a href='" + books[i].link + "'>Рецензии на LiveLib</a>\n\n";
        }
        var totalPages = Math.ceil(books.length / 5);
        var paginationButtons = [];
        if (totalPages <= 5) {
          for (var i = 0; i < totalPages; i++) {
               paginationButtons.push({ text: i + 1, callback_data: 'search' + i});
          }
        } else {
          for (var i = 0; i < 4; i++) {
               paginationButtons.push({ text: i + 1, callback_data: 'search' + i});
          }
          paginationButtons.push({ text: totalPages + ' »', callback_data: 'search' + totalPages});
        }
        var buttons = [paginationButtons];
        console.log(buttons);
        var options = buildInlineKeyboards(buttons);
        var getData = {
          pages: totalPages,
          text: text,
          options: options
        }
        callback(null, getData);
      } else if (books.length != 0 && books.length <= 5) {
        for (var i = 0; i < books.length; i++) {
          text += "<b>" + books[i].name + "</b>\n" + books[i].authors + '\n' +
              "<i>" + books[i].genres + "</i>\n" +
              "<a href='" + books[i].link + "'>Рецензии на LiveLib</a>\n\n";
        }
        var getData = {
          pages: 1,
          text: text
        }
        callback(null, getData);
      } else {
        var getData = {text: "К сожалению, сервер не нашел книг!", pages: 0}
        callback(null, getData);
      }
    }
  })
}

BotFunctions.prototype.updateRecommendedBookStatus = function (userId, messageId, status) {
  var recommend = this._recommendBook;
  recommendedBooks.updateRecommendedBookStatus(userId, messageId, status, function (req, res) {
    if (req) {
      console.log(req);
    } else {
      console.log("Рекомендованная книга" + recommend);
      for (var i = 0; i < recommend.length; i++) {
        if (recommend[i].user_id === userId && recommend[i].message_id === messageId) {
          var bookId = recommend[i].book_id;
          if (status === 'read') {
            readBooks.setBook(userId, bookId);
          }
          if (status === 'liked') {
            likedBooks.setBook(userId, bookId);
          }
        }
      }
    }
  });
};

BotFunctions.prototype.getRecommendBookForUser = function (userId, messageId, callback) {
  var recommend = [];
  recommendation.formRecommendBookForUser(userId, messageId, function (req, book) {
    if (req) {
      callback(new Error("Server error"));
    } else {
      if (book === 'empty') {
        recommendation.getRecommendBook(userId, messageId, function (book) {
          var id = book.id;
          recommend.push({
            message_id: messageId,
            user_id: userId,
            book_id: id
          });
          displayBook(id, function (err, text) {
            if (err) {
              callback(new Error("Server error"));
            } else {
              var getData = {
                text: text
              }
              callback(null, getData);
            }
          });
        });
      } else {
        var id = book.id;
        recommend = {
          message_id: messageId,
          user_id: userId,
          book_id: id
        }
        displayBook(id, function (err, text) {
          if (err) {
            callback(new Error("Server error"));
          } else {
            var getData = {
              text: text
            }
            callback(null, getData);
          }
        });
      }
    }
  });
  this._recommendBook = recommend;
}

module.exports = BotFunctions;
