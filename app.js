var dotenv = require('dotenv');
dotenv.config(); // read in .env file and parse it

var express = require('express');
var app = express()
var Sequelize = require('sequelize');
var cors = require('cors'); // Cross Origin Resource Sharing
var bodyParser = require('body-parser');
var Twitter = require('twitter');
var twitter = require('./api/twitter');
var yelp = require('./api/yelp');

var DB_NAME = process.env.DB_NAME;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DB_HOST
});

var Song = sequelize.define('song', {
  title: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL
  },
  playCount: {
    type: Sequelize.INTEGER,
    field: 'play_count'
  }
}, {
  timestamps: false
});

app.use(cors());
app.use(bodyParser());
// app.use(function(request, response, next) {
//   response.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.get('/coffee/montreal', function(request, response) {
  yelp.search({ term: 'coffee', location: 'montreal'}).then(function(results) {

    var formattedRatings = results.businesses.map(function(ratings) {
      return {
        id: ratings.id,
        rating: ratings.rating
      };
    });
    response.json(formattedRatings);
  }, function(err) {
    response.json(err);
  });
});

app.get('/coffee/losangeles', function(request, response) {
  yelp.search({ term: 'coffee', location: 'Los Angeles'}).then(function(results) {

    var formattedRatings = results.businesses.map(function(ratings) {
      return {
        id: ratings.id,
        rating: ratings.rating
      };
    });
    response.json(formattedRatings);
  }, function(err) {
    response.json(err);
  });
});

app.get('/coffee/newyork', function(request, response) {
  yelp.search({ term: 'coffee', location: 'New York'}).then(function(results) {

    var formattedRatings = results.businesses.map(function(ratings) {
      return {
        id: ratings.id,
        rating: ratings.rating
      };
    });
    response.json(formattedRatings);
  }, function(err) {
    response.json(err);
  });
});

app.get('/tweets/:q', function(request, response) {
  twitter.search(request.params.q).then(function(tweets) {
    console.log(tweets);
    response.json(tweets);
  });
});
//use this when we deploy
//app.listen(process.env.PORT || 3000)
app.listen(3000);
