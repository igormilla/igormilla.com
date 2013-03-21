
/*
 * GET home page.
 */

exports.index = function(req, res){
	
	var data = {};
	data.title = 'Igor Milla';
	data.twitt = getLatestTwitt();
	console.log(data);
	res.render('index', data);
};

function getLatestTwitt(){
	
	var latestTwitt='';
	var twitter = require('mtwitter');
	
	var twit = new twitter({
	  consumer_key: 'cZB4v8Og1c3oQ4Ys10mRoA',
	  consumer_secret: 'xAbzelwowUrSkIvtU3BLkakhqSyxWd905GiQGJFV7H8',
	  access_token_key: '78973343-rtNv2aQbSJTtUADIZWZzmXHEnd60bp3Jwa7b5dCXr',
	  access_token_secret: 'Yh2SjHCjEz5nLMQRX7o0fimLayRaEv0qPaxJNhElcI'
	});
	
	twit.verifyCredentials(function (err, data) {
		console.log(data.status.text);
	  });	
}
