app.controller('DashboardCtrl', ['$scope', 'monthlyExpensesFactory', 'auth', function($scope, monthlyExpensesFactory, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.totalIncome = monthlyExpensesFactory.totalIncome;
	$scope.totalBills = monthlyExpensesFactory.totalBills;	

	$scope.spendingLimit = monthlyExpensesFactory.spendingLimit;
	$scope.totalSpent = monthlyExpensesFactory.totalSpent;
	$scope.leftOver = monthlyExpensesFactory.leftOver;
	$scope.upBy = monthlyExpensesFactory.upBy;
	$scope.dailyBudget = monthlyExpensesFactory.dailyBudget;
	$scope.daysLeft = monthlyExpensesFactory.daysLeft;
	$scope.periodStart = monthlyExpensesFactory.periodStart[0];
	console.log(monthlyExpensesFactory.periodStart)
	$scope.periodEnd = monthlyExpensesFactory.periodEnd[0];
	$scope.today = monthlyExpensesFactory.today[0];

	$scope.spendingLimitForm = function(){
		monthlyExpensesFactory.postSpendingLimit($scope.amount1);

		monthlyExpensesFactory.spendingLimit = $scope.amount1;
		monthlyExpensesFactory.calcPeriodStart();
		monthlyExpensesFactory.calcPeriodEnd();
		monthlyExpensesFactory.calcToday();
		monthlyExpensesFactory.calcDailyBudget();
		monthlyExpensesFactory.calcUpBy();
		monthlyExpensesFactory.calcDaysLeft();

		$scope.spendingLimit = monthlyExpensesFactory.spendingLimit;
		$scope.totalSpent = monthlyExpensesFactory.totalSpent;
		$scope.leftOver = monthlyExpensesFactory.spendingLimit - monthlyExpensesFactory.totalSpent;
		$scope.upBy = monthlyExpensesFactory.upBy;
		$scope.dailyBudget = monthlyExpensesFactory.dailyBudget;
		$scope.daysLeft = monthlyExpensesFactory.daysLeft;
		$scope.periodStart = monthlyExpensesFactory.periodStart[0];
		$scope.periodEnd = monthlyExpensesFactory.periodEnd[0];
		$scope.today = monthlyExpensesFactory.today[0];

		$scope.spendingLimit = monthlyExpensesFactory.spendingLimit;
		$scope.form.$setPristine();
		$scope.amount1='';
	};
}]);