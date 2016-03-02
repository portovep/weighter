// Dev server to run the app

var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/public'))

app.listen(3000, function () {
  console.log('Dev server up and rocking on port 3000!');
});