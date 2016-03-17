var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');//add mongoose
var secret = require('./config/secret');// add the secret


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


//connect to database
mongoose.connect(secret.database, function(err) {
	if(err){
		console.log('ERROR on connections > ',err);
	} else {
		console.log('OK connected to the database!');
	}
	
});

var apiStore = require('./apis/store'); // add api for stores
var apiArticle = require('./apis/article'); // add api for articles
var apiVariant = require('./apis/variant'); // add api for variants
var apiPrice = require('./apis/price'); // add api for prices per prices
var apiInventory = require('./apis/inventory'); // add api for prices per inventories




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.use('/api', apiStore); // add the apis
app.use('/api', apiArticle); // add the apis
app.use('/api', apiVariant); // add the apis
app.use('/api', apiPrice); // add the apis
app.use('/api', apiInventory); // add the apis





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
