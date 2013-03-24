
/*
 * GET home page.
 */

exports.tweets = function (req, res){
	var data = {};
	data.title = 'Igor Milla';
	res.send(data);
	
}

	


/*
 * var twitter = require('mtwitter'),
		twit 	= new twitter({
		  consumer_key: 'cZB4v8Og1c3oQ4Ys10mRoA',
		  consumer_secret: 'xAbzelwowUrSkIvtU3BLkakhqSyxWd905GiQGJFV7H8',
		  access_token_key: '78973343-rtNv2aQbSJTtUADIZWZzmXHEnd60bp3Jwa7b5dCXr',
		  access_token_secret: 'Yh2SjHCjEz5nLMQRX7o0fimLayRaEv0qPaxJNhElcI'
		});
	
	twit.verifyCredentials(function (err, data) {
		res.send(data);
	  });	
 * 
 * 
 */