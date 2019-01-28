import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OpeningService } from 'src/app/services/opening.service';
import { Opening } from 'src/app/models/opening';

import * as v from 'src/app/validators';

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

    constructor(private service: CompanyService, private formbuilder: FormBuilder, private openingService: OpeningService) {
        this.vData = v.data;
        this.createForm();
    }

    createForm() {
        this.form = this.formbuilder.group({
            type: ['job', Validators.required],
            name: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.name.minlength[0]),
                Validators.maxLength(this.vData.name.maxlength[0])
            ])],
            text: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.text.minlength[0]),
                Validators.maxLength(this.vData.text.maxlength[0])
            ])],
            deadline: ['', Validators.compose([
                Validators.required
            ])],
            // fajlovi
        })
    }

    get type() { return this.form.controls['type']; }
    get name() { return this.form.controls['name']; }
    get text() { return this.form.controls['text']; }
    get deadline() { return this.form.controls['deadline']; }

    ngOnInit() {
        this.getCompany();
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
            companyId: this.company._id,
            companyUSername: this.company.username
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
