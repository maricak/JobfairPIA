import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {

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

            new_password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(12),
                this.validatePassword
            ])],
            type: ['admin']
        });
    }

    validatePassword(controls) {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,12}$/);
        if (regExp.test(controls.value)) {
            return null;
        } else {
            return { 'validatePassword': true }
        }
    }

    onChangePasswordSubmit() {
        const user = {
            username: this.form.get('username').value,
            password: this.form.get('password').value,
            new_password: this.form.get('new_password').value
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

    changePasswordAdmin(admin) {
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

    changePasswordStudent(student) {
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

    changePasswordCompany(company) {
        this.authService.changePasswordAdmin(company).subscribe((data: { success: boolean, message: string }) => {
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
