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
var BYTDashboardDailyBudgetComponent = (function () {
    function BYTDashboardDailyBudgetComponent(_getBYTUser) {
        this._getBYTUser = _getBYTUser;
        this.today = new Date;
    }
    BYTDashboardDailyBudgetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._getBYTUser.getUser().subscribe(function (user) {
            _this.daysLeft = user.daysLeft;
            _this.projectedExpenses = user.projectedExpenses;
            _this.calcPeriodStart();
            _this.calcPeriodEnd();
            _this.calcDailyBudget();
        });
        var delay = 8000;
        setInterval(function () { return _this.byt_show_section = true; }, delay);
    };
    BYTDashboardDailyBudgetComponent.prototype.calcPeriodStart = function () {
        var year = this.today.getFullYear();
        var month = this.today.getMonth();
        this.periodStart = new Date(year, month, 1);
    };
    BYTDashboardDailyBudgetComponent.prototype.calcPeriodEnd = function () {
        var year = this.today.getFullYear();
        var month = this.today.getMonth() + 1;
        this.periodEnd = new Date(year, month, 0);
    };
    BYTDashboardDailyBudgetComponent.prototype.calcDailyBudget = function () {
        this.dailyBudget = this.projectedExpenses / this.periodEnd.getDate();
    };
    BYTDashboardDailyBudgetComponent = __decorate([
        core_1.Component({
            selector: 'byt-dashboard-daily-budget',
            templateUrl: '/app/byt-dashboard-daily-budget.component.html',
            styleUrls: ['app/byt-dashboard-daily-budget.component.css'],
            inputs: ['projectedExpenses']
        }), 
        __metadata('design:paramtypes', [byt_dashboard_overview_service_1.GetBYTUser])
    ], BYTDashboardDailyBudgetComponent);
    return BYTDashboardDailyBudgetComponent;
}());
exports.BYTDashboardDailyBudgetComponent = BYTDashboardDailyBudgetComponent;
//# sourceMappingURL=byt-dashboard-daily-budget.component.js.map