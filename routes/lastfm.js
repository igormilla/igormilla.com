

exports.getStream = function( req, res ){
	
	var lastfmNode = require('lastfm').LastFmNode,

	lastfm = new lastfmNode({
	  api_key	: 'a3673aaa4a4e2090e0f61663c8a7fb4e',
	  secret	: 'd2ccc6f1deb3a1e37e5c5fdb53f60189',
	  useragent	: 'appname/igormilla.com' 
	}),
	
	trackStream = lastfm.stream('s_ashen');

	function lastfmStreamCallback(track) {
		//trackStream.stop();		
		var data = {};
		data.img = track.image[2]['#text'];
		data.track = track.name;
		data.artist = track.artist['#text'];
		data.url = track.url;
		data.date = track.date['uts'];
		res.render('partials/lastfm/lastfm-stream', data);
	};
	
	trackStream
		.on('lastPlayed', lastfmStreamCallback)
		.start();
};