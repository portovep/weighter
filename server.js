// Dev server to run the app

var restify = require('restify');
var server = restify.createServer();

function getWeightEntries(req, res, next) {
  var weight_entries = [
    {id: '1', weight: '81.1', date: 'Tue Mar 16 2016 09:48:47 GMT+0000 (GMT)', unit: 'kg'},
    {id: '2', weight: '82.7', date: 'Wed Mar 17 2016 10:48:47 GMT+0000 (GMT)', unit: 'kg'},
    {id: '3', weight: '82.5', date: 'Fri Mar 18 2016 11:48:47 GMT+0000 (GMT)', unit: 'kg'},
    {id: '4', weight: '84.1', date: 'Sat Mar 19 2016 13:48:47 GMT+0000 (GMT)', unit: 'kg'}
  ];

  res.send(200, weight_entries);
  return next();
}

server.get('/api/user/:id/weight', getWeightEntries);

server.get(/\//, restify.serveStatic({
  directory: './public',
  default: 'index.html'
}));

server.listen((process.env.PORT || 3000), function() {
  console.log('Dev server up and rocking on %s', server.url);
});