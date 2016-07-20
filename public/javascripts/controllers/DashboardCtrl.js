app.controller('DashboardCtrl', ['$scope',
								 'auth',
								 'store',
								 '$interval', 
								 '$anchorScroll', 
								 'monthlyExpensesFactory', 
								 function($scope,								 		  
								 		  auth,
								 		  store,
								 		  $interval,
								 		  $anchorScroll, 
								 		  monthlyExpensesFactory){

	$scope.nickName = monthlyExpensesFactory.nickName[0];

	var randomQuotes = function(){
		var byt_quotes = [
			"\"Beware of little expenses. A small leak will sink a great ship\"",
			"\"A budget tells us what we can't afford, but it doesn't stop us from buying it\"",
			"\"About the time we can make the ends meet, somebody moves the ends\"",
			"\"Know where you stand financially\"",
			"\"As sure as the spring will follow the winter, prosperity and economic growth will follow recession\"",
			"\"Save cash during the good times, invest cash during the bad times\"",
			"\"The more stable your emotions, the easier it is to save\"",
			"\"Unstable emotions usually lead to high credit card\"",
			"\"Financial freedom is available to those who learn about it and work for it\"",
			"\"Building wealth is usually repetitive and boring\"",
			"\"Because of divorce and life expectancy, it's important for women to control thier finances\"",
			"\"When money realizes that it is in good hands, it wants to stay and multiply in those hands\"",
			"\"Every time you borrow money, you're robbing your future self\"",
			"\"Success is fueled by being persistent and consistent\"",
			"\"When it comes to money, ignorance is NOT bliss. What you don't know CAN hurt you\"",
			"\"I used to say why save money if I'll die tomorrow, I haven’t died yet and I have nothing to survive on\"",
			"\"You don’t have to be a miser, just be wiser with your money\"",
			"\"You got loans to pay off, and I got deposits to make\"",
			"\"We are very much aware of the existence of money, but not so much the concept of currency\"",
			"\"An investment in knowledge pays the best interest\"",
			"\"I will tell you how to become rich. Close the doors. Be fearful when others are greedy. Be greedy when others are fearful\"",
			"\"Invest in yourself. Your career is the engine of your wealth\"",
			"\"Investing should be more like watching paint dry or watching grass grow. If you want excitement, take $800 and go to Las Vegas\"",
			"\"Budgeting has only one rule: Do not go over budget\"",
			"\"If repairing one's credit is as easy as sending some dispute letters to the credit bureaus then why doesn't everyone have good credit?\"",
			"\"A bank is a place that will lend you money if you can prove that you don’t need it\"",
			"\"We make ourselves rich by making our wants few\"",
			"\"Being frugal does not mean being cheap! It means being economical and avoiding waste\"",
			"\"It is great wealth to a soul to live frugally with a contented mind\"",
			"\"If you can, you will quickly find that the greatest rate of return you will earn is on your own personal spending. Being a smart shopper is the first step to getting rich\"",
			"\"Save a part of your income and begin now, for the man with a surplus controls circumstances and the man without a surplus is controlled by circumstances\"",
			"\"If saving money is wrong, I don't want to be right\"",
			"\"A simple fact that is hard to learn is that the time to save money is when you have some\"",
			"\"He or she who does not economize will have to agonize\"",
			"\"The best way to save money is not to lose it\"",
			"\"A women's best protection is money of her own\"",
			"\"Don't count your check-ins before they cash\"",
			"\"It's not your salary that makes you rich, it's your spending habits\"",
			"\"This first wealth is health\"",
			"\"Wealth is the slave of a wise man. The master of a fool\"",
			"\"Wealth is the product of a man or woman's capacity to think\"",
		];
		$scope.byt_show_section = true;
		$scope.quote = byt_quotes[Math.floor(Math.random() * byt_quotes.length)], 2000;
	};
	$interval(randomQuotes, 8000);

	$scope.projectedIncome = monthlyExpensesFactory.projectedIncome;
	$scope.projectedBills = monthlyExpensesFactory.projectedBills;
	$scope.projectedExpenses = monthlyExpensesFactory.projectedExpenses;
	$scope.projectedSavings = monthlyExpensesFactory.projectedSavings;
	$scope.upBy = monthlyExpensesFactory.upBy;	
	
	// Actual column
	// Actual column
	// Actual column
	$scope.totalIncome = monthlyExpensesFactory.totalIncome;
	if ($scope.totalIncome > 0) {
		$scope.totalIncomeColor = '#32CD32';
	}
	$scope.totalBills = monthlyExpensesFactory.totalBills;	
	if ($scope.totalBills > 0) {
		$scope.totalBillsColor = '#FF0000';
	}
	$scope.totalSpent = monthlyExpensesFactory.totalSpent;
	if ($scope.totalSpent > 0) {
		$scope.totalSpentColor = '#FF0000';
	}
	if ($scope.totalIncome - $scope.totalBills - $scope.totalSpent > 0) {
		$scope.totalSavingsColor = '#32CD32';
	}
	if ($scope.totalIncome - $scope.totalBills - $scope.totalSpent < 0) {
		$scope.totalSavingsColor = '#FF0000';
	}
	if ($scope.totalIncome - $scope.totalBills - $scope.totalSpent == 0) {
		$scope.totalSavingsColor = '#666666';
	}
	// Actual column
	// Actual column
	// Actual column


	// differences column
	// differences column
	// differences column
	if( ($scope.projectedIncome - $scope.totalIncome) < 0){
		$scope.plusMinusIncome = '#32CD32';
	}
	if( ($scope.projectedIncome - $scope.totalIncome) > 0){
		$scope.plusMinusIncome = '#FF0000';
	}
	if( ($scope.projectedBills - $scope.totalBills) < 0){
		$scope.plusMinusBills = '#FF0000';
	}
	if( ($scope.projectedBills - $scope.totalBills) > 0){
		$scope.plusMinusBills = '#32CD32';
	}
	if( ($scope.projectedExpenses - $scope.totalSpent) < 0){
		$scope.plusMinusExpenses = '#FF0000';
	}
	if( ($scope.projectedExpenses - $scope.totalSpent) > 0){
		$scope.plusMinusExpenses = '#32CD32';
	}
	if( ( (($scope.projectedIncome - $scope.projectedBills - $scope.projectedExpenses) - ($scope.totalIncome - $scope.totalBills - $scope.totalSpent)) ) < 0){
		$scope.plusMinusSavings = '#32CD32';
	}
	if( ( (($scope.projectedIncome - $scope.projectedBills - $scope.projectedExpenses) - ($scope.totalIncome - $scope.totalBills - $scope.totalSpent)) ) > 0){
		$scope.plusMinusSavings = '#FF0000';
	}
	// differences column
	// differences column
	// differences column

	$scope.leftOver = monthlyExpensesFactory.leftOver;
	if ($scope.totalIncome - $scope.totalBills - $scope.totalSpent > 0) {
		$scope.savingMoneyBaby = "Keep saving that money homie.";
	} else if ($scope.totalIncome - $scope.totalBills - $scope.totalSpent === 0) {
		$scope.savingMoneyBaby = "Baby boo, stop being lazy and add your income, bills, and expenses.";
	} else {
		$scope.savingMoneyBaby = "Yo, stop spending so much damn money";
	}
	if ($scope.upBy > 0) {
		$scope.specialVarUpBy = '#00FF00';
		$scope.specialVarUpByWord = 'Up by';
		$scope.upByComment = "Ayo, we can spend " + Math.floor($scope.upBy) + " without going over budget.";
	} 
	if ($scope.upBy === 0) {
		$scope.specialVarUpByWord = 'Up by';
		$scope.upByComment = "Add a spending limit wangsta";
		$scope.specialVarUpBy = '#666666';
	} 
	if ($scope.upBy < 0) {
		$scope.specialVarUpBy = '#FE7878';
		$scope.specialVarUpByWord = 'Down by';
		$scope.upByComment = "OMG, we're behind budget by " + Math.floor($scope.upBy) + " Let's get it together people";
	}

	$scope.dailyBudget = monthlyExpensesFactory.dailyBudget;
	$scope.daysLeft = monthlyExpensesFactory.daysLeft;
	$scope.periodStart = monthlyExpensesFactory.periodStart[0];
	$scope.periodEnd = monthlyExpensesFactory.periodEnd[0];

	$scope.editIncomeProjectionFunc = function(){
		monthlyExpensesFactory.postProjections($scope.projectedIncome, $scope.projectedBills, $scope.projectedExpenses);
		if( ($scope.projectedIncome - $scope.totalIncome) < 0){
			$scope.plusMinusIncome = '#32CD32';
		}
		if( ($scope.projectedIncome - $scope.totalIncome) > 0){
			$scope.plusMinusIncome = '#FF0000';
		}
		if( ( (($scope.projectedIncome - $scope.projectedBills - $scope.projectedExpenses) - ($scope.totalIncome - $scope.totalBills - $scope.totalSpent)) ) < 0){
			$scope.plusMinusSavings = '#32CD32';
		}
		if( ( (($scope.projectedIncome - $scope.projectedBills - $scope.projectedExpenses) - ($scope.totalIncome - $scope.totalBills - $scope.totalSpent)) ) > 0){
			$scope.plusMinusSavings = '#FF0000';
		}
	};

	$scope.editBillProjectionFunc = function(){
		monthlyExpensesFactory.postProjections($scope.projectedIncome, $scope.projectedBills, $scope.projectedExpenses);
		if( ($scope.projectedBills - $scope.totalBills) < 0){
			$scope.plusMinusBills = '#FF0000';
		}
		if( ($scope.projectedBills - $scope.totalBills) > 0){
			$scope.plusMinusBills = '#32CD32';
		}
		if( ( (($scope.projectedIncome - $scope.projectedBills - $scope.projectedExpenses) - ($scope.totalIncome - $scope.totalBills - $scope.totalSpent)) ) < 0){
			$scope.plusMinusSavings = '#32CD32';
		}
		if( ( (($scope.projectedIncome - $scope.projectedBills - $scope.projectedExpenses) - ($scope.totalIncome - $scope.totalBills - $scope.totalSpent)) ) > 0){
			$scope.plusMinusSavings = '#FF0000';
		}
	}

	$scope.editExpProjectionFunc = function(){
		monthlyExpensesFactory.postProjections($scope.projectedIncome, $scope.projectedBills, $scope.projectedExpenses);
		// here I'm updating the factory
		monthlyExpensesFactory.projectedIncome = $scope.projectedIncome;
		monthlyExpensesFactory.projectedBills = $scope.projectedBills;
		monthlyExpensesFactory.projectedExpenses = $scope.projectedExpenses;
		monthlyExpensesFactory.calcPeriodStart();
		monthlyExpensesFactory.calcPeriodEnd();
		monthlyExpensesFactory.calcToday();
		monthlyExpensesFactory.calcDailyBudget();
		monthlyExpensesFactory.calcUpBy();
		monthlyExpensesFactory.calcDaysLeft();

		//updating scope
		$scope.projectedExpenses = monthlyExpensesFactory.projectedExpenses;
		$scope.dailyBudget = monthlyExpensesFactory.dailyBudget;
		$scope.leftOver = monthlyExpensesFactory.projectedExpenses - monthlyExpensesFactory.totalSpent;

		if (monthlyExpensesFactory.upBy >= 0) {
			$scope.specialVarUpBy = '#00FF00';
			$scope.specialVarUpByWord = 'Up By';
			$scope.upBy = monthlyExpensesFactory.upBy;
		} 
		if (monthlyExpensesFactory.upBy < 0) {
			$scope.specialVarUpBy = '#FE7878';
			$scope.specialVarUpByWord = 'Down By';
			$scope.upBy = monthlyExpensesFactory.upBy;
		}
		if ($scope.upBy > 0) {
			$scope.specialVarUpBy = '#00FF00';
			$scope.specialVarUpByWord = 'Up by';
			$scope.upByComment = "Ayo, we can spend " + Math.floor($scope.upBy) + " without going over budget.";
		} 
		if ($scope.upBy === 0) {
			$scope.specialVarUpByWord = 'Up by';
			$scope.upByComment = "Add a spending limit wangsta";
			$scope.specialVarUpBy = '#666666';
		} 
		if ($scope.upBy < 0) {
			$scope.specialVarUpBy = '#FE7878';
			$scope.specialVarUpByWord = 'Down by';
			$scope.upByComment = "OMG, we're behind budget by " + Math.floor($scope.upBy) + " Let's get it together people";
		}
		if( ($scope.projectedExpenses - $scope.totalSpent) < 0){
			$scope.plusMinusExpenses = '#FF0000';
		}
		if( ($scope.projectedExpenses - $scope.totalSpent) > 0){
			$scope.plusMinusExpenses = '#32CD32';
		}
		if( ( (($scope.projectedIncome - $scope.projectedBills - $scope.projectedExpenses) - ($scope.totalIncome - $scope.totalBills - $scope.totalSpent)) ) < 0){
			$scope.plusMinusSavings = '#32CD32';
		}
		if( ( (($scope.projectedIncome - $scope.projectedBills - $scope.projectedExpenses) - ($scope.totalIncome - $scope.totalBills - $scope.totalSpent)) ) > 0){
			$scope.plusMinusSavings = '#FF0000';
		}	
	}
	$scope.goToDashboard = function(){
	    $anchorScroll('theDashboard');
	};
}]);