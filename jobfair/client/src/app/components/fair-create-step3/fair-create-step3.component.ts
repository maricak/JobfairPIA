import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as v from '../../validators';
import { Fair, Package, Additional } from 'src/app/models/fair';

@Component({
    selector: 'app-fair-create-step3',
    templateUrl: './fair-create-step3.component.html',
})
export class FairCreateStep3Component implements OnInit {
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

    uploaded: boolean = false;

    constructor(private formBuilder: FormBuilder) {
        this.vData = v.data;
        // this.createForm();
    }

    // createForm() {

    // }

    fileChanged(event) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = () => {
            try {
                let fileData = JSON.parse(reader.result.toString());
                this.message.emit(undefined)
                if (fileData) {
                    this.fillFairData(fileData);
                    this.uploaded = true;
                    this.message.emit('Data is successfully updated');
                    this.messageClass.emit('alert alert-success');
                }
            } catch (err) {
                this.message.emit(`Syntax error in JSON file ${file.name}`);
                this.messageClass.emit('alert alert-danger');
            }
        };
        reader.readAsText(file);
    }

    fillFairData(fileData) {
        if (fileData.Packages) {
            let packages = fileData.Packages;
            packages.forEach(p => {
                console.log(p.MaxCompanies === '-');
                if (p.MaxCompanies === '-') {
                    p.MaxCompanies = -1;
                    console.log(p.MaxCompanies);
                }
                let newPackage: Package = {
                    _id: undefined,
                    title: p.Title,
                    content: p.Content,
                    videoPromotion: p.VideoPromotion,
                    noLessons: p.NoLessons,
                    noWorkshops: p.NoWorkchops,
                    noPresentations: p.NoPresentation,
                    price: p.Price,
                    maxCompanies: p.MaxCompanies,
                    companiesLeft: p.MaxCompanies
                }
                this.fair.packages.push(newPackage);
            });
        }
        if (fileData.Additional) {
            let additional = fileData.Additional;
            additional.forEach(a => {
                let newAddition: Additional = {
                    _id: undefined,
                    title: a.Title,
                    price: a.Price,
                }
                this.fair.additional.push(newAddition);
            });
        }
    }

    onNextClick() {
        console.log(this.fair);
        this.message.emit(undefined);
        this.step++;
    }

    ngOnInit() {
        this.message.emit(undefined);
    }
}
