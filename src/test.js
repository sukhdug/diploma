var Recommendation = require('./recommendation');
var Books = require('./model/Books');
var recommendation = new Recommendation();
var books = new Books();
/*
recommendation.formRecommendBookForUser(390212007, book => {
  console.log(book);
});
*/
books.getListFoundBooks('ж', function (req, res) {
  console.log(res);
})
