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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var forms_2 = require('@angular/forms');
var router_1 = require('@angular/router');
var angular2_jwt_1 = require('angular2-jwt');
var byt_nav_component_1 = require('./byt-nav.component');
var app_component_1 = require('./app.component');
var byt_body_nav_component_1 = require('./byt-body-nav.component');
var byt_dashboard_quote_component_1 = require('./byt-dashboard-quote.component');
var byt_dashboard_overview_component_1 = require('./byt-dashboard-overview.component');
var byt_dashboard_overview_question_component_1 = require('./byt-dashboard-overview-question.component');
var byt_dashboard_expense_question_component_1 = require('./byt-dashboard-expense-question.component');
var byt_dashboard_expense_analysis_component_1 = require('./byt-dashboard-expense-analysis.component');
var byt_dashboard_daily_budget_component_1 = require('./byt-dashboard-daily-budget.component');
var byt_dashboard_daily_budget_question_component_1 = require('./byt-dashboard-daily-budget-question.component');
var byt_dashboard_home_arrow_component_1 = require("./byt-dashboard-home-arrow.component");
var byt_dashboard_overview_service_1 = require('./byt-dashboard-overview.service');
var byt_income_component_1 = require('./byt-income.component');
var byt_income_form_component_1 = require('./byt-income-form.component');
var byt_last_income_entry_component_1 = require('./byt-last-income-entry.component');
var byt_last_bill_entry_component_1 = require('./byt-last-bill-entry.component');
var byt_bills_component_1 = require('./byt-bills.component');
var byt_order_by_pipes_1 = require('./byt-order-by.pipes');
var byt_bills_form_component_1 = require('./byt-bills-form.component');
var byt_last_expense_entry_component_1 = require("./byt-last-expense-entry.component");
var byt_expenses_component_1 = require("./byt-expenses.component");
var byt_expenses_form_component_1 = require("./byt-expenses-form.component");
var byt_education_component_1 = require("./byt-education.component");
var byt_home_component_1 = require("./byt-home.component");
var auth_service_1 = require("./auth.service");
var byt_login_component_1 = require("./byt-login.component");
var auth_guard_1 = require("./auth.guard");
var byt_dashboard_overview_service_2 = require('./byt-dashboard-overview.service');
var byt_dashboard_overview_service_3 = require("./byt-dashboard-overview.service");
var byt_dashboard_overview_service_4 = require("./byt-dashboard-overview.service");
var byt_dashboard_overview_service_5 = require("./byt-dashboard-overview.service");
var byt_dashboard_overview_service_6 = require("./byt-dashboard-overview.service");
var routes = [
    { path: '', component: byt_home_component_1.BYTHomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'login', component: byt_login_component_1.BYTLoginComponent },
    { path: 'dashboard', component: byt_dashboard_overview_component_1.BYTDashboardOverviewComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'income', component: byt_income_component_1.BYTIncomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'bills', component: byt_bills_component_1.BYTBillsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'expenses', component: byt_expenses_component_1.BYTExpensesComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'education', component: byt_education_component_1.BYTEducationComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: '**', component: byt_home_component_1.BYTHomeComponent, canActivate: [auth_guard_1.AuthGuard] }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, forms_2.ReactiveFormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(routes)],
            declarations: [app_component_1.AppComponent, byt_nav_component_1.BYTNavComponent, byt_body_nav_component_1.BYTBodyNavComponent,
                byt_dashboard_quote_component_1.BYTDashboardQuoteComponent, byt_dashboard_overview_component_1.BYTDashboardOverviewComponent, byt_dashboard_overview_question_component_1.BYTDashboardOverviewQuestionComponent,
                byt_dashboard_expense_question_component_1.BYTDashboardExpenseQuestionComponent, byt_dashboard_expense_analysis_component_1.BYTDashboardExpenseAnalysisComponent,
                byt_dashboard_daily_budget_component_1.BYTDashboardDailyBudgetComponent, byt_dashboard_daily_budget_question_component_1.BYTDashboardDailyBudgetQuestionComponent,
                byt_dashboard_home_arrow_component_1.BYTDashboarHomeArrowComponent, byt_income_component_1.BYTIncomeComponent, byt_income_form_component_1.BYTIncomeFormComponent, byt_last_income_entry_component_1.BYTLastIncomeEntryComponent,
                byt_last_bill_entry_component_1.BYTLastBillEntryComponent, byt_bills_component_1.BYTBillsComponent, byt_order_by_pipes_1.BYTOrderByPipe, byt_bills_form_component_1.BYTBillsFormComponent,
                byt_last_expense_entry_component_1.BYTLastExpenseEntryComponent, byt_expenses_component_1.BYTExpensesComponent, byt_expenses_form_component_1.BYTExpensesFormComponent, byt_education_component_1.BYTEducationComponent,
                byt_home_component_1.BYTHomeComponent, byt_login_component_1.BYTLoginComponent],
            providers: [byt_dashboard_overview_service_1.GetBYTUser, auth_service_1.Auth, angular2_jwt_1.AUTH_PROVIDERS, auth_guard_1.AuthGuard, byt_dashboard_overview_service_2.BYTPostProjections, byt_dashboard_overview_service_3.BYTPostIncome, byt_dashboard_overview_service_4.BYTPostBill,
                byt_dashboard_overview_service_5.BYTPostExpense, byt_dashboard_overview_service_6.BYTRemoveTransaction],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map