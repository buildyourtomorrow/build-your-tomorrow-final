import {Component, OnInit } from '@angular/core';

import {GetBYTUser} from './byt-dashboard-overview.service';
 
@Component({
	selector: 'byt-last-expense-entry',
	templateUrl: '/app/byt-last-expense-entry.component.html',
	styleUrls: ['app/byt-last-expense-entry.component.css']
})
export class BYTLastExpenseEntryComponent implements OnInit {
	lastTransactionDate: Date;
	monthlyExpenses: Array<Object>;
	monthlyExpensesLength: number;

	constructor (private _getBYTUser: GetBYTUser) {}

	ngOnInit(){
		this._getBYTUser.getUser().subscribe(user => {
			this.monthlyExpenses = user.monthlyExpenses;
			this.monthlyExpensesLength = this.monthlyExpenses.length;
			if(this.monthlyExpensesLength > 0){
				this.lastTransactionDate = this.monthlyExpenses[0].date;
			}			
		});
	}

	lastTransactionDateFunction(expense){
		this.monthlyExpenses.unshift(expense)
		this.monthlyExpensesLength = this.monthlyExpenses.length;
		this.lastTransactionDate = this.monthlyExpenses[0].date;
	}

	updateViewFunction(monthlyExpenses){
		this.monthlyExpensesLength = monthlyExpenses.length;
		if(this.monthlyExpensesLength > 0){
			this.lastTransactionDate = monthlyExpenses[0].date;	
		}else{
			this.lastTransactionDate = new Date;
		}				
	}

}