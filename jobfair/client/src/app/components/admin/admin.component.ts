import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FairService } from 'src/app/services/fair.service';
import { Admin } from 'src/app/models/admin';
import { Fair } from 'src/app/models/fair';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

    message: string;
    messageClass: string;

    admin: Admin;

    fair: Fair;
    fairActive: boolean = false;

    constructor(private authService: AuthService, private fairService: FairService) { }
    ngOnInit() {
        this.getAdmin();
        this.getFair();
    }

    getAdmin() {
        this.admin = this.authService.getAdmin();
        if (!this.admin) {
            this.message = 'You have to be logged in';
            this.messageClass = 'alert alert-danger';
        }
    }

    getFair() {
        this.fairService.getCurrentFair().subscribe((data: { success: boolean, message: string, fair: Fair }) => {
            console.log(data);
            if (data.success) {
                this.fair = data.fair;
                if (this.fair) {
                    this.fairActive = true;
                }
            } else {
                this.fairActive = false;
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        });
    }

    onFairCreated(event) {
        this.fair = event;
        this.fairActive = true;
        // this.fairActive = true;
    }
}
