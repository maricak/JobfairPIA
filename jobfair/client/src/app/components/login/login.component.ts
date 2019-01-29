import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

import * as v from 'src/app/validators';

@Component({
    selector: 'app-home',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    vData: { [key: string]: { [type: string]: any[] } };

    messageClass: string;
    message: string;

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
            type: ['admin']
        });
    }

    get username() {
        return this.form.controls['username'];
    }
    get password() {
        return this.form.controls['password'];
    }

    onLoginSubmit() {
        const user: User = {
            username: this.form.get('username').value.trim(),
            password: this.form.get('password').value.trim()
        };
        const type = this.form.get('type').value;

        if (type === "admin") {
            this.loginAdmin(user);
        } else if (type == "student") {
            this.loginStudent(user);
        } else {
            this.loginCompany(user);
        }
    }

    loginAdmin(admin: User) {
        this.authService.loginAdmin(admin).subscribe((data: { success: boolean, message: string, token: string, user: any }) => {
            if (!data.success) {
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
            } else {
                this.messageClass = 'alert alert-success';
                this.message = data.message;
                this.authService.storeData(data.token, data.user, "admin");
                setTimeout(() => {
                    this.router.navigate(['/admin']);
                }, 500);
            }
        });
    };
    loginStudent(student: User) {
        this.authService.loginStudent(student).subscribe((data: { success: boolean, message: string, token: string, user: any }) => {
            if (!data.success) {
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
            } else {
                this.messageClass = 'alert alert-success';
                this.message = data.message;
                this.authService.storeData(data.token, data.user, "student");
                setTimeout(() => {
                    this.router.navigate(['/student']);
                }, 500);
            }
        });
    }
    loginCompany(company: User) {
        this.authService.loginCompany(company).subscribe((data: { success: boolean, message: string, token: string, user: any }) => {
            if (!data.success) {
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
            } else {
                this.messageClass = 'alert alert-success';
                this.message = data.message;
                this.authService.storeData(data.token, data.user, "company");
                setTimeout(() => {
                    this.router.navigate(['/company']);
                }, 500);
            }
        });
    }
    ngOnInit() { }
}