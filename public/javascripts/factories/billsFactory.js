app.factory('billsFactory', ['$http', 'auth', '$state', function($http, auth, $state){
	var o = {
		bills: []
	};

	o.totalBills = 0;

	o.calculateTotal = function(){
		var total = 0;	
		for (i = 0; i < o.bills.length; i++) {
			total += Math.floor(o.bills[i].amount);
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
			$state.go('register');
		});
	};
	o.updateBillDescription = function(bill){
		return $http.put('/edit-monthly-bill-description', { 'bill': bill }, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
	};
	o.updateBillAmount = function(bill){
		return $http.put('/edit-monthly-bill-amount', { 'bill': bill }, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
	};
	return o
}]);