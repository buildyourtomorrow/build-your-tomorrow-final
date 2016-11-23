import {Component, OnInit } from '@angular/core';

import {GetBYTUser} from './byt-dashboard-overview.service';
 
@Component({
	selector: 'byt-last-bill-entry',
	templateUrl: '/app/byt-last-bill-entry.component.html',
	styleUrls: ['app/byt-last-bill-entry.component.css']
})
export class BYTLastBillEntryComponent implements OnInit {
	lastTransactionDate: Date;
	monthlyBills: Array<Object>;
	monthlyBillsLength: number;

	constructor (private _getBYTUser: GetBYTUser) {}

	ngOnInit(){	
		this._getBYTUser.getUser().subscribe(user => {
			this.monthlyBills = user.monthlyBills;
			this.monthlyBillsLength = this.monthlyBills.length;
			if(this.monthlyBillsLength > 0){
				this.lastTransactionDate = this.monthlyBills[0].date;
			}			
		});
	}

	lastTransactionDateFunction(bill){
		this.monthlyBills.unshift(bill)
		this.monthlyBillsLength = this.monthlyBills.length;
		this.lastTransactionDate = this.monthlyBills[0].date;
	}

	updateViewFunction(monthlyBills){
		this.monthlyBillsLength = monthlyBills.length;
		if(this.monthlyBillsLength > 0){
			this.lastTransactionDate = monthlyBills[0].date;	
		}else{
			this.lastTransactionDate = new Date;
		}				
	}

}