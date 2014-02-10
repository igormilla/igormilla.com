exports.getTweets = function(req, res){
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/test');

  
  var db = mongoose.connection;
  
  var Tweet = require('../../models/tweet').Tweet;
  
  Tweet.find({}, function (err, tweets) {
    tweets = tweets.map(function (tweet) {
        return tweet.toObject();
    });
    var response = {};
    response.tweets = tweets;
    response.yay = 'YAY!!!';
    res.render('partials/map/lonelyPeople', response);
  });
  

};
