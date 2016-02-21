var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//for development
if (process.env.USER === "eliezernunez") {
	require('/Users/eliezernunez/Desktop/byt/models/User.js');
}; 

//for production
if (process.env.NODE_ENV === "production") {
	require('/app/models/User')
}; 

var User = mongoose.model('user');
var passport = require('passport');
var jwt = require('express-jwt');
console.log(process.env.BYT_SECRET);
var auth = jwt({secret: process.env.BYT_SECRET, userProperty: 'payload'});

router.get('/', function(req, res){
	res.render('index');
});

router.post('/register', function(req, res, next){
	if(!req.body.username || !req.body.password){
		return res.status(400).json({message: 'Please fill out all fields'});
	}
	var user = new User();
	user.username = req.body.username;
	user.setPassword(req.body.password)
	user.save(function (err){
		if(err){ return next(err); }
		return res.json({token: user.generateJWT()})
	});
});

router.post('/login', function(req, res, next){
	if(!req.body.username || !req.body.password){
		return res.status(400).json({message: 'Please fill out all fields'});
	}
	// login logic is case sensitive
	passport.authenticate('local', function(err, user, info){
		if(err){ return next(err); } // what is that error message.
		if(user){
		  return res.json({token: user.generateJWT()});
		} else {
		  return res.status(401).json(info); // what is info message.
		}
	})(req, res, next);
});

router.post('/add-income', auth, function(req, res){	
	User.findOne({'username': req.payload.username}, function(error, user){
		user.income.push({'description': req.body.description, 'amount': req.body.income});
		user.save(function(error){
			console.log(error);
			// projections seem to not be working well. 
			User.findOne({'username': req.payload.username}, {'_id': 0, 'income': 1}, function(error, data){
				console.log(error);
				user.calcTotalIncome(data.income);
			});
		});
		return res.json(user);
	});
});

router.post('/add-bill', auth, function(req, res){	
	User.findOne({'username': req.payload.username}, function(error, user){
		user.monthlyBills.push({'description': req.body.description, 'amount': req.body.amount});
		user.save(function(error){
			console.log(error);

			User.findOne({'username': req.payload.username}, {'_id': 0, 'monthlyBills': 1}, function(error, data){
				console.log(error);
				user.calcTotalBills(data.monthlyBills);
			});
		});
		return res.json(user);
	});
});

router.get('/get-user', auth, function(req, res){	
	User.findOne({'username': req.payload.username}, function(error, user){
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

router.post('/add-monthly-expense', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){
		user.monthlyExpenses.push({'description': req.body.description, 'amount': req.body.amount});
		user.save(function(error){
			console.log(error);
			
			User.find({'username': req.payload.username}, {'_id': 0, 'monthlyExpenses': 1}, function(error, data){
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

router.post('/add-spending-limit', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){
		user.spendingLimit = req.body.spendingLimit;
		console.log(user);
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