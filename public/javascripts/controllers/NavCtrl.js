app.controller('NavCtrl', ['auth', 
						   'store', 
						   '$state', 
						   '$scope', 
						   '$location',
						   'monthlyExpensesFactory',
						   function(auth, store, $state, $scope, $location, monthlyExpensesFactory){

	var user = monthlyExpensesFactory.getUser();

	$scope.logout = function(){
		store.remove('profile');
		store.remove('id_token');
		auth.signout();
		location.assign("http://www.buildyourtomorrow.com");
	}

}]);