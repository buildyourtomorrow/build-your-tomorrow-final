var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
	},
	hash: String, // this is where the password goes. It will be saved as a hash.
	salt: String,
	monthlyBills: [{
		id: Number,
		description: String,
		amount: Number,
		date: Date
	}],
	billsTotal: {
		id: Number,
		type: Number,
		default: 0
	},	
	income: [{
		id: Number,
		description: String,
		amount: Number,
		date: Date
	}],
	totalIncome: {
		id: Number,
		type: Number,
		default: 0
	},
	spendingLimit: {
		id: Number,
		type: Number,
		default: 0
	},
	totalSpent: {
		id: Number,
		type: Number,
		default: 0
	},
	leftOver: {
		id: Number,
		type: Number,
		default: 0
	},	
	upBy: {
		id: Number,
		type: Number,
		default: 0
	},
	dailyBudget: {
		id: Number,
		type: Number,
		default: 0
	},
	daysLeft: {
		id: Number,
		type: Number,
		default: 0
	},
	periodStart: Date,
	periodEnd: Date,
	today: Date,
	monthlyExpenses: [{ 
		id: Number,
		description: String,
		amount: Number,
		date: Date
	}]
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, process.env.BYT_SECRET);
};

UserSchema.methods.calcTotalIncome = function(allIncome){		
	var total = 0;
	for (i = 0; i < allIncome.length; i++) {	
		total = total + allIncome[i].amount;
	};
	this.totalIncome = total;
	this.save();
};

UserSchema.methods.calcTotalBills = function(allbills){		
	var total = 0;
	for (i = 0; i < allbills.length; i++) {	
		total = total + allbills[i].amount;
	};
	this.billsTotal = total;
	this.save();
};

UserSchema.methods.calcTotalSpent = function(allMonthlyExpenses){		
	var total = 0;
	for (i = 0; i < allMonthlyExpenses.length; i++) {	
		total = total + allMonthlyExpenses[i].amount;
	};
	this.totalSpent = total;
	this.save();
};

UserSchema.methods.calcLeftOver = function(){
	this.leftOver = this.spendingLimit - this.totalSpent;
	this.save();
};

UserSchema.methods.calcUpBy = function(){
	this.upBy = ( this.dailyBudget * this.today.getDate() ) -  this.totalSpent;
	this.save();
};

UserSchema.methods.calcDailyBudget = function(){
	this.dailyBudget = this.spendingLimit / this.periodEnd.getDate()  
	this.save();
};

UserSchema.methods.calcDaysLeft = function(){
	this.daysLeft = this.periodEnd.getDate() - this.today.getDate();
	this.save();
};

UserSchema.methods.calcPeriodStart = function(){
	// from StackOverFlow
	var offset = -5.0
	var clientDate = new Date();
	var utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
	var serverDate = new Date(utc + (3600000*offset));

	var mm = serverDate.getMonth() + 1;
	var dd = 1;
	var year = serverDate.getFullYear();
	this.periodStart = mm + '/' + dd + '/' + year;	
	this.save();
};

UserSchema.methods.calcPeriodEnd = function(){
	// from StackOverFlow
	var offset = -5.0
	var clientDate = new Date();
	var utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
	var serverDate = new Date(utc + (3600000*offset));

	var year = serverDate.getFullYear();
	var month = serverDate.getMonth() + 1;
	var o = new Date(year, month, 0);
	var mm = o.getMonth() + 1;
	var dd = o.getDate();
	var yyyy = o.getFullYear();
	this.periodEnd = mm + '/' + dd + '/' + yyyy;
	this.save();
};

UserSchema.methods.calcToday = function(){
	// from StackOverFlow
	var offset = -5.0
	var clientDate = new Date();
	var utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
	var serverDate = new Date(utc + (3600000*offset));

	var dd = serverDate.getDate();
	var mm = serverDate.getMonth() + 1;
	var yyyy = serverDate.getFullYear();
	this.today = mm + '/' + dd + '/' + yyyy; 
	this.save();
};

mongoose.model('user', UserSchema);