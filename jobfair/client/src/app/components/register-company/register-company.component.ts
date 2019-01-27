import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Company } from 'src/app/models/company';
@Component({
    selector: 'app-register-company',
    templateUrl: './register-company.component.html'
})
export class RegisterCompanyComponent implements OnInit {

    form: FormGroup;
    message: string;
    messageClass: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
        this.createForm();
    }
    createForm() {
        this.form = this.formBuilder.group({
            username: ['', Validators.compose([
                Validators.required,
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(12),
                this.validatePassword
            ])],
            confirm: ['', Validators.required],
            name: ['', Validators.compose([
                Validators.required
            ])],
            city: ['', Validators.compose([
                Validators.required
            ])],
            address: ['', Validators.compose([
                Validators.required,
            ])],
            pib: ['', Validators.compose([
                Validators.required,
                this.validatePib
            ])],
            numberOfEmployees: ['', Validators.compose([
                Validators.required,
                this.validateNumber
            ])],
            email: ['', Validators.compose([
                Validators.required,
                this.validateEmail
            ])],
            website: ['', Validators.compose([
                Validators.required,
                this.validateWebsite
            ])],
            workField: ['', Validators.compose([
                Validators.required,
            ])],
            specialty: ['', Validators.compose([
                Validators.required,
            ])],
        }, { validator: this.matchingPasswords('password', 'confirm') }); // Add custom validator to form for matching passwords
    }
    validatePassword(controls: FormControl) {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,12}$/);
        if (regExp.test(controls.value)) {
            return null;
        } else {
            return { 'validatePassword': true }
        }
    }

    validatePib(controls: FormControl) {
        const regExp = new RegExp(/^[0-9]{8}$/);
        if (regExp.test(controls.value)) {
            return null;
        } else {
            return { 'validatePib': true }
        }
    }

    validateEmail(controls: FormControl) {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (regExp.test(controls.value)) {
            return null;
        } else {
            return { 'validateEmail': true }
        }
    }

    validateNumber(controls: FormControl) {
        const regExp = new RegExp(/^[0-9]*$/);
        if (regExp.test(controls.value)) {
            return null;
        } else {
            return { 'validateNumber': true }
        }
    }

    validateWebsite(controls: FormControl) {
        const regExp = new RegExp(/^w{3}[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
        if (regExp.test(controls.value)) {
            return null;
        } else {
            return { 'validateWebsite': true }
        }
    }



    matchingPasswords(password : string, confirm: string) {
        return (group: FormGroup) => {
            if (group.controls[password].value === group.controls[confirm].value) {
                return null;
            } else {
                return { 'matchingPasswords': true }
            }
        }
    }

    onRegisterSubmit() {
        const company : Company = {
            username: this.form.get('username').value,
            password: this.form.get('password').value,
            name: this.form.get('name').value,
            city: this.form.get('city').value,
            address: this.form.get('address').value,
            numberOfEmployees: this.form.get('numberOfEmployees').value,
            pib: this.form.get('pib').value,
            email: this.form.get('email').value,
            website: this.form.get('website').value,
            workField: this.form.get('workField').value,
            specialty: this.form.get('specialty').value
        };

        this.authService.registerCompany(company).subscribe((data: { success: boolean, message: string }) => {
            if (!data.success) {
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            } else {
                this.message = data.message;
                this.messageClass = 'alert alert-success';
                setTimeout(() => {
                    this.router.navigate(['/login']);
                }, 2000);
            }
        });
    }

    ngOnInit() {
    }
}
