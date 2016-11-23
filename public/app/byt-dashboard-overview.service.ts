import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {User} from './user';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GetBYTUser {
	// Set userProfile attribute of already saved profile
	constructor (public authHttp: AuthHttp) {}
    userProfile: Object = JSON.parse(localStorage.getItem('profile'));
	getUser(): Observable<User[]>{
		let myHeader = new Headers();;
		myHeader.append('byt_email', this.userProfile.email);
		return this.authHttp.get('/get-user', {headers: myHeader }).map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}

@Injectable()
export class BYTPostProjections {
	constructor(public authHttp: AuthHttp) {}
	userProfile: Object = JSON.parse(localStorage.getItem('profile'));
	bytPostIncomeProjection(bytIncomeProjection: number): Observable<User[]>{
		return this.authHttp.post('/add-income-projection', {"bytIncomeProjection": bytIncomeProjection, "byt_email": this.userProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytPostBillProjection(bytBillProjection: number): Observable<User[]>{
		return this.authHttp.post('/add-bills-projection', {"bytBillProjection": bytBillProjection, "byt_email": this.userProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytPostExpensesProjection(bytExpensesProjection: number): Observable<User[]>{
		return this.authHttp.post('/add-expenses-projection', {"bytExpensesProjection": bytExpensesProjection, "byt_email": this.userProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}

@Injectable()
export class BYTPostIncome {
	constructor(public authHttp: AuthHttp) {}
	userProfile: Object = JSON.parse(localStorage.getItem('profile'));
	bytPostIncomeForm(bytPostIncomeForm: Object): Observable<any[]>{
		return this.authHttp.post('/add-income', {"category": bytPostIncomeForm.category, 
												  "date": bytPostIncomeForm.date,
												  "amount": bytPostIncomeForm.amount,
												  "byt_email": this.userProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}
@Injectable()
export class BYTPostBill {
	constructor(public authHttp: AuthHttp) {}
	userProfile: Object = JSON.parse(localStorage.getItem('profile'));
	bytPostBillForm(bytPostBillForm: Object): Observable<any[]>{
		return this.authHttp.post('/add-bill', {"category": bytPostBillForm.category,
												"subCategory": bytPostBillForm.subCategory,
												"date": bytPostBillForm.date,
												"amount": bytPostBillForm.amount,
												"byt_email": this.userProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}
@Injectable()
export class BYTPostExpense {
	constructor(public authHttp: AuthHttp) {}
	userProfile: Object = JSON.parse(localStorage.getItem('profile'));
	bytPostExpenseForm(bytPostExpenseForm: Object): Observable<any[]>{
		return this.authHttp.post('/add-monthly-expense', {"category": bytPostExpenseForm.category,
														   "subCategory": bytPostExpenseForm.subCategory,
												   		   "date": bytPostExpenseForm.date,
												 		   "amount": bytPostExpenseForm.amount,
														   "byt_email": this.userProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}

@Injectable()
export class BYTRemoveTransaction {
	constructor(public authHttp: AuthHttp) {}
	userProfile: Object = JSON.parse(localStorage.getItem('profile'));
	bytRemoveIncome(index: number): Observable<any[]>{
		return this.authHttp.put('/remove-income', {"index": index,
													"byt_email": this.userProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytRemoveBill(index: number): Observable<any[]>{
		return this.authHttp.put('/remove-bill', {"index": index,
												  "byt_email": this.userProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
	bytRemoveExpense(index: number): Observable<any[]>{
		return this.authHttp.put('/remove-expense', {"index": index,
												  	 "byt_email": this.userProfile.email})
			.map((res: Response) => res.json() )
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'))
	}
}