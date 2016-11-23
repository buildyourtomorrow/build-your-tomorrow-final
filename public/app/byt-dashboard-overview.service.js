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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var angular2_jwt_1 = require('angular2-jwt');
// Import RxJs required methods
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
var Observable_1 = require('rxjs/Observable');
var GetBYTUser = (function () {
    // Set userProfile attribute of already saved profile
    function GetBYTUser(authHttp) {
        this.authHttp = authHttp;
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
    }
    GetBYTUser.prototype.getUser = function () {
        var myHeader = new http_1.Headers();
        ;
        myHeader.append('byt_email', this.userProfile.email);
        return this.authHttp.get('/get-user', { headers: myHeader }).map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    GetBYTUser = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
    ], GetBYTUser);
    return GetBYTUser;
}());
exports.GetBYTUser = GetBYTUser;
var BYTPostProjections = (function () {
    function BYTPostProjections(authHttp) {
        this.authHttp = authHttp;
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
    }
    BYTPostProjections.prototype.bytPostIncomeProjection = function (bytIncomeProjection) {
        return this.authHttp.post('/add-income-projection', { "bytIncomeProjection": bytIncomeProjection, "byt_email": this.userProfile.email })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BYTPostProjections.prototype.bytPostBillProjection = function (bytBillProjection) {
        return this.authHttp.post('/add-bills-projection', { "bytBillProjection": bytBillProjection, "byt_email": this.userProfile.email })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BYTPostProjections.prototype.bytPostExpensesProjection = function (bytExpensesProjection) {
        return this.authHttp.post('/add-expenses-projection', { "bytExpensesProjection": bytExpensesProjection, "byt_email": this.userProfile.email })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BYTPostProjections = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
    ], BYTPostProjections);
    return BYTPostProjections;
}());
exports.BYTPostProjections = BYTPostProjections;
var BYTPostIncome = (function () {
    function BYTPostIncome(authHttp) {
        this.authHttp = authHttp;
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
    }
    BYTPostIncome.prototype.bytPostIncomeForm = function (bytPostIncomeForm) {
        return this.authHttp.post('/add-income', { "category": bytPostIncomeForm.category,
            "date": bytPostIncomeForm.date,
            "amount": bytPostIncomeForm.amount,
            "byt_email": this.userProfile.email })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BYTPostIncome = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
    ], BYTPostIncome);
    return BYTPostIncome;
}());
exports.BYTPostIncome = BYTPostIncome;
var BYTPostBill = (function () {
    function BYTPostBill(authHttp) {
        this.authHttp = authHttp;
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
    }
    BYTPostBill.prototype.bytPostBillForm = function (bytPostBillForm) {
        return this.authHttp.post('/add-bill', { "category": bytPostBillForm.category,
            "subCategory": bytPostBillForm.subCategory,
            "date": bytPostBillForm.date,
            "amount": bytPostBillForm.amount,
            "byt_email": this.userProfile.email })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BYTPostBill = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
    ], BYTPostBill);
    return BYTPostBill;
}());
exports.BYTPostBill = BYTPostBill;
var BYTPostExpense = (function () {
    function BYTPostExpense(authHttp) {
        this.authHttp = authHttp;
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
    }
    BYTPostExpense.prototype.bytPostExpenseForm = function (bytPostExpenseForm) {
        return this.authHttp.post('/add-monthly-expense', { "category": bytPostExpenseForm.category,
            "subCategory": bytPostExpenseForm.subCategory,
            "date": bytPostExpenseForm.date,
            "amount": bytPostExpenseForm.amount,
            "byt_email": this.userProfile.email })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BYTPostExpense = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
    ], BYTPostExpense);
    return BYTPostExpense;
}());
exports.BYTPostExpense = BYTPostExpense;
var BYTRemoveTransaction = (function () {
    function BYTRemoveTransaction(authHttp) {
        this.authHttp = authHttp;
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
    }
    BYTRemoveTransaction.prototype.bytRemoveIncome = function (index) {
        return this.authHttp.put('/remove-income', { "index": index,
            "byt_email": this.userProfile.email })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BYTRemoveTransaction.prototype.bytRemoveBill = function (index) {
        return this.authHttp.put('/remove-bill', { "index": index,
            "byt_email": this.userProfile.email })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BYTRemoveTransaction.prototype.bytRemoveExpense = function (index) {
        return this.authHttp.put('/remove-expense', { "index": index,
            "byt_email": this.userProfile.email })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    BYTRemoveTransaction = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp])
    ], BYTRemoveTransaction);
    return BYTRemoveTransaction;
}());
exports.BYTRemoveTransaction = BYTRemoveTransaction;
//# sourceMappingURL=byt-dashboard-overview.service.js.map