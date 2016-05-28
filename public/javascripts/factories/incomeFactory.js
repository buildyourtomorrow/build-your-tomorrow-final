app.factory('incomeFactory', ['$http', 'auth', '$state', function($http, auth, $state){
	var o = {
		income: [],
		incomeCategoryTotals: []
	};
	o.incomeTotal = 0;
	o.calculateTotal = function(){
		var total = 0;	
		for (i = 0; i < o.income.length; i++) {
			total += Math.floor(o.income[i].amount);
		};
		return o.incomeTotal = total;
	};
	o.postIncome = function(category, amount){ // function that sends income to api
		return $http.post('/add-income', { 'category': category,  'amount': amount }, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
	};	
	o.getUser = function(){ // function that gets the user from api
		return $http.get('/get-user', {headers: {Authorization: 'Bearer ' + auth.getToken()}} ).then(function(response){
			angular.copy(response.data.income, o.income) // ang-copy deletes everything the income array above and adds every inside of res.data[0].income
			angular.copy(response.data.incomeCategoryTotals, o.incomeCategoryTotals);
			o.calculateTotal();
		}, function(){			
			$state.go('register');
		});
	};
	o.updateIncomeDescription = function(income){
		return $http.put('/edit-monthly-income-description', { 'description': income.description, 'id': income.id }, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
	};
	o.updateIncomeAmount = function(income){
		return $http.put('/edit-monthly-income-amount', { 'amount': income.amount, 'id': income.id }, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
	};
	o.calcIncomeCategoryTotals = function(){
		o.incomeCategoryTotals = [
			{category: "Wages", total: 0},
			{category: "Rental Property", total: 0},
			{category: "Limited Partnerships", total: 0},
			{category: "Market Investments", total: 0},
			{category: "Sole Proprietorship", total: 0},
			{category: "Corporation", total: 0},
			{category: "Child Support", total: 0},
			{category: "Taxes", total: 0}
		];

		for (i = 0; i < o.income.length; i++){
			if (o.income[i].category === "Wages") {
				o.incomeCategoryTotals[0].total += o.income[i].amount;
			};
			if (o.income[i].category === "Rental Property") {
				o.incomeCategoryTotals[1].total += o.income[i].amount;
			};
			if (o.income[i].category === "Limited Partnerships") {
				o.incomeCategoryTotals[2].total += o.income[i].amount;
			};
			if (o.income[i].category === "Market Investments") {
				o.incomeCategoryTotals[3].total += o.income[i].amount;
			};
			if (o.income[i].category === "Sole Proprietorship") {
				o.incomeCategoryTotals[4].total += o.income[i].amount;
			};
			if (o.income[i].category === "Corporation") {
				o.incomeCategoryTotals[5].total += o.income[i].amount;
			};
			if (o.income[i].category === "Child Support") {
				o.incomeCategoryTotals[6].total += o.income[i].amount;
			};
			if (o.income[i].category === "Taxes") {
				o.incomeCategoryTotals[7].total += o.income[i].amount;
			};
		};
	}
	return o
}]);