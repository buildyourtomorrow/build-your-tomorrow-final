var app = angular.module('Dashboard', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider', 
	function ($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('dashboard', {
				url: '/dashboard', 
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
		for (i = 0; i < o.income.length; i++) {
			total += o.income[i].amount;
		};
		return o.incomeTotal = total;
	};
	o.postIncome = function(income, description){ // function that sends income to api
		return $http.post('/add-income', { 'description': description,  'income': income });
	};	
	o.getIncome = function(){ // function that gets all income from api
		return $http.get('/all-income').then(function(response){
			angular.copy(response.data, o.income) // ang copy deletes everything the income array above and adds every inside of res.data
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
	
	// function that processes income form. 
	$scope.incomeForm = function(){	
		incomeFactory.postIncome($scope.income, $scope.description); // send form to api
		incomeFactory.income.push({ 'amount': $scope.income, 'description': $scope.description });
		$scope.totalIncome = incomeFactory.calculateTotal();
	};
}]);