import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Fair, Period } from 'src/app/models/fair';
import { FairService } from 'src/app/services/fair.service';

@Component({
    selector: 'app-fair-update-periods',
    templateUrl: './fair-update-periods.component.html'
})
export class FairUpdatePeriodsComponent implements OnInit {

    message: string;
    messageClass: string;

    periods: Period[] = [];


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

    ngOnInit() {
        this.setupPeriods();
    }

    onUpdatePeriodsClick() {
        let changedPeriods: Period[] = this.periods.filter(p => p.location && p.location != "");
        changedPeriods.forEach(p => {
            if (p.companyId) {
                p.companyName = this.getApprovedCompanies().find(c => c.id == p.companyId).name;
            }
        }) 

        this.fairService.setPeriods(changedPeriods, this.fair._id).subscribe((data: { success: boolean, message: string, fair: Fair }) => {
            console.log(data);
            
            if (data.success) {
                this.message = data.message;
                this.messageClass = 'alert alert-success';
                this.fair = data.fair;
            } else {
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        })
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
        this.fair.periods.forEach(fairPeriod => {
            let start = new Date(fairPeriod.startDate);
            let end = new Date(fairPeriod.endDate);
            let index = this.periods.findIndex(period => {
                let pStart = new Date(period.startDate);
                let pEnd = new Date(period.endDate);
                return (pStart.getTime() == start.getTime()) && (pEnd.getTime() == end.getTime());
            });
            if (index != -1) {
                this.periods[index] = fairPeriod;
            }
        });
    }

    getApprovedCompanies(): { name: string, id: string }[] {
        return this.fair.applications.filter(a => a.approved).map(a => {
            return {
                id: a.companyId,
                name: a.companyName
            }
        });
    }
}
