// Dev server to run the app

var restify = require('restify');
var server = restify.createServer();

server.get(/\//, restify.serveStatic({
  directory: './public',
  default: 'index.html'
}));

server.listen(3000, function() {
  console.log('Dev server up and rocking on %s', server.url);
});