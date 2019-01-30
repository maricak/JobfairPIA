import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FairService } from 'src/app/services/fair.service';
import { Fair, Application } from 'src/app/models/fair';
import { Company } from 'src/app/models/company';


@Component({
    selector: 'app-fair-approve',
    templateUrl: './fair-approve.component.html'
})
export class FairApproveComponent implements OnInit {
    message: string;
    messageClass: string;

    applications: Application[];

    fair_: Fair;
    @Output() fairChange = new EventEmitter<Fair>();
    @Input()
    get fair() {
        return this.fair_;
    }
    set fair(fair) {
        this.fair_ = fair;
        this.fairChange.emit(this.fair_);
    }

    companies: Company[] = [];

    constructor(private fairService: FairService) { }

    ngOnInit() {
        this.getCompaniesToApprove();
    }

    getCompaniesToApprove() {
        this.fairService.getCompaniesToApprove(this.fair._id).subscribe((data: { success: boolean, message: string, applications: Application[] }) => {
            console.log(data);
            if (data.success) {
                this.applications = data.applications;
                // this.message = data.message;
                // this.messageClass = 'alert alert-success';
            } else {
                this.applications = [];
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        });
    }

    onApproveClick() {
        console.log(this.applications);
        this.fairService.approveCompanies(this.applications, this.fair._id).subscribe((data: { success: boolean, message: string, fair: Fair }) => {
            if (data.success) {
                this.fair = data.fair;
                this.getCompaniesToApprove();
                this.message = data.message;
                this.messageClass = 'alert alert-success';
            } else {
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        })
    }
}
