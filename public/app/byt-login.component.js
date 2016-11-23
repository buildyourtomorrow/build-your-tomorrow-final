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
var auth_service_1 = require("./auth.service");
var BYTLoginComponent = (function () {
    function BYTLoginComponent(_auth) {
        this._auth = _auth;
    }
    BYTLoginComponent.prototype.ngOnInit = function () {
        this._auth.login();
    };
    ;
    BYTLoginComponent = __decorate([
        core_1.Component({
            selector: 'byt-login',
            templateUrl: '/app/byt-login.component.html',
            styleUrls: ['app/byt-login.component.css']
        }), 
        __metadata('design:paramtypes', [auth_service_1.Auth])
    ], BYTLoginComponent);
    return BYTLoginComponent;
}());
exports.BYTLoginComponent = BYTLoginComponent;
//# sourceMappingURL=byt-login.component.js.map