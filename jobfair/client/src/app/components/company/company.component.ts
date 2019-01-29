import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OpeningService } from 'src/app/services/opening.service';
import { AuthService } from 'src/app/services/auth.service';
import { Company } from 'src/app/models/company';
import { Opening } from 'src/app/models/opening';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {
    form: FormGroup;
    vData: { [key: string]: { [type: string]: any[] } };

    message: string;
    messageClass: string;

    company: Company;

    constructor(private formbuilder: FormBuilder, private authService: AuthService, private openingService: OpeningService) {
  
    }
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
