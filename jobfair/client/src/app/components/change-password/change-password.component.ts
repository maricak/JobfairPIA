import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ChangePasswordUser } from 'src/app/models/user';
import * as v from 'src/app/validators';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

    form: FormGroup;
    vData: { [key: string]: { [type: string]: any[] } };

    message: string;
    messageClass: string;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
        this.vData = v.data;
        console.log(this.vData);

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
            newPassword: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.newPassword.minlength[0]),
                Validators.maxLength(this.vData.newPassword.maxlength[0]),
                Validators.pattern(this.vData.newPassword.pattern[0])
            ])],
            type: ['admin']
        });
    }

    get username() { return this.form.controls['username']; }
    get password() { return this.form.controls['password']; }
    get newPassword() { return this.form.controls['newPassword']; }

    onChangePasswordSubmit() {
        const user: ChangePasswordUser = {
            username: this.form.get('username').value.trim(),
            password: this.form.get('password').value.trim(),
            newPassword: this.form.get('newPassword').value.trim()
        };
        const type = this.form.get('type').value;
        if (type === "admin") {
            this.changePasswordAdmin(user);
        } else if (type == "student") {
            this.changePasswordStudent(user);
        } else {
            this.changePasswordCompany(user);
        }
    }

    changePasswordAdmin(admin: ChangePasswordUser) {
        this.authService.changePasswordAdmin(admin).subscribe((data: { success: boolean, message: string }) => {
            if (!data.success) {
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
            } else {
                this.messageClass = 'alert alert-success';
                this.message = data.message;
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 500);
            }
        });
    }

    changePasswordStudent(student: ChangePasswordUser) {
        this.authService.changePasswordStudent(student).subscribe((data: { success: boolean, message: string }) => {
            if (!data.success) {
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
            } else {
                this.messageClass = 'alert alert-success';
                this.message = data.message;
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 500);
            }
        });
    }

    changePasswordCompany(company: ChangePasswordUser) {
        this.authService.changePasswordCompany(company).subscribe((data: { success: boolean, message: string }) => {
            if (!data.success) {
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
            } else {
                this.messageClass = 'alert alert-success';
                this.message = data.message;
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 500);
            }
        });
    }
    ngOnInit() { }
}
