import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FairService } from 'src/app/services/fair.service';
import { Package, Additional, Fair } from 'src/app/models/fair';
import { Company } from 'src/app/models/company';

@Component({
    selector: 'app-fair-apply',
    templateUrl: './fair-apply.component.html'
})
export class FairApplyComponent implements OnInit {
    form: FormGroup;

    message: string;
    messageClass: string;

    company: Company;
    fair: Fair;

    canApply: boolean = false;

    sum: number = 0;
    chosenItems: (Package | Additional)[] = [];

    constructor(private authService: AuthService, private fairService: FairService, private formBuilder: FormBuilder) {
        this.createForm();
    }

    ngOnInit() {
        this.getCompany();
        this.checkCanApply();
    }

    getCompany() {
        this.company = this.authService.getCompany();
        if (!this.company) {
            this.message = 'You have to be logged in';
            this.messageClass = 'alert alert-danger';
        }
    }

    checkCanApply() {
        this.fairService.getCurrentFair().subscribe((data: { success: boolean, message: string, fair: Fair }) => {
            console.log(data);
            if (data.success) {
                if (data.fair) {
                    this.fair = data.fair;
                    let today = new Date();
                    let appdl = new Date(data.fair.applyDeadline);
                    if (appdl > today) {
                        this.canApply = true;
                        let app = this.fair.applications.find((app) => { return app.companyId == this.company._id });
                        if (app) {
                            if (app.approved) {
                                this.canApply = false;
                                this.message = 'Your application has been approved';
                                this.messageClass = 'alert alert-success';
                            } else {
                                if (app.reason && app.reason !== '') {
                                    this.canApply = true;
                                    this.message = `Your application has been denied : ${app.reason}`;
                                    this.messageClass = 'alert alert-danger';
                                } else {
                                    this.canApply = false;
                                    this.message = 'Your application has to be approved';
                                    this.messageClass = 'alert alert-success';
                                }
                            }
                        }
                    } else {
                        this.canApply = false;
                        this.message = 'Applying to the fair is not allowed at the moment';
                        this.messageClass = 'alert alert-danger'
                    }
                } else {
                    this.canApply = false;
                    this.message = 'There is no fair';
                    this.messageClass = 'alert alert-danger'
                }
            } else {
                this.message = data.message;
                this.messageClass = 'alert alert-danger'
                this.canApply = false;
            }
            console.log(`can apply ${this.canApply}`);
        });
    }

    createForm() {
        this.form = this.formBuilder.group({
            package: [''],
            additionals: ['']
        })
    }

    get package() { return this.form.controls['package']; }
    get additionals() { return this.form.controls['additionals']; }

    onFormChange(event) {
        this.sum = 0;
        this.chosenItems = [];
        this.calculateSum();
    }

    calculateSum() {
        if (this.package.value) {
            let p: Package = this.getPackages().find(p => { return p._id === this.package.value });
            this.chosenItems.push(p)
            this.sum += p.price;
        }
        if (this.additionals.value) {
            this.additionals.value.forEach(aId => {
                let a: Additional = this.getAdditionals().find(a => { return a._id === aId });
                this.chosenItems.push(a);
                this.sum += a.price;
            });
        }
    }

    onApplicationSubmit() {
        console.log(this.form.controls);
        let packages: string[] = [];
        if (this.package.value.trim() && this.package.value.trim() != '')
            packages.push(this.package.value.trim());
        if (this.additionals.value) {
            this.additionals.value.forEach(a => {
                packages.push(a);
            });
        }
        this.fairService.apply(packages).subscribe((data: { success: boolean, message: string, fair: Fair }) => {
            if (!data.success) {
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
            } else {
                this.fair = data.fair;
                console.log("new fair");
                console.log(this.fair);
                this.canApply = false;
                this.messageClass = 'alert alert-success';
                this.message = data.message;
            }
        });
    }

    getPackages(): Package[] {
        let ret: Package[] = [];
        this.fair.packages.forEach(p => {
            if (p.companiesLeft > 0 || p.companiesLeft == -1) {
                ret.push(p);
            }
        });
        return ret;
    }
    getAdditionals(): Additional[] {
        let ret: Additional[] = [];
        this.fair.additional.forEach(a => {
            ret.push(a);
        });
        return ret;
    }
}

