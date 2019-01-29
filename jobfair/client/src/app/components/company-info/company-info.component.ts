import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { Location } from '@angular/common';
import { Company } from 'src/app/models/company';
import { Opening } from 'src/app/models/opening';

@Component({
    selector: 'app-company-info',
    templateUrl: './company-info.component.html'
})
export class CompanyInfoComponent implements OnInit {

    message: string;
    messageClass: string;

    companyId: string;
    company: Company;
    openings: Opening[]

    constructor(private route: ActivatedRoute, private companyService: CompanyService, private location: Location) { }

    ngOnInit() {
        this.getCompany();
    }
    getCompany() {
        this.companyId = this.route.snapshot.paramMap.get('id');
        this.companyService.getCompanyInfo(this.companyId).subscribe((data: {
            success: boolean,
            message : string,
            company: Company,
            openings: Opening[]
        }) => {
            if (data.success) {
                console.log(data);
                this.company = data.company;
                this.openings = data.openings;
            } else {
                console.log(data);
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        });
    }
}
