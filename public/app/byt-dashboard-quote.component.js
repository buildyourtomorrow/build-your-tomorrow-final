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
var byt_quotes_service_1 = require('./byt-quotes.service');
var BYTDashboardQuoteComponent = (function () {
    function BYTDashboardQuoteComponent(_byt_quotes) {
        this._byt_quotes = _byt_quotes;
        this.byt_show_section = false;
    }
    BYTDashboardQuoteComponent.prototype.randomQuote = function () {
        this.byt_show_section = true;
        this.quote = this._byt_quotes.listOfQuotes()[Math.floor(Math.random() * this._byt_quotes.listOfQuotes().length)];
    };
    ;
    BYTDashboardQuoteComponent.prototype.ngOnInit = function () {
        var _this = this;
        var delay = 8000;
        setInterval(function () { return _this.randomQuote(); }, delay);
    };
    ;
    BYTDashboardQuoteComponent = __decorate([
        core_1.Component({
            selector: 'byt-dashboard-quote',
            templateUrl: '/app/byt-dashboard-quote.component.html',
            styleUrls: ['app/byt-dashboard-quote.component.css'],
            providers: [byt_quotes_service_1.BYT_QUOTES]
        }), 
        __metadata('design:paramtypes', [byt_quotes_service_1.BYT_QUOTES])
    ], BYTDashboardQuoteComponent);
    return BYTDashboardQuoteComponent;
}());
exports.BYTDashboardQuoteComponent = BYTDashboardQuoteComponent;
//# sourceMappingURL=byt-dashboard-quote.component.js.map