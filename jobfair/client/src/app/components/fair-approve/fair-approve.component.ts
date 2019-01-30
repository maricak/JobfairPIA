import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FairService } from 'src/app/services/fair.service';
import { Fair } from 'src/app/models/fair';
import { Company } from 'src/app/models/company';


@Component({
    selector: 'app-fair-approve',
    templateUrl: './fair-approve.component.html'
})
export class FairApproveComponent implements OnInit {
    message: string;
    messageClass: string;

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
        this.fairService.getCompaniesToApprove(this.fair._id);
    }
}
