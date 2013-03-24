
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('less-middleware')({ src: __dirname + '/public' }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/tweets', function(req, res){
	var twitter = require('mtwitter'),
	twit 	= new twitter({
	  consumer_key: 'cZB4v8Og1c3oQ4Ys10mRoA',
	  consumer_secret: 'xAbzelwowUrSkIvtU3BLkakhqSyxWd905GiQGJFV7H8',
	  access_token_key: '78973343-rtNv2aQbSJTtUADIZWZzmXHEnd60bp3Jwa7b5dCXr',
	  access_token_secret: 'Yh2SjHCjEz5nLMQRX7o0fimLayRaEv0qPaxJNhElcI'
	});

	twit.verifyCredentials(function (err, data) {
		res.writeHead(200, {'content-type': 'text/json' });
	    res.write( JSON.stringify({"tweet":data.status.text}) );
	    res.end('\n');
	  });	
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
