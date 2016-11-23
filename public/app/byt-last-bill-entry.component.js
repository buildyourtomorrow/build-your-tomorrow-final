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
var BYTLastBillEntryComponent = (function () {
    function BYTLastBillEntryComponent(_getBYTUser) {
        this._getBYTUser = _getBYTUser;
    }
    BYTLastBillEntryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._getBYTUser.getUser().subscribe(function (user) {
            _this.monthlyBills = user.monthlyBills;
            _this.monthlyBillsLength = _this.monthlyBills.length;
            if (_this.monthlyBillsLength > 0) {
                _this.lastTransactionDate = _this.monthlyBills[0].date;
            }
        });
    };
    BYTLastBillEntryComponent.prototype.lastTransactionDateFunction = function (bill) {
        this.monthlyBills.unshift(bill);
        this.monthlyBillsLength = this.monthlyBills.length;
        this.lastTransactionDate = this.monthlyBills[0].date;
    };
    BYTLastBillEntryComponent.prototype.updateViewFunction = function (monthlyBills) {
        this.monthlyBillsLength = monthlyBills.length;
        if (this.monthlyBillsLength > 0) {
            this.lastTransactionDate = monthlyBills[0].date;
        }
        else {
            this.lastTransactionDate = new Date;
        }
    };
    BYTLastBillEntryComponent = __decorate([
        core_1.Component({
            selector: 'byt-last-bill-entry',
            templateUrl: '/app/byt-last-bill-entry.component.html',
            styleUrls: ['app/byt-last-bill-entry.component.css']
        }), 
        __metadata('design:paramtypes', [byt_dashboard_overview_service_1.GetBYTUser])
    ], BYTLastBillEntryComponent);
    return BYTLastBillEntryComponent;
}());
exports.BYTLastBillEntryComponent = BYTLastBillEntryComponent;
//# sourceMappingURL=byt-last-bill-entry.component.js.map