var app = angular.module('Dashboard', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider', 
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home', 
				templateUrl: '/home.html',
				controller: 'MainCtrl',
				resolve: {
					postPromise: ['incomeFactory', function(incomeFactory){						
						return incomeFactory.getIncome();
					}]
				}
			})
		}
	])

app.factory('incomeFactory', ['$http', function($http){
	var o = {
		income: []
	};	

	o.sendIncome = function(income){
		var req = {
			method: 'POST',
			url: '/add-income',
			headers: { 'Content-Type': 'application/json' },
			data: { 'income': income }
		};
		return $http(req).then(function(data){	// push data into income array above
					o.income.data.push(data.data); // getting to the income array uptop is a little tricky. Target the array and not the object.
				}, function(){
					console.log("error");
				});
	};	
	o.getIncome = function(){
		return $http.get('/all-income').then(function(data){
			angular.copy(data, o.income)
		}, function(){
			console.log('error');
		});
	};
	return o
}]);

app.controller('MainCtrl', ['$scope', 'incomeFactory', function($scope, incomeFactory){
	$scope.allIncome = incomeFactory.income;

	$scope.incomeForm = function(){	
		incomeFactory.sendIncome($scope.income);
	};
}]);