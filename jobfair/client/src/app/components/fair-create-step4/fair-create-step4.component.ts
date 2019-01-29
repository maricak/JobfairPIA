import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Fair } from 'src/app/models/fair';

@Component({
    selector: 'app-fair-create-step4',
    templateUrl: './fair-create-step4.component.html',
})
export class FairCreateStep4Component implements OnInit {

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

    @Output() createFair = new EventEmitter();

    constructor() { }

    onConfirmClick() {
        this.createFair.emit();
    }

    ngOnInit() {
        this.message.emit(undefined);
    }
}
