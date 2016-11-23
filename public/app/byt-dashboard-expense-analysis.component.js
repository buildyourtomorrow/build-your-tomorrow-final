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
var BYTDashboardExpenseAnalysisComponent = (function () {
    function BYTDashboardExpenseAnalysisComponent(_getBYTUser) {
        this._getBYTUser = _getBYTUser;
        this.today = new Date;
    }
    BYTDashboardExpenseAnalysisComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._getBYTUser.getUser().subscribe(function (user) {
            _this.projectedExpenses = user.projectedExpenses;
            _this.totalSpent = user.totalSpent;
            _this.leftOver = user.leftOver;
            _this.upBy = user.upBy;
            _this.calcPeriodStart();
            _this.calcPeriodEnd();
            _this.calcDailyBudget();
            _this.calcText();
            _this.bytServerResponse = false;
        });
        var delay = 8000;
        setInterval(function () { return _this.byt_show_section = true; }, delay);
    };
    BYTDashboardExpenseAnalysisComponent.prototype.calcPeriodStart = function () {
        var year = this.today.getFullYear();
        var month = this.today.getMonth();
        this.periodStart = new Date(year, month, 1);
    };
    BYTDashboardExpenseAnalysisComponent.prototype.calcPeriodEnd = function () {
        var year = this.today.getFullYear();
        var month = this.today.getMonth() + 1;
        this.periodEnd = new Date(year, month, 0);
    };
    BYTDashboardExpenseAnalysisComponent.prototype.calcDailyBudget = function () {
        this.dailyBudget = this.projectedExpenses / this.periodEnd.getDate();
    };
    BYTDashboardExpenseAnalysisComponent.prototype.calcUpBy = function () {
        this.calcDailyBudget();
        this.upBy = (this.dailyBudget * this.today.getDate()) - this.totalSpent;
        this.calcText();
    };
    BYTDashboardExpenseAnalysisComponent.prototype.calcText = function () {
        if (this.upBy > 0) {
            this.specialVarUpBy = '#00FF00';
            this.specialVarUpByWord = 'Up by';
            this.upByComment = "Ayo, we can spend " + Math.floor(this.upBy) + " without going over budget.";
        }
        if (this.upBy === 0) {
            this.specialVarUpByWord = 'Up by';
            this.upByComment = "Add a spending limit wangsta";
            this.specialVarUpBy = '#666666';
        }
        if (this.upBy < 0) {
            this.specialVarUpBy = '#FE7878';
            this.specialVarUpByWord = 'Down by';
            this.upByComment = "OMG, we're behind budget by " + Math.floor(this.upBy) + " Let's get it together people";
        }
    };
    BYTDashboardExpenseAnalysisComponent = __decorate([
        core_1.Component({
            selector: 'byt-dashboard-expense-analysis',
            templateUrl: '/app/byt-dashboard-expense-analysis.component.html',
            styleUrls: ['app/byt-dashboard-expense-analysis.component.css'],
            inputs: ['projectedExpenses']
        }), 
        __metadata('design:paramtypes', [byt_dashboard_overview_service_1.GetBYTUser])
    ], BYTDashboardExpenseAnalysisComponent);
    return BYTDashboardExpenseAnalysisComponent;
}());
exports.BYTDashboardExpenseAnalysisComponent = BYTDashboardExpenseAnalysisComponent;
//# sourceMappingURL=byt-dashboard-expense-analysis.component.js.map