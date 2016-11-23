import {Component, OnInit, EventEmitter } from '@angular/core';

import {BYTBillFormModel} from './byt-bill-form-model.component';
import {BYTPostBill} from "./byt-dashboard-overview.service";

@Component({
	selector: 'byt-bills-form',
	templateUrl: '/app/byt-bills-form.component.html',
	styleUrls: ['app/byt-bills-form.component.css'],
	outputs: ['billsForm']
})
export class BYTBillsFormComponent {

    constructor(private _bytPostBill: BYTPostBill){}

	billsForm = new EventEmitter<Object>();
	submitted: boolean = false;
	model = new BYTBillFormModel(1, new Date, '', '', '');
	categories: string[] = [ "Housing", "Health", "Transportation", "Utilities", "Insurance", "Debt", "Taxes", 
							 "Entertainment", "ChildCare" ]
	subCategories: Object = 
	{
		Housing:[
            { name: "Rent"},
            { name: "Mortgage"},
            { name: "Vacation home"}
        ],
        Health:[
            { name: "Gym"},
            { name: "Yoga"},
            { name: "Pilates"},
            { name: "Boxing"},
            { name: "Martial arts"},
            { name: "Health Insurance"},
            { name: "Pharmacy"},
            { name: "Eyecare"},
            { name: "Doctor"},
            { name: "Dentist"}
        ],
        Transportation:[
            { name: "Metro Card"},
            { name: "EZ Pass"},
            { name: "Gas"},
            { name: "Parking"}
        ],
        Utilities:[
            { name: "Electric"},
            { name: "Water"},
            { name: "Garbage"},
            { name: "Home/Cell phone"},
            { name: "Internet"}
        ],
        Insurance:[
            { name: "Car insurance"},
            { name: "Homeowner's insurance"},
            { name: "Renter's insurance"}
        ],
        Debt :[
            { name: "Credit card"},
            { name: "Student loan"},
            { name: "Personal loan"},
            { name: "Car loan"}
		],
		Taxes :[
            { name: "Personal"},
            { name: "Business"},
            { name: "House"}
		],
		Entertainment: [
			{ name: "Streaming movies/music"}
		],
		ChildCare: [
			{ name: "Babysitter"},
			{ name: "Daycare"},
			{ name: "After School Programs"},
			{ name: "Youth Leagues"},
			{ name: "Medical"},
			{ name: "Nutrition"}
		]
	}

	submitBill(){
		this.submitted = true;
	}

	submitBillFinal(){
		this.submitted = false;
		this.billsForm.emit(this.model);
        this._bytPostBill.bytPostBillForm(this.model).subscribe(user => {})
		this.model = new BYTBillFormModel(1, new Date, '', '');
	}

}