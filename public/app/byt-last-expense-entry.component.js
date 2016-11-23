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
var BYTLastExpenseEntryComponent = (function () {
    function BYTLastExpenseEntryComponent(_getBYTUser) {
        this._getBYTUser = _getBYTUser;
    }
    BYTLastExpenseEntryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._getBYTUser.getUser().subscribe(function (user) {
            _this.monthlyExpenses = user.monthlyExpenses;
            _this.monthlyExpensesLength = _this.monthlyExpenses.length;
            if (_this.monthlyExpensesLength > 0) {
                _this.lastTransactionDate = _this.monthlyExpenses[0].date;
            }
        });
    };
    BYTLastExpenseEntryComponent.prototype.lastTransactionDateFunction = function (expense) {
        this.monthlyExpenses.unshift(expense);
        this.monthlyExpensesLength = this.monthlyExpenses.length;
        this.lastTransactionDate = this.monthlyExpenses[0].date;
    };
    BYTLastExpenseEntryComponent.prototype.updateViewFunction = function (monthlyExpenses) {
        this.monthlyExpensesLength = monthlyExpenses.length;
        if (this.monthlyExpensesLength > 0) {
            this.lastTransactionDate = monthlyExpenses[0].date;
        }
        else {
            this.lastTransactionDate = new Date;
        }
    };
    BYTLastExpenseEntryComponent = __decorate([
        core_1.Component({
            selector: 'byt-last-expense-entry',
            templateUrl: '/app/byt-last-expense-entry.component.html',
            styleUrls: ['app/byt-last-expense-entry.component.css']
        }), 
        __metadata('design:paramtypes', [byt_dashboard_overview_service_1.GetBYTUser])
    ], BYTLastExpenseEntryComponent);
    return BYTLastExpenseEntryComponent;
}());
exports.BYTLastExpenseEntryComponent = BYTLastExpenseEntryComponent;
//# sourceMappingURL=byt-last-expense-entry.component.js.map