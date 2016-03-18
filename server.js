// Dev server to run the app

var restify = require('restify');
var server = restify.createServer();

function getWeightEntries(req, res, next) {
  var weight_entries = [
    {id: '1', weight: '81.1', date: '22/01/2016', unit: 'kg'},
    {id: '2', weight: '82.7', date: '15/01/2016', unit: 'kg'},
    {id: '3', weight: '82.5', date: '08/01/2016', unit: 'kg'},
    {id: '4', weight: '84.1', date: '02/01/2016', unit: 'kg'}
  ];

  res.send(200, weight_entries);
  return next();
}

server.get('/api/user/:id/weight', getWeightEntries);

server.get(/\//, restify.serveStatic({
  directory: './public',
  default: 'index.html'
}));

server.listen(3000, function() {
  console.log('Dev server up and rocking on %s', server.url);
});