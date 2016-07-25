var app = angular.module('BudgetApp', ['auth0', 'angular-storage', 'angular-jwt', 'ui.router', 'ngMessages', 'ngAnimate'])

	app.config([
		'$stateProvider',
		'$urlRouterProvider', 
		'authProvider',
		'$httpProvider',
		'jwtInterceptorProvider',
		'$provide',
		function ($stateProvider, $urlRouterProvider, authProvider, $httpProvider, jwtInterceptorProvider, $provide) {
			authProvider
				.init({
			    	domain: 'buildyourtomorrow.auth0.com',
			        clientID: 'EscYrnfdxcDUs3WJeJL1edHhLVrlFQtB',
			        loginUrl: '/login'
			    });

			jwtInterceptorProvider.tokenGetter = function(store){
				return store.get('id_token');
			}

		    $stateProvider
		    	.state('login', {
	  				url: '/login',
	  				controller: 'LoginCtrl',
	  				onEnter: ['$state', 'store', function($state, store){
	  					var profile = store.get('profile');
	  					if(profile){
	  						$state.go('home')
	  					}							  					
	  				}]			
				})
				.state('home', {
	  				url: '/home',
	  				templateUrl: '/partials/home.html',
	  				controller: 'HomeCtrl',
	  				onEnter: ['$state', 'store', function($state, store){
	  					var profile = store.get('profile');
	  					if(!profile){
	  						$state.go('login')
	  					}							  					
	  				}]
				})
				.state('dashboard', {
	  				url: '/dashboard',
	  				templateUrl: '/partials/dashboard.html',
	  				controller: 'DashboardCtrl',	  				
	  				resolve: {
						postPromise: ['monthlyExpensesFactory', 'store', function(monthlyExpensesFactory, store){
						console.log('marlene')					
							var profile = store.get('profile');	
							if(profile){
								return monthlyExpensesFactory.getUser(profile.email);
							}						
						}]
					},
					onEnter: ['auth', '$state', function(auth, $state){
						if(!auth.isAuthenticated){
							$state.go('login');
						}
					}]
				})
				.state('income', {
					url: '/income',
	  				templateUrl: '/partials/income.html',
					controller: 'IncomeCtrl',
					resolve: {
						postPromise: ['incomeFactory', 'store', function(incomeFactory, store){						
							var profile = store.get('profile');	
							if(profile){
								return incomeFactory.getUser(profile.email);
							}
						}]
					},
					onEnter: ['auth', '$state', function(auth, $state){
						if(!auth.isAuthenticated){
							$state.go('login');
						}
					}]
				})
				.state('bills', {
	  				url: '/bills',
	  				templateUrl: '/partials/bills.html',
					controller: 'BillsCtrl',
					resolve: {
						postPromise: ['billsFactory', 'store', function(billsFactory, store){	
							var profile = store.get('profile');	
							if(profile){
								return billsFactory.getUser(profile.email);
							}								
						}]						
					},
					onEnter: ['auth', '$state', function(auth, $state){
						if(!auth.isAuthenticated){
							$state.go('login');
						}
					}]														
				})
				.state('expenses', {
	  				url: '/expenses',
	  				templateUrl: '/partials/expenses.html',
					controller: 'MonthlyExpensesCtrl',
					resolve: {
						postPromise: ['monthlyExpensesFactory', 'store', function(monthlyExpensesFactory, store){	
							var profile = store.get('profile');	
							if(profile){
								return monthlyExpensesFactory.getUser(profile.email);
							}
						}]
					},
					onEnter: ['auth', '$state', function(auth, $state){
						if(!auth.isAuthenticated){
							$state.go('login');
						}
					}]
				})
				.state('education', {
					url: '/education', 
					templateUrl: '/partials/education.html',
					controller: 'EducationCtrl',
					resolve: {
						postPromise: ['educationFactory', 'store', function(educationFactory, store){
							var profile = store.get('profile');	
							if(profile){
								return educationFactory.getUser(profile.email);
							}								
						}]
					},
					onEnter: ['auth', '$state', function(auth, $state){
						if(!auth.isAuthenticated){
							$state.go('login');
						}
					}]
				})
/*
			function redirect ($q, $injector, store, $state){
				var auth;
				$timeout(function(){
					auth = $injector.get('auth');
				});
				return {
					responseError: function(rejection){						
						if(rejection.status === 401){
							auth.signout();
							store.remove('profile');
							store.remove('id_token');
							$state.go('home');
						}
						return $q.reject(rejection);
					}
				}
			}

			$provide.factory('redirect', redirect);
			$httpProvider.interceptors.push('redirect');

*/	
			$httpProvider.interceptors.push('jwtInterceptor');
			$urlRouterProvider.otherwise('/login');
		}

	])
	app.run(function($rootScope, auth, store, jwtHelper, $state) {
		$rootScope.$on('$locationChangeStart', function(){
			var token = store.get('id_token');
			var profile = store.get('profile');
			if(token){
				if(!jwtHelper.isTokenExpired(token)){
					if(!auth.isAuthenticated){
						auth.authenticate(profile, token);
					}
				}
			} else {
				$state.go('login')
			}
		})
	});