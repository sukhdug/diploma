const TelegramBot = require('node-telegram-bot-api');

// Токен телеграм-бота
const token = '488077289:AAHu1Tv8ITPDnicBMkjQDiczFHFDLlfoa30';

// Включить опрос сервера
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/help (.+)/, (msg, match) =>  {

  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    var hi = 'hi';
    if (msg.text.toString().toLowerCase().indexOf('hi') === 0) {
      bot.sendMessage(chatId, "Hello");
    }else if (msg.text.toString().indexOf('How are you?') === 0) {
      bot.sendMessage(chatId, "I'm fine, and you?");
    }
});
