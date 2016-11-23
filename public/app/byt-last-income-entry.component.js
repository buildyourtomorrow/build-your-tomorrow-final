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
var BYTLastIncomeEntryComponent = (function () {
    function BYTLastIncomeEntryComponent(_getBYTUser) {
        this._getBYTUser = _getBYTUser;
    }
    BYTLastIncomeEntryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._getBYTUser.getUser().subscribe(function (user) {
            var income = user.income;
            _this.allIncome = income;
            _this.allIncomeLength = income.length;
            if (_this.allIncomeLength > 0) {
                _this.lastTransactionDate = income[0].date;
            }
        });
    };
    BYTLastIncomeEntryComponent.prototype.lastTransactionDateFunction = function (income) {
        this.allIncome.unshift(income);
        this.allIncomeLength = this.allIncome.length;
        this.lastTransactionDate = this.allIncome[0].date;
    };
    BYTLastIncomeEntryComponent.prototype.updateViewFunction = function (allIncome) {
        this.allIncomeLength = allIncome.length;
        if (this.allIncomeLength > 0) {
            this.lastTransactionDate = allIncome[0].date;
        }
        else {
            this.lastTransactionDate = new Date;
        }
    };
    BYTLastIncomeEntryComponent = __decorate([
        core_1.Component({
            selector: 'byt-last-income-entry',
            templateUrl: '/app/byt-last-income-entry.component.html',
            styleUrls: ['app/byt-last-income-entry.component.css']
        }), 
        __metadata('design:paramtypes', [byt_dashboard_overview_service_1.GetBYTUser])
    ], BYTLastIncomeEntryComponent);
    return BYTLastIncomeEntryComponent;
}());
exports.BYTLastIncomeEntryComponent = BYTLastIncomeEntryComponent;
//# sourceMappingURL=byt-last-income-entry.component.js.map