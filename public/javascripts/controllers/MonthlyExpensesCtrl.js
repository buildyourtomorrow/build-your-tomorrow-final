app.controller('MonthlyExpensesCtrl', ['$scope', 'monthlyExpensesFactory', 'auth', function($scope, monthlyExpensesFactory, auth){
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.monthlyExpenses = monthlyExpensesFactory.monthlyExpenses;
	$scope.totalSpent = monthlyExpensesFactory.totalSpent;
	$scope.categories = monthlyExpensesFactory.expCategoryTotals;

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
			{id: 0, value: "Hair Cuts"},
			{id: 1, value: "Salon Services"},
			{id: 2, value: "Cosmetics"},
			{id: 3, value: "Babysitter"}
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
		]
    };

	$scope.updateExpAmount = function(expense){
		monthlyExpensesFactory.editMonthlyExpAmount(expense);
		monthlyExpensesFactory.calcTotalSpent(monthlyExpensesFactory.monthlyExpenses);
		$scope.totalSpent = monthlyExpensesFactory.totalSpent; // research $watch.
	};

	$scope.updateExpDescription = function(expense){
		monthlyExpensesFactory.editMonthlyExpDescription(expense);
	};

	$scope.monthlyExpenseForm = function(){
		monthlyExpensesFactory.postMonthlyExpense($scope.category, $scope.subCategory, $scope.amount);
		if (monthlyExpensesFactory.monthlyExpenses.length > 0) {
			monthlyExpensesFactory.monthlyExpenses.push({'id': monthlyExpensesFactory.monthlyExpenses.length, 
								   						 'category': $scope.category, 
								   						 'subCategory': $scope.subCategory,
								    					 'amount': $scope.amount});
		};
		if (monthlyExpensesFactory.monthlyExpenses.length === 0) {
			monthlyExpensesFactory.monthlyExpenses.push({'id': 0,
								   						 'category': $scope.category, 
								   						 'subCategory': $scope.subCategory,
								    					 'amount': $scope.amount});
		};
		/* The functions below updata a bunch of stuff throughout the app. Alot of it is not needed but I included them here just in case I missed something somewhere else */
		monthlyExpensesFactory.calcTotalSpent(monthlyExpensesFactory.monthlyExpenses);
		monthlyExpensesFactory.calcPeriodStart();
		monthlyExpensesFactory.calcPeriodEnd();
		monthlyExpensesFactory.calcToday();
		monthlyExpensesFactory.calcDailyBudget();
		monthlyExpensesFactory.calcUpBy();
		monthlyExpensesFactory.calcDaysLeft();
		monthlyExpensesFactory.calcCategoryTotals();
		/* Update the scope */
		$scope.spendingLimit = monthlyExpensesFactory.spendingLimit;
		$scope.totalSpent = monthlyExpensesFactory.totalSpent;
		$scope.leftOver = monthlyExpensesFactory.spendingLimit[0] - monthlyExpensesFactory.totalSpent;
		$scope.upBy = monthlyExpensesFactory.upBy;
		$scope.categories = monthlyExpensesFactory.expCategoryTotals;

		$scope.monthlyExpForm.$setPristine();
		$scope.category='';
		$scope.subCategory='';
		$scope.amount='';
	};
}]);