<<<<<<< HEAD
app.factory('authFactory', ['$http', function($http){
	var o = {};
	o.createUser = function(){ // function that sends email information to api
		return $http.post('/create-user')
	}
	return o;
}])
=======
app.factory('auth', ['$http', '$window', function($http, $window){
	var auth = {};

	auth.saveToken = function (token){
 		$window.localStorage['dashboard-token'] = token;
	};

	auth.getToken = function (){
  		return $window.localStorage['dashboard-token'];
	};

	auth.isLoggedIn = function(){
		var token = auth.getToken();

		if(token){
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};

	auth.currentUser = function(){
  		if(auth.isLoggedIn()){
    		var token = auth.getToken();
	    	var payload = JSON.parse($window.atob(token.split('.')[1]));
    		return payload.username;
  		}
	};

	auth.register = function(user){
  		return $http.post('/register', user).success(function(data){
    		auth.saveToken(data.token);
  		});
	};

	auth.logIn = function(user){
  		return $http.post('/login', user).success(function(data){
    		auth.saveToken(data.token);
  		});
	};

	auth.logOut = function(){
  		$window.localStorage.removeItem('dashboard-token');
	};

	return auth;
}]);
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
