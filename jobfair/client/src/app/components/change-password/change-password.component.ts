import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ChangePasswordUser } from 'src/app/models/user';
import * as validation from 'src/app/validators';
// import { validatePassword } from 'src/app/validators';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

    form: FormGroup;
    message: string;
    messageClass: string;
    validationData: { [key: string]: { [type: string]: any[] } };

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
        this.validationData = validation.validationData;        
        this.createForm();
    }

    createForm() {
        this.form = this.formBuilder.group({
            username: ['', Validators.compose([
                Validators.required,
                Validators.minLength(validation.usernameMinLength),
                Validators.maxLength(validation.usernameMaxLength)
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(validation.passwordMinLength),
                Validators.maxLength(validation.passwordMaxLength),
                Validators.pattern(validation.passwordRegex)
            ])],
            newPassword: ['', Validators.compose([
                Validators.required,
                Validators.minLength(validation.passwordMinLength),
                Validators.maxLength(validation.passwordMaxLength),
                Validators.pattern(validation.passwordRegex)
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
    get newPassword() {
        return this.form.controls['newPassword'];
    }

    onChangePasswordSubmit() {
        const user: ChangePasswordUser = {
            username: this.form.get('username').value,
            password: this.form.get('password').value,
            newPassword: this.form.get('newPassword').value
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
                }, 2000);
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
                }, 2000);
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
                }, 2000);
            }
        });
    }
    ngOnInit() { }
}
