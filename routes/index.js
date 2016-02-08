var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
require('/Users/eliezernunez/Desktop/byt/models/User.js');
var User = mongoose.model('user');

router.get('/', function(req, res){
	res.render('index');
});

router.post('/add-income', function(req, res){	
	User.find({'username': 'Eliezer'}, function(error, user){
		var user = user[0];
		user.income.push({'description': req.body.description, 'amount': req.body.income});
		user.save(function(error){
			console.log(error);
			// projections seem to not be working well. 
			User.find({'username': 'Eliezer'}, {'_id': 0, 'income': 1}, function(error, data){
				console.log(error);
				user.calcTotalIncome(data[0].income);
			});
		});
		return res.json(user);
	});
});

router.post('/add-bill', function(req, res){	
	User.find({'username': 'Eliezer'}, function(error, user){
		var user = user[0];
		user.monthlyBills.push({'description': req.body.description, 'amount': req.body.amount});
		user.save(function(error){
			console.log(error);

			User.find({'username': 'Eliezer'}, {'_id': 0, 'monthlyBills': 1}, function(error, data){
				console.log(error);
				user.calcTotalBills(data[0].monthlyBills);
			});
		});
		return res.json(user);
	});
});

router.get('/get-user', function(req, res){	
	User.find({'username': 'Eliezer'}, function(error, user){
		var user = user[0];
		user.calcPeriodStart();
		user.calcPeriodEnd();
		user.calcToday();
		user.calcDaysLeft();	
		//user.calcTotalSpent(data[0].monthlyExpenses);
		user.calcLeftOver();
		user.calcDailyBudget();	
		user.calcUpBy();			
		return res.json(user);
	});
});

router.post('/add-monthly-expense', function(req, res){
	User.find({'username': 'Eliezer'}, function(error, user){
		var user = user[0];
		user.monthlyExpenses.push({'description': req.body.description, 'amount': req.body.amount});
		user.save(function(error){
			console.log(error);
			
			User.find({'username': 'Eliezer'}, {'_id': 0, 'monthlyExpenses': 1}, function(error, data){
				console.log(error);
				user.calcPeriodStart();
				user.calcPeriodEnd();
				user.calcToday();
				user.calcDaysLeft();	
				user.calcTotalSpent(data[0].monthlyExpenses);
				user.calcLeftOver();
				user.calcDailyBudget();
				user.calcUpBy();				
			});				
		});
		return res.json(user);
	});
});

router.post('/add-spending-limit', function(req, res){
	User.find({'username': 'Eliezer'}, function(error, user){
		var user = user[0];
		user.spendingLimit = req.body.spendingLimit;
		user.save(function(){
			user.calcPeriodStart();
			user.calcPeriodEnd();
			user.calcToday();
			user.calcDaysLeft();	
			//user.calcTotalSpent(data[0].monthlyExpenses);
			user.calcLeftOver();
			user.calcDailyBudget(); 
			user.calcUpBy();							
		});	
		return res.json(user);
	});
});

module.exports = router;