var query = require('./book-recommendations/config');

console.log(query.database('SELECT * FROM books WHERE id = 124'));
