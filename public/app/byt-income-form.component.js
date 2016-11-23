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
var byt_income_form_model_1 = require('./byt-income-form-model');
var byt_dashboard_overview_service_1 = require("./byt-dashboard-overview.service");
var BYTIncomeFormComponent = (function () {
    function BYTIncomeFormComponent(_bytPostIncome) {
        this._bytPostIncome = _bytPostIncome;
        this.incomeForm = new core_1.EventEmitter();
        this.submitted = false;
        this.model = new byt_income_form_model_1.BYTIncomeFormModel(1, new Date, '', '');
        this.categories = [
            { name: "Wages" },
            { name: "Rental Property" },
            { name: "Limited Partnerships" },
            { name: "Market Investments" },
            { name: "Sole Proprietorship" },
            { name: "Corporation" },
            { name: "Child Support" },
            { name: "Taxes" }
        ];
    }
    BYTIncomeFormComponent.prototype.submitIncome = function () {
        this.submitted = true;
    };
    BYTIncomeFormComponent.prototype.submitIncomeFinal = function () {
        this.submitted = false;
        this.incomeForm.emit(this.model);
        this._bytPostIncome.bytPostIncomeForm(this.model).subscribe(function (user) { });
        this.model = new byt_income_form_model_1.BYTIncomeFormModel(1, new Date, '', '');
    };
    BYTIncomeFormComponent = __decorate([
        core_1.Component({
            selector: 'byt-income-form',
            templateUrl: '/app/byt-income-form.component.html',
            styleUrls: ['app/byt-income-form.component.css'],
            outputs: ['incomeForm']
        }), 
        __metadata('design:paramtypes', [byt_dashboard_overview_service_1.BYTPostIncome])
    ], BYTIncomeFormComponent);
    return BYTIncomeFormComponent;
}());
exports.BYTIncomeFormComponent = BYTIncomeFormComponent;
//# sourceMappingURL=byt-income-form.component.js.map