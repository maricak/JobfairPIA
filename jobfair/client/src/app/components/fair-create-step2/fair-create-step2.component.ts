import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as v from '../../validators';
import { Fair } from 'src/app/models/fair';

@Component({
    selector: 'app-fair-create-step2',
    templateUrl: './fair-create-step2.component.html',
})
export class FairCreateStep2Component implements OnInit {
    form: FormGroup;
    vData: { [key: string]: { [type: string]: any[] } };

    @Output() message = new EventEmitter<string>();
    @Output() messageClass = new EventEmitter<string>();

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

    step_: number;
    @Output() stepChange = new EventEmitter();
    @Input()
    get step() {
        return this.step_;
    }
    set step(val: number) {
        this.step_ = val;
        this.stepChange.emit(this.step_);
    }

    constructor(private formBuilder: FormBuilder) {
        this.vData = v.data;
        this.createForm();
    }

    createForm() {

    }
    ngOnInit() {
        this.message.emit(undefined);
    }

    inc() {
        this.step++;
    }

}
