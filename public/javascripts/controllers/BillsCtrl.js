app.controller('BillsCtrl', ['$scope', 'billsFactory', 'auth', function($scope, billsFactory, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.bills = billsFactory.bills;
	$scope.totalBills = billsFactory.totalBills;
	$scope.updateBillDesc = function(bill){
		billsFactory.updateBillDescription(bill);
	};
	$scope.updateBillAmount = function(bill){
		billsFactory.updateBillAmount(bill);
		$scope.totalBills = billsFactory.calculateTotal();
	};
	// function that processes bills form. 
	$scope.billForm = function(){	
		billsFactory.postBill($scope.amount, $scope.description); // send form to api
		if (billsFactory.bills.length > 0 ) {
			billsFactory.bills.push({'id': billsFactory.bills.length, 
								   	 'description': $scope.description, 
								     'amount': $scope.amount});
		};
		if (billsFactory.bills.length === 0 ) {
			billsFactory.bills.push({'id': billsFactory.bills.length, 
								   	 'description': $scope.description, 
								     'amount': $scope.amount});
		};
		$scope.totalBills = billsFactory.calculateTotal();
		$scope.monthlyBillForm.$setPristine();
		$scope.amount='';
		$scope.description='';
	};
}]);