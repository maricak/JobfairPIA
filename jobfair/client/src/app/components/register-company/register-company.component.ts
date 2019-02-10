import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Company } from 'src/app/models/company';

import * as v from 'src/app/validators';
@Component({
    selector: 'app-register-company',
    templateUrl: './register-company.component.html'
})
export class RegisterCompanyComponent implements OnInit {

    form: FormGroup;
    vData: { [key: string]: { [type: string]: any[] } };

    message: string;
    messageClass: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
        this.vData = v.data;
        this.createForm();
    }
    createForm() {
        this.form = this.formBuilder.group({
            username: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.username.minlength[0]),
                Validators.maxLength(this.vData.username.maxlength[0])
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.password.minlength[0]),
                Validators.maxLength(this.vData.password.maxlength[0]),
                Validators.pattern(this.vData.password.pattern[0])
            ])],
            confirm: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.password.minlength[0]),
                Validators.maxLength(this.vData.password.maxlength[0]),
                Validators.pattern(this.vData.password.pattern[0])
            ])],
            name: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.name.minlength[0]),
                Validators.maxLength(this.vData.name.maxlength[0])
            ])],
            city: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.city.minlength[0]),
                Validators.maxLength(this.vData.city.maxlength[0])
            ])],
            address: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.address.minlength[0]),
                Validators.maxLength(this.vData.address.maxlength[0])
            ])],
            pib: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.pib.minlength[0]),
                Validators.maxLength(this.vData.pib.maxlength[0]),
                Validators.pattern(this.vData.pib.pattern[0])
            ])],
            numberOfEmployees: ['', Validators.compose([
                Validators.required,
                Validators.min(this.vData.numberOfEmployees.min[0]),
            ])],
            email: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(this.vData.email.maxlength[0]),
                Validators.pattern(this.vData.email.pattern[0])
            ])],
            website: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.website.minlength[0]),
                Validators.maxLength(this.vData.website.maxlength[0]),
                Validators.pattern(this.vData.website.pattern[0])
            ])],
            workField: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.workField.minlength[0]),
                Validators.maxLength(this.vData.workField.maxlength[0])
            ])],
            specialty: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.specialty.minlength[0]),
                Validators.maxLength(this.vData.specialty.maxlength[0])
            ])],
            image: ['', Validators.compose([
                Validators.required
            ])]
        }, { validator: this.matchingPasswords('password', 'confirm') }); // Add custom validator to form for matching passwords
    }

    matchingPasswords(password: string, confirm: string) {
        return (group: FormGroup) => {
            if (group.controls[password].value === group.controls[confirm].value) {
                return null;
            } else {
                return { 'matchingPasswords': true }
            }
        }
    }

    get username() { return this.form.controls['username']; }
    get password() { return this.form.controls['password']; }
    get confirm() { return this.form.controls['confirm']; }
    get name() { return this.form.controls['name']; }
    get city() { return this.form.controls['city']; }
    get address() { return this.form.controls['address']; }
    get pib() { return this.form.controls['pib']; }
    get numberOfEmployees() { return this.form.controls['numberOfEmployees']; }
    get email() { return this.form.controls['email']; }
    get website() { return this.form.controls['website']; }
    get workField() { return this.form.controls['workField']; }
    get specialty() { return this.form.controls['specialty']; }
    get image() { return this.form.controls['image']; }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            this.form.get('image').setValue(file);
        }
    }

    onRegisterSubmit() {
        const form: FormData = new FormData();
        form.append('username', this.username.value.trim());
        form.append('password', this.password.value.trim());
        form.append('name', this.name.value.trim());
        form.append('city', this.city.value.trim());
        form.append('address', this.address.value.trim());
        form.append('numberOfEmployees', this.numberOfEmployees.value);
        form.append('pib', this.pib.value);
        form.append('email', this.email.value.trim());
        form.append('website', this.website.value.trim());
        form.append('workField', this.workField.value.trim());
        form.append('specialty', this.specialty.value);
        form.append('image', this.image.value);
        this.authService.registerCompany(form).subscribe((data: { success: boolean, message: string }) => {
            if (!data.success) {
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            } else {
                this.message = data.message;
                this.messageClass = 'alert alert-success';
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 500);
            }
        });
    }

    ngOnInit() { }
}
