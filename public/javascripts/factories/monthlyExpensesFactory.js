app.factory('monthlyExpensesFactory', ['$http', 'incomeFactory', 'auth', '$state', function($http, incomeFactory, auth, $state){
	var o = {
		monthlyExpenses: [],
		expCategoryTotals: [],		
		projectedIncome: 0,
		projectedBills: 0,
		projectedExpenses: 0,
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
	o.removeExpense = function(index){
		o.monthlyExpenses.splice(index, 1);
		return $http.put('/remove-expense', {'index': index}, {headers: {Authorization: 'Bearer ' + auth.getToken()} })	
	};
	o.getUser = function(){
		return $http.get('/get-user', {headers: {Authorization: 'Bearer ' + auth.getToken()}} ).then(function(response){

			angular.copy(response.data.monthlyExpenses, o.monthlyExpenses);
			angular.copy(response.data.expCategoryTotals, o.expCategoryTotals);
			o.projectedIncome = response.data.projectedIncome;
			o.projectedBills = response.data.projectedBills;
			o.projectedExpenses = response.data.projectedExpenses;
			o.totalSpent = response.data.totalSpent;
			o.leftOver = response.data.leftOver;
			o.upBy = response.data.upBy;
			o.dailyBudget = response.data.dailyBudget;
			o.daysLeft = response.data.daysLeft;			

			var today = new Date();
			var year = today.getFullYear();
			var month = today.getMonth() + 1;
			var x1 = new Date(year, month, 1);
			x1 = x1.getDate();
			var periodStart1 = month+'/'+x1+'/'+year;
			o.periodStart = [];
			o.periodStart.push(periodStart1);
						
			var today = new Date();
			var year = today.getFullYear();
			var month = today.getMonth() + 1;
			var x1 = new Date(year, month, 0);
			x1 = x1.getDate();
			var periodEnd1 = month+'/'+x1+'/'+year;
			o.periodEnd = [];
			o.periodEnd.push(periodEnd1);	

			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth()+1; //January is 0!
			var yyyy = today.getFullYear();
			today = mm+'/'+dd+'/'+yyyy;
			o.today.push(today);
			
			o.totalIncome = response.data.totalIncome;
			o.totalBills = response.data.billsTotal;
		}, function(){
			$state.go('register');
		});
	};
	o.postMonthlyExpense = function(category, subCategory, amount, date){ // function that sends monthly expense to api
		return $http.post('/add-monthly-expense', {'category': category, 'subCategory': subCategory, 'amount': amount, 'date': date}, {headers: {Authorization: 'Bearer ' + auth.getToken()}}) // config is the 3rd arg. header is config.
	};	
	o.postProjections = function(projectedIncome, projectedBills, projectedExpenses){
		return $http.post('/add-projections', {'projectedIncome': projectedIncome, 
											   'projectedBills': projectedBills, 
											   'projectedExpenses': projectedExpenses}, {headers: {Authorization: 'Bearer ' + auth.getToken()}})
	};
	o.calcTotalSpent = function(expenses){
		var x = 0;
		for (i=0; i<expenses.length; i++){		
			x = x + Math.floor(expenses[i].amount);
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
		o.periodStart.push(x1.getDate())
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
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		today = mm+'/'+dd+'/'+yyyy;
		o.today = []; 
		o.today.push(today);
		o.today.push(dd);
	};
	o.calcUpBy = function(){
		var x1 = (o.dailyBudget * o.today[1]) - o.totalSpent;
		o.upBy = x1;
	};
	o.calcDailyBudget = function(){
		var x1 = o.projectedExpenses / o.periodEnd[1];
		o.dailyBudget = x1;
	};
	o.calcDaysLeft = function(){
		o.daysLeft = o.periodEnd[1] - o.today[1];
	};
	o.calcCategoryTotals = function(){
		o.expCategoryTotals = [
			{
				category: "Clothing",
				total: 0,
				subCategory: [{
					name: "Children's Clothing",
					total: 0
				},
				{
					name: "Adult's Clothing",
					total: 0	
				}]
			},
			{
				category: "Education",
				total: 0,
				subCategory: [{
					name: "Tuition",
					total: 0
				},
				{
					name: "Books",
					total: 0	
				},
				{
					name: "School Supplies",
					total: 0		
				},
				{
					name: "Field Trips",
					total: 0	
				},
				{
					name: "Student Loan Payment",
					total: 0
				},
				{
					name: "Magazines",
					total: 0
				}]
			},
			{
				category: "Food",
				total: 0,
				subCategory: [{
					name: "Groceries",
					total: 0 
				},
				{
					name: "Restaurant",
					total: 0 
				},
				{
					name: "Pet Food",
					total: 0
				},
				{
					name: "Junk Food",
					total: 0
				},
				{
					name: "Coffee",
					total: 0	
				}]
			},
			{
				category: "Gift",
				total: 0,
				subCategory: [{
					name: "Birthday",
					total: 0 
				},
				{
					name: "Valentine's Day",
					total: 0 
				},
				{
					name: "Anniversary",
					total: 0
				},
				{
					name: "Wedding",
					total: 0
				},
				{
					name: "Christmas",
					total: 0	
				},
				{
					name: "Special Occasion",
					total: 0	
				}]
			},
			{
				category: "Giving",
				total: 0,
				subCategory: [{
					name: "Tithing",
					total: 0 
				},
				{
					name: "Offerings",
					total: 0 
				},
				{
					name: "Charities",
					total: 0
				}]
			},
			{ 
				category: "Household",
				total: 0,
				subCategory: [{
					name: "Toiletries",
					total: 0 
				},
				{
					name: "Laundry Detergent",
					total: 0 
				},
				{
					name: "Dishwasher Detergent",
					total: 0
				},
				{
					name: "Cleaning Supplies",
					total: 0
				},
				{
					name: "Tools",
					total: 0	
				},
				{
					name: "Furniture",
					total: 0	
				},
				{
					name: "Decorating",
					total: 0	
				},
				{
					name: "Home Improvement",
					total: 0	
				},
				{
					name: "Home Repair",
					total: 0	
				}]
			},
			{
				category: "Medical",
				total: 0,
				subCategory: [{
					name: "Primary Care",
					total: 0 
				},
				{
					name: "Dental Care",
					total: 0 
				},
				{
					name: "Specialty Care",
					total: 0
				},
				{
					name: "Medications",
					total: 0
				},
				{
					name: "Medical Devices",
					total: 0	
				}]
			},
			{
				category: "Personal",
				total: 0,
				subCategory: [{
					name: "Hair & Hair Cuts",
					total: 0 
				},
				{
					name: "Salon Services",
					total: 0 
				},
				{
					name: "Cosmetics",
					total: 0
				},
				{
					name: "Babysitter",
					total: 0
				},
				{
					name: "Laundry",
					total: 0
				},
				{
					name: "Spa & Massage",
					total: 0
				}]
			},
			{
				category: "Play",
				total: 0,
				subCategory: [{
					name: "Movies",
					total: 0 
				},
				{
					name: "Clubs / Bars",
					total: 0 
				},
				{
					name: "Entertainment",
					total: 0
				},
				{
					name: "Games",
					total: 0
				},
				{
					name: "Vacations",
					total: 0
				},
				{
					name: "Sporting Events",
					total: 0
				},
				{
					name: "Amusement Park",
					total: 0
				}]
			},
			{ 
				category: "Events",
				total: 0,
				subCategory: [{
					name: "Moving",
					total: 0 
				},
				{
					name: "Wedding",
					total: 0 
				}]
			},
			{ 
				category: "Transportation",
				total: 0,
				subCategory: [{
					name: "Fuel",
					total: 0 
				},
				{
					name: "Tires",
					total: 0 
				},
				{
					name: "Oil Changes",
					total: 0
				},
				{
					name: "Maintenance",
					total: 0
				},
				{
					name: "Parking Fees",
					total: 0
				},
				{
					name: "Repairs",
					total: 0
				},
				{
					name: "DMV Fees",
					total: 0
				},
				{
					name: "Vehicle Replacement",
					total: 0
				},
				{
					name: "Taxi",
					total: 0
				},
				{
					name: "Public Transportation",
					total: 0
				},
				{
					name: "Tolls",
					total: 0
				},
				{
					name: "Auto Payment",
					total: 0
				},
				{
					name: "Auto Insurance",
					total: 0
				}]
			},
			{ 
				category: "Travel",
				total: 0,
				subCategory: [{
					name: "Air Travel",
					total: 0 
				},
				{
					name: "Hotel",
					total: 0 
				},
				{
					name: "Rental Car & Taxi",
					total: 0
				},
				{
					name: "Vacations",
					total: 0
				}]
			},
			{ 
				category: "Pets",
				total: 0,
				subCategory: [{
					name: "Pet Food & Supplies",
					total: 0 
				},
				{
					name: "Pet Grooming",
					total: 0 
				},
				{
					name: "Veterinary",
					total: 0
				}]
			},
			{ 
				category: "Kids",
				total: 0,
				subCategory: [{
					name: "Allowance",
					total: 0 
				},
				{
					name: "Baby Supplies",
					total: 0 
				},
				{
					name: "Babysitter & Daycare",
					total: 0
				},
				{
					name: "Child Support",
					total: 0
				},
				{
					name: "Kids Activities",
					total: 0
				},
				{
					name: "Toys",
					total: 0
				}]
			}
		]
		for (i = 0; i < o.monthlyExpenses.length; i++){			
			if (o.monthlyExpenses[i].category === "Clothing") {
				o.expCategoryTotals[0].total += o.monthlyExpenses[i].amount;	
				if (o.monthlyExpenses[i].subCategory === "Children's Clothing") {
					o.expCategoryTotals[0].subCategory[0].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Adult's Clothing") {
					o.expCategoryTotals[0].subCategory[1].total += o.monthlyExpenses[i].amount;
				}
			};
			if (o.monthlyExpenses[i].category === "Education") {
				o.expCategoryTotals[1].total += o.monthlyExpenses[i].amount;	
				if (o.monthlyExpenses[i].subCategory === "Tuition") {
					o.expCategoryTotals[1].subCategory[0].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Books") {
					o.expCategoryTotals[1].subCategory[1].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "School Supplies") {
					o.expCategoryTotals[1].subCategory[2].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Field Trips") {
					o.expCategoryTotals[1].subCategory[3].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Student Loan Payment") {
					o.expCategoryTotals[1].subCategory[4].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Magazines") {
					o.expCategoryTotals[1].subCategory[5].total += o.monthlyExpenses[i].amount;
				}
			};
			if (o.monthlyExpenses[i].category === "Food") {
				o.expCategoryTotals[2].total += o.monthlyExpenses[i].amount;	
				if (o.monthlyExpenses[i].subCategory === "Groceries") {
					o.expCategoryTotals[2].subCategory[0].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Restaurant") {
					o.expCategoryTotals[2].subCategory[1].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Pet Food") {
					o.expCategoryTotals[2].subCategory[2].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Junk Food") {
					o.expCategoryTotals[2].subCategory[3].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Coffee") {
					o.expCategoryTotals[2].subCategory[4].total += o.monthlyExpenses[i].amount;
				}
			};
			if (o.monthlyExpenses[i].category === "Gift") {
				o.expCategoryTotals[3].total += o.monthlyExpenses[i].amount;	
				if (o.monthlyExpenses[i].subCategory === "Birthday") {
					o.expCategoryTotals[3].subCategory[0].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Valentine's Day") {
					o.expCategoryTotals[3].subCategory[1].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Anniversary") {
					o.expCategoryTotals[3].subCategory[2].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Wedding") {
					o.expCategoryTotals[3].subCategory[3].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Christmas") {
					o.expCategoryTotals[3].subCategory[4].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Special Occasion") {
					o.expCategoryTotals[3].subCategory[5].total += o.monthlyExpenses[i].amount;
				}
			};
			if (o.monthlyExpenses[i].category === "Giving") {
				o.expCategoryTotals[4].total += o.monthlyExpenses[i].amount;	
				if (o.monthlyExpenses[i].subCategory === "Tithing") {
					o.expCategoryTotals[4].subCategory[0].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Valentine's Day") {
					o.expCategoryTotals[4].subCategory[1].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Anniversary") {
					o.expCategoryTotals[4].subCategory[2].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Wedding") {
					o.expCategoryTotals[4].subCategory[3].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Christmas") {
					o.expCategoryTotals[4].subCategory[4].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Special Occasion") {
					o.expCategoryTotals[4].subCategory[5].total += o.monthlyExpenses[i].amount;
				}
			};
			if (o.monthlyExpenses[i].category === "Household") {
				o.expCategoryTotals[5].total += o.monthlyExpenses[i].amount;	
				if (o.monthlyExpenses[i].subCategory === "Toiletries") {
					o.expCategoryTotals[5].subCategory[0].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Laundry Detergent") {
					o.expCategoryTotals[5].subCategory[1].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Dishwasher Detergent") {
					o.expCategoryTotals[5].subCategory[2].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Cleaning Supplies") {
					o.expCategoryTotals[5].subCategory[3].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Tools") {
					o.expCategoryTotals[5].subCategory[4].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Furniture") {
					o.expCategoryTotals[5].subCategory[5].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Decorating") {
					o.expCategoryTotals[5].subCategory[6].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Home Improvement") {
					o.expCategoryTotals[5].subCategory[7].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Home Repair") {
					o.expCategoryTotals[5].subCategory[8].total += o.monthlyExpenses[i].amount;
				}
			};
			if (o.monthlyExpenses[i].category === "Medical") {
				o.expCategoryTotals[6].total += o.monthlyExpenses[i].amount;	
				if (o.monthlyExpenses[i].subCategory === "Primary Care") {
					o.expCategoryTotals[6].subCategory[0].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Dental Care") {
					o.expCategoryTotals[6].subCategory[1].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Specialty Care") {
					o.expCategoryTotals[6].subCategory[2].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Medications") {
					o.expCategoryTotals[6].subCategory[3].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Medical Devices") {
					o.expCategoryTotals[6].subCategory[4].total += o.monthlyExpenses[i].amount;
				}
			};
			if (o.monthlyExpenses[i].category === "Personal") {
				o.expCategoryTotals[7].total += o.monthlyExpenses[i].amount;	
				if (o.monthlyExpenses[i].subCategory === "Hair & Hair Cuts") {
					o.expCategoryTotals[7].subCategory[0].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Salon Services") {
					o.expCategoryTotals[7].subCategory[1].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Cosmetics") {
					o.expCategoryTotals[7].subCategory[2].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Babysitter") {
					o.expCategoryTotals[7].subCategory[3].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Laundry") {
					o.expCategoryTotals[7].subCategory[2].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Spa & Massage") {
					o.expCategoryTotals[7].subCategory[3].total += o.monthlyExpenses[i].amount;
				}
			};
			if (o.monthlyExpenses[i].category === "Play") {
				o.expCategoryTotals[8].total += o.monthlyExpenses[i].amount;	
				if (o.monthlyExpenses[i].subCategory === "Movies") {
					o.expCategoryTotals[8].subCategory[0].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Clubs / Bars") {
					o.expCategoryTotals[8].subCategory[1].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Entertainment") {
					o.expCategoryTotals[8].subCategory[2].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Games") {
					o.expCategoryTotals[8].subCategory[3].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Vacations") {
					o.expCategoryTotals[8].subCategory[4].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Sporting Events") {
					o.expCategoryTotals[8].subCategory[5].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Amusement Park") {
					o.expCategoryTotals[8].subCategory[6].total += o.monthlyExpenses[i].amount;
				}
			};
			if (o.monthlyExpenses[i].category === "Events") {
				o.expCategoryTotals[9].total += o.monthlyExpenses[i].amount;	
				if (o.monthlyExpenses[i].subCategory === "Moving") {
					o.expCategoryTotals[9].subCategory[0].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Wedding") {
					o.expCategoryTotals[9].subCategory[1].total += o.monthlyExpenses[i].amount;
				}
			};
			if (o.monthlyExpenses[i].category === "Transportation") {
				o.expCategoryTotals[10].total += o.monthlyExpenses[i].amount;	
				if (o.monthlyExpenses[i].subCategory === "Fuel") {
					o.expCategoryTotals[10].subCategory[0].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Tires") {
					o.expCategoryTotals[10].subCategory[1].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Oil Changes") {
					o.expCategoryTotals[10].subCategory[2].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Maintenance") {
					o.expCategoryTotals[10].subCategory[3].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Parking Fees") {
					o.expCategoryTotals[10].subCategory[4].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Repairs") {
					o.expCategoryTotals[10].subCategory[5].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "DMV Fees") {
					o.expCategoryTotals[10].subCategory[6].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Vehicle Replacement") {
					o.expCategoryTotals[10].subCategory[7].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Taxi") {
					o.expCategoryTotals[10].subCategory[8].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Public Transportation") {
					o.expCategoryTotals[10].subCategory[9].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Tolls") {
					o.expCategoryTotals[10].subCategory[10].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Auto Payment") {
					o.expCategoryTotals[10].subCategory[11].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Auto Insurance") {
					o.expCategoryTotals[10].subCategory[12].total += o.monthlyExpenses[i].amount;
				}
			};
			if (o.monthlyExpenses[i].category === "Travel") {
				o.expCategoryTotals[11].total += o.monthlyExpenses[i].amount;	
				if (o.monthlyExpenses[i].subCategory === "Air Travel") {
					o.expCategoryTotals[11].subCategory[0].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Hotel") {
					o.expCategoryTotals[11].subCategory[1].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Rental Car & Taxi") {
					o.expCategoryTotals[11].subCategory[2].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Vacations") {
					o.expCategoryTotals[11].subCategory[3].total += o.monthlyExpenses[i].amount;
				}
			};
			if (o.monthlyExpenses[i].category === "Pets") {
				o.expCategoryTotals[12].total += o.monthlyExpenses[i].amount;	
				if (o.monthlyExpenses[i].subCategory === "Pet Food & Supplies") {
					o.expCategoryTotals[12].subCategory[0].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Pet Grooming") {
					o.expCategoryTotals[12].subCategory[1].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Veterinary") {
					o.expCategoryTotals[12].subCategory[2].total += o.monthlyExpenses[i].amount;
				}
			};
			if (o.monthlyExpenses[i].category === "Kids") {
				o.expCategoryTotals[13].total += o.monthlyExpenses[i].amount;	
				if (o.monthlyExpenses[i].subCategory === "Allowance") {
					o.expCategoryTotals[13].subCategory[0].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Baby Supplies") {
					o.expCategoryTotals[13].subCategory[1].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Babysitter & Daycare") {
					o.expCategoryTotals[13].subCategory[2].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Child Support") {
					o.expCategoryTotals[13].subCategory[3].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Kids Activities") {
					o.expCategoryTotals[13].subCategory[4].total += o.monthlyExpenses[i].amount;
				}
				if (o.monthlyExpenses[i].subCategory === "Toys") {
					o.expCategoryTotals[13].subCategory[5].total += o.monthlyExpenses[i].amount;
				}
			};
		};
	}
	return o
}]);