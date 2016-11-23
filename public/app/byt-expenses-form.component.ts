import {Component, OnInit, EventEmitter } from '@angular/core';

import {BYTExpenseFormModel} from './byt-expense-form-model.component';
import {BYTPostExpense} from "./byt-dashboard-overview.service";

@Component({
	selector: 'byt-expenses-form',
	templateUrl: '/app/byt-expenses-form.component.html',
	styleUrls: ['app/byt-expenses-form.component.css'],
	outputs: ['expensesForm']
})
export class BYTExpensesFormComponent {

    constructor(private _bytPostExpense: BYTPostExpense){}

	expensesForm = new EventEmitter<Object>();
	submitted: boolean = false;
	model = new BYTExpenseFormModel(1, new Date, '', '', '');
	categories: string[] = [ "Clothing", "Education", "Food", "Gift", "Giving", "Household", "Medical", 
							 "Personal", "Play", "Events", "Transportation", "Travel", "Pets", "Kids" ]
	subCategories: Object = 
	{
		Clothing:[
            { name: "Children's Clothing"},
            { name: "Adult's Clothing"}
        ],
        Education:[
            { name: "Tuition"},
            { name: "Books"},
            { name: "School Supplies"},
            { name: "Field Trips"},
            { name: "Student Loan Payment"},
            { name: "Magazines"}
        ],
        Food:[
            { name: "Groceries"},
            { name: "Restaurant"},
            { name: "Pet Food"},
            { name: "Junk Food"},
            { name: "Coffee"}
        ],
        Gift:[
            { name: "Birthday"},
            { name: "Valentine's Day"},
            { name: "Anniversary"},
            { name: "Wedding"},
            { name: "Christmas"},
            { name: "Special Occasion"}
        ],
        Giving:[
            { name: "Tithing"},
            { name: "Offerings"},
            { name: "Charities"}
        ],
        Household :[
            { name: "Toiletries"},
            { name: "Laundry Detergent"},
            { name: "Dishwasher Detergent"},
            { name: "Cleaning Supplies"},
            { name: "Tools"},
            { name: "Furniture"},
            { name: "Decorating"},
            { name: "Home Improvement"},
            { name: "Home Repair"}
		],
		Medical :[
            { name: "Primary Care"},
            { name: "Dental Care"},
            { name: "Specialty Care"},
            { name: "Medications"},
            { name: "Medical Devices"}
		],
		Personal: [
			{ name: "Hair & Hair Cuts"},
            { name: "Salon Services"},
            { name: "Cosmetics"},
            { name: "Babysitter"},
            { name: "Laundry"},
            { name: "Spa & Massage"},
		],
		Play: [
			{ name: "Movies"},
			{ name: "Clubs / Bars"},
			{ name: "Entertainment"},
			{ name: "Games"},
			{ name: "Vacations"},
			{ name: "Sporting Events"},
            { name: "Amusement Park"}
		],
        Events: [
            { name: "Moving"},
            { name: "Wedding"}
        ],
        Transportation: [
            { name: "Fuel"},
            { name: "Tires"},
            { name: "Oil Changes"},
            { name: "Maintenance"},
            { name: "Parking Fees"},
            { name: "Repairs"},
            { name: "DMV Fees"},
            { name: "Vehicle Replacement"},
            { name: "Taxi"},
            { name: "Public Transportation"},
            { name: "Tolls"},
            { name: "Auto Payment"},
            { name: "Auto Insurance"}
        ],
        Travel: [
            { name: "Air Travel"},
            { name: "Hotel"},
            { name: "Rental Car & Taxi"},
            { name: "Vacations"}
        ],
        Pets: [
            { name: "Pet Food & Supplies"},
            { name: "Pet Grooming"},
            { name: "Veterinary"}
        ],
        Kids: [
            { name: "Allowance"},
            { name: "Baby Supplies"},
            { name: "Babysitter & Daycare"},
            { name: "Child Support"},
            { name: "Kids Activities"},
            { name: "Toys"}
        ],
	}

	submitExpense(){
		this.submitted = true;
	}

	submitExpenseFinal(){
		this.submitted = false;
		this.expensesForm.emit(this.model);
        this._bytPostExpense.bytPostExpenseForm(this.model).subscribe(user => {})
		this.model = new BYTExpenseFormModel(1, new Date, '', '');

	}

}