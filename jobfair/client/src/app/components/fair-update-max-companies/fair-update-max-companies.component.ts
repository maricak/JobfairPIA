import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Fair, Package } from 'src/app/models/fair';
import { FairService } from 'src/app/services/fair.service';

@Component({
    selector: 'app-fair-update-max-companies',
    templateUrl: './fair-update-max-companies.component.html'
})
export class FairUpdateMaxCompaniesComponent implements OnInit {

    message: string;
    messageClass: string;

    minValues: number[] = [];

    fair_: Fair;
    @Output() fairChange = new EventEmitter();
    @Input()
    get fair() {
        return this.fair_;
    }
    set fair(fair) {
        this.fair_ = fair;
        this.fairChange.emit(this.fair_);
    }
    constructor(private fairService: FairService) { }

    inc(i: number) {
        this.fair.packages[i].maxCompanies++;
        this.fair.packages[i].companiesLeft++;
    }
    dec(i: number) {
        this.fair.packages[i].maxCompanies--;
        this.fair.packages[i].companiesLeft--;
    }
    onUpdateMaxCompaniesClick() {
        let msg: string = '';
        for (let i = 0; i < this.fair.packages.length; i++) {
            const p = this.fair.packages[i];
            if (p.maxCompanies < this.minValues[i] && p.maxCompanies >= 0) {
                msg += `Max companies for ${p.title} must be at least ${this.minValues[i]}`;
            } else if (p.maxCompanies < -1) {
                msg += `Max companies for ${p.title} must be at least -1`;
            }
        }
        if (msg != '') {
            this.message = msg;
            this.messageClass = 'alert alert-danger';
        } else {
            this.fairService.updateMaxCompanies(this.fair).subscribe((data: { success: boolean, message: string, fair: Fair }) => {
                if (data.success) {
                    this.fair = data.fair;
                    this.message = data.message;
                    this.messageClass = 'alert alert-success';
                    this.calculateMinValues();

                } else {
                    this.message = data.message;
                    this.messageClass = 'alert alert-danger';
                }
            });
        }
    }
    ngOnInit() {
        this.calculateMinValues();
    }

    calculateMinValues() {
        this.minValues = [];
        this.fair.packages.forEach(p => {
            if (p.maxCompanies == -1) {
                this.minValues.push(-1)
            } else {
                this.minValues.push(p.maxCompanies - p.companiesLeft);
            }
        });
    }
}
