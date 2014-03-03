var mongoose = require("mongoose");

var TweetSchema = new mongoose.Schema({
	tweet : String,
	coordinates : Array,
	created_at : Date,
	user : {
		lang :  String,
		screen_name : String,
		location : String,
		name : String,
		profile_image_url : String
	},
	entities : {
		media : String
	}
});

var Tweet =  mongoose.model('Tweet', TweetSchema);

module.exports = {
	Tweet : Tweet
}

