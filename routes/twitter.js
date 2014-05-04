var twitterNode = require('mtwitter'),
    twitter 	= new twitterNode({
      consumer_key: 'cZB4v8Og1c3oQ4Ys10mRoA',
      consumer_secret: 'xAbzelwowUrSkIvtU3BLkakhqSyxWd905GiQGJFV7H8',
      access_token_key: '78973343-yyh4fhfOeCmDjXLERRlOUGCZioICN6BpYquJsZsZo',
      access_token_secret: '29He0KV4O91hGb7VR0kOyl4Jzo5W1oODKF1UP1EHE2TRP'
    });

var ify = function() {
              return {
                "link": function(t) {
                  return t.replace(/[a-z]+:\/\/[a-z0-9-_]+\.[a-z0-9-_:~%&\?#\/.=]+[^:\.,\)\s*$]/ig, function(m) {
                    return '<a href="' + m + '">' + ((m.length > 25) ? m.substr(0, 24) + '...' : m) + '</a>';
                  });
                },
                "at": function(t) {
                  return t.replace(/(^|[^\w]+)\@([a-zA-Z0-9_]{1,15}(\/[a-zA-Z0-9-_]+)*)/g, function(m, m1, m2) {
                    return m1 + '@<a href="http://twitter.com/' + m2 + '">' + m2 + '</a>';
                  });
                },
                "hash": function(t) {
                  return t.replace(/(^|[^&\w'"]+)\#([a-zA-Z0-9_]+)/g, function(m, m1, m2) {
                    return m1 + '#<a href="http://search.twitter.com/search?q=%23' + m2 + '">' + m2 + '</a>';
                  });
                },
                "clean": function(tweet) {
                  return this.hash(this.at(this.link(tweet)));
                }
              };
            }();


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
	var response = {};
	response.time = "&#151; " + data[0].created_at;
	response.tweet = ify.clean(data[0].text);
	res.render('partials/twitter/twitter-stream', response);
   });
};

