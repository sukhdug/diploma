let token = process.env.TOKEN,
  options = {
    webHook: 0,
    port: 0
  };

// launch the bot
require('./src/bot')(token, options);
