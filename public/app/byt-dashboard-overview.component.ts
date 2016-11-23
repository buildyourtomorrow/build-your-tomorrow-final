import {Component, OnInit, ViewChild} from '@angular/core';

import {GetBYTUser} from './byt-dashboard-overview.service';
import {BYTDashboardExpenseAnalysisComponent} from './byt-dashboard-expense-analysis.component';
import {BYTDashboardDailyBudgetComponent} from './byt-dashboard-daily-budget.component';
import {BYTPostProjections} from './byt-dashboard-overview.service';
import {BYTBodyNavComponent} from './byt-body-nav.component';

@Component({
    selector: 'byt-dashboard-overview',
    templateUrl: '/app/byt-dashboard-overview.component.html',
    styleUrls: ['app/byt-dashboard-overview.component.css']
})
export class BYTDashboardOverviewComponent implements OnInit {
	projectedIncome: number;
	projectedBills: number;
	projectedExpenses: number;
	totalIncome: number;
	totalBills: number;
	totalSpent: number;
	totalSavings: number;
	bytIncomeProjection: boolean;
	bytBillProjection: boolean;
	bytExpProjection: boolean;
	savingMoneyBaby: string;
	byt_show_section: boolean;

	@ViewChild(BYTDashboardExpenseAnalysisComponent) expenseAnalysis: BYTDashboardExpenseAnalysisComponent;
	@ViewChild(BYTDashboardDailyBudgetComponent) dailyBudget: BYTDashboardDailyBudgetComponent;
	@ViewChild(BYTBodyNavComponent) bytNav: BYTBodyNavComponent;

	constructor (private _getBYTUser: GetBYTUser, private _bytPostProjections: BYTPostProjections) {}

	ngOnInit(){
		this._getBYTUser.getUser().subscribe(user => {
			this.projectedIncome = user.projectedIncome;
			this.projectedBills = user.projectedBills;
			this.projectedExpenses = user.projectedExpenses;
			this.totalIncome = user.totalIncome;
			this.totalBills = user.billsTotal;
			this.totalSpent = user.totalSpent;					
		})
		if (this.totalIncome - this.totalBills - this.totalSpent > 0) {
			this.savingMoneyBaby = "Keep saving that money homie.";
		} else if (this.totalIncome - this.totalBills - this.totalSpent === 0) {
			this.savingMoneyBaby = "Baby boo, stop being lazy and add your income, bills, and expenses.";
		} else {
			this.savingMoneyBaby = "Yo, stop spending so much money";
		}
		let delay = 8000;
		setInterval(() => this.byt_show_section = true, delay);
    };

    editIncomeProjection(projectedIncome){
    	this.bytIncomeProjection = !this.bytIncomeProjection;
    	this._bytPostProjections.bytPostIncomeProjection(projectedIncome).subscribe(user => {
    		this.projectedIncome = user.projectedIncome;
    	})
    };

    editBillProjection(projectedBills){
    	this.bytBillProjection = !this.bytBillProjection;
    	this._bytPostProjections.bytPostBillProjection(projectedBills).subscribe(user => {
    		this.projectedBills = user.projectedBills;
    	})
    };

    editExpProjection(projectedExpenses){
    	this.bytExpProjection = !this.bytExpProjection;
    	this.expenseAnalysis.calcUpBy(); //child function
    	this.dailyBudget.calcDailyBudget(); //child function
    	this._bytPostProjections.bytPostExpensesProjection(projectedExpenses).subscribe(user => {
    		this.projectedExpenses = user.projectedExpenses;
    	})
    };
}