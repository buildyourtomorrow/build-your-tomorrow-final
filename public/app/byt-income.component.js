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
var byt_dashboard_overview_service_1 = require('./byt-dashboard-overview.service');
var byt_dashboard_overview_service_2 = require('./byt-dashboard-overview.service');
var byt_last_income_entry_component_1 = require('./byt-last-income-entry.component');
var BYTIncomeComponent = (function () {
    function BYTIncomeComponent(_getBYTUser, _BYTRemoveTransaction) {
        this._getBYTUser = _getBYTUser;
        this._BYTRemoveTransaction = _BYTRemoveTransaction;
        this.byt_active = true;
    }
    BYTIncomeComponent.prototype.ngOnInit = function () {
        this.getAllIncome();
    };
    ;
    BYTIncomeComponent.prototype.getAllIncome = function () {
        var _this = this;
        this._getBYTUser.getUser().subscribe(function (user) {
            _this.allIncome = user.income;
            _this.allIncomeLength = user.income.length;
        });
    };
    BYTIncomeComponent.prototype.childIncomeForm = function ($event) {
        this.allIncome.unshift($event);
        this.allIncomeLength = this.allIncome.length;
        this._lastIncomeEntry.lastTransactionDateFunction($event);
        this.calcIncomeCategoryTotals();
    };
    BYTIncomeComponent.prototype.removeIncome = function (index) {
        this.allIncome.splice(index, 1);
        this.calcIncomeCategoryTotals();
        this._BYTRemoveTransaction.bytRemoveIncome(index).subscribe(function (user) { });
        this.allIncomeLength = this.allIncome.length;
        this._lastIncomeEntry.updateViewFunction(this.allIncome);
        if (this.allIncomeLength === 0) {
            this.byt_active = true;
        }
    };
    ;
    BYTIncomeComponent.prototype.calcIncomeCategoryTotals = function () {
        this.incomeCategoryTotals = [
            { category: "Wages", total: 0 },
            { category: "Rental Property", total: 0 },
            { category: "Limited Partnerships", total: 0 },
            { category: "Market Investments", total: 0 },
            { category: "Sole Proprietorship", total: 0 },
            { category: "Corporation", total: 0 },
            { category: "Child Support", total: 0 },
            { category: "Taxes", total: 0 }
        ];
        for (var i = 0; i < this.allIncome.length; i++) {
            if (this.allIncome[i].category === "Wages") {
                this.incomeCategoryTotals[0].total += this.allIncome[i].amount;
            }
            ;
            if (this.allIncome[i].category === "Rental Property") {
                this.incomeCategoryTotals[1].total += this.allIncome[i].amount;
            }
            ;
            if (this.allIncome[i].category === "Limited Partnerships") {
                this.incomeCategoryTotals[2].total += this.allIncome[i].amount;
            }
            ;
            if (this.allIncome[i].category === "Market Investments") {
                this.incomeCategoryTotals[3].total += this.allIncome[i].amount;
            }
            ;
            if (this.allIncome[i].category === "Sole Proprietorship") {
                this.incomeCategoryTotals[4].total += this.allIncome[i].amount;
            }
            ;
            if (this.allIncome[i].category === "Corporation") {
                this.incomeCategoryTotals[5].total += this.allIncome[i].amount;
            }
            ;
            if (this.allIncome[i].category === "Child Support") {
                this.incomeCategoryTotals[6].total += this.allIncome[i].amount;
            }
            ;
            if (this.allIncome[i].category === "Taxes") {
                this.incomeCategoryTotals[7].total += this.allIncome[i].amount;
            }
            ;
        }
        ;
    };
    __decorate([
        core_1.ViewChild(byt_last_income_entry_component_1.BYTLastIncomeEntryComponent), 
        __metadata('design:type', byt_last_income_entry_component_1.BYTLastIncomeEntryComponent)
    ], BYTIncomeComponent.prototype, "_lastIncomeEntry", void 0);
    BYTIncomeComponent = __decorate([
        core_1.Component({
            selector: 'byt-income',
            templateUrl: '/app/byt-income.component.html',
            styleUrls: ['app/byt-income.component.css']
        }), 
        __metadata('design:paramtypes', [byt_dashboard_overview_service_1.GetBYTUser, byt_dashboard_overview_service_2.BYTRemoveTransaction])
    ], BYTIncomeComponent);
    return BYTIncomeComponent;
}());
exports.BYTIncomeComponent = BYTIncomeComponent;
//# sourceMappingURL=byt-income.component.js.map