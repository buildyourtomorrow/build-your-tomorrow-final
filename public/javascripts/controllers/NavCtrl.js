<<<<<<< HEAD
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

=======
app.controller('NavCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
  	$scope.currentUser = auth.currentUser;
  	$scope.logOut = function(){
  		auth.logOut();
  		$state.go('login');
  	};
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
}]);