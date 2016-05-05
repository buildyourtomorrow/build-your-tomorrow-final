app.controller('DashboardCtrl', ['$scope', 'monthlyExpensesFactory', 'auth', function($scope, monthlyExpensesFactory, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.upBy = monthlyExpensesFactory.upBy;
	$scope.totalIncome = monthlyExpensesFactory.totalIncome;
	if ($scope.totalIncome > 0) {
		$scope.totalIncomeColor = '#32CD32';
	}
	$scope.totalBills = monthlyExpensesFactory.totalBills;	
	if ($scope.totalBills > 0) {
		$scope.totalBillsColor = '#FF0000';
	}
	$scope.spendingLimit = monthlyExpensesFactory.spendingLimit;
	$scope.totalSpent = monthlyExpensesFactory.totalSpent;
	if ($scope.totalSpent > 0) {
		$scope.totalSpentColor = '#FF0000';
	}
	if ($scope.totalIncome - $scope.totalBills - $scope.totalSpent > 0) {
		$scope.totalSavingsColor = '#32CD32';
	}
	if ($scope.totalIncome - $scope.totalBills - $scope.totalSpent < 0) {
		$scope.totalSavingsColor = '#FF0000';
	}
	if ($scope.totalIncome - $scope.totalBills - $scope.totalSpent == 0) {
		$scope.totalSavingsColor = '#666666';
	}
	$scope.leftOver = monthlyExpensesFactory.leftOver;
	if ($scope.totalIncome - $scope.totalBills - $scope.totalSpent > 0) {
		$scope.savingMoneyBaby = "Keep saving that money homie. Pretty soon, you'll be a baby baller";
	} else {
		$scope.savingMoneyBaby = "Yo, stop spending so much damn money";
	}
	if ($scope.upBy > 0) {
		$scope.specialVarUpBy = '#00FF00';
		$scope.specialVarUpByWord = 'Up by';
		$scope.upByComment = "Ayo, we can spend " + Math.floor($scope.upBy) + " without going over budget. Real talk!";
	} 
	if ($scope.upBy === 0) {
		$scope.specialVarUpByWord = 'Up by';
		$scope.upByComment = "Add a spending limit wangsta";
		$scope.specialVarUpBy = '#666666';
	} 
	if ($scope.upBy < 0) {
		$scope.specialVarUpBy = '#FE7878';
		$scope.specialVarUpByWord = 'Down by';
		$scope.upByComment = "OMG, we're behind budget by " + Math.floor($scope.upBy) + " Let's get it together people";
	}
	$scope.dailyBudget = monthlyExpensesFactory.dailyBudget;
	$scope.daysLeft = monthlyExpensesFactory.daysLeft;
	$scope.periodStart = monthlyExpensesFactory.periodStart[0];
	$scope.periodEnd = monthlyExpensesFactory.periodEnd[0];

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
		$scope.leftOver = monthlyExpensesFactory.spendingLimit - monthlyExpensesFactory.totalSpent;
		if (monthlyExpensesFactory.upBy >= 0) {
			$scope.specialVarUpBy = '#00FF00';
			$scope.specialVarUpByWord = 'Up By';
			$scope.upBy = monthlyExpensesFactory.upBy;
		} 

		if (monthlyExpensesFactory.upBy < 0) {
			$scope.specialVarUpBy = '#FE7878';
			$scope.specialVarUpByWord = 'Down By';
			$scope.upBy = monthlyExpensesFactory.upBy;
		}
		if ($scope.upBy > 0) {
			$scope.specialVarUpBy = '#00FF00';
			$scope.specialVarUpByWord = 'Up by';
			$scope.upByComment = "Ayo, we can spend " + Math.floor($scope.upBy) + " without going over budget. Real talk!";
		} 
		if ($scope.upBy === 0) {
			$scope.specialVarUpByWord = 'Up by';
			$scope.upByComment = "Add a spending limit wangsta";
			$scope.specialVarUpBy = '#666666';
		} 
		if ($scope.upBy < 0) {
			$scope.specialVarUpBy = '#FE7878';
			$scope.specialVarUpByWord = 'Down by';
			$scope.upByComment = "OMG, we're behind budget by " + Math.floor($scope.upBy) + " Let's get it together people";
		}
		$scope.dailyBudget = monthlyExpensesFactory.dailyBudget;

		$scope.spendingLimit = monthlyExpensesFactory.spendingLimit;
		$scope.spendingLimitForm1.$setPristine();
		$scope.amount1='';
	};
}]);