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
    fairOver: boolean = false;

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
                    this.checkFairOver();
                } else {
                    this.fairActive = false;
                }
            } else {
                this.fairActive = false;
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        });
    }

    checkFairOver() {
        let today = new Date();
        let endDate = new Date(this.fair.endDate);
        console.log(`today ${today} endDate ${endDate}`);
        
        if (endDate < today) {
            this.fairOver = true;
        }
    }
    onFairCreated(event: Fair) {
        this.fair = event;
        this.fairActive = true;
    }

    onFinishFairClick() {
        this.fairService.finishFair(this.fair._id).subscribe((data: { success: boolean, message: string, fair: Fair }) => {
            if (data.success) {
                this.fair = data.fair;
                this.message = "Fair is finished";
                this.messageClass = 'alert alert-success';
                this.fairActive = false;
                this.fairOver = false;
            } else {
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        })
    }
}
