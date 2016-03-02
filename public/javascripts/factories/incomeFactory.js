app.factory('incomeFactory', ['$http', 'auth', '$state', function($http, auth, $state){
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
			$state.go('register');
		});
	};
	return o
}]);