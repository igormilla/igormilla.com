var express     = require('express'),
    http        = require('http'),
    path        = require('path'),
    ejs         = require('ejs'),
    ghost       = require('ghost'),
    routes      = require('./routes'),
    twitter     = require('./routes/twitter'),
    lastfm      = require('./routes/lastfm');

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
  app.use(function (req, res, next) {
    if ('/robots.txt' == req.url) {
      res.type('text/plain')
      res.send("User-agent: *\nDisallow: ");
    } else {
      next();
    }
  });
  app.use(require('less-middleware')(path.join(__dirname, '/public')));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/twitter', twitter.getStream);
app.get('/lastfm/stream', lastfm.getStream);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

ghost().then(function(ghostServer){
  app.use(ghostServer.config.paths.subdir, ghostServer.rootApp);
  ghostServer.start(app);  
});

