var mongoose = require("mongoose");

var TweetSchema = new mongoose.Schema({
	tweet : String,
	coordinates : Array,
	user : {
		lang :  String,
		location : String,
		name : String,
		profile_image_url : String
	}
});

var Tweet =  mongoose.model('Tweet', TweetSchema);

module.exports = {
	Tweet : Tweet
}

