import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule }   from '@angular/router';
import { AUTH_PROVIDERS }      from 'angular2-jwt';

import {BYTNavComponent} from './byt-nav.component';
import {AppComponent} from './app.component';
import {BYTBodyNavComponent} from './byt-body-nav.component';
import {BYTDashboardQuoteComponent} from './byt-dashboard-quote.component';
import {BYTDashboardOverviewComponent} from './byt-dashboard-overview.component';
import {BYTDashboardOverviewQuestionComponent} from './byt-dashboard-overview-question.component';
import {BYTDashboardExpenseQuestionComponent} from './byt-dashboard-expense-question.component';
import {BYTDashboardExpenseAnalysisComponent} from './byt-dashboard-expense-analysis.component';
import {BYTDashboardDailyBudgetComponent} from './byt-dashboard-daily-budget.component';
import {BYTDashboardDailyBudgetQuestionComponent} from './byt-dashboard-daily-budget-question.component';
import {BYTDashboarHomeArrowComponent} from "./byt-dashboard-home-arrow.component";
import {GetBYTUser} from './byt-dashboard-overview.service';
import {BYTIncomeComponent} from './byt-income.component';
import {BYTIncomeFormComponent} from './byt-income-form.component';
import {BYTLastIncomeEntryComponent} from './byt-last-income-entry.component';
import {BYTLastBillEntryComponent} from './byt-last-bill-entry.component';
import {BYTBillsComponent} from './byt-bills.component'
import {BYTOrderByPipe} from './byt-order-by.pipes';
import {BYTBillsFormComponent} from './byt-bills-form.component';
import {BYTLastExpenseEntryComponent} from "./byt-last-expense-entry.component";
import {BYTExpensesComponent} from "./byt-expenses.component";
import {BYTExpensesFormComponent} from "./byt-expenses-form.component";
import {BYTEducationComponent} from "./byt-education.component";
import {BYTHomeComponent} from "./byt-home.component";
import {Auth} from "./auth.service";
import {BYTLoginComponent} from "./byt-login.component";
import {AuthGuard} from "./auth.guard";
import {BYTPostProjections} from './byt-dashboard-overview.service';
import {BYTPostIncome} from "./byt-dashboard-overview.service";
import {BYTPostBill} from "./byt-dashboard-overview.service";
import {BYTPostExpense} from "./byt-dashboard-overview.service";
import {BYTRemoveTransaction} from "./byt-dashboard-overview.service";

const routes: Routes = [
  { path: '', component: BYTHomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: BYTLoginComponent },
  { path: 'dashboard', component: BYTDashboardOverviewComponent, canActivate: [AuthGuard] },
  { path: 'income', component: BYTIncomeComponent, canActivate: [AuthGuard] },
  { path: 'bills', component: BYTBillsComponent, canActivate: [AuthGuard] },
  { path: 'expenses', component: BYTExpensesComponent, canActivate: [AuthGuard] },
  { path: 'education', component: BYTEducationComponent, canActivate: [AuthGuard] },
  { path: '**', component: BYTHomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule, RouterModule.forRoot(routes)],
  declarations: [ AppComponent, BYTNavComponent, BYTBodyNavComponent, 
  				  BYTDashboardQuoteComponent, BYTDashboardOverviewComponent, BYTDashboardOverviewQuestionComponent, 
  				  BYTDashboardExpenseQuestionComponent, BYTDashboardExpenseAnalysisComponent, 
  				  BYTDashboardDailyBudgetComponent, BYTDashboardDailyBudgetQuestionComponent,
  				  BYTDashboarHomeArrowComponent, BYTIncomeComponent, BYTIncomeFormComponent, BYTLastIncomeEntryComponent,
  				  BYTLastBillEntryComponent, BYTBillsComponent, BYTOrderByPipe, BYTBillsFormComponent,
  				  BYTLastExpenseEntryComponent, BYTExpensesComponent, BYTExpensesFormComponent, BYTEducationComponent, 
            BYTHomeComponent, BYTLoginComponent],
  providers: [ GetBYTUser, Auth, AUTH_PROVIDERS, AuthGuard, BYTPostProjections, BYTPostIncome, BYTPostBill, 
               BYTPostExpense, BYTRemoveTransaction ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}