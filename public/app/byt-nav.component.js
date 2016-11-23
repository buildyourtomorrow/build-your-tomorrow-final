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
var auth_service_1 = require('./auth.service');
var BYTNavComponent = (function () {
    function BYTNavComponent(_getBYTUser, _auth) {
        this._getBYTUser = _getBYTUser;
        this._auth = _auth;
    }
    BYTNavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._getBYTUser.getUser().subscribe(function (user) {
            _this.nickName = user.nickName;
        });
    };
    BYTNavComponent.prototype.logout = function () {
        this._auth.logout();
        window.location.href = 'http://app.buildyourtomorrow.com';
    };
    BYTNavComponent = __decorate([
        core_1.Component({
            selector: 'byt-nav',
            templateUrl: '/app/byt-nav.component.html',
            styleUrls: ['app/byt-nav.component.css'],
            providers: [byt_dashboard_overview_service_1.GetBYTUser]
        }), 
        __metadata('design:paramtypes', [byt_dashboard_overview_service_1.GetBYTUser, auth_service_1.Auth])
    ], BYTNavComponent);
    return BYTNavComponent;
}());
exports.BYTNavComponent = BYTNavComponent;
//# sourceMappingURL=byt-nav.component.js.map