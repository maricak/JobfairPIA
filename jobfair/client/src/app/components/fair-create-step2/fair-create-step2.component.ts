import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Fair, Period } from 'src/app/models/fair';
import { FairService } from 'src/app/services/fair.service';

@Component({
    selector: 'app-fair-create-step2',
    templateUrl: './fair-create-step2.component.html',
})
export class FairCreateStep2Component implements OnInit {

    periods: Period[] = [];
    files: FileList;

    @Output() message = new EventEmitter<string>();
    @Output() messageClass = new EventEmitter<string>();

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

    step_: number;
    @Output() stepChange = new EventEmitter();
    @Input()
    get step() {
        return this.step_;
    }
    set step(val: number) {
        this.step_ = val;
        this.stepChange.emit(this.step_);
    }

    constructor(private fairService: FairService) { }


    ngOnInit() {
        this.message.emit(undefined);
        this.setupPeriods();
    }


    onFileChange(event) {
        if (event.target.files.length > 0) {
            this.files = event.target.files;
        }
    }

    onNextClick() {
        let changedPeriods: Period[] = this.periods.filter(p => p.location && p.location != "");
        console.log(changedPeriods);
        this.fair.periods = changedPeriods;
        this.fair.files = [];
        for(var propertie in this.files) {
            this.fair.files.push(this.files[propertie]);
        }
        this.step++;
    }

    setupPeriods() {
        let startDate = new Date(this.fair.startDate);
        let endDate = new Date(this.fair.endDate);

        let dayStart = new Date(startDate.getTime());
        let dayEnd = new Date(startDate.getTime());
        dayEnd.setHours(endDate.getHours(), endDate.getMinutes(), endDate.getSeconds(), endDate.getMilliseconds());

        let s: Date = new Date(dayStart.getTime());
        let e: Date = new Date(s.getTime() + 60 * 60 * 1000); // +60 min

        while (e <= endDate) {
            if (e <= dayEnd) {
                this.periods.push({
                    _id: undefined,
                    companyId: undefined,
                    companyName: undefined,
                    startDate: new Date(s.getTime()),
                    endDate: new Date(e.getTime()),
                    location: undefined,
                    type: "lesson"
                });

                s.setTime(s.getTime() + 60 * 60 * 1000); // +60m
                e.setTime(e.getTime() + 60 * 60 * 1000); // +60m
            } else {
                dayStart.setTime(dayStart.getTime() + 24 * 60 * 60 * 1000); // + 24h
                dayEnd.setTime(dayEnd.getTime() + 24 * 60 * 60 * 1000); //+24h

                s.setTime(dayStart.getTime());
                e.setTime(s.getTime() + 60 * 60 * 1000); //+60m
            }
        }
        // console.log(this.periods);        
    }

}
