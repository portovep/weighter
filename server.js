// Dev server to run the app

var restify = require('restify');
var server = restify.createServer();

server.use(restify.bodyParser({ mapParams: false }));

var knexConfig = require('./db/knexfile');
var knex = require('knex')(knexConfig);


function getWeightEntries(req, res, next) {
  knex.select().table('weights')
      .then(function(weightEntries) {
        console.info('[DB] Fetched %d entries from the weights table', weightEntries.length);

        res.send(200, weightEntries);
        return next();
      })
      .catch(function(e) {
        console.error('[DB] Error trying to get weight entries from the weights table %s', e);

        res.send(500);
        return next();
      });
}

function saveWeightEntry(req, res, next) {
  var newWeightEntry = req.body;

  knex('weights').insert(newWeightEntry)
      .then(function() {
        console.info("[DB] Saved new weight entry: %s", JSON.stringify(newWeightEntry));

        return knex.select().table('weights')
      })

      .then(function(weightEntries) {
        res.send(201, weightEntries);
        return next();
      })

      .catch(function(e) {
        console.error('[DB] Error trying to save weight entry int the weights table %s', e);

        res.send(500);
        return next();
      });
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