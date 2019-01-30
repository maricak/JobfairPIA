import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Company } from 'src/app/models/company';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {

    message: string;
    messageClass: string;

    company: Company;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.getCompany();
    }

    getCompany() {
        this.company = this.authService.getCompany();
        if (!this.company) {
            this.message = 'You have to be logged in';
            this.messageClass = 'alert alert-danger';
        }
    }
}
