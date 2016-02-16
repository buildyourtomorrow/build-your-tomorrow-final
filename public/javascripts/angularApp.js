var app = angular.module('Dashboard', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider', 
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('login', {
  				url: '/login',
  				templateUrl: '/login.html',
  				controller: 'AuthCtrl',
  				onEnter: ['$state', 'auth', function($state, auth){
    				if(auth.isLoggedIn()){
      					$state.go('dashboard');
    				}
  				}]
			})
			.state('register', {
				url: '/register',
				templateUrl: '/register.html',
				controller: 'AuthCtrl',
				onEnter: ['$state', 'auth', function($state, auth){
					if(auth.isLoggedIn()){
			  			$state.go('dashboard');
					}
				}]
			})
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

app.factory('auth', ['$http', '$window', function($http, $window){
	var auth = {};

	auth.saveToken = function (token){
 		$window.localStorage['dashboard-token'] = token;
	};

	auth.getToken = function (){
  		return $window.localStorage['dashboard-token'];
	};

	auth.isLoggedIn = function(){
		var token = auth.getToken();

		if(token){
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};

	auth.currentUser = function(){
  		if(auth.isLoggedIn()){
    		var token = auth.getToken();
	    	var payload = JSON.parse($window.atob(token.split('.')[1]));
    		return payload.username;
  		}
	};

	auth.register = function(user){
  		return $http.post('/register', user).success(function(data){
    		auth.saveToken(data.token);
  		});
	};

	auth.logIn = function(user){
  		return $http.post('/login', user).success(function(data){
    		auth.saveToken(data.token);
  		});
	};

	auth.logOut = function(){
  		$window.localStorage.removeItem('dashboard-token');
	};

	return auth;
}]);

app.factory('incomeFactory', ['$http', 'auth', function($http, auth){
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
		return $http.post('/add-income', { 'description': description,  'income': income }, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
	};	
	o.getUser = function(){ // function that gets the user from api
		return $http.get('/get-user', {headers: {Authorization: 'Bearer ' + auth.getToken()}} ).then(function(response){
			angular.copy(response.data.income, o.income) // ang-copy deletes everything the income array above and adds every inside of res.data[0].income
			o.calculateTotal();
		}, function(){
			console.log('error');
		});
	};
	return o
}]);

app.factory('billsFactory', ['$http', 'auth', function($http, auth){
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
		return $http.post('/add-bill', { 'description': description,  'amount': amount }, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
	};	
	o.getUser = function(){ // function that gets the user from api
		return $http.get('/get-user', {headers: {Authorization: 'Bearer ' + auth.getToken()}} ).then(function(response){
			angular.copy(response.data.monthlyBills, o.bills) // ang-copy deletes everything the income array above and adds every inside of res.data
			o.calculateTotal();
		}, function(){
			console.log('error');
		});
	};
	return o
}]);

app.factory('monthlyExpensesFactory', ['$http', 'incomeFactory', 'auth', function($http, incomeFactory, auth){
	var o = {
		monthlyExpenses: [],
		spendingLimit: 0,
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
		return $http.get('/get-user', {headers: {Authorization: 'Bearer ' + auth.getToken()}} ).then(function(response){

			angular.copy(response.data.monthlyExpenses, o.monthlyExpenses);
			o.spendingLimit = response.data.spendingLimit;
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
		return $http.post('/add-monthly-expense', {'description': description, 'amount': amount}, {headers: {Authorization: 'Bearer ' + auth.getToken()}}) // config is the 3rd arg. header is config.
	};	
	o.postSpendingLimit = function(spendingLimit){
		return $http.post('/add-spending-limit', {'spendingLimit': spendingLimit}, {headers: {Authorization: 'Bearer ' + auth.getToken()}})
	};
	o.calcTotalSpent = function(expenses){
		var x = 0;
		for (i=0; i<expenses.length; i++){			
			x = x + expenses[i].amount;
		};
		o.totalSpent = x;
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
		var x1 = o.spendingLimit / ((o.periodEnd[1] - o.periodStart[1]) + 1);
		o.dailyBudget = x1;
	};
	o.calcDaysLeft = function(){
		o.daysLeft = o.periodEnd[1] - o.today[1];
	};
	return o
}]);

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

app.controller('IncomeCtrl', ['$scope', 'incomeFactory', 'auth', function($scope, incomeFactory, auth){
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

app.controller('BillsCtrl', ['$scope', 'billsFactory', 'auth', function($scope, billsFactory, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
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

app.controller('MonthlyExpensesCtrl', ['$scope', 'monthlyExpensesFactory', 'auth', function($scope, monthlyExpensesFactory, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
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

app.controller('AuthCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth){
	$scope.user = {};

	$scope.register = function(){
		auth.register($scope.user).error(function(error){ //investigate error message.
      	$scope.error = error;
    }).then(function(){
      	$state.go('dashboard');
    	});
  	};

  	$scope.logIn = function(){
   		auth.logIn($scope.user).error(function(error){
      	$scope.error = error;
    }).then(function(){
      	$state.go('dashboard');
    });
  };
}])

app.controller('NavCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
  	$scope.currentUser = auth.currentUser;
  	$scope.logOut = function(){
  		auth.logOut();
  		$state.go('login');
  	};
}]);