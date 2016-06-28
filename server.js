var express  = require('express');
var mongoose = require('mongoose');
var routes   = require('./app/routes/index.js');

var app = express();
require('dotenv').load();

mongoose.connect(process.env.MONGO_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

routes(app);

app.set('json spaces', 2); // pretty printing!!!1!!1
app.use(function (req, res, next) {
  res.status(404).json({
    error: 'Invalid URL'
  });
});

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});