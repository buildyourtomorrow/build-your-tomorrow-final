<<<<<<< HEAD
app.controller('MonthlyExpensesCtrl', ['$scope', 
                                       'store',
                                       'auth',
                                       '$anchorScroll', 
                                       'monthlyExpensesFactory', function($scope, 
                                                                          store,
                                                                          auth,
                                                                          $anchorScroll, 
                                                                          monthlyExpensesFactory){
                          
=======
app.controller('MonthlyExpensesCtrl', ['$scope', '$location', '$anchorScroll', 'monthlyExpensesFactory', 'auth', function($scope, $location, $anchorScroll, monthlyExpensesFactory, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
	$scope.monthlyExpenses = monthlyExpensesFactory.monthlyExpenses;
	$scope.totalSpent = monthlyExpensesFactory.totalSpent;
	$scope.categories = monthlyExpensesFactory.expCategoryTotals;
    $scope.lastVisit = monthlyExpensesFactory.monthlyExpenses[0];
    $scope.goToAllExpenses = function(){
        $anchorScroll('allExpenseTransactions');
    };

	$scope.monthlyExpensesCategories=[
		{id: "Clothing", value: "Clothing" },
		{id: "Education", value: "Education" },
		{id: "Food", value: "Food" },
		{id: "Gift", value: "Gift" },
		{id: "Giving", value: "Giving" },
		{id: "Household", value: "Household" },
		{id: "Medical", value: "Medical" },
		{id: "Personal", value: "Personal" },
		{id: "Play", value: "Play", },
		{id: "Events", value: "Events" },
		{id: "Transportation", value: "Transportation" },
        {id: "Travel", value: "Travel" },
        {id: "Pets", value: "Pets" },
        {id: "Kids", value: "Kids" }
	];
	$scope.monthlyExpensesSubCategories={
        Clothing:[
            {id: 0, value: "Children's Clothing"},
            {id: 1, value: "Adult's Clothing"}
        ],
        Education:[
            {id: 0, value: "Tuition"},
            {id: 1, value: "Books"},
            {id: 2, value: "School Supplies"},
            {id: 3, value: "Field Trips"},
            {id: 4, value: "Student Loan Payment"},
            {id: 5, value: "Magazines"}
        ],
        Food:[
            {id: 0, value: "Groceries"},
            {id: 1, value: "Restaurant"},
            {id: 2, value: "Pet Food"},
            {id: 3, value: "Junk Food"},
            {id: 4, value: "Coffee"}
        ],
        Gift:[
            {id: 0, value: "Birthday"},
            {id: 1, value: "Valentine's Day"},
            {id: 2, value: "Anniversary"},
            {id: 3, value: "Wedding"},
            {id: 4, value: "Christmas"},
            {id: 5, value: "Special Occasion"}
        ],
        Giving:[
            {id: 0, value: "Tithing"},
            {id: 1, value: "Offerings"},
            {id: 2, value: "Charities"}
        ],
        Household :[
            {id: 0, value: "Toiletries"},
            {id: 1, value: "Laundry Detergent"},
            {id: 2, value: "Dishwasher Detergent"},
            {id: 3, value: "Cleaning Supplies"},
            {id: 4, value: "Tools"},
            {id: 5, value: "Furniture"},
            {id: 6, value: "Decorating"},
            {id: 7, value: "Home Improvement"},
            {id: 8, value: "Home Repair"}
		],        
        Medical :[
            {id: 0, value: "Primary Care"},
            {id: 1, value: "Dental Care"},
            {id: 2, value: "Specialty Care"},
            {id: 3, value: "Medications"},
            {id: 4, value: "Medical Devices"}
		],
		Personal: [
			{id: 0, value: "Hair & Hair Cuts"},
			{id: 1, value: "Salon Services"},
			{id: 2, value: "Cosmetics"},
			{id: 3, value: "Babysitter"},
            {id: 4, value: "Laundry"},
            {id: 5, value: "Spa & Massage"}
		],
		Play :[
            {id: 0, value: "Movies"},
            {id: 1, value: "Clubs / Bars"},
            {id: 2, value: "Entertainment"},
            {id: 3, value: "Games"},
            {id: 4, value: "Vacations"},
            {id: 5, value: "Sporting Events"},
            {id: 6, value: "Amusement Park"}
		],
		Events :[
            {id: 0, value: "Moving"},
            {id: 1, value: "Wedding"}
		],
		Transportation :[
            {id: 0, value: "Fuel"},
            {id: 1, value: "Tires"},
            {id: 2, value: "Oil Changes"},
            {id: 3, value: "Maintenance"},
            {id: 4, value: "Parking Fees"},
            {id: 5, value: "Repairs"},
            {id: 6, value: "DMV Fees"},
            {id: 7, value: "Vehicle Replacement"},
            {id: 8, value: "Taxi"},
            {id: 9, value: "Public Transportation"},
            {id: 10, value: "Tolls"},
            {id: 11, value: "Auto Payment"},
            {id: 12, value: "Auto Insurance"}
		],
        Travel :[
            {id: 0, value: "Air Travel"},
            {id: 1, value: "Hotel"},
            {id: 2, value: "Rental Car & Taxi"},
            {id: 3, value: "Vacations"}
        ],
        Pets :[
            {id: 0, value: "Pet food & Supplies"},
            {id: 1, value: "Pet Grooming"},
            {id: 2, value: "Veterinary"}
        ],
        Kids :[
            {id: 0, value: "Allowance"},
            {id: 1, value: "Baby Supplies"},
            {id: 2, value: "Babysitter & Daycare"},
            {id: 3, value: "Child Support"},
            {id: 4, value: "Kids Activities"},
            {id: 5, value: "Toys"}
        ]
    };
    $scope.removeExpense = function(index){
        monthlyExpensesFactory.removeExpense(index);
        monthlyExpensesFactory.calcCategoryTotals();
        $scope.categories = monthlyExpensesFactory.expCategoryTotals;
    };
	$scope.monthlyExpenseForm = function(){
		monthlyExpensesFactory.postMonthlyExpense($scope.category, $scope.subCategory, $scope.amount, new Date());
		if (monthlyExpensesFactory.monthlyExpenses.length > 0) {
			monthlyExpensesFactory.monthlyExpenses.unshift({'id': monthlyExpensesFactory.monthlyExpenses.length, 
								   						    'category': $scope.category, 
								   						    'subCategory': $scope.subCategory,
								    					    'amount': $scope.amount, 
                                                            'date': new Date()});
		};

		if (monthlyExpensesFactory.monthlyExpenses.length === 0) {
			monthlyExpensesFactory.monthlyExpenses.unshift({'id': 0,
								   						    'category': $scope.category, 
								   						    'subCategory': $scope.subCategory,
								    					    'amount': $scope.amount,
                                                            'date': new Date()});
		};
		monthlyExpensesFactory.calcCategoryTotals();
		/* Update the scope */
		$scope.categories = monthlyExpensesFactory.expCategoryTotals;
        $scope.lastVisit = monthlyExpensesFactory.monthlyExpenses[0];        

		$scope.monthlyExpForm.$setPristine();
		$scope.category='';
		$scope.subCategory='';
		$scope.amount='';
        $scope.question='';
	};
}]);