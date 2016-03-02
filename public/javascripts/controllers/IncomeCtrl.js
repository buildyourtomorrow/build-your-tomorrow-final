app.controller('IncomeCtrl', ['$scope', 'incomeFactory', 'auth', function($scope, incomeFactory, auth){
	console.log('12');
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.allIncome = incomeFactory.income;
	$scope.totalIncome = incomeFactory.incomeTotal;
	
	// function that processes income form. 
	$scope.incomeForm = function(){	
		incomeFactory.postIncome($scope.income, $scope.description); // send form to api
		incomeFactory.income.push({ 'amount': $scope.income, 'description': $scope.description });
		$scope.totalIncome = incomeFactory.calculateTotal();
		$scope.form.$setPristine();
		$scope.income='';
		$scope.description='';
	};
}]);