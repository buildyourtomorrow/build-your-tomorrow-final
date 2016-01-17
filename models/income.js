var mongoose = require('mongoose');

var IncomeSchema = new mongoose.Schema({
	income: Number
});

mongoose.model('income', IncomeSchema);