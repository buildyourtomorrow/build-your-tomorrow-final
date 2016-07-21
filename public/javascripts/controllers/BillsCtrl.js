<<<<<<< HEAD
app.controller('BillsCtrl', ['$scope',
							 'store',
							 'auth',
	 						 '$anchorScroll', 
	 						 'billsFactory', 
	 						 function($scope, 
	 						 		  store,
	 						 		  auth,
	 						 		  $anchorScroll, 
	 						 		  billsFactory){

=======
app.controller('BillsCtrl', ['$scope', '$location', '$anchorScroll', 'billsFactory', 'auth', function($scope, $location, $anchorScroll, billsFactory, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
	$scope.bills = billsFactory.bills;
	$scope.totalBills = billsFactory.totalBills;
	$scope.categories = billsFactory.billsCategoryTotals;
	$scope.lastVisit = billsFactory.bills[0];
	$scope.goToAllBills = function(){
	    $anchorScroll('allBillTransactions');
	};

	$scope.monthlyBillsCategories = [
		{id: "Housing", value: "Housing" },
		{id: "Health", value: "Health" },
		{id: "Transportation", value: "Transportation" },
		{id: "Utilities", value: "Utilities" },
		{id: "Insurance", value: "Insurance" },
		{id: "Debt", value: "Debt" },
		{id: "Taxes", value: "Taxes" },
		{id: "Entertainment", value: "Entertainment" }
	];
	$scope.removeBill = function(index){
        billsFactory.removeBill(index);
        billsFactory.calcCategoryTotals();
        $scope.categories = billsFactory.billsCategoryTotals;
    };
	$scope.monthlyBillsSubCategories={
        Housing:[
            {id: 0, value: "Rent"},
            {id: 1, value: "Mortgage"},
            {id: 2, value: "Vacation home"}
        ],
        Health:[
            {id: 0, value: "Gym"},
            {id: 1, value: "Yoga"},
            {id: 2, value: "Pilates"},
            {id: 3, value: "Boxing"},
            {id: 4, value: "Martial arts"},
            {id: 5, value: "Health Insurance"},
            {id: 6, value: "Pharmacy"},
            {id: 7, value: "Eyecare"},
            {id: 8, value: "Doctor"},
            {id: 9, value: "Dentist"}
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
	// function that processes bills form. 
	$scope.billForm = function(){
		billsFactory.postBill($scope.category, $scope.subCategory, $scope.amount, new Date()); // send form to api
		if (billsFactory.bills.length > 0 ) {
			billsFactory.bills.unshift({'id': billsFactory.bills.length, 
								   	 'category': $scope.category, 
								   	 'subCategory': $scope.subCategory,
								     'amount': $scope.amount,
								     'date': new Date()});
		};
		if (billsFactory.bills.length === 0 ) {
			billsFactory.bills.unshift({'id': 0, 
								   	 'category': $scope.category, 
								   	 'subCategory': $scope.subCategory,
								     'amount': $scope.amount,
								     'date': new Date()});
		};
		billsFactory.calculateTotal();
		billsFactory.calcCategoryTotals();

		$scope.totalBills = billsFactory.totalBills;
		$scope.categories = billsFactory.billsCategoryTotals;
		$scope.lastVisit = billsFactory.bills[0];

		$scope.monthlyBillForm.$setPristine();
		$scope.category='';
		$scope.subCategory='';
		$scope.amount='';
		$scope.question='';
	};
}]);