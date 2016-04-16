app.factory('incomeFactory', ['$http', 'auth', '$state', function($http, auth, $state){
	var o = {
		income: []
	};
	o.incomeTotal = 0;
	o.calculateTotal = function(){
		var total = 0;	
		for (i = 0; i < o.income.length; i++) {
			total += Math.floor(o.income[i].amount);
		};
		return o.incomeTotal = total;
	};
	o.postIncome = function(description, amount){ // function that sends income to api
		return $http.post('/add-income', { 'description': description,  'amount': amount }, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
	};	
	o.getUser = function(){ // function that gets the user from api
		return $http.get('/get-user', {headers: {Authorization: 'Bearer ' + auth.getToken()}} ).then(function(response){
			angular.copy(response.data.income, o.income) // ang-copy deletes everything the income array above and adds every inside of res.data[0].income
			o.calculateTotal();
		}, function(){			
			$state.go('register');
		});
	};
	o.updateIncomeDescription = function(income){
		return $http.put('/edit-monthly-income-description', { 'description': income.description, 'id': income.id }, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
	};
	o.updateIncomeAmount = function(income){
		return $http.put('/edit-monthly-income-amount', { 'amount': income.amount, 'id': income.id }, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
	};
	return o
}]);