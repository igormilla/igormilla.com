console.log("start");
var Stream = require('user-stream');
var stream = new Stream({
	consumer_key: 'cZB4v8Og1c3oQ4Ys10mRoA',
	consumer_secret: 'xAbzelwowUrSkIvtU3BLkakhqSyxWd905GiQGJFV7H8',
	access_token_key: '78973343-yyh4fhfOeCmDjXLERRlOUGCZioICN6BpYquJsZsZo',
	access_token_secret: '29He0KV4O91hGb7VR0kOyl4Jzo5W1oODKF1UP1EHE2TRP'
});

var params = {
	track : 'euromaidan, євромайдан, евромайдан, pravyjsektor, hromadsketv'
};
//create stream
stream.stream(params);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

var Tweet = require('../models/tweet').Tweet;

//listen stream data
stream.on('data', function(json) {
	if(json.text !== undefined && json.coordinates !== null){
		var tmpTweet = new Tweet({
			tweet : json.text,
			coordinates : json.coordinates.coordinates,
			created_at : json.created_at,
			user : {
				lang : json.user.lang,
				location : json.user.location,
				name : json.user.name,
				profile_image_url : json.user.profile_image_url
			}
		});
		tmpTweet.save(function(err, savedTweet){
			console.log(savedTweet.tweet);
		});
	}
});
