app.controller('LoginCtrl', ['auth', 
							 'store', 
							 '$state', 
							 '$scope', 
							 'authFactory',
							 function(auth, store, $state, $scope, authFactory){

	auth.signin({
		authParams: {
			scope: 'openid email nickname'
		}
	}, function(profile, token){
		authFactory.createUser();//create user in the backend		
		store.set('profile', profile);
		store.set('id_token', token);
		$state.go('home');
	}, function(error){
		console.log(error);
	})

}]);