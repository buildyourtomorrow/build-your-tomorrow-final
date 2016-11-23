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
var BYTBodyNavComponent = (function () {
    function BYTBodyNavComponent(_getBYTUser) {
        this._getBYTUser = _getBYTUser;
    }
    BYTBodyNavComponent.prototype.addRemoveDashboardSpinner = function () {
        var _this = this;
        this.byt_dashboard_spinner = !this.byt_dashboard_spinner;
        this._getBYTUser.getUser().subscribe(function (user) {
            _this.byt_dashboard_spinner = !_this.byt_dashboard_spinner;
        });
    };
    BYTBodyNavComponent.prototype.addRemoveIncomeSpinner = function () {
        var _this = this;
        this.byt_income_spinner = !this.byt_income_spinner;
        this._getBYTUser.getUser().subscribe(function (user) {
            _this.byt_income_spinner = !_this.byt_income_spinner;
        });
    };
    BYTBodyNavComponent.prototype.addRemoveBillsSpinner = function () {
        var _this = this;
        this.byt_bills_spinner = !this.byt_bills_spinner;
        this._getBYTUser.getUser().subscribe(function (user) {
            _this.byt_bills_spinner = !_this.byt_bills_spinner;
        });
    };
    BYTBodyNavComponent.prototype.addRemoveExpensesSpinner = function () {
        var _this = this;
        this.byt_expenses_spinner = !this.byt_expenses_spinner;
        this._getBYTUser.getUser().subscribe(function (user) {
            _this.byt_expenses_spinner = !_this.byt_expenses_spinner;
        });
    };
    BYTBodyNavComponent.prototype.addRemoveEDUSpinner = function () {
        var _this = this;
        this.byt_edu_spinner = !this.byt_edu_spinner;
        this._getBYTUser.getUser().subscribe(function (user) {
            _this.byt_edu_spinner = !_this.byt_edu_spinner;
        });
    };
    BYTBodyNavComponent = __decorate([
        core_1.Component({
            selector: 'byt-body-nav',
            templateUrl: '/app/byt-body-nav.component.html',
            styleUrls: ['app/byt-body-nav.component.css']
        }), 
        __metadata('design:paramtypes', [byt_dashboard_overview_service_1.GetBYTUser])
    ], BYTBodyNavComponent);
    return BYTBodyNavComponent;
}());
exports.BYTBodyNavComponent = BYTBodyNavComponent;
//# sourceMappingURL=byt-body-nav.component.js.map