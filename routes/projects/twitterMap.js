exports.getTweets = function(req, res){
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/test');

  
  var db = mongoose.connection;
  
  var Tweet = require('../../models/tweet').Tweet;
  
  Tweet.find({}, function (err, tweets) {
   var tweetsArray = [];
   tweetsArray.push(['latitude', 'longitude', 'tweet', 'size']); 
   tweets.map(function (tweet) {
        var t = tweet.toObject();
        tweetsArray.push([tweet.coordinates[1], tweet.coordinates[0], tweet.tweet, 1]);
    });
    db.close();
    var response = {};
    response.tweets = tweetsArray;
    if(req.query.v === '2')
      res.render('partials/map/lonelyPeople_v2', response);
    else
      res.render('partials/map/lonelyPeople', response);

  });
  

};
