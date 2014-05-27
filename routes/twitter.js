var twitterNode = require('mtwitter'),
twitterLib = require ('twitter-text'),
twitter 	= new twitterNode({
  consumer_key: 'cZB4v8Og1c3oQ4Ys10mRoA',
  consumer_secret: 'xAbzelwowUrSkIvtU3BLkakhqSyxWd905GiQGJFV7H8',
  access_token_key: '78973343-yyh4fhfOeCmDjXLERRlOUGCZioICN6BpYquJsZsZo',
  access_token_secret: '29He0KV4O91hGb7VR0kOyl4Jzo5W1oODKF1UP1EHE2TRP'
});

exports.getTweets = function(req, res){

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/test');

  var db = mongoose.connection;

  var Tweet = require('../models/tweet').Tweet;

  Tweet.find({}).limit(1000).exec(function (err, tweets) {
    var tweetsArray = [];
    tweets.map(function (tweet) {
      tweetsArray.push(tweet);
    });
    db.close();
    var response = {};
    response.tweets = tweetsArray;
    res.render('partials/map/lonelyPeople', response);
  });

};

exports.getStream = function (req, res){
  twitter.get("statuses/user_timeline", {screen_name : 'igormilla'}, function (err, data) {
    var response = {
      time :  data[0].created_at,
      tweet : twitterLib.autoLink(twitterLib.htmlEscape( data[0].text ))
    };
    res.render('partials/twitter/twitter-stream', response);
  });
};

