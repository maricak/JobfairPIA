import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OpeningService } from 'src/app/services/opening.service';
import { Opening } from 'src/app/models/opening';

@Component({
    selector: 'app-company',
    templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {
    message: string;
    messageClass: string;

    company: Company;

    form: FormGroup;

    constructor(private service: CompanyService, private formbuilder: FormBuilder, private openingService: OpeningService) {
        this.createForm();
    }

    ngOnInit() {
        this.getCompany();
    }

    createForm() {
        this.form = this.formbuilder.group({
            type: ['job', Validators.required],
            name: ['', Validators.required],
            text: ['', Validators.required],
            deadline: ['', Validators.required],
            // fajlovi
        })
    }

    getCompany() {
        this.service.getCompany().subscribe((data: {
            success: boolean,
            message: string,
            company: Company
        }) => {
            if (data.success) {
                this.company = data.company;
            } else {
                console.log(data);
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        });
    }

    onOpeningSubmit() {
        this.message = "";
        
        const opening: Opening = {
            _id: "",
            type: this.form.get('type').value.trim(),
            name: this.form.get('name').value.trim(),
            text: this.form.get('text').value.trim(),
            deadline: this.form.get('deadline').value.trim(),
            companyUsername: this.company.username,
            companyName: this.company.name
        };
        this.openingService.createOpening(opening).subscribe((data: { success: boolean, message: string }) => {
            console.log(data);
            if (!data.success) {
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            } else {
                this.message = data.message;
                this.messageClass = 'alert alert-success';
            }
        })
    }
}
