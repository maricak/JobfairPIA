import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Fair } from 'src/app/models/fair';
import * as v from '../../validators';


@Component({
    selector: 'app-fair-create-step1',
    templateUrl: './fair-create-step1.component.html',
})
export class FairCreateStep1Component implements OnInit {
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
        this.form = this.formBuilder.group({
            name: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.name.minlength[0]),
                Validators.maxLength(this.vData.name.maxlength[0])
            ])],
            startDate: ['', Validators.compose([
                Validators.required
            ])],
            endDate: ['', Validators.compose([
                Validators.required
            ])],
            place: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.place.minlength[0]),
                Validators.maxLength(this.vData.place.maxlength[0])
            ])],
            locations: this.formBuilder.array([]),
            about: ['', Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.about.minlength[0]),
                Validators.maxLength(this.vData.about.maxlength[0])
            ])]
        }, { validator: this.checkDates('startDate', 'endDate') });
    }

    get name() { return this.form.controls['name']; }
    get startDate() { return this.form.controls['startDate']; }
    get endDate() { return this.form.controls['endDate']; }
    get place() { return this.form.controls['place']; }
    get about() { return this.form.controls['about']; }
    get locations() { return this.form.controls['locations']; }

    createLocation(location: string) {
        return this.formBuilder.group({
            name: [location, Validators.compose([
                Validators.required,
                Validators.minLength(this.vData.location.minlength[0]),
                Validators.maxLength(this.vData.location.maxlength[0])
            ])],
        })
    }
    onAddLocation() {
        const e = <FormArray>this.form.get('locations');
        e.push(this.createLocation(''));
    }
    onDeleteLocation(i: number) {
        const e = <FormArray>this.form.get('locations');
        e.removeAt(i);
    }
    getLocations(): string[] {
        let ret: string[] = [];
        (<FormArray>this.locations).controls.forEach(f => {
            let e: string = f.get('name').value.trim();
            ret.push(e);
        });
        return ret;
    }

    onNextClick() {
        this.fair.name = this.name.value.trim();
        this.fair.startDate = this.startDate.value;
        this.fair.endDate = this.endDate.value;
        this.fair.place = this.place.value.trim();
        this.fair.locations = this.getLocations();
        this.fair.about = this.about.value;

        console.log(this.fair);
        this.step++;
    }
    checkDates(startDate: string, endDate: string) {
        return (group: FormGroup) => {
            let start: Date = group.controls[startDate].value;
            let end: Date = group.controls[endDate].value;
            if (end && end <= start) {
                return { 'checkDates': true }
            } else {
                return null;
            }
        }
    }

    fileChanged(event) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = () => {
            try {
                let fileData = JSON.parse(reader.result.toString());
                this.message.emit(undefined)
                if (fileData)
                    this.refreshForm(fileData);
            } catch (err) {
                this.message.emit(`Syntax error in JSON file ${file.name}`);
                this.messageClass.emit('alert alert-danger');
            }
        };
        reader.readAsText(file);
    }

    refreshForm(fileData) {
        this.form.reset();
        let fair;
        if (fileData.Fairs && fileData.Fairs[0]) {
            fair = fileData.Fairs[0];
            this.form.patchValue({
                name: fair.Fair,
                startDate: fair.StartDate + " " + fair.StartTime,
                endDate: fair.EndDate + " " + fair.EndTime,
                place: fair.Place,
                about: fair.About
            });
        }
        if (fileData.Locations) {
            let location = fileData.Locations.find((location) => {
                return location.Place === fair.Place;
            });
            if (location && location.Location) {
                location.Location.forEach(l => {
                    const e = <FormArray>this.form.get('locations');
                    e.push(this.createLocation(l.Name));
                });
            }
        }
    }

    ngOnInit() {
        this.message.emit(undefined);
     }
}
