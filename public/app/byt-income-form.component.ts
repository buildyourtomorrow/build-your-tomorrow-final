import {Component, OnInit, EventEmitter } from '@angular/core';

import {GetBYTUser} from './byt-dashboard-overview.service';
import {BYTIncomeFormModel} from './byt-income-form-model';
import {BYTPostIncome} from "./byt-dashboard-overview.service";

@Component({
	selector: 'byt-income-form',
	templateUrl: '/app/byt-income-form.component.html',
	styleUrls: ['app/byt-income-form.component.css'],
	outputs: ['incomeForm']
})
export class BYTIncomeFormComponent {

	constructor(private _bytPostIncome: BYTPostIncome){}

	incomeForm = new EventEmitter<Object>();
	submitted: boolean = false;
	model = new BYTIncomeFormModel(1, new Date, '', '');
	categories: Object[] = [
		{ name: "Wages" },
		{ name: "Rental Property" },
		{ name: "Limited Partnerships" },
		{ name: "Market Investments" },
		{ name: "Sole Proprietorship" },
		{ name: "Corporation" },
		{ name: "Child Support" },
		{ name: "Taxes" }
	];

	submitIncome(){
		this.submitted = true;
	}

	submitIncomeFinal(){
		this.submitted = false;
		this.incomeForm.emit(this.model);
		this._bytPostIncome.bytPostIncomeForm(this.model).subscribe(user => {})
		this.model = new BYTIncomeFormModel(1, new Date, '', '');
	}

}