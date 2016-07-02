app.controller('EducationCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth){

  $scope.isLoggedIn = auth.isLoggedIn;

  	
  };
}])