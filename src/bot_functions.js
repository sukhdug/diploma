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

function getBotCommandDescription(command, callback) {
  botCommands.getCommandDescription(command, (description) => {
    callback(description);
  });
}

function recommendation(rand, userId, callback) {
  reviews.getReview(rand, function (review) {
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
    this.recommendBookId = book.id;
    var text = "<b>Название книги:</b> " + book.name +
      "\n<b>Автор:</b> " + book.authors + "\n<b>Жанры:</b> " + book.genres +
      "\n<b>Описание книги:</b>\n" + book.description +
      "\n<a href='" + book.link + "'>Читать рецензии на сайте LiveLib</a>";
    callback(text);
    //console.log(global.recommendBookReaderId);
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

BotFunctions.prototype.welcome = function(user, chatId) {
  var bot = this.bot;
  getBotCommandDescription('start', function (description) {
    bot.sendMessage(chatId, description, { parse_mode: "HTML"});
  });
  users.setUser(user, chatId);
}

BotFunctions.prototype.help = function(chatId) {
  var bot = this.bot;
  getBotCommandDescription('help', function (description) {
    bot.sendMessage(chatId, description, { parse_mode: "HTML" });
  });
}

BotFunctions.prototype.unknown = function(chatId) {
  var bot = this.bot;
  bot.sendMessage(chatId, "К сожалению, бот не понимает Вас!" +
                          " Чтобы просмотреть доступные команды, введите /help. Спасибо!");
}

BotFunctions.prototype.showRecommendation = function(chatId) {
  var bot = this.bot;
  var buttons = [
    [{ text: 'нравится', callback_data: 'like'}],
    [{ text: 'читал (а)', callback_data: 'read'}],
    [{ text: 'не нравится', callback_data: 'dislike'}]
  ];
  var options = buildInlineKeyboards(buttons);
  var rand = randomInt(1, 790);
  //global.randomNumber = rand;
  randNumber = rand;
  recommendBook(rand, chatId, function (text) {
    bot.sendMessage(chatId, text, { parse_mode: "HTML" });
    setTimeout( function () {
      bot.sendMessage(chatId, "Выберите, чтобы получить еще рекомендацию", options);
    }, 1000);
  });
  /*bot.on('callback_query', function (msg) {
    var answer = msg.data.split('_');
    var index = answer[0];
    var messageId = msg.message.message_id - 1;
    if (index === 'dislike') {
      recommendedBooks.updateRecommendedBookStatusToDislike(global.recommendBookId);
      //global.randomNumber = randomInt(1, 790);
      randNumber = randomInt(1, 790);
      Recommendation.findReviewOfDislikeBook(randNumber, function (bookId) {
        recommendBook(bookId, chatId, function (text) {
          bot.editMessageText(text, { message_id: messageId, chat_id: chatId , parse_mode: "HTML"});
        });
      });
    } else if (index === 'read') {
      readBooks.setBook(chatId, global.recommendedBookBookId);
      recommendedBooks.updateRecommendedBookStatusToRead(global.recommendBookId);
      //global.randomNumber = randomInt(1, 790);
      randNumber = randomInt(1, 790);
      Recommendation.findReviewOfDislikeBook(randNumber, function (bookId) {
        recommendBook(bookId, chatId, function (text) {
          bot.editMessageText(text, { message_id: messageId, chat_id: chatId , parse_mode: "HTML"});
        });
      });
    } else if (index === 'like') {
      likedBooks.setBook(chatId, global.recommendedBookBookId);
      recommendedBooks.updateRecommendedBookStatusToLike(global.recommendBookId);
      Recommendation.findReviewOfLikeBook(global.recommendedBookBookId, global.recommendBookReaderId, function (bookId) {
        recommendBook(bookId, chatId, function (text) {
          bot.editMessageText(text, { message_id: messageId, chat_id: chatId , parse_mode: "HTML"});
        });
      });
    }
  });*/
}

BotFunctions.prototype.editRecommendBook = function(params, answer) {
  if (answer === 'dislike') {
    recommendedBooks.updateRecommendedBookStatusToDislike(global.recommendBookId);
      //global.randomNumber = randomInt(1, 790);
      randNumber = randomInt(1, 790);
      Recommendation.findReviewOfDislikeBook(randNumber, function (bookId) {
        recommendBook(bookId, chatId, function (text) {
          bot.editMessageText(text, { message_id: params.message_id - 1, chat_id: params.chat_id, parse_mode: "HTML"});
        });
      });
  }
  if (answer === 'read') {
    readBooks.setBook(params.chat_id, this.recommendBookId);
      recommendedBooks.updateRecommendedBookStatusToRead(global.recommendBookId);
      //global.randomNumber = randomInt(1, 790);
      randNumber = randomInt(1, 790);
      Recommendation.findReviewOfDislikeBook(randNumber, function (bookId) {
        recommendBook(bookId, chatId, function (text) {
          bot.editMessageText(text, { message_id: messageId, chat_id: chatId , parse_mode: "HTML"});
        });
      });
  }
}

BotFunctions.prototype.showSavedBooks = function(chatId, howSave) {
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
      booksArray = JSON.parse(JSON.stringify(books));
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
      var send = displayBook(id, function (text) {
        bot.sendMessage(chatId, text, { parse_mode: "HTML" });
        if (savedBooksOptions.booksLength > 1) {
          setTimeout( function () {
            bot.sendMessage(chatId, "Ваши " + howSaved + " книги", options);
          }, 1000);
        }
      });
    }
  });
  if (howSave == "liked") {
    this.howSaved = "понравившиеся";
    this.likedBooksOptions = savedBooksOptions;
    this.likedBooksArray = booksArray;
  } else if (howSave == "read") {
    this.howSaved = "прочитанные";
    this.readBooksOptions = savedBooksOptions;
    this.readBooksArray = booksArray;
  }
  /*bot.on('callback_query', function (msg) {
    var answer = msg.data.split('_');
    var callback = answer[0];
    var messageId = msg.message.message_id - 1;
    if (callback == 'prev') {
      console.log(booksArray);
      var func = displayBook(prev, function (text) {
        bot.editMessageText(text, { message_id: messageId, chat_id: chatId , parse_mode: "HTML"});
        if (prevId == 0) {
          next = booksArray[prevId].id;
          nextId = prevId - 1;
          prev = booksArray[booksArray.length - 1].id;
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
      var send = displayBook(next, function (text) {
        bot.editMessageText(text, { message_id: messageId, chat_id: chatId , parse_mode: "HTML"});
        if (nextId == booksArray.length - 1) {
          prev = booksArray[booksArray.length - 1].id;
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
  });*/
}

BotFunctions.prototype.showNextSavedBooks = function(params) {
  var bot = this.bot;
  var books = [];
  var array = {};
  var howSaved = this.howSaved;
  if (howSaved === "понравившиеся") {
    array = this.likedBooksOptions;
    books = this.likedBooksArray;
  }
  if (howSaved === "прочитанные") {
    array = this.readBooksOptions;
    books = this.readBooksArray;
  }
  console.log(books);
  var send = displayBook(array.next, function (text) {
    bot.editMessageText(text, { message_id: params.message_id - 1, chat_id: params.chat_id, parse_mode: "HTML" });
    if (array.nextId == books.length - 1) {
      array.prev = books[books.length - 1].id;
      array.prevId = array.nextId;
      array.next = books[0].id;
      array.nextId = 0;
    } else {
      array.prev = books[array.nextId].id;
      array.prevId = array.nextId;
      array.next = books[array.nextId + 1].id;
      array.nextId = array.nextId + 1;
    }
  });
}

BotFunctions.prototype.showPrevSavedBooks = function(params) {
  var bot = this.bot;
  var books = this.booksArray;
  var array = {};
  var howSaved = this.howSaved;
  console.log(howSaved);
  if (howSaved === "понравившиеся") {
    array = this.likedBooksOptions;
  }
  if (howSaved === "прочитанные") {
    array = this.readBooksOptions;
  }
  console.log(array);
  var send = displayBook(array.next, function (text) {
    bot.editMessageText(text, { message_id: params.message_id - 1, chat_id: params.chat_id, parse_mode: "HTML" });
    if (array.prevId == 0) {
      array.next = books[array.prevId].id;
      array.nextId = prevId - 1;
      array.prev = books[array.length - 1].id;
      array.prevId = books.length - 1;
    } else {
      array.next = books[array.prevId].id;
      array.nextId = array.prevId;
      array.prev = books[array.prevId - 1].id;
      array.prevId = array.prevId - 1;
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
  this.randBook = rand;
  var send = displayBook(rand, function (text) {
    bot.sendMessage(chatId, text, { parse_mode: "HTML" });
    setTimeout( function () {
      bot.sendMessage(chatId, "Выберите", options);
    }, 1000);
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
