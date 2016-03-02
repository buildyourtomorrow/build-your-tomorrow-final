app.controller('BillsCtrl', ['$scope', 'billsFactory', 'auth', function($scope, billsFactory, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.bills = billsFactory.bills;
	$scope.totalBills = billsFactory.totalBills;
	
	// function that processes bills form. 
	$scope.billForm = function(){	
		billsFactory.postBill($scope.amount, $scope.description); // send form to api
		billsFactory.bills.push({ 'amount': $scope.amount, 'description': $scope.description });
		$scope.totalBills = billsFactory.calculateTotal();
		$scope.form.$setPristine();
		$scope.amount='';
		$scope.description='';
	};
}]);