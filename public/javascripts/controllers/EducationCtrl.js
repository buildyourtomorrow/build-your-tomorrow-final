<<<<<<< HEAD
app.controller('EducationCtrl', ['$scope',
								 'store',
								 'auth',
								 'educationFactory',						
								 '$state', function($scope, 
								 				    store,
								 				    auth,
								 				    educationFactory,
								 				    $state){

=======
app.controller('EducationCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth){

  $scope.isLoggedIn = auth.isLoggedIn;

  	
  };
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
}])