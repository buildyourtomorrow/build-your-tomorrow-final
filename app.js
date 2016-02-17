var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');

mongoose.connect('mongodb://localhost/incomedb'); // connection to database
require('./models/User');
require('./config/passport');

var routes = require('./routes/index.js'); //get all routes from folder ./routes/index.js

// template related code
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// middleware
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(passport.initialize());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/', routes); // use routes from the folder above.

app.listen(3000);