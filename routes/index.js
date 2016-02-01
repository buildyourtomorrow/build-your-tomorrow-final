var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('/Users/eliezernunez/Desktop/byt/models/income.js');
var Income = mongoose.model('income');

router.get('/', function(req, res){
	res.render('index');
});

router.post('/add-income', function(req, res){	
	var x = new Income;	
	x.description = req.body.description;
	x.amount = req.body.income;
	x.save(function(error){
		console.log(error);
	});

	Income.find({}, 'amount', function(error, allIncome){
		console.log(error);
		x.calcTotalIncome(allIncome);
	});
	return res.send(x);
});

router.get('/all-income', function(req, res){
	Income.find(function(error, allIncome){
		console.log(error);
		return res.json(allIncome);
	});
});

module.exports = router;