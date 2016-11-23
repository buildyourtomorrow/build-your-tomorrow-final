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
var byt_bill_form_model_component_1 = require('./byt-bill-form-model.component');
var byt_dashboard_overview_service_1 = require("./byt-dashboard-overview.service");
var BYTBillsFormComponent = (function () {
    function BYTBillsFormComponent(_bytPostBill) {
        this._bytPostBill = _bytPostBill;
        this.billsForm = new core_1.EventEmitter();
        this.submitted = false;
        this.model = new byt_bill_form_model_component_1.BYTBillFormModel(1, new Date, '', '', '');
        this.categories = ["Housing", "Health", "Transportation", "Utilities", "Insurance", "Debt", "Taxes",
            "Entertainment", "ChildCare"];
        this.subCategories = {
            Housing: [
                { name: "Rent" },
                { name: "Mortgage" },
                { name: "Vacation home" }
            ],
            Health: [
                { name: "Gym" },
                { name: "Yoga" },
                { name: "Pilates" },
                { name: "Boxing" },
                { name: "Martial arts" },
                { name: "Health Insurance" },
                { name: "Pharmacy" },
                { name: "Eyecare" },
                { name: "Doctor" },
                { name: "Dentist" }
            ],
            Transportation: [
                { name: "Metro Card" },
                { name: "EZ Pass" },
                { name: "Gas" },
                { name: "Parking" }
            ],
            Utilities: [
                { name: "Electric" },
                { name: "Water" },
                { name: "Garbage" },
                { name: "Home/Cell phone" },
                { name: "Internet" }
            ],
            Insurance: [
                { name: "Car insurance" },
                { name: "Homeowner's insurance" },
                { name: "Renter's insurance" }
            ],
            Debt: [
                { name: "Credit card" },
                { name: "Student loan" },
                { name: "Personal loan" },
                { name: "Car loan" }
            ],
            Taxes: [
                { name: "Personal" },
                { name: "Business" },
                { name: "House" }
            ],
            Entertainment: [
                { name: "Streaming movies/music" }
            ],
            ChildCare: [
                { name: "Babysitter" },
                { name: "Daycare" },
                { name: "After School Programs" },
                { name: "Youth Leagues" },
                { name: "Medical" },
                { name: "Nutrition" }
            ]
        };
    }
    BYTBillsFormComponent.prototype.submitBill = function () {
        this.submitted = true;
    };
    BYTBillsFormComponent.prototype.submitBillFinal = function () {
        this.submitted = false;
        this.billsForm.emit(this.model);
        this._bytPostBill.bytPostBillForm(this.model).subscribe(function (user) { });
        this.model = new byt_bill_form_model_component_1.BYTBillFormModel(1, new Date, '', '');
    };
    BYTBillsFormComponent = __decorate([
        core_1.Component({
            selector: 'byt-bills-form',
            templateUrl: '/app/byt-bills-form.component.html',
            styleUrls: ['app/byt-bills-form.component.css'],
            outputs: ['billsForm']
        }), 
        __metadata('design:paramtypes', [byt_dashboard_overview_service_1.BYTPostBill])
    ], BYTBillsFormComponent);
    return BYTBillsFormComponent;
}());
exports.BYTBillsFormComponent = BYTBillsFormComponent;
//# sourceMappingURL=byt-bills-form.component.js.map