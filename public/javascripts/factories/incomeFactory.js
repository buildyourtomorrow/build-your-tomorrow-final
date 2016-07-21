app.factory('incomeFactory', ['$http', '$state', function($http, $state){
	var o = {
		income: [],
		incomeCategoryTotals: [],
		nickName: []
	};
	o.removeIncome = function(index){
		o.income.splice(index, 1);
		return $http.put('/remove-income', {'index': index})	
	};
	o.incomeTotal = 0;
	o.calculateTotal = function(){
		var total = 0;	
		for (i = 0; i < o.income.length; i++) {
			total += Math.floor(o.income[i].amount);
		};
		return o.incomeTotal = total;
	};
	o.postIncome = function(category, amount, date){ // function that sends income to api
		return $http.post('/add-income', { 'category': category,  'amount': amount, 'date': date });
	};	
	o.getUser = function(){ // function that gets the user from api
		return $http({
			url: '/get-user',
			method: 'GET'
		}).then(function(response){
			angular.copy(response.data.income, o.income) // ang-copy deletes everything the income array above and adds every inside of res.data[0].income
			angular.copy(response.data.incomeCategoryTotals, o.incomeCategoryTotals);
			o.calculateTotal();
			o.nickName = [];
			o.nickName.push(response.data.nickName);
		}, function(){			
			$state.go('login');
		});
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