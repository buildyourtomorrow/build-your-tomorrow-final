<<<<<<< HEAD
app.factory('billsFactory', ['$http', '$state', function($http, $state){
	var o = {
		bills: [],
		billsCategoryTotals: [],
		nickName: []
	};
	o.removeBill = function(index){
		o.bills.splice(index, 1);
		return $http.put('/remove-bill', {'index': index})	
	};
	o.getUser = function(){ // function that gets the user from api
		return $http({
			url: '/get-user',
			method: 'GET'
		}).then(function(response){
			angular.copy(response.data.monthlyBills, o.bills) // ang-copy deletes everything the income array above and adds every inside of res.data
			angular.copy(response.data.billsCategoryTotals, o.billsCategoryTotals);
			o.calculateTotal();
			o.nickName = [];
			o.nickName.push(response.data.nickName)
		}, function(){
			$state.go('login');
=======
app.factory('billsFactory', ['$http', 'auth', '$state', function($http, auth, $state){
	var o = {
		bills: [],
		billsCategoryTotals: []
	};
	o.removeBill = function(index){
		o.bills.splice(index, 1);
		return $http.put('/remove-bill', {'index': index}, {headers: {Authorization: 'Bearer ' + auth.getToken()} })	
	};
	o.getUser = function(){ // function that gets the user from api
		return $http.get('/get-user', {headers: {Authorization: 'Bearer ' + auth.getToken()}} ).then(function(response){
			angular.copy(response.data.monthlyBills, o.bills) // ang-copy deletes everything the income array above and adds every inside of res.data
			angular.copy(response.data.billsCategoryTotals, o.billsCategoryTotals);
			o.calculateTotal();
		}, function(){
			$state.go('register');
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
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
	o.postBill = function(category, subCategory, amount, date){ // function that sends bill information to api
<<<<<<< HEAD
		return $http.post('/add-bill', { 'category': category,  'subCategory': subCategory, 'amount': amount, 'date': date} );
=======
		return $http.post('/add-bill', { 'category': category,  'subCategory': subCategory, 'amount': amount, 'date': date}, {headers: {Authorization: 'Bearer ' + auth.getToken()}});
>>>>>>> 28c6f978a4ba08bdae3bd531dac6bebf07cd4f5d
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
			category: "Health",
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
			},
			{
				name: "Health Insurance",
				total: 0
			},
			{
				name: "Pharmacy",
				total: 0
			},
			{
				name: "Eyecare",
				total: 0
			},
			{
				name: "Doctor",
				total: 0
			},
			{
				name: "Dentist",
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
			if (o.bills[i].category === "Health") {
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
				if (o.bills[i].subCategory === "Health Insurance") {
					o.billsCategoryTotals[1].subCategory[5].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Pharmacy") {
					o.billsCategoryTotals[1].subCategory[6].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Eyecare") {
					o.billsCategoryTotals[1].subCategory[7].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Doctor") {
					o.billsCategoryTotals[1].subCategory[8].total += o.bills[i].amount;
				}
				if (o.bills[i].subCategory === "Dentist") {
					o.billsCategoryTotals[1].subCategory[9].total += o.bills[i].amount;
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