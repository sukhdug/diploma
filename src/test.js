var Recommendation = require('./recommendation');

var recommendation = new Recommendation();

recommendation.formRecommendBookForUser(390212007, book => {
  console.log(book);
});
