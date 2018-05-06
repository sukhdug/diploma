'use strict';

var Books = require('./model/Books');
var ReadBooks = require('./model/ReadBooks');
var LikedBooks = require('./model/LikedBooks');
var Users = require('./model/Users');
var Reviews = require('./model/Reviews');
var BotCommands = require('./model/BotCommands');
var Recommendation = require('./recommendation');
var RecommendedBook = require('./model/RecommendedBooks');

global.randomNumber = 0;
global.recommendBookId = 0;
global.recommendBookReaderId = 0;
global.recommendedBookBookId = 0;
global.bookId = 0; // ID рекомендованной или по

function BotFunctions(bot) {
  this.bot = bot;
}

function randomInt(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

function book(callback) {
  Books.getBook(25, (book) => {
    callback(book);
  });
}

function _randomBook(id, callback) {
  Books.getRandomBook(id, (bookData) => {
    var text = "<b>Название книги:</b> " + bookData.name +
        "\n<b>Автор:</b> " + bookData.authors + "\n<b>Жанры:</b> " + bookData.genres +
        "\n<b>Описание книги:</b>\n" + bookData.description +
        "\n<a href='" + bookData.link + "'>Читать рецензии на сайте LiveLib</a>";
    callback(text);
  });
}

function countBooks() {
  Books.getCountOfBooks((count) => {
    return count;
  });
}

function botCommand(command, callback) {
  BotCommands.getCommandDescription(command, (description) => {
    callback(description);
  });
}

function recommendation(rand, userId, callback) {
  Reviews.getReview(rand, function (review) {
    console.log(review);
    var reviewId = review[0];
    var bookId = review[1];
    var readerId = review[2];
    Recommendation.recommendedBook(bookId, readerId, reviewId, userId, function (book) {
      callback(book);
    });
  });
}

function recommendBook(rand, chatId, callback) {
  recommendation(rand, chatId, function (book) {
    global.recommendBookId = book.recommend_id;
    global.recommendBookReaderId = book.reader_id;
    global.recommendedBookBookId = book.id;
    var text = "<b>Название книги:</b> " + book.name +
      "\n<b>Автор:</b> " + book.authors + "\n<b>Жанры:</b> " + book.genres +
      "\n<b>Описание книги:</b>\n" + book.description +
      "\n<a href='" + book.link + "'>Читать рецензии на сайте LiveLib</a>";
    callback(text);
    console.log(global.recommendBookReaderId);
  });
}

function fillDisplayBookArray(array, bookName, id) {
  array.push({
    text: bookName,
    callback_data: id
  });
}

BotFunctions.prototype.welcome = function(user, chatId) {
  var bot = this.bot;
  botCommand('start', function (description) {
    bot.sendMessage(chatId, description, { parse_mode: "HTML"});
  });
  Users.setUser(user, chatId);
}

BotFunctions.prototype.help = function(chatId) {
  var bot = this.bot;
  botCommand('help', function (description) {
    bot.sendMessage(chatId, description, { parse_mode: "HTML" });
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

BotFunctions.prototype.showRecommendation = function(chatId) {
  var bot = this.bot;
  var readBooks = new ReadBooks();
  var buttons = [
    [{ text: 'нравится', callback_data: 'like'}],
    [{ text: 'читал (а)', callback_data: 'read'}],
    [{ text: 'не нравится', callback_data: 'dislike'}]
  ];
  var options = buildInlineKeyboards(buttons);
  var rand = randomInt(1, 790);
  global.randomNumber = rand;
  recommendBook(rand, chatId, function (text) {
    bot.sendMessage(chatId, text, { parse_mode: "HTML" });
    bot.sendMessage(chatId, "Выберите, чтобы получить еще рекомендацию", options);
  });
  bot.on('callback_query', function (msg) {
    var answer = msg.data.split('_');
    var index = answer[0];
    var messageId = msg.message.message_id - 1;
    if (index === 'dislike') {
      RecommendedBook.updateRecommendedBookStatusToDislike(global.recommendBookId);
      global.randomNumber = randomInt(1, 790);
      Recommendation.findReviewOfDislikeBook(global.randomNumber, function (bookId) {
        recommendBook(bookId, chatId, function (text) {
          bot.editMessageText(text, { message_id: messageId, chat_id: chatId , parse_mode: "HTML"});
        });
      });
    } else if (index === 'read') {
      readBooks.setBook(chatId, global.recommendedBookBookId);
      RecommendedBook.updateRecommendedBookStatusToRead(global.recommendBookId);
      global.randomNumber = randomInt(1, 790);
      Recommendation.findReviewOfDislikeBook(global.randomNumber, function (bookId) {
        recommendBook(bookId, chatId, function (text) {
          bot.editMessageText(text, { message_id: messageId, chat_id: chatId , parse_mode: "HTML"});
        });
      });
    } else if (index === 'like') {
      LikedBooks.setBook(chatId, global.recommendedBookBookId);
      RecommendedBook.updateRecommendedBookStatusToLike(global.recommendBookId);
      Recommendation.findReviewOfLikeBook(global.recommendedBookBookId, global.recommendBookReaderId, function (bookId) {
        recommendBook(bookId, chatId, function (text) {
          bot.editMessageText(text, { message_id: messageId, chat_id: chatId , parse_mode: "HTML"});
        });
      });
    }
  });
}

BotFunctions.prototype.showRandomBook = function(chatId) {
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
  global.bookId = rand;
  var func = _randomBook(rand, function (text) {
    bot.sendMessage(chatId, text, { parse_mode: "HTML" });
    bot.sendMessage(chatId, "Выберите", options);
  });
  bot.on('callback_query', function (msg) {
    var answer = msg.data.split('_');
    var index = answer[0];
    var messageId = msg.message.message_id;
    if (index == 'other') {
      var rand = randomInt(1, 422);
      global.bookId = rand;
      var buttons = [
        [{ text: "показать другую", callback_data: "other"}],
        [{ text: "сохранить", callback_data: "save"},
        { text: "читал(а)", callback_data: "imread"}]
      ];
      var options = buildInlineKeyboards(buttons);
      var func = _randomBook(rand, function (text) {
        bot.editMessageText(text, { message_id: messageId - 1, chat_id: chatId , parse_mode: "HTML"});
        if (addedToRead == 1) {
          bot.editMessageReplyMarkup( options.reply_markup, { message_id: messageId, chat_id: chatId });
          addedToRead = 0;
        }
      });
    } else if (index == 'imread') {
      addedToRead = 1;
      readBooks.setBook(chatId, global.bookId);
      var buttons = [
        [{ text: "показать другую", callback_data: "other"}],
        [{ text: "сохранить", callback_data: "save" }],
        [{ text: "добавлено в прочитанные", callback_data: "..."}]
      ];
      var options = buildInlineKeyboards(buttons);
      bot.editMessageReplyMarkup( options.reply_markup, { message_id: messageId, chat_id: chatId });
    } else if (index == 'save') {
      addedToSave = 1;
    }
  });
}

BotFunctions.prototype.showSavedBooks = function(chatId, howSave) {
  var object = null;
  var bot = this.bot;
  if (howSave == 'liked') {
    object = new LikedBooks();
  } else if (howSave == 'read') {
    object = new ReadBooks();
  }
  var prev = 0;
  var prevId = 0;
  var next = 0;
  var nextId = 0;
  var booksArray = [];
  var booksLength = 0;
  object.getListUserBooks(chatId, function (books) {
    if (books == 'empty') {
      bot.sendMessage(chatId, 'У вас пока нет понравившихся книг');
    } else {
      booksArray = books;
      console.log(books);
      var buttons = [
        [
          { text: "<<", callback_data: "prev"},
          { text: "список", callback_data: "list"},
          { text: ">>", callback_data: "next"}
        ]
      ];
      var options = buildInlineKeyboards(buttons);
      var id = books[0].id;
      booksLength = books.length;
      for (var i = 0; i < books.length; i++) {
        if (i == 1) {
          next = books[i].id;
          nextId = i;
        }
        if (i == books.length - 1) {
          prev = books[i].id;
          prevId = i;
        }
      }
      var func = _randomBook(id, function (text) {
        bot.sendMessage(chatId, text, { parse_mode: "HTML" });
        bot.sendMessage(chatId, 'Ваши прочитанные книги', options);
      });
    }
  });
  bot.on('callback_query', function (msg) {
    var answer = msg.data.split('_');
    var callback = answer[0];
    var messageId = msg.message.message_id - 1;
    if (callback == 'prev') {
      console.log(booksArray);
      var func = _randomBook(prev, function (text) {
        bot.editMessageText(text, { message_id: messageId, chat_id: chatId , parse_mode: "HTML"});
        if (prevId == 0) {
          next = booksArray[prevId].id;
          nextId = prevId - 1;
          prev = booksArray[booksArray.length - 2].id;
          prevId = booksArray.length - 1;
        } else {
          next = booksArray[prevId].id;
          nextId = prevId;
          prev = booksArray[prevId - 1].id;
          prevId = prevId - 1;
        }
      });
    }
    if (callback == 'next') {
      var func = _randomBook(next, function (text) {
        bot.editMessageText(text, { message_id: messageId, chat_id: chatId , parse_mode: "HTML"});
        if (nextId == booksArray.length - 1) {
          prev = booksArray[booksArray.length - 2].id;
          prevId = nextId;
          next = booksArray[0].id;
          nextId = 0;
        } else {
          prev = booksArray[nextId].id;
          prevId = nextId;
          next = booksArray[nextId + 1].id;
          nextId = nextId + 1;
        }
      });
    }
  });
}

module.exports = BotFunctions;
