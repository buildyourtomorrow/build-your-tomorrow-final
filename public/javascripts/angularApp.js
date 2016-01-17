var app = angular.module('Dashboard', ['ui.router']);

app.factory('incomeFactory', ['$http', function($http){
	var o = {};	

	o.sendIncome = function(income){
		var req = {
			method: 'POST',
			url: '/income',
			headers: { 'Content-Type': 'application/json' },
			data: { 'income': income }
		}

		return $http(req)
		.then(function(){
			console.log("success");
		}, function(){
			console.log("error");
		});
	};	

	return o
}]);

app.controller('MainCtrl', ['$scope', 'incomeFactory', function($scope, incomeFactory){
	$scope.income = 1000;

	$scope.incomeForm = function(){	
		incomeFactory.sendIncome($scope.income);
	};
}]);

