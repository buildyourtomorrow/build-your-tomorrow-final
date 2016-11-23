import {Component, OnInit} from '@angular/core';

import {GetBYTUser} from './byt-dashboard-overview.service';

@Component({
    selector: 'byt-dashboard-expense-analysis',
    templateUrl: '/app/byt-dashboard-expense-analysis.component.html',
    styleUrls: ['app/byt-dashboard-expense-analysis.component.css'],
    inputs: ['projectedExpenses']
})
export class BYTDashboardExpenseAnalysisComponent implements OnInit {
	projectedExpenses: number;
	totalSpent: number;
	leftOver: number;
	upBy: number;
	today: Date = new Date;
	periodStart: Date;
	periodEnd: Date;
	dailyBudget: number;
	specialVarUpBy: string;
	specialVarUpByWord: string;
	upByComment: string;
	byt_show_section: boolean;
	bytServerResponse: boolean;

	constructor (private _getBYTUser: GetBYTUser) {}

	ngOnInit(){
		this._getBYTUser.getUser().subscribe(user => {
			this.projectedExpenses = user.projectedExpenses;
			this.totalSpent = user.totalSpent;
			this.leftOver = user.leftOver;
			this.upBy = user.upBy;
			this.calcPeriodStart();
			this.calcPeriodEnd();
			this.calcDailyBudget();
			this.calcText();
			this.bytServerResponse = false;
		})
		let delay = 8000;
		setInterval(() => this.byt_show_section = true, delay);
	}

	calcPeriodStart(){
		let year = this.today.getFullYear();
		let month = this.today.getMonth();
		this.periodStart = new Date(year, month, 1);
	}
	calcPeriodEnd(){
		let year = this.today.getFullYear();
		let month = this.today.getMonth() + 1;
		this.periodEnd = new Date(year, month, 0);
	}
	calcDailyBudget(){
		this.dailyBudget = this.projectedExpenses / this.periodEnd.getDate();
	}
	calcUpBy(){
		this.calcDailyBudget()
		this.upBy = (this.dailyBudget * this.today.getDate()) - this.totalSpent;
		this.calcText();
	}
	calcText(){
		if (this.upBy > 0) {
			this.specialVarUpBy = '#00FF00';
			this.specialVarUpByWord = 'Up by';
			this.upByComment = "Ayo, we can spend " + Math.floor(this.upBy) + " without going over budget.";
		} 
		if (this.upBy === 0) {
			this.specialVarUpByWord = 'Up by';
			this.upByComment = "Add a spending limit wangsta";
			this.specialVarUpBy = '#666666';
		} 
		if (this.upBy < 0) {
			this.specialVarUpBy = '#FE7878';
			this.specialVarUpByWord = 'Down by';
			this.upByComment = "OMG, we're behind budget by " + Math.floor(this.upBy) + " Let's get it together people";
		}
	}
}