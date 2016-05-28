app.factory('billsFactory', ['$http', 'auth', '$state', function($http, auth, $state){
	var o = {
		bills: [],
		billsCategoryTotals: []
	};
	o.getUser = function(){ // function that gets the user from api
		return $http.get('/get-user', {headers: {Authorization: 'Bearer ' + auth.getToken()}} ).then(function(response){
			angular.copy(response.data.monthlyBills, o.bills) // ang-copy deletes everything the income array above and adds every inside of res.data
			angular.copy(response.data.billsCategoryTotals, o.billsCategoryTotals);
			o.calculateTotal();
		}, function(){
			$state.go('register');
		});
	};

	o.totalBills = 0;

	o.calculateTotal = function(){
		var total = 0;	
		for (i = 0; i < o.bills.length; i++) {
			total += Math.floor(o.bills[i].amount);
		};
		return o.totalBills = total;
	};
	o.postBill = function(category, subCategory, amount){ // function that sends bill information to api
		return $http.post('/add-bill', { 'category': category,  'subCategory': subCategory, 'amount': amount }, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
	};	
	o.updateBillDescription = function(bill){
		return $http.put('/edit-monthly-bill-description', { 'bill': bill }, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
	};
	o.updateBillAmount = function(bill){
		return $http.put('/edit-monthly-bill-amount', { 'bill': bill }, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
	};
	o.calcCategoryTotals = function(){
		o.billsCategoryTotals = [	
		{
			category: "Housing",
			total: 0,
			subCategory: [{
				name: "Rent",
				total: 0
			},
			{
				name: "Mortgage",
				total: 0	
			},
			{
				name: "Vacation home",
				total: 0	
			}]
		},
		{
			category: "Fitness",
			total: 0,
			subCategory: [{
				name: "Gym",
				total: 0
			},
			{
				name: "Yoga",
				total: 0	
			},
			{
				name: "Pilates",
				total: 0		
			},
			{
				name: "Boxing",
				total: 0	
			},
			{
				name: "Martial arts",
				total: 0
			}]
		},
		{
			category: "Transportation",
			total: 0,
			subCategory: [{
				name: "Metro Card",
				total: 0 
			},
			{
				name: "EZ Pass",
				total: 0 
			},
			{
				name: "Gas",
				total: 0
			},
			{
				name: "Parking",
				total: 0
			}]
		},
		{
			category: "Utilities",
			total: 0,
			subCategory: [{
				name: "Electric",
				total: 0 
			},
			{
				name: "Water",
				total: 0 
			},
			{
				name: "Garbage",
				total: 0
			},
			{
				name: "Home/Cell phone",
				total: 0
			},
			{
				name: "Internet",
				total: 0	
			}]
		},
		{
			category: "Insurance",
			total: 0,
			subCategory: [{
				name: "Car insurance",
				total: 0 
			},
			{
				name: "Homeowner's insurance",
				total: 0 
			},
			{
				name: "Renter's insurance",
				total: 0
			}]
		},
		{ 
			category: "Debt",
			total: 0,
			subCategory: [{
				name: "Credit card",
				total: 0 
			},
			{
				name: "Student loan",
				total: 0 
			},
			{
				name: "Personal loan",
				total: 0
			},
			{
				name: "Car loan",
				total: 0
			}]
		},
		{
			category: "Taxes",
			total: 0,
			subCategory: [{
				name: "Personal",
				total: 0 
			},
			{
				name: "Business",
				total: 0 
			},
			{
				name: "House",
				total: 0
			}]
		},
		{
			category: "Entertainment",
			total: 0,
			subCategory: [{
				name: "Streaming movies/music",
				total: 0 
			}]
		}];

		for (i = 0; i < o.bills.length; i++){
			if (o.bills[i].category === "Housing") {
				o.billsCategoryTotals[0].total += o.bills[i].amount;	
				if (o.bills[i].subCategory === "Rent") {
					o.billsCategoryTotals[0].subCategory[0].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Mortgage") {
					o.billsCategoryTotals[0].subCategory[1].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Vacation home") {
					o.billsCategoryTotals[0].subCategory[2].total += o.bills[i].amount;
				}
			};
			if (o.bills[i].category === "Fitness") {
				o.billsCategoryTotals[1].total += o.bills[i].amount;	
				if (o.bills[i].subCategory === "Gym") {
					o.billsCategoryTotals[1].subCategory[0].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Yoga") {
					o.billsCategoryTotals[1].subCategory[1].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Pilates") {
					o.billsCategoryTotals[1].subCategory[2].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Boxing") {
					o.billsCategoryTotals[1].subCategory[3].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Martial arts") {
					o.billsCategoryTotals[1].subCategory[4].total += o.bills[i].amount;
				}
			};
			if (o.bills[i].category === "Transportation") {
				o.billsCategoryTotals[2].total += o.bills[i].amount;	
				if (o.bills[i].subCategory === "Metro Card") {
					o.billsCategoryTotals[2].subCategory[0].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "EZ Pass") {
					o.billsCategoryTotals[2].subCategory[1].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Gas") {
					o.billsCategoryTotals[2].subCategory[2].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Parking") {
					o.billsCategoryTotals[2].subCategory[3].total += o.bills[i].amount;
				}
			};
			if (o.bills[i].category === "Utilities") {
				o.billsCategoryTotals[3].total += o.bills[i].amount;	
				if (o.bills[i].subCategory === "Electric") {
					o.billsCategoryTotals[3].subCategory[0].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Water") {
					o.billsCategoryTotals[3].subCategory[1].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Garbage") {
					o.billsCategoryTotals[3].subCategory[2].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Home/Cell phone") {
					o.billsCategoryTotals[3].subCategory[3].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Internet") {
					o.billsCategoryTotals[3].subCategory[4].total += o.bills[i].amount;
				}
			};
			if (o.bills[i].category === "Insurance") {
				o.billsCategoryTotals[4].total += o.bills[i].amount;	
				if (o.bills[i].subCategory === "Car insurance") {
					o.billsCategoryTotals[4].subCategory[0].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Homeowner's insurance") {
					o.billsCategoryTotals[4].subCategory[1].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Renter's insurance") {
					o.billsCategoryTotals[4].subCategory[2].total += o.bills[i].amount;
				}
			};
			if (o.bills[i].category === "Debt") {
				o.billsCategoryTotals[5].total += o.bills[i].amount;	
				if (o.bills[i].subCategory === "Credit card") {
					o.billsCategoryTotals[5].subCategory[0].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Student loan") {
					o.billsCategoryTotals[5].subCategory[1].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Personal loan") {
					o.billsCategoryTotals[5].subCategory[2].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Car loan") {
					o.billsCategoryTotals[5].subCategory[3].total += o.bills[i].amount;
				}
			};
			if (o.bills[i].category === "Taxes") {
				o.billsCategoryTotals[6].total += o.bills[i].amount;	
				if (o.bills[i].subCategory === "Personal") {
					o.billsCategoryTotals[6].subCategory[0].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Business") {
					o.billsCategoryTotals[6].subCategory[1].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "House") {
					o.billsCategoryTotals[6].subCategory[2].total += o.bills[i].amount;
				}
			};
			if (o.bills[i].category === "Entertainment") {
				o.billsCategoryTotals[7].total += o.bills[i].amount;	
				if (o.bills[i].subCategory === "Streaming movies/music") {
					o.billsCategoryTotals[7].subCategory[0].total += o.bills[i].amount;
				}
			};
		};
	};
	return o
}]);