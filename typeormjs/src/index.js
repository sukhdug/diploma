const connection = require("../config/connection");

var book = connection.find();
console.log(book);