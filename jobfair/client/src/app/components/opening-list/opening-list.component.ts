import { Component, OnInit } from '@angular/core';
import { Opening } from 'src/app/models/opening';
import { CompanyService } from 'src/app/services/company.service';

@Component({
    selector: 'app-opening-list',
    templateUrl: './opening-list.component.html'
})
export class OpeningListComponent implements OnInit {

    openings: Opening[];
    message : string;
    messageClass : string;

    constructor(private companyService: CompanyService) { }

    ngOnInit() {
        this.getOpenings();
    }

    getOpenings() {
        this.companyService.getCompanyOpenings().subscribe((data: {
            success: boolean,
            message: string,
            openings: Opening[]
        }) => {
            if (data.success) {
                console.log(data);
                this.openings = data.openings;
            } else {
                console.log(data);
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        })
    }
}
