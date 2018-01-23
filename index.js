var TelegramBot = require('node-telegram-bot-api');

// Токен телеграм-бота
var token = '488077289:AAHu1Tv8ITPDnicBMkjQDiczFHFDLlfoa30';

// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});
