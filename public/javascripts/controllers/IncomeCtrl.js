app.controller('IncomeCtrl', ['$scope',
							  'store',
							  'auth', 
							  '$anchorScroll', 
							  'incomeFactory', function($scope, 
							  							store,
							  							auth,
							  							$anchorScroll, 
							  							incomeFactory){

	$scope.allIncome = incomeFactory.income;
	$scope.totalIncome = incomeFactory.incomeTotal;
	$scope.categories = incomeFactory.incomeCategoryTotals;
	$scope.lastVisit = incomeFactory.income[0];
	$scope.goToAllIncome = function(){
	    $anchorScroll('allIncomeTransactions');
	};

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
	$scope.removeIncome = function(index){
        incomeFactory.removeIncome(index);
        incomeFactory.calcIncomeCategoryTotals();
        $scope.categories = incomeFactory.incomeCategoryTotals;
    };
	// function that processes income form. 
	$scope.incomeForm = function(){
		incomeFactory.postIncome($scope.category, $scope.amount, new Date()); // send form to api
		if (incomeFactory.income.length > 0 ) {
			incomeFactory.income.unshift({'id': incomeFactory.income.length, 
								   	   'category': $scope.category, 
									   'amount': $scope.amount,
									   'date': new Date()});
		};
		if (incomeFactory.income.length === 0 ) {
			incomeFactory.income.unshift({'id': 0, 
								   	   'category': $scope.category, 
									   'amount': $scope.amount,
									   'date': new Date()});
		};
		incomeFactory.calculateTotal();
		incomeFactory.calcIncomeCategoryTotals();

		$scope.categories = incomeFactory.incomeCategoryTotals;
		$scope.totalIncome = incomeFactory.incomeTotal;
		$scope.lastVisit = incomeFactory.income[0];

		$scope.monthlyIncomeForm.$setPristine();
		$scope.category='';
		$scope.amount='';		
		$scope.question='';
	};	
}]);