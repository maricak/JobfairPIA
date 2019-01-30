import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OpeningService } from 'src/app/services/opening.service';
import { AuthService } from 'src/app/services/auth.service';
import { Company } from 'src/app/models/company';
import { Opening } from 'src/app/models/opening';

import * as v from 'src/app/validators';

@Component({
    selector: 'app-opening-create',
    templateUrl: './opening-create.component.html'
})
export class OpeningCreateComponent implements OnInit {
    form: FormGroup;
    vData: { [key: string]: { [type: string]: any[] } };

    message: string;
    messageClass: string;

    company: Company;

    constructor(private formbuilder: FormBuilder, private authService: AuthService, private openingService: OpeningService) {
        this.vData = v.data;
        this.createForm();
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

    onOpeningSubmit() {
        this.message = "";

        const opening: Opening = {
            _id: undefined,
            type: this.form.get('type').value.trim(),
            name: this.form.get('name').value.trim(),
            text: this.form.get('text').value.trim(),
            deadline: this.form.get('deadline').value.trim(),
            companyId: this.company._id,
            companyUSername: this.company.username,
            applications: undefined
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
