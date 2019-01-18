import { Component, OnInit } from '@angular/core';
import { Opening } from 'src/app/models/opening';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OpeningService } from 'src/app/services/opening.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-opening-info',
    templateUrl: './opening-info.component.html'
})
export class OpeningInfoComponent implements OnInit {
    message: string;
    messageClass: string;

    openingId: string;
    opening: Opening;

    form: FormGroup;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private service: OpeningService, private location: Location) {
        this.createForm();
    }

    createForm() {
        this.form = this.formBuilder.group({
            coverLetter: ['']
        })
    }


    ngOnInit() {
        this.getOpening();
    }
    getOpening() {
        this.openingId = this.route.snapshot.paramMap.get('id');
        this.service.getOpening(this.openingId).subscribe((data: {
            success: boolean,
            message: string,
            opening: Opening
        }) => {
            if (data.success) {
                this.opening = data.opening;
            } else {
                console.log(data);
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        });
    }

    onSubmitApply() {
        // proveriti dal je uploadovan fajl.
    }
}
