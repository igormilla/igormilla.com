var lastfmNode = require('lastfm').LastFmNode,

	lastfm = new lastfmNode({
	  api_key	: 'a3673aaa4a4e2090e0f61663c8a7fb4e',
	  secret	: 'd2ccc6f1deb3a1e37e5c5fdb53f60189',
	  useragent	: 'appname/igormilla.com' 
	}),
	
	trackStream = lastfm.stream('s_ashen');

exports.getStream = function( req, res ){

	function lastfmStreamCallback(track) {
		trackStream.stop();
		console.log(JSON.stringify(track));
	};
	
	trackStream
		.on('lastPlayed', lastfmStreamCallback)
		.start();
};