import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Student } from 'src/app/models/student';

import * as v from 'src/app/validators';

@Component({
    selector: 'app-register-student',
    templateUrl: './register-student.component.html'
})
export class RegisterStudentComponent implements OnInit {

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
            surname: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.surname.minlength[0]),
                Validators.maxLength(this.vData.surname.maxlength[0])
            ])],
            telephone: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.telephone.minlength[0]),
                Validators.maxLength(this.vData.telephone.maxlength[0]),
                Validators.pattern(this.vData.telephone.pattern[0])
            ])],
            email: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(this.vData.email.maxlength[0]),
                Validators.pattern(this.vData.email.pattern[0])
            ])],
            currentYear: ['', Validators.compose([
                Validators.required,
                Validators.min(this.vData.currentYear.min[0]),
                Validators.max(this.vData.currentYear.max[0]),
            ])],
            graduated: [false],
        }, { validator: this.matchingPasswords('password', 'confirm') });
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
    get surname() { return this.form.controls['surname']; }
    get telephone() { return this.form.controls['telephone']; }
    get email() { return this.form.controls['email']; }
    get currentYear() { return this.form.controls['currentYear']; }
    get graduated() { return this.form.controls['graduated']; }

    onRegisterSubmit() {
        const student: Student = {
            _id: undefined,
            username: this.username.value.trim(),
            password: this.password.value.trim(),
            name: this.name.value.trim(),
            surname: this.surname.value.trim(),
            telephone: this.telephone.value.trim(),
            email: this.email.value.trim(),
            currentYear: this.currentYear.value,
            graduated: this.graduated.value,
            cv: null
        };
        this.authService.registerStudent(student).subscribe((data: { success: boolean, message: string }) => {
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
