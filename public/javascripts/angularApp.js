var app = angular.module('Dashboard', ['ui.router', 'ngMessages']);

app.config([
	'$stateProvider',
	'$urlRouterProvider', 
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
  				url: '',
  				templateUrl: '/home.html',
  				controller: 'AuthCtrl',
  				onEnter: ['$state', 'auth', function($state, auth){
    				if(auth.isLoggedIn()){
      					$state.go('dashboard');
    				}
  				}]
			})
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