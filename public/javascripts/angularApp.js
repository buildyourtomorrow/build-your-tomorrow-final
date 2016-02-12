var app = angular.module('Dashboard', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider', 
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('dashboard', {
				url: '/dashboard', 
				templateUrl: '/dashboard.html',
				controller: 'DashboardCtrl',
				resolve: {
					postPromise: ['monthlyExpensesFactory', function(monthlyExpensesFactory){						
						return monthlyExpensesFactory.getUser();
					}]
				}
			})
			.state('income', {
				url: '/income', 
				templateUrl: '/income.html',
				controller: 'IncomeCtrl',
				resolve: {
					postPromise: ['incomeFactory', function(incomeFactory){						
						return incomeFactory.getUser();
					}]
				}
			})
			.state('bills', {
				url: '/bills', 
				templateUrl: '/bills.html',
				controller: 'BillsCtrl',
				resolve: {
					postPromise: ['billsFactory', function(billsFactory){						
						return billsFactory.getUser();
					}]
				}
			})
			.state('monthlyExpenses', {
				url: '/expenses', 
				templateUrl: '/expenses.html',
				controller: 'MonthlyExpensesCtrl',
				resolve: {
					postPromise: ['monthlyExpensesFactory', function(monthlyExpensesFactory){						
						return monthlyExpensesFactory.getUser();
					}]
				}
			})
		}
	])

app.factory('incomeFactory', ['$http', function($http){
	var o = {
		income: []
	};

	o.incomeTotal = 0;

	o.calculateTotal = function(){
		var total = 0;	
		for (i = 0; i < o.income.length; i++) {
			total += o.income[i].amount;
		};
		return o.incomeTotal = total;
	};
	o.postIncome = function(income, description){ // function that sends income to api
		return $http.post('/add-income', { 'description': description,  'income': income });
	};	
	o.getUser = function(){ // function that gets the user from api
		return $http.get('/get-user').then(function(response){
			angular.copy(response.data.income, o.income) // ang-copy deletes everything the income array above and adds every inside of res.data[0].income
			o.calculateTotal();
		}, function(){
			console.log('error');
		});
	};
	return o
}]);

app.factory('billsFactory', ['$http', function($http){
	var o = {
		bills: []
	};

	o.totalBills = 0;

	o.calculateTotal = function(){
		var total = 0;	
		for (i = 0; i < o.bills.length; i++) {
			total += o.bills[i].amount;
		};
		return o.totalBills = total;
	};
	o.postBill = function(amount, description){ // function that sends income to api
		return $http.post('/add-bill', { 'description': description,  'amount': amount });
	};	
	o.getUser = function(){ // function that gets the user from api
		return $http.get('/get-user').then(function(response){
			angular.copy(response.data.monthlyBills, o.bills) // ang-copy deletes everything the income array above and adds every inside of res.data
			o.calculateTotal();
		}, function(){
			console.log('error');
		});
	};
	return o
}]);

app.factory('monthlyExpensesFactory', ['$http', 'incomeFactory', function($http, incomeFactory){
	var o = {
		monthlyExpenses: [],
		spendingLimit: [],
		totalSpent: 0,
		leftOver: 0,
		upBy: 0,
		dailyBudget: 0,
		daysLeft: 0,
		periodStart: [],
		periodEnd: [],
		today: [],
		totalIncome: 0,
		totalBills: 0
	};
	o.getUser = function(){
		return $http.get('/get-user').then(function(response){
			angular.copy(response.data.monthlyExpenses, o.monthlyExpenses);
			o.spendingLimit.push(response.data.spendingLimit);
			o.totalSpent = response.data.totalSpent;
			o.leftOver = response.data.leftOver;
			o.upBy = response.data.upBy;
			o.dailyBudget = response.data.dailyBudget;
			o.daysLeft = response.data.daysLeft;
			o.periodStart.push(response.data.periodStart);
			o.periodEnd.push(response.data.periodEnd);
			o.today.push(response.data.today);
			o.totalIncome = response.data.totalIncome;
			o.totalBills = response.data.billsTotal;
		});
	};
	o.postMonthlyExpense = function(description, amount){ // function that sends monthly expense to api
		return $http.post('/add-monthly-expense', {'description': description, 'amount': amount})
	};	
	o.postSpendingLimit = function(spendingLimit){
		return $http.post('/add-spending-limit', {'spendingLimit': spendingLimit})
	};
	o.calcTotalSpent = function(expenses){
		var x = 0;
		for (i=0; i<expenses.length; i++){			
			x = x + expenses[i].amount;
		};
		o.totalSpent = x;
	};
	o.calcLeftOver = function(){

	};
	o.calcPeriodStart = function(){
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth();
		var x1 = new Date(year, month, 1);
		o.periodStart = [];
		o.periodStart.push(x1);
		o.periodStart.push(1);
	};
	o.calcPeriodEnd = function(){
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth() + 1;
		var x1 = new Date(year, month, 0);
		o.periodEnd = [];
		o.periodEnd.push(x1);
		o.periodEnd.push(x1.getDate());
	};
	o.calcToday = function(){
		var today = new Date();
		var dd = today.getDate();
		o.today = []; 
		o.today.push(today);
		o.today.push(dd);
	};
	o.calcUpBy = function(){
		var x1 = (o.dailyBudget * ((o.today[1] - o.periodStart[1]) + 1)) - o.totalSpent;
		o.upBy = x1;
	};
	o.calcDailyBudget = function(){
		var x1 = o.spendingLimit[0] / ((o.periodEnd[1] - o.periodStart[1]) + 1);
		o.dailyBudget = x1;
	};
	o.calcDaysLeft = function(){
		o.daysLeft = o.periodEnd[1] - o.today[1];
	};
	return o
}]);

app.controller('DashboardCtrl', ['$scope', 'monthlyExpensesFactory', function($scope, monthlyExpensesFactory){
	$scope.totalIncome = monthlyExpensesFactory.totalIncome;
	$scope.totalBills = monthlyExpensesFactory.totalBills;	

	$scope.spendingLimit = monthlyExpensesFactory.spendingLimit;
	$scope.totalSpent = monthlyExpensesFactory.totalSpent;
	$scope.leftOver = monthlyExpensesFactory.leftOver;
	$scope.upBy = monthlyExpensesFactory.upBy;
	$scope.dailyBudget = monthlyExpensesFactory.dailyBudget;
	$scope.daysLeft = monthlyExpensesFactory.daysLeft;
	$scope.periodStart = monthlyExpensesFactory.periodStart[0];
	$scope.periodEnd = monthlyExpensesFactory.periodEnd[0];
	$scope.today = monthlyExpensesFactory.today[0];

	$scope.spendingLimitForm = function(){
		monthlyExpensesFactory.postSpendingLimit($scope.amount1);

		monthlyExpensesFactory.spendingLimit = [];
		monthlyExpensesFactory.spendingLimit.push($scope.amount1);
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

app.controller('IncomeCtrl', ['$scope', 'incomeFactory', function($scope, incomeFactory){
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

app.controller('BillsCtrl', ['$scope', 'billsFactory', function($scope, billsFactory){
	$scope.bills = billsFactory.bills;
	$scope.totalBills = billsFactory.totalBills;
	
	// function that processes bills form. 
	$scope.billForm = function(){	
		billsFactory.postBill($scope.amount, $scope.description); // send form to api
		billsFactory.bills.push({ 'amount': $scope.amount, 'description': $scope.description });
		$scope.totalBills = billsFactory.calculateTotal();
		$scope.form.$setPristine();
		$scope.amount='';
		$scope.description='';
	};
}]);

app.controller('MonthlyExpensesCtrl', ['$scope', 'monthlyExpensesFactory', function($scope, monthlyExpensesFactory){
	$scope.monthlyExpenses = monthlyExpensesFactory.monthlyExpenses;
	$scope.totalSpent = monthlyExpensesFactory.totalSpent

	$scope.monthlyExpenseForm = function(){
		monthlyExpensesFactory.postMonthlyExpense($scope.description, $scope.amount);

		monthlyExpensesFactory.monthlyExpenses.push({ 'amount': $scope.amount, 'description': $scope.description });
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
		$scope.dailyBudget = monthlyExpensesFactory.dailyBudget;
		$scope.daysLeft = monthlyExpensesFactory.daysLeft;
		$scope.periodStart = monthlyExpensesFactory.periodStart[0];
		$scope.periodEnd = monthlyExpensesFactory.periodEnd[0];
		$scope.today = monthlyExpensesFactory.today[0];

		$scope.form.$setPristine();
		$scope.amount='';
		$scope.description='';
	};
}]);