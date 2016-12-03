var dotenv = require('dotenv');
dotenv.config();
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key:process.env.yelp_consumer_key,
  consumer_secret:process.env.yelp_consumer_secret,
  token:process.env.yelp_token,
  token_secret:process.env.yelp_token_secret
});

module.exports = {
  search: function(searchOptions) {
  var pizzasearch = yelp.search(searchOptions);
  return Promise.resolve(pizzasearch);
  }
};
