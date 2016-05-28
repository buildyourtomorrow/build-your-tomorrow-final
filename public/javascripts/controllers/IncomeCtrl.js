app.controller('IncomeCtrl', ['$scope', 'incomeFactory', 'auth', function($scope, incomeFactory, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.allIncome = incomeFactory.income;
	$scope.totalIncome = incomeFactory.incomeTotal;
	$scope.categories = incomeFactory.incomeCategoryTotals;

	$scope.monthlyIncomeCategories = [
		{id: "Wages", value: "Wages" },
		{id: "Rental Property", value: "Rental Property" },
		{id: "Limited Partnerships", value: "Limited Partnerships" },
		{id: "Market Investments", value: "Market Investments" },
		{id: "Sole Proprietorship", value: "Sole Proprietorship" },
		{id: "Corporation", value: "Corporation" },
		{id: "Child Support", value: "Child Support" },
		{id: "Taxes", value: "Taxes" }
	];
	$scope.updateIncomeDesc = function(income){
		incomeFactory.updateIncomeDescription(income);
	};
	$scope.updateIncomeAmount = function(income){
		incomeFactory.updateIncomeAmount(income);
		incomeFactory.calculateTotal();
		$scope.totalIncome = incomeFactory.incomeTotal;
	};
	// function that processes income form. 
	$scope.incomeForm = function(){
		incomeFactory.postIncome($scope.category, $scope.amount); // send form to api
		if (incomeFactory.income.length > 0 ) {
			incomeFactory.income.push({'id': incomeFactory.income.length, 
								   	   'category': $scope.category, 
									   'amount': $scope.amount});
		};
		if (incomeFactory.income.length === 0 ) {
			incomeFactory.income.push({'id': 0, 
								   	   'category': $scope.category, 
									   'amount': $scope.amount});
		};
		incomeFactory.calculateTotal();
		incomeFactory.calcIncomeCategoryTotals();

		$scope.categories = incomeFactory.incomeCategoryTotals;
		$scope.totalIncome = incomeFactory.incomeTotal;

		$scope.monthlyIncomeForm.$setPristine();
		$scope.category='';
		$scope.amount='';
	};
}]);