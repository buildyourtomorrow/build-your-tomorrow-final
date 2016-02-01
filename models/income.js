var mongoose = require('mongoose');

var IncomeSchema = new mongoose.Schema({
	description: String,
	amount: Number,
	totalIncome: Number
});

IncomeSchema.methods.calcTotalIncome = function(allIncome){		
	var total = 0;
	for (i = 0; i < allIncome.length; i++) {	
		total = total + allIncome[i].amount;
	};
	this.totalIncome = total;
	this.save();
	
};

mongoose.model('income', IncomeSchema);