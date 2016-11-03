var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//for development
if (process.env.USER === "eliezernunez") {
	require('/Users/eliezernunez/Desktop/build/models/User.js');
}; 
//for production
if (process.env.NODE_ENV === "production") {
	require('/app/models/User')
};
var User = mongoose.model('user');
var jwt = require('express-jwt');
var authCheck = jwt({
	secret: new Buffer(process.env.BUILD_SECRET, 'base64'),
	audience: 'EscYrnfdxcDUs3WJeJL1edHhLVrlFQtB',
	userProperty: 'payload'
});
router.post('/create-user', authCheck, function(req, res){
	console.log(req.payload)
	User.findOne({'email': req.payload.email}, function(error, user){
		if(!user){
			var user = new User();
			user.email = req.payload.email;
			user.nickName = req.payload.nickname;
			user.save(function (err){						
				console.log(err);
			});
			return res.json(user);
		}
	})
})
router.post('/add-income', authCheck, function(req, res){
	User.findOne({'email': req.payload.email}, function(error, user){
		if (user.income.length > 0 ) {
			user.income.unshift({'id': user.income.length, 
								 'category': req.body.category, 
								 'amount': req.body.amount,
								 'date': req.body.date});
		};
		if (user.income.length === 0) {
			user.income.unshift({'id': 0, 
							     'category': req.body.category,
							     'amount': req.body.amount,
							     'date': req.body.date});
		}
		user.save();
		return res.json(user);
	});
});
// the add-bills function looks pretty clean. The add-monthly-expenses function needs to be cleaned up.
router.post('/add-bill', authCheck, function(req, res){	
	User.findOne({'email': req.payload.email}, function(error, user){
		if (user.monthlyBills.length > 0 ) {
			user.monthlyBills.unshift({'id': user.monthlyBills.length, 
								   	   'category': req.body.category, 
								   	   'subCategory': req.body.subCategory,
								       'amount': req.body.amount,
								       'date': req.body.date});
		};
		if (user.monthlyBills.length === 0) {
			user.monthlyBills.unshift({'id': 0, 
								   	   'category': req.body.category, 
								   	   'subCategory': req.body.subCategory,
								       'amount': req.body.amount,
								       'date': req.body.date});
		};
		user.save();
		return res.json(user);
	});
});
router.post('/add-monthly-expense', authCheck, function(req, res){
	User.findOne({'email': req.payload.email}, function(error, user){	
		if (user.monthlyExpenses.length > 0 ) {
			user.monthlyExpenses.unshift({'id': user.monthlyExpenses.length, 
								   	      'category': req.body.category, 
								   	      'subCategory': req.body.subCategory,
								          'amount': req.body.amount,
								   	      'date': req.body.date});
		};
		if (user.monthlyExpenses.length === 0) {
			user.monthlyExpenses.unshift({'id': 0, 
								   	      'category': req.body.category, 
								   	      'subCategory': req.body.subCategory,
								          'amount': req.body.amount,
								          'date': req.body.date});
		}		
		user.save();
		return res.json(user);
	});
});
router.get('/', function(req, res){
	res.render('index');
});
router.get('/get-user', authCheck, function(req, res){
	User.findOne({'email': req.payload.email}, function(error, user){
		if(user){
			user.calcPeriodStart();
			user.calcPeriodEnd();
			user.calcToday();
			user.calcDaysLeft();
			user.calcTotalIncome(user.income);
			user.calcTotalBills(user.monthlyBills);
			user.calcTotalSpent(user.monthlyExpenses);
			user.calcLeftOver();
			user.calcDailyBudget();	
			user.calcUpBy();
			user.calcIncomeCategoryTotals();
			user.calcBillCategoryTotals();
			user.calcExpCategoryTotals();
			return res.json(user);
		}
	});
});
router.post('/add-projections', authCheck, function(req, res){
	User.findOne({'email': req.payload.email}, function(error, user){
		user.projectedIncome = req.body.projectedIncome;
		user.projectedBills = req.body.projectedBills;
		user.projectedExpenses = req.body.projectedExpenses;
		user.save();	
		return res.json(user);
	});
});
router.put('/remove-expense', authCheck, function(req, res){
	User.findOne({'email': req.payload.email}, function(error, user){
		user.monthlyExpenses.splice([req.body.index], 1);
		user.save();
		return res.json(user);
	});
});
router.put('/remove-bill', authCheck, function(req, res){
	User.findOne({'email': req.payload.email}, function(error, user){
		user.monthlyBills.splice([req.body.index], 1);
		user.save();
		return res.json(user);
	});
});
router.put('/remove-income', authCheck, function(req, res){
	User.findOne({'email': req.payload.email}, function(error, user){
		user.income.splice([req.body.index], 1);
		user.save();
		return res.json(user);
	});
});
module.exports = router;