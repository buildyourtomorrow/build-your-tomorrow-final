app.factory('monthlyExpensesFactory', ['$http', 'incomeFactory', 'auth', '$state', function($http, incomeFactory, auth, $state){
	var o = {
		monthlyExpenses: [],
		spendingLimit: 0,
		totalSpent: 0,
		leftOver: 0,
		upBy: 0,
		dailyBudget: 0,
		daysLeft: 0,
		periodStart: [],
		periodEnd: [],
		today: [],
		totalIncome: 0,
		totalBills: 0
	};
	o.getUser = function(){
		return $http.get('/get-user', {headers: {Authorization: 'Bearer ' + auth.getToken()}} ).then(function(response){

			angular.copy(response.data.monthlyExpenses, o.monthlyExpenses);
			o.spendingLimit = response.data.spendingLimit;
			o.totalSpent = response.data.totalSpent;
			o.leftOver = response.data.leftOver;
			o.upBy = response.data.upBy;
			o.dailyBudget = response.data.dailyBudget;
			o.daysLeft = response.data.daysLeft;
			o.periodStart.push(response.data.periodStart);
			o.periodEnd.push(response.data.periodEnd);
			o.today.push(response.data.today);
			o.totalIncome = response.data.totalIncome;
			o.totalBills = response.data.billsTotal;
		}, function(){
			$state.go('register');
		});
	};
	o.postMonthlyExpense = function(description, amount){ // function that sends monthly expense to api
		return $http.post('/add-monthly-expense', {'description': description, 'amount': amount}, {headers: {Authorization: 'Bearer ' + auth.getToken()}}) // config is the 3rd arg. header is config.
	};	
	o.postSpendingLimit = function(spendingLimit){
		return $http.post('/add-spending-limit', {'spendingLimit': spendingLimit}, {headers: {Authorization: 'Bearer ' + auth.getToken()}})
	};
	o.calcTotalSpent = function(expenses){
		var x = 0;
		for (i=0; i<expenses.length; i++){			
			x = x + expenses[i].amount;
		};
		o.totalSpent = x;
	};

	o.calcPeriodStart = function(){
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth();
		var x1 = new Date(year, month, 1);
		o.periodStart = [];
		o.periodStart.push(x1);
		o.periodStart.push(x1.getDate());
	};
	o.calcPeriodEnd = function(){
		var today = new Date();
		var year = today.getFullYear();
		var month = today.getMonth() + 1;
		var x1 = new Date(year, month, 0);
		o.periodEnd = [];
		o.periodEnd.push(x1);
		o.periodEnd.push(x1.getDate());
	};
	o.calcToday = function(){
		var today = new Date();
		var dd = today.getDate();
		o.today = []; 
		o.today.push(today);
		o.today.push(dd);
	};
	o.calcUpBy = function(){
		var x1 = (o.dailyBudget * ((o.today[1] - o.periodStart[1]) + 1)) - o.totalSpent;
		o.upBy = x1;
	};
	o.calcDailyBudget = function(){
		var x1 = o.spendingLimit / ((o.periodEnd[1] - o.periodStart[1]) + 1);
		o.dailyBudget = x1;
	};
	o.calcDaysLeft = function(){
		o.daysLeft = o.periodEnd[1] - o.today[1];
	};
	return o
}]);