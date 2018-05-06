'use strict';

var Functions = require('./bot_functions');
var func = new Functions();

var Messages = Object.freeze({
    WELCOME: func.welcome(),
});

// export enum
module.exports = Messages;
