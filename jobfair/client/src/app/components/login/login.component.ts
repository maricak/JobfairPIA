import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { stringify } from '@angular/core/src/render3/util';

@Component({
    selector: 'app-home',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    messageClass: string;
    message: string;

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.createForm();
    }


    createForm() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            type: ['admin']
        });
    }

    ngOnInit() {
        this.authService.getAdminData().subscribe(res => {
            console.log(res);
        })
    }

    onLoginSubmit() {
        const user = {
            username: this.form.get('username').value,
            password: this.form.get('password').value
        };
        const type = this.form.get('type').value;
        console.log(type);

        if (type === "admin") {
            this.loginAdmin(user);
        } else if (type == "student") {
            this.loginStudent(user);
        } else {
            this.loginCompany(user);
        }
    }

    loginAdmin(admin) {
        this.authService.loginAdmin(admin).subscribe((data: { success:boolean, message:string, token:string, username:string }) => {
            if (!data.success) {
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
            } else {
                this.messageClass = 'alert alert-success';
                this.message = data.message;
                this.authService.storeUserData(data.token, data.username);
                setTimeout(() => {
                    this.router.navigate(['/admin']);
                }, 2000);
            }
        });

    };
    loginStudent(student) {
        console.log("login sydent comonent");
        this.authService.loginStudent(student).subscribe((data: { success:boolean, message:string, token:string, username:string }) => {
            console.log(data);
            if (!data.success) {
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
            } else {
                this.messageClass = 'alert alert-success';
                this.message = data.message;
                this.authService.storeUserData(data.token, data.username);
                setTimeout(() => {
                    this.router.navigate(['/student']);
                }, 2000);
            }
        });
    }
    loginCompany(company) {
        this.authService.loginCompany(company).subscribe((data: { success:boolean, message:string, token:string, username:string }) => {
            if (!data.success) {
                this.messageClass = 'alert alert-danger';
                this.message = data.message;
            } else {
                this.messageClass = 'alert alert-success';
                this.message = data.message;
                this.authService.storeUserData(data.token, data.username);
                setTimeout(() => {
                    this.router.navigate(['/company']);
                }, 2000);
            }
        });
    }
}