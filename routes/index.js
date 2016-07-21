var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//for development
if (process.env.USER === "eliezernunez") {
<<<<<<< HEAD
	require('/Users/eliezernunez/Desktop/build/models/User.js');
=======
	require('/Users/eliezernunez/Desktop/byt/models/User.js');
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
}; 
//for production
if (process.env.NODE_ENV === "production") {
	require('/app/models/User')
};
var User = mongoose.model('user');
<<<<<<< HEAD
var jwt = require('express-jwt');
var authCheck = jwt({
	secret: new Buffer(process.env.BUILD_SECRET, 'base64'),
	audience: 'EscYrnfdxcDUs3WJeJL1edHhLVrlFQtB',
	userProperty: 'payload'
});
router.post('/create-user', authCheck, function(req, res){

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
=======
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
		if(err && err.code === 11000){
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
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
		}
		user.save();
		return res.json(user);
	});
});
// the add-bills function looks pretty clean. The add-monthly-expenses function needs to be cleaned up.
<<<<<<< HEAD
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
=======
router.post('/add-bill', auth, function(req, res){	
	User.findOne({'username': req.payload.username}, function(error, user){
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
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
		};
		user.save();
		return res.json(user);
	});
});
<<<<<<< HEAD
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
=======
router.post('/add-monthly-expense', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){		
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
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
		}		
		user.save();
		return res.json(user);
	});
});
<<<<<<< HEAD
router.get('/', function(req, res){
	res.render('index');
});
router.get('/get-user', authCheck, function(req, res){
	User.findOne({'email': req.payload.email}, function(error, user){
=======
router.get('/get-user', auth, function(req, res){	
	User.findOne({'username': req.payload.username}, function(error, user){
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
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
<<<<<<< HEAD
	});
});
router.post('/add-projections', authCheck, function(req, res){
	User.findOne({'email': req.payload.email}, function(error, user){
=======
		console.log('user is ' + null);
	});
});
router.post('/add-projections', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
		user.projectedIncome = req.body.projectedIncome;
		user.projectedBills = req.body.projectedBills;
		user.projectedExpenses = req.body.projectedExpenses;
		user.save();	
		return res.json(user);
	});
});
<<<<<<< HEAD
router.put('/remove-expense', authCheck, function(req, res){
	User.findOne({'email': req.payload.email}, function(error, user){
=======
router.put('/remove-expense', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
		user.monthlyExpenses.splice([req.body.index], 1);
		user.save();
		return res.json(user);
	});
});
<<<<<<< HEAD
router.put('/remove-bill', authCheck, function(req, res){
	User.findOne({'email': req.payload.email}, function(error, user){
=======
router.put('/remove-bill', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
		user.monthlyBills.splice([req.body.index], 1);
		user.save();
		return res.json(user);
	});
});
<<<<<<< HEAD
router.put('/remove-income', authCheck, function(req, res){
	User.findOne({'email': req.payload.email}, function(error, user){
=======
router.put('/remove-income', auth, function(req, res){
	User.findOne({'username': req.payload.username}, function(error, user){
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
		user.income.splice([req.body.index], 1);
		user.save();
		return res.json(user);
	});
});
module.exports = router;