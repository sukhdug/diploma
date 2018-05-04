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
global.addedToRead = 0;
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

function randomBook(number, callback) {
  var id = number;
  Books.getRandomBook(id, (bookData) => {
    callback(bookData);
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
  array.push([{
    text: bookName,
    callback_data: id
  }]);
}

BotFunctions.prototype.welcome = function(chatId) {
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
  var buttons = [
    [{ text: 'нравится', callback_data: 'like'}],
    [{ text: 'читал (а)', callback_data: 'read'}],
    [{ text: 'не нравится', callback_data: 'dislike'}]
  ];
  /*
  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'нравится', callback_data: 'like' }],
        [{ text: 'читал (а)', callback_data: 'read' }],
        [{ text: 'не нравится', callback_data: 'dislike' }]
      ],
      parse_mode: "Markdown",
    })
  };*/
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
      ReadBooks.setBook(chatId, global.recommendedBookBookId);
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
  var buttons = [
    [{ text: "показать другую", callback_data: "other"}],
    [{ text: "сохранить", callback_data: "save"}],
    [{ text: "читал(а)", callback_data: "imread"}]
  ];
  var options = buildInlineKeyboards(buttons);
  var addedToRead = 0;
  var addedToSave = 0;
  /*
  var options = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'показать другую книгу', callback_data: 'other'}],
        [{ text: 'сохранить книгу', callback_data: 'save'}],
        [{ text: 'читал(а) книгу', callback_data: 'imread'}]
      ],
      parse_mode: "Markdown"
    })
  }
  */
  var rand = randomInt(1, 422);
  global.bookId = rand;
  console.log(global.bookId);
  randomBook(rand, function (bookData) {
    var text = "<b>Название книги:</b> " + bookData.name +
        "\n<b>Автор:</b> " + bookData.authors + "\n<b>Жанры:</b> " + bookData.genres +
        "\n<b>Описание книги:</b>\n" + bookData.description +
        "\n<a href='" + bookData.link + "'>Читать рецензии на сайте LiveLib</a>";
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
      console.log(global.bookId);
      randomBook(rand, function (bookData) {
        var text = "<b>Название книги:</b> " + bookData.name +
            "\n<b>Автор:</b> " + bookData.authors + "\n<b>Жанры:</b> " + bookData.genres +
            "\n<b>Описание книги:</b>\n" + bookData.description +
            "\n<a href='" + bookData.link + "'>Читать рецензии на сайте LiveLib</a>";
        var options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: 'показать другую книгу', callback_data: 'other'}],
              [{ text: 'сохранить книгу', callback_data: 'save'}],
              [{ text: 'читал(а) книгу', callback_data: 'imread'}]
            ],
            parse_mode: "Markdown"
          })
        }
        bot.editMessageText(text, { message_id: messageId - 1, chat_id: chatId , parse_mode: "HTML"});
        if (global.addedToRead == 1) {
          bot.editMessageReplyMarkup( options.reply_markup, { message_id: messageId, chat_id: chatId });
          global.addedToRead = 0;
          addedToRead = 0;
        }
      });
    } else if (index == 'imread') {
      global.addedToRead = 1;
      addedToRead = 1;
      ReadBooks.setBook(chatId, global.bookId);
      var buttons = [
        [{ text: "показать другую", callback_data: "other"}],
        [{ text: "сохранить", callback_data: save}],
        [{ text: "добавлено в прочитанные", callback_data: "."}]
      ];
      var options = buildInlineKeyboards(buttons);
      /*var opt = {
        reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: 'показать другую книгу', callback_data: 'other'}],
            [{ text: 'сохранить книгу', callback_data: 'save'}],
            [{ text: 'сохранено в прочитанные', callback_data: '...'}]
          ],
          parse_mode: "Markdown"
        })
      };*/
      bot.editMessageReplyMarkup( opt.reply_markup, { message_id: messageId, chat_id: chatId });
    } else if (index == 'save') {
      addedToSave = 1;
    }
  });
}

BotFunctions.prototype.showSavedBooks = function(chatId, howSave) {
  var object = null;
  var bot = this.bot;
  if (howSave == 'liked') {
    object = LikedBooks;
  } else if (howSave == 'read') {
    object = ReadBooks;
  }
  object.getListUserBooks(chatId, function (books) {
    if (books == 'empty') {
      bot.sendMessage(chatId, 'У вас пока нет понравившихся книг');
    } else {
      var buttons = [];
      console.log(books);
      for (var i = 0; i < books.length; i++) {
        fillDisplayBookArray(buttons, books[i].name, books[i].id);
      }
      var options = buildInlineKeyboards(buttons);
      /*var options = {
        reply_markup: JSON.stringify({ inline_keyboard: buttons, parse_mode: "HTML", })
      };*/
      bot.sendMessage(chatId, 'Ваши прочитанные книги', options);
    }
  });
  bot.on('callback_query', function (msg) {
    var answer = msg.data.split('_');
    var index = answer[0];
    var messageId = msg.message.message_id - 1;
    if (index == 'ago') {
      object.getListUserBooks(chatId, function (books) {
        if (books == 'empty') {
          bot.sendMessage(chatId, 'У вас пока нет понравившихся книг');
        } else {
          var buttons = [];
          for (var i = 0; i < books.length; i++) {
            fillDisplayBookArray(buttons, books[i].name, books[i].id);
          }
          var options = {
            reply_markup: JSON.stringify({ inline_keyboard: buttons, parse_mode: "HTML", })
          };
          bot.deleteMessage(chatId, messageId -1);
          bot.editMessageReplyMarkup( options.reply_markup, { message_id: messageId, chat_id: chatId });
        }
      });
    } else {
      randomBook(index, function (bookData) {
        var opts = { reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: 'назад', callback_data: 'ago' }]
          ],
            parse_mode: "Markdown",
          })
        };
        var text = "<b>Название книги:</b> " + bookData.name +
                    "\n<b>Автор:</b> " + bookData.authors + "\n<b>Жанры:</b> " + bookData.genres +
                    "\n<b>Описание книги:</b>\n" + bookData.description +
                    "\n<a href='" + bookData.link + "'>Читать рецензии на сайте LiveLib</a>";
        bot.editMessageText(text, { message_id: messageId, chat_id: chatId , parse_mode: "HTML"});
        bot.sendMessage(chatId, 'Нажмите, чтобы вернуться', opts);
      });
    }
  });
}

// рабочий вариант функции showSavedBooks, внизу показаны варианты
/*
BotFunctions.prototype.showSavedBooks = function(chatId, howSave) {
  var bot = this.bot;
  showList(chatId);
  function showList(chatId) {
    if (howSave == 'liked') {
      LikedBooks.getListLikedBooks(chatId, function (books) {
        if (books == 'empty') {
          bot.sendMessage(chatId, 'У вас пока нет понравившихся книг');
        } else {
          var buttons = [];
          for (var i = 0; i < books.length; i++) {
            fillDisplayBookArray(buttons, books[i].name, books[i].id);
          }
          var options = {
            reply_markup: JSON.stringify({ inline_keyboard: buttons, parse_mode: "HTML", })
          };
          bot.sendMessage(chatId, 'Ваши любимые книги', options);
        }
      });
    } else if (howSave == 'read') {
      ReadBooks.getListReadBooks(chatId, function (books) {
        if (books == 'empty') {
          bot.sendMessage(chatId, 'У вас пока нет понравившихся книг');
        } else {
          var buttons = [];
          console.log(books);
          for (var i = 0; i < books.length; i++) {
            fillDisplayBookArray(buttons, books[i].name, books[i].id);
          }
          var options = {
            reply_markup: JSON.stringify({ inline_keyboard: buttons, parse_mode: "HTML", })
          };
          bot.sendMessage(chatId, 'Ваши прочитанные книги', options);
        }
      });
    }
  }
  bot.on('callback_query', function (msg) {
    var answer = msg.data.split('_');
    var index = answer[0];
    var messageId = msg.message.message_id - 1;
    if (index == 'ago') {
      LikedBooks.getListLikedBooks(chatId, function (books) {
        if (books == 'empty') {
          bot.sendMessage(chatId, 'У вас пока нет понравившихся книг');
        } else {
          var buttons = [];
          for (var i = 0; i < books.length; i++) {
            fillDisplayBookArray(buttons, books[i].name, books[i].id);
          }
          var options = {
            reply_markup: JSON.stringify({ inline_keyboard: buttons, parse_mode: "HTML", })
          };
          bot.deleteMessage(chatId, messageId -1);
          bot.editMessageReplyMarkup( options.reply_markup, { message_id: messageId, chat_id: chatId });
        }
      });
    } else {
      randomBook(index, function (bookData) {
        var opts = { reply_markup: JSON.stringify({
          inline_keyboard: [
            [{ text: 'назад', callback_data: 'ago' }]
          ],
            parse_mode: "Markdown",
          })
        };
        var text = "<b>Название книги:</b> " + bookData.name +
                    "\n<b>Автор:</b> " + bookData.authors + "\n<b>Жанры:</b> " + bookData.genres +
                    "\n<b>Описание книги:</b>\n" + bookData.description +
                    "\n<a href='" + bookData.link + "'>Читать рецензии на сайте LiveLib</a>";
        bot.editMessageText(text, { message_id: messageId, chat_id: chatId , parse_mode: "HTML"});
        bot.sendMessage(chatId, 'Нажмите, чтобы вернуться', opts);
      });
    }
  });
}
*/
module.exports = BotFunctions;