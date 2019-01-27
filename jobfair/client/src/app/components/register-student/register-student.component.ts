import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Student } from 'src/app/models/student';

@Component({
    selector: 'app-register-student',
    templateUrl: './register-student.component.html'
})
export class RegisterStudentComponent implements OnInit {

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
            surname: ['', Validators.compose([
                Validators.required
            ])],
            telephone: ['', Validators.compose([
                Validators.required,
                this.validateTelephone
            ])],
            email: ['', Validators.compose([
                Validators.required,
                this.validateEmail
            ])],
            currentYear: ['', Validators.compose([
                Validators.required,
                this.validateYear
            ])],
            graduated: [false],

        }, { validator: this.matchingPasswords('password', 'confirm') }); 
    }
    validatePassword(controls: FormControl) {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,12}$/);
        if (regExp.test(controls.value)) {
            return null;
        } else {
            return { 'validatePassword': true }
        }
    }

    validateTelephone(controls: FormControl) {
        const regExp = new RegExp(/^[0-9]*$/);
        if (regExp.test(controls.value)) {
            return null;
        } else {
            return { 'validateTelephone': true }
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

    validateYear(controls: FormControl) {
        const regExp = new RegExp(/[1-5]*/);
        if (regExp.test(controls.value)) {
            return null;
        } else {
            return { 'validateYear': true }
        }
    }

    matchingPasswords(password : string, confirm : string) {
        return (group: FormGroup) => {
            if (group.controls[password].value === group.controls[confirm].value) {
                return null;
            } else {
                return { 'matchingPasswords': true }
            }
        }
    }

    onRegisterSubmit() {
        const student : Student= {
            username: this.form.get('username').value.trim(),
            password: this.form.get('password').value.trim(),
            name: this.form.get('name').value.trim(),
            surname: this.form.get('surname').value.trim(),
            telephone: this.form.get('telephone').value.trim(),
            email: this.form.get('email').value.trim(),
            currentYear: this.form.get('currentYear').value,
            graduated: this.form.get('graduated').value,
            cv : null
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
                }, 2000);
            }
        });
    }

    ngOnInit() {
    }
}
