import {Component} from '@angular/core';
import {GetBYTUser} from './byt-dashboard-overview.service';

@Component({
    selector: 'byt-body-nav',
    templateUrl: '/app/byt-body-nav.component.html',
    styleUrls: ['app/byt-body-nav.component.css']
})
export class BYTBodyNavComponent {
	byt_dashboard_spinner: boolean;
	byt_income_spinner: boolean;
	byt_bills_spinner: boolean;
	byt_expenses_spinner: boolean;
	byt_edu_spinner: boolean;

	constructor(private _getBYTUser: GetBYTUser){}

	addRemoveDashboardSpinner(){		
		this.byt_dashboard_spinner = !this.byt_dashboard_spinner;
		this._getBYTUser.getUser().subscribe(user => {
			this.byt_dashboard_spinner = !this.byt_dashboard_spinner;			
		});
	}
	addRemoveIncomeSpinner(){
		this.byt_income_spinner = !this.byt_income_spinner;
		this._getBYTUser.getUser().subscribe(user => {
			this.byt_income_spinner = !this.byt_income_spinner;			
		});
	}
	addRemoveBillsSpinner(){
		this.byt_bills_spinner = !this.byt_bills_spinner;
		this._getBYTUser.getUser().subscribe(user => {
			this.byt_bills_spinner = !this.byt_bills_spinner;		
		});
	}
	addRemoveExpensesSpinner(){
		this.byt_expenses_spinner = !this.byt_expenses_spinner;
		this._getBYTUser.getUser().subscribe(user => {
			this.byt_expenses_spinner = !this.byt_expenses_spinner;	
		});
	}
	addRemoveEDUSpinner(){
		this.byt_edu_spinner = !this.byt_edu_spinner;
		this._getBYTUser.getUser().subscribe(user => {
			this.byt_edu_spinner = !this.byt_edu_spinner;
		});
	}
}