import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FairService } from 'src/app/services/fair.service';
import { Fair } from 'src/app/models/fair';
import * as v from 'src/app/validators';


@Component({
    selector: 'app-fair-update-deadlines',
    templateUrl: './fair-update-deadlines.component.html',
})
export class FairUpdateDeadlinesComponent implements OnInit {

    form: FormGroup;
    vData: { [key: string]: { [type: string]: any[] } };

    message: string;
    messageClass: string;

    //numberValue;

    fair_: Fair;
    @Output() fairChange = new EventEmitter();
    @Input() 
    get fair() {
        return this.fair_;
    }
    set fair(fair) {
        this.fair_ = fair;
        this.fairChange.emit(this.fair_);
    }

    // @Output() brojChange = new EventEmitter();
    // @Input()
    // get broj() {
    //     return this.numberValue;
    // }
    // set broj(val) {
    //     this.numberValue = val;
    //     this.brojChange.emit(this.numberValue);
    // }


    constructor(private formBuilder: FormBuilder, private fairService: FairService) {
        this.vData = v.data;
        this.createForm();
    }


    createForm() {
        this.form = this.formBuilder.group({
            applyDeadline: ['', Validators.compose([
                Validators.required
            ])],
            cvDeadline: ['', Validators.compose([
                Validators.required
            ])]
        });
    }

    get applyDeadline() { return this.form.controls['applyDeadline']; }
    get cvDeadline() { return this.form.controls['cvDeadline']; }

    onDeadlinesUpdateSubmit() {
        console.log(this.form.controls);

        this.fairService.updateDeadlines(this.fair._id, this.applyDeadline.value, this.cvDeadline.value)
            .subscribe((data: { success: boolean, message: string, fair: Fair }) => {
                if (data.success) {
                    this.fair = data.fair
                    this.message = data.message;
                    this.messageClass = 'alert alert-success';
                } else {
                    this.message = data.message;
                    this.messageClass = 'alert alert-danger';
                }
            });
    }

    ngOnInit() { 
        this.refreshForm();
    }

    refreshForm() {
        this.form.patchValue({
            applyDeadline : this.fair.applyDeadline, 
            cvDeadline : this.fair.cvDeadline
        })
    }
}
