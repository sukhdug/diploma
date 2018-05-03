'use strict';

var token = '488077289:AAHu1Tv8ITPDnicBMkjQDiczFHFDLlfoa30',
  options = {
    redisUrl: process.env.REDIS_URL,
    webHook: process.env.WEBHOOK_URL,
    port: process.env.PORT
  };

// launch the bot
require('./src/telegram')(token, options);
