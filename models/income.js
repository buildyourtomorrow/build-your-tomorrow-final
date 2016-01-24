var mongoose = require('mongoose');

var IncomeSchema = new mongoose.Schema({
	amount: Number
});

mongoose.model('income', IncomeSchema);