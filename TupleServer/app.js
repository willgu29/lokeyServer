var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var messages = require('./routes/messages');
var messageThreads = require("./routes/messageThreads");
var tuples = require('./routes/tuples');
var tuplerLists = require("./routes/tuplerLists");

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var chatroom = require("./routes/chat");

chatroom.connection(io);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);
app.use('/api/users', users);
app.use('/api/messages', messages);
app.use('/api/messageThreads', messageThreads);
app.use('/api/tuples', tuples);
app.use('/api/tuplerLists', tuplerLists)

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

var mongoose = require('mongoose');

var connectDBLink = "mongodb://localhost/tuple";


mongoose.connect(connectDBLink);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log("DB opened");
});


/*function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}
*/

http.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});





module.exports = app;
