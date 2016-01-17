var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/incomedb');
require('./models/income.js');
var Income = mongoose.model('income');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// middleware
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res){
	res.render('index');
});

app.post('/income', function(req, res){	
	var income = req.body.income;
	console.log(income);
	var x = new Income;
	x.income = req.body.income;
	x.save(function(error){
		console.log(error);
	});

});

app.listen(3000);

// router.get('dashboard', function(){});
// router.post('submit-expenses', function(){});
// router.post('submit-bills', function(){});
// router.post('submit-income', function(){});
// app.use(express.static(__dirname + 'public'));