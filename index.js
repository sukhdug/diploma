'use strict';

var token = '488077289:AAHu1Tv8ITPDnicBMkjQDiczFHFDLlfoa30',
  options = {
    webHook: 'https://handy-bot.herokuapp.com',
    port: 5000
  };

// launch the bot
require('./src/telegram')(token, options);
