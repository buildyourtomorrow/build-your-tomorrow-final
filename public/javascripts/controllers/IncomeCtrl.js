app.controller('IncomeCtrl', ['$scope', 'incomeFactory', 'auth', function($scope, incomeFactory, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.allIncome = incomeFactory.income;
	$scope.totalIncome = incomeFactory.incomeTotal;
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
		incomeFactory.postIncome($scope.description, $scope.amount); // send form to api
		if (incomeFactory.income.length > 0 ) {
			incomeFactory.income.push({'id': incomeFactory.income.length, 
								   	   'description': $scope.description, 
								       'amount': $scope.amount})
		};
		if (incomeFactory.income.length === 0 ) {
			incomeFactory.income.push({'id': incomeFactory.income.length, 
								   	   'description': $scope.description, 
								       'amount': $scope.amount})
		};
		incomeFactory.calculateTotal();
		$scope.totalIncome = incomeFactory.incomeTotal;
		$scope.monthlyIncomeForm.$setPristine();
		$scope.amount='';
		$scope.description='';
	};
}]);