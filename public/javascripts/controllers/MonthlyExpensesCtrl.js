app.controller('MonthlyExpensesCtrl', ['$scope', 'monthlyExpensesFactory', 'auth', function($scope, monthlyExpensesFactory, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.monthlyExpenses = monthlyExpensesFactory.monthlyExpenses;
	$scope.totalSpent = monthlyExpensesFactory.totalSpent;			

	$scope.updateExpAmount = function(expense){
		monthlyExpensesFactory.editMonthlyExpAmount(expense);
		monthlyExpensesFactory.calcTotalSpent(monthlyExpensesFactory.monthlyExpenses);
		$scope.totalSpent = monthlyExpensesFactory.totalSpent; // research $watch.
	};

	$scope.updateExpDescription = function(expense){
		monthlyExpensesFactory.editMonthlyExpDescription(expense);
	};

	$scope.monthlyExpenseForm = function(){
		monthlyExpensesFactory.postMonthlyExpense($scope.description, $scope.amount);
		if (monthlyExpensesFactory.monthlyExpenses.length > 0 ) {
			monthlyExpensesFactory.monthlyExpenses.push({'id': monthlyExpensesFactory.monthlyExpenses.length, 
								   						 'description': $scope.description, 
								    					 'amount': $scope.amount});
		};
		if (monthlyExpensesFactory.monthlyExpenses.length === 0 ) {
			monthlyExpensesFactory.monthlyExpenses.push({'id': monthlyExpensesFactory.monthlyExpenses.length, 
								   						 'description': $scope.description, 
								    					 'amount': $scope.amount});
		};
		monthlyExpensesFactory.calcTotalSpent(monthlyExpensesFactory.monthlyExpenses);
		monthlyExpensesFactory.calcPeriodStart();
		monthlyExpensesFactory.calcPeriodEnd();
		monthlyExpensesFactory.calcToday();
		monthlyExpensesFactory.calcDailyBudget();
		monthlyExpensesFactory.calcUpBy();
		monthlyExpensesFactory.calcDaysLeft();
		
		$scope.spendingLimit = monthlyExpensesFactory.spendingLimit;
		$scope.totalSpent = monthlyExpensesFactory.totalSpent;
		$scope.leftOver = monthlyExpensesFactory.spendingLimit[0] - monthlyExpensesFactory.totalSpent;
		$scope.upBy = monthlyExpensesFactory.upBy;

		$scope.monthlyExpForm.$setPristine();
		$scope.amount='';
		$scope.description='';
	};
}]);