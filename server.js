// Dev server to run the app

var restify = require('restify');
var server = restify.createServer();

server.use(restify.bodyParser({ mapParams: false }));

var weightEntries = [
  {id: '1', weight: '81.1', date: 'Tue Mar 16 2016 09:48:47 GMT+0000 (GMT)', unit: 'kg'},
  {id: '2', weight: '82.7', date: 'Wed Mar 17 2016 10:48:47 GMT+0000 (GMT)', unit: 'kg'},
  {id: '3', weight: '82.5', date: 'Fri Mar 18 2016 11:48:47 GMT+0000 (GMT)', unit: 'kg'},
  {id: '4', weight: '84.1', date: 'Sat Mar 19 2016 13:48:47 GMT+0000 (GMT)', unit: 'kg'}
];

function getWeightEntries(req, res, next) {
  res.send(200, weightEntries);
  return next();
}

function saveWeightEntry(req, res, next) {
  var newWeightEntry = req.body;
  weightEntries.push(newWeightEntry);
  console.info("Saved new weight entry: %s", JSON.stringify(newWeightEntry));

  res.send(201, weightEntries);
  return next();
}

server.get('/api/user/:id/weight', getWeightEntries);
server.post('/api/user/:id/weight', saveWeightEntry);

server.get(/\//, restify.serveStatic({
  directory: './public',
  default: 'index.html'
}));

server.listen((process.env.PORT || 3000), function() {
  console.log('Dev server up and rocking on %s', server.url);
});