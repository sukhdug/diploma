var mysql = require('mysql');

// Including database
var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'diploma',
  password : 'diploma',
  database : 'diploma'
});

exports.database = function (query) {
  db.connect();
  var id = 100;
  db.query(query, function(error, result, fields) {
      console.log(result);
  });
  db.end();
};
