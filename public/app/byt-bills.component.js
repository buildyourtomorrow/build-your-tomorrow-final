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
var byt_dashboard_overview_service_2 = require("./byt-dashboard-overview.service");
var byt_last_bill_entry_component_1 = require('./byt-last-bill-entry.component');
var BYTBillsComponent = (function () {
    function BYTBillsComponent(_getBYTUser, _bytRemoveTransaction) {
        this._getBYTUser = _getBYTUser;
        this._bytRemoveTransaction = _bytRemoveTransaction;
        this.billsCategoryTotals = [{
                category: "Housing",
                total: 0,
                show: true,
                subCategory: [{
                        name: "Rent",
                        total: 0
                    },
                    {
                        name: "Mortgage",
                        total: 0
                    },
                    {
                        name: "Vacation home",
                        total: 0
                    }]
            },
            {
                category: "Health",
                total: 0,
                show: true,
                subCategory: [{
                        name: "Gym",
                        total: 0
                    },
                    {
                        name: "Yoga",
                        total: 0
                    },
                    {
                        name: "Pilates",
                        total: 0
                    },
                    {
                        name: "Boxing",
                        total: 0
                    },
                    {
                        name: "Martial arts",
                        total: 0
                    },
                    {
                        name: "Health Insurance",
                        total: 0
                    },
                    {
                        name: "Pharmacy",
                        total: 0
                    },
                    {
                        name: "Eyecare",
                        total: 0
                    },
                    {
                        name: "Doctor",
                        total: 0
                    },
                    {
                        name: "Dentist",
                        total: 0
                    }]
            },
            {
                category: "Transportation",
                total: 0,
                show: true,
                subCategory: [{
                        name: "Metro Card",
                        total: 0
                    },
                    {
                        name: "EZ Pass",
                        total: 0
                    },
                    {
                        name: "Gas",
                        total: 0
                    },
                    {
                        name: "Parking",
                        total: 0
                    }]
            },
            {
                category: "Utilities",
                total: 0,
                show: true,
                subCategory: [{
                        name: "Electric",
                        total: 0
                    },
                    {
                        name: "Water",
                        total: 0
                    },
                    {
                        name: "Garbage",
                        total: 0
                    },
                    {
                        name: "Home/Cell phone",
                        total: 0
                    },
                    {
                        name: "Internet",
                        total: 0
                    }]
            },
            {
                category: "Insurance",
                total: 0,
                show: true,
                subCategory: [{
                        name: "Car insurance",
                        total: 0
                    },
                    {
                        name: "Homeowner's insurance",
                        total: 0
                    },
                    {
                        name: "Renter's insurance",
                        total: 0
                    }]
            },
            {
                category: "Debt",
                total: 0,
                show: true,
                subCategory: [{
                        name: "Credit card",
                        total: 0
                    },
                    {
                        name: "Student loan",
                        total: 0
                    },
                    {
                        name: "Personal loan",
                        total: 0
                    },
                    {
                        name: "Car loan",
                        total: 0
                    }]
            },
            {
                category: "Taxes",
                total: 0,
                show: true,
                subCategory: [{
                        name: "Personal",
                        total: 0
                    },
                    {
                        name: "Business",
                        total: 0
                    },
                    {
                        name: "House",
                        total: 0
                    }]
            },
            {
                category: "Entertainment",
                total: 0,
                show: true,
                subCategory: [{
                        name: "Streaming movies/music",
                        total: 0
                    }]
            },
            {
                category: "ChildCare",
                total: 0,
                show: true,
                subCategory: [{
                        name: "Babysitter",
                        total: 0
                    },
                    {
                        name: "Daycare",
                        total: 0
                    },
                    {
                        name: "After School Programs",
                        total: 0
                    },
                    {
                        name: "Youth Leagues",
                        total: 0
                    },
                    {
                        name: "Medical",
                        total: 0
                    },
                    {
                        name: "Nutrition",
                        total: 0
                    }]
            }];
        this.byt_active = true;
    }
    BYTBillsComponent.prototype.ngOnInit = function () {
        this.getAllBills();
    };
    ;
    BYTBillsComponent.prototype.removeBill = function (index) {
        this.allBills.splice(index, 1);
        this.billsCategoryTotals =
            [{
                    category: "Housing",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Rent",
                            total: 0
                        },
                        {
                            name: "Mortgage",
                            total: 0
                        },
                        {
                            name: "Vacation home",
                            total: 0
                        }]
                },
                {
                    category: "Health",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Gym",
                            total: 0
                        },
                        {
                            name: "Yoga",
                            total: 0
                        },
                        {
                            name: "Pilates",
                            total: 0
                        },
                        {
                            name: "Boxing",
                            total: 0
                        },
                        {
                            name: "Martial arts",
                            total: 0
                        },
                        {
                            name: "Health Insurance",
                            total: 0
                        },
                        {
                            name: "Pharmacy",
                            total: 0
                        },
                        {
                            name: "Eyecare",
                            total: 0
                        },
                        {
                            name: "Doctor",
                            total: 0
                        },
                        {
                            name: "Dentist",
                            total: 0
                        }]
                },
                {
                    category: "Transportation",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Metro Card",
                            total: 0
                        },
                        {
                            name: "EZ Pass",
                            total: 0
                        },
                        {
                            name: "Gas",
                            total: 0
                        },
                        {
                            name: "Parking",
                            total: 0
                        }]
                },
                {
                    category: "Utilities",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Electric",
                            total: 0
                        },
                        {
                            name: "Water",
                            total: 0
                        },
                        {
                            name: "Garbage",
                            total: 0
                        },
                        {
                            name: "Home/Cell phone",
                            total: 0
                        },
                        {
                            name: "Internet",
                            total: 0
                        }]
                },
                {
                    category: "Insurance",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Car insurance",
                            total: 0
                        },
                        {
                            name: "Homeowner's insurance",
                            total: 0
                        },
                        {
                            name: "Renter's insurance",
                            total: 0
                        }]
                },
                {
                    category: "Debt",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Credit card",
                            total: 0
                        },
                        {
                            name: "Student loan",
                            total: 0
                        },
                        {
                            name: "Personal loan",
                            total: 0
                        },
                        {
                            name: "Car loan",
                            total: 0
                        }]
                },
                {
                    category: "Taxes",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Personal",
                            total: 0
                        },
                        {
                            name: "Business",
                            total: 0
                        },
                        {
                            name: "House",
                            total: 0
                        }]
                },
                {
                    category: "Entertainment",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Streaming movies/music",
                            total: 0
                        }]
                },
                {
                    category: "ChildCare",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Babysitter",
                            total: 0
                        },
                        {
                            name: "Daycare",
                            total: 0
                        },
                        {
                            name: "After School Programs",
                            total: 0
                        },
                        {
                            name: "Youth Leagues",
                            total: 0
                        },
                        {
                            name: "Medical",
                            total: 0
                        },
                        {
                            name: "Nutrition",
                            total: 0
                        }]
                }];
        for (var i = 0; i < this.allBills.length; i++) {
            if (this.allBills[i].category === "Housing") {
                this.billsCategoryTotals[0].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Rent") {
                    this.billsCategoryTotals[0].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Mortgage") {
                    this.billsCategoryTotals[0].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Vacation home") {
                    this.billsCategoryTotals[0].subCategory[2].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "Health") {
                this.billsCategoryTotals[1].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Gym") {
                    this.billsCategoryTotals[1].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Yoga") {
                    this.billsCategoryTotals[1].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Pilates") {
                    this.billsCategoryTotals[1].subCategory[2].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Boxing") {
                    this.billsCategoryTotals[1].subCategory[3].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Martial arts") {
                    this.billsCategoryTotals[1].subCategory[4].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Health Insurance") {
                    this.billsCategoryTotals[1].subCategory[5].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Pharmacy") {
                    this.billsCategoryTotals[1].subCategory[6].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Eyecare") {
                    this.billsCategoryTotals[1].subCategory[7].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Doctor") {
                    this.billsCategoryTotals[1].subCategory[8].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Dentist") {
                    this.billsCategoryTotals[1].subCategory[9].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "Transportation") {
                this.billsCategoryTotals[2].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Metro Card") {
                    this.billsCategoryTotals[2].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "EZ Pass") {
                    this.billsCategoryTotals[2].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Gas") {
                    this.billsCategoryTotals[2].subCategory[2].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Parking") {
                    this.billsCategoryTotals[2].subCategory[3].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "Utilities") {
                this.billsCategoryTotals[3].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Electric") {
                    this.billsCategoryTotals[3].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Water") {
                    this.billsCategoryTotals[3].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Garbage") {
                    this.billsCategoryTotals[3].subCategory[2].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Home/Cell phone") {
                    this.billsCategoryTotals[3].subCategory[3].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Internet") {
                    this.billsCategoryTotals[3].subCategory[4].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "Insurance") {
                this.billsCategoryTotals[4].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Car insurance") {
                    this.billsCategoryTotals[4].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Homeowner's insurance") {
                    this.billsCategoryTotals[4].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Renter's insurance") {
                    this.billsCategoryTotals[4].subCategory[2].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "Debt") {
                this.billsCategoryTotals[5].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Credit card") {
                    this.billsCategoryTotals[5].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Student loan") {
                    this.billsCategoryTotals[5].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Personal loan") {
                    this.billsCategoryTotals[5].subCategory[2].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Car loan") {
                    this.billsCategoryTotals[5].subCategory[3].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "Taxes") {
                this.billsCategoryTotals[6].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Personal") {
                    this.billsCategoryTotals[6].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Business") {
                    this.billsCategoryTotals[6].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "House") {
                    this.billsCategoryTotals[6].subCategory[2].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "Entertainment") {
                this.billsCategoryTotals[7].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Streaming movies/music") {
                    this.billsCategoryTotals[7].subCategory[0].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "ChildCare") {
                this.billsCategoryTotals[8].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Babysitter") {
                    this.billsCategoryTotals[8].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Daycare") {
                    this.billsCategoryTotals[8].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "After School Programs") {
                    this.billsCategoryTotals[8].subCategory[2].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Youth Leagues") {
                    this.billsCategoryTotals[8].subCategory[3].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Medical") {
                    this.billsCategoryTotals[8].subCategory[4].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Nutrition") {
                    this.billsCategoryTotals[8].subCategory[5].total += this.allBills[i].amount;
                }
            }
            ;
        }
        ;
        this._bytRemoveTransaction.bytRemoveBill(index).subscribe(function (user) { });
        this.allBillsLength = this.allBills.length;
        this._lastBillEntry.updateViewFunction(this.allBills);
        if (this.allBillsLength === 0) {
            this.byt_active = true;
        }
    };
    ;
    BYTBillsComponent.prototype.childBillsForm = function ($event) {
        this.allBillsLength = 1;
        this.allBills.unshift($event);
        this._lastBillEntry.lastTransactionDateFunction($event);
        this.billsCategoryTotals =
            [{
                    category: "Housing",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Rent",
                            total: 0
                        },
                        {
                            name: "Mortgage",
                            total: 0
                        },
                        {
                            name: "Vacation home",
                            total: 0
                        }]
                },
                {
                    category: "Health",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Gym",
                            total: 0
                        },
                        {
                            name: "Yoga",
                            total: 0
                        },
                        {
                            name: "Pilates",
                            total: 0
                        },
                        {
                            name: "Boxing",
                            total: 0
                        },
                        {
                            name: "Martial arts",
                            total: 0
                        },
                        {
                            name: "Health Insurance",
                            total: 0
                        },
                        {
                            name: "Pharmacy",
                            total: 0
                        },
                        {
                            name: "Eyecare",
                            total: 0
                        },
                        {
                            name: "Doctor",
                            total: 0
                        },
                        {
                            name: "Dentist",
                            total: 0
                        }]
                },
                {
                    category: "Transportation",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Metro Card",
                            total: 0
                        },
                        {
                            name: "EZ Pass",
                            total: 0
                        },
                        {
                            name: "Gas",
                            total: 0
                        },
                        {
                            name: "Parking",
                            total: 0
                        }]
                },
                {
                    category: "Utilities",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Electric",
                            total: 0
                        },
                        {
                            name: "Water",
                            total: 0
                        },
                        {
                            name: "Garbage",
                            total: 0
                        },
                        {
                            name: "Home/Cell phone",
                            total: 0
                        },
                        {
                            name: "Internet",
                            total: 0
                        }]
                },
                {
                    category: "Insurance",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Car insurance",
                            total: 0
                        },
                        {
                            name: "Homeowner's insurance",
                            total: 0
                        },
                        {
                            name: "Renter's insurance",
                            total: 0
                        }]
                },
                {
                    category: "Debt",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Credit card",
                            total: 0
                        },
                        {
                            name: "Student loan",
                            total: 0
                        },
                        {
                            name: "Personal loan",
                            total: 0
                        },
                        {
                            name: "Car loan",
                            total: 0
                        }]
                },
                {
                    category: "Taxes",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Personal",
                            total: 0
                        },
                        {
                            name: "Business",
                            total: 0
                        },
                        {
                            name: "House",
                            total: 0
                        }]
                },
                {
                    category: "Entertainment",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Streaming movies/music",
                            total: 0
                        }]
                },
                {
                    category: "ChildCare",
                    total: 0,
                    show: true,
                    subCategory: [{
                            name: "Babysitter",
                            total: 0
                        },
                        {
                            name: "Daycare",
                            total: 0
                        },
                        {
                            name: "After School Programs",
                            total: 0
                        },
                        {
                            name: "Youth Leagues",
                            total: 0
                        },
                        {
                            name: "Medical",
                            total: 0
                        },
                        {
                            name: "Nutrition",
                            total: 0
                        }]
                }];
        for (var i = 0; i < this.allBills.length; i++) {
            if (this.allBills[i].category === "Housing") {
                this.billsCategoryTotals[0].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Rent") {
                    this.billsCategoryTotals[0].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Mortgage") {
                    this.billsCategoryTotals[0].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Vacation home") {
                    this.billsCategoryTotals[0].subCategory[2].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "Health") {
                this.billsCategoryTotals[1].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Gym") {
                    this.billsCategoryTotals[1].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Yoga") {
                    this.billsCategoryTotals[1].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Pilates") {
                    this.billsCategoryTotals[1].subCategory[2].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Boxing") {
                    this.billsCategoryTotals[1].subCategory[3].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Martial arts") {
                    this.billsCategoryTotals[1].subCategory[4].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Health Insurance") {
                    this.billsCategoryTotals[1].subCategory[5].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Pharmacy") {
                    this.billsCategoryTotals[1].subCategory[6].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Eyecare") {
                    this.billsCategoryTotals[1].subCategory[7].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Doctor") {
                    this.billsCategoryTotals[1].subCategory[8].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Dentist") {
                    this.billsCategoryTotals[1].subCategory[9].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "Transportation") {
                this.billsCategoryTotals[2].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Metro Card") {
                    this.billsCategoryTotals[2].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "EZ Pass") {
                    this.billsCategoryTotals[2].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Gas") {
                    this.billsCategoryTotals[2].subCategory[2].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Parking") {
                    this.billsCategoryTotals[2].subCategory[3].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "Utilities") {
                this.billsCategoryTotals[3].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Electric") {
                    this.billsCategoryTotals[3].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Water") {
                    this.billsCategoryTotals[3].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Garbage") {
                    this.billsCategoryTotals[3].subCategory[2].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Home/Cell phone") {
                    this.billsCategoryTotals[3].subCategory[3].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Internet") {
                    this.billsCategoryTotals[3].subCategory[4].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "Insurance") {
                this.billsCategoryTotals[4].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Car insurance") {
                    this.billsCategoryTotals[4].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Homeowner's insurance") {
                    this.billsCategoryTotals[4].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Renter's insurance") {
                    this.billsCategoryTotals[4].subCategory[2].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "Debt") {
                this.billsCategoryTotals[5].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Credit card") {
                    this.billsCategoryTotals[5].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Student loan") {
                    this.billsCategoryTotals[5].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Personal loan") {
                    this.billsCategoryTotals[5].subCategory[2].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Car loan") {
                    this.billsCategoryTotals[5].subCategory[3].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "Taxes") {
                this.billsCategoryTotals[6].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Personal") {
                    this.billsCategoryTotals[6].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Business") {
                    this.billsCategoryTotals[6].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "House") {
                    this.billsCategoryTotals[6].subCategory[2].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "Entertainment") {
                this.billsCategoryTotals[7].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Streaming movies/music") {
                    this.billsCategoryTotals[7].subCategory[0].total += this.allBills[i].amount;
                }
            }
            ;
            if (this.allBills[i].category === "ChildCare") {
                this.billsCategoryTotals[8].total += this.allBills[i].amount;
                if (this.allBills[i].subCategory === "Babysitter") {
                    this.billsCategoryTotals[8].subCategory[0].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Daycare") {
                    this.billsCategoryTotals[8].subCategory[1].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "After School Programs") {
                    this.billsCategoryTotals[8].subCategory[2].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Youth Leagues") {
                    this.billsCategoryTotals[8].subCategory[3].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Medical") {
                    this.billsCategoryTotals[8].subCategory[4].total += this.allBills[i].amount;
                }
                if (this.allBills[i].subCategory === "Nutrition") {
                    this.billsCategoryTotals[8].subCategory[5].total += this.allBills[i].amount;
                }
            }
            ;
        }
        ;
        this.calculateTotal();
    };
    BYTBillsComponent.prototype.getAllBills = function () {
        var _this = this;
        this.isRequesting = true;
        this._getBYTUser.getUser().subscribe(function (user) {
            _this.allBills = user.monthlyBills;
            _this.allBillsLength = user.monthlyBills.length;
            _this.billsCategoryTotals =
                [{
                        category: "Housing",
                        total: 0,
                        show: true,
                        subCategory: [{
                                name: "Rent",
                                total: 0
                            },
                            {
                                name: "Mortgage",
                                total: 0
                            },
                            {
                                name: "Vacation home",
                                total: 0
                            }]
                    },
                    {
                        category: "Health",
                        total: 0,
                        show: true,
                        subCategory: [{
                                name: "Gym",
                                total: 0
                            },
                            {
                                name: "Yoga",
                                total: 0
                            },
                            {
                                name: "Pilates",
                                total: 0
                            },
                            {
                                name: "Boxing",
                                total: 0
                            },
                            {
                                name: "Martial arts",
                                total: 0
                            },
                            {
                                name: "Health Insurance",
                                total: 0
                            },
                            {
                                name: "Pharmacy",
                                total: 0
                            },
                            {
                                name: "Eyecare",
                                total: 0
                            },
                            {
                                name: "Doctor",
                                total: 0
                            },
                            {
                                name: "Dentist",
                                total: 0
                            }]
                    },
                    {
                        category: "Transportation",
                        total: 0,
                        show: true,
                        subCategory: [{
                                name: "Metro Card",
                                total: 0
                            },
                            {
                                name: "EZ Pass",
                                total: 0
                            },
                            {
                                name: "Gas",
                                total: 0
                            },
                            {
                                name: "Parking",
                                total: 0
                            }]
                    },
                    {
                        category: "Utilities",
                        total: 0,
                        show: true,
                        subCategory: [{
                                name: "Electric",
                                total: 0
                            },
                            {
                                name: "Water",
                                total: 0
                            },
                            {
                                name: "Garbage",
                                total: 0
                            },
                            {
                                name: "Home/Cell phone",
                                total: 0
                            },
                            {
                                name: "Internet",
                                total: 0
                            }]
                    },
                    {
                        category: "Insurance",
                        total: 0,
                        show: true,
                        subCategory: [{
                                name: "Car insurance",
                                total: 0
                            },
                            {
                                name: "Homeowner's insurance",
                                total: 0
                            },
                            {
                                name: "Renter's insurance",
                                total: 0
                            }]
                    },
                    {
                        category: "Debt",
                        total: 0,
                        show: true,
                        subCategory: [{
                                name: "Credit card",
                                total: 0
                            },
                            {
                                name: "Student loan",
                                total: 0
                            },
                            {
                                name: "Personal loan",
                                total: 0
                            },
                            {
                                name: "Car loan",
                                total: 0
                            }]
                    },
                    {
                        category: "Taxes",
                        total: 0,
                        show: true,
                        subCategory: [{
                                name: "Personal",
                                total: 0
                            },
                            {
                                name: "Business",
                                total: 0
                            },
                            {
                                name: "House",
                                total: 0
                            }]
                    },
                    {
                        category: "Entertainment",
                        total: 0,
                        show: true,
                        subCategory: [{
                                name: "Streaming movies/music",
                                total: 0
                            }]
                    },
                    {
                        category: "ChildCare",
                        total: 0,
                        show: true,
                        subCategory: [{
                                name: "Babysitter",
                                total: 0
                            },
                            {
                                name: "Daycare",
                                total: 0
                            },
                            {
                                name: "After School Programs",
                                total: 0
                            },
                            {
                                name: "Youth Leagues",
                                total: 0
                            },
                            {
                                name: "Medical",
                                total: 0
                            },
                            {
                                name: "Nutrition",
                                total: 0
                            }]
                    }];
            for (var i = 0; i < _this.allBills.length; i++) {
                if (_this.allBills[i].category === "Housing") {
                    _this.billsCategoryTotals[0].total += _this.allBills[i].amount;
                    if (_this.allBills[i].subCategory === "Rent") {
                        _this.billsCategoryTotals[0].subCategory[0].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Mortgage") {
                        _this.billsCategoryTotals[0].subCategory[1].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Vacation home") {
                        _this.billsCategoryTotals[0].subCategory[2].total += _this.allBills[i].amount;
                    }
                }
                ;
                if (_this.allBills[i].category === "Health") {
                    _this.billsCategoryTotals[1].total += _this.allBills[i].amount;
                    if (_this.allBills[i].subCategory === "Gym") {
                        _this.billsCategoryTotals[1].subCategory[0].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Yoga") {
                        _this.billsCategoryTotals[1].subCategory[1].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Pilates") {
                        _this.billsCategoryTotals[1].subCategory[2].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Boxing") {
                        _this.billsCategoryTotals[1].subCategory[3].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Martial arts") {
                        _this.billsCategoryTotals[1].subCategory[4].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Health Insurance") {
                        _this.billsCategoryTotals[1].subCategory[5].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Pharmacy") {
                        _this.billsCategoryTotals[1].subCategory[6].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Eyecare") {
                        _this.billsCategoryTotals[1].subCategory[7].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Doctor") {
                        _this.billsCategoryTotals[1].subCategory[8].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Dentist") {
                        _this.billsCategoryTotals[1].subCategory[9].total += _this.allBills[i].amount;
                    }
                }
                ;
                if (_this.allBills[i].category === "Transportation") {
                    _this.billsCategoryTotals[2].total += _this.allBills[i].amount;
                    if (_this.allBills[i].subCategory === "Metro Card") {
                        _this.billsCategoryTotals[2].subCategory[0].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "EZ Pass") {
                        _this.billsCategoryTotals[2].subCategory[1].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Gas") {
                        _this.billsCategoryTotals[2].subCategory[2].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Parking") {
                        _this.billsCategoryTotals[2].subCategory[3].total += _this.allBills[i].amount;
                    }
                }
                ;
                if (_this.allBills[i].category === "Utilities") {
                    _this.billsCategoryTotals[3].total += _this.allBills[i].amount;
                    if (_this.allBills[i].subCategory === "Electric") {
                        _this.billsCategoryTotals[3].subCategory[0].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Water") {
                        _this.billsCategoryTotals[3].subCategory[1].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Garbage") {
                        _this.billsCategoryTotals[3].subCategory[2].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Home/Cell phone") {
                        _this.billsCategoryTotals[3].subCategory[3].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Internet") {
                        _this.billsCategoryTotals[3].subCategory[4].total += _this.allBills[i].amount;
                    }
                }
                ;
                if (_this.allBills[i].category === "Insurance") {
                    _this.billsCategoryTotals[4].total += _this.allBills[i].amount;
                    if (_this.allBills[i].subCategory === "Car insurance") {
                        _this.billsCategoryTotals[4].subCategory[0].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Homeowner's insurance") {
                        _this.billsCategoryTotals[4].subCategory[1].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Renter's insurance") {
                        _this.billsCategoryTotals[4].subCategory[2].total += _this.allBills[i].amount;
                    }
                }
                ;
                if (_this.allBills[i].category === "Debt") {
                    _this.billsCategoryTotals[5].total += _this.allBills[i].amount;
                    if (_this.allBills[i].subCategory === "Credit card") {
                        _this.billsCategoryTotals[5].subCategory[0].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Student loan") {
                        _this.billsCategoryTotals[5].subCategory[1].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Personal loan") {
                        _this.billsCategoryTotals[5].subCategory[2].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Car loan") {
                        _this.billsCategoryTotals[5].subCategory[3].total += _this.allBills[i].amount;
                    }
                }
                ;
                if (_this.allBills[i].category === "Taxes") {
                    _this.billsCategoryTotals[6].total += _this.allBills[i].amount;
                    if (_this.allBills[i].subCategory === "Personal") {
                        _this.billsCategoryTotals[6].subCategory[0].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Business") {
                        _this.billsCategoryTotals[6].subCategory[1].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "House") {
                        _this.billsCategoryTotals[6].subCategory[2].total += _this.allBills[i].amount;
                    }
                }
                ;
                if (_this.allBills[i].category === "Entertainment") {
                    _this.billsCategoryTotals[7].total += _this.allBills[i].amount;
                    if (_this.allBills[i].subCategory === "Streaming movies/music") {
                        _this.billsCategoryTotals[7].subCategory[0].total += _this.allBills[i].amount;
                    }
                }
                ;
                if (_this.allBills[i].category === "ChildCare") {
                    _this.billsCategoryTotals[8].total += _this.allBills[i].amount;
                    if (_this.allBills[i].subCategory === "Babysitter") {
                        _this.billsCategoryTotals[8].subCategory[0].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Daycare") {
                        _this.billsCategoryTotals[8].subCategory[1].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "After School Programs") {
                        _this.billsCategoryTotals[8].subCategory[2].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Youth Leagues") {
                        _this.billsCategoryTotals[8].subCategory[3].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Medical") {
                        _this.billsCategoryTotals[8].subCategory[4].total += _this.allBills[i].amount;
                    }
                    if (_this.allBills[i].subCategory === "Nutrition") {
                        _this.billsCategoryTotals[8].subCategory[5].total += _this.allBills[i].amount;
                    }
                }
                ;
            }
            ;
        });
    };
    BYTBillsComponent.prototype.calculateTotal = function () {
        var total = 0;
        for (var i = 0; i < this.allBills.length; i++) {
            total += Math.floor(this.allBills[i].amount);
        }
        ;
        return this.totalSpentOnBills = total;
    };
    ;
    __decorate([
        core_1.ViewChild(byt_last_bill_entry_component_1.BYTLastBillEntryComponent), 
        __metadata('design:type', byt_last_bill_entry_component_1.BYTLastBillEntryComponent)
    ], BYTBillsComponent.prototype, "_lastBillEntry", void 0);
    BYTBillsComponent = __decorate([
        core_1.Component({
            selector: 'byt-bills',
            templateUrl: '/app/byt-bills.component.html',
            styleUrls: ['app/byt-bills.component.css']
        }), 
        __metadata('design:paramtypes', [byt_dashboard_overview_service_1.GetBYTUser, byt_dashboard_overview_service_2.BYTRemoveTransaction])
    ], BYTBillsComponent);
    return BYTBillsComponent;
}());
exports.BYTBillsComponent = BYTBillsComponent;
//# sourceMappingURL=byt-bills.component.js.map