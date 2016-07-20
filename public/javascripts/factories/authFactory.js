app.factory('authFactory', ['$http', function($http){
	var o = {};
	o.createUser = function(){ // function that sends email information to api
		return $http.post('/create-user')
	}
	return o;
}])