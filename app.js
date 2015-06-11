var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');
var banners = require('./routes/banners');
var events = require('./routes/events');
var orders = require('./routes/orders');
var activitys = require('./routes/activitys');
var clubs = require('./routes/clubs');
var pay = require('./routes/pay');
var appVersions = require('./routes/appVersions');
var session = require('express-session'); //如果要使用session，需要单独包含这个模块
var RedisStore = require('connect-redis')(session);

var app = express();

var dbName = 'malathon';

//112.74.109.66
var connectionString = 'mongodb://120.24.156.177:27017/'+dbName;

mongoose.connect(connectionString,function(err){
    if(err){
        console.log('db connect error!')
    }else{
        console.log('db connect success!')
    }
});




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/WebContent', express.static(__dirname+'/WebContent'));

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));

//app.use(function(req,res,next){
//    // parse
//    var buf = '';
//    req.setEncoding('utf8');
//    req.on('data', function(chunk){ buf += chunk });
//    req.on('end', function(){
//        if(buf){
//            try{
//                var qs = require('querystring');
//                var ob = qs.decode(buf);
//                req.query = ob;
//            }catch (e){
//                console.log('taobao body parser fail!');
//                console.log(e);
//            }
//        }
//        next();
//    });
//});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置 Session
app.use(session({
    store: new RedisStore({
        host: "120.24.156.177",
        port: 6379,
        db: "marathon_session",
        prefix:""
    }),
    cookie:{maxAge:7*24*3600*1000},
    resave:false,
    saveUninitialized:false,
    secret: 'keyboard cat'
}));
//
//app.get("/", function(req, res) {
//
//    var session = req.session;
//    session.count = session.count || 0;
//    var n = session.count++;
//    res.send('hello, session id:' + session.id + ' count:' + n);
//});

app.use('/action', index);
app.use('/users', users);
app.use('/banners', banners);
app.use('/events', events);
app.use('/orders', orders);
app.use('/activitys', activitys);
app.use('/clubs', clubs);
app.use('/pay', function(req,res,next){
    // parse
    var buf = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ buf += chunk });
    req.on('end', function(){
        if(buf){
            try{
                var qs = require('querystring');
                var ob = qs.decode(buf);
                req.query = ob;
            }catch (e){
                console.log('taobao body parser fail!');
                console.log(e);
            }
        }
        next();
    });
},pay);
app.use('/appVersions', appVersions);


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
//app.use(function(err, req, res, next) {
//  res.status(err.status || 500);
//  res.render('error', {
//    message: err.message,
//    error: {}
//  });
//});


module.exports = app;
