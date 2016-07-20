app.controller('HomeCtrl', ['$scope', 'store', 'auth', function($scope, store, auth){
	$scope.nickName = store.get('profile').nickname;

	$scope.logout = function(){
		store.remove('profile');
		store.remove('id_token');
		auth.signout();
		location.assign("http://www.buildyourtomorrow.com");
	}
}]);