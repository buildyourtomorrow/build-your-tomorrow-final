"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var byt_expense_form_model_component_1 = require('./byt-expense-form-model.component');
var byt_dashboard_overview_service_1 = require("./byt-dashboard-overview.service");
var BYTExpensesFormComponent = (function () {
    function BYTExpensesFormComponent(_bytPostExpense) {
        this._bytPostExpense = _bytPostExpense;
        this.expensesForm = new core_1.EventEmitter();
        this.submitted = false;
        this.model = new byt_expense_form_model_component_1.BYTExpenseFormModel(1, new Date, '', '', '');
        this.categories = ["Clothing", "Education", "Food", "Gift", "Giving", "Household", "Medical",
            "Personal", "Play", "Events", "Transportation", "Travel", "Pets", "Kids"];
        this.subCategories = {
            Clothing: [
                { name: "Children's Clothing" },
                { name: "Adult's Clothing" }
            ],
            Education: [
                { name: "Tuition" },
                { name: "Books" },
                { name: "School Supplies" },
                { name: "Field Trips" },
                { name: "Student Loan Payment" },
                { name: "Magazines" }
            ],
            Food: [
                { name: "Groceries" },
                { name: "Restaurant" },
                { name: "Pet Food" },
                { name: "Junk Food" },
                { name: "Coffee" }
            ],
            Gift: [
                { name: "Birthday" },
                { name: "Valentine's Day" },
                { name: "Anniversary" },
                { name: "Wedding" },
                { name: "Christmas" },
                { name: "Special Occasion" }
            ],
            Giving: [
                { name: "Tithing" },
                { name: "Offerings" },
                { name: "Charities" }
            ],
            Household: [
                { name: "Toiletries" },
                { name: "Laundry Detergent" },
                { name: "Dishwasher Detergent" },
                { name: "Cleaning Supplies" },
                { name: "Tools" },
                { name: "Furniture" },
                { name: "Decorating" },
                { name: "Home Improvement" },
                { name: "Home Repair" }
            ],
            Medical: [
                { name: "Primary Care" },
                { name: "Dental Care" },
                { name: "Specialty Care" },
                { name: "Medications" },
                { name: "Medical Devices" }
            ],
            Personal: [
                { name: "Hair & Hair Cuts" },
                { name: "Salon Services" },
                { name: "Cosmetics" },
                { name: "Babysitter" },
                { name: "Laundry" },
                { name: "Spa & Massage" },
            ],
            Play: [
                { name: "Movies" },
                { name: "Clubs / Bars" },
                { name: "Entertainment" },
                { name: "Games" },
                { name: "Vacations" },
                { name: "Sporting Events" },
                { name: "Amusement Park" }
            ],
            Events: [
                { name: "Moving" },
                { name: "Wedding" }
            ],
            Transportation: [
                { name: "Fuel" },
                { name: "Tires" },
                { name: "Oil Changes" },
                { name: "Maintenance" },
                { name: "Parking Fees" },
                { name: "Repairs" },
                { name: "DMV Fees" },
                { name: "Vehicle Replacement" },
                { name: "Taxi" },
                { name: "Public Transportation" },
                { name: "Tolls" },
                { name: "Auto Payment" },
                { name: "Auto Insurance" }
            ],
            Travel: [
                { name: "Air Travel" },
                { name: "Hotel" },
                { name: "Rental Car & Taxi" },
                { name: "Vacations" }
            ],
            Pets: [
                { name: "Pet Food & Supplies" },
                { name: "Pet Grooming" },
                { name: "Veterinary" }
            ],
            Kids: [
                { name: "Allowance" },
                { name: "Baby Supplies" },
                { name: "Babysitter & Daycare" },
                { name: "Child Support" },
                { name: "Kids Activities" },
                { name: "Toys" }
            ],
        };
    }
    BYTExpensesFormComponent.prototype.submitExpense = function () {
        this.submitted = true;
    };
    BYTExpensesFormComponent.prototype.submitExpenseFinal = function () {
        this.submitted = false;
        this.expensesForm.emit(this.model);
        this._bytPostExpense.bytPostExpenseForm(this.model).subscribe(function (user) { });
        this.model = new byt_expense_form_model_component_1.BYTExpenseFormModel(1, new Date, '', '');
    };
    BYTExpensesFormComponent = __decorate([
        core_1.Component({
            selector: 'byt-expenses-form',
            templateUrl: '/app/byt-expenses-form.component.html',
            styleUrls: ['app/byt-expenses-form.component.css'],
            outputs: ['expensesForm']
        }), 
        __metadata('design:paramtypes', [byt_dashboard_overview_service_1.BYTPostExpense])
    ], BYTExpensesFormComponent);
    return BYTExpensesFormComponent;
}());
exports.BYTExpensesFormComponent = BYTExpensesFormComponent;
//# sourceMappingURL=byt-expenses-form.component.js.map