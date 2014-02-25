var express = require('express')
  , routes = require('./routes')
  , twitter = require('./routes/twitter')
  , lastfm = require('./routes/lastfm')
  , http = require('http')
  , path = require('path')
  , ejs = require('ejs');

ejs.open = '{{';
ejs.close = '}}';

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 8080);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.compress());
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
app.get('/twitter', twitter.getStream);
app.get('/lastfm/stream', lastfm.getStream);
app.get('/map', twitter.getTweets);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
