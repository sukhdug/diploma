var query = require('./book-recommendations/config');

result = query.database('SELECT * FROM books WHERE id = 124');
console.log(query.database('SELECT * FROM books WHERE id = 124'));
