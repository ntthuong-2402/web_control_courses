var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require("mongoose");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongo = require('./routes/mongo.js');
var session = require('express-session');


var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");
//-------------------------------
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//---------------------------
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));
//-----------------------------


app.use('/', require('./routes/page'));
app.use('/auth', require('./routes/auth'));


//Conect MongoDB
mongoose.connect(mongo.url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        // console.log("Successfully connect to MongoDB.");
        // initial();
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });;

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
    console.log("Connected successfully");
});

var Router = require('./routes/routes.js')
app.use(Router);

module.exports = app;