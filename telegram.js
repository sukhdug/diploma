var TelegramBot = require('node-telegram-bot-api');
var Books = require('./model/Books');
var ReadBooks = require('./model/ReadBooks');
var LikedBooks = require('./model/LikedBooks');
var Users = require('./model/Users');
var Reviews = require('./model/Reviews');
var BotCommands = require('./model/BotCommands');
var Recommendation = require('./recommendation');
var RecommendedBook = require('./model/RecommendedBooks');
// Токен телеграм-бота
var token = '488077289:AAHu1Tv8ITPDnicBMkjQDiczFHFDLlfoa30';
// Включить опрос сервера
var bot = new TelegramBot(token, { polling: true });

global.randomNumber = 0;
global.recommendBookId = 0;
global.recommendBookReaderId = 0;
global.recommendedBookBookId = 0;

global.bookId = 0; // ID рекомендованной или по
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

function recommendation (rand, userId, callback) {
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

function recommendBook (rand, chatId, callback) {
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

function fillDisplayBookArray(array, bookName, id){
  array.push([{
    text: bookName,
    callback_data: id
  }]);
}

bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  var user = msg.chat.username;
  var hiMessage = (msg.text.toString().toLowerCase().indexOf('hi') === 0);
  var helpMessage = (msg.text.toString().toLowerCase().indexOf('справка') === 0) || (msg.text.toString().indexOf('/help') === 0);
  var randomMessage = (msg.text.toString().toLowerCase().indexOf('рандом') === 0) || (msg.text.toString().indexOf('/random') === 0);
  var recommendMessage = (msg.text.toString().toLowerCase().indexOf('рекомендация') === 0) || (msg.text.toString().indexOf('/recommendation') === 0);
  var readMessage = (msg.text.toString().toLowerCase().indexOf('читал') === 0) || (msg.text.toString().indexOf('/read') === 0);
  var likeMessage = (msg.text.toString().toLowerCase().indexOf('нравится') === 0) || (msg.text.toString().indexOf('/like') === 0);
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
    var options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'показать другую книгу', callback_data: 'other'}],
          [{ text: 'сохранить книгу', callback_data: 'save'}],
          [{ text: 'читал(а) книгу', callback_data: 'read'}]
        ],
        parse_mode: "Markdown"
      })
    }
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
                  [{ text: 'читал(а) книгу', callback_data: 'read'}]
                ],
                parse_mode: "Markdown"
              })
            }
            bot.editMessageText(text, { message_id: messageId - 1, chat_id: chatId , parse_mode: "HTML"});
            bot.editMessageReplyMarkup( options.reply_markup, { message_id: messageId, chat_id: chatId });
          });
        } else if (index == 'read') {
          ReadBooks.setBook(chatId, global.bookId);
          var opt = {
            reply_markup: JSON.stringify({
              inline_keyboard: [
                [{ text: 'показать другую книгу', callback_data: 'other'}],
                [{ text: 'сохранить книгу', callback_data: 'save'}],
                [{ text: 'сохранено в прочитанные', callback_data: '...'}]
              ],
              parse_mode: "Markdown"
            })
          };
          bot.editMessageReplyMarkup( opt.reply_markup, { message_id: messageId, chat_id: chatId });
        }
      });
    });
  } else if (recommendMessage) {
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
  } else if (readMessage) {
    ReadBooks.getListReadBooks(chatId, function (books) {
      if (books == 'empty') {
        bot.sendMessage(chatId, 'У вас пока нет прочитанных книг');
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
        bot.on('callback_query', function (msg) {
        var answer = msg.data.split('_');
        var index = answer[0];
        var messageId = msg.message.message_id;
        randomBook(index, function (bookData) {
          var text = "<b>Название книги:</b> " + bookData.name +
            "\n<b>Автор:</b> " + bookData.authors + "\n<b>Жанры:</b> " + bookData.genres +
            "\n<b>Описание книги:</b>\n" + bookData.description +
            "\n<a href='" + bookData.link + "'>Читать рецензии на сайте LiveLib</a>";
          bot.editMessageText(text, { message_id: messageId, chat_id: chatId , parse_mode: "HTML"});
        });
      });
      }
    });
  } else if (likeMessage) {
    showLikedBooks(chatId);
  } else {
    bot.sendMessage(chatId, "I don't understand you, " + user + "! Sorry");
  }
});

function showLikedBooks (chatId) {
  showList(chatId);
  function showList(chatId) {
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
  }
  bot.on('callback_query', function (msg) {
    var answer = msg.data.split('_');
    var index = answer[0];
    var messageId = msg.message.message_id;
    var opts = { reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: 'назад', callback_data: 'ago' }]
      ],
        parse_mode: "Markdown",
      })
    };
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