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
		if(err.code === 11000){
			return res.status(400).json({message: 'That username is already in use. Pick a new one. Ya heard'});
		}
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
		if (user.income.length > 0 ) {
			user.income.push({'id': user.income.length, 
							  'category': req.body.category, 
							  'amount': req.body.amount})
		};
		if (user.income.length === 0) {
			user.income.push({'id': 0, 
							  'category': req.body.category,
							  'amount': req.body.amount})
		}
		user.save(function(error){
			console.log(error);
			// projections seem to not be working well. 
			User.findOne({'username': req.payload.username}, {'_id': 0, 'income': 1}, function(error, data){
				console.log(error);
				user.calcTotalIncome(data.income);
				user.calcIncomeCategoryTotals();
			});
		});
		return res.json(user);
	});
});
// the add-bills function looks pretty clean. The add-monthly-expenses function needs to be cleaned up.
router.post('/add-bill', auth, function(req, res){	
	User.findOne({'username': req.payload.username}, function(error, user){
		if (user.monthlyBills.length > 0 ) {
			user.monthlyBills.push({'id': user.monthlyBills.length, 
								   	'category': req.body.category, 
								   	'subCategory': req.body.subCategory,
								    'amount': req.body.amount});
		};
		if (user.monthlyBills.length === 0) {
			user.monthlyBills.push({'id': 0, 
								   	'category': req.body.category, 
								   	'subCategory': req.body.subCategory,
								    'amount': req.body.amount});
		};
		user.save(function(error){
			console.log(error);

			User.findOne({'username': req.payload.username}, {'_id': 0, 'monthlyBills': 1}, function(error, data){
				console.log(error);
				user.calcTotalBills(data.monthlyBills);
				user.calcBillCategoryTotals();
			});
		});
		return res.json(user);
	});
});
router.post('/add-monthly-expense', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){		
		if (user.monthlyExpenses.length > 0 ) {
			user.monthlyExpenses.push({'id': user.monthlyExpenses.length, 
								   	   'category': req.body.category, 
								   	   'subCategory': req.body.subCategory,
								       'amount': req.body.amount});
		};
		if (user.monthlyExpenses.length === 0) {
			user.monthlyExpenses.push({'id': 0, 
								   	   'category': req.body.category, 
								   	   'subCategory': req.body.subCategory,
								       'amount': req.body.amount});
		}		
		user.save(function(error){
			console.log(error);
			
			User.find({'username': req.payload.username}, {'_id': 0, 'monthlyExpenses': 1}, function(error, data){
				console.log(error);
				user.calcExpCategoryTotals();
				user.calcPeriodStart();
				user.calcPeriodEnd();
				user.calcToday();
				user.calcDaysLeft();				
				user.calcTotalSpent(data[0].monthlyExpenses);
				user.calcLeftOver();
				user.calcDailyBudget();
				user.calcUpBy();	
				user.calcExpCategoryTotals();			
			});				
		});
		return res.json(user);
	});
});
router.get('/get-user', auth, function(req, res){	
	User.findOne({'username': req.payload.username}, function(error, user){
		if(user){
			user.calcPeriodStart();
			user.calcPeriodEnd();
			user.calcToday();
			user.calcDaysLeft();	
			//user.calcTotalSpent(data[0].monthlyExpenses);
			user.calcLeftOver();
			user.calcDailyBudget();	
			user.calcUpBy();			
			return res.json(user);
		}
		console.log('user is ' + null);
	});
});
router.post('/add-spending-limit', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){
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
router.put('/edit-monthly-expense-amount', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){
		var r = Math.floor(req.body.expense.amount);
		user.monthlyExpenses[req.body.expense.id].amount = r;
		user.save(function(){
			user.calcPeriodStart();
			user.calcPeriodEnd();
			user.calcToday();
			user.calcDaysLeft();	
			user.calcTotalSpent(user.monthlyExpenses);
			user.calcLeftOver();
			user.calcDailyBudget(); 
			user.calcUpBy();							
		});
		return res.json(user);
	});
});
router.put('/edit-monthly-expense-description', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){
		var r = req.body.expense.description;
		user.monthlyExpenses[req.body.expense.id].description = r;
		user.save(function(){
			user.calcPeriodStart();
			user.calcPeriodEnd();
			user.calcToday();
			user.calcDaysLeft();	
			user.calcTotalSpent(user.monthlyExpenses);
			user.calcLeftOver();
			user.calcDailyBudget(); 
			user.calcUpBy();							
		});
		return res.json(user);
	});
});
router.put('/edit-monthly-bill-amount', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){
		var r = Math.floor(req.body.bill.amount);
		user.monthlyBills[req.body.bill.id].amount = r;
		user.save(function(){
			user.calcPeriodStart();
			user.calcPeriodEnd();
			user.calcToday();
			user.calcDaysLeft();	
			user.calcTotalSpent(user.monthlyExpenses);
			user.calcTotalBills(user.monthlyBills);
			user.calcLeftOver();
			user.calcDailyBudget(); 
			user.calcUpBy();							
		});
		return res.json(user);
	});
});
router.put('/edit-monthly-bill-description', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){
		var r = req.body.bill.description;
		user.monthlyBills[req.body.bill.id].description = r;		
		user.save(function(){
			user.calcPeriodStart();
			user.calcPeriodEnd();
			user.calcToday();
			user.calcDaysLeft();	
			user.calcTotalSpent(user.monthlyExpenses);
			user.calcTotalBills(user.monthlyBills);
			user.calcLeftOver();
			user.calcDailyBudget(); 
			user.calcUpBy();							
		});
		return res.json(user);
	});
});
router.put('/edit-monthly-income-amount', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){
		var r = Math.floor(req.body.amount);
		user.income[req.body.id].amount = r;
		user.save(function(){
			user.calcPeriodStart();
			user.calcPeriodEnd();
			user.calcToday();
			user.calcDaysLeft();	
			user.calcTotalSpent(user.monthlyExpenses);
			user.calcTotalIncome(user.income);
			user.calcLeftOver();
			user.calcDailyBudget(); 
			user.calcUpBy();							
		});
		return res.json(user);
	});
});
router.put('/edit-monthly-income-description', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){
		var r = req.body.description;
		user.income[req.body.id].description = r;		
		user.save(function(){
			user.calcPeriodStart();
			user.calcPeriodEnd();
			user.calcToday();
			user.calcDaysLeft();	
			user.calcTotalSpent(user.monthlyExpenses);			
			user.calcLeftOver();
			user.calcDailyBudget(); 
			user.calcUpBy();							
		});
		return res.json(user);
	});
});
module.exports = router;