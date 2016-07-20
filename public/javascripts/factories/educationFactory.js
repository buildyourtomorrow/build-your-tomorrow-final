app.factory('educationFactory', ['$http', '$state', function($http, $state){
	var o = {
		nickName: []
	};
	o.getUser = function(){ // function that gets the user from api
		return $http({
			url: '/get-user',
			method: 'GET'
		}).then(function(response){
			o.nickName = [];
			o.nickName.push(response.data.nickName)
		}, function(){
			$state.go('login');
		});
	};
	return o;
}])