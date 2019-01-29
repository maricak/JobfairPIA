import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Fair } from 'src/app/models/fair';
import { FairService } from 'src/app/services/fair.service';

@Component({
    selector: 'app-fair-create',
    templateUrl: './fair-create.component.html'
})
export class FairCreateComponent implements OnInit { 

    message: string;
    messageClass: string;
    // fairCreated.emit(true)

    fair: Fair;
    step: number = 1;

    @Output() fairCreated = new EventEmitter<Fair>();

    constructor(private fairService: FairService) {
        //this.fairActive = true;
        this.fair = {
            _id: null,
            finished: false,
            applyDeadline: null,
            cvDeadline: null,
            name: null,
            startDate: null,
            endDate: null,
            place: null,
            about: null,
            locations: [],
            packages: [],
            additional: []
        }
    }

    onMessageEvent(message: string) {
        this.message = message;
    }
    onMessageClassEvent(messageClass: string) {
        this.messageClass = messageClass;
    }

    createFair() {
        console.log("create fair");
        console.log(this.fair);

        this.fair.applyDeadline = new Date();
        this.fair.cvDeadline = new Date();

        this.fairService.createFair(this.fair).subscribe((data: { success: boolean, message: string, fair: Fair }) => {
            if (data.success) {
                this.message = data.message;
                this.messageClass = 'alert alert-success';
                this.fairCreated.emit(data.fair);
            } else {
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        })
    }

    ngOnInit() { }
}