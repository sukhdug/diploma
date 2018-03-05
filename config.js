const mysql = require('mysql');

// Including database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'diploma',
  password : 'diploma',
  database : 'diploma'
});
 
connection.connect();
var id = 1;
var query = "SELECT * FROM books where id = " + mysql.escape(id);
connection.query(query, function(error, result, fields){
    console.log(result);
});
connection.end();