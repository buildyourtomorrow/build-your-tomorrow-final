import {Component, OnInit, ViewChild} from '@angular/core';

import {GetBYTUser} from './byt-dashboard-overview.service';
import {BYTRemoveTransaction} from './byt-dashboard-overview.service';
import {BYTLastIncomeEntryComponent} from './byt-last-income-entry.component'

@Component({
	selector: 'byt-income',
	templateUrl: '/app/byt-income.component.html',
	styleUrls: ['app/byt-income.component.css']
})
export class BYTIncomeComponent implements OnInit {
	allIncome: Object[];
	incomeCategoryTotals: Object[];
	byt_active: boolean = true;
	allIncomeLength: number;

	@ViewChild(BYTLastIncomeEntryComponent) _lastIncomeEntry: BYTLastIncomeEntryComponent;

	constructor (private _getBYTUser: GetBYTUser, private _BYTRemoveTransaction: BYTRemoveTransaction) {}

	ngOnInit(){
		this.getAllIncome();
	};

	getAllIncome(){
		this._getBYTUser.getUser().subscribe(user => {
			this.allIncome = user.income;
			this.allIncomeLength = user.income.length; 			
		})
	}

	childIncomeForm($event: Object){		
		this.allIncome.unshift($event)
		this.allIncomeLength = this.allIncome.length;
		this._lastIncomeEntry.lastTransactionDateFunction($event);
		this.calcIncomeCategoryTotals()
	}

	removeIncome(index){
		this.allIncome.splice(index, 1);
		this.calcIncomeCategoryTotals();
		this._BYTRemoveTransaction.bytRemoveIncome(index).subscribe(user => {});
		this.allIncomeLength = this.allIncome.length;
		this._lastIncomeEntry.updateViewFunction(this.allIncome);
		if(this.allIncomeLength === 0){
			this.byt_active = true;
		}
	};

	calcIncomeCategoryTotals(){
		this.incomeCategoryTotals = [
			{category: "Wages", total: 0},
			{category: "Rental Property", total: 0},
			{category: "Limited Partnerships", total: 0},
			{category: "Market Investments", total: 0},
			{category: "Sole Proprietorship", total: 0},
			{category: "Corporation", total: 0},
			{category: "Child Support", total: 0},
			{category: "Taxes", total: 0}
		];

		for (let i = 0; i < this.allIncome.length; i++){
			if (this.allIncome[i].category === "Wages") {
				this.incomeCategoryTotals[0].total += this.allIncome[i].amount;
			};
			if (this.allIncome[i].category === "Rental Property") {
				this.incomeCategoryTotals[1].total += this.allIncome[i].amount;
			};
			if (this.allIncome[i].category === "Limited Partnerships") {
				this.incomeCategoryTotals[2].total += this.allIncome[i].amount;
			};
			if (this.allIncome[i].category === "Market Investments") {
				this.incomeCategoryTotals[3].total += this.allIncome[i].amount;
			};
			if (this.allIncome[i].category === "Sole Proprietorship") {
				this.incomeCategoryTotals[4].total += this.allIncome[i].amount;
			};
			if (this.allIncome[i].category === "Corporation") {
				this.incomeCategoryTotals[5].total += this.allIncome[i].amount;
			};
			if (this.allIncome[i].category === "Child Support") {
				this.incomeCategoryTotals[6].total += this.allIncome[i].amount;
			};
			if (this.allIncome[i].category === "Taxes") {
				this.incomeCategoryTotals[7].total += this.allIncome[i].amount;
			};
		};
	}
}