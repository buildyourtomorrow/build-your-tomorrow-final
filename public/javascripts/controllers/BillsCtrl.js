app.controller('BillsCtrl', ['$scope', 'billsFactory', 'auth', function($scope, billsFactory, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.bills = billsFactory.bills;
	$scope.totalBills = billsFactory.totalBills;
	$scope.categories = billsFactory.billsCategoryTotals;

	$scope.monthlyBillsCategories = [
		{id: "Housing", value: "Housing" },
		{id: "Fitness", value: "Fitness" },
		{id: "Transportation", value: "Transportation" },
		{id: "Utilities", value: "Utilities" },
		{id: "Insurance", value: "Insurance" },
		{id: "Debt", value: "Debt" },
		{id: "Taxes", value: "Taxes" },
		{id: "Entertainment", value: "Entertainment" }
	];

	$scope.monthlyBillsSubCategories={
        Housing:[
            {id: 0, value: "Rent"},
            {id: 1, value: "Mortgage"},
            {id: 2, value: "Vacation home"}
        ],
        Fitness:[
            {id: 0, value: "Gym"},
            {id: 1, value: "Yoga"},
            {id: 2, value: "Pilates"},
            {id: 3, value: "Boxing"},
            {id: 4, value: "Martial arts"}
        ],
        Transportation:[
            {id: 0, value: "Metro Card"},
            {id: 1, value: "EZ Pass"},
            {id: 2, value: "Gas"},
            {id: 3, value: "Parking"}
        ],
        Utilities:[
            {id: 0, value: "Electric"},
            {id: 1, value: "Water"},
            {id: 2, value: "Garbage"},
            {id: 3, value: "Home/Cell phone"},
            {id: 4, value: "Internet"}
        ],
        Insurance:[
            {id: 0, value: "Car insurance"},
            {id: 1, value: "Homeowner's insurance"},
            {id: 2, value: "Renter's insurance"}
        ],
        Debt :[
            {id: 0, value: "Credit card"},
            {id: 1, value: "Student loan"},
            {id: 2, value: "Personal loan"},
            {id: 3, value: "Car loan"}
		],
        Taxes :[
            {id: 0, value: "Personal"},
            {id: 1, value: "Business"},
            {id: 2, value: "House"}
		],
		Entertainment: [
			{id: 0, value: "Streaming movies/music"}
		]
	};

	$scope.updateBillDesc = function(bill){
		billsFactory.updateBillDescription(bill);
	};
	$scope.updateBillAmount = function(bill){
		billsFactory.updateBillAmount(bill);
		$scope.totalBills = billsFactory.calculateTotal();
	};
	// function that processes bills form. 
	$scope.billForm = function(){
		billsFactory.postBill($scope.category, $scope.subCategory, $scope.amount); // send form to api
		if (billsFactory.bills.length > 0 ) {
			billsFactory.bills.push({'id': billsFactory.bills.length, 
								   	 'category': $scope.category, 
								   	 'subCategory': $scope.subCategory,
								     'amount': $scope.amount});
		};
		if (billsFactory.bills.length === 0 ) {
			billsFactory.bills.push({'id': 0, 
								   	 'category': $scope.category, 
								   	 'subCategory': $scope.subCategory,
								     'amount': $scope.amount});
		};
		billsFactory.calculateTotal();
		billsFactory.calcCategoryTotals();

		$scope.totalBills = billsFactory.totalBills;
		$scope.categories = billsFactory.billsCategoryTotals;

		$scope.monthlyBillForm.$setPristine();
		$scope.category='';
		$scope.subCategory='';
		$scope.amount='';
	};
}]);