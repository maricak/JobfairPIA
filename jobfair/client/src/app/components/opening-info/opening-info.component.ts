import { Component, OnInit } from '@angular/core';
import { Opening } from 'src/app/models/opening';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OpeningService } from 'src/app/services/opening.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import * as v from 'src/app/validators';
import { AuthService } from 'src/app/services/auth.service';
import { Student } from 'src/app/models/student';
import { Company } from 'src/app/models/company';

@Component({
    selector: 'app-opening-info',
    templateUrl: './opening-info.component.html'
})
export class OpeningInfoComponent implements OnInit {

    form: FormGroup;
    vData: { [key: string]: { [type: string]: any[] } };

    message: string;
    messageClass: string;

    openingId: string;
    opening: Opening;

    student: Student;
    company: Company;

    canApply: boolean = false;
    canSeeResults: boolean = false;

    constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, public authService: AuthService, private openingService: OpeningService, private location: Location) {
        this.vData = v.data;
        this.createForm();
    }

    createForm() {
        this.form = this.formBuilder.group({
            coverLetter: ['', Validators.compose([
                //Validators.required,
                Validators.minLength(this.vData.coverLetter.minlength[0]),
                Validators.maxLength(this.vData.coverLetter.maxlength[0])
            ])],
            file: [undefined]
        })
    }

    get coverLetter() { return this.form.controls['coverLetter']; }
    get file() { return this.form.controls['file']; }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            this.form.get('file').setValue(file);
        }
    }

    ngOnInit() {
        this.getOpening();
        this.getUser();
    }
    getOpening() {
        this.openingId = this.route.snapshot.paramMap.get('id');
        this.openingService.getOpening(this.openingId).subscribe((data: {
            success: boolean,
            message: string,
            opening: Opening
        }) => {
            if (data.success) {
                console.log(data.opening);

                this.opening = data.opening;
                this.opening.deadline = new Date(data.opening.deadline);

                if (this.authService.isStudent()) {
                    this.canApply = this.checkCanApply();
                    this.canSeeResults = this.checkCanSeeResults();
                }
            } else {
                console.log(data);
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        });
    }

    getUser() {
        if (this.authService.isStudent()) {
            this.student = this.authService.getStudent();
            if (!this.student) {
                this.message = 'You have to be logged in';
                this.messageClass = 'alert alert-danger';
            }
        } else if (this.authService.isCompany()) {
            this.company = this.authService.getCompany();
            if (!this.company) {
                this.message = 'You have to be logged in';
                this.messageClass = 'alert alert-danger';
            }
        }
    }

    checkCanApply(): boolean {
        if (!this.student) {
            this.message = 'You have to be logged in';
            this.messageClass = 'alert alert-danger';
            return false;
        }
        if (!this.opening) {
            //this.message = 'There is no opening in the databse';
            return false;
        }
        if (this.hasDeadlinePassed()) {
            this.message = 'Deadline for this opening has passed';
            this.messageClass = 'alert alert-info';

            return false;
        }
        if (this.hasApplied()) {
            console.log("check app");

            this.message = 'You have already applied';
            this.messageClass = 'alert alert-info';
            return false;
        }
        return true;
    }

    checkCanSeeResults() {
        if (this.hasApplied() && this.hasDeadlinePassed()) {
            return true;
        }
        return false;
    }

    hasApplied() {
        if (!this.student || !this.opening) {
            return false;
        }
        if (!this.opening.applications) {
            return false;
        }
        console.log(this.opening);

        let appStudentIds = this.opening.applications.map((a) => { return a.studentId; });
        console.log(appStudentIds);
        console.log(this.student._id);


        if (appStudentIds.indexOf(this.student._id) != -1) {
            return true;
        }
        return false;
    }

    hasDeadlinePassed() {
        if (this.opening && this.opening.deadline) {
            let today: Date = new Date();
            if (this.opening.deadline.getTime() > today.getTime()) {
                return false;
            }
        }
        return true;
    }

    onSubmitApply() {
        let form: FormData = new FormData();
        form.append('studentId', this.student._id);
        form.append('cv', JSON.stringify(this.student.cv));
        if (this.file.value) {
            form.append('coverLetter', this.file.value);
            form.append('coverLetterIsFile', 'true');
        } else {
            form.append('coverLetter', this.coverLetter.value);
            form.append('coverLetterIsFile', 'false');
        }
        form.append('accepted', 'false');

        this.openingService.apply(this.openingId, form).subscribe((data: { success: boolean, message: string }) => {
            if (data.success) {
                this.message = data.message;
                this.messageClass = 'alert alert-success';
                this.canApply = false;
            } else {
                console.log(data.message);

                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        });
    }

    onSave() {
        console.log(this.opening);
        // sacuvaj rezultat
        this.openingService.update(this.opening).subscribe((data: { success: boolean, message: string }) => {
            if (data.success) {
                this.message = data.message;
                this.messageClass = 'alert alert-success';
            } else {
                this.message = data.message;
                this.messageClass = 'alert alert-danger';
            }
        });
    }
}
