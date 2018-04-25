var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var router = require('./routes/router');
let $validat = require('./controls/Validat');
require('./utils/functionExpand');

global.$md5 = require('md5');
global.$session_catch = require('./utils/session_catch');
global.$code = require('./utils/response_code');
global.$utils = require('./utils/utils');

var port = process.env.PORT || 12200;
var app = express();

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "x-requested-with,token,content-type,user");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());


app.use(session({
    secret: 'fuckupig',
    cookie: {user: "default", maxAge: 3 * 24 * 60 * 60 * 1000, isLogin: false},
    resave: true,
    saveUninitialized: true,
}));
//请求过滤
app.use($validat.validat);


app.use(router);

app.listen(port, () => {
    console.log(`devServer start on port:${ port}`);
});
