exports.getStream = function( req, res ){
	var youtube = require('youtube-node');
	youtube.setKey('AIzaSyCLfpvvT2h0QMa4ZwQCZW_uwJr1hEq_vTc');

	var lastfmNode = require('lastfm').LastFmNode;
	var lastfm = new lastfmNode({
	  api_key	: 'a3673aaa4a4e2090e0f61663c8a7fb4e',
	  secret	: 'd2ccc6f1deb3a1e37e5c5fdb53f60189',
	  useragent	: 'appname/igormilla.com' 
	});
	var trackStream = lastfm.stream('s_ashen');

	function lastfmStreamCallback(track) {
		//trackStream.stop();		
		var data = {};
		data.img = track.image[2]['#text'];
		data.track = track.name;
		data.artist = track.artist['#text'];
		data.url = track.url;
		data.date = track.date['uts'];
		youtube.search(data.artist + ' ' + data.track, 1, function(resultData){
			if(resultData.items.length > 0){
				console.log(resultData.items[0].id.videoId);
				data.youtube = resultData.items[0].id.videoId;
			}
			res.render('partials/lastfm/lastfm-stream', data);
		});

	};

	trackStream
		.on('lastPlayed', lastfmStreamCallback)
		.start();
};
