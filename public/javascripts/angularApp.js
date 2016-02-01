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

	o.incomeTotal = 0;

	o.calculateTotal = function(){
		var total = 0;	
		for (i = 0; i < o.income.data.length; i++) {
			total += o.income.data[i].amount;
		};
		return o.incomeTotal = total;
	};
	o.postIncome = function(income, description){
		var data = { 
				'description': description,
				'income': income
		};
		return $http.post('/add-income', data).then(function(data){	// push data into income array above				
					o.income.data.push(data.data); // getting to the income array uptop is a little tricky. Target the array and not the object.											
				}, function(){
					console.log("error");
				});
	};	
	o.getIncome = function(){
		return $http.get('/all-income').then(function(data){
			angular.copy(data, o.income)
			o.calculateTotal();
		}, function(){
			console.log('error');
		});
	};
	return o
}]);

app.controller('MainCtrl', ['$scope', 'incomeFactory', function($scope, incomeFactory){
	$scope.allIncome = incomeFactory.income;
	$scope.totalIncome = incomeFactory.incomeTotal;
	
	$scope.incomeForm = function(){	
		incomeFactory.postIncome($scope.income, $scope.description);
		incomeFactory.income.push($scope.income);
		var total = 0;	
		for (i = 0; i < incomeFactory.income.length; i++) {
			total += incomeFactory.income[i];
		};
		$scope.totalIncome = total;
	};
}]);